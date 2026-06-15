import type { ComponentPropsWithoutRef, ReactNode } from "react";

const variants = {
  primary:
    "bg-accent text-white hover:bg-accent-hover focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
  secondary:
    "border border-white/30 text-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
  ghost:
    "text-accent hover:text-accent-hover underline-offset-4 hover:underline",
};

type ButtonVariant = keyof typeof variants;

type SharedButtonProps = {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
};

type LinkButtonProps = SharedButtonProps &
  Omit<ComponentPropsWithoutRef<"a">, "children" | "className"> & {
    href: string;
  };

type NativeButtonProps = SharedButtonProps &
  Omit<ComponentPropsWithoutRef<"button">, "children" | "className" | "type">;

type ButtonProps = LinkButtonProps | NativeButtonProps;

export default function Button(props: ButtonProps) {
  const { variant = "primary", className = "", children } = props;

  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50";

  const classes = `${base} ${variants[variant]} ${className}`;

  if ("href" in props) {
    const {
      href,
      variant: _variant,
      className: _className,
      children: _children,
      ...linkProps
    } = props;
    void _variant;
    void _className;
    void _children;

    return (
      <a href={href} className={classes} {...linkProps}>
        {children}
      </a>
    );
  }

  const {
    variant: _variant,
    className: _className,
    children: _children,
    ...buttonProps
  } = props;
  void _variant;
  void _className;
  void _children;

  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
