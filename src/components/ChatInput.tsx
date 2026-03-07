import { useState, useRef, useEffect } from "react";
import { Send, Loader2, Bot, User, X, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ChatMessage {
  role: string;
  content: string;
}

interface ChatInputProps {
  onSubmit: (message: string) => void;
  loading?: boolean;
  disabled?: boolean;
  messages?: ChatMessage[];
}

const ChatInput = ({ onSubmit, loading = false, disabled = false, messages = [] }: ChatInputProps) => {
  const [input, setInput] = useState("");
  const [expanded, setExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !loading && !disabled) {
      onSubmit(input.trim());
      setInput("");
      setExpanded(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <footer className="sticky bottom-0 z-50 w-full">
      {/* Chat Messages Panel */}
      {expanded && messages.length > 0 && (
        <div className="glass-strong border-t border-border/50 shadow-elevated">
          <div className="container max-w-3xl mx-auto px-6">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                <MessageSquare className="h-3 w-3" />
                Conversation
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setExpanded(false)}>
                <X className="h-3 w-3" />
              </Button>
            </div>
            <div className="max-h-60 overflow-y-auto space-y-3 pb-3 scrollbar-thin">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex gap-2.5 animate-fade-in",
                    msg.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {msg.role === "assistant" && (
                    <div className="w-6 h-6 rounded-lg bg-gradient-hero flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      <Bot className="h-3.5 w-3.5 text-primary-foreground" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[80%] rounded-xl px-3.5 py-2 text-sm leading-relaxed",
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-secondary text-secondary-foreground rounded-bl-sm"
                    )}
                  >
                    {msg.content}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-6 h-6 rounded-lg bg-secondary flex items-center justify-center shrink-0 mt-0.5">
                      <User className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="flex gap-2.5 animate-fade-in">
                  <div className="w-6 h-6 rounded-lg bg-gradient-hero flex items-center justify-center shrink-0">
                    <Bot className="h-3.5 w-3.5 text-primary-foreground" />
                  </div>
                  <div className="bg-secondary rounded-xl px-4 py-2.5 rounded-bl-sm">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-pulse" />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-pulse [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-pulse [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>
      )}

      {/* Input Bar */}
      <div className="glass-strong border-t border-border/50 shadow-elevated">
        <div className="container max-w-3xl mx-auto px-6 py-3">
          <form onSubmit={handleSubmit} className="flex items-end gap-2">
            <div className="flex-1 relative">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => messages.length > 0 && setExpanded(true)}
                placeholder="Ask the AI anything… (Shift+Enter for new line)"
                className="min-h-[42px] max-h-[120px] resize-none rounded-xl bg-secondary/60 border-border/50 pr-12 text-sm focus-visible:ring-primary/30 placeholder:text-muted-foreground/60"
                rows={1}
                disabled={disabled || loading}
              />
            </div>
            <Button
              type="submit"
              size="icon"
              disabled={disabled || loading || !input.trim()}
              className="h-[42px] w-[42px] shrink-0 rounded-xl bg-gradient-hero hover:opacity-90 shadow-sm shadow-primary/20 transition-all"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default ChatInput;
