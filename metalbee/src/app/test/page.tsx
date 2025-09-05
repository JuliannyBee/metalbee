"use client";

import { useState } from "react";

type Banda = {
  nome: string;
  genero: string;
  pais: string;
};

const bandasMock: Banda[] = [
  { nome: "Metallica", genero: "Thrash Metal", pais: "EUA" },
  { nome: "Iron Maiden", genero: "Heavy Metal", pais: "Reino Unido" },
  { nome: "Slayer", genero: "Thrash Metal", pais: "EUA" },
  { nome: "Nightwish", genero: "Symphonic Metal", pais: "Finlândia" },
  { nome: "Sepultura", genero: "Death/Thrash Metal", pais: "Brasil" },
  { nome: "Opeth", genero: "Progressive Metal", pais: "Suécia" },
];

export default function Home() {
  const [pesquisa, setPesquisa] = useState("");

  const bandasFiltradas = bandasMock.filter((banda) =>
    banda.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
    banda.genero.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-zinc-900 text-white flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-6">MetalBee 2</h1>
 
      {/* Campo de pesquisa */}
      <input
        type="text"
        placeholder="Digite o nome da banda ou gênero..."
        value={pesquisa}
        onChange={(e) => setPesquisa(e.target.value)}
        className="w-full max-w-md p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-6"
      />

      {/* Lista de bandas */}
      <div className="grid gap-4 w-full max-w-2xl">
        {bandasFiltradas.length > 0 ? (
          bandasFiltradas.map((banda, i) => (
            <div
              key={i}
              className="p-4 bg-zinc-800 rounded-xl shadow hover:scale-105 transition-transform"
            >
              <h2 className="text-2xl font-semibold">{banda.nome}</h2>
              <p className="text-zinc-400">{banda.genero}</p>
              <p className="text-sm text-zinc-500">🌍 {banda.pais}</p>
            </div>
          ))
        ) : (
          <p className="text-zinc-500">Nenhuma banda encontrada 😢</p>
        )}
      </div>
    </main>
  );
}
