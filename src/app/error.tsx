"use client";

import { useEffect } from "react";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

/**This component is a global error
 * It fills the screen and shows the error message and a button which resets the page
 */
export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold text-[#22333B]">Oops! Noe gikk galt</h1>
      <p>{error.message}</p>
      <button
        className="mt-4 px-4 py-2 bg-[#22333B] text-white rounded-lg"
        onClick={reset}
      >
        Prøv igjen
      </button>
    </div>
  );
}
