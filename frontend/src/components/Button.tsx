import { ReactNode } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: String;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  onClick: () => void;
  size: "sm" | "md" | "lg";
}

const varaintStyle = {
  primary: "bg-purple-primary text-white",
  secondary: "bg-purple-secondary text-purple-sec_text",
};
const size = {
  "sm": "px-2 py-1",
  "md": "px-4 py-2",
  "lg": "px-6 py-4",
};
const defaultStyle = "rounded-md text-sm";
export const Button = (props: ButtonProps) => {
  return (
    <div
      className={`${varaintStyle[props.variant]} ${defaultStyle} ${
        size[props.size]
      }`}
    >
      {props.text}
    </div>
  );
};
