import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormReturn } from ".";

type PictureFieldProps = {
  form: FormReturn;
};
const PictureField = ({ form }: PictureFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="picture"
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center gap-4">
            <FormLabel className="text-nowrap">Picture</FormLabel>
            <FormControl className="w-full">
              <Input
                type="file"
                onChange={(event) => {
                  const file = event.target.files?.[0] || null;
                  field.onChange(file);
                }}
                className="w-full"
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PictureField;
