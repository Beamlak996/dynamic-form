import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DynamicFormSchema,
  dynamicFormSchema,
  dynamicFormSchemaDefaultValues,
} from "@/schema/dynamic-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const DynamicForm = () => {
  const form = useForm<DynamicFormSchema>({
    mode: "all",
    resolver: zodResolver(dynamicFormSchema),
    defaultValues: dynamicFormSchemaDefaultValues,
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
            </div>
            <Button>Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
