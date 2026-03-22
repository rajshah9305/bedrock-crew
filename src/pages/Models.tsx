import { useState, type ElementType } from "react";
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

const ICON_MAP: Record<string, ElementType> = { brain: Brain, zap: Zap, database: Database };
const AWS_REGIONS = ["us-east-1", "us-east-2", "us-west-2", "eu-west-1", "eu-central-1", "ap-southeast-1", "ap-northeast-1"];

const Models = () => {
  const queryClient = useQueryClient();
  const [testingModelId, setTestingModelId] = useState<string | null>(null);
  const [testPrompt, setTestPrompt] = useState("Write a hello world function in Python.");
  const [testResult, setTestResult] = useState<string | null>(null);

  const { data: models = [], isLoading } = useQuery({
    queryKey: ["ai_models"],
    queryFn: async () => {
      const { data, error } = await supabase.from("ai_models").select("*").order("created_at");
      if (error) throw error;
      return data;
    },
  });

  const { data: agentConfigs = [] } = useQuery({
    queryKey: ["agent_configurations"],
    queryFn: async () => {
      const { data, error } = await supabase.from("agent_configurations").select("*, ai_models(name)").order("created_at");
      if (error) throw error;
      return data;
    },
  });

  const { data: awsConfig } = useQuery({
    queryKey: ["aws_config"],
    queryFn: async () => {
      const { data, error } = await supabase.from("aws_config").select("*").limit(1).single();
      if (error) throw error;
      return data;
    },
  });

  const toggleModel = useMutation({
    mutationFn: async ({ id, newStatus }: { id: string; newStatus: string }) => {
      const { error } = await supabase.from("ai_models").update({ status: newStatus }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["ai_models"] }); toast({ title: "Model status updated" }); },
    onError: (err: Error) => { toast({ title: "Error", description: err.message, variant: "destructive" }); },
  });

  const updateAgentModel = useMutation({
    mutationFn: async ({ agentId, modelId }: { agentId: string; modelId: string }) => {
      const { error } = await supabase.from("agent_configurations").update({ assigned_model_id: modelId }).eq("id", agentId);
      if (error) throw error;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["agent_configurations"] }); toast({ title: "Agent model updated" }); },
    onError: (err: Error) => { toast({ title: "Error", description: err.message, variant: "destructive" }); },
  });

  const updateRegion = useMutation({
    mutationFn: async (region: string) => {
      if (!awsConfig) return;
      const { error } = await supabase.from("aws_config").update({ region }).eq("id", awsConfig.id);
      if (error) throw error;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["aws_config"] }); toast({ title: "AWS region updated" }); },
  });

  const testModel = async (modelId: string, bedrockModelId: string) => {
    setTestingModelId(modelId);
    setTestResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("bedrock-invoke", {
        body: { model_id: bedrockModelId, prompt: testPrompt, region: awsConfig?.region || "us-east-1" },
      });
      if (error) throw error;
      setTestResult(data?.error ? `❌ ${data.error}` : data?.output || "No output");
    } catch (err: unknown) {
      setTestResult(`❌ ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setTestingModelId(null);
    }
  };

  const activeModels = models.filter((m) => m.status === "active");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Models & Settings</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Manage AWS Bedrock AI models</p>
        </div>
        <Button variant="outline" size="sm" className="text-xs" onClick={() => queryClient.invalidateQueries()}>
          <RefreshCw className="mr-1.5 h-3.5 w-3.5" />Refresh
        </Button>
      </div>

      {/* Models */}
      <div className="space-y-3">
        {models.map((model, i) => {
          const Icon = ICON_MAP[model.icon] || Brain;
          const active = model.status === "active";
          return (
            <Card
              key={model.id}
              className="p-4 glass hover:shadow-elevated transition-all group animate-fade-in-up"
              style={{ animationDelay: `${i * 60}ms`, animationFillMode: "backwards" }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl transition-colors ${active ? "bg-primary/10" : "bg-secondary"}`}>
                    <Icon className={`h-5 w-5 ${active ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold">{model.name}</h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        active ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
                      }`}>{model.status}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-0.5 text-[10px] text-muted-foreground">
                      <span>{model.provider}</span>
                      <span className="text-border">·</span>
                      <span>{model.tasks_completed} tasks</span>
                      <span className="text-border">·</span>
                      <span className="font-mono">{model.model_id}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button size="sm" variant="outline" className="h-7 text-[10px]" disabled={!active || testingModelId === model.id} onClick={() => testModel(model.id, model.model_id)}>
                    {testingModelId === model.id ? <Loader2 className="h-3 w-3 animate-spin" /> : "Test"}
                  </Button>
                  <Switch checked={active} onCheckedChange={(checked) => toggleModel.mutate({ id: model.id, newStatus: checked ? "active" : "inactive" })} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Test Result */}
      {testResult && (
        <Card className="p-4 glass animate-scale-in">
          <div className="flex items-start gap-3">
            {testResult.startsWith("❌") ? <XCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" /> : <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" />}
            <div className="flex-1">
              <p className="text-xs font-bold mb-1">Test Result</p>
              <pre className="text-xs whitespace-pre-wrap font-mono bg-secondary p-3 rounded-lg max-h-40 overflow-y-auto">{testResult}</pre>
            </div>
            <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={() => setTestResult(null)}>✕</Button>
          </div>
        </Card>
      )}

      <Card className="p-4 glass">
        <Label className="text-xs font-bold mb-1.5 block">Test Prompt</Label>
        <Input value={testPrompt} onChange={(e) => setTestPrompt(e.target.value)} placeholder="Enter a test prompt..." className="text-sm" />
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-5 glass hover:shadow-elevated transition-all animate-fade-in-up" style={{ animationDelay: "400ms", animationFillMode: "backwards" }}>
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Agent Configuration</h3>
          <div className="space-y-2.5">
            {agentConfigs.map((agent) => (
              <div key={agent.id} className="flex items-center justify-between p-3 rounded-xl bg-secondary/50">
                <div>
                  <p className="text-sm font-semibold">{agent.agent_name}</p>
                  <p className="text-[10px] text-muted-foreground">{agent.agent_description}</p>
                </div>
                <Select value={agent.assigned_model_id || ""} onValueChange={(val) => updateAgentModel.mutate({ agentId: agent.id, modelId: val })}>
                  <SelectTrigger className="w-[160px] h-8 text-xs"><SelectValue placeholder="Select model" /></SelectTrigger>
                  <SelectContent>
                    {activeModels.map((m) => (<SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5 glass hover:shadow-elevated transition-all animate-fade-in-up" style={{ animationDelay: "480ms", animationFillMode: "backwards" }}>
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">API Settings</h3>
          <div className="space-y-4">
            <div>
              <Label className="text-xs font-bold mb-1.5 block">AWS Region</Label>
              <Select value={awsConfig?.region || "us-east-1"} onValueChange={(val) => updateRegion.mutate(val)}>
                <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>{AWS_REGIONS.map((r) => (<SelectItem key={r} value={r}>{r}</SelectItem>))}</SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs font-bold mb-1.5 block">Access Key ID</Label>
              <div className="p-2.5 rounded-lg bg-secondary/50 text-xs font-mono text-muted-foreground">AKIA••••••••••••</div>
              <p className="text-[10px] text-muted-foreground mt-1">Managed via Cloud secrets</p>
            </div>
            <div className="p-3 rounded-xl border border-warning/20 bg-warning/5">
              <p className="text-xs font-bold text-warning">⚠️ AWS Credentials</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Add AWS credentials as Cloud secrets to enable Bedrock.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Models;
