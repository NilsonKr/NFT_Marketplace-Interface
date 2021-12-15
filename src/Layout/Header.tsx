import { Box, Text, Link, Image } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

import Logo from "../assets/Logo.svg";

export const Header = () => {
  return (
    <Box className="container" boxShadow={"0 4px 8px rgba(0,0,0,.09)"}>
      <Image marginRight="35px" src={Logo} alt="CrazyPunks" />
      <Text className="navTab" fontWeight={"500"} fontSize={"lg"}>
        <Link
          _hover={{
            borderBottom: "0px",
            color: "black",
          }}
          as={RouterLink}
          to="/"
        >
          Home
        </Link>
      </Text>
      <Text className="navTab" fontWeight={"500"} fontSize={"lg"}>
        <Link
          _hover={{
            borderBottom: "0px",
            color: "black",
          }}
          as={RouterLink}
          to="/collection"
        >
          Punks
        </Link>
      </Text>
    </Box>
  );
};
