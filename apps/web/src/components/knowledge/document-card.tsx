"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DocumentCardProps {
  id: string;
  title: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  category?: string;
  tags?: string[];
  processed: boolean;
  createdAt: Date;
  onView: (id: string) => void;
  onDelete: (id: string) => void;
}

export function DocumentCard({
  id,
  title,
  fileName,
  fileType,
  fileSize,
  category,
  tags,
  processed,
  createdAt,
  onView,
  onDelete,
}: DocumentCardProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{fileName}</CardDescription>
          </div>
          <Badge variant={processed ? "default" : "secondary"}>
            {processed ? "ประมวลผลแล้ว" : "รอประมวลผล"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>📄 {fileType.toUpperCase()}</span>
            <span>•</span>
            <span>{formatFileSize(fileSize)}</span>
            <span>•</span>
            <span>{new Date(createdAt).toLocaleDateString("th-TH")}</span>
          </div>
          {category && (
            <div className="text-sm">
              <span className="text-muted-foreground">หมวดหมู่: </span>
              <span>{category}</span>
            </div>
          )}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          <div className="flex gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => onView(id)}>
              ดู
            </Button>
            <Button variant="destructive" size="sm" onClick={() => onDelete(id)}>
              ลบ
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
