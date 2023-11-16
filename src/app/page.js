import Intro from "@/app/homepage/intro";
import ClientSchools from "@/app/homepage/clientSchools";
import SchoolStats from "@/app/homepage/schoolStats";
import Benefits from "@/app/homepage/benefits";
import SignUp from "@/app/homepage/signUp";


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
