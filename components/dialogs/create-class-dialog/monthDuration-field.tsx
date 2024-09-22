import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { FormReturn } from ".";

type MonthDurationFieldProps = {
  form: FormReturn;
};

const MonthDurationField = ({ form }: MonthDurationFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="monthDuration"
      render={({ field }) => (
        <FormItem className="w-1/4">
          <div className="flex items-center gap-4">
            <FormLabel className="text-nowrap">Month Duration</FormLabel>
            <FormControl>
              <Input {...field} type="number" min={1} defaultValue={1} onChange={field.onChange} />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default MonthDurationField;
