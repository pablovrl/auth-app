import {
  Container,
  Box,
  Flex,
  Menu,
  Heading,
  MenuItem,
  MenuButton,
  MenuList,
} from "@chakra-ui/react";
const Navbar = () => {
  return (
    <Box as="nav" position={"fixed"} zIndex={1} py={2} w="100%">
      <Container maxW={"container.lg"}>
        <Flex justifyContent={"space-between"} w="100%">
          <Heading fontSize={"lg"}>Auth-App</Heading>
          <Menu>
            <MenuButton>John Doe</MenuButton>
            <MenuList>
              <MenuItem>My profile</MenuItem>
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Container>
    </Box>
  );
};
export default Navbar;
