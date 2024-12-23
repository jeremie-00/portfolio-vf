import DevelopperDesk from "./components/desktopSvg/DevelopperDesk";
import { Transition } from "./components/Transition";
import Home from "./pages/home/Home";

export default async function HomePage() {
  return (
    <Transition>
      <Home>
        <DevelopperDesk />
      </Home>
    </Transition>
  );
}
