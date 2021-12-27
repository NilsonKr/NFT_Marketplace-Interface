import { Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

type Props = { error: boolean; connect: () => void };

export const ConnectBtn = ({ error, connect }: Props) => {
  return (
    <Button
      variant={"solid"}
      colorScheme={"green"}
      size={"sm"}
      leftIcon={<AddIcon />}
      onClick={connect}
      disabled={error}
    >
      {error ? "Red no soportada" : "Conectar wallet"}
    </Button>
  );
};
