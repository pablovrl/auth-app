import {
  Container,
  Box,
  Flex,
  Menu,
  Heading,
  MenuItem,
  MenuButton,
  MenuList,
  HStack,
  Text,
} from "@chakra-ui/react";
import { logout } from "../../utils/auth";
import ProfileImage from "./ProfileImage";

const Navbar = ({ name, photo }: { name: string; photo: string }) => {
  return (
    <Box
      as="nav"
      position={"fixed"}
      zIndex={1}
      py={4}
      w="100%"
      bgColor={"white"}
    >
      <Container maxW={"container.lg"}>
        <Flex justifyContent={"space-between"} w="100%">
          <Heading fontSize={"lg"}>Auth-App</Heading>
          <Menu>
            <MenuButton>
              <HStack>
                <ProfileImage photo={photo} size="30px" />
                <Text fontSize={"sm"}>{name}</Text>
              </HStack>
            </MenuButton>
            <MenuList>
              <MenuItem>My profile</MenuItem>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Container>
    </Box>
  );
};
export default Navbar;
