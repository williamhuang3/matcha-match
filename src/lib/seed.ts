import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config(); // Load .env

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("🚨 MONGODB_URI not found in .env");
}

// --- Define matcha schema inline for now ---
const matchaSchema = new mongoose.Schema({
  brand: String,
  name: String,
  origin: String,
  price: Number,
  profile: {
    umami: Number,
    grassy: Number,
    nutty: Number,
  },
  usage: [String],
});

const Matcha = mongoose.model("Matcha", matchaSchema);

// --- Sample seed data ---
const matchas = [
  {
    brand: "Ippodo",
    name: "Ikuyo",
    price: 0.63,
    experience: "Beginner",
    profile: {
      umami: 3,
      grassy: 3,
      nutty: 1,
      sweetness: 2
    },
    usage: ["latte"],
    cultivar: ["Blend"]
  },
  {
    brand: "Ippodo",
    name: "Ummon",
    price: 1.45,
    experience: "Advanced",
    profile: {
      umami: 5,
      grassy: 4,
      nutty: 3,
      sweetness: 4
    },
    usage: ["koicha"],
    cultivar: ["Blend"]
  },
  {
    brand: "Ippodo",
    name: "Seiun",
   
    price: 1.2,
    experience: "Intermediate",
    profile: {
      umami: 4,
      grassy: 3,
      nutty: 4,
      sweetness: 4
    },
    usage: ["latte", "usucha"],
    cultivar: ["Blend"]
  },
  {
    brand: "Ippodo",
    name: "Sayaka",
   
    price: 0.93,
    experience: "Beginner",
    profile: {
      umami: 4,
      grassy: 4,
      nutty: 2,
      sweetness: 4
    },
    usage: ["latte", "usucha"],
    cultivar: ["Blend"]
  },
  {
    brand: "Marukyu Koyamaen",
    name: "Aorashi",
   
    price: 0.27,
    experience: "Beginner",
    profile: {
      umami: 3,
      grassy: 3,
      nutty: 1,
      sweetness: 3
    },
    usage: ["culinary", "latte"],
    cultivar: ["Blend"]
  },
  {
    brand: "Marukyu Koyamaen",
    name: "Wako",
   
    price: 0.63,
    experience: "Intermediate",
    profile: {
      umami: 3,
      grassy: 2,
      nutty: 1,
      sweetness: 3
    },
    usage: ["latte", "usucha"],
    cultivar: ["Blend"]
  },
  {
    brand: "Marukyu Koyamaen",
    name: "Isuzu",
   
    price: 0.34,
    experience: "Beginner",
    profile: {
      umami: 4,
      grassy: 1,
      nutty: 1,
      sweetness: 3
    },
    usage: ["latte", "usucha"],
    cultivar: ["Blend"]
  },
  {
    brand: "Marukyu Koyamaen",
    name: "Yugen",
   
    price: 0.51,
    experience: "Beginner",
    profile: {
      umami: 3,
      grassy: 2,
      nutty: 1,
      sweetness: 4
    },
    usage: ["latte"],
    cultivar: ["Blend"]
  },
  {
    brand: "Marukyu Koyamaen",
    name: "Tenju",
   
    price: 4.1,
    experience: "Advanced",
    profile: {
      umami: 5,
      grassy: 4,
      nutty: 3,
      sweetness: 4
    },
    usage: ["usucha"],
    cultivar: ["Blend"]
  },
  {
    brand: "Marukyu Koyamaen",
    name: "Unkaku",
   
    price: 1.05,
    experience: "Intermediate",
    profile: {
      umami: 4,
      grassy: 3,
      nutty: 2,
      sweetness: 3
    },
    usage: ["usucha", "koicha"],
    cultivar: ["Blend"]
  },
  {
    brand: "Marukyu Koyamaen",
    name: "Eiju",
   
    price: 1.4,
    experience: "Intermediate",
    profile: {
      umami: 5,
      grassy: 3,
      nutty: 2,
      sweetness: 3
    },
    usage: ["usucha"],
    cultivar: ["Blend"]
  },
  {
    brand: "Marukyu Koyamaen",
    name: "Kinrin",
   
    price: 0.85,
    experience: "Intermediate",
    profile: {
      umami: 4,
      grassy: 3,
      nutty: 2,
      sweetness: 2
    },
    usage: ["usucha"],
    cultivar: ["Blend"]
  },
  {
    brand: "Tokichi Nakamura",
    name: "Fuji no Shiro",
   
    price: 0.3,
    experience: "Beginner",
    profile: {
      umami: 3,
      grassy: 2,
      nutty: 1,
      sweetness: 3
    },
    usage: ["latte", "usucha"],
    cultivar: ["Blend"]
  },
  {
    brand: "Gokago",
    name: "Shin",
   
    price: 0.6,
    experience: "Beginner",
    profile: {
      umami: 4,
      grassy: 3,
      nutty: 4,
      sweetness: 5
    },
    usage: ["latte", "culinary"],
    cultivar: ["Blend"]
  },
  {
    brand: "Gokago",
    name: "Rai",
   
    price: 0.93,
    experience: "Intermediate",
    profile: {
      umami: 4,
      grassy: 3,
      nutty: 2,
      sweetness: 2
    },
    usage: ["latte", "usucha"],
    cultivar: ["Blend"]
  },
  {
    brand: "Matchaful",
    name: "Hikari",
   
    price: 0.65,
    experience: "Beginner",
    profile: {
      umami: 3,
      grassy: 3,
      nutty: 1,
      sweetness: 2
    },
    usage: ["latte"],
    cultivar: ["Uji Hikari"]
  },
  {
    brand: "Matchaful",
    name: "Kiwami",
   
    price: 0.8,
    experience: "Intermediate",
    profile: {
      umami: 4,
      grassy: 2,
      nutty: 2,
      sweetness: 4
    },
    usage: ["latte", "usucha"],
    cultivar: ["Kiwami"]
  },
  {
    brand: "Kettl",
    name: "Hanaka",
   
    price: 1.4,
    experience: "Advanced",
    profile: {
      umami: 2,
      grassy: 1,
      nutty: 4,
      sweetness: 3
    },
    usage: ["usucha", "latte"],
    cultivar: ["Blend"]
  },
  {
    brand: "Kettl",
    name: "Shirakawa Samidori",
   
    price: 2.4,
    experience: "Advanced",
    profile: {
      umami: 5,
      grassy: 2,
      nutty: 1,
      sweetness: 4
    },
    usage: ["usucha"],
    cultivar: ["Samidori"]
  },
  {
    brand: "Kettl",
    name: "Shirakawa Legacy Blend",
   
    price: 0.9,
    experience: "Intermediate",
    profile: {
      umami: 4,
      grassy: 3,
      nutty: 2,
      sweetness: 2
    },
    usage: ["latte", "usucha"],
    cultivar: ["Yabukita", "Saemidori", "Samidori"]
  },
  {
    brand: "Horii Shichimeien",
    name: "Homare no Mukashi",
   
    price: 1.77,
    experience: "Advanced",
    profile: {
      umami: 5,
      grassy: 2,
      nutty: 2,
      sweetness: 3
    },
    usage: ["usucha", "koicha"],
    cultivar: ["Blend"]
  },
  {
    brand: "Horii Shichimeien",
    name: "Todou Mukashi",
   
    price: 1.07,
    experience: "Intermediate",
    profile: {
      umami: 4,
      grassy: 2,
      nutty: 2,
      sweetness: 3
    },
    usage: ["usucha", "koicha"],
    cultivar: ["Blend"]
  },
  {
    brand: "Horii Shichimeien",
    name: "Agata no Shiro",
   
    price: 0.73,
    experience: "Intermediate",
    profile: {
      umami: 3,
      grassy: 2,
      nutty: 1,
      sweetness: 4
    },
    usage: ["koicha"],
    cultivar: ["Blend"]
  },
  {
    brand: "Horii Shichimeien",
    name: "Uji Mukashi",
   
    price: 0.57,
    experience: "Beginner",
    profile: {
      umami: 3,
      grassy: 2,
      nutty: 2,
      sweetness: 3
    },
    usage: ["latte", "usucha"],
    cultivar: ["Blend"]
  },
  {
    brand: "Rockys Matcha",
    name: "Oishi",
   
    price: 1.8,
    experience: "Advanced",
    profile: {
      umami: 4,
      grassy: 3,
      nutty: 2,
      sweetness: 4
    },
    usage: ["koicha", "usucha"],
    cultivar: ["Okumidori", "Saemidori", "Yabukita"]
  },
  {
    brand: "Rockys Matcha",
    name: "Koshun",
   
    price: 1.4,
    experience: "Advanced",
    profile: {
      umami: 3,
      grassy: 5,
      nutty: 2,
      sweetness: 2
    },
    usage: ["koicha", "usucha"],
    cultivar: ["Koshun"]
  },
  {
    brand: "Rockys Matcha",
    name: "Ceremonial Blend",
   
    price: 1.4,
    experience: "Intermediate",
    profile: {
      umami: 4,
      grassy: 3,
      nutty: 3,
      sweetness: 3
    },
    usage: ["latte", "usucha"],
    cultivar: ["Blend"]
  },
  {
    brand: "Rockys Matcha",
    name: "Asahi",
   
    price: 2.9,
    experience: "Intermediate",
    profile: {
      umami: 5,
      grassy: 1,
      nutty: 2,
      sweetness: 4
    },
    usage: ["usucha"],
    cultivar: ["Asahi"]
  },
  {
    brand: "Rockys Matcha",
    name: "Uji Hikari",
   
    price: 2.6,
    experience: "Intermediate",
    profile: {
      umami: 3,
      grassy: 2,
      nutty: 1,
      sweetness: 4
    },
    usage: ["usucha", "latte"],
    cultivar: ["Uji Hikari"]
  },
  {
    brand: "Rockys Matcha",
    name: "Osada",
   
    price: 1.2,
    experience: "Beginner",
    profile: {
      umami: 3,
      grassy: 3,
      nutty: 2,
      sweetness: 3
    },
    usage: ["usucha"],
    cultivar: ["Okumidori", "Saemidori"]
  },
  {
    brand: "Rockys Matcha",
    name: "Gokou",
   
    price: 2.4,
    experience: "Advanced",
    profile: {
      umami: 2,
      grassy: 4,
      nutty: 2,
      sweetness: 4
    },
    usage: ["usucha", "koicha"],
    cultivar: ["Gokou"]
  },
  {
    brand: "Nami Matcha",
    name: "Yame First Harvest",
   
    price: 1.2,
    experience: "Beginner",
    profile: {
      umami: 2,
      grassy: 1,
      nutty: 3,
      sweetness: 2
    },
    usage: ["latte", "usucha"],
    cultivar: ["Okumidori", "Saemidori"]
  },
  {
    brand: "Nami Matcha",
    name: "Okumidori First Harvest",
   
    price: 1.13,
    experience: "Beginner",
    profile: {
      umami: 2,
      grassy: 3,
      nutty: 1,
      sweetness: 2
    },
    usage: ["culinary", "usucha"],
    cultivar: ["Okumidori"]
  },
  {
    brand: "Matcha Kari",
    name: "First Harvest",
   
    price: 1.01,
    experience: "Beginner",
    profile: {
      umami: 4,
      grassy: 4,
      nutty: 1,
      sweetness: 3
    },
    usage: ["latte", "usucha"],
    cultivar: ["Blend"]
  },
  {
    brand: "Kanbayashi Shunsho",
    name: "Aya No Mori",
   
    price: 0.32,
    experience: "Beginner",
    profile: {
      umami: 2,
      grassy: 3,
      nutty: 4,
      sweetness: 2
    },
    usage: ["latte", "usucha"],
    cultivar: ["Blend"]
  },
  {
    brand: "Kanbayashi Shunsho",
    name: "Hatsumukashi",
    price: 1.67,
    experience: "Advanced",
    profile: {
      umami: 5,
      grassy: 3,
      nutty: 1,
      sweetness: 3
    },
    usage: ["koicha"],
    cultivar: ["Blend"]
  },
  {
    brand: "Yamamasa Koyamaen",
    name: "Ogurayama",
   
    price: 0.47,
    experience: "Beginner",
    profile: {
      umami: 4,
      grassy: 2,
      nutty: 1,
      sweetness: 2
    },
    usage: ["latte", "usucha"],
    cultivar: ["Blend"]
  }
  ];


async function seed() {
  try {
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is undefined");
    }
    await mongoose.connect(MONGODB_URI);
    await Matcha.deleteMany({});
    await Matcha.insertMany(matchas);
    console.log("✅ Matcha data seeded!");
    await mongoose.disconnect();
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  }
}

seed();
