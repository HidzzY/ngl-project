export default function GlassContainer({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] ${className}`}>
      {children}
    </div>
  );
}