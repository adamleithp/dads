import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

interface PageTitleProps extends PropsWithChildren {
  className?: string;
  backButton?: boolean;
}

export function PageTitle({ children, className, backButton }: PageTitleProps) {
  return (
    <>
      <Button>
        <ArrowLeft />
      </Button>
      <h1 className={cn("text-2xl font-bold", className)}>{children}</h1>
    </>
  );
}
