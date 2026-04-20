"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import GlassContainer from "@/components/GlassContainer";

export default function Dashboard() {
  const [messages, setMessages] = useState<any[]>([]);
  const username = "wahid"; // Nanti bisa ganti pakai Auth session

  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await supabase
        .from('messages')
        .select('*')
        .eq('receiver_username', username)
        .order('created_at', { ascending: false });
      if (data) setMessages(data);
    };
    fetchMessages();
  }, []);

  return (
    <div className="min-h-screen bg-[#191919] p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-white text-3xl font-black italic mb-8">INBOX 🔥</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {messages.map((msg) => (
            <GlassContainer key={msg.id} className="p-6 rounded-3xl group hover:border-orange-500/50 transition-all">
              <p className="text-white text-lg font-medium">{msg.content}</p>
              <p className="text-gray-500 text-[10px] mt-4 tracking-[0.2em] uppercase">Anonymous Message</p>
            </GlassContainer>
          ))}
          {messages.length === 0 && <p className="text-gray-600">Belum ada pesan masuk...</p>}
        </div>
      </div>
    </div>
  );
}