"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import GlassContainer from "@/components/GlassContainer";

export default function Home() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleGoToDashboard = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      // Direct ke dashboard (bisa dikembangkan dengan Auth nanti)
      router.push(`/dashboard`);
    }
  };

  return (
    <div className="min-h-screen bg-[#191919] flex flex-col items-center justify-center p-6">
      <GlassContainer className="w-full max-w-md rounded-[3rem] p-10 text-center">
        <h1 className="text-4xl font-black text-white mb-2 italic tracking-tighter">
          NGL <span className="text-orange-500 underline">HIDZ</span>
        </h1>
        <p className="text-gray-400 text-sm mb-8">Dapatkan pesan rahasia dari teman-temanmu!</p>

        <form onSubmit={handleGoToDashboard} className="space-y-4">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">@</span>
            <input
              type="text"
              placeholder="username"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase())}
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-pink-600 text-white font-bold py-4 rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg shadow-orange-500/20"
          >
            CEK INBOX SAYA
          </button>
        </form>

        <p className="mt-8 text-[10px] text-gray-600 uppercase tracking-widest">
          Build with Next.js & Supabase
        </p>
      </GlassContainer>
    </div>
  );
}