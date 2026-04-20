"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import GlassContainer from "@/components/GlassContainer";

export default function Home() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      localStorage.setItem("ngl_username", username.toLowerCase());
      router.push(`/dashboard`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glow Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-orange-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-pink-600/20 blur-[120px] rounded-full" />

      <GlassContainer className="w-full max-w-sm rounded-[3rem] p-10 text-center animate-fade-in border-white/5">
        <div className="mb-8">
            <h1 className="text-5xl font-black italic tracking-tighter text-white">
                NGL<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">.HIDZ</span>
            </h1>
            <p className="text-gray-500 text-xs mt-2 uppercase tracking-[0.3em]">Anonymous Feedback</p>
        </div>

        <form onSubmit={handleStart} className="space-y-6">
          <div className="group relative">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-orange-500 font-bold">@</div>
            <input
              type="text"
              placeholder="your-username"
              className="w-full bg-white/5 border border-white/10 rounded-3xl py-5 pl-12 pr-6 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all placeholder:text-gray-700 font-medium"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase())}
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-pink-600 text-white font-black py-5 rounded-3xl hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-orange-500/10 uppercase tracking-widest text-sm"
          >
            Get Messages!
          </button>
        </form>

        <footer className="mt-10">
            <p className="text-[9px] text-gray-700 uppercase tracking-widest">Secure • Anonymous • Fun</p>
        </footer>
      </GlassContainer>
    </div>
  );
}