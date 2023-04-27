import React, { PropsWithChildren, createContext, useState } from "react";

interface MenuContextProps {
  curMenu: string;
  setBoard: (val: string | null) => void;
}

const MenuContext = createContext<MenuContextProps>({
  curMenu: "",
  setBoard: (val: string | null) => {},
});

export const MenuContextProvider: React.FC<PropsWithChildren<{}>> = (props) => {
  const [menu, setMenu] = useState<string | null>(null);

  const menuChkHandler = (typ: string | null) => {
    setMenu(typ);
  };

  const currMenu = menu;

  const contextValue: MenuContextProps = {
    setBoard: menuChkHandler,
    curMenu: currMenu ?? "",
  };

  return (
    <MenuContext.Provider value={contextValue}>
      {props.children}
    </MenuContext.Provider>
  );
};

export default MenuContext;
