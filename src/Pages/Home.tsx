import { useWeb3React } from "@web3-react/core";
import { getTruncateAddress, allowedToMint } from "../Utils/Index";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
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
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Avatar1 from "../assets/avatar1.png";
import Avatar2 from "../assets/avatar2.png";

export const Home = () => {
  const showToast = useToast({ position: "top" });
  const { active, account } = useWeb3React();
  const CrazyPunks = useCrazyPunks();
  const [supplyInfo, setSupplyInfo] = useState<Partial<TSupplyInfo>>({});
  const [isMinting, setIsMiting] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string>("");

  const getCrazyPunkData = useCallback(async () => {
    if (CrazyPunks) {
      const accBalance = await CrazyPunks.methods.balanceOf(account).call();
      const maxSupply = await CrazyPunks.methods.maxSupply().call();
      const currSupply = await CrazyPunks.methods.totalSupply().call();
      const dnaPreview = await CrazyPunks.methods
        .generatePseudoRandomDNA(currSupply, account)
        .call();
      const imageURL: string = await CrazyPunks.methods
        .getImageURI(dnaPreview)
        .call();

      setSupplyInfo({ currSupply, maxSupply, balance: accBalance });
      setImageSrc(imageURL);
    }
  }, [CrazyPunks, account]);

  const mintCrazyPunk = () => {
    setIsMiting(true);

    CrazyPunks.methods
      .mintToken()
      .send({ from: account })
      .on("transactionHash", (txHash: string) => {
        setIsMiting(false);
        showToast({
          status: "info",
          title: "Transaction sent",
          description: txHash,
        });
      })
      .on("receipt", () => {
        setIsMiting(false);
        showToast({
          status: "success",
          title: "Transaction confirmed",
          description: "Rock your CrazyPunk!",
          variant: "top-accent",
        });
        getCrazyPunkData();
      })
      .on("error", (error: any) => {
        console.log(error);
        setIsMiting(false);
        showToast({
          status: "error",
          title: "Transaction failed :(",
          description: error.message,
        });
      });
  };

  useEffect(() => {
    getCrazyPunkData();
  }, [getCrazyPunkData]);

  return (
    <Stack
      minH="80vh"
      align={"center"}
      spacing={{ base: 8, md: 10 }}
      px={{ md: 2, lg: 8 }}
      py={{ base: 20, md: 28 }}
      direction={{ base: "column-reverse", md: "row" }}
    >
      <Stack
        flex={1}
        mt={{ sm: 6, md: "inherit" }}
        spacing={{ base: 5, md: 10 }}
      >
        <Heading
          lineHeight={0.9}
          textAlign={"center"}
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
        >
          <Text as={"span"} position={"relative"}>
            <motion.div
              style={{
                width: "100%",
                height: "30%",
                position: "absolute",
                bottom: 5,
                left: 0,
                backgroundColor: "#48BB78",
                zIndex: -1,
              }}
              initial={{ x: -1000 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.8 }}
            ></motion.div>
            CrazyPunks
          </Text>
          <br />
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.7 }}
          >
            <Text as={"span"} color={"white"}>
              For People Cool
            </Text>
          </motion.div>
        </Heading>
        <Text color={"gray.500"} textAlign={"center"}>
          CrazyPunks is a collection of randomized avatars with metadata storage
          on-chain, each one has unique characteristics and there are only{" "}
          {supplyInfo.maxSupply} on existence
        </Text>
        <Flex justify={"center"}>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: "column", sm: "row" }}
          >
            <Stack spacing={2}>
              <Button
                rounded={"full"}
                size={"lg"}
                fontWeight={"normal"}
                px={6}
                colorScheme={"green"}
                bg={"green.400"}
                _hover={{ bg: "green.500" }}
                onClick={mintCrazyPunk}
                disabled={
                  !CrazyPunks || !allowedToMint(account, supplyInfo.balance!)
                }
                isLoading={isMinting}
              >
                Get your CrazyPunk
              </Button>
              <Text
                fontSize="sm"
                fontWeight="bold"
                textAlign="center"
                color={"white"}
              >
                {active &&
                  supplyInfo.maxSupply &&
                  `Only ${supplyInfo.maxSupply! - supplyInfo.currSupply!} left`}
              </Text>
            </Stack>
            <Link to="/collection">
              <Button rounded={"full"} size={"lg"} fontWeight={"normal"} px={6}>
                Gallery
              </Button>
            </Link>
          </Stack>
        </Flex>
      </Stack>
      <Flex
        flex={1}
        mt={{ sm: "20px !important", md: "unset" }}
        direction="column"
        justify={"center"}
        align={"center"}
        position={"relative"}
        w={"full"}
      >
        <Box position={"relative"}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.6 }}
            style={{
              content: "''",
              borderRadius: "50%",
              position: "absolute",
              top: -70,
              zIndex: 1,
              width: "100%",
              height: "140%",
              background:
                "radial-gradient(circle, rgba(0,0,0,0.3) 0%, rgba(246,246,246,0) 80%)",
            }}
          ></motion.div>
          <Stack spacing={6} direction={"row"}>
            <motion.div
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <Image
                src={Avatar1}
                w={{ sm: "10rem", md: "3xs" }}
                h={{ sm: "12rem", md: "2xs" }}
                pb={10}
              />
            </motion.div>
            <motion.div
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <Image
                src={Avatar2}
                pb={10}
                w={{ sm: "10rem", md: "3xs" }}
                h={{ sm: "12rem", md: "2xs" }}
              />
            </motion.div>
          </Stack>
          <Box
            position={"absolute"}
            top={10}
            left={"50%"}
            transform={"translateX(-50%)"}
            zIndex={"2"}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.7 }}
            >
              <Image src={active ? imageSrc : "https://avataaars.io/"} />
            </motion.div>
          </Box>
        </Box>
        {active ? (
          <>
            <Flex mt={50}>
              <Badge>
                Next ID:
                <Badge ml={1} colorScheme="green">
                  {supplyInfo.currSupply}
                </Badge>
              </Badge>
              <Badge ml={2}>
                Address:
                <Badge ml={1} colorScheme="green">
                  {active
                    ? getTruncateAddress(account as string)
                    : "0x0000...0000"}
                </Badge>
              </Badge>
            </Flex>
            <Button
              onClick={getCrazyPunkData}
              mt={4}
              size="xs"
              colorScheme="green"
            >
              Refresh Punk
            </Button>
          </>
        ) : (
          <Badge mt={10}>Wallet Disconnected</Badge>
        )}
      </Flex>
    </Stack>
  );
};
