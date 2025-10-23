import { Settings, Zap, Brain, Database } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const Models = () => {
  const models = [
    {
      name: "Claude 3.5 Sonnet",
      provider: "Anthropic",
      status: "active",
      tasks: 45,
      icon: Brain,
      color: "text-agent-planner",
    },
    {
      name: "Llama 3 70B",
      provider: "Meta",
      status: "active",
      tasks: 32,
      icon: Zap,
      color: "text-agent-coder",
    },
    {
      name: "Titan Text Express",
      provider: "AWS",
      status: "inactive",
      tasks: 0,
      icon: Database,
      color: "text-muted-foreground",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Models & Settings</h1>
          <p className="text-muted-foreground mt-1">Manage AWS Bedrock AI models and configuration</p>
        </div>
        <Button variant="outline">
          <Settings className="mr-2 h-4 w-4" />
          Configure AWS
        </Button>
      </div>

      <div className="grid gap-6">
        {models.map((model) => (
          <Card key={model.name} className="p-6 shadow-card hover:shadow-elevated transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg bg-secondary`}>
                  <model.icon className={`h-6 w-6 ${model.color}`} />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold">{model.name}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        model.status === "active"
                          ? "bg-success/10 text-success"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {model.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Provider: {model.provider}</p>
                  <p className="text-sm text-muted-foreground">Tasks completed: {model.tasks}</p>
                </div>
              </div>
              <Switch checked={model.status === "active"} />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6 shadow-card">
          <h3 className="text-lg font-semibold mb-4">Agent Configuration</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Planner Agent</p>
                <p className="text-sm text-muted-foreground">Task decomposition & strategy</p>
              </div>
              <span className="text-sm font-medium">Claude 3.5</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Researcher Agent</p>
                <p className="text-sm text-muted-foreground">Context & knowledge retrieval</p>
              </div>
              <span className="text-sm font-medium">Claude 3.5</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Coder Agent</p>
                <p className="text-sm text-muted-foreground">Code generation & implementation</p>
              </div>
              <span className="text-sm font-medium">Llama 3 70B</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Reviewer Agent</p>
                <p className="text-sm text-muted-foreground">Testing & quality assurance</p>
              </div>
              <span className="text-sm font-medium">Llama 3 70B</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 shadow-card">
          <h3 className="text-lg font-semibold mb-4">API Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">AWS Region</label>
              <div className="mt-2 p-3 rounded-lg bg-secondary text-sm">us-east-1</div>
            </div>
            <div>
              <label className="text-sm font-medium">Access Key ID</label>
              <div className="mt-2 p-3 rounded-lg bg-secondary text-sm font-mono">AKIA••••••••••••</div>
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90">
              Update Credentials
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Models;
