import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LANGUAGES, type Language } from "@/types";

export function LanguageSelector({
  value,
  onChange,
  disabled,
}: {
  value: Language;
  onChange: (value: Language) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1.5 sm:flex-none">
      <label htmlFor="language-select" className="text-xs font-medium text-muted-foreground">
        Language
      </label>
      <Select
        value={value}
        onValueChange={(v) => onChange(v as Language)}
        disabled={disabled ?? false}
      >
        <SelectTrigger id="language-select" className="h-9 w-full sm:w-[150px]">
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          {LANGUAGES.map((l) => (
            <SelectItem key={l} value={l}>
              {l}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
