"use client";
import type { ReactNode, ButtonHTMLAttributes } from "react";
import classNames from "classnames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "icon";
  children: ReactNode;
}

export function Button({
  variant = "primary",
  children,
  className,
  ...props
}: ButtonProps) {
  const base =
    "font-medium rounded-xl transition-colors flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-black text-white hover:bg-gray-800 disabled:bg-gray-400",
    outline: "border border-gray-300 hover:bg-gray-50",
    icon: "p-3 rounded-full border border-gray-300 hover:bg-gray-50",
  };
  return (
    <button
      className={classNames(base, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
