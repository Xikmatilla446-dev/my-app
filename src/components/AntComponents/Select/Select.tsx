import classes from "./Select.module.scss";
import { Select as AntSelect, SelectProps } from "antd";
import cn from "classnames";

type Props = SelectProps & {
  label?: any;
  fullWidth?: boolean;
  size?: "small" | "middle" | "large";
};

const Select = ({ label, size = "large", fullWidth, ...props }: Props) => {
  const classNames = cn(classes["select"], fullWidth && "w100");
  return (
    <div className={classNames}>
      <span className={classes["label"]}>{label}</span>
      <AntSelect size={size} {...props} />
    </div>
  );
};

export default Select;
