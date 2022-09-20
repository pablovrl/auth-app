import React from "react";
import { Box, Container } from "@chakra-ui/react";

export const FormCard = ({ children }: { children: React.ReactNode }) => (
  <Container
    maxW="container.lg"
    minH="100vh"
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <Box
      w={"xl"}
      border="2px"
      p={10}
      borderRadius="3xl"
      borderColor={"gray.100"}
    >
      {children}
    </Box>
  </Container>
);
