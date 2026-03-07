import { Outlet, NavLink } from "react-router-dom";
import { LayoutDashboard, GitBranch, Code2, Settings, History, BarChart3, Brain } from "lucide-react";
import ChatInput from "./ChatInput";

const Layout = () => {
  const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Pipeline", href: "/pipeline", icon: GitBranch },
    { name: "Code Studio", href: "/code-studio", icon: Code2 },
    { name: "Models", href: "/models", icon: Settings },
    { name: "History", href: "/history", icon: History },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
  ];

  const handleChatSubmit = (message: string) => {
    console.log("User message:", message);
    // TODO: wire to AI backend
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-hero shadow-md">
              <Brain className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">AI Agentic Pipeline</h1>
              <p className="text-xs text-muted-foreground">CrewAI × AWS Bedrock</p>
            </div>
          </div>

          <nav className="flex items-center gap-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                end={item.href === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                  }`
                }
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="container py-8 px-6 max-w-7xl mx-auto flex-1">
        <Outlet />
      </main>

      <ChatInput onSubmit={handleChatSubmit} />
    </div>
  );
};

export default Layout;
