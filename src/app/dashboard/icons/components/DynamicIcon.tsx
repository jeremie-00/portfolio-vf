import * as Icons from "lucide-react";

type DynamicIconProps = {
  name: string; // Le nom de l'icône doit correspondre à une clé de `icons`
  size?: number;
  className?: string;
};

export const DynamicIcon = ({
  name,
  size = 16,
  className = "",
}: DynamicIconProps) => {
  const IconElement = Icons[name as keyof typeof Icons] as React.ComponentType<{
    size: number;
    className: string;
  }>;

  if (!IconElement) {
    console.error(`L'icône "${name}" n'existe pas dans Lucide.`);
    return null;
  }

  return IconElement ? <IconElement size={size} className={className} /> : null;
};

export const IconLoaderCircle = () => (
  <DynamicIcon name="LoaderCircle" className="animate-spin" />
);

export const IconCirclePlus = () => (
  <DynamicIcon name="CirclePlus" className="text-primary w-6 h-6" />
);

export const IconTrash2 = ({
  pending,
  color,
}: {
  pending: boolean;
  color?: string;
}) =>
  pending ? (
    <IconLoaderCircle />
  ) : (
    <DynamicIcon name="Trash2" className={color} />
  );

export const IconPencil = ({ pending }: { pending: boolean }) =>
  pending ? <IconLoaderCircle /> : <DynamicIcon name="Pencil" />;

export const IconCheck = ({ pending }: { pending: boolean }) =>
  pending ? <IconLoaderCircle /> : <DynamicIcon name="Check" />;
