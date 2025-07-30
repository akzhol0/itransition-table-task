"use client";

import Link from "next/link";
import React, { useContext, useState } from "react";
import MyDangerButton from "@/components/UI/MyDangerButton";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { useRouter } from "next/navigation";
import { auth, db } from "@/config/config";
import { doc, setDoc } from "@firebase/firestore";
import { UserInfoTypes } from "@/types/service";
import { contextData } from "@/components/context/Context";

function RegisterComponent() {
  const { setUsers } = useContext(contextData);

  const [stateForm, setStateForm] = useState({
    userName: "",
    login: "",
    password: "",
    repeatPassword: "",
    error: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStateForm({ ...stateForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ([stateForm.userName, stateForm.login].some((field) => field === "")) {
      setStateForm({ ...stateForm, error: "Fill out" });
      return;
    }

    if (stateForm.password !== stateForm.repeatPassword) {
      setStateForm({ ...stateForm, error: "Пароли не совпадают!" });
      return;
    }

    createUserWithEmailAndPassword(auth, stateForm.login, stateForm.password)
      .then((userCredentials) => {
        router.push("/sign-in");
        console.log(userCredentials);

        const userInputInfo = {
          userName: stateForm.userName,
          userLogin: stateForm.login,
          password: stateForm.password,
          status: "active",
          createdAt: userCredentials.user.metadata.creationTime,
          lastActiveDate: userCredentials.user.metadata.lastSignInTime,
          blocked: false,
          uid: userCredentials.user.uid,
        };
        addUserFirebase(userInputInfo);
      })
      .catch((err) => {
        setStateForm({ ...stateForm, error: err.code });
      });
  };

  const addUserFirebase = async (userInfoCB: UserInfoTypes) => {
    // @ts-ignore
    setUsers((prev: UserInfoTypes) => [...prev, userInfoCB]);
    await setDoc(doc(db, "users", stateForm.login), userInfoCB);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center rounded-xl text-black"
    >
      <p className="text-3xl py-4">Sign Up</p>
      <div className="flex flex-col gap-4">
        <input
          className="w-[300px] rounded-lg ps-2 h-[60px] border-b border-gray-300 focus:outline-0"
          placeholder="Name"
          type="text"
          id="userName"
          name="userName"
          value={stateForm.userName}
          onChange={handleChange}
        />
        <input
          className="w-[300px] rounded-lg ps-2 h-[60px] border-b border-gray-300 focus:outline-0"
          placeholder="Email"
          type="text"
          id="email"
          name="login"
          value={stateForm.login}
          onChange={handleChange}
        />
        <div className="relative">
          <input
            className="w-[300px] rounded-lg ps-2 h-[60px] border-b border-gray-300 focus:outline-0"
            placeholder="Password"
            type="password"
            id="password"
            name="password"
            value={stateForm.password}
            onChange={handleChange}
          />
        </div>
        <div className="relative">
          <input
            className="w-[300px] rounded-lg ps-2 h-[60px] border-b border-gray-300 focus:outline-0"
            placeholder="Repeat Password"
            type="password"
            id="password-repeat"
            name="repeatPassword"
            value={stateForm.repeatPassword}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Link href="/sign-in">
            <p className="text-sm text-center cursor-pointer hover:underline">
              Have an account? Login!
            </p>
          </Link>
          <MyDangerButton
            type="submit"
            className="bg-[#131313] border-white hover:bg-red-500 duration-300 text-white"
          >
            Sign Up
          </MyDangerButton>
          <p className="text-sm text-center text-red-600">{stateForm.error}</p>
        </div>
      </div>
    </form>
  );
}

export default RegisterComponent;
