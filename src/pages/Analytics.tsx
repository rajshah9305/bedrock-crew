import { TrendingUp, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";

const Analytics = () => {
  const metrics = [
    { label: "Success Rate", value: "94.2%", change: "+2.1%" },
    { label: "Avg Response", value: "2.3s", change: "-0.4s" },
    { label: "Tasks / Week", value: "87", change: "+12" },
    { label: "Efficiency", value: "91%", change: "+3.2%" },
  ];

  const agents = [
    { name: "Planner", accuracy: 96, speed: 1.2, tasks: 87 },
    { name: "Researcher", accuracy: 93, speed: 2.1, tasks: 72 },
    { name: "Coder", accuracy: 91, speed: 3.4, tasks: 65 },
    { name: "Reviewer", accuracy: 95, speed: 2.8, tasks: 58 },
  ];

  const weekData = [
    { day: "Mon", value: 72 }, { day: "Tue", value: 85 },
    { day: "Wed", value: 64 }, { day: "Thu", value: 91 },
    { day: "Fri", value: 78 }, { day: "Sat", value: 45 },
    { day: "Sun", value: 38 },
  ];
  const maxVal = Math.max(...weekData.map(d => d.value));

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Performance metrics and insights</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m, i) => (
          <Card key={m.label} className="p-5 glass hover:shadow-elevated transition-all animate-fade-in-up" style={{ animationDelay: `${i * 80}ms`, animationFillMode: "backwards" }}>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{m.label}</p>
            <div className="flex items-end justify-between mt-2">
              <p className="text-3xl font-extrabold tracking-tight">{m.value}</p>
              <span className="text-xs font-bold text-success flex items-center gap-0.5 bg-success/10 px-1.5 py-0.5 rounded-md">
                <ArrowUpRight className="h-3 w-3" />{m.change}
              </span>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        {/* Agent Performance */}
        <Card className="lg:col-span-3 p-5 glass hover:shadow-elevated transition-all animate-fade-in-up" style={{ animationDelay: "320ms", animationFillMode: "backwards" }}>
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-5">Agent Performance</h3>
          <div className="space-y-5">
            {agents.map((agent) => (
              <div key={agent.name} className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">{agent.name}</span>
                  <span className="text-[10px] font-semibold text-muted-foreground bg-secondary px-2 py-0.5 rounded-md">{agent.tasks} tasks</span>
                </div>
                <div>
                  <div className="flex items-center justify-between text-[10px] mb-1">
                    <span className="text-muted-foreground font-medium">Accuracy</span>
                    <span className="font-bold text-success">{agent.accuracy}%</span>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-success rounded-full transition-all" style={{ width: `${agent.accuracy}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-[10px] mb-1">
                    <span className="text-muted-foreground font-medium">Speed</span>
                    <span className="font-bold text-primary">{agent.speed}s</span>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${100 - agent.speed * 20}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Weekly Chart */}
        <Card className="lg:col-span-2 p-5 glass hover:shadow-elevated transition-all animate-fade-in-up" style={{ animationDelay: "400ms", animationFillMode: "backwards" }}>
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-5">Weekly Activity</h3>
          <div className="flex items-end gap-2 h-44">
            {weekData.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5">
                <span className="text-[10px] font-bold text-primary">{d.value}</span>
                <div className="w-full bg-secondary rounded-lg overflow-hidden" style={{ height: "100%" }}>
                  <div
                    className="w-full bg-gradient-hero rounded-lg transition-all hover:opacity-80"
                    style={{ height: `${(d.value / maxVal) * 100}%`, marginTop: "auto" }}
                  />
                </div>
                <span className="text-[10px] font-semibold text-muted-foreground">{d.day}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
