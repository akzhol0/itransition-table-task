"use client";

import React, { createContext, useEffect, useState } from "react";
// import Cookies from "js-cookie";

type ContextProps = {
  isAuth: boolean;
  setIsAuth: (arg0: boolean) => void;
};

export const contextData = createContext({} as ContextProps);

type ContextOverAllProps = {
  children: React.ReactNode;
};

export function ContextOverAll({ children }: ContextOverAllProps) {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    !isAuth && checkIfUserLogged();
  }, []);

  const checkIfUserLogged = () => {};

  return (
    <contextData.Provider
      value={{
        isAuth,
        setIsAuth,
      }}
    >
      {children}
    </contextData.Provider>
  );
}
