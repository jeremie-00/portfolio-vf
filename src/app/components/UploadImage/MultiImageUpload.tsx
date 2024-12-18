"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleImageDelete } from "@/lib/fileManager";
import { ImageFile } from "@prisma/client";
import Image from "next/image";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { ImageDeleteButton, PreviewDeleteButton } from "./ImageDeleteButton";
import { ToastDeleteImagesAction } from "./ToastImage";

interface MultiImageUploadProps {
  label: string;
  images: ImageFile[] | [];
  isCreate: boolean;
}

export const MultiImageUpload = forwardRef<
  { resetFiles: () => void },
  MultiImageUploadProps
>(({ label, images, isCreate }, ref) => {
  const [isLoading, setIsLoading] = useState(false);
  const [urlsMedias, setUrlsMedias] = useState<string[]>([]);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const mediasInputRef = useRef<HTMLInputElement | null>(null);

  useImperativeHandle(ref, () => ({
    resetFiles() {
      setUrlsMedias([]);
      setMediaFiles([]);
      //onFileChange([]);
      if (mediasInputRef.current) {
        mediasInputRef.current.value = "";
      }
    },
  }));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      const newUrls = filesArray.map((file) => URL.createObjectURL(file));
      const dataTransfer = new DataTransfer();
      // Ajouter les nouveaux fichiers à la DataTransfer
      filesArray.forEach((file) => dataTransfer.items.add(file));
      // Ajouter les anciens fichiers déjà sélectionnés à la DataTransfer
      mediaFiles.forEach((file) => dataTransfer.items.add(file));
      setUrlsMedias((prevUrls) => [...prevUrls, ...newUrls]);
      setMediaFiles((prevFiles) => [...prevFiles, ...filesArray]);
      if (mediasInputRef.current) {
        mediasInputRef.current.files = dataTransfer.files;
      }
      // Passer les nouveaux fichiers à onFileChange
      //onFileChange([...mediaFiles, ...filesArray]);
    }
  };

  const handlePreviewMediaRemove = async (
    url: string,
    file: File | [] | null
  ) => {
    setUrlsMedias((prevUrls) => prevUrls.filter((image) => image !== url));
    setMediaFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((f) => f !== file);
      // Créer un objet DataTransfer pour manipuler la liste de fichiers
      const dataTransfer = new DataTransfer();
      updatedFiles.forEach((f) => {
        dataTransfer.items.add(f); // Ajouter chaque fichier au DataTransfer
      });
      if (mediasInputRef.current) {
        // Mettre à jour la propriété files de l'input avec les fichiers modifiés
        mediasInputRef.current.files = dataTransfer.files;
      }
      // Si aucun fichier n'est présent après la suppression, on vide le tableau
      if (updatedFiles.length === 0) {
        return [];
      }
      //onFileRemove(updatedFiles);
      return updatedFiles;
    });
  };

  const handleMediaRemove = async (url: string, file: File | [] | null) => {
    setIsLoading(true);
    const imageDelete = !isCreate && images?.find((img) => img.url === url);

    if (!isCreate && imageDelete) {
      const result = await handleImageDelete({ ID: imageDelete.id, url: url });
      if (result?.serverError || result?.validationErrors) {
        ToastDeleteImagesAction({
          serverError: result?.serverError,
          validationErrors: result?.validationErrors,
        });
        return;
      }

      // Affichage du message de succès
      if (result?.data) {
        ToastDeleteImagesAction({ data: result.data });
      }
    }
    // Supprimer l'élément du tableau des fichiers et des URLs
    setUrlsMedias((prevUrls) => prevUrls.filter((image) => image !== url));
    setMediaFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((f) => f !== file);
      if (updatedFiles.length === 0) {
        return [];
      }
      //onFileRemove(updatedFiles);
      return updatedFiles;
    });
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col w-full gap-4">
      <Label htmlFor="medias">{label}</Label>
      <Input
        type="file"
        name="medias"
        id="medias"
        multiple
        onChange={handleFileChange}
        ref={mediasInputRef}
      />
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col w-full gap-4">
          {urlsMedias.length > 0 ? (
            urlsMedias.map((url, index) => (
              <div key={index} className="relative h-[150px]">
                <Image
                  src={url}
                  alt="Aperçu du média"
                  width={400}
                  height={200}
                  className="flex items-center justify-center border border-primary rounded-lg object-cover p-1 h-full w-full"
                  priority={true}
                />
                <PreviewDeleteButton
                  url={url}
                  file={mediaFiles[index]}
                  isCreate={isCreate}
                  isLoading={isLoading}
                  fn={handlePreviewMediaRemove}
                />
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center border border-input rounded-lg p-8 h-[150px]">
              Aucune preview
            </div>
          )}
        </div>
        <div className="flex flex-col w-full gap-4">
          {!isCreate ? (
            images && images.length > 0 ? (
              images?.map((image, index) => (
                <div key={index} className="relative h-[150px]">
                  <Image
                    src={image?.url}
                    alt={`Aperçu de l'image ${index + 1}`}
                    width={400}
                    height={200}
                    className="flex items-center justify-center border border-primary rounded-lg object-cover p-1 h-full w-full"
                    priority={true}
                  />
                  <ImageDeleteButton
                    url={image?.url}
                    file={mediaFiles[index]}
                    isCreate={isCreate}
                    isLoading={isLoading}
                    fn={handleMediaRemove}
                  />
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center border border-input rounded-lg p-8 h-[150px]">
                Aucun média
              </div>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
});
MultiImageUpload.displayName = "MultiImageUpload";
