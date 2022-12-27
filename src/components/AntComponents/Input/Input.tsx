import React from "react";
import { Input as AntInput, InputProps } from "antd";
import classes from "./Input.module.scss";
import cn from "classnames";

type Props = InputProps & {
  label?: any;
  className?: string;
  size?: "small" | "middle" | "large";
};

const Input = ({ label, size = "large", className, ...props }: Props) => {
  const classNames = cn(classes["input"], className && className);
  return (
    <div className={classNames}>
      <span className={classes["label"]}>{label}</span>
      <AntInput size={size} {...props} />
    </div>
  );
};

export default Input;
