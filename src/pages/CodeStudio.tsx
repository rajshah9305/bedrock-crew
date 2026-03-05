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
  // TODO: Add validation
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
});`);

  const suggestions = [
    { icon: Sparkles, label: "Generate", description: "Create new code from description" },
    { icon: Code2, label: "Explain", description: "Understand what this code does" },
    { icon: Bug, label: "Debug", description: "Find and fix issues" },
    { icon: Zap, label: "Optimize", description: "Improve performance & quality" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Code Studio</h1>
          <p className="text-muted-foreground mt-1">AI-powered code assistance and generation</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <Card className="shadow-card hover:shadow-elevated transition-shadow overflow-hidden border-2 border-border/50">
            <div className="bg-gradient-card px-5 py-3 border-b-2 border-border/50 flex items-center justify-between">
              <span className="text-sm font-semibold tracking-tight">main.js</span>
              <div className="flex gap-1">
                {suggestions.map((action) => (
                  <Button
                    key={action.label}
                    variant="ghost"
                    size="sm"
                    className="h-9 px-3 hover:bg-primary/10 hover:text-primary transition-all"
                    title={action.description}
                  >
                    <action.icon className="h-4 w-4" />
                  </Button>
                ))}
              </div>
            </div>
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="min-h-[400px] font-mono text-sm border-0 rounded-none resize-none focus-visible:ring-0 leading-relaxed"
            />
          </Card>

          <Card className="p-5 shadow-card hover:shadow-elevated transition-shadow bg-gradient-card border-2 border-primary/20">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold mb-2">AI Suggestion</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Add input validation using express-validator before creating users. This will prevent invalid data from being saved to the database.
                </p>
                <Button size="sm" className="mt-4 bg-primary hover:bg-primary/90 shadow-sm hover:shadow-md transition-all">
                  Apply Changes
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="p-6 shadow-card hover:shadow-elevated transition-shadow">
            <h3 className="text-lg font-semibold mb-5 tracking-tight">AI Actions</h3>
            <div className="space-y-2">
              {suggestions.map((action) => (
                <Button
                  key={action.label}
                  variant="outline"
                  className="w-full justify-start hover:border-primary hover:bg-primary/5 transition-all p-4 h-auto"
                >
                  <action.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  <div className="text-left">
                    <p className="font-semibold text-sm">{action.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{action.description}</p>
                  </div>
                </Button>
              ))}
            </div>
          </Card>

          <Card className="p-6 shadow-card hover:shadow-elevated transition-shadow">
            <h3 className="text-lg font-semibold mb-5 tracking-tight">Code Analysis</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-card">
                <span className="text-sm font-medium">Complexity</span>
                <span className="text-sm font-bold text-success">Low</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-card">
                <span className="text-sm font-medium">Issues Found</span>
                <span className="text-sm font-bold text-warning">2</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-card">
                <span className="text-sm font-medium">Test Coverage</span>
                <span className="text-sm font-bold text-muted-foreground">0%</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-card bg-gradient-hero text-primary-foreground border-2 border-primary">
            <h3 className="text-lg font-semibold mb-2.5">Pro Tip</h3>
            <p className="text-sm opacity-95 leading-relaxed">
              Use the Explain feature to understand unfamiliar code patterns. The AI will break down complex logic into simple steps.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CodeStudio;
