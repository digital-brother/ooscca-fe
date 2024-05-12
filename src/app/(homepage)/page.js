"use client"

import Intro from "@/app/(homepage)/Intro";
import ClientSchools from "@/app/(homepage)/ClientSchools";
import HomepageTabs from "@/app/(homepage)/HomepageTabs";
import Benefits from "@/app/(homepage)/Benefits";
import SignUp from "@/app/(homepage)/SignUp";
import Demo from "@/app/(homepage)/Demo";
import Security from "@/app/(homepage)/Security";


export default function Homepage() {
  return (
    <>
      <Intro/>
      <ClientSchools/>
      <Demo
        subheading= "Directly from the calendar"
        heading= "Discover the ease of booking activities without the text and email tennis"
        steps= {[
          "Find the activities your child will love",
          "Add them to child's calendar",
          "Review and then pay for all in one click",
        ]}
        image= "/demo.png"
      />
      <Security/>
      <Benefits/>
      <HomepageTabs/>
      <SignUp
        subheading=""
        heading1="Easy to get started. And it's free."
        heading2=""
        bodyText=""
        image="/signup.svg"
      />
    </>
  )
}
