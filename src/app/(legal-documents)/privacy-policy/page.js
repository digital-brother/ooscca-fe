"use client";

import {
  PolicyContainer,
  IntroductionSection,
  AcceptingSection,
  PrivacySection,
  DescriptionSection,
  LimitationSection,
  UserResponsibilitiesSection,
  AccountSection,
  ProviderServicesPaymentSection,
  PlatformSection,
  AvailabilitySection,
  LinkingSection,
  TerminationSection,
  IntellectualPropertyRightsSection,
  ReleaseOfLiabilitySection,
  DisclaimersSection,
  GoverningLawSection,
  GeneralProvisionsSection,
} from "@/app/(legal-documents)/parent-terms-of-use/page";

export default function PrivacyPolicyPage() {
  return (
    <PolicyContainer headerName="PRIVACY POLICY" lastUpdated="Last updated: April 21 2024">
      <IntroductionSection />
      <AcceptingSection />
      <PrivacySection />
      <DescriptionSection />
      <LimitationSection />
      <UserResponsibilitiesSection />
      <AccountSection />
      <ProviderServicesPaymentSection />
      <PlatformSection />
      <AvailabilitySection />
      <LinkingSection />
      <TerminationSection />
      <IntellectualPropertyRightsSection />
      <ReleaseOfLiabilitySection />
      <DisclaimersSection />
      <GoverningLawSection />
      <GeneralProvisionsSection />
    </PolicyContainer>
  );
}
