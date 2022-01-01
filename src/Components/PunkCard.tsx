import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  useColorModeValue,
  Heading,
  Stack,
  Image,
  Square,
  Text,
  Link,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import "./Styles/PunkCard.css";

type Props = {
  tokenId: number;
  image: string;
  name: string;
  style?: any;
  opensea?: boolean;
};

const GalleryURL =
  "https://testnets.opensea.io/assets/0x412e1b9dfc2d8d3d09044871224f7d02ebdcf691/";

export const PunkCard = ({ tokenId, image, name, style, opensea }: Props) => {
  return (
    <Box
      role={"group"}
      overflow="hidden"
      py={6}
      maxW={"330px"}
      w={"full"}
      h="max-content"
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"lg"}
      rounded={"lg"}
      pos={"relative"}
      zIndex={1}
      {...style}
    >
      <Link to={`/crazypunk/${tokenId}`} as={RouterLink}>
        <Box
          w="80%"
          m="0 auto"
          rounded={"lg"}
          pos={"relative"}
          height={"230px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 0,
            left: 0,
            backgroundImage: `url(${image})`,
            filter: "blur(15px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Image
            rounded={"lg"}
            height={230}
            width={250}
            objectFit={"cover"}
            src={image}
          />
        </Box>
      </Link>
      <Stack
        pt={10}
        direction="row"
        justify={Boolean(opensea) ? "space-between" : "center"}
        align="center"
      >
        <Heading ml={6} fontSize={"lg"} fontFamily={"body"} fontWeight={500}>
          {name}
        </Heading>
        {opensea && (
          <Link
            _focus={{ boxShadow: "unset" }}
            href={GalleryURL + tokenId}
            target="_blank"
            isExternal
          >
            <Square
              className="opensea-container"
              size="40px"
              justifyContent="start"
              w={14}
              bg="white"
            >
              <ViewIcon
                _hover={{ color: "green.200" }}
                h={6}
                w={6}
                color="gray.200"
              />
              <Text className="openseaText" fontSize="xs" w="32">
                See on OpenSea
              </Text>
            </Square>
          </Link>
        )}
      </Stack>
    </Box>
  );
};
