import type { NextPage } from "next";
import { FormCard } from "../components/FormCard";
import {
  Heading,
  VStack,
  Text,
  Button,
  Link as ChakraLink,
} from "@chakra-ui/react";
import Link from "next/link";
import { Formik, Form } from "formik";
import { validateEmail, validatePassword } from "../../utils/validations";
import { ValidatedInput } from "../components/ValidatedInput";

const Register: NextPage = () => {
  const handleSubmit = async () => {};
  return (
    <FormCard>
      <Heading mb={10}>Register</Heading>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{ email: "", password: "", name: "", phone: "" }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <VStack spacing={8}>
              <ValidatedInput
                name="email"
                label="Email"
                validate={validateEmail}
                errors={errors.email}
                touched={touched.email}
              />
              <ValidatedInput
                name="password"
                label="Password"
                validate={validatePassword}
                errors={errors.password}
                touched={touched.password}
                type="password"
              />
              <ValidatedInput
                name="name"
                label="Full Name"
                validate={validatePassword}
                errors={errors.name}
                touched={touched.name}
              />
              <ValidatedInput
                name="phone"
                label="Phone"
                validate={validatePassword}
                errors={errors.phone}
                touched={touched.phone}
              />
              <Button
                isLoading={isSubmitting}
                w="full"
                colorScheme={"twitter"}
                type="submit"
              >
                Register
              </Button>
              <Text>
                Already have an account?{" "}
                <Link href={"/login"}>
                  <ChakraLink color="blue.500">Log in</ChakraLink>
                </Link>
              </Text>
            </VStack>
          </Form>
        )}
      </Formik>
    </FormCard>
  );
};
export default Register;
