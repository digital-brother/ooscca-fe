"use client";

import { useState, useEffect } from "react";
import SignUpAccount from "./components/SignUpAccount";
import SignUpDetails from "./components/SignUpDetails";
import SignUpEmailConfirmation from "./components/SignUpEmailConfirmation";
import SignUpChildren from "./components/SignUpChildren";

export default function SignUp() {
  const [currentStep, setCurrentStep] = useState(() => {
    const savedStep = localStorage.getItem('signup_current_step');
    return savedStep ? parseInt(savedStep) : 0;
  });

  const steps = [SignUpAccount, SignUpDetails, SignUpChildren, SignUpEmailConfirmation];
  const CurrentStep = steps[currentStep];

  useEffect(() => {
    localStorage.setItem('signup_current_step', currentStep);
  }, [currentStep]);
  
  return <CurrentStep goToNextStep={() => setCurrentStep((currentStep) => currentStep + 1)} />;
}
