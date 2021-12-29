interface Window {
  ethereum: any;
}

type Taccount = string | null | undefined;

type TSupplyInfo = {
  currSupply: number;
  maxSupply: number;
};
type TPunk = {
  owner: string;
  tokenId: number;
  image: string;
  description: string;
  name: string;
};

type TGalleryPunks = TPunk[];

interface ICrazyPunks {
  address: { [key: number]: string };
  abi: any;
}
