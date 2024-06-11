"use client";

import React from "react";
import { Box, Container, Typography } from "@mui/material";


export function PolicyContainer({ children, headerName, lastUpdated }) {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          p: 4,
          mt: 5,
          mb: 10,
        }}
      >
      <Box
        sx={{
          backgroundColor: "grey.200",
          textAlign: "center",
          mb: 4,
          p: 14,
          borderRadius: 4,
        }}
      >
        <Typography variant="h3"> {headerName} </Typography>
        <Typography variant="body1"> {lastUpdated} </Typography>
      </Box>
        {children}
      </Box>
    </Container>
  );
}

export function IntroductionSection() {
  return (
    <>
      <Typography variant="h6">1. INTRODUCTION</Typography>
      <Typography variant="body1" paragraph>
        1.1 OOSCCA Ltd (referred to hereinafter as &ldquo;OOSCCA&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;,
        &ldquo;us&rdquo;) is private limited company established in England &amp; Wales with a registered office at 259
        Sheepcot Lane, Watford, Hertfordshire, WD25 7DJ and registered company number 15566374
      </Typography>
      <Typography variant="body1" paragraph>
        1.2 OOSCCA provides:
      </Typography>
      <Typography variant="body1" paragraph>
        (a) an online marketplace (and any additional OOSCCA-owned or licensed technology which relates to the online
        marketplace) (the &ldquo;OOSCCA Platform&rdquo;), which allows parents, guardians and other individuals
        (&ldquo;Care Seekers&rdquo;, &ldquo;you&rdquo;, &ldquo;your&rdquo;) to instantly book, request to book (if not
        instantly available), reschedule, check the availability of certain clubs, classes, activities, childcare and
        services aimed at children and send enquiries relating to such activities and services (the
        &ldquo;Children&apos;s Activities&rdquo;, and providers of those activities shall be the
        &ldquo;Providers&rdquo;); and
      </Typography>
      <Typography variant="body1" paragraph>
        (b) services which relate to the OOSCCA Platform (the &ldquo;Services&rdquo;). Please note that our Services
        continue to grow and change. Please refer to the OOSCCA Platform for further information about the Services we
        provide.
      </Typography>
      <Typography variant="body1" paragraph>
        1.3 This agreement (&ldquo;OOSCCA Care Seeker EULA&rdquo;) constitutes the agreement between you and OOSCCA with
        regards to your use of the OOSCCA Platform and the Services, regardless of the manner in which you access or use
        the OOSCCA Platform and the Services.
      </Typography>
    </>
  );
}

export function AcceptingSection() {
  return (
    <>
      <Typography variant="h6">2. ACCEPTING THIS AGREEMENT</Typography>
      <Typography variant="body1" paragraph>
        2.1 Please read the terms of this OOSCCA Care Seeker EULA carefully. This OOSCCA Care Seeker EULA constitutes a
        written contract between you and OOSCCA and it affects your legal rights and obligations. Each time you access
        and/or use the OOSCCA Platform or Services, you agree to be bound by and to comply with this OOSCCA Care Seeker
        EULA. Do not use the OOSCCA Platform if you do not agree to all of the terms of this OOSCCA Care Seeker EULA.
      </Typography>
    </>
  );
}

export function PrivacySection() {
  return (
    <>
      <Typography variant="h6">3. PRIVACY</Typography>
      <Typography variant="body1" paragraph>
        3.1 We process information about you in accordance with our Privacy Policy. By using the OOSCCA Platform, you
        agree to such processing.
      </Typography>
    </>
  );
}

export function DescriptionSection() {
  return (
    <>
      <Typography variant="h6">4. DESCRIPTION OF SERVICES</Typography>
      <Typography variant="body1" paragraph>
        4.1 The OOSCCA Platform enables Care Seekers to book Children&apos;s Activities with certain Providers, view the
        dates and times of their confirmed Children&apos;s Activities bookings and cancel any requested or confirmed
        Children&apos;s Activities bookings on a booking interface. OOSCCA transmits booking requests made by a Care
        Seeker via the OOSCCA Platform to the relevant Provider, and the Provider may confirm or reject such booking in
        the Provider&apos;s sole discretion (which OOSCCA or the Provider will communicate to the Care Seeker, as set
        out in Section 4.2 below).
      </Typography>
      <Typography variant="body1" paragraph>
        4.2 Provider will communicate its decision regarding the requested booking to the relevant Care Seeker via the
        OOSCCA Platform, SMS (text) message (to the number which the Care Seeker provides to OOSCCA when creating their
        account on the OOSCCA Platform (&ldquo;Account&rdquo;)), or by another similar form of communication such as
        email and/or push notifications if applicable from time to time. In addition, Care Seekers will be able to view
        their requested, confirmed and cancelled bookings on the Account-specific calendar page on the OOSCCA Platform.
        The calendar page may also display additional information from the Provider in relation to a particular booking,
        such as the reason for any cancellation, at the sole discretion of the Provider.
      </Typography>
      <Typography variant="body1" paragraph>
        4.3 Should you have to cancel a confirmed booking made via the OOSCCA Platform, or request a refund in relation
        to a booking made via the OOSCCA Platform, you shall comply with the relevant Provider&apos;s cancellation
        policy, although the terms of such cancellation policy shall not take precedence over this OOSCCA Care Seeker
        EULA.
      </Typography>
    </>
  );
}

