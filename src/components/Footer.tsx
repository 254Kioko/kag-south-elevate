import { MapPin, Phone, Mail, Youtube, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import kagLogo from "@/assets/kag-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { toast } = useToast();

  const socialLinks = [
    { icon: Youtube, href: "https://www.youtube.com/channel/UCAP5aGJBcRy8wMYPfnbqX7w", label: "YouTube" },
    { icon: Facebook, href: "https://www.facebook.com/p/KAG-SOUTH-C-Church-100064333766328/", label: "Facebook" },
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.open(href, "_blank");
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubscribing(true);
    try {
      const { error } = await supabase
        .from("newsletter_subscriptions")
        .insert([{ email: email.trim() }]);

      if (error) {
        if (error.code === "23505") {
          toast({
            title: "Already subscribed",
            description: "You're already subscribed to our newsletter!",
            variant: "destructive",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Subscribed successfully!",
          description: "Thank you for subscribing to our newsletter.",
        });
        setEmail("");
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      toast({
        title: "Subscription failed",
        description: "There was an error subscribing to our newsletter. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground text-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {/* Church Info */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 mb-2">
              <img src={kagLogo} alt="KAG Logo" className="w-9 h-9 object-contain" />
              <div>
                <h3 className="font-heading font-bold text-base">KAG South C</h3>
                <p className="text-xs text-primary-foreground/80">Kenya Assemblies of God</p>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-secondary flex-shrink-0" />
                <span>South C, Nairobi</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-secondary flex-shrink-0" />
                <span>+254 724 177 832</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-secondary flex-shrink-0" />
                <span>info@kagsouthc.org</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-heading font-semibold text-base mb-2">Stay Connected</h4>
            <p className="text-primary-foreground/80 mb-2 text-xs">
              Get updates on services and events.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 h-9"
                required
              />
              <Button
                type="submit"
                variant="secondary"
                size="sm"
                disabled={isSubscribing}
                className="font-medium"
              >
                {isSubscribing ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>

          {/* Social Links */}
          <div className="lg:text-right text-center lg:mt-0 mt-4">
            <h4 className="font-heading font-semibold text-base mb-2">Connect with Us</h4>
            <div className="flex justify-center lg:justify-end gap-2">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <Button
                    key={index}
                    variant="ghost"
                    size="icon"
                    onClick={() => scrollToSection(social.href)}
                    className="h-8 w-8 bg-primary-foreground/10 hover:bg-secondary hover:text-secondary-foreground transition-colors"
                    aria-label={social.label}
                  >
                    <IconComponent className="h-4 w-4" />
                  </Button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 mt-6 border-t border-primary-foreground/20 text-center">
          <p className="text-primary-foreground/70 text-xs">
            © {currentYear} Kenya Assemblies of God South C. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
