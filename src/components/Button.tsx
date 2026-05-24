import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import { Link } from "react-router-dom";

type Variant = "primary" | "secondary" | "danger";

type Size = "default" | "icon";

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  to?: string;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement>;

const variantClasses: Record<Variant, string> = {
  primary: "bg-indigo-700 text-white hover:bg-indigo-600",
  secondary: "bg-indigo-100 text-indigo-700 hover:bg-indigo-200",
  danger: "bg-rose-100 text-rose-700 hover:bg-rose-200",
};

const sizeClasses: Record<Size, string> = {
  default: "px-4 py-2",
  icon: "p-2",
};

export default function Button({
  children,
  variant = "primary",
  size = "default",
  className = "",
  to,
  type,
  ...props
}: ButtonProps) {
  const classes = [
    "inline-flex items-center justify-center",
    "rounded-full transition cursor-pointer",
    "focus:outline-none focus:ring-2 focus:ring-indigo-400",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    variantClasses[variant],
    sizeClasses[size],
    className,
  ].join(" ");

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type ?? "button"} className={classes} {...props}>
      {children}
    </button>
  );
}
