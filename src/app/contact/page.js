"use client";
import { Container, Typography } from "@mui/material";
import Link from "@/app/(homepage)/components/Link";
import { OssContainer } from "@/components/OosContainer";

export default function Contact() {
  return (
    <Container sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", py: 10 }}>
      <OssContainer sx={{ textAlign: "center", border: 1, borderRadius: 1.5, pb: 15 }}>
        <Typography variant="h5" sx={{ mt: 10 }}>
            Contact us
        </Typography>
        <Typography sx={{ mt: 1.5 }}>
            We&apos;re in beta so you&apos;ll likely come across some glitches. We&apos;d love to hear from you with any questions or suggestions, so give us a holla at the <Link href="mailto:team@ooscca.com">team@ooscca.com</Link>.
        </Typography>
      </OssContainer>
    </Container>
  );
}
