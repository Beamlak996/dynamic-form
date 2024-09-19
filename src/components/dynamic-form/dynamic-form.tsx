import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  DynamicFormSchema,
  dynamicFormSchema,
  dynamicFormSchemaDefaultValues,
} from "@/schema/dynamic-form-schema";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const DynamicForm = () => {
  const form = useForm<DynamicFormSchema>({
    mode: "all",
    resolver: zodResolver(dynamicFormSchema),
    defaultValues: dynamicFormSchemaDefaultValues,
  });

  const hasWorkExperience = useWatch({
    control: form.control,
    name: "hasWorkExperience",
  });

  const onSubmit = (values: DynamicFormSchema) => {
    console.log(values);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dynamic Form</CardTitle>
        <CardDescription>This is a test for dynamic forms.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                name="fullName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter the fullname" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="hasWorkExperience"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div>
                      <FormLabel>Has work experience?</FormLabel>
                      <FormDescription>
                        Please check the box if the employee has previous work
                        experience.
                      </FormDescription>
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {hasWorkExperience && (
                <FormField
                  name="companyName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter the company name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            <Button>Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
