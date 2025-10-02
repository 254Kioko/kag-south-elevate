import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock } from "lucide-react";
import eventYouth from "@/assets/event-youth.jpg";
import eventPrayer from "@/assets/event-prayer.jpg";
import eventOutreach from "@/assets/event-outreach.jpg";
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
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }).max(255, { message: "Email must be less than 255 characters" })
});

const upcomingEvents = [
  {
    id: 1,
    title: "THANKSGIVING DAY",
    description: "A special day dedicated to all congregants, filled with worship, empowerment sessions, and fellowship.",
    date: "2024-10-15",
    time: "7:00 PM - 9:00 PM",
    location: "KAG South C Main Church",
    image: eventYouth,
  },
  {
    id: 2,
    title: "CELEBRATION SUNDAY (Family Sunday)",
    description: "A vibrant day of worship, games, teachings, and activities designed specifically for our families to come together in joy and unity.",
    date: "2024-10-20",
    time: "9:00 AM - 4:00 PM",
    location: "Church Grounds",
    image: eventPrayer,
  },
  {
    id: 3,
    title: "WWK DAY (Women's Day)",
    description: "A special day dedicated to women of all ages, filled with worship, empowerment sessions, and fellowship.",
    date: "2024-10-15",
    time: "7:00 PM - 9:00 PM",
    location: "KAG South C Main Hall",
    image: eventYouth,
  },
  {
    id: 4,
    title: "TEEN'S DAY",
    description: "A vibrant day of worship, games, teachings, and activities designed specifically for our teenagers.",
    date: "2024-10-20",
    time: "9:00 AM - 4:00 PM",
    location: "Church Grounds",
    image: eventPrayer,
  },
  {
    id: 5,
    title: "YOUTH DAY",
    description: "An exciting time for the youth to gather, worship, connect, and grow together in faith and purpose.",
    date: "2024-10-25",
    time: "9:00 AM - 2:00 PM",
    location: "Kibera Slums",
    image: eventOutreach,
  },
  {
    id: 6,
    title: "CHILDREN'S DAY",
    description: "A fun-filled day of songs, Bible stories, games, and activities tailored for our children to enjoy and learn.",
    date: "2024-11-02",
    time: "9:00 AM - 4:00 PM",
    location: "KAG South C Main Auditorium",
    image: eventYouth,
  },
  {
    id: 7,
    title: "MEN'S FELLOWSHIP DAY",
    description: "Brothers, come together for fellowship, mentorship, and ministry focused on godly manhood and leadership.",
    date: "2024-11-08",
    time: "7:00 AM - 9:00 AM",
    location: "Church Grounds",
    image: eventPrayer,
  }
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
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
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert([{ email: validation.data.email }]);

      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Already Subscribed",
            description: "This email is already registered for updates.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Subscribed!",
          description: "You've been added to our mailing list.",
        });
        setEmail("");
        setIsDialogOpen(false);
      }
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
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
                Upcoming Events
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Join us for these upcoming events and be part of our vibrant church community. 
                Each event is designed to bring us closer to God and to one another.
              </p>
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {event.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2" />
                      {formatDate(event.date)}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.location}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-primary/5 to-accent/5 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-heading font-bold mb-6">
              Never Miss an Event
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Stay updated with all our church events and activities. Subscribe to our newsletter 
              or follow us on social media to get the latest updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="lg">
                    Subscribe to Newsletter
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
