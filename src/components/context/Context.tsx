"use client";

import React, { createContext, useEffect, useState } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import Cookies from "js-cookie";

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
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !isAuth && checkIfUserLogged();
  });

  const checkIfUserLogged = () => {
    const uid = Cookies.get('uid');

    if (uid !== undefined) {
      setIsAuth(true);
    }
  };

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
