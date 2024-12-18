import { getProject } from "@/app/dashboard/project/services/project.action";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const paramsId = (await params).id;
  const project = await getProject(paramsId);
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <div>
        {`Nom du projet : ${project?.title} -- ID : ${paramsId} -- nombre de liens associer : ${project?.links.length}`}
      </div>
      {project?.links.map((link, index) => (
        <div
          key={link.id}
          className="w-full flex flex-col items-center justify-center gap-4"
        >
          <span>
            Nom du lien {index + 1} : {link.title}
          </span>
          <span>
            URL {index + 1} : {link.url}
          </span>
        </div>
      ))}
    </div>
  );
}
