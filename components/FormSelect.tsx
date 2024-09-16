import {
    FormControl,
    FormField,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { Control, FieldPath } from "react-hook-form";
  import { z } from "zod";
  import { authFormSchema } from "@/lib/utils";
  
  const formSchema = authFormSchema("sign-up");
  
  interface FormSelectProps {
    control: Control<z.infer<typeof formSchema>>;
    name: FieldPath<z.infer<typeof formSchema>>;
    label: string;
    options: { value: string; label: string }[];
    placeholder: string;
  }
  
  const FormSelect = ({
    control,
    name,
    label,
    options,
    placeholder,
  }: FormSelectProps) => {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <div className="form-item item">
            <FormLabel className="form-label">{label}</FormLabel>
            <div className="relative flex w-full items-center">
              <FormControl className="relative grow">
                <Select
                  onValueChange={field.onChange}
                  value={field.value as string}
                >
                  <SelectTrigger className="select-trigger">
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
            </div>
            <FormMessage className="form-message mt-2" />
          </div>
        )}
      />
    );
  };
  
  export default FormSelect;
  