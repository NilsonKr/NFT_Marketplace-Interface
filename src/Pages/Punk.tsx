import { useState } from "react";
import { useParams } from "react-router-dom";
import { usePunkData } from "../Hooks/usePunkData";
import { useWeb3React } from "@web3-react/core";
import useCrazyPunks from "../Hooks/useCrazyPunks";
//Components
import {
  LinkBox,
  LinkOverlay,
  Stack,
  Box,
  Flex,
  Heading,
  Text,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Button,
  Tag,
  TagLabel,
  TagRightIcon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  useToast,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import { ReactComponent as OpenSeaIcon } from "../assets/OpenSea.svg";
import { PunkCard } from "../Components/PunkCard";
import { Loading, RequestAccess, TransferModal } from "../Components/Index";

type Params = Record<string, string | undefined>;

const GalleryURL =
  "https://testnets.opensea.io/assets/0x412e1b9dfc2d8d3d09044871224f7d02ebdcf691/";

export const Punk = () => {
  const { active, account } = useWeb3React();
  const { punkId } = useParams<Params>();
  const { Punk, loading, refresh } = usePunkData(parseInt(punkId as string));
  const CrazyPunks = useCrazyPunks();
  const [isTransfer, setTransfer] = useState(false);
  const showToast = useToast();

  const handleTransfer = (address: string, close: () => void) => {
    CrazyPunks.methods
      .safeTransferFrom(account, address, Punk!.tokenId)
      .send({ from: account })
      .on("transactionHash", (hash: string) => {
        showToast({
          status: "info",
          title: "Transfer sent",
          description: hash,
        });
        close();
      })
      .on("receipt", (receipt: any) => {
        console.log(receipt);
        showToast({
          status: "success",
          title: "Transfer confirmed",
          description: "Transfer successful",
          variant: "top-accent",
        });
        refresh();
      })
      .on("error", (error: Error) => {
        console.log(error);
        showToast({
          status: "error",
          title: "Transfer failed",
          description: error.message,
        });
      });
  };

  const copyDna = () => {
    navigator.clipboard.writeText(Punk!.DNA as string);
    showToast({
      status: "success",
      title: "Copied DNA!",
      duration: 1500,
    });
  };

  if (!active) return <RequestAccess />;

  if (loading) return <Loading />;

  return (
    <>
      {Punk?.image && (
        <Stack
          w={{ base: "95%", md: "80%" }}
          m="40px auto 0"
          h={{ base: "60vh", md: "74vh" }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 5 }}
          direction={{ base: "column", md: "row" }}
          overflowY="scroll"
          overflowX="hidden"
        >
          <Stack>
            <PunkCard
              style={{
                w: { base: "300px", md: "400px" },
                mx: { base: "auto", md: "inherit" },
              }}
              tokenId={parseInt(punkId!)}
              name={Punk.name as string}
              image={Punk.image as string}
              opensea={false}
            />
            <Button
              onClick={() => setTransfer(true)}
              disabled={account !== Punk.owner}
              colorScheme="green"
            >
              {account === Punk.owner ? "Transfer" : "You're not the owner"}
            </Button>
            <LinkBox>
              <Flex
                justify="space-between"
                align="center"
                px={2}
                sx={{ marginTop: "20px !important" }}
              >
                <OpenSeaIcon />
                <LinkOverlay
                  href={`${GalleryURL}${Punk.tokenId}`}
                  target="_blank"
                  fontSize="lg"
                  fontWeight="extrabold"
                  bgGradient="linear(to-l ,#a2f9d9,#7928CA,#FF0080)"
                  bgClip="text"
                >
                  Watch it on OpenSea!
                </LinkOverlay>
              </Flex>
            </LinkBox>
          </Stack>
          <Stack width="100%" spacing={5} pr={4}>
            <Heading>{Punk.name}</Heading>
            <Text fontSize={{ base: "md", md: "xl" }}>{Punk.description}</Text>
            <Text fontWeight={600}>
              DNA:
              <Tag
                fontSize={{ base: "xs", md: "md" }}
                ml={{ base: 0, md: 2 }}
                colorScheme="green"
              >
                <TagLabel isTruncated>{Punk.DNA}</TagLabel>
                <TagRightIcon as={CopyIcon} onClick={copyDna} />
              </Tag>
            </Text>
            <Text fontWeight={600}>
              Owner:
              <Tag
                fontSize={{ base: "xs", md: "md" }}
                ml={{ base: 0, md: 2 }}
                colorScheme="green"
              >
                {Punk.owner}
              </Tag>
            </Text>
            <Accordion allowToggle minW="280px" mx={{ base: "auto", md: "0" }}>
              <AccordionItem>
                <AccordionButton>
                  <Box flex={1} textAlign="left">
                    <Heading as="h5" size="md" color="gray.500">
                      Attributes
                    </Heading>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  <Table size="sm" variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Attribute</Th>
                        <Th>Value</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {Object.entries(Punk.attributes!).map(([key, value]) => (
                        <Tr key={key}>
                          <Td>{key}</Td>
                          <Td>
                            <Tag>{value}</Tag>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Stack>
        </Stack>
      )}
      <TransferModal
        transfer={handleTransfer}
        setClose={() => setTransfer(false)}
        open={isTransfer}
      />
    </>
  );
};
