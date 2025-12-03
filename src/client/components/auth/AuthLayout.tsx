import { useDimensions } from "@hooks/useDimensions";
import React, { useEffect, useState } from "react";
import ShadowCard from "./AuthShadowCard";

const AuthLayout = ({ children, isSignUp }: { children: React.ReactNode; isSignUp: boolean }) => {
  const [formHeight, setFormHeight] = useState(0);
  const [formRef, formDim] = useDimensions<HTMLDivElement>();

  useEffect(() => {
    if (formDim) {
      setFormHeight(formDim.height);
    }
  }, [formDim]);

  return (
    <div className="relative flex min-h-screen items-center justify-center">
      <ShadowCard formHeight={formHeight} isSignUp={isSignUp} />
      <div ref={formRef} className="relative z-10 w-full max-w-md">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
