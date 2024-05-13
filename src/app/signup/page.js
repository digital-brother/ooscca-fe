"use client";

import { useState } from "react";
import SignUpAccount from "./components/SignUpAccount";
import SignUpDetails from "./components/SignUpDetails";
import SignUpEmailConfirmation from "./components/SignUpEmailConfirmation";
import SignUpChildren from "./components/SignUpChildren";

export default function SignUp() {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [SignUpAccount, SignUpDetails, SignUpChildren, SignUpEmailConfirmation];
  const CurrentStep = steps[currentStep];
  return <CurrentStep goToNextStep={() => setCurrentStep((currentStep) => currentStep + 1)} />;
}
