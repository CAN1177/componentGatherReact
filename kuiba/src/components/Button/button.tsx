import React, {FC,ButtonHTMLAttributes, AnchorHTMLAttributes} from "react";
import classNames from "classnames";

// 枚举改字面量，便于添加
export type ButtonSize = "lg" | "sm" ;
export type ButtonType = "primary" | "default" | "danger" | "link";

interface BaseButtonProps {
  className?: string;
  /** 是否禁用*/
  disabled?: boolean;
  /** 尺寸大小*/
  size?: ButtonSize;
  btnType?: ButtonType;
  children?: React.ReactNode;
  /** link类button*/
  href?: string;
}

// 类型别名  & 联合类型
type NativeButtonProps = BaseButtonProps &
  ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps &
  AnchorHTMLAttributes<HTMLElement>;
  // Partial 属性可选
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps> ;



const Button: FC<ButtonProps> = (props) => {
  const { className, btnType, disabled, size, children, href, ...restProps } = props;

  // classNames 小工具链接：https://github.com/JedWatson/classnames
  const classes = classNames("btn", className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === 'link' && disabled,
  });

  // 链接形式的button
  if (btnType === 'link' && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    );
  } else {
    // 普通button
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    );
  }
};

Button.defaultProps = {
  disabled: false,
  btnType: 'default',
};

export default Button;
