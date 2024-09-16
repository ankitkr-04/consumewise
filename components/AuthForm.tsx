"use client";

import { signIn } from "@/actions/users.actions";
import { authFormSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomInput from "./CustomInput";
import Logo from "./logo/Logo";
import { Button } from "./ui/button";
import { Form } from "./ui/form";

const AuthForm = ({ type }: { type: "sign-in" | "sign-up" }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const formSchema = authFormSchema(type);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      // const userData = {

      // }

      if (type === "sign-in") {
        const res = await signIn({
          email: data.email,
          password: data.password,
        });
        if (res) router.push("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-form ">
      <header className="lg:hidden">
        <Logo textColor="text-black" />
      </header>
      <p className="ml-3 font-jetbrain text-2xl font-semibold uppercase text-black/80 lg:m-0 lg:text-black">
        {type === "sign-in" ? "Login to Your Account" : "Create a new Account"}
      </p>
      {user ? (
        <p>You&apos;re already Login</p>
      ) : (
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            {type === "sign-up" && <></>}
            <CustomInput
              control={form.control}
              name="email"
              label="Email"
              placeholder="Enter your email"
            />
            <CustomInput
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />

            <div>
              <Button type="submit" className="form-btn" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} /> &nbsp;
                    Loading...
                  </>
                ) : type === "sign-in" ? (
                  "Sign In"
                ) : (
                  "Sign Up"
                )}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </section>
  );
};

export default AuthForm;
