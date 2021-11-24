import React from "react";
import classNames from "classnames";

// export enum ButtonSize {
//   Large = "lg",
//   Small = "sm",
// }

// export enum ButtonType {
//   Primary = "primary",
//   Default = "default",
//   Danger = "danger",
//   Link = "link",
// }

// 枚举改字面量，便于添加
export type ButtonSize = "lg" | "sm" ;
export type ButtonType = "primary" | "default" | "danger" | "link";

interface BaseButtonProps {
  // ?: 为可选参数/属性
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  children?: React.ReactNode;
  href?: string;
}

// 类型别名  & 联合类型
type NativeButtonProps = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps &
  React.AnchorHTMLAttributes<HTMLElement>;
  // Partial 属性可选
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps> ;



const Button: React.FC<ButtonProps> = (props) => {
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
