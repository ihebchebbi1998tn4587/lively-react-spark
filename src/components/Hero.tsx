import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-primary to-secondary animate-gradient-y">
      <div className="max-w-3xl mx-auto text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Welcome to Your Amazing App
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8">
          Start building something incredible with modern tools and beautiful design
        </p>
        <Button
          className="bg-white text-primary hover:bg-white/90 transition-all duration-300 group"
          size="lg"
        >
          Get Started
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

export default Hero;