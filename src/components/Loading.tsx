import { Flex, Spinner } from "@chakra-ui/react";
const Loading = () => (
  <Flex justifyContent="center" alignItems="center" minH="100vh">
    <Spinner size={"xl"} />
  </Flex>
);

export default Loading;
