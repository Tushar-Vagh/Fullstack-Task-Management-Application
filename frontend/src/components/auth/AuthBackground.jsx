export default function AuthBackground({ children }) {

  
  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">

      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{
          backgroundImage: "url('/src/assets/auth-bg.jpg')",
          filter: "blur(12px)",
        }}
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}
