import { Button } from "@/components/ui/button";
import { Play, Calendar, Heart } from "lucide-react";
import heroImage from "@/assets/church-hero.jpg";

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
        <div className="absolute inset-0 bg-gradient-hero"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-primary-foreground px-4 max-w-4xl mx-auto">
        <div className="mb-6 flex justify-center">
          <div className="flex items-center space-x-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <Heart className="w-5 h-5 text-secondary" />
            <span className="text-secondary font-medium">Welcome to our family</span>
          </div>
        </div>

        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          WELCOME TO KAG,
          <br />
          <span className="text-secondary">SOUTH C</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
          Where faith finds its home online! Join our vibrant digital congregation for spiritual growth, 
          community, and heartfelt connections.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" variant="secondary" className="font-semibold px-8 py-3">
            <Play className="w-5 h-5 mr-2" />
            Watch Latest Service
          </Button>
          <Button size="lg" variant="outline" className="font-semibold px-8 py-3 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20">
            <Calendar className="w-5 h-5 mr-2" />
            Visit Us This Sunday
          </Button>
        </div>

        {/* Service Times Quick Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4">
            <h3 className="font-heading font-semibold mb-2">1st Service</h3>
            <p className="text-sm opacity-90">7:00 - 8:50 AM</p>
          </div>
          <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4">
            <h3 className="font-heading font-semibold mb-2">2nd Service</h3>
            <p className="text-sm opacity-90">9:00 - 11:00 AM</p>
          </div>
          <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4">
            <h3 className="font-heading font-semibold mb-2">3rd Service</h3>
            <p className="text-sm opacity-90">11:10 AM - 1:30 PM</p>
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