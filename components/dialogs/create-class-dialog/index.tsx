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
import { uploadImage } from "@/actions/course/upload-image";
import { useState, useTransition } from "react";
import MeetUrlField from "./meet-url-field";

export type FormRequest = {
  courseName: string;
  subjectName: string;
  price: number;
  startDate: string;
  monthDuration: number;
  beginingClass: string;
  endingClass: string;
  meetUrl: string;
  weekSchedule: string[];
  picture: File;
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
  startDate: z.string({
    required_error: "Start date is required.",
  }),
  monthDuration: z.coerce.number().min(1, {
    message: "Month duration must be at least 1 month.",
  }),
  beginingClass: z.string({
    required_error: "Begining class time is required.",
  }),
  endingClass: z.string({
    required_error: "Ending class time is required.",
  }),
  weekSchedule: z.array(z.string()),
  meetUrl: z
    .string({
      required_error: "Meet URL is required.",
    })
    .min(1, { message: "Meet URL is required." }),
  picture: z.instanceof(File, { message: "A picture is required." }),
});

const CreateClassDialog = () => {
  const { accessToken } = useAuthContext();
  const [open, setOpen] = useState(false);
  const [isPending, startCreateCourse] = useTransition();

  const form: FormReturn = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseName: "",
      subjectName: "",
      price: 11000,
      startDate: getCurrentDate(),
      monthDuration: 1,
      beginingClass: getCurrentTime(),
      endingClass: getCurrentTime(2),
      meetUrl: "",
      weekSchedule: ["Monday", "Wednesday", "Friday"],
      picture: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      startCreateCourse(async () => {
        const uploadedImage = await uploadImage(values.picture, accessToken);
        if (uploadedImage.success) {
          const response = await createCourse(
            {
              ...values,
              price: values.price.toString(),
              monthDuration: values.monthDuration.toString(),
              picture: uploadedImage?.result?.imageUrl,
            },
            accessToken
          );
          if (!response.success || response?.result?.message) {
            toast.error(response?.result?.message || "Create course failed");
          } else {
            toast.success("Create course successfully");
            form.reset();
            setOpen(false);
          }
        } else {
          toast.error("Upload picture of Course failed");
        }
      });
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(!open);
        form.reset();
      }}
    >
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
              <TimeClassField form={form} name={"endingClass"} />\
              <MeetUrlField form={form} />
              <PictureField form={form} />
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={isPending}>
                Create class
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateClassDialog;
