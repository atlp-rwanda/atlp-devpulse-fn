import React, { forwardRef, InputHTMLAttributes, ReactNode } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  parentClassName?: string;
  styles?: string;
  label?: string;
  error?: any;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ parentClassName, ...props }, ref) => {
    return (
      <div className={`max-h-[50%] mt-2 ${parentClassName}`}>
        <label htmlFor={props.name} className={`${props.className} sr-only`}>
          {props.label}
        </label>
        <div className="">
          <input
            ref={ref}
            type={props.type}
            placeholder={props.placeholder}
            className={`w-full focus:outline ${props.className}`}
            onChange={props.onChange}
            {...props}
            autoComplete="off"
          />
          {props.error && (
            <p className="text-red-300 text-xs" id={`${props.name}-error`}>
              {props.error?.message.split(",")[0]}<span className="text-red-500">*</span>
            </p>
          )}
        </div>
      </div>
    );
  }
);

export default InputField;
