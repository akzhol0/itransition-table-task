"use client";

import React, { useContext } from "react";
import { CornerUpLeft } from "lucide-react";
import Cookies from "js-cookie";
import { contextData } from "@/components/context/Context";
import { useRouter } from "next/navigation";

const Header = () => {
  const { setIsAuth } = useContext(contextData);
  const router = useRouter();

  return (
    <div className="w-full bg-white border-b border-gray-300 flex justify-center items-center gap-4">
      <p className="font-semibold text-2xl py-3">Table App</p>
      <span
        onClick={() => {
          Cookies.remove("uid");
          setIsAuth(false);
          router.push("/sign-in");
        }}
        className="flex p-1 gap-2 cursor-pointer hover:bg-blue-300 duration-300 border border-blue-600 rounded-lg"
      >
        <CornerUpLeft color={"blue"} />
        Leave
      </span>
    </div>
  );
};

export default Header;
