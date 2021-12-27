// import {} from "react";
import { useWeb3React } from "@web3-react/core";
import { Grid, GridItem } from "@chakra-ui/react";
import { PunkCard, Loading, RequestAccess } from "../Components/Index";

export const Gallery = () => {
  const { active } = useWeb3React();

  if (!active) return <RequestAccess />;

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
      <PunkCard image="https://avataaars.io/" name="CrazyPunk" />
      <PunkCard image="https://avataaars.io/" name="CrazyPunk" />
      <PunkCard image="https://avataaars.io/" name="CrazyPunk" />
      <PunkCard image="https://avataaars.io/" name="CrazyPunk" />
      <PunkCard image="https://avataaars.io/" name="CrazyPunk" />
      <PunkCard image="https://avataaars.io/" name="CrazyPunk" />
      <PunkCard image="https://avataaars.io/" name="CrazyPunk" />
    </Grid>
  );
};
