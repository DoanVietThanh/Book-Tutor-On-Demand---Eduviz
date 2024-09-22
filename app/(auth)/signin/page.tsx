"use client";
import { loginUser } from "@/actions/auth/login";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthContext } from "@/context/auth-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({ message: "Please provide a valid email." }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const SigninPage = () => {
  const router = useRouter();
  const { setAccessToken } = useAuthContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "mentor1@gmail.com",
      password: "123456",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await loginUser(values);
      setAccessToken(res.accessToken);
      localStorage.setItem("accessToken", res.accessToken);
      toast.success("Login successful");
      router.push("/home");
    } catch (error: any) {
      toast.error(error.message || "An error occurred while logging in");
    }
  }

  return (
    <div className="h-[100vh] w-[100vw] overflow-hidden flex justify-center items-center bg-[url('/assets/background.jpg')] bg-cover bg-center">
      {/* Đoạn phủ để làm mờ background */}
      <div className="absolute top-0 left-0 w-full h-full backdrop-blur-md"></div>
      <div className="relative min-w-1/3 border min-h-[460px] p-4 rounded-lg shadow-lg bg-white bg-opacity-80 z-10">
        <div className="flex flex-col items-center justify-center p-8">
          <Image src="/assets/logo.png" alt="logo" width={100} height={100} className="rounded-md" />
          <Link href="/home" className="text-3xl font-semibold my-4 text-blue-700 cursor-pointer">
            Welcome to EduViz
          </Link>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-4 text-xl">
                      <FormLabel className="flex-1 text-lg font-semibold">Email</FormLabel>
                      <FormControl className="w-[70%]">
                        <Input placeholder="user@example.com" {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-4 text-xl">
                      <FormLabel className="flex-1 text-lg font-semibold">Password</FormLabel>
                      <FormControl className="w-[70%]">
                        <Input type="password" placeholder="******" {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                If you don't have an account, please{" "}
                <Link href="/signup" className="text-blue-500 uppercase">
                  sign up
                </Link>
              </div>
              <Button type="submit" className="w-full uppercase">
                Log In
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
