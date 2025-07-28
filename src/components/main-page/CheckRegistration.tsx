"use client";

import React, { useContext, useEffect } from "react";
import { contextData } from "@/components/context/Context";
import { useRouter } from "next/navigation";

const CheckRegistration = () => {
  const { isAuth } = useContext(contextData);
  const router = useRouter();

  useEffect(() => {
    !isAuth && router.push("/sign-in");
  }, []);

  return <div></div>;
};

export default CheckRegistration;
