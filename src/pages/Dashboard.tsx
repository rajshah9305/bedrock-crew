import { Brain, Zap, Target, TrendingUp, ArrowUpRight, Activity } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const stats = [
    { label: "Active Agents", value: "4", icon: Brain, change: "+1", accent: "primary" },
    { label: "Tasks Completed", value: "127", icon: Target, change: "+12", accent: "success" },
    { label: "Avg Response", value: "2.3s", icon: Zap, change: "-0.4s", accent: "warning" },
    { label: "Success Rate", value: "94%", icon: TrendingUp, change: "+2.1%", accent: "primary" },
  ];

  const agents = [
    { name: "Planner", status: "active", tasks: 32, color: "bg-agent-planner" },
    { name: "Researcher", status: "active", tasks: 28, color: "bg-agent-researcher" },
    { name: "Coder", status: "active", tasks: 41, color: "bg-agent-coder" },
    { name: "Reviewer", status: "idle", tasks: 26, color: "bg-agent-reviewer" },
  ];

  const recentTasks = [
    { id: 1, task: "Generate API endpoint for user authentication", status: "completed", agent: "Coder", time: "2m ago" },
    { id: 2, task: "Debug memory leak in data processing", status: "in-progress", agent: "Reviewer", time: "5m ago" },
    { id: 3, task: "Research async operation best practices", status: "completed", agent: "Researcher", time: "12m ago" },
    { id: 4, task: "Plan microservice architecture migration", status: "completed", agent: "Planner", time: "1h ago" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Monitor your AI pipeline performance</p>
        </div>
        <Button className="bg-gradient-hero hover:opacity-90 shadow-sm shadow-primary/20 transition-all">
          <Zap className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card
            key={stat.label}
            className="group relative overflow-hidden p-5 glass hover:shadow-elevated transition-all duration-300 animate-fade-in-up"
            style={{ animationDelay: `${i * 80}ms`, animationFillMode: "backwards" }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                <p className="text-3xl font-extrabold mt-1.5 tracking-tight">{stat.value}</p>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUpRight className="h-3 w-3 text-success" />
                  <span className="text-xs font-bold text-success">{stat.change}</span>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-secondary group-hover:bg-primary/10 transition-colors">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-hero opacity-0 group-hover:opacity-100 transition-opacity" />
          </Card>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid gap-4 lg:grid-cols-5">
        {/* Agents */}
        <Card className="lg:col-span-2 p-5 glass hover:shadow-elevated transition-all animate-fade-in-up" style={{ animationDelay: "320ms", animationFillMode: "backwards" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Active Agents</h3>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="space-y-2.5">
            {agents.map((agent) => (
              <div key={agent.name} className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors group">
                <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${agent.color} ${agent.status === "active" ? "animate-pulse shadow-sm" : "opacity-40"}`} />
                  <div>
                    <span className="text-sm font-semibold">{agent.name}</span>
                    <span className="text-xs text-muted-foreground ml-2">{agent.tasks} tasks</span>
                  </div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  agent.status === "active" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
                }`}>
                  {agent.status}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Tasks */}
        <Card className="lg:col-span-3 p-5 glass hover:shadow-elevated transition-all animate-fade-in-up" style={{ animationDelay: "400ms", animationFillMode: "backwards" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Recent Tasks</h3>
            <Button variant="ghost" size="sm" className="text-xs text-primary hover:text-primary font-semibold">View All</Button>
          </div>
          <div className="space-y-2">
            {recentTasks.map((task) => (
              <div key={task.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors cursor-pointer group">
                <div className={`w-1.5 h-8 rounded-full shrink-0 ${
                  task.status === "completed" ? "bg-success" : "bg-warning"
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">{task.task}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">{task.agent}</span>
                    <span className="text-muted-foreground/30">·</span>
                    <span className="text-[10px] text-muted-foreground">{task.time}</span>
                  </div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  task.status === "completed" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                }`}>
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
