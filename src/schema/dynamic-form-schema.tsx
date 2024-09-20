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

const educationSchema = z.discriminatedUnion("educationLevel", [
  z.object({
    educationLevel: z.literal("noFormalEducation"),
  }),
  z.object({
    educationLevel: z.literal("highSchoolDiploma"),
    schoolName: z
      .string({
        required_error: "Please enter the highschool name.",
        invalid_type_error: "Please enter the highschool name.",
      })
      .min(1, {
        message: "Please enter the highschool name.",
      }),
  }),
  z.object({
    educationLevel: z.literal("bachelorsDegree"),
    universityName: z
      .string({
        required_error: "Please enter the university name.",
        invalid_type_error: "Please enter the university name.",
      })
      .min(1, {
        message: "Please enter the university name.",
      }),
  }),
]);

const languageKnowledgeSchema = z.discriminatedUnion(
  "languageKnowledge",
  [
    z.object({
      languageKnowledge: z.literal(true),
      languages: z.array(
        z.object({
            name: z.string().min(1, {
                message: "Please enter the language."
            })
        })
      )
    }),
    z.object({
      languageKnowledge: z.literal(false),
    }),
  ]
);

const dynamicFormSchema = z.object({
    fullName: z.string().min(1, {
        message: "Please enter the fullname."
    })
}).and(workExperienceSchema).and(languageKnowledgeSchema).and(educationSchema)

type DynamicFormSchema = z.infer<typeof dynamicFormSchema>

const dynamicFormSchemaDefaultValues: DynamicFormSchema = {
    fullName: "",
    hasWorkExperience: false,
    languageKnowledge: false,
    educationLevel: 'noFormalEducation'
}

export { dynamicFormSchema, type DynamicFormSchema, dynamicFormSchemaDefaultValues }