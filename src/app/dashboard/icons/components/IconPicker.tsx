import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FullIcon } from "@/types/prismaTypes";
import React from "react";
import DynamicIcon from "./DynamicIcon";

interface IconPickerProps {
  icons: FullIcon[];
  selectedIcon: string;
  onChange: (iconName: string) => void;
}

export const IconPicker: React.FC<IconPickerProps> = ({
  icons,
  selectedIcon,
  onChange,
}) => {
  const handleIconChange = (value: string) => {
    onChange(value);
  };

  return (
    <Select name="icon" value={selectedIcon} onValueChange={handleIconChange}>
      <SelectTrigger>
        <SelectValue placeholder="Sélectionner une icône">
          <DynamicIcon
            name={selectedIcon || "Loader"}
            size={18}
            className="hover:text-primary"
          />
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {icons.map((icon) => (
          <SelectItem key={icon.id} value={icon.name}>
            <DynamicIcon
              name={icon.name || "Loader"}
              size={18}
              className="hover:text-primary"
            />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
