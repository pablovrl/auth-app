import { Box, Image } from "@chakra-ui/react";
const ProfileImage = ({ photo, size }: { photo: string; size: any }) => {
  return (
    <Box>
      {photo ? (
        <Image
          src={"/" + photo}
          alt="profile"
          w={size}
          h={size}
          borderRadius={"20%"}
          objectFit="cover"
        />
      ) : (
        <Box borderRadius={"20%"} bgColor={"gray.300"} w={size} h={size} />
      )}
    </Box>
  );
};

export default ProfileImage;
