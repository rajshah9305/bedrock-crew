import { Clock, CheckCircle2, XCircle, Code2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const History = () => {
  const tasks = [
    {
      id: 1,
      title: "Generate REST API endpoints",
      status: "completed",
      timestamp: "2 hours ago",
      duration: "4.2s",
      agents: ["Planner", "Coder", "Reviewer"],
    },
    {
      id: 2,
      title: "Debug async/await issues",
      status: "completed",
      timestamp: "5 hours ago",
      duration: "6.8s",
      agents: ["Researcher", "Reviewer"],
    },
    {
      id: 3,
      title: "Optimize database queries",
      status: "failed",
      timestamp: "1 day ago",
      duration: "12.1s",
      agents: ["Planner", "Researcher", "Coder"],
    },
    {
      id: 4,
      title: "Implement authentication flow",
      status: "completed",
      timestamp: "2 days ago",
      duration: "8.5s",
      agents: ["Planner", "Researcher", "Coder", "Reviewer"],
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Task History</h1>
          <p className="text-muted-foreground mt-1">View past executions and agent logs</p>
        </div>
        <Button variant="outline">
          <Clock className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <Card key={task.id} className="p-6 shadow-card hover:shadow-elevated transition-all duration-200 border-l-4 border-l-transparent hover:border-l-primary cursor-pointer">
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${task.status === "completed" ? "bg-success/10" : "bg-destructive/10"}`}>
                    {task.status === "completed" ? (
                      <CheckCircle2 className="h-5 w-5 text-success" />
                    ) : (
                      <XCircle className="h-5 w-5 text-destructive" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold tracking-tight">{task.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                      <span className="font-medium">{task.timestamp}</span>
                      <span className="text-border">•</span>
                      <span>Duration: <span className="font-semibold text-foreground">{task.duration}</span></span>
                    </div>
                  </div>
                  <span
                    className={`text-xs px-3 py-1.5 rounded-full font-medium ${
                      task.status === "completed"
                        ? "bg-success/10 text-success border border-success/20"
                        : "bg-destructive/10 text-destructive border border-destructive/20"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-wrap ml-14">
                  {task.agents.map((agent) => (
                    <span
                      key={agent}
                      className="text-xs px-3 py-1 rounded-lg bg-gradient-card border border-border/50 font-medium"
                    >
                      {agent}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 flex-shrink-0">
                <Button variant="outline" size="sm" className="hover:border-primary hover:bg-primary/5">
                  <Code2 className="h-4 w-4 mr-1" />
                  Code
                </Button>
                <Button variant="outline" size="sm" className="hover:border-primary hover:bg-primary/5">
                  View Logs
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 shadow-card hover:shadow-elevated transition-shadow bg-gradient-card border-2 border-border/50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2 tracking-tight">Storage Usage</h3>
            <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">127 tasks</span> stored · <span className="font-semibold text-foreground">2.3 GB</span> used</p>
          </div>
          <Button variant="outline" className="hover:border-primary hover:bg-primary/5">Manage Storage</Button>
        </div>
      </Card>
    </div>
  );
};

export default History;
