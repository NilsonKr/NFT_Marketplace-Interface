import { useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Home } from "./Pages/Home";
// import Web3 from "web3";

export const App = () => {
  useEffect(() => {
    //   if (window.ethereum) {
    //     // window.ethereum
    //     //   .request({
    //     //     method: "eth_requestAccounts",
    //     //   })
    //     //   .then(console.log);
    //     const web3 = new Web3(window.ethereum);
    //     // web3.eth.requestAccounts().then((accs) => console.log(accs));
    //   }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};
