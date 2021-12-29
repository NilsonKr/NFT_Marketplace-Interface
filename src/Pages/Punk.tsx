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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import { ReactComponent as OpenSeaIcon } from "../assets/OpenSea.svg";
import { PunkCard } from "../Components/PunkCard";

const punk = {
  tokenId: 0,
  name: "CrazyPunk #0",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  image: "https://avataaars.io/",
  owner: "0x0000000000000000000000000000000000000000",
  dna: "0x0000000000000000000000000000000000000000",
  attributes: {
    accessoriesType: "",
    clotheColor: "",
    clotheType: "",
    eyeType: "",
    eyebrowType: "",
    facialHairColor: "",
    facialHairType: "",
    hairColor: "",
    hatColor: "",
    mouthType: "",
    skinColor: "",
    graphicType: "",
  },
};

const GalleryURL =
  "https://testnets.opensea.io/assets/0x412e1b9dfc2d8d3d09044871224f7d02ebdcf691/";

export const Punk = () => {
  return (
    <Stack
      w="80%"
      m="40px auto 0"
      h="75vh"
      spacing={{ base: 8, md: 10 }}
      py={{ base: 5 }}
      direction={{ base: "column", md: "row" }}
      overflowY="scroll"
    >
      <Stack>
        <PunkCard
          style={{ w: "400px" }}
          tokenId={punk.tokenId}
          name={punk.name}
          image={punk.image}
          opensea={false}
        />
        <Button disabled={false} colorScheme="green">
          Transferir
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
              href={`${GalleryURL}1`}
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
      <Stack width="100%" spacing={5}>
        <Heading>{punk.name}</Heading>
        <Text fontSize="xl">{punk.description}</Text>
        <Text fontWeight={600}>
          DNA:
          <Tag ml={2} colorScheme="green">
            {punk.dna}
          </Tag>
        </Text>
        <Text fontWeight={600}>
          Owner:
          <Tag ml={2} colorScheme="green">
            {punk.owner}
          </Tag>
        </Text>
        <Accordion allowToggle>
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
                    <Th>Atributo</Th>
                    <Th>Valor</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {Object.entries(punk.attributes).map(([key, value]) => (
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
  );
};
