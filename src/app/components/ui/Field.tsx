import { cn } from "@/lib/utils";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
};

export default function Field({ id, label, error, optional, className, ...rest }: Props) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm">
        {label}
        {optional && <span className="text-muted"> (optional)</span>}
      </label>
      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "h-12 w-full rounded-xl border bg-surface px-4 outline-none transition-colors focus:border-ink",
          error ? "border-plum" : "border-ink/15"
        )}
        {...rest}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-plum">
          {error}
        </p>
      )}
    </div>
  );
}