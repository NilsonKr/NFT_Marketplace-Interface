import { useState, useRef } from "react";
import { useWeb3React } from "@web3-react/core";
//Components
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Text,
  Tag,
  Flex,
  Button,
  useToast,
} from "@chakra-ui/react";

type TProps = {
  setClose: () => void;
  open: boolean;
  transfer: (address: string, close: () => void) => void;
};

export const TransferModal = ({ setClose, open, transfer }: TProps) => {
  const { library, account } = useWeb3React();
  const showToast = useToast({
    isClosable: true,
    position: "top-right",
    variant: "top-accent",
  });
  const [address, setAddress] = useState<string>("");
  const [formError, setFormError] = useState<boolean>(false);
  const dialogRef = useRef(null);

  const submit = () => {
    if (address === "") {
      setFormError(true);
      return;
    }

    const validAddress = library.utils.isAddress(address);

    if (!validAddress) {
      showToast({
        status: "error",
        title: "Invalid address",
        description: "Please enter a valid address",
      });
    } else {
      transfer(address, setClose);
      setFormError(false);
      setAddress("");
    }
  };

  return (
    <>
      <AlertDialog
        isOpen={open}
        leastDestructiveRef={dialogRef}
        onClose={setClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader
              fontSize="xl"
              fontFamily="sans-serif"
              fontWeight="bold"
            >
              Transfer CrazyPunk
            </AlertDialogHeader>

            <AlertDialogBody>
              <Flex align="center">
                <Text fontWeight="semibold">From </Text>
                <Text fontSize="xs" ml={1} color="gray.500">
                  ( Your address )
                </Text>
              </Flex>
              <Tag my={3} colorScheme="green">
                {account}
              </Tag>
              <FormControl isInvalid={formError}>
                <FormLabel htmlFor="address">Receiver Address</FormLabel>
                <Input
                  value={address}
                  id="address"
                  onChange={(ev) => setAddress(ev.target.value)}
                />
                <FormErrorMessage>Empty Address</FormErrorMessage>
              </FormControl>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={dialogRef} onClick={setClose}>
                Cancel
              </Button>
              <Button colorScheme="green" onClick={submit} ml={3}>
                Transfer
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
