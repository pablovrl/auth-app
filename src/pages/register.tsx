import type { NextPage } from "next";
import { FormCard } from "../components/FormCard";
import {
  Box,
  Flex,
  Heading,
  VStack,
  Text,
  Button,
  Link as ChakraLink,
  Alert,
  AlertIcon,
  CloseButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { Formik, Form } from "formik";
import {
  validateEmail,
  validatePassword,
  validateName,
  validatePhone,
} from "../../utils/validations";
import { ValidatedInput } from "../components/ValidatedInput";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const Register: NextPage = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const router = useRouter();
  const toast = useToast();
  const handleSubmit = async ({
    name,
    email,
    password,
    phone,
  }: {
    name: string;
    email: string;
    password: string;
    phone: string;
  }) => {
    try {
      await axios.post("/api/register", { name, phone, email, password });
      const { data } = await axios.post("/api/login", { email, password });
      if (data.token) {
        toast({
          title: "Success",
          description: "You have successfully registered",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        Cookies.set("token", data.token);
        router.push("/");
      }
    } catch (error) {
      toast({
        title: "Cannot register",
        description: "Please use another email",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

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
                name="name"
                label="Name"
                validate={validateName}
                errors={errors.name}
                touched={touched.name}
                placeholder="John Doe"
              />
              <ValidatedInput
                name="phone"
                label="Phone"
                validate={validatePhone}
                errors={errors.phone}
                touched={touched.phone}
                placeholder="912345678"
              />
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
                Create account
              </Button>
              <Text>
                Already have an account?{" "}
                <Link href={"/login"}>
                  <ChakraLink color="blue.500">Login</ChakraLink>
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
