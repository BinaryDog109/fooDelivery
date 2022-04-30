import { Button, Text } from "@chakra-ui/react";

export const ReturnButton = ({ history, ...props }) => {
  return (
    <Button
      {...props}
      textAlign={"left"}
      px={2}
      py={1}
      bg="white"
      fontSize="sm"
      fontWeight="bold"
      rounded="lg"
      textTransform="uppercase"
      _hover={{
        bg: "gray.200",
      }}
      _focus={{
        bg: "gray.400",
      }}
      onClick={() => history.goBack()}
    >
      <Text bgGradient="linear(to-r, band1.100, band2.600)" bgClip="text">
        {"< "}return
      </Text>
    </Button>
  );
};
