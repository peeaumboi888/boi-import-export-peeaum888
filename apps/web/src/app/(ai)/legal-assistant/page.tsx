"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";

const AGENT_TYPE = "legal";

export default function LegalAssistantPage() {
  const [messages, setMessages] = React.useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const result = await api.ai.chat(AGENT_TYPE, userMessage);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: result.message?.content || result.response || "ไม่ได้รับคำตอบ" },
      ]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `เกิดข้อผิดพลาด: ${err.message || "ไม่สามารถเชื่อมต่อ API ได้"}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Legal Assistant</h1>
        <p className="text-muted-foreground">ถามคำถามเกี่ยวกับกฎหมายที่เกี่ยวข้อง</p>
      </div>

      <Card className="h-[calc(100vh-300px)]">
        <CardHeader>
          <CardTitle>⚖️ แชทกับ Legal Assistant</CardTitle>
          <CardDescription>พิมพ์คำถามของคุณเกี่ยวกับกฎหมาย</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 rounded-lg border bg-muted/50 min-h-[300px]">
            {messages.length === 0 && (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                เริ่มต้นถามคำถามเกี่ยวกับกฎหมายได้เลย
              </div>
            )}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-background border"
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-background border rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "0ms" }} />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "150ms" }} />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex gap-2">
            <Textarea
              placeholder="พิมพ์คำถามของคุณ..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              className="flex-1 min-h-[60px]"
            />
            <Button onClick={handleSend} disabled={isLoading || !input.trim()} className="px-6">
              ส่ง
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
