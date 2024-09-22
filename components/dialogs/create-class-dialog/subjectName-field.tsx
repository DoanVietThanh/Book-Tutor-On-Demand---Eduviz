import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { FormReturn } from ".";

type SubjectNameFieldProps = {
  form: FormReturn;
};

const SubjectNameField = ({ form }: SubjectNameFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="subjectName"
      render={({ field }) => (
        <FormItem className="flex-1">
          <div className="flex items-center gap-4">
            <FormLabel className="text-nowrap">Subject Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter your course name" {...field} />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SubjectNameField;
