import type { GetServerSideProps, NextPage } from "next";
import { getCookie, verifyToken } from "../../utils/auth";
import ProfileCard from "../components/ProfileCard";
import ProfileLayout from "../components/ProfileLayout";
import { useEffect, useRef, useState } from "react";
import { User } from "../../types/User";
import {
  Heading,
  Text,
  Link as ChakraLink,
  Box,
  VStack,
  Button,
  Flex,
  Input,
} from "@chakra-ui/react";
import Loading from "../components/Loading";
import axios from "axios";
import Link from "next/link";
import { Formik, Form } from "formik";
import { ValidatedInput } from "../components/ValidatedInput";
import {
  validateEmail,
  validatePassword,
  validateName,
  validatePhone,
} from "../../utils/validations";
import ProfileImage from "../components/ProfileImage";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = getCookie(context);
  const payload: any = verifyToken(token);

  if (!payload) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      userId: payload._id,
    },
  };
};

type EditProps = {
  userId: string;
};

const Edit: NextPage<EditProps> = ({ userId }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User>({
    _id: "",
    name: "",
    email: "",
    password: "",
    type: "",
    phone: "",
    photo: "",
  });
  let image: File | null = null;

  async function getUserData() {
    setIsLoading(true);
    const { data } = await axios.get(`/api/user/${userId}`);
    setUser(data);
    setIsLoading(false);
  }

  const uploadNewImage = async () => {
    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      try {
        setIsLoading(true);
        await axios.post("/api/upload", formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });
        setIsLoading(false);
        getUserData();
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      image = e.target.files[0];
      uploadNewImage();
    }
  };

  useEffect(() => {
    getUserData();
  }, [userId]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ProfileLayout username={user.name} photo={user.photo}>
      <Box mt={{ md: 8 }}>
        <Link href={"/"}>
          <ChakraLink fontSize={"xl"} color={"blue.500"}>
            Back
          </ChakraLink>
        </Link>
      </Box>
      <ProfileCard mt={2}>
        <Heading mb={1}>Change Info</Heading>
        <Text color="gray.500">
          Changes will be reflected to every services
        </Text>
        <Flex mt={4} alignItems="center">
          <ProfileImage photo={user.photo} size="100px" />
          <Input
            name="myImage"
            ref={inputRef}
            type="file"
            hidden
            onChange={handleImageChange}
          />
          <Button
            onClick={() => inputRef.current?.click()}
            variant={"outline"}
            ml={10}
          >
            CHANGE PHOTO
          </Button>
        </Flex>
        <Formik
          onSubmit={() => {}}
          initialValues={{
            email: user.email,
            password: "",
            name: user.name,
            phone: user.phone,
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <VStack w={{ base: "full", md: "60%" }} spacing={8} mt={8}>
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
                  w="40"
                  alignSelf={"flex-start"}
                  colorScheme={"twitter"}
                  type="submit"
                >
                  Save
                </Button>
              </VStack>
            </Form>
          )}
        </Formik>
      </ProfileCard>
    </ProfileLayout>
  );
};

export default Edit;
