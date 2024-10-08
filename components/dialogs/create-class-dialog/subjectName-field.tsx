import { Input } from "@/components/ui/input";
import React from "react";
import { FormReturn } from ".";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { getSubjectName } from "@/actions/subject/get-subjects";
type SubjectNameFieldProps = {
  form: FormReturn;
};

interface ListSubject {
  subjectId: string;
  subjectName: string;
}

const SubjectNameField = ({ form }: SubjectNameFieldProps) => {
  const [subjectName, setSubjectName] = useState<ListSubject[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const names = await getSubjectName();
        setSubjectName(names || []);
      } catch (error) {
        console.error("Failed to fetch subject name:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <FormField
      control={form.control}
      name="subjectName"
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center justify-between gap-4">
            <FormLabel className="text-nowrap">Subject Name</FormLabel>
            <FormControl>
              <Select value={field.value} onValueChange={(value) => field.onChange(value)}>
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Select a subject name" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {subjectName.map((item) => (
                      <SelectItem key={item.subjectId} value={item.subjectName}>
                        {item.subjectName}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SubjectNameField;