export function LimitationSection() {
  return (
    <>
      <Typography variant="h6">5. LIMITATIONS OF THE SERVICES</Typography>
      <Typography variant="body1" paragraph>
        5.1 OOSCCA does not introduce nor supply the Providers or Children&rsquo;s Activities to Care Seekers, nor do we
        select or propose specific Providers for or to Care Seekers. Rather, OOSCCA offers an online marketplace that
        among other things enables Care Seekers to book Children&rsquo;s Activities with their selected Provider and
        receive information about such bookings, and enables Providers to provide details of available Children&rsquo;s
        Activities to Care Seekers. Any agreement between you and a Provider regarding the provision of Children&rsquo;s
        Activities and payment for such Children&rsquo;s Activities is solely between you and the Provider in question,
        and OOSCCA is not a party to any such agreement.
      </Typography>
      <Typography variant="body1" paragraph>
        5.2 Through the OOSCCA Platform, Providers may post the following information (as applicable): room names,
        capacity, staff ratio, the services they provide; the availability of places at their facility; information
        relating to the child to whom the Children&rsquo;s Activity booking relates; the eligibility or qualification of
        the Providers (including their personnel) to provide such services; pictures of their premises; prices and
        payment terms; information on availability of the Children&rsquo;s Activity; terms relating to booking and
        cancellation; any other commercial terms which are to form part of the agreement entered into between Provider
        and Care Seeker (&ldquo;Supply Agreement&rdquo;); certain categories of personal data, as described in the
        OOSCCA DPA; and any other related information].
      </Typography>
      <Typography variant="body1" paragraph>
        5.3 Care Seekers may submit certain information to the OOSCCA Platform in the course of using the OOSCCA
        Platform, including certain categories of personal data described in the OOSCCA DPA.
      </Typography>
      <Typography variant="body1" paragraph>
        5.4 Any information made available on the OOSCCA Platform or through the Services, but not directly by OOSCCA,
        is the information of the relevant user and such user is solely responsible for such information. OOSCCA does
        not: (i) guarantee or verify the accuracy, completeness, or usefulness of any information on the OOSCCA Platform
        or available through the Services or any other venue, or (ii) adopt, endorse or accept responsibility for the
        accuracy or reliability of any opinion, advice, or statement made by any party that appears on the OOSCCA
        Platform or through the Services or any other venue. In particular, we do not verify the authenticity or
        completeness of any qualification which any Provider may claim to have. To the extent permitted by applicable
        law, under no circumstances will OOSCCA (or any of its officers, directors, investors, subsidiaries, agents,
        assignees, representatives, advertisers, marketing partners, licensors, independent contractors, recruiters,
        corporate partners, resellers, or employees, hereinafter &ldquo;Affiliates&rdquo;) be responsible for any loss
        or damage resulting from your reliance on information or other content posted on the OOSCCA Platform or
        transmitted to or by any user of the OOSCCA Platform or Service or any other venue.
      </Typography>
      <Typography variant="body1" paragraph>
        5.5 Further, we do not have control over the quality, timing, or legality of the services actually delivered by
        any Provider. Regardless of any other provision of this OOSCCA Care Seeker EULA, we do not make any warranty or
        representations about the suitability, reliability, timeliness, or accuracy of the services provided by any
        Provider and accept no liability in that regard. In particular, we have no control over any Provider&rsquo;s
        decision to cancel a confirmed booking and, regardless of any other provision of this OOSCCA Care Seeker EULA,
        we do not take any responsibility for such decisions or make any warranty or representations regarding the
        reliability of a confirmed booking.
      </Typography>
      <Typography variant="body1" paragraph>
        5.6 OOSCCA is not responsible for the conduct, whether online or offline, of any user of the OOSCCA Platform or
        the Services. Regardless of any other provision of this OOSCCA Care Seeker EULA, OOSCCA does not make any
        warranty or representation regarding the integrity, responsibility or actions of any Provider, whether in
        public, private or offline interactions, and expressly disclaims any liability that may result from such
        actions.
      </Typography>
    </>
  );
}

