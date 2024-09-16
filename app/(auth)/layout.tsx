import Logo from "@/components/logo/Logo";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen w-full justify-between bg-slate-100 dark:bg-slate-800">
      <div className="auth-asset bg-rose-400 ">
        <div className="mb-16 mr-12 flex flex-col p-16 lg:mr-24">
          <Logo />

          <p className="mt-4 font-jetbrain text-2xl font-semibold uppercase text-white/80">
            Start Your Journey with US
          </p>
        </div>
      </div>
      <section className="flex-center h-full w-1/2 max-lg:w-full max-sm:px-6">
        {children}
      </section>
    </main>
  );
}
