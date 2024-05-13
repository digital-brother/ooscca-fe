"use client";

import { useState } from "react";
import SignUpAccount from "./components/SignUpAccount";
import SignUpDetails from "./components/SignUpDetails";
import SignUpEmailConfirmation from "./components/SignUpEmailConfirmation";
import SignUpChildren from "./components/SignupChildren";

export default function SignUp() {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [SignUpAccount, SignUpChildren, SignUpDetails, SignUpEmailConfirmation];
  const CurrentStep = steps[currentStep];
  return <CurrentStep goToNextStep={() => setCurrentStep((currentStep) => currentStep + 1)} />;
}
