import { ButtonHTMLAttributes, memo, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface MyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  className?: string;
}

const MyDangerButton = memo(
  ({
    children,
    className,
    type = "button",
    disabled,
    ...props
  }: MyButtonProps) => {
    return (
      <button
        type={type}
        disabled={disabled}
        className={twMerge(
          "flex items-center justify-center text-red-600 px-5 py-3 hover:bg-red-600 hover:text-white border-red-600 border-2 rounded-lg cursor-pointer duration-150",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

export default MyDangerButton;
