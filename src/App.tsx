import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Home } from "./Pages/Home";
import { connector } from "./Config/Web3/Index";

export const App = () => {
  const { active, activate, account } = useWeb3React();

  useEffect(() => {
    activate(connector).then(console.log);
  }, []);

  console.log(active);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home account={account} />} />
      </Routes>
    </BrowserRouter>
  );
};
