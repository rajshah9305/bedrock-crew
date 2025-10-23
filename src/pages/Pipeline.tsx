import { ArrowRight, CheckCircle2, Clock, Play } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Pipeline = () => {
  const [activeStep, setActiveStep] = useState(2);

  const steps = [
    { id: 1, name: "Planner", status: "completed", color: "agent-planner", description: "Task breakdown & strategy" },
    { id: 2, name: "Researcher", status: "active", color: "agent-researcher", description: "Context gathering & analysis" },
    { id: 3, name: "Coder", status: "pending", color: "agent-coder", description: "Code generation & implementation" },
    { id: 4, name: "Reviewer", status: "pending", color: "agent-reviewer", description: "Testing & optimization" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pipeline Flow</h1>
          <p className="text-muted-foreground mt-1">Visual agent orchestration and execution</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Play className="mr-2 h-4 w-4" />
          Run Pipeline
        </Button>
      </div>

      <Card className="p-8 shadow-elevated bg-gradient-card border-2 border-border/50">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-4 flex-1">
                <div
                  className={`relative w-24 h-24 rounded-full border-4 flex items-center justify-center transition-all shadow-lg ${
                    step.status === "completed"
                      ? `border-${step.color} bg-${step.color}/10`
                      : step.status === "active"
                      ? `border-${step.color} bg-${step.color}/20 animate-agent-glow`
                      : "border-border bg-secondary"
                  }`}
                >
                  {step.status === "completed" && (
                    <CheckCircle2 className={`h-10 w-10 text-${step.color}`} />
                  )}
                  {step.status === "active" && (
                    <Clock className={`h-10 w-10 text-${step.color} animate-pulse`} />
                  )}
                  {step.status === "pending" && (
                    <div className="w-10 h-10 rounded-full border-2 border-muted" />
                  )}
                </div>
                <div className="text-center max-w-[120px]">
                  <p className="font-semibold text-base tracking-tight">{step.name}</p>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-snug">{step.description}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <ArrowRight
                  className={`h-7 w-7 mx-6 transition-colors ${
                    step.status === "completed" ? "text-primary" : "text-muted-foreground"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6 shadow-card hover:shadow-elevated transition-shadow">
          <h3 className="text-lg font-semibold mb-5 tracking-tight">Current Execution</h3>
          <div className="space-y-5">
            <div className="p-5 rounded-xl bg-gradient-card border-2 border-primary/20 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-foreground">Task Input</span>
                <span className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-1 rounded">00:00:12</span>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">
                "Create a REST API endpoint for user profile management with full CRUD operations"
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-success/5 border border-success/20">
                <div className="w-2.5 h-2.5 rounded-full bg-success animate-pulse shadow-sm" />
                <span className="text-sm font-medium">Planner: Task decomposed into 4 subtasks</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-warning/5 border border-warning/20">
                <div className="w-2.5 h-2.5 rounded-full bg-warning animate-pulse shadow-sm" />
                <span className="text-sm font-medium">Researcher: Gathering best practices for RESTful design...</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 shadow-card hover:shadow-elevated transition-shadow">
          <h3 className="text-lg font-semibold mb-5 tracking-tight">Agent Logs</h3>
          <div className="space-y-1.5 font-mono text-xs bg-secondary/50 p-4 rounded-lg h-64 overflow-y-auto border border-border/50">
            <p className="text-agent-planner font-medium">[PLANNER] Analyzing task requirements...</p>
            <p className="text-agent-planner font-medium">[PLANNER] Breaking down into subtasks: Auth, CRUD, Validation, Tests</p>
            <p className="text-success font-semibold">[PLANNER] ✓ Task planning complete (2.1s)</p>
            <p className="text-agent-researcher font-medium">[RESEARCHER] Searching for REST API patterns...</p>
            <p className="text-agent-researcher font-medium">[RESEARCHER] Found 23 relevant examples</p>
            <p className="text-agent-researcher font-medium">[RESEARCHER] Analyzing Express.js best practices...</p>
            <p className="text-warning animate-pulse font-semibold">[RESEARCHER] Processing contextual data...</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Pipeline;
