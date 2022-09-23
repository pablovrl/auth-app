import type { GetServerSideProps, NextPage } from "next";
import { getCookie, verifyToken } from "../../utils/auth";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import ProfileLayout from "../components/ProfileLayout";
import ProfileCard from "../components/ProfileCard";
import { User } from "../../types/User";
import Loading from "../components/Loading";
import ProfileImage from "../components/ProfileImage";
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

const ProfileInfo = ({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) => (
  <Flex
    borderBottom={"1px"}
    borderColor="gray.200"
    justifyContent={"space-between"}
    alignItems="center"
    py={8}
    minH={24}
  >
    <Text color="gray.400">{label.toUpperCase()}</Text>
    {children}
  </Flex>
);

type HomeProps = {
  userId: string;
};

const Home: NextPage<HomeProps> = ({ userId }) => {
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

  useEffect(() => {
    async function getUserData() {
      setIsLoading(true);
      const { data } = await axios.get(`/api/user/${userId}`);
      setUser(data);
      setIsLoading(false);
    }
    getUserData();
  }, [userId]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <ProfileLayout username={user.name} photo={user.photo}>
        <Flex flexDir={"column"} alignItems="center">
          <Heading mb={4}>Personal info</Heading>
          <Text>Basic info, like your name and photo</Text>
        </Flex>
        <ProfileCard mt={10}>
          <Flex alignItems="center">
            <Grid templateColumns="repeat(3, 1fr)" gap={4} w="full">
              <GridItem colSpan={2}>
                <Heading mb={1}>Profile</Heading>
                <Text color="gray.500">
                  Some info may be visible to other people
                </Text>
              </GridItem>
              <GridItem
                colSpan={1}
                display="flex"
                alignItems={"center"}
                justifyContent="flex-end"
              >
                <Link href={"/edit"}>
                  <Button variant="outline" w={{ base: "100%", md: "36" }}>
                    Edit
                  </Button>
                </Link>
              </GridItem>
            </Grid>
          </Flex>
          <ProfileInfo label="photo">
            <ProfileImage photo={user.photo} size="100px" />
          </ProfileInfo>
          <ProfileInfo label="name">
            <Text>{user.name}</Text>
          </ProfileInfo>
          <ProfileInfo label="email">
            <Text>{user.email}</Text>
          </ProfileInfo>
          <ProfileInfo label="password">
            <Text>************</Text>
          </ProfileInfo>
          <ProfileInfo label="phone">
            <Text>{user.phone}</Text>
          </ProfileInfo>
        </ProfileCard>
      </ProfileLayout>
    </>
  );
};
export default Home;
