// import { useEffect } from "react";
// import { useWeb3React } from "@web3-react/core";
import { Routes, Route, BrowserRouter } from "react-router-dom";
// import { connector } from "./Config/Web3/Index";

import { Home } from "./Pages/Home";
import { Gallery } from "./Pages/Gallery";
import Layout from "./Layout/Index";

export const App = () => {
  // const { active, activate, account } = useWeb3React();

  // useEffect(() => {
  //   activate(connector).then(console.log);
  // }, [activate]);

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
