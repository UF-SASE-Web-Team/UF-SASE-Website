import { resendVerifyCode, verifyCode } from "@/client/api/auth";
import { imageUrls } from "@assets/imageUrls";
import type { FormData } from "@components/auth/AuthForm";
import AuthForm from "@components/auth/AuthForm";
import AuthLayout from "@components/auth/AuthLayout";
import { Page } from "@components/Page";
import { SuccessModal } from "@components/SuccessModal";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../hooks/AuthContext";
import { seo } from "../utils/seo";

export const Route = createFileRoute("/verify-email")({
  validateSearch: (search: Record<string, unknown>) => ({
    email: (search.email as string) || "",
  }),
  meta: () => [
    ...seo({
      title: "Verify Email | UF SASE",
      description: "Email verification for UF SASE",
      image: imageUrls["SASELogo.png"],
    }),
  ],
  component: () => {
    const { email } = useSearch({ from: "/verify-email" });
    const { checkSession } = useAuth();
    const navigate = useNavigate();
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [canResend, setCanResend] = useState(true);
    const [countdown, setCountdown] = useState(0);
    const [isResending, setIsResending] = useState(false);

    useEffect(() => {
      if (countdown <= 0) return;
      const id = setInterval(() => setCountdown((s) => Math.max(0, s - 1)), 1000);
      return () => clearInterval(id);
    }, [countdown]);

    const resendCode = useCallback(async () => {
      if (!email || !canResend || isResending) return;
      try {
        setIsResending(true);
        await resendVerifyCode(email);
        setCanResend(false);
        setCountdown(30);
        setTimeout(() => setCanResend(true), 30000);
      } catch (error) {
        console.error("Resend error:", error);
        setErrorMessage(error instanceof Error ? error.message : "Unable to resend code");
      } finally {
        setIsResending(false);
      }
    }, [email, canResend, isResending]);

    const mutation = useMutation({
      mutationFn: async (data: { code: string }) => {
        const response = await verifyCode({ email, code: data.code });
        return response;
      },
      onSuccess: async () => {
        setShowSuccessModal(true);

        await checkSession();
      },
      onError: (error) => {
        console.error("Verification error:", error);
        setErrorMessage(error.message);
      },
    });

    const handleVerification = (data: FormData) => {
      mutation.mutate({ code: data.code });
    };

    const handleModalClose = () => {
      setShowSuccessModal(false);
      navigate({ to: "/" });
    };

    return (
      <Page>
        <AuthLayout isSignUp={false}>
          <AuthForm
            title="Verify Email"
            buttonLabel="Verify"
            isVerification={true}
            onSubmit={handleVerification}
            errorMessage={errorMessage || undefined}
            resendAction={{
              onClick: resendCode,
              disabled: !canResend || isResending,
              text: countdown > 0 ? `Resend code (${countdown}s)` : isResending ? "Sending..." : "Resend code",
            }}
          />

          <SuccessModal isOpen={showSuccessModal} onClose={handleModalClose} message="You have successfully created your account!" />
        </AuthLayout>
      </Page>
    );
  },
});
