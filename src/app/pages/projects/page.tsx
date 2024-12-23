import { Transition } from "@/app/components/framer-motion/Transition";
import ProjectTab from "@/app/components/project/ProjectTab";
import { getSectionByTypeAction } from "@/app/dashboard/sections/services/section.action";
import HeroSection from "../../components/pages/HeroSection";

export default async function ProjectClientPage() {
  const section = await getSectionByTypeAction("projects");
  return (
    <Transition>
      <HeroSection section={section} />
      <ProjectTab isAdmin={false} />
    </Transition>
  );
}
