import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Play, Calendar, Users, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import mainImage from "@/assets/main.jpeg";
import hero3Image from "@/assets/hero3.jpeg";
import hero1Image from "@/assets/hero1.jpg";

interface Slide {
  id: number;
  image: string;
  badge: {
    icon?: React.ReactNode;
    text: string;
  };
  title: string;
  subtitle: string;
  description: string;
  buttons: Array<{
    text: string;
    icon: React.ReactNode;
    variant: "default" | "outline" | "secondary";
    action?: () => void;
    link?: string;
  }>;
  additionalContent?: React.ReactNode;
}

const slides: Slide[] = [
  {
    id: 1,
    image: mainImage,
    badge: {
      text: "Welcome to our family",
    },
    title: "WELCOME TO",
    subtitle: "KAG SOUTH C",
    description:
      "Where faith finds its home! Join our vibrant congregation for spiritual growth, meaningful fellowship, and life-changing encounters with God's love.",
    buttons: [
      {
        text: "Watch Latest Service",
        icon: <Play className="w-5 h-5 mr-2" />,
        variant: "secondary",
        action: () => {
          const latestService = document.getElementById("latest-service");
          if (latestService) latestService.scrollIntoView({ behavior: "smooth" });
        },
      },
      {
        text: "Visit Us This Sunday",
        icon: <Calendar className="w-5 h-5 mr-2" />,
        variant: "outline",
        link: "https://maps.app.goo.gl/FLKDdmePNH9QLRgm6",
      },
    ],
    additionalContent: (
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 max-w-2xl animate-fade-in">
        <div className="bg-white/15 backdrop-blur-md rounded-xl p-3 sm:p-4 shadow-lg hover:scale-105 transition-transform duration-300">
          <h3 className="font-semibold mb-1 text-white text-xs md:text-sm">1st Service</h3>
          <p className="text-white/90 text-xs font-medium">7:30 - 8:45 AM</p>
        </div>
        <div className="bg-white/15 backdrop-blur-md rounded-xl p-3 sm:p-4 shadow-lg hover:scale-105 transition-transform duration-300">
          <h3 className="font-semibold mb-1 text-white text-xs md:text-sm">2nd Service</h3>
          <p className="text-white/90 text-xs font-medium">9:00 - 11:00 AM</p>
        </div>
        <div className="bg-white/15 backdrop-blur-md rounded-xl p-3 sm:p-4 shadow-lg hover:scale-105 transition-transform duration-300">
          <h3 className="font-semibold mb-1 text-white text-xs md:text-sm">3rd Service</h3>
          <p className="text-white/90 text-xs font-medium">11:40 AM - 1:30 PM</p>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    image: hero3Image,
    badge: {
      icon: <Users className="w-5 h-5 text-white" />,
      text: "Upcoming Event",
    },
    title: "MEN'S FELLOWSHIP",
    subtitle: "Brothers in Christ",
    description:
      "Join us for a powerful time of fellowship, worship, and encouragement. Building godly men, strengthening families, and impacting our community together.",
    buttons: [
      {
        text: "View Event Details",
        icon: <Calendar className="w-5 h-5 mr-2" />,
        variant: "secondary",
        link: "/events",
      },
    ],
    additionalContent: (
      <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 sm:p-8 mb-8 shadow-lg animate-fade-in">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-secondary" />
          <p className="text-base sm:text-lg md:text-xl font-bold text-white">October 20th, 2025</p>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    image: hero1Image,
    badge: {
      icon: <Heart className="w-5 h-5 text-white" />,
      text: "Special Celebration",
    },
    title: "THANKSGIVING DAY",
    subtitle: "A Day of Gratitude",
    description:
      "Join us as we gather to give thanks to God for His abundant blessings, faithfulness, and love throughout the year.",
    buttons: [
      {
        text: "Learn More",
        icon: <Calendar className="w-5 h-5 mr-2" />,
        variant: "secondary",
        link: "/events",
      },
    ],
    additionalContent: (
      <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 sm:p-8 mb-8 shadow-lg animate-fade-in">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-secondary" />
          <p className="text-base sm:text-lg md:text-xl font-bold text-white">November 14th, 2025</p>
        </div>
        <p className="text-sm sm:text-base font-semibold text-secondary animate-pulse">
          All Are Welcome! 🙏
        </p>
      </div>
    ),
  },
];

export const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  return (
    <section
      className="relative h-[90vh] sm:h-screen min-h-[500px] w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 h-full w-full transition-all duration-700 ease-in-out",
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          >
            {/* Image with overlay */}
            <div className="relative h-full w-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="h-full w-full object-cover sm:object-center object-[center_top]"
              />
              <div className="absolute inset-0 bg-black/40 sm:bg-gradient-to-r sm:from-primary/40 sm:via-primary/20 sm:to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex items-center z-10">
              <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 max-w-7xl">
                <div className="max-w-3xl text-white">
                  {/* Badge */}
                  <div
                    className={cn(
                      "mb-4 sm:mb-6 inline-flex items-center space-x-3 bg-white/10 backdrop-blur-md px-5 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg transition-all duration-700 delay-100",
                      index === currentSlide
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    )}
                  >
                    {slide.badge.icon}
                    <span className="text-white font-semibold text-xs sm:text-sm">
                      {slide.badge.text}
                    </span>
                  </div>

                  {/* Title */}
                  <h1
                    className={cn(
                      "text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold mb-2 sm:mb-3 leading-snug sm:leading-tight transition-all duration-700 delay-200",
                      index === currentSlide
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    )}
                  >
                    <span className="block text-secondary drop-shadow-xl mb-1 sm:mb-2">
                      {slide.title}
                    </span>
                    <span className="block text-white drop-shadow-xl">
                      {slide.subtitle}
                    </span>
                  </h1>

                  {/* Description */}
                  <p
                    className={cn(
                      "text-xs sm:text-sm md:text-base mb-4 sm:mb-8 text-white leading-relaxed font-medium drop-shadow-lg max-w-md sm:max-w-2xl transition-all duration-700 delay-300",
                      index === currentSlide
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    )}
                  >
                    {slide.description}
                  </p>

                  {/* Buttons */}
                  <div
                    className={cn(
                      "flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8 w-full sm:w-auto transition-all duration-700 delay-400",
                      index === currentSlide
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    )}
                  >
                    {slide.buttons.map((button, btnIndex) => {
                      const ButtonContent = (
                        <Button
                          size="lg"
                          variant={button.variant}
                          className={cn(
                            "font-semibold px-4 py-3 sm:py-4 text-xs md:text-sm shadow-lg hover:scale-105 transition-transform duration-300 w-full sm:w-auto",
                            button.variant === "outline" &&
                              "bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
                          )}
                          onClick={button.action}
                        >
                          {button.icon}
                          {button.text}
                        </Button>
                      );

                      return button.link ? (
                        button.link.startsWith("http") ? (
                          <a
                            key={btnIndex}
                            href={button.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {ButtonContent}
                          </a>
                        ) : (
                          <Link key={btnIndex} to={button.link}>
                            {ButtonContent}
                          </Link>
                        )
                      ) : (
                        <div key={btnIndex}>{ButtonContent}</div>
                      );
                    })}
                  </div>

                  {/* Extra content */}
                  {slide.additionalContent && (
                    <div
                      className={cn(
                        "transition-all duration-700 delay-500",
                        index === currentSlide
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-8"
                      )}
                    >
                      {slide.additionalContent}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 sm:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "h-2 rounded-full transition-all duration-500",
              index === currentSlide
                ? "w-10 sm:w-12 bg-secondary"
                : "w-2 bg-white/50 hover:bg-white/80"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => {
          const nextSection = document.getElementById("about");
          if (nextSection) nextSection.scrollIntoView({ behavior: "smooth" });
        }}
        className="absolute bottom-4 sm:bottom-6 left-1/2 sm:left-6 -translate-x-1/2 sm:translate-x-0 animate-bounce focus:outline-none z-20"
      >
        <div className="w-5 h-8 border-2 border-white/50 rounded-full flex justify-center items-start">
          <div className="w-1 h-2 bg-white/50 rounded-full mt-2"></div>
        </div>
      </button>
    </section>
  );
};
