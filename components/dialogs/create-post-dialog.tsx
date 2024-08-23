"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAuthContext } from "@/context/auth-provider";
import { Textarea } from "../ui/textarea";

const CreatePostDialog = () => {
  const { user } = useAuthContext();

  if (!user) {
    return null;
  }

  return (
    <div className="flex-1">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full flex justify-start gap-2">
            <span className="font-bold">{user.name} </span>
            <span>bạn đang nghĩ gì thế ?</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] md:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Tạo bài post</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea placeholder="Bạn đang nghĩ gì thế ?" />
            <Input type="file" />
          </div>
          <DialogFooter>
            <Button type="submit">Đăng bài</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreatePostDialog;
