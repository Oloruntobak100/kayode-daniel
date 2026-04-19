"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center text-foreground">
      <p className="font-display text-xl font-semibold">Something went wrong</p>
      <p className="max-w-md text-sm text-muted">{error.message}</p>
      <button
        type="button"
        onClick={() => reset()}
        className="rounded-full bg-accent px-6 py-2 text-sm font-medium text-white"
      >
        Try again
      </button>
    </div>
  );
}
