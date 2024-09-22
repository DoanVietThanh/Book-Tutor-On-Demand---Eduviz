import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { FormReturn } from ".";

type CourseNameFieldProps = {
  form: FormReturn;
};

const CourseNameField = ({ form }: CourseNameFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="courseName"
      render={({ field }) => (
        <FormItem className="w-1/2">
          <div className="flex items-center gap-4">
            <FormLabel className="text-nowrap">Course Name</FormLabel>
            <FormControl className="w-full">
              <Input placeholder="Enter your course name" {...field} className="w-full" />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CourseNameField;
