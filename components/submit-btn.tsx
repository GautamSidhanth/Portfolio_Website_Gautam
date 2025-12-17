"use client";

import React from "react";
import { FaPaperPlane } from "react-icons/fa";
import { useFormStatus } from "react-dom";

export default function SubmitBtn() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="group flex items-center justify-center gap-2 h-12 w-32 bg-gray-900 text-white rounded-full outline-none transition-all focus:scale-110 sm:hover:scale-110 sm:hover:bg-gray-950 active:scale-105 dark:bg-white/10 disabled:scale-100 disabled:bg-opacity-65"
      disabled={pending}
      suppressHydrationWarning
    >
      {pending ? (
        <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
      ) : (
        <>
          Submit{" "}
          <FaPaperPlane className="text-xs opacity-70 transition-all sm:group-hover:translate-x-2 sm:group-hover:-translate-y-2 sm:group-hover:scale-110" />{" "}
        </>
      )}
    </button>
  );
}