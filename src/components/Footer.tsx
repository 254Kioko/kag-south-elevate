import { MapPin, Phone, Mail, Youtube, Facebook, Instagram, Twitter } from "lucide-react";
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

  const quickLinks = [
    { name: "About Us", href: "#about" },
    { name: "Service Times", href: "#services" },
    { name: "Ministries", href: "#ministries" },
    { name: "Events", href: "#events" },
    { name: "Contact", href: "#contact" }
  ];

  const ministries = [
    { name: "Youth Ministry", href: "#ministries" },
    { name: "Women's Fellowship", href: "#ministries" },
    { name: "Men's Ministry", href: "#ministries" },
    { name: "Children's Ministry", href: "#ministries" },
    { name: "Music & Worship", href: "#ministries" }
  ];

  const socialLinks = [
    { icon: Youtube, href: "https://www.youtube.com/channel/UCAP5aGJBcRy8wMYPfnbqX7w", label: "YouTube" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" }
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.open(href, '_blank');
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubscribing(true);
    try {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert([{ email: email.trim() }]);

      if (error) {
        if (error.code === '23505') {
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
      console.error('Newsletter subscription error:', error);
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
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            
            {/* Church Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <img 
                  src={kagLogo} 
                  alt="KAG Logo" 
                  className="w-12 h-12 object-contain"
                />
                <div>
                  <h3 className="font-heading font-bold text-xl">KAG South C</h3>
                  <p className="text-sm text-primary-foreground/80">Kenya Assemblies of God</p>
                </div>
              </div>
              <p className="text-primary-foreground/90 mb-6 leading-relaxed">
                A welcoming community where faith finds its home. Join us for worship, 
                fellowship, and spiritual growth in the heart of Nairobi.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-secondary flex-shrink-0" />
                  <span className="text-sm text-primary-foreground/90">
                    South C Shopping Center, Nairobi
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-secondary flex-shrink-0" />
                  <span className="text-sm text-primary-foreground/90">
                    +254 XXX XXXXXX
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-secondary flex-shrink-0" />
                  <span className="text-sm text-primary-foreground/90">
                    info@kagsouthc.org
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-heading font-semibold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ministries */}
            <div>
              <h4 className="font-heading font-semibold text-lg mb-6">Ministries</h4>
              <ul className="space-y-3">
                {ministries.map((ministry, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(ministry.href)}
                      className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm"
                    >
                      {ministry.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service Times & Connect */}
            <div>
              <h4 className="font-heading font-semibold text-lg mb-6">Service Times</h4>
              <div className="space-y-3 mb-8">
                <div>
                  <p className="text-secondary font-medium text-sm">1st Service</p>
                  <p className="text-primary-foreground/80 text-sm">7:00 - 8:50 AM</p>
                </div>
                <div>
                  <p className="text-secondary font-medium text-sm">2nd Service</p>
                  <p className="text-primary-foreground/80 text-sm">9:00 - 11:00 AM</p>
                </div>
                <div>
                  <p className="text-secondary font-medium text-sm">3rd Service</p>
                  <p className="text-primary-foreground/80 text-sm">11:10 AM - 1:30 PM</p>
                </div>
              </div>

              <h4 className="font-heading font-semibold text-lg mb-4">Connect With Us</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <Button
                      key={index}
                      variant="ghost"
                      size="icon"
                      onClick={() => scrollToSection(social.href)}
                      className="h-10 w-10 bg-primary-foreground/10 hover:bg-secondary hover:text-secondary-foreground transition-colors"
                      aria-label={social.label}
                    >
                      <IconComponent className="h-5 w-5" />
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="py-8 border-t border-primary-foreground/20">
          <div className="text-center">
            <h3 className="font-heading text-xl font-semibold mb-3">Stay Connected</h3>
            <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter for updates on services, events, and church news.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 focus:ring-secondary"
                required
              />
              <Button 
                type="submit" 
                variant="secondary" 
                className="font-semibold"
                disabled={isSubscribing}
              >
                {isSubscribing ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-primary-foreground/70 text-sm text-center md:text-left">
              © {currentYear} Kenya Assemblies of God South C. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <button className="text-primary-foreground/70 hover:text-secondary transition-colors">
                Privacy Policy
              </button>
              <button className="text-primary-foreground/70 hover:text-secondary transition-colors">
                Terms of Service
              </button>
              <button className="text-primary-foreground/70 hover:text-secondary transition-colors">
                Site Map
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;