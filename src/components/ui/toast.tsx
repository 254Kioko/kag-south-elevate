import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { X, CheckCircle2, AlertCircle, Info } from "lucide-react";

import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                   PROVIDER                                  */
/* -------------------------------------------------------------------------- */

const ToastProvider = ToastPrimitives.Provider;

/* -------------------------------------------------------------------------- */
/*                                  VIEWPORT                                   */
/* -------------------------------------------------------------------------- */

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-4 z-[100] flex w-full flex-col gap-3 px-4 sm:bottom-4 sm:right-4 sm:top-auto sm:max-w-[420px]",
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

/* -------------------------------------------------------------------------- */
/*                                   VARIANTS                                  */
/* -------------------------------------------------------------------------- */

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-start gap-4 rounded-xl border p-4 pr-10 shadow-xl transition-all",
  {
    variants: {
      variant: {
        default: "border-border bg-background text-foreground",
        success:
          "border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950",
        error:
          "border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950",
        info:
          "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/* -------------------------------------------------------------------------- */
/*                                   ICONS                                     */
/* -------------------------------------------------------------------------- */

const VariantIcon = ({ variant }: { variant?: string }) => {
  switch (variant) {
    case "success":
      return (
        <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
      );
    case "error":
      return (
        <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
      );
    case "info":
      return <Info className="h-6 w-6 text-blue-600 dark:text-blue-400" />;
    default:
      return null;
  }
};

/* -------------------------------------------------------------------------- */
/*                                    ROOT                                     */
/* -------------------------------------------------------------------------- */

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, children, ...props }, ref) => (
  <ToastPrimitives.Root
    ref={ref}
    className={cn(
      toastVariants({ variant }),
      "data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:slide-in-from-top-2 sm:data-[state=open]:slide-in-from-bottom-2",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:slide-out-to-right",
      className
    )}
    {...props}
  >
    {variant !== "default" && <VariantIcon variant={variant} />}
    <div className="flex-1">{children}</div>
  </ToastPrimitives.Root>
));
Toast.displayName = ToastPrimitives.Root.displayName;

/* -------------------------------------------------------------------------- */
/*                                   ACTION                                    */
/* -------------------------------------------------------------------------- */

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 items-center justify-center rounded-md border px-3 text-sm font-medium transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring",
      className
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

/* -------------------------------------------------------------------------- */
/*                                    CLOSE                                    */
/* -------------------------------------------------------------------------- */

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-muted-foreground opacity-70 transition hover:opacity-100 focus:outline-none focus:ring-2",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

/* -------------------------------------------------------------------------- */
/*                                   CONTENT                                   */
/* -------------------------------------------------------------------------- */

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold leading-none", className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                    */
/* -------------------------------------------------------------------------- */

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;
type ToastActionElement = React.ReactElement<typeof ToastAction>;

/* -------------------------------------------------------------------------- */
/*                                   EXPORTS                                   */
/* -------------------------------------------------------------------------- */

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};
