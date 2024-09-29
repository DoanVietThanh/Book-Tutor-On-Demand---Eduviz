"use client";
import React from "react";
import { Input } from "./ui/input";
import { useAuthContext } from "@/context/auth-provider";

const SearchClass = () => {
  const { user } = useAuthContext();
  console.log("🚀 ~ SearchClass ~ user:", user);

  return <Input type="text" placeholder="Search course name" className="my-4 w-1/2" />;
};

export default SearchClass;
