interface Window {
  ethereum: any;
}

type Taccount = string | null | undefined;

type TSupplyInfo = {
  currSupply: number;
  maxSupply: number;
};

interface ICrazyPunks {
  address: { [key: number]: string };
  abi: any;
}
