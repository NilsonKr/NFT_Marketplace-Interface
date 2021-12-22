import React from "react";
import "./Index.css";
//Components
import { Box } from "@chakra-ui/react";
import { Header } from "./Header";
import { Footer } from "./Footer";

const Layout: React.FC = ({ children }) => {
  return (
    <Box
      backgroundColor="green.200"
      position={"relative"}
      minH="100vh"
      zIndex={"1"}
    >
      <Header />
      {children}
      <Footer />
    </Box>
  );
};

export default Layout;
