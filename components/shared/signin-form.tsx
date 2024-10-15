"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

type FormData = {
  username: string;
  email: string;
  password: string;
};

export default function SignInForm() {
  const [email, setEmail] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  async function SignInWithEmail() {
    setLoading(true);
    const signInResult = await signIn("email", {
      email: email,
      callbackUrl: `${window.location.origin}`,
      redirect: false,
    });
    if (!signInResult?.ok) {
      setLoading(false);
      return toast({
        title: "Well this did not work...",
        description: "Something went wrong, please try again",
        variant: "destructive",
      });
    }
    setLoading(false);
    return toast({
      title: "Check your email",
      description: "A magic link has been sent to you",
    });
  }

  const onSubmit = async (data: any) => {
    await SignInWithEmail();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col gap-y-2">
        <Label>Email</Label>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          type="email"
          placeholder="name@example.com"
        />
        {errors.email?.message && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <Button type="submit" className="mt-4 w-full">
        {loading ? "Submitting..." : "Login with Email"}
      </Button>
      <p className="text-center mt-4">
        Don't have an account?{" "}
        <Link href="/register" className="text-blue-500 hover:underline">
          Register here
        </Link>
      </p>
    </form>
  );
}
