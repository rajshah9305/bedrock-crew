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
          <Card key={task.id} className="p-6 shadow-card hover:shadow-elevated transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {task.status === "completed" ? (
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  ) : (
                    <XCircle className="h-5 w-5 text-destructive" />
                  )}
                  <h3 className="text-lg font-semibold">{task.title}</h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      task.status === "completed"
                        ? "bg-success/10 text-success"
                        : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span>{task.timestamp}</span>
                  <span>•</span>
                  <span>Duration: {task.duration}</span>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {task.agents.map((agent) => (
                    <span
                      key={agent}
                      className="text-xs px-2 py-1 rounded-md bg-secondary text-foreground"
                    >
                      {agent}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Code2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  View Logs
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 shadow-card bg-gradient-card">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-1">Storage Usage</h3>
            <p className="text-sm text-muted-foreground">127 tasks stored · 2.3 GB used</p>
          </div>
          <Button variant="outline">Manage Storage</Button>
        </div>
      </Card>
    </div>
  );
};

export default History;
