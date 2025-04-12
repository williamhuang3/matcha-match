"use client";
import { useState } from "react";

export default function SubmitMatchaPage() {
  const [form, setForm] = useState({
    brand: "",
    name: "",
    link: "",
    notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/suggest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
  
    if (res.ok) {
      alert("Thank you! We'll review your matcha suggestion 🍵");
      setForm({ brand: "", name: "", link: "", notes: "" });
    } else {
      alert("Something went wrong. Please try again later.");
    }
  };
  

  return (
    <main className="max-w-xl mx-auto p-8 text-matcha-taupe">
      <h1 className="text-3xl font-bold mb-6 text-center">Suggest a Matcha</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="brand"
          value={form.brand}
          onChange={handleChange}
          placeholder="Brand (e.g. Ippodo)"
          className="w-full p-2 border border-matcha-med rounded"
          required
        />
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Matcha Name (e.g. Ummon)"
          className="w-full p-2 border border-matcha-med rounded"
          required
        />
        <input
          type="url"
          name="link"
          value={form.link}
          onChange={handleChange}
          placeholder="Purchase link (optional)"
          className="w-full p-2 border border-matcha-med rounded"
        />
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Additional notes (e.g. price, usage, cultivar)"
          className="w-full p-2 border border-matcha-med rounded"
          rows={4}
        />
        <button
          type="submit"
          className="w-full py-2 bg-matcha-med text-white rounded-full hover:bg-matcha-light transition"
        >
          Submit Suggestion →
        </button>
      </form>
    </main>
  );
}
