import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
//Components
import {
  Box,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  FormErrorMessage,
  Button,
  useToast,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

type TProps = { submit: (addr: string) => void; address: string };

export const SearchPunks = ({ submit, address }: TProps) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState<string>(address);
  const [emptyAddress, setEmptyAddress] = useState<boolean>(false);
  const { library } = useWeb3React();
  const showToast = useToast({ position: "top", status: "error" });

  useEffect(() => {
    setQuery(address);
  }, [address]);

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    if (address && query === "") {
      navigate("/collection");
      submit(query);
      return;
    }

    if (query === "") {
      setEmptyAddress(true);
      return;
    }

    const validAddress = library.utils.isAddress(query);

    if (!validAddress) {
      showToast({
        title: "Invalid Address",
        description: "Please enter a valid address",
      });
    } else {
      navigate(`/collection?address=${query}`);
      submit(query);
    }

    setEmptyAddress(false);
  };

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setQuery(ev.target.value);
  };

  return (
    <Box w="80%" m="30px auto 0">
      <form onSubmit={handleSubmit}>
        <FormControl isInvalid={emptyAddress}>
          <InputGroup>
            <InputLeftElement children={<SearchIcon color="gray.500" />} />
            <Input
              value={query}
              onChange={handleChange}
              pl={12}
              placeholder="Search for a punk"
            />
            <InputRightElement w="100px">
              <Button type="submit" size="sm" height="1.6rem" px={4}>
                Search
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>Empty Address, Please fill it out</FormErrorMessage>
        </FormControl>
      </form>
    </Box>
  );
};
