import { Loader2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

export function GenerateButton({
  onClick,
  loading,
  disabled,
}: {
  onClick: () => void;
  loading: boolean;
  disabled?: boolean;
}) {
  return (
    <Button
      onClick={onClick}
      disabled={loading || disabled}
      size="lg"
      className="w-full gap-2 font-semibold shadow-soft transition-transform active:scale-[0.99] sm:w-auto"
    >
      {loading ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          Analyzing your code...
        </>
      ) : (
        <>
          <Sparkles className="size-4" />
          Generate Documentation
        </>
      )}
    </Button>
  );
}
