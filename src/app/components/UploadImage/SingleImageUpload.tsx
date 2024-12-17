"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleImageDelete } from "@/lib/fileManager";
import { ImageFile } from "@prisma/client";
import Image from "next/image";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { ImageDeleteButton, PreviewDeleteButton } from "./ImageDeleteButton";

interface SingleImageUploadProps {
  label: string;
  image: ImageFile | null;
  isCreate: boolean;
  onFileChange?: (file: File | null) => void;
}

export const SingleImageUpload = forwardRef<
  { resetFile: () => void },
  SingleImageUploadProps
>(({ label, image, isCreate, onFileChange }, ref) => {
  const [isLoading, setIsLoading] = useState(false);
  const [urlCover, setUrlCover] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const coverInputRef = useRef<HTMLInputElement | null>(null);

  useImperativeHandle(ref, () => ({
    resetFile() {
      setCoverFile(null);
      setUrlCover("");
      onFileChange?.(null);
      if (coverInputRef.current) {
        coverInputRef.current.value = "";
      }
    },
  }));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setUrlCover(URL.createObjectURL(file));
      setCoverFile(file);
      onFileChange?.(file);
    }
  };

  const handlePreviewFileRemove = async () => {
    setUrlCover("");
    onFileChange?.(null);
    if (coverInputRef.current) {
      coverInputRef.current.value = "";
    }
  };

  const handleFileRemove = async () => {
    setIsLoading(true);
    if (!isCreate && image) await handleImageDelete(image);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <Label htmlFor="cover">{label}</Label>
      <Input
        type="file"
        name="cover"
        id="cover"
        onChange={(e) => handleFileChange(e)}
        ref={coverInputRef}
      />
      <div className="grid grid-cols-2 gap-4">
        {urlCover ? (
          <div className="relative h-[150px]">
            <Image
              src={urlCover}
              alt="Aperçu de l'image"
              width={400}
              height={200}
              className="border border-primary rounded-lg object-cover p-1 w-full h-full"
              priority={true}
            />
            <PreviewDeleteButton
              url={urlCover}
              file={coverFile}
              isCreate={isCreate}
              isLoading={isLoading}
              fn={handlePreviewFileRemove}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center border border-input rounded-lg p-8 h-[150px]">
            Aucune preview
          </div>
        )}
        {!isCreate ? (
          image?.url ? (
            <div className="relative h-[150px]">
              <Image
                src={image?.url}
                alt="Aperçu de l'image"
                width={400}
                height={200}
                className="border border-primary rounded-lg object-cover p-1 w-full h-full"
                priority={true}
              />
              <ImageDeleteButton
                url={image?.url}
                file={coverFile}
                isCreate={isCreate}
                isLoading={isLoading}
                fn={handleFileRemove}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center border border-input rounded-lg p-8 h-[150px]">
              Aucune cover
            </div>
          )
        ) : null}
      </div>
    </div>
  );
});
SingleImageUpload.displayName = "SingleImageUpload";
