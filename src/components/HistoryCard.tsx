import { Clock, Eye, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { HistoryEntry } from "@/types";

function formatDate(iso: string) {
  const date = new Date(iso);
  const today = new Date();
  const sameDay = date.toDateString() === today.toDateString();
  const time = date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
  return sameDay
    ? `Today, ${time}`
    : `${date.toLocaleDateString(undefined, { month: "short", day: "numeric" })}, ${time}`;
}

export function HistoryCard({
  entry,
  onView,
  onDelete,
}: {
  entry: HistoryEntry;
  onView: () => void;
  onDelete: () => void;
}) {
  const preview = entry.source_code.trim().split("\n").slice(0, 2).join(" ").slice(0, 90);

  return (
    <article className="panel flex flex-col gap-3 p-4 transition-colors hover:border-primary/40">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary" className="font-mono text-[11px]">
          {entry.language}
        </Badge>
        <Badge variant="outline" className="text-[11px]">
          {entry.documentation_type}
        </Badge>
      </div>

      <p className="line-clamp-2 rounded-md bg-code-bg px-3 py-2 font-mono text-xs text-muted-foreground">
        {preview}
        {entry.source_code.length > 90 ? "..." : ""}
      </p>

      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="size-3.5" />
          {formatDate(entry.created_at)}
        </span>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs" onClick={onView}>
            <Eye className="size-3.5" />
            View
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-1.5 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={onDelete}
          >
            <Trash2 className="size-3.5" />
            Delete
          </Button>
        </div>
      </div>
    </article>
  );
}
