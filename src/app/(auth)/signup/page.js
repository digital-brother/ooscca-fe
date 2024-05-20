"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SignUpAccount from "./components/SignUpAccount";
import SignUpDetails from "./components/SignUpDetails";
import SignUpEmailConfirmation from "./components/SignUpEmailConfirmation";
import SignUpChildren from "./components/SignUpChildren";
import { AUTH_TOKEN_NAME } from "@/app/api.mjs";

const SIGNUP_CURRENT_STEP_KEY = 'signup_current_step';

export default function SignUp() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const authToken = localStorage.getItem(AUTH_TOKEN_NAME);
    if (authToken) {
      router.push('/');
    }
    const savedStep = localStorage.getItem(SIGNUP_CURRENT_STEP_KEY);
    setCurrentStep(savedStep ? parseInt(savedStep) : 0);
  }, []);

  const goToNextStep = () => {
    setCurrentStep((prevStep) => {
      const nextStep = prevStep + 1;
      localStorage.setItem(SIGNUP_CURRENT_STEP_KEY, nextStep);
      return nextStep;
    });
  };

  const steps = [SignUpAccount, SignUpDetails, SignUpChildren, SignUpEmailConfirmation];
  const CurrentStep = steps[currentStep];
  return <CurrentStep goToNextStep={goToNextStep} />;
}
