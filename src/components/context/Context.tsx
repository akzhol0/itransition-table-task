"use client";

import React, { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { UserInfoTypes } from "@/types/service";
import { collection, doc, getDocs, updateDoc } from "@firebase/firestore";
import { db } from "@/config/config";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type ContextProps = {
  isAuth: boolean;
  setIsAuth: (arg0: boolean) => void;
  users: UserInfoTypes[] | null;
  setUsers: (prev: any) => void;
  currentUser: UserInfoTypes | null;
  getCurrentUser: () => void;
};

export const contextData = createContext({} as ContextProps);

type ContextOverAllProps = {
  children: React.ReactNode;
};

export function ContextOverAll({ children }: ContextOverAllProps) {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [users, setUsers] = useState<UserInfoTypes[]>([]);
  const [currentUser, setCurrentUser] = useState<UserInfoTypes | null>(null);
  const [updated, setUpdated] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    !isAuth && checkIfUserLogged();
    users?.length === 0 && getAllUsers();
  }, []);

  useEffect(() => {
    users?.length !== 0 && !updated && getCurrentUser();
  }, [users]);

  const getCurrentUser = async () => {
    const uid = Cookies.get("uid");
    console.log(123);
    users?.map((item) => {
      if (item.uid === uid) {
        if (!item.blocked) {
          setCurrentUser(item);
          updateLastSeen(item);
          setUpdated(true);
        } else {
          router.push("/");
          toast.error("You are blocked!");
          setIsAuth(false);
          Cookies.remove("uid");
        }
      }
    });
  };

  const updateLastSeen = async (userCB: UserInfoTypes) => {
    const userRef = doc(db, "users", `${userCB.userLogin}`);
    await updateDoc(userRef, {
      lastActiveDate: new Date().toUTCString(),
    });
    setUsers((prev: any) =>
      prev.map((user: UserInfoTypes) =>
        user.userLogin === userCB.userLogin
          ? { ...user, lastActiveDate: new Date().toUTCString() }
          : user,
      ),
    );
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
        getCurrentUser,
      }}
    >
      {children}
    </contextData.Provider>
  );
}
