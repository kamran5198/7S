import React from "react";
import { cn } from "../../lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  bordered?: boolean;
}

export const Card: React.FC<CardProps> = ({
  className,
  bordered = false,
  ...props
}) => {
  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden",
        bordered && "border border-gray-200 dark:border-gray-700",
        className
      )}
      {...props}
    />
  );
};

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardHeader: React.FC<CardHeaderProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn("px-6 py-4 border-b border-gray-200 dark:border-gray-700", className)}
      {...props}
    />
  );
};

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const CardTitle: React.FC<CardTitleProps> = ({
  className,
  ...props
}) => {
  return (
    <h3
      className={cn("text-lg font-semibold text-gray-900 dark:text-white", className)}
      {...props}
    />
  );
};

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const CardDescription: React.FC<CardDescriptionProps> = ({
  className,
  ...props
}) => {
  return (
    <p
      className={cn("text-sm text-gray-500 dark:text-gray-400", className)}
      {...props}
    />
  );
};

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardContent: React.FC<CardContentProps> = ({
  className,
  ...props
}) => {
  return <div className={cn("px-6 py-4", className)} {...props} />;
};

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardFooter: React.FC<CardFooterProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800",
        className
      )}
      {...props}
    />
  );
};