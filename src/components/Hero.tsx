import { Button } from "@/components/ui/button";
import { Play, Calendar, Users } from "lucide-react";
import { Link } from "react-router-dom";

import mainImage from "@/assets/main(2).jpeg";
import heroImage2 from "@/assets/hero3(2).jpeg";

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
  <div className="relative min-h-screen">

    {/* Background Image */}
    <img
      src={mainImage}
      alt="KAG South C Church worship service"
      className="absolute inset-0 w-full h-full object-cover"
    />

    {/* Overlay */}
    <div className="absolute inset-0 bg-black/40" />

    {/* Content */}
    <div className="relative z-10 min-h-screen flex flex-col justify-between">

      {/* Top */}
      <div className="text-center px-4 max-w-3xl mx-auto mt-24">
        <div className="mb-6 flex justify-center">
          <div className="bg-white/10 px-4 py-2 rounded-full">
            <span className="text-white font-medium">
              Welcome to our family
            </span>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mb-20 flex flex-col items-center gap-8 px-4">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white">
          WELCOME TO KAG SOUTH C
        </h1>

        <p className="text-lg md:text-xl text-white max-w-2xl text-center">
          Where faith finds its home! Join our vibrant congregation for
          spiritual growth, meaningful fellowship, and life-changing
          encounters with God's love.
        </p>

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
      </div>

    </div>
  </div>
</CarouselItem>





          {/* SLIDE 2 */}
   <CarouselItem>
  <div className="relative min-h-screen">

    <img
      src={heroImage2}
      alt="Church community gathering"
      className="absolute inset-0 w-full h-full object-cover"
    />

    <div className="absolute inset-0 bg-black/40" />

    <div className="relative z-10 min-h-screen flex flex-col justify-between">

      <div className="text-center px-4 max-w-3xl mx-auto mt-32">
        <div className="flex justify-center mb-6">
          <div className="bg-white/10 px-4 py-2 rounded-full flex items-center gap-2">
            <Users className="w-5 h-5 text-white" />
            <span className="text-white font-medium">
              Join Our Community
            </span>
          </div>
        </div>
      </div>

      <div className="mb-20 flex justify-center">
        <Link to="/events">
          <Button variant="secondary" className="px-6 py-3">
            <Calendar className="w-5 h-5 mr-2" />
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
