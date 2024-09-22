import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { FormReturn } from ".";

type PriceProps = {
  form: FormReturn;
};

const PriceField = ({ form }: PriceProps) => {
  return (
    <FormField
      control={form.control}
      name="price"
      render={({ field }) => (
        <FormItem className="w-1/6">
          <div className="flex items-center gap-4">
            <FormLabel className="text-nowrap">Price</FormLabel>
            <FormControl>
              <Input {...field} type="number" min={100} defaultValue={100} onChange={field.onChange} />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PriceField;
