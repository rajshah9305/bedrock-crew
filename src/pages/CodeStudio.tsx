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
          <Card className="shadow-card overflow-hidden">
            <div className="bg-secondary/50 px-4 py-3 border-b border-border flex items-center justify-between">
              <span className="text-sm font-medium">main.js</span>
              <div className="flex gap-2">
                {suggestions.map((action) => (
                  <Button
                    key={action.label}
                    variant="ghost"
                    size="sm"
                    className="h-8 hover:bg-primary/10 hover:text-primary"
                  >
                    <action.icon className="h-4 w-4" />
                  </Button>
                ))}
              </div>
            </div>
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="min-h-[400px] font-mono text-sm border-0 rounded-none resize-none focus-visible:ring-0"
            />
          </Card>

          <Card className="p-4 shadow-card bg-gradient-card">
            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-primary mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium mb-1">AI Suggestion</p>
                <p className="text-sm text-muted-foreground">
                  Add input validation using express-validator before creating users. This will prevent invalid data from being saved to the database.
                </p>
                <Button size="sm" className="mt-3 bg-primary hover:bg-primary/90">
                  Apply Changes
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="p-6 shadow-card">
            <h3 className="text-lg font-semibold mb-4">AI Actions</h3>
            <div className="space-y-2">
              {suggestions.map((action) => (
                <Button
                  key={action.label}
                  variant="outline"
                  className="w-full justify-start hover:border-primary hover:bg-primary/5"
                >
                  <action.icon className="mr-3 h-4 w-4" />
                  <div className="text-left">
                    <p className="font-medium">{action.label}</p>
                    <p className="text-xs text-muted-foreground">{action.description}</p>
                  </div>
                </Button>
              ))}
            </div>
          </Card>

          <Card className="p-6 shadow-card">
            <h3 className="text-lg font-semibold mb-4">Code Analysis</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Complexity</span>
                <span className="text-sm font-medium text-success">Low</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Issues Found</span>
                <span className="text-sm font-medium text-warning">2</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Test Coverage</span>
                <span className="text-sm font-medium text-muted-foreground">0%</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-card bg-gradient-hero text-primary-foreground">
            <h3 className="text-lg font-semibold mb-2">Pro Tip</h3>
            <p className="text-sm opacity-90">
              Use the Explain feature to understand unfamiliar code patterns. The AI will break down complex logic into simple steps.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CodeStudio;
