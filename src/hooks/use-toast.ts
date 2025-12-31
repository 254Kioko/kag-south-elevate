import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/* =========================
   TOAST UI STYLES
========================= */

const toastVariants = cva(
  "group relative flex w-full items-start gap-3 rounded-xl border p-4 shadow-lg transition-all",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        success: "border-green-200 bg-green-50 text-green-900",
        error: "border-red-200 bg-red-50 text-red-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/* =========================
   ICONS
========================= */

const SuccessIcon = () => (
  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
    <svg
      className="h-5 w-5 text-green-600"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  </div>
);

/* =========================
   RADIX COMPONENTS
========================= */

const ToastProvider = ToastPrimitive.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>((props, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    className="fixed top-4 right-4 z-50 flex max-w-sm flex-col gap-2"
    {...props}
  />
));
ToastViewport.displayName = "ToastViewport";

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, children, ...props }, ref) => (
  <ToastPrimitive.Root
    ref={ref}
    className={cn(toastVariants({ variant }), className)}
    {...props}
  >
    {variant === "success" && <SuccessIcon />}
    {children}
  </ToastPrimitive.Root>
));
Toast.displayName = "Toast";

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>((props, ref) => (
  <ToastPrimitive.Title
    ref={ref}
    className="font-semibold leading-none"
    {...props}
  />
));
ToastTitle.displayName = "ToastTitle";

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>((props, ref) => (
  <ToastPrimitive.Description
    ref={ref}
    className="text-sm opacity-90"
    {...props}
  />
));
ToastDescription.displayName = "ToastDescription";

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close>
>((props, ref) => (
  <ToastPrimitive.Close
    ref={ref}
    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitive.Close>
));
ToastClose.displayName = "ToastClose";

/* =========================
   TOAST STATE LOGIC
========================= */

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 5000;

type ToastVariant = "default" | "success" | "error";

type ToastData = {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: ToastVariant;
  open?: boolean;
};

type State = {
  toasts: ToastData[];
};

let count = 0;
const listeners: Array<(state: State) => void> = [];
let memoryState: State = { toasts: [] };

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

function dispatch(state: State) {
  memoryState = state;
  listeners.forEach((l) => l(memoryState));
}

function toast(data: Omit<ToastData, "id">) {
  const id = genId();

  dispatch({
    toasts: [
      {
        ...data,
        id,
        open: true,
      },
    ].slice(0, TOAST_LIMIT),
  });

  setTimeout(() => {
    dispatch({
      toasts: [],
    });
  }, TOAST_REMOVE_DELAY);

  return { id };
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) listeners.splice(index, 1);
    };
  }, []);

  return {
    ...state,
    toast,
  };
}

/* =========================
   EXPORTS
========================= */

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  useToast,
  toast,
};
