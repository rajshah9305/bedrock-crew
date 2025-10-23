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

      <Card className="p-8 shadow-elevated">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-3 flex-1">
                <div
                  className={`relative w-20 h-20 rounded-full border-4 flex items-center justify-center transition-all ${
                    step.status === "completed"
                      ? `border-${step.color} bg-${step.color}/10`
                      : step.status === "active"
                      ? `border-${step.color} bg-${step.color}/20 animate-agent-glow`
                      : "border-border bg-secondary"
                  }`}
                >
                  {step.status === "completed" && (
                    <CheckCircle2 className={`h-8 w-8 text-${step.color}`} />
                  )}
                  {step.status === "active" && (
                    <Clock className={`h-8 w-8 text-${step.color} animate-pulse`} />
                  )}
                  {step.status === "pending" && (
                    <div className="w-8 h-8 rounded-full border-2 border-muted" />
                  )}
                </div>
                <div className="text-center">
                  <p className="font-semibold">{step.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{step.description}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <ArrowRight
                  className={`h-6 w-6 mx-4 ${
                    step.status === "completed" ? "text-primary" : "text-muted-foreground"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6 shadow-card">
          <h3 className="text-lg font-semibold mb-4">Current Execution</h3>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-gradient-card border border-border">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium">Task Input</span>
                <span className="text-xs text-muted-foreground">00:00:12</span>
              </div>
              <p className="text-sm text-muted-foreground">
                "Create a REST API endpoint for user profile management with full CRUD operations"
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-sm">Planner: Task decomposed into 4 subtasks</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-warning animate-pulse" />
                <span className="text-sm">Researcher: Gathering best practices for RESTful design...</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 shadow-card">
          <h3 className="text-lg font-semibold mb-4">Agent Logs</h3>
          <div className="space-y-2 font-mono text-xs bg-secondary/50 p-4 rounded-lg h-64 overflow-y-auto">
            <p className="text-agent-planner">[PLANNER] Analyzing task requirements...</p>
            <p className="text-agent-planner">[PLANNER] Breaking down into subtasks: Auth, CRUD, Validation, Tests</p>
            <p className="text-success">[PLANNER] ✓ Task planning complete (2.1s)</p>
            <p className="text-agent-researcher">[RESEARCHER] Searching for REST API patterns...</p>
            <p className="text-agent-researcher">[RESEARCHER] Found 23 relevant examples</p>
            <p className="text-agent-researcher">[RESEARCHER] Analyzing Express.js best practices...</p>
            <p className="text-warning animate-pulse">[RESEARCHER] Processing contextual data...</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Pipeline;
