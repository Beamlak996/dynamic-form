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
import { BookOpen, School, GraduationCap } from "lucide-react"; 
import { ReusableRadioGroup } from "@/general/reuasable-radio-group";

const educationLevelItems = [
  {
    id: "noFormalEducation",
    label: "No Formal Education",
    description: "You haven't completed any formal education.",
    icon: <BookOpen className="h-4 w-4" />, 
  },
  {
    id: "highSchoolDiploma",
    label: "High School Diploma",
    description: "You have completed high school education.",
    icon: <School className="h-4 w-4" />, 
  },
  {
    id: "bachelorsDegree",
    label: "Bachelors Degree",
    description: "You hold a bachelor's degree from a university.",
    icon: <GraduationCap className="h-4 w-4" />, 
  },
];


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

  const educationLevel = useWatch({
    control: form.control,
    name: "educationLevel",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "languages",
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
            <div className="space-y-2">
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
              <FormField
                name="educationLevel"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Education Level</FormLabel>
                    <FormControl>
                      <ReusableRadioGroup
                        items={educationLevelItems}
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        grid={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {educationLevel === "highSchoolDiploma" && (
                <FormField
                  name="schoolName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>High School Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter the high school name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {educationLevel === "bachelorsDegree" && (
                <FormField
                  name="universityName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>University Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter the university name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
