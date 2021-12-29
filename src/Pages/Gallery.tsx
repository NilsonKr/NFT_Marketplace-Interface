// import {} from "react";
import { useCollectionData } from "../Hooks/usePunkData";
import { useWeb3React } from "@web3-react/core";
import { Grid } from "@chakra-ui/react";
import { PunkCard, Loading, RequestAccess } from "../Components/Index";

export const Gallery = () => {
  const { active } = useWeb3React();
  const { loading, list } = useCollectionData();

  if (!active) return <RequestAccess />;

  if (loading) return <Loading />;

  return (
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
      {list.map((punk) => (
        <PunkCard tokenId={punk.tokenId} image={punk.image} name={punk.name} />
      ))}
    </Grid>
  );
};
