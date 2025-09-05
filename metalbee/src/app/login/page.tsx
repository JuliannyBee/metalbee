// src/app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: senha }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.access_token); // JWT vindo do FastAPI
      router.push("/dashboard");
    } else {
      alert("Email ou senha inválidos!");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-800 p-8 rounded-xl shadow w-full max-w-sm space-y-4"
      >
        <h1 className="text-2xl font-bold">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded bg-zinc-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="w-full p-3 rounded bg-zinc-700"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button
          type="submit"
          className="w-full p-3 bg-purple-600 rounded hover:bg-purple-700"
        >
          Entrar
        </button>
      </form>
    </main>
  );
}
