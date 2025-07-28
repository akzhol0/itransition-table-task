"use client";

import Link from "next/link";
import React, { useState } from "react";
import MyDangerButton from "@/components/UI/MyDangerButton";

function RegisterComponent() {
  const [stateForm, setStateForm] = useState({
    userName: "",
    login: "",
    password: "",
    birthdate: "",
    repeatPassword: "",
    error: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStateForm({ ...stateForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      [stateForm.userName, stateForm.login, stateForm.birthdate].some(
        (field) => field === "",
      )
    ) {
      setStateForm({ ...stateForm, error: "Fill out" });
      return;
    }

    if (stateForm.password !== stateForm.repeatPassword) {
      setStateForm({ ...stateForm, error: "Пароли не совпадают!" });
      return;
    }

    console.log(
      stateForm.login,
      stateForm.birthdate,
      stateForm.userName,
      stateForm.password,
    );

    // createUserWithEmailAndPassword(auth, stateForm.login, stateForm.password)
    //   .then((userCredentials) => {
    //     router.push("/login");
    //     addUserFirebase(userCredentials);
    //     sendEmailVerification(userCredentials.user);
    //   })
    //   .catch((err) => {
    //     setStateForm({ ...stateForm, error: err.code });
    //   });
  };

  // const addUserFirebase = async (userInfocb: any) => {
  //   const dateStr = stateForm.birthdate;
  //   const milliseconds = new Date(dateStr).getTime();
  //
  //   let url;
  //   if (userAvatar !== null) {
  //     const fileRef = ref(storage, `avatars/${userInfocb.user.uid}`);
  //     await uploadBytes(fileRef, userAvatar);
  //     url = await getDownloadURL(fileRef);
  //   } else {
  //     url = null;
  //   }
  //
  //   const obj = {
  //     userName: stateForm.userName,
  //     userId: userInfocb.user.uid,
  //     userLogin: stateForm.login,
  //     userPassword: stateForm.password,
  //     role: "user",
  //     gender: stateForm.gender,
  //     image: url !== null ? url : "/images/user.png",
  //     birthdate: milliseconds,
  //     friends: [],
  //     verified: false,
  //   };
  //
  //   await setDoc(doc(db, "users", userInfocb.user.uid), obj);
  //   setUsers((prev: any) => [...prev, obj]);
  // };

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
        <div className="flex flex-col items-center justify-start bg-white ">
          <div className="w-full flex gap-2 justify-center items-center">
            <label className="ps-2 text-gray-700 text-sm whitespace-nowrap">
              Birthday
            </label>
            <input
              type="date"
              name="birthdate"
              value={stateForm.birthdate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
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
