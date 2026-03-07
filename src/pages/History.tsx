import { Clock, CheckCircle2, XCircle, Code2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const History = () => {
  const tasks = [
    { id: 1, title: "Generate REST API endpoints", status: "completed", timestamp: "2 hours ago", duration: "4.2s", agents: ["Planner", "Coder", "Reviewer"] },
    { id: 2, title: "Debug async/await issues", status: "completed", timestamp: "5 hours ago", duration: "6.8s", agents: ["Researcher", "Reviewer"] },
    { id: 3, title: "Optimize database queries", status: "failed", timestamp: "1 day ago", duration: "12.1s", agents: ["Planner", "Researcher", "Coder"] },
    { id: 4, title: "Implement authentication flow", status: "completed", timestamp: "2 days ago", duration: "8.5s", agents: ["Planner", "Researcher", "Coder", "Reviewer"] },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Task History</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Past executions and agent logs</p>
        </div>
        <Button variant="outline" className="text-xs">
          <Clock className="mr-2 h-3.5 w-3.5" />
          Filter
        </Button>
      </div>

      <div className="space-y-3">
        {tasks.map((task, i) => (
          <Card
            key={task.id}
            className="p-4 glass hover:shadow-elevated transition-all duration-200 cursor-pointer group animate-fade-in-up"
            style={{ animationDelay: `${i * 80}ms`, animationFillMode: "backwards" }}
          >
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-xl shrink-0 ${task.status === "completed" ? "bg-success/10" : "bg-destructive/10"}`}>
                {task.status === "completed" ? (
                  <CheckCircle2 className="h-4 w-4 text-success" />
                ) : (
                  <XCircle className="h-4 w-4 text-destructive" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold group-hover:text-primary transition-colors">{task.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-muted-foreground">{task.timestamp}</span>
                  <span className="text-muted-foreground/30">·</span>
                  <span className="text-[10px] font-semibold text-foreground">{task.duration}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-2">
                  {task.agents.map((agent) => (
                    <span key={agent} className="text-[10px] px-2 py-0.5 rounded-md bg-secondary font-semibold">{agent}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="outline" size="sm" className="h-7 text-[10px] hover:border-primary hover:text-primary">
                  <Code2 className="h-3 w-3 mr-1" />Code
                </Button>
                <Button variant="outline" size="sm" className="h-7 text-[10px] hover:border-primary hover:text-primary">Logs</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-4 glass animate-fade-in-up" style={{ animationDelay: "350ms", animationFillMode: "backwards" }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Storage</p>
            <p className="text-sm mt-0.5"><span className="font-bold">127</span> tasks · <span className="font-bold">2.3 GB</span></p>
          </div>
          <Button variant="outline" size="sm" className="text-xs">Manage</Button>
        </div>
      </Card>
    </div>
  );
};

export default History;
