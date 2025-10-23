import { Brain, Zap, Target, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const stats = [
    { label: "Active Agents", value: "4", icon: Brain, color: "text-primary" },
    { label: "Tasks Completed", value: "127", icon: Target, color: "text-success" },
    { label: "Avg Response Time", value: "2.3s", icon: Zap, color: "text-warning" },
    { label: "Success Rate", value: "94%", icon: TrendingUp, color: "text-agent-planner" },
  ];

  const recentTasks = [
    { id: 1, task: "Generate API endpoint for user authentication", status: "completed", agent: "Coder" },
    { id: 2, task: "Debug memory leak in data processing", status: "in-progress", agent: "Reviewer" },
    { id: 3, task: "Research best practices for async operations", status: "completed", agent: "Researcher" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Monitor your AI agent pipeline performance</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Zap className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6 shadow-card hover:shadow-elevated transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
              </div>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6 shadow-card">
          <h3 className="text-lg font-semibold mb-4">Active Agents</h3>
          <div className="space-y-4">
            {["Planner", "Researcher", "Coder", "Reviewer"].map((agent, i) => (
              <div key={agent} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full bg-agent-${agent.toLowerCase()} animate-pulse`} />
                  <span className="font-medium">{agent} Agent</span>
                </div>
                <span className="text-sm text-success">Active</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 shadow-card">
          <h3 className="text-lg font-semibold mb-4">Recent Tasks</h3>
          <div className="space-y-3">
            {recentTasks.map((task) => (
              <div key={task.id} className="p-3 rounded-lg border border-border hover:border-primary/50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm font-medium">{task.task}</p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      task.status === "completed"
                        ? "bg-success/10 text-success"
                        : "bg-warning/10 text-warning"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">Agent: {task.agent}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
