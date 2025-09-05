// src/app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetch("http://localhost:8000/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Não autorizado");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => router.push("/login"));
  }, [router]);

  if (!user) return <p className="text-white">Carregando...</p>;

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-900 text-white">
      <h1 className="text-3xl font-bold">
        Bem-vindo, {user.name}! 🤘
      </h1>
    </main>
  );
}
