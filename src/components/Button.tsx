import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import { Link } from "react-router-dom";
import { classNames } from "../utils/classNames";

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
  primary:
    "bg-primary text-on-primary hover:bg-primary-hover focus-visible:outline-primary",
  secondary:
    "bg-secondary text-on-secondary hover:bg-secondary-hover focus-visible:outline-on-secondary",
  danger:
    "bg-danger text-on-danger hover:bg-danger-hover focus-visible:outline-on-danger",
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
  const classes = classNames(
    "inline-flex items-center justify-center",
    "rounded-full transition cursor-pointer",
    "focus-visible:outline-2 focus-visible:outline-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

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
