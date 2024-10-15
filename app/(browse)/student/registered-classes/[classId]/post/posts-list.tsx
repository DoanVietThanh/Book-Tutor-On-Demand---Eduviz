import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageCircle, Send, Share, ThumbsUp } from "lucide-react";
import Image from "next/image";

const PostsList = () => {
  return (
    <div className="space-y-4">
      {Array.from({ length: 10 }).map((_, index) => (
        <div className="bg-white p-4 mx-12 rounded-md shadow-md" key={index}>
          <section className="flex gap-4">
            <Avatar>
              <AvatarImage
                src="https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/326718942_3475973552726762_6277150844361274430_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=u23tyRO5QvkQ7kNvgF95RDK&_nc_ht=scontent.fsgn5-10.fna&oh=00_AYDw0tB6L0p4Gy7GcoPH2nFZyssjpP_IUCDVrwFazZhnIw&oe=66CE53EC"
                alt="User Avatar"
              />
              <AvatarFallback>T</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="font-semibold">Thanh Đoàn</p>
              <p className="text-sm">4 days ago</p>
            </div>
          </section>

          {/* Content post  */}
          <section>
            <p className="my-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti ducimus quod adipisci quisquam maiores
              dolores officiis quasi ab commodi repudiandae illum culpa itaque quis sint, dolorum dicta reprehenderit!
              Voluptatem, praesentium.
            </p>
            <div className="flex justify-center">
              <div className="relative w-full h-64">
                <Image
                  src="https://gamek.mediacdn.vn/thumb_w/690/133514250583805952/2022/10/18/avatar1666085630103-1666085632738143853380.jpg"
                  alt="Avatar"
                  layout="fill"
                  objectFit="contain" // You can also use "contain", "cover", "scale-down", etc.
                />
              </div>
            </div>
          </section>

          <section className="container mt-4 border-t-2 pt-4">
            <div className="flex items-center justify-between gap-4 text-sm">
              <p className="flex gap-2 items-center">
                456 <ThumbsUp size={16} color="blue" />
              </p>
              <div className="flex gap-4">
                <p className="flex gap-2 items-center">
                  18 <MessageCircle size={16} color="gray" />
                </p>
                <p className="flex gap-2 items-center">
                  14 <Share size={16} color="gray" />
                </p>
              </div>
            </div>
            <div className="flex items-center gap-20 pt-4">
              <Button variant={"secondary"} className="flex-1 text-gray-600 flex items-center gap-4 font-semibold ">
                <ThumbsUp size={20} color="gray" /> Thích
              </Button>
              <Button variant={"secondary"} className="flex-1 text-gray-700 flex items-center gap-4 font-semibold">
                <MessageCircle size={20} color="gray" /> Bình luận
              </Button>
              <Button variant={"secondary"} className="flex-1 text-gray-600 flex items-center gap-4 font-semibold">
                <Send size={20} color="gray" /> Gửi
              </Button>
            </div>
          </section>
        </div>
      ))}
    </div>
  );
};

export default PostsList;
