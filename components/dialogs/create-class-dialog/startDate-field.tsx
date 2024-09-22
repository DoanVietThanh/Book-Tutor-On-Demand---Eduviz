import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { FormReturn } from ".";

type StartDateFieldProps = {
  form: FormReturn;
};

const StartDateField = ({ form }: StartDateFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="startDate"
      render={({ field }) => (
        <FormItem className="w-1/2">
          <div className="flex items-center gap-4">
            <FormLabel className="text-nowrap">Start Date</FormLabel>
            <FormControl className="w-full">
              <Input {...field} type="date" defaultValue={new Date().toISOString().split("T")[0]} className="w-full" />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default StartDateField;
