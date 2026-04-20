import GlassContainer from "./GlassContainer";

interface MessageProps {
  content: string;
  timestamp: string;
}

export default function MessageCard({ content, timestamp }: MessageProps) {
  // Format tanggal simpel
  const date = new Date(timestamp).toLocaleDateString('id-ID', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <GlassContainer className="p-6 rounded-3xl group hover:border-orange-500/50 transition-all cursor-default">
      <div className="flex justify-between items-start mb-4">
        <div className="bg-orange-500/10 text-orange-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">
          New Message
        </div>
        <span className="text-[10px] text-gray-600">{date}</span>
      </div>
      
      <p className="text-white text-lg font-medium leading-relaxed">
        "{content}"
      </p>
      
      <div className="mt-6 flex items-center gap-2">
        <div className="h-[1px] flex-1 bg-white/10"></div>
        <p className="text-gray-500 text-[9px] uppercase tracking-[0.2em]">Anonymous</p>
        <div className="h-[1px] flex-1 bg-white/10"></div>
      </div>
    </GlassContainer>
  );
}