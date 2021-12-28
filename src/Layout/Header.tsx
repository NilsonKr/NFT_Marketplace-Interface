import { useEffect, useState, useCallback } from "react";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { Link as RouterLink } from "react-router-dom";
import { useWallet } from "../Hooks/useWallet";
import { getTruncateAddress } from "../Utils/Index";
//Components
import { ConnectBtn } from "../Components/Index";
import {
  Box,
  Text,
  Link,
  Image,
  Flex,
  Badge,
  Tag,
  TagLabel,
  TagCloseButton,
} from "@chakra-ui/react";

import Logo from "../assets/Logo.svg";

export const Header = () => {
  const [balance, setBalance] = useState<number | string>("");
  const { active, connect, disconnect, error } = useWallet();
  const { account, library } = useWeb3React();

  const isUnsupportedChain = error instanceof UnsupportedChainIdError;

  const getBalance = useCallback(async () => {
    const balance = await library.eth.getBalance(account);

    setBalance((balance / 1e18).toFixed(4));

    return balance;
  }, [account, library?.eth]);

  useEffect(() => {
    if (account) getBalance();
  }, [account, getBalance]);

  return (
    <Box
      className="container"
      position="relative"
      zIndex={1}
      backgroundColor={"gray.50"}
      boxShadow={"0 4px 8px rgba(0,0,0,.09)"}
    >
      <Flex align={"center"}>
        <RouterLink to="/">
          <Image marginRight="35px" src={Logo} alt="CrazyPunks" />
        </RouterLink>
        <Text className="navTab" fontWeight={"500"} fontSize={"lg"}>
          <Link
            _hover={{
              borderBottom: "0px",
              color: "black",
            }}
            as={RouterLink}
            to="/"
          >
            Home
          </Link>
        </Text>
        <Text className="navTab" fontWeight={"500"} fontSize={"lg"}>
          <Link
            _hover={{
              borderBottom: "0px",
              color: "black",
            }}
            as={RouterLink}
            to="/collection"
          >
            Punks
          </Link>
        </Text>
      </Flex>
      <Flex alignItems={"center"}>
        {active ? (
          <Tag colorScheme="green" borderRadius="full">
            <TagLabel>
              <Link to="/punks">{account && getTruncateAddress(account)}</Link>
            </TagLabel>
            <Badge
              d={{
                base: "none",
                md: "block",
              }}
              variant="solid"
              fontSize="0.8rem"
              ml={1}
            >
              ~ {balance} Ξ
            </Badge>
            <TagCloseButton onClick={disconnect} />
          </Tag>
        ) : (
          <ConnectBtn error={isUnsupportedChain} connect={connect} />
        )}
      </Flex>
    </Box>
  );
};
