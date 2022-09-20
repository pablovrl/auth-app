import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { ErrorMessage } from "../components/ErrorMessage";
import { Field } from "formik";
import { HTMLInputTypeAttribute } from "react";

type ValidatedInputProps = {
  name: string;
  label: string;
  validate: (value: string) => string | undefined;
  errors?: string;
  touched?: boolean;
  type?: HTMLInputTypeAttribute;
};

export const ValidatedInput = ({
  name,
  validate,
  label,
  errors,
  touched,
  type,
}: ValidatedInputProps) => {
  return (
    <Field name={name} validate={validate}>
      {({ field }: any) => (
        <FormControl>
          <FormLabel>{label}</FormLabel>
          <Input {...field} type={type ? type : "text"} />
          {errors && touched && <ErrorMessage>{errors}</ErrorMessage>}
        </FormControl>
      )}
    </Field>
  );
};
