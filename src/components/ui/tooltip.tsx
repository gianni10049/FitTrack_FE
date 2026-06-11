"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as React from "react";

export function TooltipProvider({
  children,
  delayDuration = 200,
  skipDelayDuration = 100,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
      {...props}
    >
      {children}
    </TooltipPrimitive.Provider>
  );
}

export const Tooltip = TooltipPrimitive.Root;

export const TooltipTrigger = TooltipPrimitive.Trigger;

/** Scrollbar only when content exceeds max-height (not `scroll`, which reserves the track). */
const tooltipContentBodyClass =
  "max-h-[min(75vh,36rem)] max-w-[min(calc(100vw-2rem),32rem)] " +
  "overflow-y-auto overflow-x-hidden overscroll-y-contain px-3 py-2.5 text-left text-sm leading-relaxed text-zinc-700 " +
  "[scrollbar-width:thin] [scrollbar-color:#a1a1aa_#f4f4f5] " +
  "[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-zinc-400/90 " +
  "[&::-webkit-scrollbar-track]:my-1 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-zinc-100";

export const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(function TooltipContent(
  { className, sideOffset = 8, children, ...props },
  ref,
) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        collisionPadding={16}
        className={`z-[200] rounded-xl border border-zinc-200 bg-white shadow-lg outline-none ${tooltipContentBodyClass} ${className ?? ""}`}
        {...props}
      >
        {children}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
});
