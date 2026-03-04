import { useState } from "react";
import { Settings, Zap, Brain, Database, Loader2, CheckCircle, XCircle, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const ICON_MAP: Record<string, React.ElementType> = {
  brain: Brain,
  zap: Zap,
  database: Database,
};

const AWS_REGIONS = [
  "us-east-1", "us-east-2", "us-west-2", "eu-west-1", "eu-central-1",
  "ap-southeast-1", "ap-northeast-1",
];

const Models = () => {
  const queryClient = useQueryClient();
  const [testingModelId, setTestingModelId] = useState<string | null>(null);
  const [testPrompt, setTestPrompt] = useState("Write a hello world function in Python.");
  const [testResult, setTestResult] = useState<string | null>(null);

  // Fetch models
  const { data: models = [], isLoading: modelsLoading } = useQuery({
    queryKey: ["ai_models"],
    queryFn: async () => {
      const { data, error } = await supabase.from("ai_models").select("*").order("created_at");
      if (error) throw error;
      return data;
    },
  });

  // Fetch agent configs with joined model name
  const { data: agentConfigs = [] } = useQuery({
    queryKey: ["agent_configurations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("agent_configurations")
        .select("*, ai_models(name)")
        .order("created_at");
      if (error) throw error;
      return data;
    },
  });

  // Fetch AWS config
  const { data: awsConfig } = useQuery({
    queryKey: ["aws_config"],
    queryFn: async () => {
      const { data, error } = await supabase.from("aws_config").select("*").limit(1).single();
      if (error) throw error;
      return data;
    },
  });

  // Toggle model status
  const toggleModel = useMutation({
    mutationFn: async ({ id, newStatus }: { id: string; newStatus: string }) => {
      const { error } = await supabase.from("ai_models").update({ status: newStatus }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ai_models"] });
      toast({ title: "Model status updated" });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  // Update agent model assignment
  const updateAgentModel = useMutation({
    mutationFn: async ({ agentId, modelId }: { agentId: string; modelId: string }) => {
      const { error } = await supabase
        .from("agent_configurations")
        .update({ assigned_model_id: modelId })
        .eq("id", agentId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agent_configurations"] });
      toast({ title: "Agent model updated" });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  // Update AWS region
  const updateRegion = useMutation({
    mutationFn: async (region: string) => {
      if (!awsConfig) return;
      const { error } = await supabase.from("aws_config").update({ region }).eq("id", awsConfig.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["aws_config"] });
      toast({ title: "AWS region updated" });
    },
  });

  // Test model invocation
  const testModel = async (modelId: string, bedrockModelId: string) => {
    setTestingModelId(modelId);
    setTestResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("bedrock-invoke", {
        body: {
          model_id: bedrockModelId,
          prompt: testPrompt,
          region: awsConfig?.region || "us-east-1",
        },
      });
      if (error) throw error;
      if (data?.error) {
        setTestResult(`❌ ${data.error}`);
      } else {
        setTestResult(data?.output || "No output returned");
      }
    } catch (err: any) {
      setTestResult(`❌ ${err.message}`);
    } finally {
      setTestingModelId(null);
    }
  };

  const activeModels = models.filter((m) => m.status === "active");

  if (modelsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Models & Settings</h1>
          <p className="text-muted-foreground mt-1">Manage AWS Bedrock AI models and configuration</p>
        </div>
        <Button variant="outline" onClick={() => queryClient.invalidateQueries()}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Models List */}
      <div className="grid gap-4">
        {models.map((model) => {
          const IconComp = ICON_MAP[model.icon] || Brain;
          const isActive = model.status === "active";
          return (
            <Card key={model.id} className="p-6 shadow-card hover:shadow-elevated transition-all duration-200 border-l-4 border-l-transparent hover:border-l-primary">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="p-4 rounded-xl bg-gradient-card border border-border/50">
                    <IconComp className={`h-7 w-7 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold tracking-tight">{model.name}</h3>
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          isActive
                            ? "bg-success/10 text-success border border-success/20"
                            : "bg-muted text-muted-foreground border border-border"
                        }`}
                      >
                        {model.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Provider: <span className="font-medium text-foreground">{model.provider}</span></span>
                      <span className="text-border">•</span>
                      <span>Tasks: <span className="font-medium text-foreground">{model.tasks_completed}</span></span>
                      <span className="text-border">•</span>
                      <span className="font-mono text-xs">{model.model_id}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={!isActive || testingModelId === model.id}
                    onClick={() => testModel(model.id, model.model_id)}
                  >
                    {testingModelId === model.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Test"
                    )}
                  </Button>
                  <Switch
                    checked={isActive}
                    onCheckedChange={(checked) =>
                      toggleModel.mutate({ id: model.id, newStatus: checked ? "active" : "inactive" })
                    }
                  />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Test Result */}
      {testResult && (
        <Card className="p-4 shadow-card">
          <div className="flex items-start gap-3">
            {testResult.startsWith("❌") ? (
              <XCircle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
            ) : (
              <CheckCircle className="h-5 w-5 text-success mt-0.5 shrink-0" />
            )}
            <div className="flex-1">
              <h4 className="font-semibold text-sm mb-1">Test Result</h4>
              <pre className="text-sm whitespace-pre-wrap font-mono bg-muted p-3 rounded-lg max-h-48 overflow-y-auto">
                {testResult}
              </pre>
            </div>
            <Button size="sm" variant="ghost" onClick={() => setTestResult(null)}>
              ✕
            </Button>
          </div>
        </Card>
      )}

      {/* Test Prompt */}
      <Card className="p-4 shadow-card">
        <Label className="text-sm font-semibold mb-2 block">Test Prompt</Label>
        <Input
          value={testPrompt}
          onChange={(e) => setTestPrompt(e.target.value)}
          placeholder="Enter a prompt to test models..."
        />
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Agent Configuration */}
        <Card className="p-6 shadow-card hover:shadow-elevated transition-shadow">
          <h3 className="text-lg font-semibold mb-6 tracking-tight">Agent Configuration</h3>
          <div className="space-y-4">
            {agentConfigs.map((agent) => (
              <div key={agent.id} className="flex items-center justify-between p-4 rounded-lg bg-gradient-card border border-border/50">
                <div>
                  <p className="font-medium">{agent.agent_name}</p>
                  <p className="text-sm text-muted-foreground">{agent.agent_description}</p>
                </div>
                <Select
                  value={agent.assigned_model_id || ""}
                  onValueChange={(val) => updateAgentModel.mutate({ agentId: agent.id, modelId: val })}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    {activeModels.map((m) => (
                      <SelectItem key={m.id} value={m.id}>
                        {m.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        </Card>

        {/* API Settings */}
        <Card className="p-6 shadow-card hover:shadow-elevated transition-shadow">
          <h3 className="text-lg font-semibold mb-6 tracking-tight">API Settings</h3>
          <div className="space-y-5">
            <div>
              <Label className="text-sm font-semibold mb-2 block">AWS Region</Label>
              <Select
                value={awsConfig?.region || "us-east-1"}
                onValueChange={(val) => updateRegion.mutate(val)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {AWS_REGIONS.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-semibold mb-2 block">Access Key ID</Label>
              <div className="p-3 rounded-lg bg-gradient-card border border-border/50 text-sm font-mono">
                {Deno ? "Configured via secrets" : "AKIA••••••••••••"}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Managed securely via Cloud secrets
              </p>
            </div>
            <div className="p-4 rounded-lg border border-warning/30 bg-warning/5">
              <p className="text-sm font-medium text-warning">⚠️ AWS Credentials</p>
              <p className="text-xs text-muted-foreground mt-1">
                Add AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY as Cloud secrets to enable Bedrock.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Models;
