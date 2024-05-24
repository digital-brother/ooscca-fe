"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SignUpAccount from "./components/SignUpAccount";
import SignUpDetails from "./components/SignUpDetails";
import SignUpEmailConfirmation from "./components/SignUpEmailConfirmation";
import SignUpChildren from "./components/SignUpChildren";
import { AUTH_TOKEN_KEY } from "@/app/api.mjs";

const SIGNUP_CURRENT_STEP_KEY = "signupCurrentStep";

export default function SignUp() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const authToken = localStorage.getItem(AUTH_TOKEN_KEY);
    if (authToken) {
      router.push("/");
    }
    const signupCurrentStepStr = localStorage.getItem(SIGNUP_CURRENT_STEP_KEY);
    const signupCurrentStep = signupCurrentStepStr ? parseInt(signupCurrentStepStr) : 0;
    setCurrentStep(signupCurrentStep);
  }, [router]);

  const goToNextStep = () => {
    localStorage.setItem(SIGNUP_CURRENT_STEP_KEY, currentStep + 1);
    setCurrentStep((currentStep) => currentStep + 1);
  };

  const steps = [SignUpAccount, SignUpDetails, SignUpChildren, SignUpEmailConfirmation];
  const CurrentStep = steps[currentStep];
  return <CurrentStep goToNextStep={goToNextStep} />;
}
