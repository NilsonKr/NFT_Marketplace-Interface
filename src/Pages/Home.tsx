import { useWeb3React } from "@web3-react/core";
import { useState, useEffect } from "react";
import useCrazyPunks from "../Hooks/useCrazyPunks";
//Components
import {
  Box,
  Stack,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  Badge,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Avatar1 from "../assets/avatar1.png";
import Avatar2 from "../assets/avatar2.png";

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
    <Stack
      align={"center"}
      spacing={{ base: 8, md: 10 }}
      px={{ md: 2, lg: 8 }}
      py={{ base: 20, md: 28 }}
      direction={{ base: "column-reverse", md: "row" }}
    >
      <Stack flex={1} spacing={{ base: 5, md: 10 }}>
        <Heading
          lineHeight={0.9}
          textAlign={"center"}
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
        >
          <Text
            as={"span"}
            position={"relative"}
            _after={{
              content: "''",
              width: "full",
              height: "30%",
              position: "absolute",
              bottom: 1,
              left: 0,
              bg: "green.400",
              zIndex: -1,
            }}
          >
            Un CrazyPunk
          </Text>
          <br />
          <Text as={"span"} color={"white"}>
            nunca para de aprender
          </Text>
        </Heading>
        <Text color={"gray.500"} textAlign={"center"}>
          Platzi Punks es una colección de Avatares randomizados cuya metadata
          es almacenada on-chain. Poseen características únicas y sólo hay 10000
          en existencia.
        </Text>
        <Flex justify={"center"}>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: "column", sm: "row" }}
          >
            <Button
              rounded={"full"}
              size={"lg"}
              fontWeight={"normal"}
              px={6}
              colorScheme={"green"}
              bg={"green.400"}
              _hover={{ bg: "green.500" }}
              disabled={!CrazyPunks}
            >
              Obtén tu punk
            </Button>
            <Link to="/punks">
              <Button rounded={"full"} size={"lg"} fontWeight={"normal"} px={6}>
                Galería
              </Button>
            </Link>
          </Stack>
        </Flex>
      </Stack>
      <Flex
        flex={1}
        direction="column"
        justify={"center"}
        align={"center"}
        position={"relative"}
        w={"full"}
      >
        <Box
          position={"relative"}
          _after={{
            content: "''",
            position: "absolute",
            top: 0,
            zIndex: 1,
            width: "100%",
            height: "100%",
            background:
              " linear-gradient(180deg, rgba(2,0,36,.8) 0%, rgba(255,255,255,.1) 100%)",
          }}
        >
          <Stack spacing={6} direction={"row"}>
            <Image src={Avatar1} w={"3xs"} h={"2xs"} pb={10} />
            <Image src={Avatar2} pb={10} w={"3xs"} h={"2xs"} />
          </Stack>
          <Image
            w={"2xs"}
            h={"2xs"}
            src={"https://avataaars.io/"}
            position={"absolute"}
            top={5}
            left={"50%"}
            transform={"translateX(-50%)"}
            zIndex={"2"}
          />
        </Box>
        {active ? (
          <>
            <Flex mt={10}>
              <Badge>
                Next ID:
                <Badge ml={1} colorScheme="green">
                  1
                </Badge>
              </Badge>
              <Badge ml={2}>
                Address:
                <Badge ml={1} colorScheme="green">
                  0x0000...0000
                </Badge>
              </Badge>
            </Flex>
            <Button onClick={() => {}} mt={4} size="xs" colorScheme="green">
              Actualizar
            </Button>
          </>
        ) : (
          <Badge mt={2}>Wallet desconectado</Badge>
        )}
      </Flex>
    </Stack>
  );
};
