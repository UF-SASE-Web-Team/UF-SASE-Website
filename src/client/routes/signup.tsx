import { signupUser } from "@/client/api/auth";
import { imageUrls } from "@assets/imageUrls";
import type { FormData } from "@components/auth/AuthForm";
import AuthForm from "@components/auth/AuthForm";
import AuthLayout from "@components/auth/AuthLayout";
import { Page } from "@components/Page";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { seo } from "../utils/seo";

export const Route = createFileRoute("/signup")({
  meta: () => [
    ...seo({
      title: "Signup | UF SASE",
      description: "Sign Up page for UF SASE",
      image: imageUrls["SASELogo.png"],
    }),
  ],

  component: () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const mutation = useMutation({
      mutationFn: async (data: FormData) => {
        return await signupUser({
          username: data.username,
          password: data.password,
          email: data.email,
        });
      },
      onSuccess: (_, variables) => {
        navigate({
          to: "/verify-email",
          search: { email: variables.email },
        });
      },
      onError: (err) => {
        console.error("Error during signup:", err);
        setErrorMessage(err.message);
      },
    });

    const handleSignup = (data: FormData) => {
      setErrorMessage(null);
      mutation.mutate(data);
    };

    return (
      <Page>
        <AuthLayout isSignUp={true}>
          <AuthForm
            title="Sign Up"
            buttonLabel="Sign Up"
            linkText="Already have an account?"
            linkRoute="/login"
            isSignUp={true}
            onSubmit={handleSignup}
            errorMessage={errorMessage || undefined}
          />
        </AuthLayout>
      </Page>
    );
  },
});
