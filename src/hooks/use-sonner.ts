import { toast as sonner } from "sonner"

type Variant = "default" | "success" | "destructive" | "info"

type ToastProps = {
  title?: number
  description?: string
  variant?: Variant
  duration?: number
  id?: string
}

type SonnerToastOptions = {
  id?: string
  description?: string
  duration?: number
  className?: string
  icon?: React.ReactNode
  action?: React.ReactNode
  onAutoClose?: () => void
  onDismiss?: () => void
}

const variantClassMap: Record<Variant, string> = {
  default: "",
  success: "bg-green-500 text-white",
  destructive: "bg-red-500 text-white",
  info: "bg-blue-500 text-white",
}

function toast({
  title,
  description,
  variant = "default",
  duration = 3000,
}: ToastProps) {
  const id = crypto.randomUUID()

  const toastId = sonner(title || "", {
    id,
    description,
    duration,
    className: variantClassMap[variant],
  } satisfies SonnerToastOptions)

  const update = (props: ToastProps) => {
    // Fake update: just toast again with same ID
    toast({ ...props, id: String(toastId) })
  }

  return {
    id: toastId,
    update,
    // Note: No dismiss — not supported
  }
}

function useToast() {
  return {
    toast,
    // Removing dismiss entirely
  }
}

export { useToast, toast }