export function UserResponsibilitiesSection() {
  return (
    <>
      <Typography variant="h6">6. USER RESPONSIBILITIES</Typography>
      <Typography variant="body1" paragraph>
        6.1 As OOSCCA does not verify the identity or any information provided by Providers or other Care Seekers (as
        noted above in Section 5), including any feedback or ratings submitted by other Care Seekers in relation to the
        Providers. Care Seekers are solely responsible for selecting an appropriate Provider for themselves.
      </Typography>
      <Typography variant="body1" paragraph>
        6.2 Whilst the OOSCCA Platform may contain information concerning the searches, qualifications, standards or
        checks undertaken by Providers (including registration with Ofsted, Ofsted ratings, valid DBS/PVG checks, first
        aid qualifications and applicable local authority searches) (the &ldquo;Provider Credentials&rdquo;), the
        Provider Credentials have not been verified independently by OOSCCA, and therefore OOSCCA recommends that you
        independently undertake separate verification in order to rely upon the Provider Credentials. To the extent
        permitted by applicable law, OOSCCA shall not be liable if you rely upon the Provider Credentials which are
        subsequently found to be untrue, inaccurate or invalid.
      </Typography>
      <Typography variant="body1" paragraph>
        6.3 Where you have procured Children&rsquo;s Activities from a Provider, to be delivered at a location which:
      </Typography>
      <Typography variant="body1" paragraph>
        (a) is not the Provider&rsquo;s own residence or premises; and
      </Typography>
      <Typography variant="body1" paragraph>
        (b) has been chosen by yourself,
      </Typography>
      <Typography variant="body1" paragraph>
        (including without limitation when the Provider is a babysitter or nanny who is delivering Children&rsquo;s
        Activities at your place of residence or your holiday accommodation) (&ldquo;Care Seeker Premises&rdquo;), you
        acknowledge that you are responsible for the safety and wellbeing of the Provider when they are providing
        Children&rsquo;s Activities at the Care Seeker Premises, and must provide a clean, safe and appropriate
        environment to enable the Provider to deliver the Children&rsquo;s Activities in accordance with the Supply
        Agreement.
      </Typography>
      <Typography variant="body1" paragraph>
        6.4 If you require a Provider, from whom you intend to book Children&rsquo;s Activities, to have certain
        qualifications, or to have completed certain checks or searches, this should be communicated to the Provider
        when you request a Children&rsquo;s Activities booking from them.
      </Typography>
      <Typography variant="body1" paragraph>
        6.5 When interacting with Providers (including their personnel), whether in-person or via the OOSCCA Platform,
        you must treat them with respect, courtesy and politeness.
      </Typography>
    </>
  );
}

export function AccountSection() {
  return (
    <>
      <Typography variant="h6">7. YOUR ACCOUNT</Typography>
      <Typography variant="body1" paragraph>
        7.1 Creating your Account. To create an account, Care Seekers must provide their mobile phone number, email
        address and create a unique password, which they will then use to log in to the OOSCCA Platform (&quot;User
        ID&quot;). When creating an Account, each Care Seeker agrees to: (i) provide true, accurate, current and
        complete information as requested (together with User ID, the &quot;Account Information&quot;) and (ii) promptly
        maintain and update such Account Information (as applicable) to keep it true, accurate, current and complete at
        all times. If the Account Information you provided is untrue, inaccurate, misleading or outdated, we have the
        right to suspend or terminate your access to, or use of, your Account immediately with or without notice.
      </Typography>
      <Typography variant="body1" paragraph>
        7.2 You shall be solely responsible for your Accounti.
      </Typography>
      <Typography variant="body1" paragraph>
        (a) You, as the creator of your Account and Account Information, are solely responsible for your Account and
        Account Information. You are not permitted to upload offensive or obscene information to, or using your Account,
        as determined by us in our sole discretion. If an Account violates any part of this OOSCCA Care Seeker EULA, we
        may immediately, temporarily, or permanently ban such an Account or change the Account Information associated
        with such Account, with or without notice.
      </Typography>
      <Typography variant="body1" paragraph>
        (b) Please note that you are responsible for maintaining the confidentiality and security of your Account and
        password at all times, and you agree to notify us if your password is lost, stolen, or disclosed to an
        unauthorised third party, or otherwise may have been compromised. To the maximum extent permitted by applicable
        law, you will be deemed as the person who uses the Account, and any acts made by the Account will be deemed as
        your acts. You are solely responsible for all activities and transactions that occur under your Account no
        matter who actually uses the Account, and we are not responsible for any misuse or use of your Account,
        including without limitation in the event that your password is stolen or revealed to a third party and/or used
        for transactions. You agree to immediately notify us of any misuse of your Account or any other breach of
        security in relation to your use of the OOSCCA Platform that is known to you. You agree to accept all risks of
        misuse of and unauthorised access to your Account and to hold us and our affiliates harmless from and against
        any misuse of your Account or your Account Information, including, but not limited to, improper or unauthorised
        use by someone to whom you revealed your password.
      </Typography>
      <Typography variant="body1" paragraph>
        7.3 Retrieving your Account. If you request to retrieve your Account when your access to the OOSCCA Platform is
        denied due to the loss of Account Information or forgotten password, you are required to provide certain
        information according to the account retrieval process which we in our sole discretion implement on the OOSCCA
        Platform, and to ensure that all such information is legitimate, truthful and valid. Your Account may not be
        retrieved if the information or documentation provided by you fails our security verification, and you are
        solely liable for any and all risks and losses arising therefrom.
      </Typography>
    </>
  );
}

