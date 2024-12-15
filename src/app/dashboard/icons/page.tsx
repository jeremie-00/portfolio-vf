"use server";
import Link from "next/link";
import DynamicIcon from "./components/DynamicIcon";
import { getAllIconsAction } from "./services/icons.action";

export default async function IconFormPage() {
  const icons = await getAllIconsAction();
  return (
    <div className="flex w-full h-full p-6 items-center justify-center">
      {icons.length > 0 ? (
        <div className="grid grid-cols-4 gap-10">
          {icons.map((icon) => (
            <Link href={`/dashboard/icons/${icon.id}`} key={icon.id}>
              <DynamicIcon
                name={icon.name || "Loader"}
                size={28}
                className="hover:text-primary"
              />
            </Link>
          ))}
        </div>
      ) : (
        <h1 className="w-full text-3xl flex items-center justify-center">
          Aucune icône trouvée
        </h1>
      )}
    </div>
  );
}
