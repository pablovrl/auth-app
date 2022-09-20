import type { NextPage } from "next";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";
import { Formik, Form } from "formik";
import {
  Heading,
  Button,
  VStack,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import Link from "next/link";
import { validateEmail, validatePassword } from "../../utils/validations";
import { FormCard } from "../components/FormCard";
import { ValidatedInput } from "../components/ValidatedInput";

interface FormInputs {
  email: string;
  password: string;
}

const Login: NextPage = () => {
  const router = useRouter();
  const handleSubmit = async ({ email, password }: FormInputs) => {
    if (email && password) {
      try {
        const { data } = await axios.post("/api/login", { email, password });
        if (data.token) {
          Cookies.set("token", data.token);
          router.push("/");
        }
      } catch (error) {
        alert("Invalid credentials");
      }
    }
  };

  return (
    <FormCard>
      <Heading mb={10}>Login</Heading>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{ email: "", password: "" }}
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
              <Button
                isLoading={isSubmitting}
                w="full"
                colorScheme={"twitter"}
                type="submit"
              >
                Login
              </Button>
              <Text>
                Don&apos;t have a account yet?{" "}
                <Link href={"/register"}>
                  <ChakraLink color="blue.500">Register</ChakraLink>
                </Link>
              </Text>
            </VStack>
          </Form>
        )}
      </Formik>
    </FormCard>
  );
};
export default Login;
