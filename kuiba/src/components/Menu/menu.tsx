import React, { useState, createContext } from "react";
import classNames from "classnames";

type MenuModel = "horizontal" | "vertical";
type SelectCallback = (selectIndex: number) => void;

export interface MenuProps {
  defaultIndex?: number;
  className?: string;
  mode?: MenuModel;
  style?: React.CSSProperties;
  //click menu callBack Function
  onSelect?: SelectCallback;
}

interface IMenuContext {
  index: number;
  onSelect?: SelectCallback;
}

export const MenuContext = createContext<IMenuContext>({ index: 0 });

const Menu: React.FC<MenuProps> = (props) => {
  const { className, mode, style, children, defaultIndex, onSelect } = props;
  const [curActive, setActive] = useState(defaultIndex);

  const classes = classNames("kuiba-menu", className, {
    "menu-vertical": mode === "vertical",
  });
  const handleClick = (index: number) => {
    setActive(index);
    if (onSelect) onSelect(index);
  };
  const passedContext: IMenuContext = {
    index: curActive ? curActive : 0,
    onSelect: handleClick,
  };
  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={passedContext}>{children}</MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: 0,
  mode: "horizontal",
};
export default Menu;