export function ProviderServicesPaymentSection() {
  return (
    <>
      <Typography variant="h6">8. PROVIDER SERVICES AND PAYMENT</Typography>
      <Typography variant="body1" paragraph>
        8.1 These terms apply where you make use of any Services intended to facilitate engagement between Providers and
        Care Seekers, which are made available to you by us through or in connection with use of the OOSCCA Platform.
        This Section explains the steps involved when a Care Seeker and Provider enter into a Supply Agreement through
        the OOSCCA Platform. A Supply Agreement is a contract between a Provider and a Care Seeker for the supply of
        goods and/or services by the Provider and the purchase of those goods and/or services by the Care Seeker.
      </Typography>
      <Typography variant="body1" paragraph>
        8.2 Listings by Providers are invitations for a Care Seeker to procure those goods and services, where that
        order may be accepted by the relevant Provider, in which case a Supply Agreement will arise between the Care
        Seeker and Provider incorporating the description and price of the goods and services, as listed on the OOSCCA
        Platform.
      </Typography>
      <Typography variant="body1" paragraph>
        8.3 The Supply Agreement shall also incorporate any of the Provider&apos;s own terms and policies as notified by
        a Provider (including via OOSCCA or the OOSCCA Platform) to a Care Seeker from time to time (&quot;Provider
        Documentation&quot;), where the Care Seeker&apos;s order on the OOSCCA Platform with the relevant Provider has
        been accepted by that Provider. Care Seekers agree to be bound by, and to comply with, any of the Provider
        Documentation once its order has been accepted by that Provider.
      </Typography>
      <Typography variant="body1" paragraph>
        8.4 To the extent that any other terms of the Supply Agreement are inconsistent with this OOSCCA Care Seeker
        EULA, the following order of precedence shall apply: (i) this OOSCCA Care Seeker EULA; (ii) other terms agreed
        between Care Seeker and Provider as part of the Supply Agreement (excluding the Provider Documentation); and
        (iii) the Provider Documentation.
      </Typography>
      <Typography variant="body1" paragraph>
        8.5 You shall enter all Supply Agreements, and pay any monies due to Providers, through the OOSCCA Platform. The
        payment terms may provide that a deposit or other parts of the payment are to be paid immediately and/or that
        the whole or the balance of the payment is due to be paid to the Provider at a later date.
      </Typography>
      <Typography variant="body1" paragraph>
        8.6 Fees apply to transactions made through the OOSCCA Platform (&quot;Transaction Fees&quot;). Any Transaction
        Fees (if any) due from you will be indicated to you through the OOSCCA Platform or otherwise by us at or before
        the time you enter into any transaction through the OOSCCA Platform.
      </Typography>
      <Typography variant="body1" paragraph>
        8.7 Transaction Fees are subject to change at any time, by written notice from us provided that no such changes
        shall apply to any existing Supply Agreements.
      </Typography>
      <Typography variant="body1" paragraph>
        8.8 You shall not take any steps to circumvent your payment obligations to the Providers or OOSCCA under this
        OOSCCA Care Seeker EULA or in relation to the OOSCCA Platform (including without limitation where you are
        procuring Children&apos;s Activities from a Provider outside of the OOSCCA Platform, having been introduced to
        that Provider via the OOSCCA Platform). Breach of this Section shall result in immediate termination of this
        OOSCCA Care Seeker EULA and access to the OOSCCA Platform.
      </Typography>
    </>
  );
}

