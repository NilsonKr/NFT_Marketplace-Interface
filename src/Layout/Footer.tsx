import { Box, Flex, Text, Link } from "@chakra-ui/react";
import { ReactComponent as Wave } from "../assets/Wave.svg";

export const Footer = () => {
  return (
    <Box
      className="container"
      position={"absolute"}
      bottom={"0"}
      px={"0"}
      width={"100%"}
      // minH={{ base: 250, lg: 500, xl: 900 }}
      // borderTop={"1px solid #ececec"}
    >
      <Flex w="100%" alignItems={"end"}>
        <Wave style={{ position: "absolute" }}></Wave>
        <Flex
          h="60%"
          w="100%"
          justify={"space-between"}
          align={"center"}
          px={24}
        >
          <Text color="gray.500" zIndex={1}>
            Made with 💚 by NilsonKr
          </Text>
          <Text color="gray.500" zIndex={1}>
            <Link href="https://getavataaars.com" color="green.400">
              Avatars
            </Link>{" "}
            Designed by{" "}
            <Link href="https://twitter.com/pablostanley" color="green.400">
              Pablo Stanley 🎨
            </Link>
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};
