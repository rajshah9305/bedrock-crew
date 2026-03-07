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

  const handleChatSubmit = async (message: string) => {
    setChatLoading(true);
    const userMsg = { role: "user" as const, content: message };
    setChatMessages(prev => [...prev, userMsg]);
    
    let assistantContent = "";
    try {
      const resp = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: [...chatMessages, userMsg] }),
      });
      
      if (!resp.ok || !resp.body) {
        throw new Error(resp.status === 429 ? "Rate limited — try again shortly" : resp.status === 402 ? "Credits required" : "AI request failed");
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
          } catch { /* partial chunk */ }
        }
      }
    } catch (err: any) {
      setChatMessages(prev => [...prev, { role: "assistant", content: `Error: ${err.message}` }]);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full glass-strong shadow-card">
        <div className="container flex h-16 items-center justify-between px-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="relative p-2.5 rounded-xl bg-gradient-hero shadow-glow">
              <Brain className="h-5 w-5 text-primary-foreground" />
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-success animate-pulse border-2 border-card" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight flex items-center gap-1.5">
                AI Pipeline
                <Sparkles className="h-3.5 w-3.5 text-primary" />
              </h1>
              <p className="text-[10px] font-medium text-muted-foreground tracking-wider uppercase">CrewAI × AWS Bedrock</p>
            </div>
          </div>

          <nav className="flex items-center gap-0.5 bg-secondary/50 p-1 rounded-xl">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                end={item.href === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm shadow-primary/30"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
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
      <main className="container py-6 px-6 max-w-7xl mx-auto flex-1">
        <Outlet />
      </main>

      {/* Chat Footer */}
      <ChatInput
        onSubmit={handleChatSubmit}
        loading={chatLoading}
        messages={chatMessages}
      />
    </div>
  );
};

export default Layout;
