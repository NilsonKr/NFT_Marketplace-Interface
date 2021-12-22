import { Box, Heading, Flex } from "@chakra-ui/react";
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
        <Wave />
      </Flex>
      {/* <img height={80} width="100%" src={Wave} alt="Footer" /> */}
      {/* <Heading as="h1" size="lg">
        CrazyPunks Footer
      </Heading> */}
    </Box>
  );
};
