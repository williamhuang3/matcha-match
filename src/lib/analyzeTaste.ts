type TasteData = {
    umami: number;
    grassy: number;
    nutty: number;
    sweetness: number;
    usage: string[];
    experience: string;
    price: number;
    cultivars?: string[];
  };
  
  export function getMatchaArchetype(taste: TasteData): string {
    const maxFlavor = getTopFlavor(taste);
    const personas: Record<string, string> = {
      umami: "The Umami Purist 🍶",
      grassy: "The Green Dreamer 🌿",
      nutty: "The Toasty Traditionalist 🍂",
      sweetness: "The Smooth Sweetheart 🍬",
    };
    return personas[maxFlavor] ?? "The Balanced Brewer 🎛️";
  }
  
  export function getFavoriteRegion(taste: TasteData): {
    region: string;
    desc: string;
    img: string;
  } {
    const top = getTopFlavor(taste);
  
    if (top === "umami") {
      return {
        region: "Uji, Kyoto",
        desc:
          "Widely considered the birthplace of Japanese matcha, Uji (in Kyoto Prefecture) produces some of the most elegant and refined matcha available. Its teas are renowned for their balanced umami, gentle sweetness, and signature \"oceanic\" depth—notes reminiscent of nori, sea breeze, and mellow soy. Uji matcha tends to be smooth and creamy, making it a favorite for ceremonial-grade bowls and high-end sipping. The terroir—misty hills, mineral-rich soil, and a long tradition of cultivation—favors delicate leaves that are shaded and harvested with precision. If you want matcha that's poised and traditional with an ethereal, lingering finish, Uji is the gold standard.",
        img: "/regions/uji.jpg",
      };
    } else if (top === "nutty") {
      return {
        region: "Yame, Fukuoka",
        desc:
          "From Fukuoka Prefecture, Yame matcha is beloved for its rich, nutty flavor and deeply satisfying umami. Unlike Uji's oceanic clarity, Yame leans into warmth—think toasted cashew, chestnut, and a buttery roundness that coats the tongue. It's smooth, low in bitterness, and often has a thicker, more full-bodied mouthfeel, making it ideal for those who crave depth and comfort in their bowl. The region's foggy climate and temperature swings help the tea plants develop a complex flavor profile, and cultivars like Yabukita and Saemidori thrive here. For drinkers who favor cozy over crisp, Yame offers a grounded, almost dessert-like experience that still feels elevated.",
        img: "/regions/yame.png",
      };
    } else if (top === "grassy") {
      return {
        region: "Shizuoka",
        desc:
          "Though better known for sencha, Shizuoka also produces matcha with a distinctly fresh and vibrant character. Compared to Uji and Yame, Shizuoka matcha can be more grassy and brisk, sometimes with subtle melon or herbal notes, making it feel more youthful and energetic. The region’s diverse microclimates and high elevations produce leaves with brighter, lighter tones in both taste and color. While it may lack the deep umami of Uji or the weight of Yame, Shizuoka matcha appeals to those who enjoy a cleaner, zippy profile—ideal for people new to matcha or those exploring more aromatic, less creamy styles.",
        img: "/regions/shizuoka.png",
      };
    } else if (top === "sweetness") {
      return {
        region: "Nishio, Aichi",
        desc:
          "Nishio matcha, from Aichi Prefecture, is known for its sweet, creamy flavor and vibrant green color. The region's unique climate and soil conditions create a matcha that is often described as smooth, with a rich umami and a hint of sweetness. Nishio matcha is perfect for those who enjoy a sweeter, more approachable flavor profile, making it an excellent choice for lattes and desserts. The tea plants are shaded for several weeks before harvest, which enhances their sweetness and reduces bitterness. If you prefer a matcha that is easy to drink and versatile in culinary applications, Nishio is a fantastic option.",
        img: "/regions/nishio.jpg",
      };
    }

    return {
      region: "Unknown Region",
      desc: "This matcha's origin is a mystery, but its flavor profile is unique and intriguing. Explore the world of matcha and discover your favorite!",
      img: "/regions/unknown.png",
    };
  }
  
  function getTopFlavor(taste: TasteData): string {
    const { umami, grassy, nutty, sweetness } = taste;
    const flavorEntries = { umami, grassy, nutty, sweetness };
    return Object.entries(flavorEntries).sort((a, b) => b[1] - a[1])[0][0];
  }
  