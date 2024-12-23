import { Transition } from "@/app/components/framer-motion/Transition";

import FormContact from "./components/FormContact";
import { Wrapper } from "@/app/components/pages/Wrapper";

export default function ContactPage() {
  return (
    <Transition>
      <Wrapper>
        <FormContact />
      </Wrapper>
    </Transition>
  );
}
