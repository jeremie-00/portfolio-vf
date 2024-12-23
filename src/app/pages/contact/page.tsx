import { Transition } from "@/app/components/Transition";

import { Wrapper } from "@/app/components/pages/Wrapper";
import FormContact from "./components/FormContact";

export default function ContactPage() {
  return (
    <Transition>
      <Wrapper>
        <FormContact />
      </Wrapper>
    </Transition>
  );
}
