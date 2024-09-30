"use client";
import { getPremiumPackage } from "@/actions/payment/get-premium-package";
import { upgradePremiumAccount } from "@/actions/payment/upgrade-premium-account";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuthContext } from "@/context/auth-provider";
import { PremiumPackageInfo } from "@/types/payment";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowBigUp, PlusCircle, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export type FormRequest = {
  monthDuration: number;
};

export type FormReturn = UseFormReturn<FormRequest, any, undefined>;

const formSchema = z.object({
  monthDuration: z.number().min(1, { message: "Month duration must be at least 1 month." }),
});

const UpgradePremiumDialog = () => {
  const { user, accessToken } = useAuthContext();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [premiumPackages, setPremiumPackages] = useState<PremiumPackageInfo[]>([]);
  const [isPending, startUpgradePremium] = useTransition();

  const form: FormReturn = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      monthDuration: 1,
    },
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getPremiumPackage();
        setPremiumPackages(res?.premiumPackageInfos);
      } catch (error: any) {
        toast.error(error.message || "Something went wrong");
      }
    }
    fetchData();
  }, [open]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startUpgradePremium(async () => {
      try {
        const res = await upgradePremiumAccount(
          { mentorDetailID: user.mentorId, monthDuration: values.monthDuration },
          accessToken
        );

        if (!res.success) {
          toast.error(res?.result?.message || "Upgrade Premium Account failed");
          return;
        }
        setOpen(false);
        toast.success("Upgrade Premium Account successfully");
        router.push(res?.result?.paymentLink);
      } catch (error: any) {
        toast.error(error.message || "Something went wrong");
      }
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(!open);
        form.reset();
      }}
    >
      <Button asChild variant={"default"}>
        <DialogTrigger className="flex items-center gap-4">
          <Star color="yellow" fill="yellow" /> Upgrade Account <Star color="yellow" fill="yellow" />
        </DialogTrigger>
      </Button>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] m-8">
        <DialogHeader>
          <DialogTitle>Upgrade Account</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
            <Select onValueChange={(value) => form.setValue("monthDuration", parseInt(value))}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Premium Package" className="w-full" />
              </SelectTrigger>
              {premiumPackages && (
                <SelectContent>
                  {premiumPackages?.map((premiumPackage) => (
                    <SelectItem key={premiumPackage.packageName} value={premiumPackage.monthDuraion.toString()}>
                      {premiumPackage.packageName}
                    </SelectItem>
                  ))}
                </SelectContent>
              )}
            </Select>

            <div className="flex justify-end mt-8">
              <Button type="submit" variant={"outline"} disabled={isPending}>
                <ArrowBigUp className="mr-2 h-8 w-8" /> Upgrade Account
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpgradePremiumDialog;
