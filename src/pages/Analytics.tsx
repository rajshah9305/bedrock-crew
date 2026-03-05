import { TrendingUp, Clock, Target, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

const Analytics = () => {
  const metrics = [
    { label: "Avg Success Rate", value: "94.2%", change: "+2.1%", trend: "up" },
    { label: "Avg Response Time", value: "2.3s", change: "-0.4s", trend: "up" },
    { label: "Tasks This Week", value: "87", change: "+12", trend: "up" },
    { label: "Agent Efficiency", value: "91%", change: "+3.2%", trend: "up" },
  ];

  const agentPerformance = [
    { name: "Planner", accuracy: 96, speed: 1.2, tasks: 87 },
    { name: "Researcher", accuracy: 93, speed: 2.1, tasks: 72 },
    { name: "Coder", accuracy: 91, speed: 3.4, tasks: 65 },
    { name: "Reviewer", accuracy: 95, speed: 2.8, tasks: 58 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground mt-1">Performance metrics and insights</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.label} className="p-6 shadow-card hover:shadow-elevated transition-all duration-200 border-l-4 border-l-transparent hover:border-l-primary">
            <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
            <div className="flex items-end justify-between mt-3">
              <p className="text-3xl font-bold tracking-tight">{metric.value}</p>
              <span className="text-sm font-semibold text-success flex items-center gap-1 bg-success/10 px-2 py-1 rounded-lg">
                <TrendingUp className="h-4 w-4" />
                {metric.change}
              </span>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 shadow-card hover:shadow-elevated transition-shadow">
        <h3 className="text-lg font-semibold mb-6 tracking-tight">Agent Performance</h3>
        <div className="space-y-8">
          {agentPerformance.map((agent) => (
            <div key={agent.name} className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-base">{agent.name}</span>
                <span className="text-sm font-medium text-muted-foreground bg-secondary px-3 py-1 rounded-lg">{agent.tasks} tasks</span>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="font-medium text-muted-foreground">Accuracy</span>
                    <span className="font-bold text-success">{agent.accuracy}%</span>
                  </div>
                  <div className="h-3 bg-secondary rounded-full overflow-hidden shadow-inner">
                    <div
                      className="h-full bg-success rounded-full transition-all shadow-sm"
                      style={{ width: `${agent.accuracy}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="font-medium text-muted-foreground">Avg Speed</span>
                    <span className="font-bold text-primary">{agent.speed}s</span>
                  </div>
                  <div className="h-3 bg-secondary rounded-full overflow-hidden shadow-inner">
                    <div
                      className="h-full bg-primary rounded-full transition-all shadow-sm"
                      style={{ width: `${100 - agent.speed * 20}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6 shadow-card hover:shadow-elevated transition-shadow">
          <h3 className="text-lg font-semibold mb-6 tracking-tight">Most Used Features</h3>
          <div className="space-y-4">
            {["Code Generation", "Debug & Fix", "Code Explanation", "Optimization"].map((feature, i) => (
              <div key={feature} className="p-3 rounded-lg bg-gradient-card border border-border/50 hover:border-primary/30 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{feature}</span>
                  <span className="text-sm font-bold">{90 - i * 15}%</span>
                </div>
                <div className="h-2.5 bg-secondary rounded-full overflow-hidden shadow-inner">
                  <div
                    className="h-full bg-primary rounded-full shadow-sm transition-all"
                    style={{ width: `${90 - i * 15}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 shadow-card hover:shadow-elevated transition-shadow">
          <h3 className="text-lg font-semibold mb-6 tracking-tight">Weekly Activity</h3>
          <div className="space-y-3">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
              <div key={day} className="flex items-center gap-3">
                <span className="text-sm font-semibold w-12">{day}</span>
                <div className="flex-1">
                  <div className="h-9 bg-secondary rounded-lg overflow-hidden shadow-inner">
                    <div
                      className="h-full bg-gradient-hero rounded-lg transition-all flex items-center justify-end pr-3 shadow-sm"
                      style={{ width: `${Math.random() * 50 + 40}%` }}
                    >
                      <span className="text-xs text-primary-foreground font-bold">
                        {Math.floor(Math.random() * 20 + 10)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
