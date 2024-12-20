"use client";
import { signupUser } from "@/actions/auth/signup";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z
  .object({
    name: z.string().min(3, { message: "Name must be at least 3 characters." }),
    email: z.string().email({ message: "Please provide a valid email." }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"], // Specify the path for the error message
    message: "Passwords do not match.",
  });

const SignupPage = () => {
  const router = useRouter();
  const [isPending, startSignup] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startSignup(async () => {
      try {
        const res = await signupUser({ name: values.name, email: values.email, password: values.password });
        if (!res.success) {
          toast.error(res?.result?.message || "Signup failed");
          return;
        }
        toast.success("Sign-up successfully");
        form.reset();
        router.push("/signin");
      } catch (error) {
        console.log(error);
      }
    });
  }

  return (
    <div className="h-[100vh] w-[100vw] overflow-hidden flex justify-center items-center bg-[url('/assets/background.jpg')] bg-cover bg-center">
      {/* Đoạn phủ để làm mờ background */}
      <div className="absolute top-0 left-0 w-full h-full backdrop-blur-md"></div>
      <div className="relative w-1/2 border min-h-[460px] p-4 rounded-lg shadow-lg bg-white bg-opacity-80 z-10">
        <div className="flex flex-col items-center justify-center py-4">
          <Image src="/assets/logo.png" alt="logo" width={100} height={100} className="rounded-md" />
          <Link href="/home" className="text-3xl font-semibold my-4 text-blue-700 cursor-pointer">
            Welcome to EduViz
          </Link>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full px-10">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-4 text-xl">
                      <FormLabel className="flex-1 text-lg font-semibold">Username</FormLabel>
                      <FormControl className="w-[70%]">
                        <Input placeholder="Enter username here" {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
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

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-4 text-xl">
                      <FormLabel className="flex-1 text-lg font-semibold">Confirm Password</FormLabel>
                      <FormControl className="w-[70%]">
                        <Input type="password" placeholder="******" {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-center font-semibold">
                If you have an account, please{" "}
                <Link href="/signin" className="text-blue-500 uppercase">
                  log in
                </Link>
              </div>
              <Button type="submit" disabled={isPending} className="w-full uppercase">
                Sign Up
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
