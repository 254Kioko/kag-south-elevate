import { Button } from "@/components/ui/button";
import { Play, Calendar } from "lucide-react";
import { Link } from "react-router-dom"; 
import heroImage from "@/assets/church-hero.jpg";

const Hero = () => {
  const handleScroll = () => {
    const nextSection = document.getElementById("about");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
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
      <div className="relative z-10 text-center text-primary-foreground px-4 max-w-3xl mx-auto">
        {/* Logo & Heading */}
        <div className="mb-6 flex justify-center">
          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full shadow-elegant animate-fade-in">
            <span className="text-white font-medium text-base">
              Welcome to our family
            </span>
          </div>
        </div>

        <h1 className="font-heading text-2xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-snug animate-fade-in">
          <span className="block text-white drop-shadow-xl tracking-wide">
            WELCOME TO
          </span>
          <span className="block bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent drop-shadow-md">
            KAG SOUTH C
          </span>
        </h1>

        <p className="text-lg md:text-xl mb-8 text-white/95 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-lg animate-fade-in">
          Where faith finds its home! Join our vibrant congregation for spiritual
          growth, meaningful fellowship, and life-changing encounters with God's
          love.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
          <Button
            size="default"
            variant="secondary"
            className="font-semibold px-6 py-3 text-base shadow-elegant hover-scale"
            onClick={() => {
              const latestService = document.getElementById("latest-service");
              if (latestService) {
                latestService.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <Play className="w-5 h-5 mr-2" />
            Watch Latest Service
          </Button>

          <a
            href="https://maps.app.goo.gl/FLKDdmePNH9QLRgm6"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="default"
              variant="outline"
              className="font-semibold px-6 py-3 text-base bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm shadow-elegant hover-scale"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Visit Us This Sunday
            </Button>
          </a>
        </div>

        {/* Service Times */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto animate-fade-in">
          <div className="bg-white/15 backdrop-blur-md rounded-xl p-4 shadow-elegant hover-scale">
            <h3 className="font-heading font-semibold mb-2 text-white text-base">
              1st Service
            </h3>
            <p className="text-white/90 text-sm font-medium">7:30 - 8:45 AM</p>
          </div>
          <div className="bg-white/15 backdrop-blur-md rounded-xl p-4 shadow-elegant hover-scale">
            <h3 className="font-heading font-semibold mb-2 text-white text-base">
              2nd Service
            </h3>
            <p className="text-white/90 text-sm font-medium">9:00 - 11:00 AM</p>
          </div>
          <div className="bg-white/15 backdrop-blur-md rounded-xl p-4 shadow-elegant hover-scale">
            <h3 className="font-heading font-semibold mb-2 text-white text-base">
              3rd Service
            </h3>
            <p className="text-white/90 text-sm font-medium">11:40 AM - 1:30 PM</p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={handleScroll}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce focus:outline-none"
      >
        <div className="w-5 h-8 border-2 border-primary-foreground/50 rounded-full flex justify-center items-start">
          <div className="w-1 h-2 bg-primary-foreground/50 rounded-full mt-2"></div>
        </div>
      </button>
    </section>
  );
};

export default Hero;
