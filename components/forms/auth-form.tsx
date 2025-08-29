"use client";

import { AuthSchema } from "@/schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import z from "zod";
import { toast } from "sonner";
import FormField from "./form-field";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/client";
import { signUp } from "@/lib/actions/auth.action";

export default function AuthForm({ type }: { type: FormType }) {
  const router = useRouter();
  const schema = AuthSchema(type);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    try {
      if (type === "sign-in") {
        console.log("Signing in with:", values);
        toast.success("Signed in successfully!");
        router.push("/dashboard");
      } else {
        const { username, email, password } = values;

        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const result = await signUp({
          uid: userCredentials.user.uid,
          name: username!,
          email: email,
          password: password,
        });

        if (!result?.success) {
          toast.error(result?.message);

          return;
        }

        toast.success("Account created successfully!");
        router.push("/sign-in");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while submitting the form.");
    }
  }

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src={"/logo.svg"} alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">StageOne</h2>
        </div>
        <h3 className="text-center">Practice job interviews with AI</h3>
        <p className="text-primary-100/50 text-center text-sm ">
          {type === "sign-in"
            ? "Sign in to continue to StageOne."
            : "Create an account to get started."}
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full mt-4 form"
          >
            {type === "sign-up" ? (
              <>
                <FormField
                  control={form.control}
                  name="username"
                  label="Username"
                  placeholder="Your username"
                  type="text"
                />
              </>
            ) : (
              <></>
            )}
            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your email"
              type="email"
            />

            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Your password"
              type="password"
            />

            <Button type="submit" className="btn">
              {type === "sign-in" ? "Sign In" : "Sign Up"}
            </Button>
          </form>
        </Form>

        <p className="text-center">
          {type === "sign-in"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <Link
            href={type === "sign-in" ? "/sign-up" : "/sign-in"}
            className="text-user-primary font-bold"
          >
            {type === "sign-in" ? "Sign Up" : "Sign In"}
          </Link>
          <span> to continue.</span>
        </p>
      </div>
    </div>
  );
}
