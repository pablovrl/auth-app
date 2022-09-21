import type { GetServerSideProps, NextPage } from "next";
import { getCookie, verifyToken } from "../../utils/auth";
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Button,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CreatedBy } from "../components/CreatedBy";

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

type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  type: string;
  phone: string;
};

const Home: NextPage<HomeProps> = ({ userId }) => {
  const [user, setUser] = useState<User>({
    _id: "",
    name: "",
    email: "",
    password: "",
    type: "",
    phone: "",
  });

  useEffect(() => {
    axios
      .get(`/api/user/${userId}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }, [userId]);

  return (
    <>
      <Navbar name={user.name} />
      <Container pt={20} pb={5} maxW={{ md: "container.lg" }}>
        <Flex flexDir={"column"} alignItems="center">
          <Heading mb={4}>Personal info</Heading>
          <Text>Basic info, like your name and photo</Text>
        </Flex>
        <Box
          mt={10}
          border={{ md: "1px" }}
          borderRadius={"3xl"}
          borderColor={{ md: "gray.100" }}
          px={{ md: 16 }}
          py={{ md: 8 }}
        >
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
                <Button variant="outline" w={{ base: "100%", md: "36" }}>
                  Edit
                </Button>
              </GridItem>
            </Grid>
          </Flex>
          <ProfileInfo label="photo">
            <Box bgColor={"gray.300"} w={"20"} h={20} />
          </ProfileInfo>
          <ProfileInfo label="name">
            <Text>{user.name}</Text>
          </ProfileInfo>
          <ProfileInfo label="email">
            <Text>{user.email}</Text>
          </ProfileInfo>
          <ProfileInfo label="password">
            <Text>********</Text>
          </ProfileInfo>
          <ProfileInfo label="phone">
            <Text>{user.phone}</Text>
          </ProfileInfo>
        </Box>
        <CreatedBy />
      </Container>
    </>
  );
};
export default Home;
