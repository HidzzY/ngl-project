import GlassContainer from "./GlassContainer";

export default function MessageCard({ content, timestamp }: { content: string; timestamp: string }) {
  const time = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <GlassContainer className="p-6 rounded-[2rem] border-white/5 hover:border-orange-500/30 transition-all animate-fade-in">
      <div className="flex justify-between mb-4">
        <div className="px-3 py-1 bg-white/5 rounded-full text-[9px] font-bold text-gray-500 uppercase tracking-widest">
            Anonymous
        </div>
        <div className="text-[9px] text-gray-700 font-bold">{time}</div>
      </div>
      <p className="text-white text-lg font-semibold leading-snug">
        {content}
      </p>
    </GlassContainer>
  );
}