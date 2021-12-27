import {
  Box,
  useColorModeValue,
  Heading,
  Stack,
  Image,
  Square,
  Text,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";

type Props = { image: string; name: string };

export const PunkCard = ({ image, name, ...props }: Props) => {
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
      {...props}
    >
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
      <Stack pt={10} direction="row" justify="space-between" align="center">
        <Heading ml={6} fontSize={"xl"} fontFamily={"body"} fontWeight={500}>
          {name}
        </Heading>
        {/* role="group" overflow="hidden" */}
        <Square
          position="relative"
          cursor="pointer"
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
          <Text
            fontSize="xs"
            fontWeight="semibold"
            transition="all 1s ease"
            color="black"
            position="absolute"
            w="32"
            right="-70%"
            zIndex={-1}
            transform="translateX(50%)"
            _groupHover={{
              transform: "translateX(-55%)",
            }}
          >
            See on OpenSea
          </Text>
        </Square>
      </Stack>
    </Box>
  );
};
