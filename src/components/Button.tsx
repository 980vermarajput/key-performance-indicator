import React from "react";

type ButtonVariant = "primary" | "secondary" | "danger";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  onClick,
  className = "",
  ...rest
}) => {
  const baseClasses =
    "px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 w-full";

  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      "bg-teal-500 text-white hover:bg-teal-600 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed",
    secondary: "custom-secondary-btn-bg  hover:bg-gray-300 focus:ring-gray-500",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
  };
  //   background: #FF5D391F;

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <button className={buttonClasses} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

export default Button;
