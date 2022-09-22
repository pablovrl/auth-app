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
  placeholder?: string;
};

export const ValidatedInput = ({
  name,
  validate,
  label,
  errors,
  touched,
  type,
  placeholder,
}: ValidatedInputProps) => {
  return (
    <Field name={name} validate={validate}>
      {({ field }: any) => (
        <FormControl isRequired>
          <FormLabel>{label}</FormLabel>
          <Input
            {...field}
            type={type ? type : "text"}
            placeholder={placeholder}
          />
          {errors && touched && <ErrorMessage>{errors}</ErrorMessage>}
        </FormControl>
      )}
    </Field>
  );
};
