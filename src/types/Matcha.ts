export type Matcha = {
    _id?: string;
    brand: string;
    name: string;
    price?: number | null;
    profile: {
      umami: number;
      grassy: number;
      nutty: number;
      sweetness: number;
    };
    usage: string[];
    cultivars: string[];
  };
  