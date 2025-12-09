import { COLORS } from "@/lib/constants/colors";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r ${COLORS.gradients.primary} bg-clip-text text-transparent`}>
          Welcome to TeachHub
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4">
          Your intelligent learning companion powered by AI
        </p>
      </div>
    </div>
  );
}
