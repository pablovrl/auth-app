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
  useToast,
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
  const toast = useToast();
  const handleSubmit = async (values: FormInputs) => {
    const email = values.email;
    const password = values.password;
    if (email && password) {
      try {
        const { data } = await axios.post("/api/login", { email, password });
        if (data.token) {
          Cookies.set("token", data.token);
          router.push("/");
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Invalid email or password",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <FormCard>
      <Heading mb={10}>Login</Heading>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched, values }) => (
          <Form>
            <VStack spacing={8}>
              <ValidatedInput
                name="email"
                label="Email"
                validate={validateEmail}
                errors={errors.email}
                touched={touched.email}
                placeholder="example@gmail.com"
              />
              <ValidatedInput
                name="password"
                label="Password"
                validate={() => validatePassword(values.password, true)}
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
