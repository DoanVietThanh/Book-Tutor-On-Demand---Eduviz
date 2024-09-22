import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { FormReturn } from ".";

type TimeClassProps = {
  form: FormReturn;
  name: "beginingClass" | "endingClass";
};

const TimeClassField = ({ form, name }: TimeClassProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-1/2">
          <div className="flex items-center gap-4">
            <FormLabel className="text-nowrap">
              {name === "beginingClass" ? "Begining Class" : "Ending Class"}
            </FormLabel>
            <FormControl>
              <Input {...field} type="time" defaultValue={field.value} onChange={field.onChange} />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export default TimeClassField;
