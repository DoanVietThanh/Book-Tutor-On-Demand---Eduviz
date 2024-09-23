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
        <FormItem>
          <div className="flex items-center justify-between gap-4">
            <FormLabel className="text-nowrap">Price</FormLabel>
            <FormControl>
              <Input
                {...field}
                className="flex-1"
                type="number"
                min={10000}
                defaultValue={11000}
                onChange={field.onChange}
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PriceField;
