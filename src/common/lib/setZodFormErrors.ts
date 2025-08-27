import { FormInstance } from "antd";
import { ZodError } from "zod";

export function setZodFormErrors<T extends object>(
  zodError: ZodError<T>,
  formInstance: FormInstance<T>
) {
  const errors = zodError.flatten().fieldErrors;

  const fields = Object.entries(errors).map(([key, messages]) => ({
    name: key,
    errors: messages ?? [],
  }));

  // @ts-expect-errors formInstance set to dynamic so its expects the name field to be a NamePath
  formInstance.setFields(fields);
}
