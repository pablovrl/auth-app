import { Box, SpaceProps, SpacerProps } from "@chakra-ui/react";
import React from "react";
const ProfileCard = ({
  children,
  mt,
}: {
  children: React.ReactNode;
  mt: number;
}) => (
  <Box
    mt={mt}
    border={{ md: "1px" }}
    borderRadius={"3xl"}
    borderColor={{ md: "gray.100" }}
    px={{ md: 16 }}
    py={{ md: 8 }}
  >
    {children}
  </Box>
);

export default ProfileCard;
