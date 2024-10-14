import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";
import { ArrowUpRight } from "lucide-react";

interface Props extends PropsWithChildren {
  className?: string;
}
// Define custom components with Tailwind classes
export function H1({ className, ...props }: Props) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-3xl font-extrabold tracking-normal lg:text-4xl",
        className
      )}
      {...props}
    />
  );
}
export function H2({ className, ...props }: Props) {
  return (
    <h2
      className={cn(
        "scroll-m-20 pb-2 text-2xl font-semibold tracking-normal mt-8 first:mt-0",
        className
      )}
      {...props}
    />
  );
}
export function H3({ className, ...props }: Props) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-normal",
        className
      )}
      {...props}
    />
  );
}
export function H4({ className, ...props }: Props) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-lg font-semibold tracking-normal",
        className
      )}
      {...props}
    />
  );
}
export function P({ className, ...props }: Props) {
  return (
    <p
      className={cn(
        "leading-7 [&:not(:first-child)]:mt-6 font-light",
        className
      )}
      {...props}
    />
  );
}
export function List({ className, ...props }: Props) {
  return (
    <ul
      className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)}
      {...props}
    />
  );
}
export function OrderedList({ className, ...props }: Props) {
  return (
    <ul
      className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)}
      {...props}
    />
  );
}

export function Blockquote({ className, ...props }: Props) {
  return (
    <blockquote
      className={cn("mt-6 border-l-2 pl-6 italic", className)}
      {...props}
    />
  );
}
export function Code({ className, ...props }: Props) {
  return (
    <code
      className={cn("bg-gray-900 p-[2px] rounded text-sm", className)}
      {...props}
    />
  );
}
export function Pre({ className, ...props }: Props) {
  return (
    <pre
      className={cn(
        "bg-gray-900 text-white p-2 rounded text-sm overflow-auto",
        className
      )}
      {...props}
    />
  );
}

export function Bold({ className, ...props }: Props) {
  return <strong className={cn("font-semibold", className)} {...props} />;
}

export function Link({ className, children, ...props }: Props) {
  return (
    <a
      className={cn(
        "text-blue-500 hover:underline inline-flex gap-[2px] items-center",
        className
      )}
      {...props}
      target="_blank"
    >
      {children} <ArrowUpRight size={16} strokeWidth={1} />
    </a>
  );
}
