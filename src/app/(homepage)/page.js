import Intro from "@/app/(homepage)/Intro";
import ClientSchools from "@/app/(homepage)/ClientSchools";
import HomepageTabs from "@/app/(homepage)/HomepageTabs";
import Benefits from "@/app/(homepage)/Benefits";
import SignUp from "@/app/(homepage)/SignUp";
import Demo from "@/app/(homepage)/Demo";


export default function Homepage() {
  return (
    <>
      <Intro/>
      <ClientSchools/>
      <Demo/>
      <Benefits/>
      <HomepageTabs/>
      <SignUp/>
    </>
  )
}
