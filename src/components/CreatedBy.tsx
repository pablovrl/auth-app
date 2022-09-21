import { Text, Link } from "@chakra-ui/react";
export const CreatedBy = () => (
  <Text
    mt={{ base: 4, md: 2 }}
    mb={{ base: 4, md: 0 }}
    color={"gray.400"}
    fontSize="sm"
  >
    created by{" "}
    <Link href="https://pablovillarroel.xyz" target="_blank" color="blue.500">
      Pablo Villarroel ;)
    </Link>
  </Text>
);
