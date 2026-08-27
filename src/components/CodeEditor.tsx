import { Eraser, FileCode2, FlaskConical } from "lucide-react";
import { useMemo, useRef } from "react";

import { Button } from "@/components/ui/button";

const PLACEHOLDER = `public int add(int a, int b) {
    return a + b;
}`;

export function CodeEditor({
  value,
  onChange,
  onClear,
  onTryExample,
  disabled,
}: {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  onTryExample: () => void;
  disabled?: boolean;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);

  const lines = useMemo(() => value.split("\n").length, [value]);
  const lineNumbers = useMemo(
    () => Array.from({ length: Math.max(lines, 18) }, (_, i) => i + 1),
    [lines],
  );

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <FileCode2 className="size-3.5" />
          <span className="font-mono">editor</span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 gap-1.5 text-xs"
            onClick={onTryExample}
            disabled={disabled ?? false}
          >
            <FlaskConical className="size-3.5" />
            Try Example
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 gap-1.5 text-xs"
            onClick={onClear}
            disabled={(disabled ?? false) || value.length === 0}
          >
            <Eraser className="size-3.5" />
            Clear
          </Button>
        </div>
      </div>

      <div className="relative flex min-h-[320px] flex-1 overflow-hidden bg-code-bg lg:min-h-[420px]">
        <div
          ref={gutterRef}
          aria-hidden
          className="select-none overflow-hidden border-r border-border bg-code-bg py-3 pr-2 pl-3 text-right font-mono text-[13px] leading-6 text-gutter"
        >
          {lineNumbers.map((n) => (
            <div key={n}>{n}</div>
          ))}
        </div>
        <textarea
          ref={textareaRef}
          value={value}
          spellCheck={false}
          disabled={disabled ?? false}
          aria-label="Source code"
          onChange={(e) => onChange(e.target.value)}
          onScroll={() => {
            if (gutterRef.current && textareaRef.current) {
              gutterRef.current.scrollTop = textareaRef.current.scrollTop;
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Tab") {
              e.preventDefault();
              const el = e.currentTarget;
              const start = el.selectionStart;
              const end = el.selectionEnd;
              const next = value.slice(0, start) + "    " + value.slice(end);
              onChange(next);
              requestAnimationFrame(() => {
                el.selectionStart = el.selectionEnd = start + 4;
              });
            }
          }}
          placeholder={PLACEHOLDER}
          className="min-h-full flex-1 resize-none bg-transparent px-3 py-3 font-mono text-[13px] leading-6 text-foreground outline-none placeholder:text-muted-foreground/60"
        />
      </div>

      <div className="flex items-center justify-between border-t border-border px-3 py-1.5 font-mono text-[11px] text-muted-foreground">
        <span>{lines} lines</span>
        <span>{value.length} chars</span>
      </div>
    </div>
  );
}
