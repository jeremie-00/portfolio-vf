import { getSectionByTypeAction } from "./dashboard/sections/services/section.action";
import HomeSvgPage from "./pages/home/HomePage";

export default async function HomePage() {
  const section = await getSectionByTypeAction("home");
  return <HomeSvgPage section={section} />;
}
