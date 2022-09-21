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
import React from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = getCookie(context);
  const payload = verifyToken(token);
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
      user: payload,
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
  user: {
    _id: string;
    email: string;
    type: string;
  };
};

const Home: NextPage<HomeProps> = ({ user }) => {
  return (
    <>
      <Navbar />
      <Container pt={20} pb={5} maxW={{ md: "container.md" }}>
        <Flex flexDir={"column"} alignItems="center">
          <Heading mb={2}>Personal Info</Heading>
          <Text>Basic info, like your name and photo</Text>
        </Flex>
        <Flex mt={10} alignItems="center">
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
          <Text>John Doe</Text>
        </ProfileInfo>
        <ProfileInfo label="email">
          <Text>example@example.com</Text>
        </ProfileInfo>
        <ProfileInfo label="password">
          <Text>********</Text>
        </ProfileInfo>
        <ProfileInfo label="phone">
          <Text>9 5685 6577</Text>
        </ProfileInfo>
      </Container>
    </>
  );
};
export default Home;
