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

export default function AuthForm({ type }: { type: FormType }) {
  const schema = AuthSchema(type);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof schema>) {
    try {
      console.log("Form submitted with values:", values);
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
                <p>Name</p>
              </>
            ) : (
              <></>
            )}
            <p>email</p>
            <p>Password</p>

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
