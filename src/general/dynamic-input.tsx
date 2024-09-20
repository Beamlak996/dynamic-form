import * as React from "react";
import { Trash2, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface DynamicInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onValuesChange?: (values: string[]) => void;
  initialValues?: string[];
  addButtonLabel?: string;
  removeButtonLabel?: string;
  inputClassName?: string;
  addButtonClassName?: string;
  removeButtonClassName?: string;
}

const DynamicInput = React.forwardRef<HTMLDivElement, DynamicInputProps>(
  (
    {
      onValuesChange,
      initialValues = [""],
      addButtonLabel = "Add",
      removeButtonLabel = "Remove",
      className,
      inputClassName,
      addButtonClassName,
      removeButtonClassName,
      ...props
    },
    ref
  ) => {
    const [values, setValues] = React.useState<string[]>(initialValues);

    const handleInputChange = (index: number, value: string) => {
      const newValues = [...values];
      newValues[index] = value;
      setValues(newValues);
      onValuesChange?.(newValues);
    };

    const handleAddInput = () => {
      setValues([...values, ""]);
      onValuesChange?.([...values, ""]);
    };

    const handleRemoveInput = (index: number) => {
      if (values.length > 1) {
        const newValues = values.filter((_, i) => i !== index);
        setValues(newValues);
        onValuesChange?.(newValues);
      }
    };

    return (
      <div ref={ref} className={cn("space-y-2", className)}>
        {values.map((value, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Input
              {...props}
              value={value}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className={cn("flex-grow", inputClassName)}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => handleRemoveInput(index)}
              className={cn(
                "flex-shrink-0 text-rose-500 hover:text-rose-700 hover:bg-rose-50 border-rose-200",
                removeButtonClassName
              )}
              aria-label={removeButtonLabel}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddInput}
          className={cn("mt-2", addButtonClassName)}
        >
          <Plus className="mr-2 h-4 w-4" />
          {addButtonLabel}
        </Button>
      </div>
    );
  }
);

DynamicInput.displayName = "DynamicInput";

export { DynamicInput };
