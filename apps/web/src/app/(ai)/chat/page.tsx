"use client";

import * as React from "react";
import { ChatInterface } from "@/components/ai/chat-interface";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChatMessage, AgentType } from "@/types";
import { api } from "@/lib/api";

export default function ChatPage() {
  const [selectedAgent, setSelectedAgent] = React.useState<AgentType>("boi");
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const agents: { type: AgentType; title: string; description: string; icon: string }[] = [
    { type: "boi", title: "BOI Assistant", description: "ถามเกี่ยวกับสิทธิประโยชน์ BOI", icon: "💡" },
    { type: "customs", title: "Customs Assistant", description: "ถามเกี่ยวกับศุลกากร", icon: "🚢" },
    { type: "legal", title: "Legal Assistant", description: "ถามเกี่ยวกับกฎหมาย", icon: "⚖️" },
    { type: "material", title: "Material Assistant", description: "ถามเกี่ยวกับวัตถุดิบ", icon: "🔧" },
  ];

  const handleSendMessage = async (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sessionId: "current",
      role: "user",
      content,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const result = await api.ai.chat(selectedAgent, content);
      const sources = result.sources ? JSON.parse(result.sources) : [];
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sessionId: result.sessionId,
        role: "assistant",
        content: result.message.content,
        sources,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sessionId: "current",
        role: "assistant",
        content: `เกิดข้อผิดพลาด: ${(err as Error).message || "ไม่สามารถเชื่อมต่อ API ได้"}`,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">AI Assistant</h1>
        <p className="text-muted-foreground">เลือก AI Assistant ที่ต้องการใช้งาน</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {agents.map((agent) => (
          <Card
            key={agent.type}
            className={`cursor-pointer transition-colors ${
              selectedAgent === agent.type ? "border-primary bg-primary/5" : "hover:bg-muted"
            }`}
            onClick={() => {
              setSelectedAgent(agent.type);
              setMessages([]);
            }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">{agent.icon}</span>
                {agent.title}
              </CardTitle>
              <CardDescription>{agent.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <ChatInterface
        agentType={selectedAgent}
        messages={messages}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
      />
    </div>
  );
}
