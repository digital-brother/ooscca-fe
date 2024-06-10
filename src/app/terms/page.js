"use client";

import React from 'react';
import { Box, Container, Typography } from '@mui/material';

function MainSection() {
  return (
    <>
    <Box
      sx={{
        backgroundColor: "grey.200",
        textAlign: "center",
        mb: 4,
        p: 14,
        borderRadius: 4,
      }}
    >
      <Typography variant="h3">Terms and Conditions</Typography>
      <Typography variant="body1">Last updated: 21 September 2023</Typography>
    </Box>
    <Typography variant="body1" paragraph>
        These Terms and Conditions (the &quot;Terms&quot;) describe the terms and conditions on which OOSCCA Ltd.,
        a United Kingdom company (&ldquo;OOSCCA, &rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) makes its
        website (&ldquo;Site&rdquo;) and application (collectively the &ldquo;Services &rdquo;) available to you.
        By using or accessing our Services, you confirm your agreement to be bound by these Terms and our Privacy Policy, which are
        incorporated herein by reference. If you do not agree to these Terms and the Privacy Policy, please do not use or access the Services.
        The Terms expressly supersede any prior terms of use between you and us or any of our affiliates or predecessors.
      </Typography>
    </>
  );
}

function AcceptanceSection() {
  return (
  <>
    <Typography variant="h6">Acceptance of the Terms</Typography>
    <Typography variant="body1" paragraph>
      OOSCCA&apos;s products, features and offerings are available made available through www.OOSCCA.com and app.OOSCCA.com.
      All of these are collectively referred to as &quot;OOSCCA Properties&quot; or our &quot;Services&quot;. The material,
      including without limitation information, data, text, editorial content, design elements, look and feel, formatting,
      graphics, images, photographs, videos, music, sounds and other content contained in or delivered via the Services or
      otherwise made available by OOSCCA in connection with the Services is the &quot;Site Content&quot; (or &quot;Content&quot;).
      Any material (including the foregoing categories) that you contribute, provide, post or make available using the
      Services is &quot;Your Content.&quot;
    </Typography>
    <Typography variant="body1" paragraph>
      When these Terms use the term &quot;Organiser,&quot; we mean event creators using the Services to create events displayed
      on the Services for consumers using our Services (a) to consume information about or attend Events (&quot;Consumers&quot;),
      or (b) for any other reason. Organisers, Consumers and third parties using our Services are all referred to in these
      Terms collectively as &quot;Users,&quot; &quot;you&quot; or &quot;your.&quot; When these Terms use the term &quot;OOSCCA,&quot;
      &quot;we,&quot; &quot;us,&quot; or &quot;our,&quot; that refers to OOSCCA, Inc. and its affiliates, and subsidiaries,
      and each of its and their respective officers, directors, agents, partners and employees.
    </Typography>
    <Typography variant="body1" paragraph>
      If you are an Organiser offering events with paid booking, OOSCCA&apos;s Merchant Agreement and Organiser Refund Policy
      Requirements are also applicable to you. If you are an Organiser or Consumer, OOSCCA&apos;s Community Guidelines are
      applicable to you. (Some, but not all, of the terms in those agreements are duplicated in these Terms). If you are a
      third party interacting with our Services not as an Organiser or a Consumer, the API Terms of Use or Trademark and
      Copyright Policy might be applicable to you. Please be on the lookout for additional terms and conditions displayed
      with certain Services that you may use from time to time as those will also be applicable to you. And, by agreeing
      to these Terms, you acknowledge you have read the Privacy Policy and Cookie Statement applicable to all Users. We may
      sometimes provide you with services that are not described in these Terms, or customised services: unless we have
      entered into a separate, signed agreement that expressly supersedes these Terms, these Terms will apply to those
      services as well.
    </Typography>
    <Typography variant="body1" paragraph>
      These Terms and the other documents referenced in them comprise OOSCCA&apos;s &quot;Terms.&quot; These Terms are a
      legally binding agreement between you and OOSCCA governing your access to and use of the Services and setting out
      your rights and responsibilities when you use the Services. By using any of our Services (including browsing a Site),
      you are agreeing to these Terms. If you do not agree to these Terms, please do not use or access the Services. If you
      will be using the Services on behalf of an entity (such as on behalf of your employer), you agree to these Terms on
      behalf of that entity and its affiliates and you represent that you have the authority to do so. In such case,
      &quot;you&quot; and &quot;your&quot; will refer to that entity as well as yourself.
    </Typography>
  </>
  );
}

