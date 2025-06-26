"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RegisterForm from "@/components/register/RegisterForm";

export default function RegisterPage() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [fullName, setFullName] = useState("");
  const router = useRouter();

  const handleSuccess = (name: string) => {
    setFullName(name);
    setShowSuccess(true);

    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative">
      {showSuccess ? (
        <div className="p-6 bg-white rounded shadow">
          <h2 className="text-xl font-bold">Velkommen, {fullName}!</h2>
        </div>
      ) : (
        <RegisterForm onSuccess={handleSuccess} />
      )}
    </div>
  );
}