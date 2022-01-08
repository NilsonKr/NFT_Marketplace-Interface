import { useEffect, useState, useCallback } from "react";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { NavLink as RouterLink } from "react-router-dom";
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

const activeStyle = {
  color: "white",
  backgroundColor: "#8effd6",
};

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
      flexDirection={{ sm: "column", md: "row" }}
      py={{ sm: 2, md: "unset" }}
      zIndex={1}
      backgroundColor={"gray.50"}
      boxShadow={"0 4px 8px rgba(0,0,0,.09)"}
    >
      <Flex align={"center"} direction={{ sm: "column", md: "row" }}>
        <RouterLink to="/">
          <Image marginRight="35px" src={Logo} alt="CrazyPunks" />
        </RouterLink>
        <Flex align={"center"} my={{ sm: 4, md: 0 }}>
          <RouterLink
            className="navTab"
            style={({ isActive }) => (isActive ? activeStyle : {})}
            to="/"
          >
            <Text fontWeight={"500"} fontSize={"lg"}>
              Home
            </Text>
          </RouterLink>
          <RouterLink
            style={({ isActive }) => (isActive ? activeStyle : {})}
            className="navTab"
            to="/collection"
          >
            <Text fontWeight={"500"} fontSize={"lg"}>
              Punks
            </Text>
          </RouterLink>
        </Flex>
      </Flex>
      <Flex alignItems={"center"} justify={{ sm: "center", md: "unset" }}>
        {active ? (
          <Tag colorScheme="green" borderRadius="full">
            <TagLabel>
              <Link as={RouterLink} to={`/collection?address=${account}`}>
                {account && getTruncateAddress(account)}
              </Link>
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
