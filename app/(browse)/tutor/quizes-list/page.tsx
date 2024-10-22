"use client";
import { Button } from "@/components/ui/button";
import { Download, PlusCircle } from "lucide-react";
import React, { useEffect, useState, useTransition } from "react";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useAuthContext } from "@/context/auth-provider";
import { toast } from "sonner";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCurrentTime } from "@/lib/utils";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Course } from "@/types/course";
import { getCourseByMentorId } from "@/actions/course/get-course-by-mentorId";
import { createQuiz } from "@/actions/quiz/create-quiz";
import { getQuizByClass } from "@/actions/quiz/get-quiz-by-class";

type CreateQuizRequest = {
  quizTitle: string;
  duration: string;
  courseId: string;
  file: File;
};

type FormReturn = UseFormReturn<CreateQuizRequest, any, undefined>;

const formSchema = z.object({
  quizTitle: z.string().min(1, { message: "Quiz title is required." }),
  duration: z.string().min(1, { message: "Duration is required." }),
  courseId: z.string().min(1, { message: "Course is required." }),
  file: z.instanceof(File, { message: "A picture is required." }),
});

const TutorQuizesList = () => {
  const { user, accessToken } = useAuthContext();
  const [numQuestions, setNumQuestions] = useState<number>(10);
  const [isCreateQuizPending, startCreateQuiz] = useTransition();
  const [courses, setCourses] = useState<Course[]>([]);
  const [quizes, setQuizes] = useState([]);

  const form: FormReturn = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quizTitle: "",
      courseId: "",
      duration: getCurrentTime(),
      file: undefined,
    },
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCourseByMentorId(user.mentorId, accessToken);
        const coursesList = response?.result?.listRelativeCourse || [];

        setCourses(coursesList);

        if (coursesList.length > 0) {
          const courseIds = coursesList.map((course: any) => course.courseId);
          const quizzesPromises = courseIds.map((courseId: string) => getQuizByClass(courseId, accessToken));

          const quizzes: any = await Promise.all(quizzesPromises);
          setQuizes(quizzes);
        } else {
          setQuizes([]);
        }
      } catch (error) {
        console.error("Failed to fetch courses or quizzes:", error);
      }
    };

    if (user?.mentorId && accessToken) {
      fetchCourses();
    }
  }, [user?.mentorId, accessToken]);

  const handleDownload = async () => {
    const questions = [];
    const answers = ["A", "B", "C", "D"].map(
      (answer) =>
        new Paragraph({
          children: [
            new TextRun({
              text: `${answer}. `,
            }),
          ],
        })
    );
    for (let i = 1; i <= numQuestions; i++) {
      questions.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `Question ${i}: `,
              bold: true,
              color: "#ff0000",
            }),
          ],
        }),
        ...answers,
        new Paragraph({ text: "Correct Answer: " })
      );
    }
    // Convert questions to docx
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: questions,
        },
      ],
    });

    // Convert document to blob
    const blob = await Packer.toBlob(doc);
    saveAs(blob, "questions.docx");
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    startCreateQuiz(async () => {
      try {
        const res = await createQuiz(values, accessToken);
        if (!res.success) {
          toast.error(res?.result.message || "Create quiz failed");
          return;
        }
        toast.success("Create quiz successfully");
        form.reset();
      } catch (error) {
        toast.error("Something went wrong");
      }
    });
  }

  console.log("🚀 ~ TutorQuizesList ~ quizes:", quizes);

  return (
    <div className="p-4 h-full bg-slate-50 overflow-y-auto">
      <section className="flex gap-4 items-center justify-end">
        <Dialog>
          <Button asChild variant={"outline"}>
            <DialogTrigger className="flex gap-2">
              <Download size={20} /> Download Quizzes Template
            </DialogTrigger>
          </Button>
          <DialogContent className="sm:max-w-[425px] md:max-w-[620px]">
            <DialogHeader>
              <DialogTitle>Download Quizzes Template</DialogTitle>
              <DialogDescription>
                Enter the number of questions you want to download, then click
                <span className="font-bold"> "Download" button.</span>
              </DialogDescription>
            </DialogHeader>
            <div>
              <div className="flex items-center gap-4">
                <Label htmlFor="num-questions" className="text-nowrap">
                  Number of questions
                </Label>
                <Input
                  id="num-questions"
                  type="number"
                  value={numQuestions}
                  className="w-24"
                  onChange={(e) => setNumQuestions(parseInt(e.target.value))}
                />
              </div>
              <Button
                variant={"secondary"}
                onClick={handleDownload}
                className="mt-4 w-full flex items-center justify-center gap-4"
              >
                <Download size={20} /> Download
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <Button asChild variant={"destructive"} className="flex gap-2">
            <DialogTrigger>
              <PlusCircle size={20} /> Create Quiz
            </DialogTrigger>
          </Button>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Select doc file to upload</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="quizTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quiz title</FormLabel>
                        <FormControl>
                          <Input placeholder="Quiz title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="courseId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course</FormLabel>
                        <FormControl>
                          <Select value={field.value} onValueChange={(value) => field.onChange(value)}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a subject name" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {courses.map((course) => (
                                  <SelectItem key={course.courseId} value={course.courseId}>
                                    {course.courseName}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-4">
                          <FormLabel className="text-nowrap">Duration</FormLabel>
                          <FormControl>
                            <Input {...field} type="time" defaultValue={field.value} onChange={field.onChange} />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-4">
                          <FormLabel className="text-nowrap">File Quiz</FormLabel>
                          <FormControl className="w-full">
                            <Input
                              type="file"
                              onChange={(event) => {
                                const file = event.target.files?.[0] || null;
                                field.onChange(file);
                              }}
                              className="w-full"
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end">
                    <Button type="submit" disabled={isCreateQuizPending}>
                      Submit
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </DialogContent>
        </Dialog>
      </section>

      <section className="py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {quizes.length == 0 ? (
            <p className="text-center font-semibold text-2xl text-red-700">No quizes found</p>
          ) : (
            quizes.map((quiz: any, index) => (
              <Link
                href={`/tutor/quizes-list/${quiz.quizId}`}
                key={index}
                className="text-sm bg-white p-4 rounded-md shadow-lg cursor-pointer"
              >
                <p className="font-semibold">Quiz Name {index + 1}</p>
                <p className="text-sm text-green-500">
                  {1 + Math.floor(Math.random() * 50)} questions - {1 + Math.floor(Math.random() * 50)} minutes
                </p>
                <p>Done: {1 + Math.floor(Math.random() * 50)} / 50 students </p>
              </Link>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default TutorQuizesList;
