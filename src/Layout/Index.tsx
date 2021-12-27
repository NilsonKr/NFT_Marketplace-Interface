import React from "react";
import { useLocation } from "react-router-dom";
import "./Index.css";
//Components
import { Box } from "@chakra-ui/react";
import { Header } from "./Header";
import { Footer } from "./Footer";

const Layout: React.FC = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <Box
      backgroundColor={isHome ? "green.200" : "white"}
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
