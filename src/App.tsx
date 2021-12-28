import { useEffect } from "react";
import { useWallet } from "./Hooks/useWallet";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import { Home } from "./Pages/Home";
import { Gallery } from "./Pages/Gallery";
import Layout from "./Layout/Index";

export const App = () => {
  const { connect } = useWallet();

  useEffect(() => {
    if (localStorage.getItem("isConnected") === "true") connect();
  }, [connect]);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Gallery />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
