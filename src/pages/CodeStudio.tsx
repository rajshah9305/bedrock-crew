import { Code2, Sparkles, Bug, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const CodeStudio = () => {
  const [code, setCode] = useState(`// Express.js User Profile API
const express = require('express');
const router = express.Router();

// GET user profile
router.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create user
router.post('/api/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
});`);

  const actions = [
    { icon: Sparkles, label: "Generate", description: "Create new code", shortcut: "⌘G" },
    { icon: Code2, label: "Explain", description: "Understand code", shortcut: "⌘E" },
    { icon: Bug, label: "Debug", description: "Find issues", shortcut: "⌘D" },
    { icon: Zap, label: "Optimize", description: "Improve quality", shortcut: "⌘O" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Code Studio</h1>
          <p className="text-sm text-muted-foreground mt-0.5">AI-powered code assistant</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        {/* Editor */}
        <div className="lg:col-span-3 space-y-4 animate-fade-in-up" style={{ animationDelay: "100ms", animationFillMode: "backwards" }}>
          <Card className="glass overflow-hidden hover:shadow-elevated transition-all">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/50 bg-secondary/30">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-warning/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-success/60" />
                </div>
                <span className="text-xs font-semibold text-muted-foreground ml-2">main.js</span>
              </div>
              <div className="flex gap-1">
                {actions.map((a) => (
                  <Button key={a.label} variant="ghost" size="sm" className="h-7 px-2 text-xs hover:bg-primary/10 hover:text-primary">
                    <a.icon className="h-3 w-3 mr-1" />
                    {a.label}
                  </Button>
                ))}
              </div>
            </div>
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="min-h-[380px] font-mono text-sm border-0 rounded-none resize-none focus-visible:ring-0 leading-relaxed bg-card/50"
            />
          </Card>

          <Card className="p-4 glass border-primary/20 hover:shadow-glow transition-all">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">AI Suggestion</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Add input validation using express-validator before creating users. This prevents invalid data from being saved.
                </p>
                <Button size="sm" className="mt-3 bg-gradient-hero hover:opacity-90 text-xs shadow-sm shadow-primary/20">
                  Apply Changes
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: "200ms", animationFillMode: "backwards" }}>
          <Card className="p-4 glass hover:shadow-elevated transition-all">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Actions</h3>
            <div className="space-y-1.5">
              {actions.map((a) => (
                <Button
                  key={a.label}
                  variant="ghost"
                  className="w-full justify-between h-auto p-3 hover:bg-primary/5 hover:text-primary transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <a.icon className="h-4 w-4 shrink-0" />
                    <div className="text-left">
                      <p className="text-xs font-bold">{a.label}</p>
                      <p className="text-[10px] text-muted-foreground">{a.description}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground">{a.shortcut}</span>
                </Button>
              ))}
            </div>
          </Card>

          <Card className="p-4 glass hover:shadow-elevated transition-all">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Analysis</h3>
            <div className="space-y-2">
              {[
                { label: "Complexity", value: "Low", color: "text-success" },
                { label: "Issues", value: "2", color: "text-warning" },
                { label: "Coverage", value: "0%", color: "text-muted-foreground" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-2.5 rounded-lg bg-secondary/50">
                  <span className="text-xs font-medium text-muted-foreground">{item.label}</span>
                  <span className={`text-xs font-bold ${item.color}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4 bg-gradient-hero text-primary-foreground">
            <h3 className="text-xs font-bold uppercase tracking-wider opacity-90 mb-1.5">Pro Tip</h3>
            <p className="text-xs opacity-85 leading-relaxed">
              Use Explain to understand unfamiliar code patterns — the AI breaks down complex logic into simple steps.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CodeStudio;
