"use client"

import Intro from "@/app/(homepage)/Intro";
import ClientSchools from "@/app/(homepage)/ClientSchools";
import HomepageTabs from "@/app/(homepage)/HomepageTabs";
import Benefits from "@/app/(homepage)/Benefits";
import SignUp from "@/app/(homepage)/SignUp";
import Demo from "@/app/(homepage)/Demo";
import Security from "@/app/(homepage)/Security";
import { useState, useEffect } from "react";
import { AUTH_TOKEN_KEY } from "@/app/api.mjs";

export default function Homepage() {
  const [authToken, setAuthToken] = useState(null);
  useEffect(() => {
    setAuthToken(localStorage.getItem(AUTH_TOKEN_KEY));
  }, []);
  
  return (
    <>
      <Intro/>
      <ClientSchools/>
      <Demo/>
      <Security/>
      <Benefits/>
      <HomepageTabs/>
      { !authToken && <SignUp/> }
    </>
  )
}
