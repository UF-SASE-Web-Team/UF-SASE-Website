import type { FormData } from "@components/auth/AuthForm";
import AuthForm from "@components/auth/AuthForm";
import { Page } from "@components/Page";
import { useAuth } from "@hooks/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { imageUrls } from "../assets/imageUrls";
import AuthLayout from "@components/auth/AuthLayout";
import { seo } from "../utils/seo";

export const Route = createFileRoute("/login")({
  meta: () => [
    ...seo({
      title: "Login | UF SASE",
      description: "Login page for UF SASE",
      image: imageUrls["SASELogo.png"],
    }),
  ],

  component: () => {
    const { login } = useAuth(); // this is (username,password)=>Promise<void>
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const mutation = useMutation({
      mutationFn: async (data: FormData) => {
        // call your AuthContext login directly
        await login(data.username, data.password);
      },
      onSuccess: () => {
        // on a successful login, send them home
        navigate({ to: "/" });
      },
      onError: (err) => {
        setErrorMessage(err.message);
      },
    });

    const handleLogin = (data: FormData) => {
      setErrorMessage(null);
      mutation.mutate(data);
    };

    return (
      <Page>
        <AuthLayout isSignUp={false}>
          <AuthForm
            title="Login"
            buttonLabel="Login"
            linkText="Forgot password?"
            linkRoute="/"
            onSubmit={handleLogin}
            errorMessage={errorMessage || undefined}
            additionalButton={{
              text: "Register new account",
              route: "/signup",
            }}
          />
        </AuthLayout>
      </Page>
    );
  },
});
