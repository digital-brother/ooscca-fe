import Intro from "@/app/(homepage)/Intro";
import ClientSchools from "@/app/(homepage)/ClientSchools";
import SchoolStats from "@/app/(homepage)/SchoolStats";
import Benefits from "@/app/(homepage)/Benefits";
import SignUp from "@/app/(homepage)/SignUp";


export default function Homepage() {
  return (
    <>
      <Intro/>
      <ClientSchools/>
      <SchoolStats/>
      <Benefits/>
      <SignUp/>
    </>
  )
}
