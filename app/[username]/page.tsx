"use client";
import { useState, use } from "react"; // Tambahkan use di sini
import { supabase } from "@/lib/supabase";
import GlassContainer from "@/components/GlassContainer";

export default function SendMessage({ params }: { params: Promise<{ username: string }> }) {
  // Ambil username dengan menggunakan React.use()
  const resolvedParams = use(params);
  const username = resolvedParams.username;

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setLoading(true);

    // Gunakan username yang sudah di-unwrap
    const { error } = await supabase
      .from('messages')
      .insert([{ receiver_username: username, content: message }]);

    if (!error) {
      setSent(true);
      setMessage("");
    } else {
      console.error("Error sending message:", error);
      alert("Gagal mengirim pesan, coba lagi nanti.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#191919] flex items-center justify-center p-4">
      <GlassContainer className="w-full max-w-md rounded-[2.5rem] p-8 text-center">
        <div className="w-20 h-20 bg-gradient-to-tr from-orange-500 to-pink-600 rounded-full mx-auto mb-4 shadow-lg shadow-orange-500/20" />
        
        {/* Sekarang panggil username tanpa params. */}
        <h1 className="text-white text-xl font-bold">@{username}</h1>
        <p className="text-gray-400 text-sm mb-8">kirim pesan rahasia ke saya!</p>

        {!sent ? (
          <form onSubmit={send} className="space-y-4">
            <textarea
              className="w-full h-32 bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all resize-none"
              placeholder="Tulis sesuatu..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button 
              disabled={loading}
              className="w-full bg-white text-black font-black py-4 rounded-full active:scale-95 transition-transform disabled:opacity-50"
            >
              {loading ? "MENGIRIM..." : "KIRIM!"}
            </button>
          </form>
        ) : (
          <div className="py-10 animate-bounce">
            <h2 className="text-white text-2xl font-black">TERKIRIM! ✅</h2>
            <button onClick={() => setSent(false)} className="mt-4 text-orange-500 text-sm underline">Kirim lagi</button>
          </div>
        )}
      </GlassContainer>
    </div>
  );
}