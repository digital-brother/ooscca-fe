import SignUp from "@/app/(homepage)/SignUp";
import ClientSchools from "@/app/(homepage)/ClientSchools";
import Demo from "@/app/(homepage)/Demo";

export default function ProviderPage  () {
  return (
    <>
      <SignUp
        subheading="New parents joining daily"
        heading1="Reaching parents."
        heading2="Made easy."
        bodyText="OOSCCA is a shareable multi-activity booking, and managing platform built to bring you and the parents under one roof. Now you can be visible every time parents are looking to book an activity."
        image="/providers-signup.png"
      />
      <ClientSchools/>
      <Demo
        subheading="To be used with ease on the busiest day"
        heading="OOSCCA is raised to simplify and amplify your offerings"
        steps={[
         "OOSCCA sorts and presents all activity options at time of booking",
         "All activities for all siblings can be booked at the same time",
         "One seamless payment system and experience ",
         ]}
        image= "/demoProviders.png"
      />
    </>
  )
}
