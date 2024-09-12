"use client";
import { Button } from "@/components/ui/button";
import { Download, PlusCircle } from "lucide-react";
import React, { useState } from "react";
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

const TutorQuizesList = () => {
  const [numQuestions, setNumQuestions] = useState<number>(10);

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
        ...answers
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
            <div>
              <div className="flex items-center gap-4">
                <Label htmlFor="file-upload" className="text-nowrap">
                  Upload
                </Label>
                <Input id="file-upload" type="file" className="w-full" />
              </div>
              <Button
                variant={"destructive"}
                onClick={() => {}}
                className="mt-4 w-full flex items-center justify-center gap-4"
              >
                Create Quiz
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </section>
      <section className="py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {Array.from({ length: 8 }).map((_, index) => (
            <Link
              href={`/tutor/quizes-list/${index + 1}`}
              key={index}
              className="text-sm bg-white p-4 rounded-md shadow-lg cursor-pointer"
            >
              <p className="font-semibold">Quiz Name {index + 1}</p>
              <p className="text-sm text-green-500">
                {1 + Math.floor(Math.random() * 50)} questions - {1 + Math.floor(Math.random() * 50)} minutes
              </p>
              <p>Done: {1 + Math.floor(Math.random() * 50)} / 50 students </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TutorQuizesList;
