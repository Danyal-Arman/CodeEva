import { cn } from "../../lib/utils";

function Skeleton({
  className,
  ...props
}) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-muted bg-zinc-900/40 shimmer", className)}
      {...props} />
  );
}

export { Skeleton }
