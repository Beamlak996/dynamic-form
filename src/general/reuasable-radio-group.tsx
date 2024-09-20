
import * as React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckIcon } from "lucide-react";

interface RadioItem {
  id: string;
  label: string;
  description?: string; 
  icon?: React.ReactNode; 
}

interface ReusableRadioGroupProps {
  items: RadioItem[];
  defaultValue: string;
  onValueChange: (value: string) => void;
  grid?: number; 
}

export const ReusableRadioGroup: React.FC<ReusableRadioGroupProps> = ({
  items,
  defaultValue,
  onValueChange,
  grid = 1, 
}) => {
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${grid}, minmax(0, 1fr))`,
    gap: "1.5rem", 
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-background">
      <RadioGroup value={defaultValue} onValueChange={onValueChange}>
        <div style={gridStyle}>
          {items.map((item) => {
            const isSelected = defaultValue === item.id; 

            return (
              <Label
                key={item.id}
                htmlFor={item.id}
                className={`flex items-center justify-between gap-2 p-4 border rounded-lg cursor-pointer hover:bg-accent transition-colors ${
                  isSelected ? "bg-sky-100 border-sky-400 border-dashed" : ""
                }`}
              >
                <RadioGroupItem
                  value={item.id}
                  id={item.id}
                  className="sr-only"
                />
                {item.icon && (
                  <div
                    className={`mr-4 ${
                      isSelected ? "text-sky-400" : "text-gray-500"
                    }`} 
                  >
                    {item.icon}
                  </div>
                )}
                <div className="flex-1">
                  <div className="font-semibold capitalize">{item.label}</div>
                  {item.description && (
                    <div className="text-sm text-muted-foreground">
                      {item.description}
                    </div>
                  )}
                </div>
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    isSelected ? "border-sky-600 bg-sky-600" : "border-gray-300"
                  }`}
                >
                  {isSelected && <CheckIcon className="w-4 h-4 text-white" />}
                </div>
              </Label>
            );
          })}
        </div>
      </RadioGroup>
    </div>
  );
};
