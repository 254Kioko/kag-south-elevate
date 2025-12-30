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
    title: "Prayer & Fasting",
    description: "A dedicated period of prayer and fasting as the church seeks God for direction, renewal, and spiritual growth.",
    date: "2025-01-19",
    time: "January 19th - 30th",
    location: "Main Sanctuary",
    isEntireChurch: true,
    isFeatured: true,
  },
  {
    id: 2,
    title: "Leaders Seminar",
    description: "A leadership empowerment seminar focused on equipping church leaders for effective ministry and service.",
    date: "2025-02-01",
    time: "9:00 AM - 4:00 PM",
    location: "Church Hall",
    isEntireChurch: false,
    isFeatured: true,
  },
  {
    id: 3,
    title: "WWK Sunday",
    description: "A special Women of Worth Kenya (WWK) Sunday celebrating women through worship, teaching, and fellowship.",
    date: "2025-02-01",
    time: "9:00 AM - 1:30 PM",
    location: "Main Sanctuary",
    isEntireChurch: true,
    isFeatured: false,
  },
  {
    id: 4,
    title: "Mission Pledges Sunday",
    description: "A Sunday dedicated to committing resources and support towards missions and kingdom advancement.",
    date: "2025-03-01",
    time: "9:00 AM - 1:30 PM",
    location: "Main Sanctuary",
    isEntireChurch: true,
    isFeatured: true,
  },
  {
    id: 5,
    title: "Revival Meetings",
    description: "A powerful revival meeting focused on prayer, repentance, spiritual renewal, and revival.",
    date: "2025-03-15",
    time: "March 15th - 18th",
    location: "Main Sanctuary",
    isEntireChurch: true,
    isFeatured: true,
  },
  {
    id: 6,
    title: "Mission Sunday",
    description: "A service dedicated to missions, testimonies, and encouraging global and local evangelism.",
    date: "2025-04-12",
    time: "9:00 AM - 1:30 PM",
    location: "Main Sanctuary",
    isEntireChurch: true,
    isFeatured: false,
  },
  {
    id: 7,
    title: "Evangelism & Outreach",
    description: "A church-wide outreach focused on spreading the gospel through practical evangelism activities.",
    date: "2025-04-12",
    time: "2:00 PM - 6:00 PM",
    location: "Community Outreach Areas",
    isEntireChurch: true,
    isFeatured: false,
  },
  {
    id: 8,
    title: "Teens Sunday",
    description: "A special Sunday led by teens featuring worship, teaching, and activities tailored for teenagers.",
    date: "2025-04-19",
    time: "9:00 AM - 1:30 PM",
    location: "Main Sanctuary",
    isEntireChurch: false,
    isFeatured: false,
  },
  {
    id: 9,
    title: "Parental Seminar",
    description: "A seminar aimed at equipping parents with biblical principles for raising godly children.",
    date: "2025-05-01",
    time: "9:00 AM - 4:00 PM",
    location: "Church Hall",
    isEntireChurch: false,
    isFeatured: false,
  },
  {
    id: 10,
    title: "Baptism & Children Dedication",
    description: "A special service for water baptism and dedication of children to the Lord.",
    date: "2025-05-24",
    time: "9:00 AM - 1:30 PM",
    location: "Main Sanctuary",
    isEntireChurch: true,
    isFeatured: true,
  },
  {
    id: 11,
    title: "Outreach & Evangelism",
    description: "A day dedicated to evangelism and outreach within the community.",
    date: "2025-05-24",
    time: "2:00 PM - 6:00 PM",
    location: "Community Outreach Areas",
    isEntireChurch: true,
    isFeatured: false,
  },
  {
    id: 12,
    title: "Youth Sunday",
    description: "A vibrant Sunday service led by the youth with worship, testimonies, and teaching.",
    date: "2025-06-14",
    time: "9:00 AM - 1:30 PM",
    location: "Main Sanctuary",
    isEntireChurch: false,
    isFeatured: false,
  },
  {
    id: 13,
    title: "Youth Seminar",
    description: "A seminar focused on empowering youth spiritually, socially, and purposefully.",
    date: "2025-06-28",
    time: "9:00 AM - 4:00 PM",
    location: "Church Hall",
    isEntireChurch: false,
    isFeatured: false,
  },
  {
    id: 14,
    title: "Prayer & Fasting",
    description: "A mid-year season of prayer and fasting as the church seeks God for renewed strength and guidance.",
    date: "2025-06-29",
    time: "June 29th - July 3rd",
    location: "Main Sanctuary",
    isEntireChurch: true,
    isFeatured: true,
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