export function PlatformSection() {
  return (
    <>
      <Typography variant="h6">9. YOUR USE OF THE OOSCCA PLATFORM</Typography>
      <Typography variant="body1" paragraph>
        9.1 Access to and use of the OOSCCA Platform. You are responsible for making all arrangements necessary for you
        to have access to the OOSCCA Platform. You are also responsible for ensuring that all persons who access the
        OOSCCA Platform through your internet connection or your Account are aware of this OOSCCA Care Seeker EULA, and
        that they comply with this OOSCCA Care Seeker EULA. You are responsible for providing accurate, current and
        complete information whenever accessing or uploading information to the OOSCCA Platform and your Account,
        including without limitation in connection with any booking offered or made (as appropriate) using the OOSCCA
        Platform.
      </Typography>
      <Typography variant="body1" paragraph>
        9.2 Licence grant to user. Subject to your compliance with this OOSCCA Care Seeker EULA, OOSCCA hereby grants to
        you a worldwide, revocable (in the circumstances set out in this OOSCCA Care Seeker EULA), royalty-free,
        non-assignable, non-sub-licensable, non-transferrable, and non-exclusive licence to use the OOSCCA Platform (the
        &quot;OOSCCA Platform Licence&quot;). The OOSCCA Platform Licence is granted to you for the sole purpose of
        enabling you to use and enjoy the OOSCCA Platform and the Services in accordance with this OOSCCA Care Seeker
        EULA. As set forth below, the OOSCCA Platform Licence does not provide you with title to or ownership of the
        OOSCCA Platform (or any component thereof or rights therein), but only a limited licence to use the OOSCCA
        Platform in accordance with this OOSCCA Care Seeker EULA and subject to the use restrictions described herein.
      </Typography>
      <Typography variant="body1" paragraph>
        9.3 Licence grant by user. You have the right, and hereby grant to OOSCCA, its Affiliates, licensees and
        successors, an irrevocable, perpetual, non-exclusive, fully paid, worldwide licence to use, copy, perform,
        display, reproduce, adapt, modify and distribute any information, images, videos, materials and content
        (&quot;Care Seeker Materials&quot;) uploaded by you to the OOSCCA Platform and to prepare derivative works of,
        or incorporate into other works, such Care Seeker Materials, and to grant and authorise sublicenses of the
        foregoing. You further represent and warrant that use of such Care Seeker Materials by OOSCCA will not infringe
        or violate the rights of any third party.
      </Typography>
      <Typography variant="body1" paragraph>
        9.4 Acceptable use restrictions. Your use of the OOSCCA Platform and the Services is subject to this OOSCCA Care
        Seeker EULA and applicable laws and regulations. You shall not:
      </Typography>
      <Typography variant="body1" paragraph>
        (a) use the OOSCCA Platform and the Services if you are not fully able and legally competent to agree to this
        OOSCCA Care Seeker EULA;
      </Typography>
      <Typography variant="body1" paragraph>
        (b) use the OOSCCA Platform and the Services unless in compliance with applicable laws and this OOSCCA Care
        Seeker EULA;
      </Typography>
      <Typography variant="body1" paragraph>
        &copy; hack (or attempt to hack), modify, translate, adapt, disassemble, decompile, reverse engineer, or create
        any derivative works based on the OOSCCA Platform (or any portion thereof), including any files, documentation
        or tables or determine or attempt to determine any source code, methods, techniques or algorithms embodied in
        the OOSCCA Platform or any derivative works thereof;
      </Typography>
      <Typography variant="body1" paragraph>
        (d) modify, adapt, import, copy, make derivative works of, distribute, transmit, publicly display, sublicense,
        sell, assign, lease, lend, rent, offer for sale or otherwise commercially exploit the OOSCCA Platform or any
        content made available on or from the OOSCCA Platform;
      </Typography>
      <Typography variant="body1" paragraph>
        (e) remove, disable, modify, add to or tamper with any program code or data, copyright, trade mark or other
        proprietary notices and legends contained on or in the OOSCCA Platform;
      </Typography>
      <Typography variant="body1" paragraph>
        (f) infringe our intellectual property rights or those of any third party in relation to your use of the OOSCCA
        Platform or create software which mimics any data or functionality in the OOSCCA Platform;
      </Typography>
      <Typography variant="body1" paragraph>
        (g) make the OOSCCA Platform or any part of it available to any third party (aside from fairly and honestly
        providing links to the OOSCCA Platform or showing it to other people) or otherwise display, publish, copy,
        print, post or otherwise use the OOSCCA Platform and the information contained therein for the benefit of any
        third party or website;
      </Typography>
      <Typography variant="body1" paragraph>
        (h) in any way conduct yourself in a manner which is unlawful, gives rise to civil or criminal liability or
        might call us or the OOSCCA Platform into disrepute, or otherwise use the OOSCCA Platform or any part of it
        unfairly or for any illegal or immoral purpose;
      </Typography>
      <Typography variant="body1" paragraph>
        (i) market, lease or rent the OOSCCA Platform (or any part thereof) for a fee or charge, or use the OOSCCA
        Platform to advertise or perform any commercial solicitation;
      </Typography>
      <Typography variant="body1" paragraph>
        (j) interfere with or attempt to interfere with the proper functioning of the OOSCCA Platform (or any part
        thereof), disrupt any networks connected to the OOSCCA Platform (or any part thereof), or bypass any measures we
        use or may use to prevent or restrict access to the OOSCCA Platform (or any part thereof);
      </Typography>
      <Typography variant="body1" paragraph>
        (k) use automated scripts to collect information from or interact with the OOSCCA Platform (or any part thereof)
        in any way;
      </Typography>
      <Typography variant="body1" paragraph>
        (l) impersonate any person or entity, or falsely state or otherwise misrepresent you or your affiliation with
        any person or entity, including giving the impression that any content you upload, post, transmit, distribute or
        otherwise make available emanates from us or the OOSCCA Platform;
      </Typography>
      <Typography variant="body1" paragraph>
        (m) use the OOSCCA Platform (or any part thereof) and the Services in a manner that may create a conflict of
        interest or undermine the purposes of the OOSCCA Platform and the Services;
      </Typography>
      <Typography variant="body1" paragraph>
        (n) collect or harvest any information or data from the OOSCCA Platform or our systems or attempt to decipher
        any transmissions to or from the servers; or
      </Typography>
      <Typography variant="body1" paragraph>
        (o) use the OOSCCA Platform (or any part thereof) to upload, transmit, distribute, store or otherwise make
        available in any way:
      </Typography>
      <Typography variant="body1" paragraph>
        (i) files that contain viruses or other material that is malicious or harmful;
      </Typography>
      <Typography variant="body1" paragraph>
        (ii) defamatory, obscene, offensive, hateful or inflammatory material;
      </Typography>
      <Typography variant="body1" paragraph>
        (iii) any content that would constitute or encourage a criminal offence; or
      </Typography>
      <Typography variant="body1" paragraph>
        (iv) content that, in the sole judgment of OOSCCA, is objectionable or which restricts or inhibits any other
        person from using the OOSCCA Platform, or which may expose us or our users to any harm or liability of any type.
      </Typography>
      <Typography variant="body1" paragraph>
        9.5 You understand, acknowledge, and agree that any violation of the foregoing provisions may in our sole
        discretion and judgment lead us to terminate our business relationship with you and/or may subject you to
        criminal liability and/or liability for damages, costs, expenses, or fees (including attorney&apos;s fees)
        incurred by OOSCCA in enforcing its rights against you under this OOSCCA Care Seeker EULA.
      </Typography>
    </>
  );
}

