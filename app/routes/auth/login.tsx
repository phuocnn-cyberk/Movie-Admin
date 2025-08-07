"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignIn } from "~/hooks/auth/useSignIn";
import { ROUTES } from "~/routes";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signInMutation = useSignIn();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInMutation.mutateAsync({ email, password });
      toast.success("Sign in successful");
      navigate(ROUTES.DASHBOARD);
    } catch {
      toast.error("Sign in failed");
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-[#111111]">
      <main className="flex flex-grow items-center justify-center px-4">
        <div className="my-16 w-full max-w-md rounded-md bg-black/75 p-12 md:p-16">
          <h1 className="mb-8 text-3xl font-bold text-white">Sign in</h1>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              className="border-white/20 bg-transparent p-6 text-lg text-white shadow-none focus-visible:ring-0"
              style={{
                WebkitBoxShadow: "0 0 0 30px rgba(0,0,0,0.75) inset",
                WebkitTextFillColor: "white",
              }}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              className="border-white/20 bg-transparent p-6 text-lg text-white shadow-none focus-visible:ring-0"
              style={{
                WebkitBoxShadow: "0 0 0 30px rgba(0,0,0,0.75) inset",
                WebkitTextFillColor: "white",
              }}
            />
            <Button
              type="submit"
              variant="destructive"
              className="mt-6 h-12 w-full !bg-[#e50914] text-base font-bold"
              disabled={signInMutation.isPending}
            >
              {signInMutation.isPending ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
