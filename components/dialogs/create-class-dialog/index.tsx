"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import CourseNameField from "./courseName-field";
import SubjectNameField from "./subjectName-field";
import PriceField from "./price-field";
import { getCurrentDate, getCurrentTime } from "@/lib/utils";
import StartDateField from "./startDate-field";
import MonthDurationField from "./monthDuration-field";
import TimeClassField from "./timeClass-field";

export type FormReturn = UseFormReturn<
  {
    courseName: string;
    subjectName: string;
    price: number;
    startDate: string;
    monthDuration: number;
    beginingClass: string;
    endingClass: string;
    weekSchedule: string[];
  },
  any,
  undefined
>;

const formSchema = z.object({
  courseName: z.string().min(6, {
    message: "Course name must be at least 6 characters.",
  }),
  subjectName: z.string().min(6, {
    message: "Subject name must be at least 6 characters.",
  }),
  price: z.coerce.number().min(100, {
    message: "Price must be at least 100k VND.",
  }),
  startDate: z.string(),
  monthDuration: z.coerce.number().min(1, {
    message: "Month duration must be at least 1 month.",
  }),
  beginingClass: z.string(),
  endingClass: z.string(),
  weekSchedule: z.array(z.string()),
  //   picture: z.instanceof(File),
});
const CreateClassDialog = () => {
  const form: FormReturn = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseName: "Mon Khoi Nghiep Exe202",
      subjectName: "Tieng Anh",
      price: 100,
      startDate: getCurrentDate(),
      monthDuration: 1,
      beginingClass: getCurrentTime(),
      endingClass: getCurrentTime(2),
      weekSchedule: ["Monday", "Wednesday", "Friday"],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Dialog>
      <Button asChild variant={"destructive"}>
        <DialogTrigger className="flex items-center gap-4">
          <PlusCircle /> New Class
        </DialogTrigger>
      </Button>
      <DialogContent className="sm:max-w-[425px] md:max-w-[1000px] m-8">
        <DialogHeader>
          <DialogTitle>Create a new class</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
            <div className="flex gap-8">
              <CourseNameField form={form} />
              <SubjectNameField form={form} />
            </div>
            <div className="flex gap-8 justify-between">
              <PriceField form={form} />
              <MonthDurationField form={form} />
            </div>
            <div className="flex gap-8 mb-8">
              <StartDateField form={form} />
              <TimeClassField form={form} name={"beginingClass"} />
              <TimeClassField form={form} name={"endingClass"} />
            </div>
            <Button type="submit" className="w-full mt-8">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateClassDialog;
