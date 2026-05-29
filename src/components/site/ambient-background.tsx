export function AmbientBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="bg-grid absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
      <div className="animate-aurora absolute -left-1/4 top-[-12%] h-[55vmin] w-[55vmin] rounded-full bg-[radial-gradient(circle,oklch(0.72_0.2_50/0.16),transparent_62%)] blur-3xl" />
      <div className="animate-aurora absolute right-[-12%] top-[16%] h-[50vmin] w-[50vmin] rounded-full bg-[radial-gradient(circle,oklch(0.82_0.15_72/0.18),transparent_62%)] blur-3xl [animation-delay:-6s]" />
      <div className="animate-aurora absolute bottom-[-15%] left-[18%] h-[55vmin] w-[55vmin] rounded-full bg-[radial-gradient(circle,oklch(0.66_0.22_33/0.12),transparent_62%)] blur-3xl [animation-delay:-12s]" />
    </div>
  );
}
