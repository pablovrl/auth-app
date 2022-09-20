import { Text } from "@chakra-ui/react";

export const ErrorMessage = ({ children }: { children: string }) => (
  <Text mt={2} fontSize="sm" color="red.500">
    {children}
  </Text>
);
