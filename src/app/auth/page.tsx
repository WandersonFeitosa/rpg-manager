"use client";
import { LoginForm } from "@/app/components/login-form";
import { useState } from "react";
import { RegisterForm } from "../components/register-form";

export default function Home() {
  const [loginMode, setLoginMode] = useState(true);

  if (loginMode) {
    return <LoginForm setLoginMode={setLoginMode} />;
  } else {
    return <RegisterForm setLoginMode={setLoginMode} />;
  }
}
