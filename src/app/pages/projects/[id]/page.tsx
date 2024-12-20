import Collaps from "@/app/components/collaps/collaps";
import SlideShow from "@/app/components/slider/SlideShow";
import DynamicIcon from "@/app/dashboard/icons/components/DynamicIcon";
import { getAllIconsAction } from "@/app/dashboard/icons/services/icons.action";

import { getProjectByIdAction } from "@/app/dashboard/projects/services/project.action";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const paramsId = (await params).id;
  const project = await getProjectByIdAction(paramsId);
  const allIcons = await getAllIconsAction();
  const iconRepo = allIcons.find((icon) =>
    project?.links?.some((link) => link.iconId === icon.id)
  );
  console.log(iconRepo);

  return (
    <div className="container flex flex-col items-center justify-center gap-8">
      <h1 className="text-4xl flex flex-col items-center gap-4 text-center">
        Bienvenue sur le projet
        <span className="text-primary text-5xl font-semibold">
          {project?.title}
        </span>
      </h1>
      <div className="flex gap-4 items-center justify-center flex-col sm:flex-row">
        {project?.links.map((link) => (
          <Link
            key={link.id}
            href={link.url}
            target={link.target || "_blank"}
            className={buttonVariants({
              variant: "default",
              size: "full",
            })}
          >
            <DynamicIcon
              name={
                allIcons.find((icon) => icon.id === link.iconId)?.name || "Link"
              }
            />
            {link.title}
          </Link>
        ))}
      </div>
      {project && project.medias && project.medias.length > 0 ? (
        <SlideShow pictures={project?.medias.map((media) => media.url)} />
      ) : (
        <p className="text-3xl">Aucune image</p>
      )}
      <div className="w-full flex flex-col sm:flex-row gap-4">
        <Collaps title={"Description"}>
          <p className="p bg-sidebar/40 rounded-b-lg"> {project?.longDesc} </p>
        </Collaps>
        <Collaps title={"Skills"}>
          <ul className="ul bg-sidebar/40 rounded-b-lg p-4">
            {project?.skills.map((skill) => (
              <li className="li" key={skill.title}>
                {skill.title}
              </li>
            ))}
          </ul>
        </Collaps>
      </div>
    </div>
  );
}
