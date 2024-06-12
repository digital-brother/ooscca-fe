"use client";

import { PolicyContainer } from "@/app/terms/page";
import {
    BetweenSection,
    BackgroundSection,
    DefinitionSection,
    ProviderObligationSection,
    ServicesAndPlatformSection,
    IntellectualPropertySection,
    PaymentSection,
    DataProtectionSection,
    ConfidentialitySection,
    TermAndTerminationSection,
    WarrantiesAndLiabilitySection,
    GeneralSection
} from "@/app/agreement/page.js";

export default function TermsAndConditionsPage() {
    return (
      <PolicyContainer headerName="PROVIDER - TERMS OF USE" lastUpdated="Last updated: April 21 2024">
        <BetweenSection />
        <BackgroundSection />
        <DefinitionSection />
        <ProviderObligationSection />
        <ServicesAndPlatformSection />
        <IntellectualPropertySection />
        <PaymentSection />
        <DataProtectionSection />
        <ConfidentialitySection />
        <TermAndTerminationSection />
        <WarrantiesAndLiabilitySection />
        <GeneralSection />
      </PolicyContainer>
    );
  }