export function AvailabilitySection() {
  return (
    <>
      <Typography variant="h6">10. UPDATES TO THE OOSCCA PLATFORM; AVAILABILITY</Typography>
      <Typography variant="body1" paragraph>
        10.1 We aim to update the OOSCCA Platform regularly, and may change the content at any time. We reserve the
        right to terminate or suspend your Account (including for, but not limited to, the reasons described at Sections
        7 and 8 above), suspend access to the OOSCCA Platform, modify, adapt or update any service or content provided
        on the OOSCCA Platform, or close the OOSCCA Platform indefinitely, for any reason. We (or the Providers) may
        remove material from the OOSCCA Platform at our own discretion and without giving any notice. We do not promise
        to ensure that the OOSCCA Platform remains available or that the information and materials on the OOSCCA
        Platform are kept up to date.
      </Typography>
      <Typography variant="body1" paragraph>
        10.2 As part of the OOSCCA Platform, you may be permitted to download certain digital content such as (without
        limitation) information about Providers, available Children&apos;s Activities from Providers and information
        about the dates and times of your accepted bookings (&quot;OOSCCA Information&quot;). We reserve the right, with
        or without prior notice and in our sole and complete discretion, to discontinue, modify, or limit the available
        quantity of any &quot;OOSCCA Information&quot; or to limit or prohibit their download or use.
      </Typography>
    </>
  );
}

export function LinkingSection() {
  return (
    <>
      <Typography variant="h6">11. LINKING</Typography>
      <Typography variant="body1" paragraph>
        11.1 Linking to third party sites. The OOSCCA Platform may provide links to other websites operated by the
        Providers or third parties who are not related to, affiliated with or endorsed by OOSCCA. These links are
        provided for your information only. Provider and third party platforms are not governed by this OOSCCA Care
        Seeker EULA but by other agreements or policies that may differ from this OOSCCA Care Seeker EULA. In visiting
        any Provider or third party platforms, whether linked to on the OOSCCA Platform or otherwise, you do so at your
        own risk and you assume all responsibility in that regard. We make no representations or warranties regarding,
        and do not endorse, any Provider or third party platforms or any content in such platforms. We encourage you to
        review the terms of use of each Provider or third party platform visited before using those platforms.
      </Typography>
      <Typography variant="body1" paragraph>
        11.2 Linking to the OOSCCA Platform. You may link to the OOSCCA Platform, provided you do so in a way that is
        fair and legal, is non-deceptive and does not damage our reputation or take advantage of it. You must not
        establish a link in such a way as to suggest any form of association, approval or endorsement on our part where
        none exists. You must not establish a link to the OOSCCA Platform in any website that is not owned by you. The
        OOSCCA Platform must not be framed on any other website, nor may you create a link to any part of the OOSCCA
        Platform other than the home page. We reserve the right to withdraw linking permission without notice.
      </Typography>
    </>
  );
}

export function TerminationSection() {
  return (
    <>
      <Typography variant="h6">12. TERMINATION</Typography>
      <Typography variant="body1" paragraph>
        12.1 If you have violated any term of this OOSCCA Care Seeker EULA, OOSCCA reserves the right, at its sole
        discretion, to immediately suspend or terminate your access to all or part of the OOSCCA Platform and to suspend
        or terminate your Account, with or without notice.
      </Typography>
      <Typography variant="body1" paragraph>
        12.2 In any event, OOSCCA also reserves the right, in its sole discretion, to terminate your access to all or
        part of the OOSCCA Platform, and/or terminate your Account and/or any content posted by or about you, from the
        OOSCCA Platform, for any reason or no reason, with or without notice. If we terminate your Account, we have no
        obligation to notify you of the reason, if any, for your termination.
      </Typography>
      <Typography variant="body1" paragraph>
        12.3 If your Account is suspected to be involved in illegal or improper activities (such as being hacked), you
        shall cooperate with (e.g., answer the questions truthfully) the relevant personnel designated by us to solve
        the issue. You further acknowledge and agree that, if we determine that your Account is involved in any improper
        or illegal acts, we have the right to suspend or terminate your access to the Account and take remedial
        measures. You also acknowledge and agree that we are not obligated to provide you with evidence relating to the
        suspected improper or illegal acts of your Account.
      </Typography>
      <Typography variant="body1" paragraph>
        12.4 In the event that your access to all or part of the OOSCCA Platform is terminated, any benefits or
        incentives provided by OOSCCA to you, in relation to the OOSCCA Platform, will no longer be valid.
      </Typography>
    </>
  );
}

