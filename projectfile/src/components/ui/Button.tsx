import React from "react";
import { cn } from "../../lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  children,
  variant = "primary",
  size = "md",
  disabled,
  isLoading,
  ...props
}) => {
  const baseStyles = "font-medium rounded-md inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800 dark:text-gray-100",
    ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-100",
    danger: "bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700",
  };

  const sizes = {
    sm: "text-sm h-8 px-3",
    md: "text-sm h-10 px-4",
    lg: "text-base h-12 px-6",
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        isLoading && "opacity-70 cursor-not-allowed",
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : null}
      {children}
    </button>
  );
};