import { Box, Heading } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Box
      className="container"
      position={"absolute"}
      bottom={"0"}
      borderTop={"1px solid #ececec"}
    >
      <Heading as="h1" size="lg">
        CrazyPunks Footer
      </Heading>
    </Box>
  );
};
