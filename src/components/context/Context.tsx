"use client";

import React, { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { UserInfoTypes } from "@/types/service";
import { collection, doc, getDocs, updateDoc } from "@firebase/firestore";
import { db } from "@/config/config";

type ContextProps = {
  isAuth: boolean;
  setIsAuth: (arg0: boolean) => void;
  users: UserInfoTypes[] | null;
  setUsers: (prev: any) => void;
  currentUser: UserInfoTypes | null;
};

export const contextData = createContext({} as ContextProps);

type ContextOverAllProps = {
  children: React.ReactNode;
};

export function ContextOverAll({ children }: ContextOverAllProps) {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [users, setUsers] = useState<UserInfoTypes[]>([]);
  const [currentUser, setCurrentUser] = useState<UserInfoTypes | null>(null);

  useEffect(() => {
    !isAuth && checkIfUserLogged();
    users?.length === 0 && getAllUsers();
  }, []);

  useEffect(() => {
    getCurrentUser();
  }, [users]);

  const getCurrentUser = async () => {
    const uid = Cookies.get("uid");
    users?.map((item) => {
      if (item.uid === uid) {
        setCurrentUser(item);
        updateLastSeen(item);
      }
    });
  };

  const updateLastSeen = async (userCB: UserInfoTypes) => {
    const userRef = doc(db, "users", `${userCB.userLogin}`);
    await updateDoc(userRef, {
      lastActiveDate: new Date().toUTCString(),
    });
  };

  const getAllUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));

    querySnapshot.forEach((doc) => {
      // @ts-ignore
      setUsers((prev) => [...prev, doc.data()]);
    });
  };

  const checkIfUserLogged = () => {
    const uid = Cookies.get("uid");

    if (uid !== undefined) {
      setIsAuth(true);
    }
  };

  return (
    <contextData.Provider
      value={{
        isAuth,
        setIsAuth,
        users,
        setUsers,
        currentUser,
      }}
    >
      {children}
    </contextData.Provider>
  );
}
