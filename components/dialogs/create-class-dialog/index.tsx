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
import WeekScheduleField from "./week-schedule-field";
import PictureField from "./picture-field";
import { createCourse } from "@/actions/course/create-course";
import { toast } from "sonner";
import { useAuthContext } from "@/context/auth-provider";

export type FormRequest = {
  courseName: string;
  subjectName: string;
  price: number;
  startDate: string;
  monthDuration: number;
  beginingClass: string;
  endingClass: string;
  weekSchedule: string[];
  picture: File | null;
};

export type FormReturn = UseFormReturn<FormRequest, any, undefined>;

const formSchema = z.object({
  courseName: z.string().min(6, {
    message: "Course name must be at least 6 characters.",
  }),
  subjectName: z.string().min(1, {
    message: "Subject name is required.",
  }),
  price: z.coerce.number().min(10000, {
    message: "Price must be at least 100k VND.",
  }),
  startDate: z.string(),
  monthDuration: z.coerce.number().min(1, {
    message: "Month duration must be at least 1 month.",
  }),
  beginingClass: z.string(),
  endingClass: z.string(),
  weekSchedule: z.array(z.string()),
  picture: z.instanceof(File).nullable(),
});

const CreateClassDialog = () => {
  const { accessToken } = useAuthContext();
  const form: FormReturn = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseName: "",
      subjectName: "",
      price: 11000,
      startDate: getCurrentDate(),
      monthDuration: 2,
      beginingClass: getCurrentTime(),
      endingClass: getCurrentTime(2),
      weekSchedule: ["Monday", "Wednesday", "Friday"],
      picture: null,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("🚀 ~ onSubmit ~ values:", values);
    try {
      const formData = new FormData();
      formData.append("courseName", values.courseName);
      formData.append("subjectName", values.subjectName);
      formData.append("price", values.price.toString());
      formData.append("startDate", values.startDate);
      formData.append("monthDuration", values.monthDuration.toString());
      formData.append("beginingClass", values.beginingClass);
      formData.append("endingClass", values.endingClass);
      formData.append("weekSchedule", JSON.stringify(values.weekSchedule));

      if (values.picture) {
        formData.append("picture", values.picture);
      }

      const response = await createCourse(formData, accessToken);
      console.log("🚀 ~ onSubmit ~ response:", response);
      // if (response.message) {
      //   toast.error(response.message || "Class created successfully");
      //   form.reset();
      // } else {
      //   toast.success("Class created successfully");
      //   form.reset();
      // }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  }

  return (
    <Dialog>
      <Button asChild variant={"destructive"}>
        <DialogTrigger className="flex items-center gap-4">
          <PlusCircle /> New Class
        </DialogTrigger>
      </Button>
      <DialogContent className="sm:max-w-[425px] md:max-w-[1200px] m-8">
        <DialogHeader>
          <DialogTitle>Create a new class</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 my-4">
              <CourseNameField form={form} />
              <SubjectNameField form={form} />
              <PriceField form={form} />
              <WeekScheduleField form={form} />
              <MonthDurationField form={form} />
              <StartDateField form={form} />
              <TimeClassField form={form} name={"beginingClass"} />
              <TimeClassField form={form} name={"endingClass"} />
              <PictureField form={form} />
            </div>
            <Button type="submit" className="w-full mt-24">
              Create
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateClassDialog;
