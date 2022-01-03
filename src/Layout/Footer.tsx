import { useLocation } from "react-router-dom";
import { Box, Flex, Text, Link, Divider } from "@chakra-ui/react";
import { ReactComponent as Wave } from "../assets/Wave.svg";

export const Footer = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <footer className="footer">
      <Box w={isHome ? "100%" : "80%"} m={"0 auto"}>
        {!isHome && <Divider borderBottomWidth={2} orientation="horizontal" />}
        <Box className="container" px={0}>
          <Flex w="100%" alignItems={"end"}>
            {isHome && <Wave style={{ position: "absolute" }}></Wave>}
            <Flex
              h="60%"
              w="100%"
              justify={"space-between"}
              align={"center"}
              px={24}
            >
              <Text color="gray.500" zIndex={1}>
                Made with 💚 by
                <Link
                  target="_blank"
                  href="https://github.com/NilsonKr"
                  ml={1}
                  color="green.400"
                >
                  NilsonKr
                </Link>
              </Text>
              <Text color="gray.500" zIndex={1}>
                <Link
                  target="_blank"
                  href="https://getavataaars.com"
                  color="green.400"
                >
                  Avatars
                </Link>{" "}
                Designed by{" "}
                <Link
                  target="_blank"
                  href="https://twitter.com/pablostanley"
                  color="green.400"
                >
                  Pablo Stanley 🎨
                </Link>
              </Text>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </footer>
  );
};
