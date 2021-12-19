import { useWeb3React } from "@web3-react/core";
import { useState, useEffect } from "react";
import useCrazyPunks from "../Hooks/useCrazyPunks";

export const Home = () => {
  const { active } = useWeb3React();
  const [maxSupply, setMaxSupply] = useState<number>(0);
  const CrazyPunks = useCrazyPunks();

  const getMaxSupply = async () => {
    if (CrazyPunks) {
      const result = await CrazyPunks.methods.maxSupply().call();

      console.log(result);
      setMaxSupply(result);
    }
  };

  useEffect(() => {
    getMaxSupply();
  }, [active]);

  return (
    <div>
      <h2>Hello , Welcome to the Home page, your account</h2>
      <p>The max supply of CrazyPunks is of {maxSupply}</p>
    </div>
  );
};
