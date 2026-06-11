"use client";

import * as Dialog from "@radix-ui/react-dialog";
import * as React from "react";

export const DialogRoot = Dialog.Root;
export const DialogPortal = Dialog.Portal;

export const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof Dialog.Overlay>,
  React.ComponentPropsWithoutRef<typeof Dialog.Overlay>
>(function DialogOverlay({ className, ...props }, ref) {
  return (
    <Dialog.Overlay
      ref={ref}
      className={`fixed inset-0 z-[100] bg-zinc-900/50 backdrop-blur-[1px] ${className ?? ""}`}
      {...props}
    />
  );
});

export type DialogContentSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "full";

const SIZE_CLASS: Record<DialogContentSize, string> = {
  xs: "max-w-xs",
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-3xl",
  "2xl": "max-w-5xl",
  "3xl": "max-w-6xl",
  full: "h-[calc(100vh-2rem)] w-[calc(100vw-2rem)] max-h-none max-w-none rounded-xl",
};

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof Dialog.Content>,
  React.ComponentPropsWithoutRef<typeof Dialog.Content> & {
    size?: DialogContentSize;
  }
>(function DialogContent(
  { className, size = "xl", children, ...props },
  ref,
) {
  const sizeClass = SIZE_CLASS[size] ?? SIZE_CLASS.xl;
  return (
    <Dialog.Content
      ref={ref}
      className={`fixed left-1/2 top-1/2 z-[101] w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl outline-none sm:w-full ${sizeClass} ${className ?? ""}`}
      {...props}
    >
      {children}
    </Dialog.Content>
  );
});

export const DialogHeader = React.forwardRef<
  React.ElementRef<typeof Dialog.Title>,
  React.ComponentPropsWithoutRef<typeof Dialog.Title>
>(function DialogHeader({ className, ...props }, ref) {
  return (
    <Dialog.Title
      ref={ref}
      className={`pr-10 text-center text-xl font-semibold leading-snug text-zinc-900 sm:text-2xl ${className ?? ""}`}
      {...props}
    />
  );
});

export const DialogBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function DialogBody({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={`mt-4 max-h-[min(70vh,560px)] overflow-y-auto overflow-x-hidden [-webkit-overflow-scrolling:touch] ${className ?? ""}`}
      {...props}
    />
  );
});

export const DialogCloseTrigger = React.forwardRef<
  HTMLButtonElement,
  Omit<React.ComponentPropsWithoutRef<typeof Dialog.Close>, "asChild">
>(function DialogCloseTrigger({ className, children, ...props }, ref) {
  return (
    <Dialog.Close ref={ref} asChild {...props}>
      <button
        type="button"
        className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg text-xl leading-none text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#6d28d9] focus-visible:ring-offset-2 ${className ?? ""}`}
        aria-label="Close"
      >
        {children ?? <span aria-hidden>×</span>}
      </button>
    </Dialog.Close>
  );
});
