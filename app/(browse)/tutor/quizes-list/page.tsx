"use client";
import { getCourseByMentorId } from "@/actions/course/get-course-by-mentorId";
import { createQuiz } from "@/actions/quiz/create-quiz";
import { getQuizzesByMentorId } from "@/actions/quiz/get-quizzes-by-mentorId";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuthContext } from "@/context/auth-provider";
import { getCurrentTime } from "@/lib/utils";
import { Course } from "@/types/course";
import { zodResolver } from "@hookform/resolvers/zod";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import { Download, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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
    const fetchQuizzes = async () => {
      try {
        const response = await getQuizzesByMentorId(user.mentorId, accessToken);
        const course = await getCourseByMentorId(user.mentorId, accessToken);
        setCourses(course?.result?.listRelativeCourse as Course[]);
        setQuizes(response?.result?.quizzes || []);
      } catch (error) {
        console.error("Failed to fetch courses or quizzes:", error);
      }
    };

    if (user?.mentorId && accessToken) {
      fetchQuizzes();
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
        // if (!res.success) {
        //   toast.error(res?.result.message || "Create quiz failed");
        //   return;
        // }
        toast.success("Create quiz successfully");
        form.reset();
      } catch (error) {
        console.log("🚀 ~ startCreateQuiz ~ error:", error);
        // toast.error("Something went wrong");
      }
    });
  }

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
            <p className="text-center font-semibold text-2xl text-red-700">Quizes not found</p>
          ) : (
            quizes.map((quiz: any, index) => (
              <Link
                href={`/tutor/quizes-list/${quiz.quizId}`}
                key={index}
                className="text-sm bg-white p-4 rounded-md shadow-lg cursor-pointer"
              >
                <p className="font-semibold">{quiz?.quizTitle}</p>
                <p className="text-sm text-green-500">
                  {quiz?.numOfQuestion} questions - {quiz?.duration} minutes
                </p>
                <p>
                  Done: {quiz.numOfStuAttempt} / {quiz.totalStudent} students
                </p>
              </Link>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default TutorQuizesList;
