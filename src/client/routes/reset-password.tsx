import { imageUrls } from "@assets/imageUrls";
import AuthForm from "@components/auth/AuthForm";
import type { FormData } from "@components/auth/AuthForm";
import AuthLayout from "@components/auth/AuthLayout";
import { Page } from "@components/Page";
import { SuccessModal } from "@components/SuccessModal";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useLocation, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { seo } from "../utils/seo";

export const Route = createFileRoute("/reset-password")({
  meta: () => [
    ...seo({
      title: "Reset Password | UF SASE",
      description: "Reset Password page for UF SASE",
      image: imageUrls["SASELogo.png"],
    }),
  ],

  component: () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get("id");

    const mutation = useMutation({
      mutationFn: async (formData: { id: string; newPassword: string }) => {
        const response = await fetch("/api/users/password", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }
      },
      onSuccess: () => {
        setShowSuccessModal(true);
      },
      onError: (error) => {
        setErrorMessage(error.message);
      },
    });

    const handleResetPassword = (data: FormData) => {
      if (!userId) {
        setErrorMessage("Invalid reset link");
        return;
      }
      mutation.mutate({ id: userId, newPassword: data.newPassword });
    };
    const handleModalClose = () => {
      setShowSuccessModal(false);
      navigate({ to: "/login" });
    };

    return (
      <Page>
        <AuthLayout isSignUp={false}>
          <AuthForm
            title="Reset Password"
            buttonLabel="Reset Password"
            linkText=""
            linkRoute=""
            isResetPassword={true}
            onSubmit={handleResetPassword}
            errorMessage={errorMessage || undefined}
          />
          <SuccessModal isOpen={showSuccessModal} onClose={handleModalClose} message="Your password has been successfully reset!" />
        </AuthLayout>
      </Page>
    );
  },
});
