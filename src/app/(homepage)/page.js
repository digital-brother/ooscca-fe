"use client"

import Intro from "@/app/(homepage)/Intro";
import ClientSchools from "@/app/(homepage)/ClientSchools";
import HomepageTabs from "@/app/(homepage)/HomepageTabs";
import Benefits from "@/app/(homepage)/Benefits";
import HomePageSignUp from "@/app/(homepage)/SignUp";
import HomepageDemo from "@/app/(homepage)/Demo";
import Security from "@/app/(homepage)/Security";


export default function Homepage() {
  return (
    <>
      <Intro/>
      <ClientSchools/>
      <HomepageDemo/>
      <Security/>
      <Benefits/>
      <HomepageTabs/>
      <HomePageSignUp/>
    </>
  )
}