function ServicesSection() {
  return (
     <>
      <Typography variant="h6">OOSCCA&apos;s Services and Role</Typography>
      <Typography variant="body1" paragraph>
        OOSCCA&apos;s Services provide a simple and quick means for Organisers to create speaker profiles, organiser profiles,
        and other webpages related to their events, promote those pages and events to visitors or browsers on the Services
        or elsewhere online, manage online or onsite booking and registration, solicit donations, and sell or reserve
        merchandise or accommodations related to those events to Consumers or other Users.
      </Typography>
      <Typography variant="body1" paragraph>
        OOSCCA is not the creator, organiser or owner of the events listed on the Services. Rather, OOSCCA provides its
        Services, which allow Organisers to manage booking and registration and promote their events. The Organiser is solely
        responsible for ensuring that any page displaying an event on the Services (and the event itself) meet all applicable
        local, state, provincial, national and other laws, rules and regulations, and that the goods and services described
        on the event page are delivered as described and in an accurate satisfactory manner. The Organiser of a paid event
        selects the payment processing method for its event as more fully described in the Merchant Agreement.
      </Typography>
      <Typography variant="body1" paragraph>
        Consumers must use whatever payment processing method the Organiser selects. If the Organiser selects a payment
        processing method that uses a third party to process the payment, then neither OOSCCA nor any of its payment
        processing partners processes the transaction but we transmit the Consumer&apos;s payment details to the Organiser&apos;s
        designated payment provider.
      </Typography>
    </>
  );
}

function PrivacySection() {
  return (
    <>
      <Typography variant="h6">Privacy and Consumer Information</Typography>
      <Typography variant="body1" paragraph>
        We know your personal information is important to you and it is important to OOSCCA too. Information provided to OOSCCA by Users or
        collected by OOSCCA through OOSCCA Properties, is governed by our Privacy Policy. If you are an Organiser, you represent, warrant and
        agree that (a) you will at all times comply with all applicable local, state, provincial, national and other laws, rules and regulations
        with respect to information you collect from (or receive about) consumers, and (b) you will at all times comply with any applicable
        policies posted on the Services with respect to information you collect from (or receive about) consumers.
      </Typography>
    </>
  );
}

function TerminationSection() {
  return (
    <>
      <Typography variant="h6">Term; Termination</Typography>
      <Typography variant="body1" paragraph>
        These Terms apply to you as soon as you access the Services by any means and continue in effect until they are terminated.
        There may come a time where either you or OOSCCA decides it&apos;s best to part ways as described below. When that happens,
        these Terms will generally no longer apply. However, as described below, certain provisions will always remain applicable
        to both you and OOSCCA. OOSCCA may terminate your right to use the Services at any time;
      </Typography>
      <Typography variant="body1" paragraph>
        &bull; if you violate or breach these Terms;&bull; if you misuse or abuse the Services, or use the Services in a way not
        intended or permitted by OOSCCA; or&bull; if allowing you to access and use the Services would violate any applicable
        local, state, provincial, national and other laws, rules and regulations or would expose OOSCCA to legal liability.
      </Typography>
      <Typography variant="body1" paragraph>
        OOSCCA may choose to stop offering the Services, or any particular portion of the Service, or modify or replace any aspect
        of the Service, at any time. We will use reasonable efforts to provide you with notice of our termination of your access
        to the Services, where, in OOSCCA&apos;s sole discretion, failure to do so would materially prejudice you. You agree that
        OOSCCA will not be liable to you or any third-party as a result of its termination of your right to use or otherwise
        access the Services. Except to the extent you have agreed otherwise in a separate written agreement between you and
        OOSCCA, you may terminate your access to the Services and the general applicability of Terms by deleting your account.
      </Typography>
      <Typography variant="body1" paragraph>
        If you are a Consumer using the Services without a registered account, your only option for these Terms to no longer
        apply is to stop accessing the Services indefinitely. So long as you continue to access the Services, even without an
        account, these Terms remain in effect. If there is a separate agreement between you and OOSCCA governing your use of
        the Services and that agreement terminates or expires, these Terms (as unmodified by such agreement) will govern your
        use of the Services after such termination or expiration. All provisions of these Terms that by their nature should
        survive termination of these Terms will survive (including, without limitation, all limitations on liability, releases,
        indemnification obligations, disclaimers of warranties, agreements to arbitrate, choices of law and judicial forum and
        intellectual property protections and licences).
      </Typography>
    </>
  );
}

export default function TermsAndConditionsPage() {
  return (
    <Container maxWidth="md">
      <Box sx={{
        p: 4,
        my: 5,
      }}>
        <MainSection />
        <AcceptanceSection />
        <ServicesSection />
        <PrivacySection />
        <TerminationSection />
      </Box>
    </Container>
  );
}
