import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DOC_TYPES, type DocType } from "@/types";

export function DocumentationTypeSelector({
  value,
  onChange,
  disabled,
}: {
  value: DocType;
  onChange: (value: DocType) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1.5 sm:flex-none">
      <label htmlFor="doctype-select" className="text-xs font-medium text-muted-foreground">
        Documentation type
      </label>
      <Select
        value={value}
        onValueChange={(v) => onChange(v as DocType)}
        disabled={disabled ?? false}
      >
        <SelectTrigger id="doctype-select" className="h-9 w-full sm:w-[210px]">
          <SelectValue placeholder="Documentation type" />
        </SelectTrigger>
        <SelectContent>
          {DOC_TYPES.map((t) => (
            <SelectItem key={t} value={t}>
              {t}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