export function IntellectualPropertyRightsSection() {
  return (
    <>
      <Typography variant="h6">13. INTELLECTUAL PROPERTY RIGHTS</Typography>
      <Typography variant="body1" paragraph>
        13.1 You acknowledge and agree that all copyright, trademarks and other intellectual property rights in the
        OOSCCA Platform content, software and all HTML and other code contained in the OOSCCA Platform shall remain at
        all times vested in OOSCCA and/or its licensors and is protected by copyright and intellectual property and
        other laws. All intellectual property rights are reserved.
      </Typography>
      <Typography variant="body1" paragraph>
        13.2 The OOSCCA Platform and its contents are copyright-protected material and the copyright is owned by OOSCCA
        unless stated otherwise. Without limiting the foregoing, copying the above listed materials to any other server
        or location for publication, reproduction or distribution is expressly prohibited. Generally speaking,
        trademarks appearing on the OOSCCA Platform are either owned by OOSCCA or OOSCCA has obtained limited permission
        from the trademark owner to use the trademark on the OOSCCA Platform. Any other third party trademarks remain
        the property of their respective owners. &quot;OOSCCA&quot; is a registered trademark of OOSCCA. You are not
        permitted to use this registered trademark without our approval.
      </Typography>
      <Typography variant="body1" paragraph>
        13.3 If you wish to obtain permission to make use of any of the copyrights, trademarks or other rights or
        material that may be displayed on the OOSCCA Platform from time to time, please contact us at
        support@bookOOSCCA.co.uk. OOSCCA shall not be responsible for seeking any additional authorisation required for
        third party use of any trademark not owned by or licensed to OOSCCA for such use.
      </Typography>
      <Typography variant="body1" paragraph>
        13.4 Your unauthorised use of intellectual property rights owned by OOSCCA or its licensors may violate
        copyright, trademark, privacy, publicity, communications, and other laws which may result in personal liability
        for you, as well as potential criminal liability.
      </Typography>
    </>
  );
}

export function ReleaseOfLiabilitySection() {
  return (
    <>
      <Typography variant="h6">14. RELEASE OF LIABILITY FOR USER CONDUCT AND DISPUTES</Typography>
      <Typography variant="body1" paragraph>
        14.1 Any issues or disputes between Care Seeker and Provider should be resolved directly between Care Seeker and
        Provider; such as disputes relating to cancellations and the Provider&rsquo;s cancellation policy; or concerning
        the conduct of a Provider, including (without limitation) the services received by the Care Seeker or the
        accuracy of information uploaded by any Provider.
      </Typography>
      <Typography variant="body1" paragraph>
        14.2 OOSCCA will not be held responsible and expressly disclaims any liability whatsoever for any claims,
        demands or damages direct or indirect of every kind and nature, known and unknown, suspected and unsuspected,
        disclosed and undisclosed, arising out of or in any way connected with such issues. By using this OOSCCA
        Platform and/or the Services, you do hereby represent, understand, and expressly agree to be responsible for and
        hold OOSCCA harmless for any claim or controversy that may arise from any disputes between you and any other
        user(s) of the OOSCCA Platform. OOSCCA will use its reasonable efforts to monitor usage of the OOSCCA Platform
        by Providers and Care Seekers and suspend privileges to any user not adhering to this OOSCCA Care Seeker EULA.
        You agree to take reasonable precautions in all interactions with other users of the OOSCCA Platform or the
        Services, particularly if you meet offline or in person.
      </Typography>
      <Typography variant="body1" paragraph>
        14.3 By using the OOSCCA Platform or the Services, you do hereby agree to report any alleged improprieties of
        any users therein to OOSCCA immediately by notifying OOSCCA of the same via electronic correspondence at
        support@bookOOSCCA.co.uk.
      </Typography>
    </>
  );
}

export function DisclaimersSection() {
  return (
    <>
      <Typography variant="h6">15. DISCLAIMERS; LIMITATION OF LIABILITY</Typography>
      <Typography variant="body1" paragraph>
        15.1 You accept that the OOSCCA Platform is offered on an &ldquo;as-is&rdquo; and &ldquo;as available&rdquo;
        basis. To the fullest extent permitted under applicable law, OOSCCA and its Affiliates disclaim all warranties,
        express or implied (whether by statute, common law or the law of equity), including without limitation implied
        warranties of merchantability, fitness for a particular purpose, performance or suitability for your intended
        use, title and non-infringement as to the OOSCCA Platform, including all information, content and materials
        contained therein. OOSCCA takes every reasonable precaution and care in relation to the OOSCCA Platform but we
        do not warrant that the provision of the OOSCCA Platform or material displayed on it will meet your
        requirements, be uninterrupted, timely, secure or error-free, that defects will be corrected or that this OOSCCA
        Platform is free of software viruses or bugs or other defects. To the maximum extent permitted by law, and
        subject to Section 15.3, OOSCCA disclaims any liability for any perceived false, misleading, incomplete,
        inaccurate, or otherwise defective content or misstatements or misrepresentations made by any users of the
        OOSCCA Platform or any other venue. You hereby represent, understand and agree to hold OOSCCA and its Affiliates
        harmless for any misstatements and/or misrepresentations made by or on behalf of you on this OOSCCA Platform or
        in any other venue. Content is provided for informational purposes only, and OOSCCA is not responsible for any
        reliance upon or use of the content by you or other users, or by any third party, which is accessed at your own
        discretion and risk.
      </Typography>
      <Typography variant="body1" paragraph>
        15.2 All Care Seekers hereby expressly agree not to hold OOSCCA or its Affiliates liable for the actions or
        omissions of any Provider or Care Seeker or for any information, instruction, or advice which originated or
        services that were arranged through the OOSCCA Platform. To the maximum extent permissible under applicable law,
        each Care Seeker hereby irrevocably waives any right they may have to bring a claim against OOSCCA and OOSCCA
        and its Affiliates expressly disclaim any liability whatsoever for any damage, suits, claims, and/or disputes
        that have arisen or may arise, whether known or unknown, therefrom.
      </Typography>
      <Typography variant="body1" paragraph>
        15.3 Subject to Section 15.1, we accept no liability for any loss of income or revenue, loss of business, loss
        of profits or contracts, loss of anticipated savings, loss of data, waste of management or office time (in each
        case whether direct or indirect) or for any indirect or consequential loss or damage of any kind however arising
        and whether caused by tort (including negligence), breach of contract or otherwise, even if foreseeable. To the
        extent permitted by applicable law, our total aggregate liability to you for all and any damages, losses or
        causes of action arising, by reason of or in connection with your use of OOSCCA Platform (whether contractual,
        tortious or otherwise), shall be limited to &pound;150.00 (one hundred and fifty pounds).
      </Typography>
      <Typography variant="body1" paragraph>
        15.4 Nothing in this OOSCCA Care Seeker EULA limits or excludes our liability: (i) for death or personal injury
        caused by our negligence; (ii) for fraud or fraudulent misrepresentation; or (iii) in any way that is not
        permitted under applicable law.
      </Typography>
      <Typography variant="body1" paragraph>
        15.5 You agree that where a breach of this OOSCCA Care Seeker EULA will cause irreparable injury to OOSCCA for
        which monetary damages would not be an adequate remedy and OOSCCA shall be entitled to equitable relief in
        addition to any remedies it may have hereunder or at law without a bond, other security or proof of damages.
      </Typography>
    </>
  );
}

