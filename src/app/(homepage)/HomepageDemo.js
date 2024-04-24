
import Demo from "@/app/(homepage)/Demo";

const HomepageDemo = () => (
    <Demo config={{
      subheading: "Directly from the calendar",
      heading1: "Discover the ease of booking activities without the text and email tennis",
      steps: [
        "Find the activities your child will love",
        "Add them to child’s calendar",
        "Review and then pay for all in one click",
      ],
      imageUrl: "/demo.png",
    }} />
  );

export default HomepageDemo;