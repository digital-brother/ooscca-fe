"use client"

import Intro from "@/app/(homepage)/Intro";
import ClientSchools from "@/app/(homepage)/ClientSchools";
import HomepageTabs from "@/app/(homepage)/HomepageTabs";
import Benefits from "@/app/(homepage)/Benefits";
import SignUp from "@/app/(homepage)/SignUp";
import Demo from "@/app/(homepage)/Demo";
import Security from "@/app/(homepage)/Security";
import { useEffect, useContext } from 'react';
import { useRouter } from "next/navigation";
import { AuthTokenContext } from "@/app/layout";

export default function Homepage() {
  const router = useRouter();
  const { setAuthToken } = useContext(AuthTokenContext);

  useEffect(() => {
    if (setAuthToken) router.push("/booking") 
  }, [router, setAuthToken]);

  return (
    <>
      <Intro/>
      <ClientSchools/>
      <Demo/>
      <Security/>
      <Benefits/>
      {/* <HomepageTabs/> */}
      <SignUp/>
    </>
  )
}
