interface Window {
  ethereum: any;
}

type Taccount = string | null | undefined;

type TSupplyInfo = {
  currSupply: number;
  maxSupply: number;
};

interface TAttributes {
  attributes: Record<string, string>;
}

interface TPunk extends TAttributes {
  owner: string;
  tokenId: number;
  image: string;
  description: string;
  name: string;
  DNA?: string;
}

type TGalleryPunks = TPunk[];

interface ICrazyPunks {
  address: { [key: number]: string };
  abi: any;
}
