import React from "react";
import { Flex, Text, Box, Container } from "@chakra-ui/react";

export const FormCard = ({ children }: { children: React.ReactNode }) => (
  <Container
    maxW={{ md: "container.lg" }}
    minH="100vh"
    display="flex"
    alignItems={{ md: "center" }}
    justifyContent="center"
  >
    <Flex flexDirection={"column"}>
      <Box
        w={{ base: "full", md: "xl" }}
        border={{ base: "0px", md: "2px" }}
        p={{ base: 4, md: 10 }}
        borderColor={{ md: "gray.100" }}
        borderRadius="3xl"
      >
        {children}
      </Box>
      <Text mt={2} color={"gray.400"} fontSize="sm">
        created by Pablo Villarroel ;)
      </Text>
    </Flex>
  </Container>
);
