'use client'
import * as React from "react"
import { cn } from "@/utils/cn"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex h-10 w-full rounded-md border-2 border-input bg-[#F3F7FE] px-5 py-6 text-sm ring-offset-background placeholder:text-black focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                placeholder={props.placeholder ?? ''}
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = "Input"

export { Input }

// focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0