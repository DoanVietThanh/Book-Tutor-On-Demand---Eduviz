import { getWeekSchedule } from "@/actions/course/get-week-schedule";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { FormReturn } from ".";

type WeekScheduleProps = {
  form: FormReturn;
};

const WeekScheduleField = ({ form }: WeekScheduleProps) => {
  const [weekSchedule, setWeekSchedule] = useState<string[][]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const schedule = await getWeekSchedule();
        setWeekSchedule(schedule || []);
      } catch (error) {
        console.error("Failed to fetch week schedule:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <FormField
      control={form.control}
      name="weekSchedule"
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center justify-between gap-4">
            <FormLabel className="text-nowrap">Schedule</FormLabel>
            <FormControl>
              <Select value={JSON.stringify(field.value)} onValueChange={(value) => field.onChange(JSON.parse(value))}>
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Select a week schedule" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {weekSchedule.map((item) => (
                      <SelectItem key={JSON.stringify(item)} value={JSON.stringify(item)}>
                        {item.join(" - ")}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default WeekScheduleField;
