"use client"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} className="bg-white/5 backdrop-blur-sm border-white/10 text-white">
            <div className="grid gap-1">
              {title && <ToastTitle className="text-base font-semibold">{title}</ToastTitle>}
              {description && (
                <ToastDescription className="text-sm text-gray-400">{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose className="text-white hover:text-gray-300" />
          </Toast>
        )
      })}
      <ToastViewport className="flex flex-col gap-2 sm:gap-4 md:gap-6 p-4 md:p-6 max-w-[420px] w-full fixed bottom-0 right-0 sm:top-auto sm:right-0 sm:bottom-0 sm:flex-col" />
    </ToastProvider>
  )
}
