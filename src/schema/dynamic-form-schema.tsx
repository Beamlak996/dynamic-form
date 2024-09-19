import { z } from "zod"


const workExperienceSchema = z.discriminatedUnion("hasWorkExperience", [
  z.object({
    hasWorkExperience: z.literal(true),
    companyName: z
      .string({
        required_error: "Please enter the company name.",
        invalid_type_error: "Please enter the company name.",
      })
      .min(1, {
        message: "Please enter the company name.",
      }),
  }),
  z.object({
    hasWorkExperience: z.literal(false),
  }),
]);

const dynamicFormSchema = z.object({
    fullName: z.string().min(1, {
        message: "Please enter the fullname."
    })
}).and(workExperienceSchema)

type DynamicFormSchema = z.infer<typeof dynamicFormSchema>

const dynamicFormSchemaDefaultValues: DynamicFormSchema = {
    fullName: "",
    hasWorkExperience: false
}

export { dynamicFormSchema, type DynamicFormSchema, dynamicFormSchemaDefaultValues }