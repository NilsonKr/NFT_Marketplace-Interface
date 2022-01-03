import { useState } from "react";
import { useCollectionData } from "../Hooks/usePunkData";
import { useWeb3React } from "@web3-react/core";
import { useSearchParams } from "react-router-dom";
//Components
import { Grid } from "@chakra-ui/react";
import {
  PunkCard,
  Loading,
  RequestAccess,
  SearchPunks,
} from "../Components/Index";

export const Gallery = () => {
  const [searchParams] = useSearchParams();
  // TODO: Listen to searchParams change on view
  const [address, setAddress] = useState<string | null>(
    searchParams.get("address")
  );
  const { active } = useWeb3React();
  const { loading, list } = useCollectionData(address ? address : "");

  if (!active) return <RequestAccess />;

  const searchPunks = (addr: string) => {
    setAddress(addr);
  };

  return (
    <>
      <SearchPunks submit={searchPunks} address={address} />
      {!loading ? (
        <Grid
          height="75vh"
          overflowY="scroll"
          m="20px auto 0"
          w="80%"
          py={6}
          justifyContent="center"
          templateColumns="repeat(auto-fill,minMax(250px, 320px))"
          gap={8}
        >
          {list!.map((punk, i) => (
            <PunkCard
              key={i}
              tokenId={punk.tokenId}
              image={punk.image}
              name={punk.name}
              opensea={true}
            />
          ))}
        </Grid>
      ) : (
        <Loading />
      )}
    </>
  );
};
