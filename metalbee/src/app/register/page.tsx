// src/app/register/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("http://localhost:8000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: nome, email, password: senha }),
    });

    if (res.ok) {
      router.push("/login");
    } else {
      alert("Erro ao registrar!");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-800 p-8 rounded-xl shadow w-full max-w-sm space-y-4"
      >
        <h1 className="text-2xl font-bold">Registrar</h1>

        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full p-3 rounded bg-zinc-700"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded bg-zinc-700"
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full p-3 rounded bg-zinc-700"
        />

        <button
          type="submit"
          className="w-full p-3 bg-purple-600 rounded hover:bg-purple-700"
        >
          Criar Conta
        </button>
      </form>
    </main>
  );
}
