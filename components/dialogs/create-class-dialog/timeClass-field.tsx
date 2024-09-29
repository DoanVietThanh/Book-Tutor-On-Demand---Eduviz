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
        <FormItem>
          <div className="flex items-center gap-4">
            <FormLabel className="text-nowrap">
              {name === "beginingClass" ? "Begining Course" : "Ending Course"}
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
