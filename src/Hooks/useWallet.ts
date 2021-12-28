import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import { connector } from "../Config/Web3/Index";

type Treturn = {
  connect: () => void;
  disconnect: () => void;
  active: ConstrainBoolean;
  error: Error | undefined;
};

export const useWallet = (): Treturn => {
  const { active, activate, deactivate, error } = useWeb3React();

  const connect = useCallback(() => {
    activate(connector).then(() => {
      localStorage.setItem("isConnected", "true");
    });
  }, [activate]);

  const disconnect = () => {
    deactivate();
    localStorage.removeItem("isConnected");
  };

  return { connect, disconnect, active, error };
};
