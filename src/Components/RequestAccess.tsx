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
  CloseButton,
} from "@chakra-ui/react";

export const RequestAccess = () => {
  return (
    <Container maxW="container.md" mt={8}>
      <Center mb={8}>
        <Image mr={20} width="250px" src={errorAvatar} alt="Error punk" />
        <ConnectBtn error={false} connect={() => {}} />
      </Center>
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>Conecta tu wallet</AlertTitle>
        <AlertDescription>para acceder a la app</AlertDescription>
      </Alert>
    </Container>
  );
};
