import { Box, Container } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import CreatedBy from "./CreatedBy";
type ProfileLayoutProps = {
  children: React.ReactNode;
  username: string;
  photo: string;
};
const ProfileLayout = ({ children, username, photo }: ProfileLayoutProps) => {
  return (
    <Box>
      <Navbar name={username} photo={photo} />
      <Container pt={20} pb={5} maxW={{ md: "container.lg" }}>
        {children}
        <CreatedBy />
      </Container>
    </Box>
  );
};

export default ProfileLayout;
