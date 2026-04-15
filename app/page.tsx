"use client";
import Image from "next/image";

export default function Home() {
  setTimeout(() => {
    window.location.pathname = "/dashboard";
  }, 2000);
  return (
    <div>
      <div>Please visit auth... Redirecting automatically</div>
    </div>
  );
}
