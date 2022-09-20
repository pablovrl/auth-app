import React from "react";
import { Box, Container } from "@chakra-ui/react";

export const FormCard = ({ children }: { children: React.ReactNode }) => (
  <Container
    maxW={{ md: "container.lg" }}
    minH="100vh"
    display="flex"
    alignItems={{ md: "center" }}
    justifyContent="center"
  >
    <Box
      w={{ base: "full", md: "xl" }}
      border={{ base: "0px", md: "2px" }}
      p={{ base: 4, md: 10 }}
      borderColor={{ md: "gray.100" }}
      borderRadius="3xl"
    >
      {children}
    </Box>
  </Container>
);
