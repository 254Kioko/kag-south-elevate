import { Button } from "@/components/ui/button";
import { Play, Calendar, Users } from "lucide-react";
import { Link } from "react-router-dom";

import mainImage from "@/assets/main(2).jpeg";
import heroImage2 from "@/assets/fasting.jpg";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";

const Hero = () => {
  const handleScroll = () => {
    const nextSection = document.getElementById("about");
    nextSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      <Carousel
        opts={{ loop: true }}
        plugins={[Autoplay({ delay: 5000 })]}
        className="w-full h-screen"
      >
        <CarouselContent>

          {/* SLIDE 1 */}
<CarouselItem>
  <div className="relative h-[100svh] w-full overflow-hidden">

    {/* Background Image */}
    <img
      src={mainImage}
      alt="KAG South C Church worship service"
      className="absolute inset-0 w-full h-full object-cover object-center"
    />

    {/* Dark overlay (optional – remove if not wanted) */}
    <div className="absolute inset-0 bg-black/40" />

    {/* Content */}
    <div className="relative z-10 flex flex-col justify-end h-full px-4 pb-20 md:pb-24">

      <div className="max-w-3xl mx-auto text-center space-y-6">

        <span className="inline-block bg-white/10 px-4 py-2 rounded-full text-white text-sm md:text-base">
          Welcome to our family
        </span>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
          WELCOME TO KAG SOUTH C
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-white/95">
          Where faith finds its home! Join our vibrant congregation for spiritual
          growth, meaningful fellowship, and life-changing encounters with God's love.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="secondary"
            className="px-6 py-3"
            onClick={() => {
              document
                .getElementById("latest-service")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Watch Latest Service
          </Button>

          <a
            href="https://maps.app.goo.gl/FLKDdmePNH9QLRgm6"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="bg-white/10 border-white/30 text-white px-6 py-3"
            >
              Visit Us This Sunday
            </Button>
          </a>
        </div>

      </div>
    </div>
  </div>
</CarouselItem>






          {/* SLIDE 2 */}
<CarouselItem>
  <div className="relative min-h-[85vh] md:min-h-[95vh] lg:min-h-[110vh] w-full overflow-hidden">

    {/* Background Image */}
    <img
      src={heroImage2}
      alt="Church community gathering"
      className="absolute inset-0 w-full h-full object-cover object-center"
    />

    {/* Overlay */}
    <div className="absolute inset-0 bg-black/40" />

    {/* Content */}
    <div className="relative z-10 flex flex-col justify-end h-full px-4 pb-24">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <span className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-white">
          <Users className="w-5 h-5" />
          Join Our Community
        </span>

        <Link to="/events">
          <Button variant="secondary" className="px-6 py-3">
            View Event Details
          </Button>
        </Link>
      </div>
    </div>

  </div>
</CarouselItem>






        </CarouselContent>

        {/* Navigation */}
        <CarouselPrevious className="left-4 bg-white/20 text-white" />
        <CarouselNext className="right-4 bg-white/20 text-white" />
      </Carousel>

      {/* Scroll Indicator */}
      <button
        onClick={handleScroll}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 animate-bounce"
      >
        <div className="w-5 h-8 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white/50 rounded-full mt-2" />
        </div>
      </button>
    </section>
  );
};

export default Hero;
