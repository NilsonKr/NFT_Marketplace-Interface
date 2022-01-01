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

type TReturnHook = {
  loading: boolean;
  list?: TGalleryPunks;
  Punk?: Partial<TPunk>;
  refresh: () => Promise<void>;
};

export const useCollectionData = (): TReturnHook => {
  const [list, setList] = useState<TGalleryPunks>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const CrazyPunks = useCrazyPunks();

  const fetchGallery = useCallback(async () => {
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
    fetchGallery();
  }, [fetchGallery]);

  return { loading, list, refresh: fetchGallery };
};

const getAttributes = async (
  CrazyPunks: Contract,
  DNA: string
): Promise<TAttributes> => {
  const [
    accessoriesType,
    clotheColor,
    clotheType,
    eyeType,
    eyebrowType,
    facialHairColor,
    facialHairType,
    hairColor,
    hatColor,
    mouthType,
    skinColor,
    topType,
    graphicType,
  ]: string[] = await Promise.all([
    CrazyPunks.methods.getAccessoriesType(DNA).call(),
    CrazyPunks.methods.getClotheColor(DNA).call(),
    CrazyPunks.methods.getClotheType(DNA).call(),
    CrazyPunks.methods.getEyeType(DNA).call(),
    CrazyPunks.methods.getEyeBrowType(DNA).call(),
    CrazyPunks.methods.getFacialHairColor(DNA).call(),
    CrazyPunks.methods.getFacialHairType(DNA).call(),
    CrazyPunks.methods.getHairColor(DNA).call(),
    CrazyPunks.methods.getHatColor(DNA).call(),
    CrazyPunks.methods.getMouthType(DNA).call(),
    CrazyPunks.methods.getSkinColor(DNA).call(),
    CrazyPunks.methods.getTopType(DNA).call(),
    CrazyPunks.methods.getGraphicType(DNA).call(),
  ]);

  return {
    attributes: {
      accessoriesType,
      clotheColor,
      clotheType,
      eyeType,
      eyebrowType,
      facialHairColor,
      facialHairType,
      hairColor,
      hatColor,
      mouthType,
      skinColor,
      topType,
      graphicType,
    },
  };
};

export const usePunkData = (tokendId: number): TReturnHook => {
  const [data, setData] = useState<Partial<TPunk>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const CrazyPunks = useCrazyPunks();

  const fetchPunk = useCallback(async () => {
    if (CrazyPunks) {
      setLoading(true);
      const punk = await getPunkData(CrazyPunks, tokendId);
      const DNA = await CrazyPunks.methods
        .generatePseudoRandomDNA(tokendId, punk.owner)
        .call();
      const attrs = await getAttributes(CrazyPunks, DNA);

      setData({ ...punk, DNA, ...attrs });
      setLoading(false);
    }
  }, [CrazyPunks, tokendId]);

  useEffect(() => {
    fetchPunk();
  }, [fetchPunk]);

  return { Punk: data, loading, refresh: fetchPunk };
};
