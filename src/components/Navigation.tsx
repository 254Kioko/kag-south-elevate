import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Phone } from "lucide-react";
import kagLogo from "../assets/kag-logo.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-ministries" },
    { name: "Events", href: "/events" },
    { name: "Sermons", href: "/sermons" },
    { name: "Contact", href: "/contact" },
    { name: "Give", href: "/give-online" },
    { name: "Admin", href: "/admin" },
  ];

  const closeSheet = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 w-full bg-card/95 backdrop-blur-md border-b shadow-soft z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-2">
  <img
    src={kagLogo}
    alt="KAG South C Logo"
    className="w-12 h-12 object-contain"
  />
</Link>


          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-foreground hover:text-primary transition-colors font-medium ${
                  location.pathname === item.href ? "text-primary font-semibold" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link to="/contact">
              <Button variant="default" size="sm" className="ml-4">
                <Phone className="w-4 h-4 mr-2" />
                Contact Us
              </Button>
            </Link>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={closeSheet}
                    className={`text-left py-3 px-4 text-lg font-medium text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors ${
                      location.pathname === item.href ? "text-primary font-semibold bg-muted" : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link to="/contact" onClick={closeSheet}>
                  <Button className="mt-4">
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Us
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
