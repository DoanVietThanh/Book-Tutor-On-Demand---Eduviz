"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { toast } from "sonner";

const WelcomePage = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [title, setTitle] = useState("Welcome to EduViz");
  const [isEditing, setIsEditing] = useState(false);
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const originalTitleRef = useRef(title);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleImageClick = () => inputFileRef.current?.click();

  const handleRemoveImage = () => setSelectedImage(null);

  // Handling title input change
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsEditing(true);
  };

  // Cancel editing and reset title
  const handleCancel = () => {
    setTitle(originalTitleRef.current);
    setIsEditing(false);
  };

  // Save the current title
  const handleSave = () => {
    toast.success("Saved Title: " + title);
    originalTitleRef.current = title;
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <Button asChild variant={"outline"}>
        <Link href="/home">Welcome to EduViz</Link>
      </Button>

      <div className="flex gap-4">
        <Input placeholder="Title" className="w-full" value={title} onChange={handleTitleChange} />
        {isEditing && (
          <>
            <Button variant={"outline"} onClick={handleSave}>
              Save
            </Button>
            <Button variant={"destructive"} onClick={handleCancel}>
              Cancel
            </Button>
          </>
        )}
      </div>

      {/* Hidden input field for selecting an image */}
      <input ref={inputFileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageChange} />

      {/* Displaying the selected image or a placeholder */}
      {selectedImage ? (
        <div className="flex flex-col items-center space-y-2 relative">
          <div onClick={handleImageClick} className="cursor-pointer">
            <Image
              src={URL.createObjectURL(selectedImage)}
              alt="Selected preview"
              width={150}
              height={150}
              className="rounded border border-gray-300"
            />
          </div>
          <Trash onClick={handleRemoveImage} className="cursor-pointer z-50 absolute top-0 right-0 text-red-600">
            Remove Image
          </Trash>
        </div>
      ) : (
        <div
          onClick={handleImageClick}
          className="w-36 h-36 flex items-center justify-center border-2 rounded-2xl border-dashed border-gray-400 cursor-pointer"
        >
          <span>Select Image</span>
        </div>
      )}
    </div>
  );
};

export default WelcomePage;
