# 🍵 MatchaMatch

An app for recommending personalized matchas. 

---

## 🧠 What is MatchaMatch?

**MatchaMatch** is a taste-based matcha recommender.  
You rate what flavors you like (umami, grassy, nutty, sweetness), pick your usage style, and tell us your experience level with matcha.

🔍 Under the hood, we use vector similarity (KNN) with normalization to match you to your top 3 blends from a curated list of real Japanese matchas.

---

## ✨ Features

- 🎯 Personalized radar chart of your flavor profile  
- 🧭 Taste-to-matcha KNN recommendation engine  
- 🛒 Direct links to find your top picks online  
- 🍇 Optional cultivar filtering (WIP)

---

## 🛠️ Tech Stack

- **Next.js 14** (App Router)
- **TailwindCSS** for styling
- **Recharts** for radar visualizations
- **MongoDB** for storing matcha data
- **TypeScript** all the way
- **Deployed on Vercel**

---

## 🔧 Running Locally

```bash
git clone https://github.com/your-username/matcha-match.git
cd matcha-match
npm install
