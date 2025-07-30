"use client";

import React, { useContext, useEffect, useState } from "react";
import { contextData } from "@/components/context/Context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import MyDangerButton from "@/components/UI/MyDangerButton";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "@/config/config";
import Cookies from "js-cookie";

const LoginComponent = () => {
  const { isAuth, setIsAuth, getCurrentUser } = useContext(contextData);
  const router = useRouter();

  useEffect(() => {
    isAuth && router.push("/");
  }, [isAuth]);

  const [stateForm, setStateForm] = useState({
    login: "",
    password: "",
    error: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStateForm({ ...stateForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, stateForm.login, stateForm.password)
      .then(async (userCredentials) => {
        setIsAuth(true);
        Cookies.set("uid", userCredentials.user.uid);
        router.push("/");
        getCurrentUser();
      })
      .catch((err) => {
        setStateForm({ ...stateForm, error: err.message });
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center rounded-xl text-black"
    >
      <p className="text-3xl py-4">Sign-In</p>
      <div className="flex flex-col gap-4">
        <input
          className="w-[300px] rounded-lg ps-2 h-[60px] border-b border-gray-300 focus:outline-0"
          placeholder="Email"
          type="text"
          id="login"
          name="login"
          value={stateForm.login}
          onChange={handleChange}
        />
        <div className="flex relative">
          <input
            className="w-[300px] rounded-lg ps-2 h-[60px] border-b border-gray-300 focus:outline-0"
            placeholder="Password"
            type="password"
            name="password"
            value={stateForm.password}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2 text-sm ">
          <Link href="/sign-up">
            <p className="text-center cursor-pointer hover:underline">
              Haven&#39;t registered yet? Register!
            </p>
          </Link>
          <MyDangerButton
            type="submit"
            className="bg-[#131313] border-white hover:bg-red-600 duration-300 text-white"
          >
            Sign In
          </MyDangerButton>
          <p className="text-center cursor-pointer text-red-600">
            {stateForm.error}
          </p>
        </div>
      </div>
    </form>
  );
};

export default LoginComponent;
