import { Transition } from "@/app/components/Transition";

import { Wrapper } from "@/app/components/pages/Wrapper";
import FormContact from "./components/FormContact";
import { getSectionByTypeAction } from "@/app/dashboard/sections/services/section.action";

export default async function ContactPage() {
  const section = await getSectionByTypeAction("contact");
  return (
    <Transition>
      <Wrapper>
        <FormContact section={section} />
      </Wrapper>
    </Transition>
  );
}
