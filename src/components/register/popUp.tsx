// src/components/register/RegisterPopup.tsx
"use client";

import { useEffect, useState } from "react";

interface Props {
  message: string;
}

export default function RegisterPopup({ message }: Props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timeout = setTimeout(() => setVisible(false), 4000);
      return () => clearTimeout(timeout);
    }
  }, [message]);

  if (!visible || !message) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-6 py-3 rounded-md shadow-md text-sm z-50 animate-in fade-in slide-in-from-top-2">
      {message}
    </div>
  );
}