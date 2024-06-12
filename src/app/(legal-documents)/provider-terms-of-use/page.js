"use client";

import { PolicyContainer } from "@/app/(legal-documents)/parent-terms-of-use/page";
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
} from "@/app/(legal-documents)/provider-service-agreement/page";

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
