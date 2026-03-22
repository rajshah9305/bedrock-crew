import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { LayoutDashboard, GitBranch, Code2, Settings, History, BarChart3, Brain, Sparkles } from "lucide-react";
import ChatInput from "./ChatInput";

const Layout = () => {
  const [chatMessages, setChatMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [chatLoading, setChatLoading] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Pipeline", href: "/pipeline", icon: GitBranch },
    { name: "Code Studio", href: "/code-studio", icon: Code2 },
    { name: "Models", href: "/models", icon: Settings },
    { name: "History", href: "/history", icon: History },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
  ];

  const getApiKey = () => sessionStorage.getItem("groq_api_key") ?? "";

  const handleChatSubmit = async (message: string) => {
    // Handle /key command before anything else
    if (message.startsWith("/key ")) {
      const key = message.slice(5).trim();
      sessionStorage.setItem("groq_api_key", key);
      setChatMessages(prev => [...prev,
        { role: "user", content: "/key ***" },
        { role: "assistant", content: "Groq API key saved for this session. You can now chat." },
      ]);
      return;
    }

    const apiKey = getApiKey();
    if (!apiKey) {
      setChatMessages(prev => [
        ...prev,
        { role: "user", content: message },
        { role: "assistant", content: "No API key set. Type `/key gsk_your_key_here` to set your Groq API key for this session." },
      ]);
      return;
    }

    setChatLoading(true);
    const userMsg = { role: "user" as const, content: message };
    setChatMessages(prev => [...prev, userMsg]);

    const apiUrl = import.meta.env.VITE_API_URL || "";
    let assistantContent = "";

    try {
      const resp = await fetch(`${apiUrl}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...chatMessages, userMsg],
          api_key: apiKey,
          model: "llama-3.3-70b-versatile",
        }),
      });

      if (!resp.ok || !resp.body) {
        const errText = await resp.text().catch(() => "");
        throw new Error(resp.status === 429 ? "Rate limited — try again shortly" : errText || "Chat request failed");
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let newlineIdx: number;
        while ((newlineIdx = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIdx);
          buffer = buffer.slice(newlineIdx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;
          try {
            const parsed = JSON.parse(jsonStr);
            if (parsed.error) throw new Error(parsed.error);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantContent += content;
              setChatMessages(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant") {
                  return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantContent } : m);
                }
                return [...prev, { role: "assistant", content: assistantContent }];
              });
            }
          } catch (parseErr) {
            if (parseErr instanceof Error && parseErr.message !== "Unexpected end of JSON input") {
              throw parseErr;
            }
          }
        }
      }
    } catch (err: unknown) {
      setChatMessages(prev => [
        ...prev,
        { role: "assistant", content: `Error: ${err instanceof Error ? err.message : String(err)}` },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white border-b border-black/8 shadow-[0_1px_0_0_hsl(0_0%_0%/0.06)]">
        <div className="container flex h-16 items-center justify-between px-6 max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative p-2.5 rounded-xl bg-gradient-hero shadow-glow">
              <Brain className="h-5 w-5 text-white" />
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-primary animate-pulse border-2 border-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-black flex items-center gap-1.5">
                AI Pipeline
                <Sparkles className="h-3.5 w-3.5 text-primary" />
              </h1>
              <p className="text-[10px] font-medium text-black/40 tracking-wider uppercase">CrewAI × AWS Bedrock</p>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex items-center gap-0.5 bg-black/4 p-1 rounded-xl">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                end={item.href === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-white shadow-sm shadow-primary/30"
                      : "text-black/50 hover:text-black hover:bg-black/6"
                  }`
                }
              >
                <item.icon className="h-3.5 w-3.5" />
                <span className="hidden lg:inline">{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6 px-6 max-w-7xl mx-auto flex-1 pb-2">
        <Outlet />
      </main>

      {/* Chat — elevated, not stuck to very bottom */}
      <ChatInput
        onSubmit={handleChatSubmit}
        loading={chatLoading}
        messages={chatMessages}
      />
    </div>
  );
};

export default Layout;
