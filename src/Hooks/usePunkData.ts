import { useWeb3React } from "@web3-react/core";
import { useState, useCallback, useEffect } from "react";
import { Contract } from "web3-eth-contract";
import useCrazyPunks from "./useCrazyPunks";

const getPunkData = async (
  CrazyPunks: Contract,
  tokenId: number
): Promise<TPunk> => {
  const [tokenURI, owner] = await Promise.all([
    CrazyPunks.methods.tokenURI(tokenId).call(),
    CrazyPunks.methods.ownerOf(tokenId).call(),
  ]);

  const metadata = await fetch(tokenURI).then((res) => res.json());

  return {
    tokenId,
    owner,
    ...metadata,
  };
};

type TGalleryHook = {
  loading: boolean;
  list: TGalleryPunks;
  fetchPunks: () => Promise<void>;
};

export const useCollectionData = (): TGalleryHook => {
  const [list, setList] = useState<TGalleryPunks>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const CrazyPunks = useCrazyPunks();

  const fetchPunks = useCallback(async () => {
    if (CrazyPunks) {
      setLoading(true);

      const current = await CrazyPunks.methods.totalSupply().call();
      const tokenIds = new Array(parseInt(current))
        .fill(null)
        .map((_: null, index: number) => index);

      const punksPromises = tokenIds.map((id) => getPunkData(CrazyPunks, id));

      const punksList = await Promise.all(punksPromises);

      setList(punksList);
      setLoading(false);
    }
  }, [CrazyPunks]);

  useEffect(() => {
    fetchPunks();
  }, [fetchPunks]);

  return { loading, list, fetchPunks };
};
