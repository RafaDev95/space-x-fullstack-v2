import * as React from 'react'
import { UseFormRegister, FieldErrors } from 'react-hook-form'

import { mergeClassNames } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<any>
  errors: FieldErrors
  id: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, errors, register, id, ...props }) => {
    return (
      <div>
        <input
          type={type}
          className={mergeClassNames(
            'border-input bg-background ring-offset-background placeholder:text-muted-foreground ',
            'focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 ',
            'file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 ',
            'focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            `${
              errors[id]
                ? 'border-red-500 ring-offset-red-500'
                : 'border-inherit'
            }`,
            className
          )}
          {...props}
          {...register(id)}
        />
        <p className="ml-2 mt-1 text-red-500 underline">
          {errors[id] && errors[id]?.message?.toString()}
        </p>
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
