"use client";
import { signIn, signUp } from "@/actions/users.actions";
import { authFormSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomInput from "./CustomInput";
import FormSelect from "./FormSelect";
import Logo from "./logo/Logo";
import { Button } from "./ui/button";
import { Form } from "./ui/form";

const AuthForm = ({ type }: { type: "sign-in" | "sign-up" }) => {
  const [user, setUser] = useState(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const formSchema = authFormSchema(type);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const userData = {
        email: data.email!,
        password: data.password!,
        name: data.name!,
        age: parseInt(data.age!),
        gender: data.gender!,
        height: parseFloat(data.height!),
        weight: parseFloat(data.weight!),
        activityLevel: data.activityLevel!,
      };

      if (type === "sign-in") {
        const res = await signIn({
          email: data.email,
          password: data.password,
        });
        if (res) router.push("/");
      } else if (type === "sign-up" && step === 2) {
        const res = await signUp(userData);
        if (res) setUser(res);
        // if(res) router.push("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header>
        <Logo otherStyles="lg:hidden" textColor="text-black" />
        <p className="ml-3 mt-4 font-jetbrain text-2xl font-semibold uppercase text-black/80 lg:m-0 lg:text-black">
          {type === "sign-in"
            ? "Login to Your Account"
            : "Create a new Account"}
        </p>
      </header>

      {user ? (
        <p>You&apos;re already logged in {user}</p>
      ) : (
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            {/* Step 1 for Sign-Up and full form for Sign-In */}
            {(type === "sign-in" || (type === "sign-up" && step === 1)) && (
              <>
                {type === "sign-up" && (
                  <CustomInput
                    control={form.control}
                    name="name"
                    label="Name"
                    placeholder="Enter your Name"
                    key={"name"}
                  />
                )}
                <CustomInput
                  control={form.control}
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="Enter your email"
                  key="email"
                />
                <CustomInput
                  control={form.control}
                  name="password"
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  key="password"
                />
              </>
            )}

            {/* Step 2 for Sign-Up */}
            {type === "sign-up" && step === 2 && (
              <>
                <div className="grid grid-cols-2 items-start justify-center gap-3">
                  <CustomInput
                    control={form.control}
                    name="age"
                    label="Age"
                    placeholder="Age"
                    tag="Y"
                    type="number"
                    key={"age"}
                  />
                  <FormSelect
                    control={form.control}
                    name="gender"
                    label="Gender"
                    placeholder="Select Gender"
                    options={[
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" },
                      { value: "other", label: "Other" },
                    ]}
                    key="gender"
                  />
                </div>

                <div className="grid grid-cols-2 items-center gap-3">
                  <CustomInput
                    control={form.control}
                    name="weight"
                    label="Weight"
                    placeholder="Weight in kg"
                    tag="KG"
                    type="number"
                    key="weight"
                  />
                  <CustomInput
                    control={form.control}
                    name="height"
                    label="Height"
                    placeholder="Height in cm"
                    tag="CM"
                    type="number"
                    key="height"
                  />
                </div>

                <FormSelect
                  control={form.control}
                  name="activityLevel"
                  label="Activity Level"
                  placeholder="Select Activity Level"
                  options={[
                    { value: "sedentary", label: "Sedentary" },
                    { value: "light", label: "Light" },
                    { value: "moderate", label: "Moderate" },
                    { value: "active", label: "Active" },
                    { value: "very_active", label: "Very Active" },
                  ]}
                  key="activityLevel"
                />
              </>
            )}

            <div className="mt-2 flex items-center gap-2 pt-4">
              {type === "sign-up" && step === 2 && (
                <Button
                  className="size-12 rounded-full bg-black/90"
                  onClick={() => setStep(1)}
                  disabled={loading}
                >
                  <ChevronLeft className="p-0 text-2xl text-white" size={20} />
                </Button>
              )}

              <Button
                type={step === 2 || type === "sign-in" ? "submit" : "button"}
                className="form-btn"
                onClick={() => type === "sign-up" && step === 1 && setStep(2)}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} /> &nbsp;
                    Loading...
                  </>
                ) : step === 2 || type === "sign-in" ? (
                  type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )
                ) : (
                  "Continue"
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
