import { Check, Copy, Download, FileText, Printer, RefreshCw, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Markdown } from "@/components/Markdown";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

export function DocumentationViewer({
  documentation,
  loading,
  error,
  onRegenerate,
  fileBaseName = "documentation",
}: {
  documentation: string | null;
  loading?: boolean;
  error?: string | null;
  onRegenerate?: () => void;
  fileBaseName?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (!documentation) return;
    try {
      await navigator.clipboard.writeText(documentation);
      setCopied(true);
      toast.success("Documentation copied to clipboard");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Copy failed. Please select and copy manually.");
    }
  };

  const triggerDownload = (blob: Blob, filename: string, successMsg: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(successMsg);
  };

  const downloadMarkdown = () => {
    if (!documentation) return;
    triggerDownload(
      new Blob([documentation], { type: "text/markdown;charset=utf-8" }),
      `${fileBaseName}.md`,
      "Downloaded as Markdown",
    );
  };

  const downloadHtml = () => {
    if (!documentation) return;
    const rendered = document.querySelector(".doc-prose")?.innerHTML ?? "";
    const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${fileBaseName}</title>
<style>
  :root { color-scheme: light dark; }
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; max-width: 820px; margin: 40px auto; padding: 0 20px; line-height: 1.6; color: #1f2937; background: #ffffff; }
  pre { background: #0f172a; color: #e2e8f0; padding: 14px 16px; border-radius: 8px; overflow-x: auto; font-size: 13px; }
  code { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
  p code, li code { background: #f1f5f9; padding: 1px 5px; border-radius: 4px; font-size: 0.9em; }
  table { border-collapse: collapse; width: 100%; margin: 16px 0; }
  th, td { border: 1px solid #e5e7eb; padding: 8px 12px; text-align: left; }
  th { background: #f8fafc; }
  h1, h2, h3, h4 { line-height: 1.25; margin-top: 1.4em; }
  a { color: #2563eb; }
  blockquote { border-left: 4px solid #e5e7eb; margin: 0; padding: 4px 16px; color: #6b7280; }
  @media (prefers-color-scheme: dark) {
    body { color: #e2e8f0; background: #0f172a; }
    p code, li code { background: #1e293b; }
    th { background: #1e293b; }
    th, td { border-color: #334155; }
    blockquote { border-color: #334155; color: #94a3b8; }
  }
</style>
</head>
<body>
<main>
${rendered || `<pre>${documentation.replace(/[<>&]/g, (c) => ({ "<": "<", ">": ">", "&": "&" })[c]!)}</pre>`}
</main>
</body>
</html>`;
    triggerDownload(
      new Blob([html], { type: "text/html;charset=utf-8" }),
      `${fileBaseName}.html`,
      "Downloaded as HTML",
    );
  };

  const downloadText = () => {
    if (!documentation) return;
    const temp = document.createElement("div");
    temp.innerHTML = `<div>${documentation
      .replace(/&/g, "&")
      .replace(/</g, "<")
      .replace(/>/g, ">")}</div>`;
    const text = (temp.querySelector("div")?.textContent ?? documentation)
      .replace(/\n{3,}/g, "\n\n")
      .trim();
    triggerDownload(
      new Blob([text], { type: "text/plain;charset=utf-8" }),
      `${fileBaseName}.txt`,
      "Downloaded as Text",
    );
  };

  const downloadPdf = () => {
    if (!documentation) return;
    toast.info("Use your browser's Print dialog and choose 'Save as PDF'");
    window.print();
  };

  return (
    <section className="panel flex min-h-0 flex-col overflow-hidden print:block print:rounded-none print:shadow-none print:border-none">
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3 print:hidden">
        <div className="flex items-center gap-2">
          <FileText className="size-4 text-primary" />
          <h2 className="text-sm font-semibold">Generated Documentation</h2>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1.5 text-xs"
            onClick={copy}
            disabled={!documentation || loading}
          >
            {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            Copy
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1.5 text-xs"
                disabled={!documentation || loading}
              >
                <Download className="size-3.5" />
                Download
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Download as
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={downloadMarkdown} className="gap-2 text-xs">
                <FileText className="size-3.5" />
                Markdown (.md)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={downloadHtml} className="gap-2 text-xs">
                <FileText className="size-3.5" />
                HTML (.html)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={downloadText} className="gap-2 text-xs">
                <FileText className="size-3.5" />
                Plain text (.txt)
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={downloadPdf} className="gap-2 text-xs">
                <Printer className="size-3.5" />
                PDF (via print)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {onRegenerate ? (
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1.5 text-xs"
              onClick={onRegenerate}
              disabled={loading}
            >
              <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
              Regenerate
            </Button>
          ) : null}
        </div>
      </header>

      <div className="min-h-[320px] flex-1 overflow-auto p-5 lg:min-h-[480px] print:min-h-0 print:overflow-visible print:p-0">
        {loading ? (
          <div className="space-y-3" aria-busy>
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-9/12" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-4 w-10/12" />
            <Skeleton className="h-4 w-7/12" />
            <p className="pt-2 text-xs text-muted-foreground">Analyzing your code...</p>
          </div>
        ) : error ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
            <p className="text-sm font-medium text-destructive">{error}</p>
            {onRegenerate ? (
              <Button variant="outline" size="sm" onClick={onRegenerate}>
                Try again
              </Button>
            ) : null}
          </div>
        ) : documentation ? (
          <Markdown content={documentation} />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
            <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
              <Sparkles className="size-5" />
            </span>
            <p className="text-sm font-medium">Your documentation will appear here</p>
            <p className="max-w-xs text-xs text-muted-foreground">
              Paste your code and click Generate Documentation to get started.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
