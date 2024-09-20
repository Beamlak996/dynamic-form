import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
 
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
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

  const languageKnowledge = useWatch({
    control: form.control,
    name: "languageKnowledge",
  });

  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: "languages",
  });

  const onSubmit = (values: DynamicFormSchema) => {
    console.log(values);
  };

  const handleLanguagesChange = (values: string[]) => {
    // Replace existing languages with the new values
    replace(values.map((name) => ({ name })));
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
                      <Input {...field} placeholder="Enter the full name" />
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
              <FormField
                name="languageKnowledge"
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
                      <FormLabel>Know other languages?</FormLabel>
                      <FormDescription>
                        Please check the box if the employee knows other
                        languages.
                      </FormDescription>
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {languageKnowledge && (
                <>
                  {fields.map((field, index) => (
                    <div key={field.id}>
                      <FormField
                        name={`languages.${index}.name`}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Language {index + 1}</FormLabel>
                            <FormControl>
                              <div className="flex items-center space-x-2">
                                <Input
                                  {...field}
                                  placeholder="Enter the language"
                                  className="flex-grow"
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  onClick={() => remove(index)} 
                                  className="flex-shrink-0 text-rose-500 hover:text-rose-700 hover:bg-rose-50 border-rose-200"
                                  aria-label="Remove Language"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={() => append({ name: "" })}
                    className="mt-2"
                    variant="outline"
                    size="sm"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Language
                  </Button>
                </>
              )}
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
