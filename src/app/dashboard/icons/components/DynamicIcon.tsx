import * as Icons from "lucide-react";

type DynamicIconProps = {
  name: string; // Le nom de l'icône doit correspondre à une clé de `icons`
  size?: number;
  className?: string | null | undefined;
};

const DynamicIcon = ({ name, size, className }: DynamicIconProps) => {
  const IconElement = Icons[name as keyof typeof Icons] as React.ComponentType<{
    size: number;
    className: string;
  }>;

  if (!IconElement) {
    console.error(`L'icône "${name}" n'existe pas dans Lucide.`);
    return null;
  }

  return IconElement ? (
    <IconElement size={size || 16} className={className || ""} />
  ) : null;
};

export default DynamicIcon;
