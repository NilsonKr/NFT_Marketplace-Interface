import { useWallet } from "../Hooks/useWallet";
import { UnsupportedChainIdError } from "@web3-react/core";
import errorAvatar from "../assets/errorAvatar.png";
import { ConnectBtn } from "../Components/Index";
import {
  Image,
  Center,
  Container,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

export const RequestAccess = () => {
  const { connect, error } = useWallet();

  const isUnsupportedChain = error instanceof UnsupportedChainIdError;

  return (
    <Container maxW="container.md" mt={8}>
      <Center mb={8}>
        <Image mr={20} width="250px" src={errorAvatar} alt="Error punk" />
        <ConnectBtn error={isUnsupportedChain} connect={connect} />
      </Center>
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>Connect your wallet</AlertTitle>
        <AlertDescription>to access the app</AlertDescription>
      </Alert>
    </Container>
  );
};
