import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }).max(255, { message: "Email must be less than 255 characters" })
});

const upcomingEvents = [
  {
    id: 1,
    title: "Thanksgiving Sunday",
    description: "A special service where we come together as a church family to give thanks to God for His goodness and blessings throughout the year.",
    date: "2024-11-07",
    time: "9:00 AM - 1:30 AM",
    location: "Main Sanctuary",
    isEntireChurch: true,
    isFeatured: true,
  },
  {
    id: 2,
    title: "Celebration Sunday",
    description: "A vibrant day of praise, worship, and rejoicing as we celebrate God's faithfulness and victories.",
    date: "2024-12-14",
    time: "9:00 AM - 1:30 PM",
    location: "Main Sanctuary",
    isEntireChurch: true,
    isFeatured: true,
  },
  {
    id: 3,
    title: "WWK DAY (Women's Day)",
    description: "A special day dedicated to women of all ages, filled with worship, empowerment sessions, and fellowship.",
    date: "2024-10-15",
    time: "7:00 PM - 9:00 PM",
    location: "KAG South C Main Hall",
    isEntireChurch: true,
    isFeatured: false,
  },
  {
    id: 4,
    title: "TEEN'S DAY",
    description: "A vibrant day of worship, games, teachings, and activities designed specifically for our teenagers.",
    date: "2024-10-20",
    time: "9:00 AM - 4:00 PM",
    location: "Church Grounds",
    isEntireChurch: false,
    isFeatured: false,
  },
  {
    id: 5,
    title: "YOUTH DAY",
    description: "An exciting time for the youth to gather, worship, connect, and grow together in faith and purpose.",
    date: "2024-10-25",
    time: "9:00 AM - 2:00 PM",
    location: "Kibera Slums",
    isEntireChurch: false,
    isFeatured: false,
  },
  {
    id: 6,
    title: "CHILDREN'S DAY",
    description: "A fun-filled day of songs, Bible stories, games, and activities tailored for our children to enjoy and learn.",
    date: "2024-11-02",
    time: "9:00 AM - 4:00 PM",
    location: "KAG South C Main Auditorium",
    isEntireChurch: false,
    isFeatured: false,
  },
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric',
    year: 'numeric'
  });
};

const Events = () => {
  const [email, setEmail] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = emailSchema.safeParse({ email });
    if (!validation.success) {
      toast({
        title: "Invalid Email",
        description: validation.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual Supabase call when Cloud is enabled
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Subscribed!",
        description: "You've been added to our mailing list.",
      });
      setEmail("");
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Upcoming Events
              </h1>
              <p className="text-lg text-muted-foreground">
                Join us for these upcoming events and be part of our vibrant church community.
              </p>
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-8 px-4">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {upcomingEvents.map((event) => (
                <Card 
                  key={event.id} 
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 border-2 border-accent bg-accent/5"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      {event.isEntireChurch && (
                        <Badge variant="church">Entire Church</Badge>
                      )}
                      {event.isFeatured && (
                        <Badge variant="featured" className="ml-auto">Featured</Badge>
                      )}
                    </div>
                    <CardTitle className="text-2xl text-primary font-bold">
                      {event.title}
                    </CardTitle>
                    <CardDescription className="text-base mt-2">
                      {event.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-3 text-accent" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-3 text-accent" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-3 text-accent" />
                      <span>{event.location}</span>
                    </div>
                    <Button 
                      className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stay Updated Section */}
        <section className="bg-primary py-16 px-4 mt-12">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-primary-foreground">
              Stay Updated
            </h2>
            <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Never miss an event! Subscribe to our calendar to get notifications about all 
              upcoming services, events, and special programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
              >
                <Calendar className="w-4 h-4 mr-2" />
                View Full Calendar
              </Button>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    size="lg"
                    className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold"
                  >
                    Subscribe to Updates
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Subscribe to Event Updates</DialogTitle>
                    <DialogDescription>
                      Never miss an event! Enter your email to receive notifications about upcoming services, events, and special programs.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubscribe} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Subscribing..." : "Subscribe"}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default Events;
