"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";

export default function KnowledgeSearchPage() {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [searched, setSearched] = React.useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);
    try {
      const data = await api.knowledge.search(query);
      setResults(data);
    } catch (err) {
      console.error("Failed to search:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">ค้นหาความรู้</h1>
        <p className="text-muted-foreground">ค้นหาเอกสารและบทความที่เกี่ยวข้อง</p>
      </div>

      <Card>
        <CardContent className="p-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              placeholder="ค้นหาความรู้..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={loading}>
              {loading ? "กำลังค้นหา..." : "ค้นหา"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {loading ? (
        <div className="flex items-center justify-center p-8">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : searched && results.length === 0 ? (
        <Card>
          <CardContent className="flex items-center justify-center p-8 text-muted-foreground">
            ไม่พบผลลัพธ์ที่ตรงกับคำค้นหา
          </CardContent>
        </Card>
      ) : results.length > 0 ? (
        <div className="space-y-4">
          <p className="text-muted-foreground">พบ {results.length} ผลลัพธ์</p>
          {results.map((result: any, index: number) => (
            <Card key={result.id || index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {result.title}
                  {result.category && <Badge variant="secondary">{result.category}</Badge>}
                </CardTitle>
                <CardDescription>{result.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">{result.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : null}
    </div>
  );
}