export function GoverningLawSection() {
  return (
    <>
      <Typography variant="h6">16. GOVERNING LAW AND JURISDICTION</Typography>
      <Typography variant="body1" paragraph>
        16.1 This OOSCCA Care Seeker EULA, and any non-contractual obligations arising from it or in relation to it,
        shall be governed by and construed in accordance with the laws of England.
      </Typography>
      <Typography variant="body1" paragraph>
        16.2 You and OOSCCA agree that the courts of England will have exclusive jurisdiction in relation to any claims
        arising out of or in relation to this agreement.
      </Typography>
    </>
  );
}

export function GeneralProvisionsSection() {
  return (
    <>
      <Typography variant="h6">17. GENERAL PROVISIONS</Typography>
      <Typography variant="body1" paragraph>
        17.1 Variation. OOSCCA reserves the right to amend this OOSCCA Care Seeker EULA at any time. Any changes we make
        to this OOSCCA Care Seeker EULA will be posted on this page and where appropriate, notified to you by e-mail. We
        recommend that you review this OOSCCA Care Seeker EULA from time to time as any changes we make will be binding
        on you.
      </Typography>
      <Typography variant="body1" paragraph>
        17.2 Severability. If any provision in this OOSCCA Care Seeker EULA is ruled invalid, unlawful, void or
        unenforceable by a court of competent jurisdiction, that provision will be removed from this OOSCCA Care Seeker
        EULA without it affecting the rest of the OOSCCA Care Seeker EULA and the remaining provisions of this OOSCCA
        Care Seeker EULA will continue to be valid and enforceable.
      </Typography>
      <Typography variant="body1" paragraph>
        17.3 Security. We do not guarantee that the OOSCCA Platform will be secure or free from bugs or viruses. You are
        responsible for configuring your information technology, computer program and platform to access the OOSCCA
        Platform. You should use your own virus protection software.
      </Typography>
      <Typography variant="body1" paragraph>
        17.4 No Waiver. No failure or delay by you or OOSCCA in exercising any rights or remedies under this OOSCCA Care
        Seeker EULA will operate as a waiver of that or any other right or remedy.
      </Typography>
      <Typography variant="body1" paragraph>
        17.5 No Partnership or Joint Venture. This OOSCCA Care Seeker EULA shall not be construed as creating a
        partnership, joint venture, franchise or agency relationship between you and OOSCCA.
      </Typography>
      <Typography variant="body1" paragraph>
        17.6 Entire Agreement. This OOSCCA Care Seeker EULA constitutes the whole legal agreement between you and OOSCCA
        and govern your use of the OOSCCA Platform and completely replaces any prior agreements between you and OOSCCA
        in relation to the OOSCCA Platform.
      </Typography>
      <Typography variant="body1" paragraph>
        17.7 Third Parties. This OOSCCA Care Seeker EULA does not confer any rights on any person or party (other than
        the parties to this OOSCCA Care Seeker EULA and (where applicable) their successors and permitted assigns)
        pursuant to the Contracts (Rights of Third Parties) Act 1999.
      </Typography>
      <Typography variant="body1" paragraph>
        17.8 No Assignment. You will not assign, transfer, charge, sub-contract or deal in any other manner with all or
        any of your rights or obligations under this OOSCCA Care Seeker EULA, without the prior written consent of
        OOSCCA.
      </Typography>
    </>
  );
}

export default function TermsAndConditionsPage() {
  return (
    <PolicyContainer headerName="PARENTS - TERMS OF USE" lastUpdated="Last updated: April 21 2024">
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
