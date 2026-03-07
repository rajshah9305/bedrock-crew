import { ArrowRight, CheckCircle2, Clock, Play, Circle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Pipeline = () => {
  const steps = [
    { id: 1, name: "Planner", status: "completed", color: "agent-planner", description: "Task breakdown & strategy" },
    { id: 2, name: "Researcher", status: "active", color: "agent-researcher", description: "Context gathering & analysis" },
    { id: 3, name: "Coder", status: "pending", color: "agent-coder", description: "Code generation & implementation" },
    { id: 4, name: "Reviewer", status: "pending", color: "agent-reviewer", description: "Testing & optimization" },
  ];

  const statusIcon = (status: string, color: string) => {
    if (status === "completed") return <CheckCircle2 className={`h-8 w-8 text-${color}`} />;
    if (status === "active") return <Clock className={`h-8 w-8 text-${color} animate-pulse`} />;
    return <Circle className="h-8 w-8 text-muted-foreground/30" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pipeline Flow</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Visual agent orchestration and execution</p>
        </div>
        <Button className="bg-gradient-hero hover:opacity-90 shadow-sm shadow-primary/20">
          <Play className="mr-2 h-4 w-4" />
          Run Pipeline
        </Button>
      </div>

      {/* Pipeline Steps */}
      <Card className="p-8 glass hover:shadow-elevated transition-all animate-fade-in-up" style={{ animationDelay: "100ms", animationFillMode: "backwards" }}>
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-3 flex-1">
                <div className={`relative w-20 h-20 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 ${
                  step.status === "completed"
                    ? `border-${step.color} bg-${step.color}/10 shadow-sm`
                    : step.status === "active"
                    ? `border-${step.color} bg-${step.color}/5 animate-pulse-glow`
                    : "border-border bg-secondary/30"
                }`}>
                  {statusIcon(step.status, step.color)}
                  {step.status === "active" && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-success animate-pulse border-2 border-card" />
                  )}
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold">{step.name}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5 max-w-[100px]">{step.description}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="flex items-center mx-2">
                  <div className={`h-0.5 w-12 rounded transition-colors ${
                    step.status === "completed" ? "bg-primary" : "bg-border"
                  }`} />
                  <ArrowRight className={`h-4 w-4 shrink-0 ${
                    step.status === "completed" ? "text-primary" : "text-muted-foreground/30"
                  }`} />
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Execution Details */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-5 glass hover:shadow-elevated transition-all animate-fade-in-up" style={{ animationDelay: "200ms", animationFillMode: "backwards" }}>
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Current Execution</h3>
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-secondary/50 border border-primary/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-primary uppercase tracking-wider">Task Input</span>
                <span className="text-[10px] font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded-md">00:12</span>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">
                "Create a REST API endpoint for user profile management with full CRUD operations"
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-success/5 border border-success/10">
                <div className="w-2 h-2 rounded-full bg-success" />
                <span className="text-xs font-medium">Planner: Task decomposed into 4 subtasks</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-warning/5 border border-warning/10">
                <div className="w-2 h-2 rounded-full bg-warning animate-pulse" />
                <span className="text-xs font-medium">Researcher: Gathering REST best practices...</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-5 glass hover:shadow-elevated transition-all animate-fade-in-up" style={{ animationDelay: "300ms", animationFillMode: "backwards" }}>
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Agent Logs</h3>
          <div className="space-y-0.5 font-mono text-[11px] bg-secondary/30 p-3 rounded-xl h-56 overflow-y-auto border border-border/50">
            <p className="text-agent-planner">[PLANNER] Analyzing task requirements...</p>
            <p className="text-agent-planner">[PLANNER] Breaking down: Auth, CRUD, Validation, Tests</p>
            <p className="text-success font-semibold">[PLANNER] ✓ Planning complete (2.1s)</p>
            <p className="text-agent-researcher">[RESEARCHER] Searching REST API patterns...</p>
            <p className="text-agent-researcher">[RESEARCHER] Found 23 relevant examples</p>
            <p className="text-agent-researcher">[RESEARCHER] Analyzing Express.js practices...</p>
            <p className="text-warning animate-pulse">[RESEARCHER] Processing contextual data...</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Pipeline;
