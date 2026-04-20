"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import GlassContainer from "@/components/GlassContainer";
import MessageCard from "@/components/MessageCard";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"play" | "inbox">("play");
  const [messages, setMessages] = useState<any[]>([]);
  const [username, setUsername] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("ngl_username");
    if (savedUser) {
      setUsername(savedUser);
      fetchMessages(savedUser);
    } else {
      window.location.href = "/";
    }
  }, []);

  const fetchMessages = async (user: string) => {
    const { data } = await supabase
      .from('messages')
      .select('*')
      .eq('receiver_username', user)
      .order('created_at', { ascending: false });
    if (data) setMessages(data);
  };

  const copyLink = () => {
    const link = `${window.location.origin}/${username}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-24">
      {/* Header Profile */}
      <div className="bg-[#121212] border-b border-white/5 p-6 pt-12 text-center">
        <div className="w-20 h-20 bg-gradient-to-tr from-orange-500 to-pink-600 rounded-full mx-auto mb-3 p-1">
            <div className="w-full h-full bg-[#121212] rounded-full flex items-center justify-center font-black text-2xl">
                {username.charAt(0).toUpperCase()}
            </div>
        </div>
        <h2 className="text-xl font-bold text-white">@{username}</h2>
      </div>

      {/* Main Content Area */}
      <div className="max-w-md mx-auto p-6 animate-fade-in">
        {activeTab === "play" ? (
          <div className="space-y-6">
            <GlassContainer className="p-8 rounded-[2.5rem] text-center border-orange-500/20">
                <h3 className="text-2xl font-black italic mb-2 italic">Step 1: Copy Link</h3>
                <p className="text-gray-500 text-sm mb-6">Share link ini di story Instagram kamu!</p>
                <div className="bg-black/40 p-4 rounded-2xl border border-white/5 mb-6 break-all text-xs font-mono text-orange-400">
                    {typeof window !== 'undefined' ? `${window.location.origin}/${username}` : ''}
                </div>
                <button 
                    onClick={copyLink}
                    className={`w-full py-4 rounded-2xl font-black transition-all ${copied ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'}`}
                >
                    {copied ? "COPIED! ✅" : "COPY LINK"}
                </button>
            </GlassContainer>
            <div className="text-center text-gray-600 text-[10px] uppercase tracking-widest px-10">
                Tip: Orang-orang akan mengirimkan pesan rahasia tanpa kamu tahu siapa mereka.
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-end mb-6">
                <h3 className="text-2xl font-black italic">INBOX</h3>
                <span className="text-xs text-orange-500 font-bold bg-orange-500/10 px-3 py-1 rounded-full">{messages.length} Total</span>
            </div>
            
            {messages.map((msg) => (
              <MessageCard key={msg.id} content={msg.content} timestamp={msg.created_at} />
            ))}
            
            {messages.length === 0 && (
              <div className="text-center py-20">
                <div className="text-4xl mb-4 opacity-20">📩</div>
                <p className="text-gray-600 font-medium">No messages yet...</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Navigation (Sticky) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-xs bg-white/10 backdrop-blur-xl border border-white/10 rounded-full p-2 flex gap-2 shadow-2xl">
        <button 
          onClick={() => setActiveTab("play")}
          className={`flex-1 py-3 rounded-full font-bold text-xs transition-all ${activeTab === "play" ? 'bg-white text-black' : 'text-gray-400'}`}
        >
          PLAY
        </button>
        <button 
          onClick={() => setActiveTab("inbox")}
          className={`flex-1 py-3 rounded-full font-bold text-xs transition-all ${activeTab === "inbox" ? 'bg-white text-black' : 'text-gray-400'}`}
        >
          INBOX
        </button>
      </div>
    </div>
  );
}