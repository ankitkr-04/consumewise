import {
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authFormSchema } from "@/lib/utils";
import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";

const formSchema = authFormSchema("sign-up");

interface CustomInputProps {
  control: Control<z.infer<typeof formSchema>>;
  label: string;
  name: FieldPath<z.infer<typeof formSchema>>;
  type?: string;
  placeholder: string;
  tag?: string;
}

const CustomInput = ({
  control,
  label,
  name,
  type = "text",
  placeholder,
  tag,
}: CustomInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="form-item item ">
          <FormLabel className="form-label">{label}</FormLabel>
          <div className="relative flex w-full items-center">
            <FormControl className="relative grow">
              <Input
                placeholder={placeholder}
                className="input-class pr-12" // Add padding for the tag
                type={type}
                {...field}
              />
            </FormControl>
            {tag && (
              <span className="badge absolute right-4 top-1/2 -translate-y-1/2">
                {tag}
              </span>
            )}
          </div>
          <FormMessage className="form-message mt-2" />
        </div>
      )}
    />
  );
};

export default CustomInput;
