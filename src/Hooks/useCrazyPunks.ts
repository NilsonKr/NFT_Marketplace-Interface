import { useMemo } from "react";
import { Contract } from "web3-eth-contract";
import { useWeb3React } from "@web3-react/core";
import ContractInfo from "../Config/Web3/artifacts/CrazyPunks";

const { address, abi } = ContractInfo;

const useCrazyPunks = (): Contract => {
  const { active, chainId, library } = useWeb3React();

  const CrazyPunks = useMemo(() => {
    if (active)
      return new library.eth.Contract(abi, address[chainId as number]);
  }, [active, chainId, library?.eth?.Contract]);

  return CrazyPunks;
};

export default useCrazyPunks;
