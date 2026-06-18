"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ChatMessage, AgentType } from "@/types";

interface ChatInterfaceProps {
  agentType: AgentType;
  onSendMessage: (message: string) => void;
  messages: ChatMessage[];
  isLoading?: boolean;
}

const agentConfig: Record<AgentType, { title: string; description: string; icon: string }> = {
  boi: {
    title: "BOI Assistant",
    description: "ผู้ช่วยด้านสิทธิประโยชน์ BOI",
    icon: "💡",
  },
  customs: {
    title: "Customs Assistant",
    description: "ผู้ช่วยด้านศุลกากร",
    icon: "🚢",
  },
  legal: {
    title: "Legal Assistant",
    description: "ผู้ช่วยด้านกฎหมาย",
    icon: "⚖️",
  },
  material: {
    title: "Material Assistant",
    description: "ผู้ช่วยด้านวัตถุดิบ",
    icon: "🔧",
  },
};

export function ChatInterface({
  agentType,
  onSendMessage,
  messages,
  isLoading,
}: ChatInterfaceProps) {
  const [input, setInput] = React.useState("");
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const config = agentConfig[agentType];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput("");
    }
  };

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Card className="flex h-[calc(100vh-12rem)] flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">{config.icon}</span>
          {config.title}
        </CardTitle>
        <CardDescription>{config.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <div className="flex h-full flex-col">
          <div className="flex-1 overflow-y-auto p-4">
            {messages.length === 0 ? (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <span className="text-4xl">{config.icon}</span>
                  <p className="mt-4">เริ่มถามคำถามได้เลย</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-4 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      {message.sources && message.sources.length > 0 && (
                        <div className="mt-2 border-t pt-2">
                          <p className="mb-1 text-xs font-medium">แหล่งอ้างอิง:</p>
                          <div className="flex flex-wrap gap-1">
                            {message.sources.map((source, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {source.documentTitle}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Textarea
              placeholder="พิมพ์คำถามของคุณ..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[60px]"
              disabled={isLoading}
            />
            <Button type="submit" disabled={!input.trim() || isLoading}>
              {isLoading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                "ส่ง"
              )}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
