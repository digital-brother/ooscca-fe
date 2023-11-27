import Intro from "@/app/(homepage)/Intro";
import ClientSchools from "@/app/(homepage)/ClientSchools";
import TryIt from "@/app/(homepage)/TryIt";
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
      <TryIt/>
      <SignUp/>
    </>
  )
}
