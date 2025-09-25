import { Button } from "@/components/ui/button";
import { Play, Calendar } from "lucide-react";
import heroImage from "@/assets/church-hero.jpg";
import kagLogo from "@/assets/kag-logo.png";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="KAG South C Church worship service with congregation"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-primary/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-primary-foreground px-4 max-w-4xl mx-auto">
        <div className="mb-8 flex justify-center">
          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full shadow-elegant animate-fade-in">
            <img 
              src={kagLogo} 
              alt="KAG Logo" 
              className="w-8 h-8 object-contain"
            />
            <span className="text-white font-semibold text-lg">Welcome to our family</span>
          </div>
        </div>

        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight animate-fade-in">
          <span className="block text-white drop-shadow-2xl">WELCOME TO</span>
          <span className="block bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent drop-shadow-lg">
            KAG SOUTH C
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-10 text-white/95 max-w-4xl mx-auto leading-relaxed font-medium drop-shadow-lg animate-fade-in">
          Where faith finds its home! Join our vibrant congregation for spiritual growth, 
          meaningful fellowship, and life-changing encounters with God's love.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in">
          <Button size="lg" variant="secondary" className="font-bold px-10 py-4 text-lg shadow-elegant hover-scale">
            <Play className="w-6 h-6 mr-3" />
            Watch Latest Service
          </Button>
          <Button size="lg" variant="outline" className="font-bold px-10 py-4 text-lg bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm shadow-elegant hover-scale">
            <Calendar className="w-6 h-6 mr-3" />
            Visit Us This Sunday
          </Button>
        </div>

        {/* Service Times Quick Info */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto animate-fade-in">
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 shadow-elegant hover-scale">
            <h3 className="font-heading font-bold mb-3 text-white text-lg">1st Service</h3>
            <p className="text-white/90 font-medium">7:00 - 8:50 AM</p>
          </div>
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 shadow-elegant hover-scale">
            <h3 className="font-heading font-bold mb-3 text-white text-lg">2nd Service</h3>
            <p className="text-white/90 font-medium">9:00 - 11:00 AM</p>
          </div>
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 shadow-elegant hover-scale">
            <h3 className="font-heading font-bold mb-3 text-white text-lg">3rd Service</h3>
            <p className="text-white/90 font-medium">11:10 AM - 1:30 PM</p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-foreground/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;