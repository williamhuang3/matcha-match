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
    origin: null,
    price: null,
    experience: "Beginner",
    profile: {
      umami: 3,
      grassy: 3,
      nutty: 1,
      sweetness: 2
    },
    usage: ["latte"],
    cultivars: []
  },
  {
    brand: "Ippodo",
    name: "Ummon",
    origin: null,
    price: null,
    experience: "Advanced",
    profile: {
      umami: 4,
      grassy: 4,
      nutty: 1,
      sweetness: 1
    },
    usage: ["koicha"],
    cultivars: []
  },
  {
    brand: "Ippodo",
    name: "Seiun",
    origin: null,
    price: null,
    experience: "Intermediate",
    profile: {
      umami: 2,
      grassy: 5,
      nutty: 4,
      sweetness: 4
    },
    usage: ["latte", "usucha"],
    cultivars: []
  },
  {
    brand: "Ippodo",
    name: "Sayaka",
    origin: null,
    price: null,
    experience: "Beginner",
    profile: {
      umami: 2,
      grassy: 4,
      nutty: 3,
      sweetness: 4
    },
    usage: ["latte", "usucha"],
    cultivars: []
  },
  {
    brand: "Marukyu Koyamaen",
    name: "Aorashi",
    origin: null,
    price: null,
    experience: "Beginner",
    profile: {
      umami: 3,
      grassy: 3,
      nutty: 1,
      sweetness: 3
    },
    usage: ["culinary", "latte"],
    cultivars: []
  },
  {
    brand: "Marukyu Koyamaen",
    name: "Wako",
    origin: null,
    price: null,
    experience: "Intermediate",
    profile: {
      umami: 3,
      grassy: 2,
      nutty: 1,
      sweetness: 3
    },
    usage: ["latte", "usucha"],
    cultivars: []
  },
  {
    brand: "Marukyu Koyamaen",
    name: "Isuzu",
    origin: null,
    price: null,
    experience: "Beginner",
    profile: {
      umami: 4,
      grassy: 1,
      nutty: 1,
      sweetness: 3
    },
    usage: ["latte", "usucha"],
    cultivars: []
  },
  {
    brand: "Marukyu Koyamaen",
    name: "Yugen",
    origin: null,
    price: null,
    experience: "Beginner",
    profile: {
      umami: 3,
      grassy: 2,
      nutty: 1,
      sweetness: 4
    },
    usage: ["latte"],
    cultivars: []
  },
  {
    brand: "Marukyu Koyamaen",
    name: "Unkaku",
    origin: null,
    price: null,
    experience: "Intermediate",
    profile: {
      umami: 5,
      grassy: 4,
      nutty: 3,
      sweetness: 3
    },
    usage: ["usucha", "koicha"],
    cultivars: []
  },
  {
    brand: "Marukyu Koyamaen",
    name: "Eiju",
    origin: null,
    price: null,
    experience: "Intermediate",
    profile: {
      umami: 4,
      grassy: 3,
      nutty: 2,
      sweetness: 2
    },
    usage: ["usucha"],
    cultivars: []
  },
  {
    brand: "Tokichi Nakamura",
    name: "Fuji no Shiro",
    origin: null,
    price: null,
    experience: "Beginner",
    profile: {
      umami: 4,
      grassy: 2,
      nutty: 1,
      sweetness: 3
    },
    usage: ["latte", "usucha"],
    cultivars: []
  },
  {
    brand: "Gokago",
    name: "Shin",
    origin: null,
    price: null,
    experience: "Beginner",
    profile: {
      umami: 4,
      grassy: 3,
      nutty: 4,
      sweetness: 5
    },
    usage: ["latte", "culinary"],
    cultivars: []
  },
  {
    brand: "Gokago",
    name: "Rai",
    origin: null,
    price: null,
    experience: "Intermediate",
    profile: {
      umami: 4,
      grassy: 3,
      nutty: 2,
      sweetness: 2
    },
    usage: ["latte", "usucha"],
    cultivars: []
  },
  {
    brand: "Matchaful",
    name: "Hikari",
    origin: null,
    price: null,
    experience: "Beginner",
    profile: {
      umami: 3,
      grassy: 3,
      nutty: 1,
      sweetness: 2
    },
    usage: ["latte"],
    cultivars: []
  },
  {
    brand: "Matchaful",
    name: "Kiwami",
    origin: null,
    price: null,
    experience: "Intermediate",
    profile: {
      umami: 4,
      grassy: 2,
      nutty: 2,
      sweetness: 4
    },
    usage: ["latte", "usucha"],
    cultivars: []
  },
  {
    brand: "Kettl",
    name: "Shirakawa Samidori",
    origin: null,
    price: null,
    experience: "Advanced",
    profile: {
      umami: 5,
      grassy: 2,
      nutty: 1,
      sweetness: 4
    },
    usage: ["usucha"],
    cultivars: []
  },
  {
    brand: "Kettl",
    name: "Shirakawa Legacy Blend",
    origin: null,
    price: null,
    experience: "Intermediate",
    profile: {
      umami: 4,
      grassy: 3,
      nutty: 2,
      sweetness: 2
    },
    usage: ["latte", "usucha"],
    cultivars: []
  },
  {
    brand: "Horii Shichimeien",
    name: "Homare no Mukashi",
    origin: null,
    price: null,
    experience: "Intermediate",
    profile: {
      umami: 4,
      grassy: 2,
      nutty: 1,
      sweetness: 2
    },
    usage: ["usucha", "koicha"],
    cultivars: []
  },
  {
    brand: "Horii Shichimeien",
    name: "Todou Mukashi",
    origin: null,
    price: null,
    experience: "Advanced",
    profile: {
      umami: 5,
      grassy: 2,
      nutty: 2,
      sweetness: 3
    },
    usage: ["usucha", "koicha"],
    cultivars: []
  },
  {
    brand: "Horii Shichimeien",
    name: "Agata no Shiro",
    origin: null,
    price: null,
    experience: "Intermediate",
    profile: {
      umami: 3,
      grassy: 2,
      nutty: 1,
      sweetness: 4
    },
    usage: ["koicha"],
    cultivars: []
  },
  {
    brand: "Horii Shichimeien",
    name: "Uji Mukashi",
    origin: null,
    price: null,
    experience: "Intermediate",
    profile: {
      umami: 3,
      grassy: 2,
      nutty: 2,
      sweetness: 4
    },
    usage: ["latte", "usucha"],
    cultivars: []
  },
  {
    brand: "Rockys Matcha",
    name: "Oishi",
    origin: null,
    price: null,
    experience: "Advanced",
    profile: {
      umami: 4,
      grassy: 3,
      nutty: 2,
      sweetness: 4
    },
    usage: ["koicha", "usucha"],
    cultivars: []
  },
  {
    brand: "Rockys Matcha",
    name: "Koshun",
    origin: null,
    price: null,
    experience: "Advanced",
    profile: {
      umami: 3,
      grassy: 5,
      nutty: 2,
      sweetness: 2
    },
    usage: ["koicha", "usucha"],
    cultivars: []
  },
  {
    brand: "Rockys Matcha",
    name: "Ceremonial Blend",
    origin: null,
    price: null,
    experience: "Intermediate",
    profile: {
      umami: 4,
      grassy: 3,
      nutty: 3,
      sweetness: 3
    },
    usage: ["latte", "usucha"],
    cultivars: []
  },
  {
    brand: "Rockys Matcha",
    name: "Asahi",
    origin: null,
    price: null,
    experience: "Intermediate",
    profile: {
      umami: 5,
      grassy: 1,
      nutty: 2,
      sweetness: 4
    },
    usage: ["usucha"],
    cultivars: []
  },
  {
    brand: "Rockys Matcha",
    name: "Uji Hikari",
    origin: null,
    price: null,
    experience: "Intermediate",
    profile: {
      umami: 3,
      grassy: 2,
      nutty: 1,
      sweetness: 4
    },
    usage: ["usucha", "latte"],
    cultivars: []
  },
  {
    brand: "Rockys Matcha",
    name: "Osada",
    origin: null,
    price: null,
    experience: "Beginner",
    profile: {
      umami: 3,
      grassy: 3,
      nutty: 2,
      sweetness: 3
    },
    usage: ["usucha"],
    cultivars: []
  },
  {
    brand: "Rockys Matcha",
    name: "Gokou",
    origin: null,
    price: null,
    experience: "Intermediate",
    profile: {
      umami: 2,
      grassy: 4,
      nutty: 2,
      sweetness: 4
    },
    usage: ["usucha", "koicha"],
    cultivars: []
  },
  {
    brand: "Nami Matcha",
    name: "Yame First Harvest",
    origin: null,
    price: null,
    experience: "Beginner",
    profile: {
      umami: 2,
      grassy: 1,
      nutty: 3,
      sweetness: 2
    },
    usage: ["latte", "usucha"],
    cultivars: []
  },
  {
    brand: "Nami Matcha",
    name: "Okumidori First Harvest",
    origin: null,
    price: null,
    experience: "Beginner",
    profile: {
      umami: 2,
      grassy: 3,
      nutty: 1,
      sweetness: 2
    },
    usage: ["culinary", "usucha"],
    cultivars: []
  },
  {
    brand: "Matcha Kari",
    name: "First Harvest",
    origin: null,
    price: null,
    experience: "Beginner",
    profile: {
      umami: 4,
      grassy: 4,
      nutty: 1,
      sweetness: 3
    },
    usage: ["latte", "usucha"],
    cultivars: []
  },
  {
    brand: "Kanbayashi Shunsho",
    name: "Aya No Mori",
    origin: null,
    price: null,
    experience: "Beginner",
    profile: {
      umami: 2,
      grassy: 3,
      nutty: 4,
      sweetness: 2
    },
    usage: ["latte", "usucha"],
    cultivars: []
  },
  {
    brand: "Kanbayashi Shunsho",
    name: "Hatsumukashi",
    origin: null,
    price: null,
    experience: "Intermediate",
    profile: {
      umami: 5,
      grassy: 3,
      nutty: 1,
      sweetness: 3
    },
    usage: ["koicha"],
    cultivars: []
  },
  {
    brand: "Yamamasa Koyamaen",
    name: "Ogurayama",
    origin: null,
    price: null,
    experience: "Beginner",
    profile: {
      umami: 4,
      grassy: 2,
      nutty: 1,
      sweetness: 3
    },
    usage: ["latte", "usucha"],
    cultivars: []
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
