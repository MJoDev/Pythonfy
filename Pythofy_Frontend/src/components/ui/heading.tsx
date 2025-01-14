import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const headingVariants = cva("font-semibold leading-none tracking-tight", {
  variants: {
    size: {
      xs: "text-sm",
      sm: "text-base",
      default: "text-lg",
      lg: "text-xl",
      xl: "text-2xl",
      "2xl": "text-3xl",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  asChild?: boolean
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, size, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn(headingVariants({ size, className }))}
      {...props}
    />
  )
)
Heading.displayName = "Heading"

export { Heading, headingVariants }
