export type Matcha = {
    _id?: string;
    brand: string;
    name: string;
    price?: number | null;
    experience?: "Beginner" | "Intermediate" | "Advanced";
    profile: {
      umami: number;
      grassy: number;
      nutty: number;
      sweetness: number;
    };
    usage: string[];
    cultivars: string[];
  };
  