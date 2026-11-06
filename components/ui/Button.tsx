import React from "react";
import Link from "next/link";

type Variant = "primary" | "dark" | "outline";

interface ButtonProps {
  children: React.ReactNode;
  variant?: Variant;
  href?: string;
  onClick?: () => void;
  className?: string;
  external?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary: "wa-btn wa-btn-primary",
  dark: "wa-btn wa-btn-dark",
  outline: "wa-btn wa-btn-outline",
};

export default function Button({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
  external = false,
}: ButtonProps) {
  const classes = `${variantClasses[variant]} ${className}`;

  if (href) {
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    ) : (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
