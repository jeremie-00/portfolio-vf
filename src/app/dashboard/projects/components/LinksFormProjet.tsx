"use client";

import { DeleteAlerteButton } from "@/app/components/Buttons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FullIcon } from "@/types/prismaTypes";
import { Link } from "@prisma/client";
import { CirclePlus, Trash2 } from "lucide-react";
import { forwardRef, useImperativeHandle, useState } from "react";
import { IconPicker } from "../../icons/components/IconPicker";
import { deleteLinkByIdAction } from "../../links/services/links.action";
import { ToastDeleteFormLinkProjectAction } from "./ToastProject";

interface LinksProps {
  initialLinks?: Link[];
  icons: FullIcon[];
}

export const LinksFormProject = forwardRef<
  { resetLink: () => void },
  LinksProps
>(({ initialLinks, icons }, ref) => {
  const [iconSelect, setIconSelect] = useState(
    initialLinks?.map((link) => {
      const icon = icons.find((icon) => icon.id === link.iconId);
      return {
        id: icon?.id || "",
        name: icon?.name || "",
      };
    }) || []
  );

  const [links, setLinks] = useState(
    initialLinks?.map((link) => ({
      id: link.id,
      url: link.url,
      title: link.title,
      projectId: link.projectId,
    })) || []
  );

  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(
    links.length >= 2
  );

  const addLinkField = () => {
    setIconSelect([...iconSelect, { id: "", name: "" }]);
    setLinks([
      ...links,
      {
        id: "",
        url: "",
        title: "",
        projectId: "",
      },
    ]);
    // Désactiver le bouton si on atteint 2 liens
    if (links.length + 1 >= 2) {
      setIsAddButtonDisabled(true);
    }
  };

  const removeLinkField = (index: number, linkId: string) => {
    const newLinks = links.filter((_, i) => i !== index);
    setLinks(newLinks);
    setIsAddButtonDisabled(newLinks.length >= 2);
    const removeLink = async (id: string) => {
      const result = await deleteLinkByIdAction({
        ID: id,
      });

      if (result?.serverError || result?.validationErrors) {
        ToastDeleteFormLinkProjectAction({
          serverError: result?.serverError,
          validationErrors: result?.validationErrors,
        });
        return;
      }

      // Affichage du message de succès
      if (result?.data) {
        ToastDeleteFormLinkProjectAction({ data: result.data });
      }
    };

    if (linkId) {
      removeLink(links[index].id);
    }
  };

  useImperativeHandle(ref, () => ({
    resetLink() {
      setLinks([]);
      setIconSelect([]);
      setIsAddButtonDisabled(true);
    },
  }));

  const handleIconChange = (index: number, value: string) => {
    const selectedIcon = icons.find((icon) => icon.name === value);
    const newIcon = [...iconSelect];
    newIcon[index] = selectedIcon
      ? { id: selectedIcon.id, name: selectedIcon.name }
      : { id: "", name: "" };
    setIconSelect(newIcon);
  };

  const handleLinkChange = (index: number) => {
    const newLinks = [...links];
    newLinks[index] = {
      ...newLinks[index],
    };
    setLinks(newLinks);
  };

  return (
    <div className="flex flex-col">
      <div className="flex gap-8 items-center justify-center mt-6">
        <Button
          type="button"
          variant="outline"
          size="default"
          onClick={addLinkField}
          disabled={isAddButtonDisabled}
        >
          <CirclePlus
            style={{ width: "26px", height: "26px" }}
            color="#ffffff"
            strokeWidth={1}
            absoluteStrokeWidth
          />
          Ajouter un lien
        </Button>
      </div>

      {links.map((link, index) => (
        <div key={index} className="flex flex-col my-4 gap-2">
          <Label htmlFor={`url-${index}`}>Lien {index + 1}</Label>
          <input type="hidden" name="links.id" value={link.id} />
          <input type="hidden" name="links.inNav" value="false" />
          <div className="flex items-center justify-between gap-4 my-2 ">
            <div className="flex flex-col gap-2 flex-1">
              <input
                type="hidden"
                name="links.iconId"
                value={iconSelect[index].id}
              />
              <IconPicker
                icons={icons || []}
                selectedIcon={iconSelect[index].name}
                onChange={(e) => handleIconChange(index, e)}
              />
              <Input
                type="text"
                name="links.url"
                id={`url-${index}`}
                placeholder="URL du lien"
                defaultValue={link.url}
                className="w-full"
                onChange={() => handleLinkChange(index)}
              />
              <Input
                type="text"
                name="links.title"
                placeholder="Title du lien"
                defaultValue={link.title}
                onChange={() => handleLinkChange(index)}
              />
            </div>

            {link.id ? (
              <DeleteAlerteButton
                actionButtonDelete={() => removeLinkField(index, link.id)}
                pendingDelete={false}
                variant="unstyled"
              />
            ) : (
              <Button
                variant="unstyled"
                size="icon"
                //type="button"
                onClick={() => removeLinkField(index, link.id)}
              >
                <Trash2
                  style={{ width: "26px", height: "26px" }}
                  strokeWidth={1}
                  color={"red"}
                />
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
});
LinksFormProject.displayName = "LinksFormProject";
