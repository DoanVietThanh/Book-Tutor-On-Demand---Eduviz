import CreatePostDialog from "@/components/dialogs/create-post-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Images, Laugh, Video } from "lucide-react";

const CreatePost = () => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <div className="flex items-center gap-4 border-b-2 pb-4">
        <Avatar>
          <AvatarImage
            src="https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/326718942_3475973552726762_6277150844361274430_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=u23tyRO5QvkQ7kNvgF95RDK&_nc_ht=scontent.fsgn5-10.fna&oh=00_AYDw0tB6L0p4Gy7GcoPH2nFZyssjpP_IUCDVrwFazZhnIw&oe=66CE53EC"
            alt="User Avatar"
          />
          <AvatarFallback>T</AvatarFallback>
        </Avatar>
        <CreatePostDialog />
      </div>
      <div className="flex gap-40 mt-4 mx-14">
        <Button variant={"secondary"} className="flex-1 flex items-center gap-4">
          <Video size={26} color="red" /> Video trực tiếp
        </Button>
        <Button variant={"secondary"} className="flex-1 flex items-center gap-4">
          <Images size={26} color="green" /> Ảnh / Video
        </Button>
        <Button variant={"secondary"} className="flex-1 flex items-center gap-4">
          <Laugh size={26} color="orange" /> Cảm xúc / hoạt động
        </Button>
      </div>
    </div>
  );
};

export default CreatePost;
