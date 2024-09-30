import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { FormReturn } from ".";

type MeetUrlFieldProps = {
  form: FormReturn;
};

const MeetUrlField = ({ form }: MeetUrlFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="meetUrl"
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center gap-4">
            <FormLabel className="text-nowrap">Meet URL</FormLabel>
            <FormControl className="w-full">
              <Input placeholder="Enter your meet URL" {...field} className="w-full" />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default MeetUrlField;
