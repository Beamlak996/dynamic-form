import { z } from "zod"

export const dynamicFormSchema = z.object({
    fullName: z.string().min(1, {
        message: "Please enter your name."
    })
})

export type DynamicFormSchema = z.infer<typeof dynamicFormSchema>

export const dynamicFormSchemaDefaultValues: DynamicFormSchema = {
    fullName: ""
}