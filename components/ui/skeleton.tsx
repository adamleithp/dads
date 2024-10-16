import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

interface SkeletonProps extends PropsWithChildren {
  className?: string;
}

export const Skeleton = ({ children, className }: SkeletonProps) => {
  return (
    <span
      className={cn(
        `flex
        animate-pulse
        bg-gray-200 dark:bg-gray-800 rounded-lg
        h-fit w-fit
        select-none
        text-transparent
        [&_*]:!opacity-0
        [&_*]:!text-transparent
        [&_*]:!select-none
        [&_*]:!pointer-events-none`,
        className
      )}
    >
      {children}
    </span>
  );
};
