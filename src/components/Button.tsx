import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import { Link } from "react-router-dom";
import { classNames } from "../utils/classNames";

type Variant = "primary" | "secondary" | "danger" | "ghost";

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
  primary: "btn-primary",
  secondary: "btn-secondary",
  danger: "btn-danger",
  ghost: "btn-ghost",
};

const sizeClasses: Record<Size, string> = {
  default: "btn-default",
  icon: "btn-icon",
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
    "btn",
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
