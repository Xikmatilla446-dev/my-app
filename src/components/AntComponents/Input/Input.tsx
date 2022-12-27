import React from "react";
import {Input as AntInput, InputProps, Tag} from "antd";
import classes from "./Input.module.scss";
import cn from "classnames";

type Props = InputProps & {
    label?: any;
    className?: string;
    size?: "small" | "middle" | "large";
    errorMsg?: any;
};

const Input = ({label, size = "large", className,errorMsg, ...props}: Props) => {
    const classNames = cn(classes["input"], className && className, errorMsg && "ant-form-item-has-error");
    return (
        <div className={classNames}>
            <span className={classes["label"]}>{label}</span>
            <AntInput size={size} {...props} />
        </div>
    );
};

export default Input;
