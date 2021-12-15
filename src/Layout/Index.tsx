import React from "react";
import "./Index.css";
//Components
import { Box } from "@chakra-ui/react";
import { Header } from "./Header";
import { Footer } from "./Footer";

const Layout: React.FC = ({ children }) => {
  return (
    <Box position={"relative"} minH="100vh">
      <Header />
      {children}
      <Footer />
    </Box>
  );
};

export default Layout;
