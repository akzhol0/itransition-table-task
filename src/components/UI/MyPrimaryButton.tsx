import { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface MyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  className?: string;
}

function MyPrimaryButton({
  children,
  className,
  type = "button",
  disabled,
  ...props
}: MyButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={twMerge(
        "px-5 py-3 flex items-center justify-center text-blue-600 whitespace-nowrap hover:bg-blue-600 hover:text-white border-blue-600 border-2 rounded-[8px] cursor-pointer duration-150",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default MyPrimaryButton;
