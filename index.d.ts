interface Window {
  ethereum: any;
}

type Taccount = string | null | undefined;

interface ICrazyPunks {
  address: { [key: number]: string };
  abi: any;
}
