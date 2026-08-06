"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginScreen, { type LoginValues } from "@/components/onboarding/LoginScreen";
import { useLogin } from "@/hooks/auth.hook";

export default function LoginPage() {
  const router = useRouter();
  const loginMutation = useLogin();
  const [error, setError] = useState<string | undefined>();

  const handleSubmit = async (values: LoginValues) => {
    setError(undefined);
    try {
      await loginMutation.mutateAsync({ email: values.email, password: values.password });
      router.push("/home");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Incorrect password please try again.");
    }
  };

  return (
    <LoginScreen
      onSubmit={handleSubmit}
      onGoogleLogin={() => {
        // kick off OAuth flow
      }}
      isSubmitting={loginMutation.isPending}
      error={error}
      signUpHref="/signup"
    />
  );
}