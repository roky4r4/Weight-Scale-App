
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-3 whitespace-nowrap font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-custom-green focus-visible:ring-opacity-50 disabled:pointer-events-none disabled:opacity-50 transform hover:scale-[1.02] shadow-lg hover:shadow-xl [&_svg]:pointer-events-none [&_svg]:size-6 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "btn-primary",
        destructive: "btn-cancel",
        outline: "h-20 px-12 text-xl font-semibold bg-white text-text-dark border-2 border-custom-gray rounded-md hover:border-custom-green hover:bg-custom-blue",
        secondary: "btn-secondary",
        ghost: "h-20 px-12 text-xl font-semibold text-custom-gray hover:bg-custom-blue hover:text-text-dark rounded-md",
        link: "text-custom-green underline-offset-4 hover:underline text-xl",
        warning: "btn-warning",
      },
      size: {
        default: "h-20 px-12 text-xl",
        sm: "h-16 px-8 text-lg",
        lg: "h-24 px-16 text-2xl",
        icon: "h-20 w-20 text-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        style={{ borderRadius: '6px' }}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
