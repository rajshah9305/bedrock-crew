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
          <Card key={metric.label} className="p-6 shadow-card">
            <p className="text-sm text-muted-foreground">{metric.label}</p>
            <div className="flex items-end justify-between mt-2">
              <p className="text-3xl font-bold">{metric.value}</p>
              <span className="text-sm text-success flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                {metric.change}
              </span>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 shadow-card">
        <h3 className="text-lg font-semibold mb-6">Agent Performance</h3>
        <div className="space-y-6">
          {agentPerformance.map((agent) => (
            <div key={agent.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">{agent.name}</span>
                <span className="text-sm text-muted-foreground">{agent.tasks} tasks</span>
              </div>

              <div className="space-y-2">
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Accuracy</span>
                    <span className="font-medium">{agent.accuracy}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-success rounded-full transition-all"
                      style={{ width: `${agent.accuracy}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Avg Speed</span>
                    <span className="font-medium">{agent.speed}s</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
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
        <Card className="p-6 shadow-card">
          <h3 className="text-lg font-semibold mb-4">Most Used Features</h3>
          <div className="space-y-3">
            {["Code Generation", "Debug & Fix", "Code Explanation", "Optimization"].map((feature, i) => (
              <div key={feature} className="flex items-center justify-between">
                <span className="text-sm">{feature}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${90 - i * 15}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium w-12 text-right">{90 - i * 15}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 shadow-card">
          <h3 className="text-lg font-semibold mb-4">Weekly Activity</h3>
          <div className="space-y-3">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
              <div key={day} className="flex items-center justify-between">
                <span className="text-sm w-12">{day}</span>
                <div className="flex-1 mx-4">
                  <div className="h-8 bg-secondary rounded overflow-hidden">
                    <div
                      className="h-full bg-gradient-hero rounded transition-all flex items-center justify-end pr-2"
                      style={{ width: `${Math.random() * 50 + 40}%` }}
                    >
                      <span className="text-xs text-primary-foreground font-medium">
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
