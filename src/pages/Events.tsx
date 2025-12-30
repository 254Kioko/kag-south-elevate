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
  email: z.string().trim().email().max(255),
});

const upcomingEvents = [
  {
    id: 1,
    title: "Prayer & Fasting",
    description: "A dedicated period of prayer and fasting as the church seeks God.",
    date: "2025-01-19",
    time: "January 19th - 30th",
    location: "Main Sanctuary",
    isEntireChurch: true,
    isFeatured: true,
  },
  {
    id: 2,
    title: "Leaders Seminar",
    description: "Leadership empowerment seminar.",
    date: "2025-02-01",
    time: "9:00 AM - 4:00 PM",
    location: "Church Hall",
    isEntireChurch: false,
    isFeatured: true,
  },
  // (rest unchanged)
];

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

/** ✅ Google Calendar link (NO download) */
const getGoogleCalendarLink = (event: any) => {
  const start = new Date(event.date).toISOString().replace(/[-:]|\.\d{3}/g, "");
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    event.title
  )}&dates=${start}/${start}&details=${encodeURIComponent(
    event.description
  )}&location=${encodeURIComponent(event.location)}`;
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
    await new Promise((r) => setTimeout(r, 1000));

    toast({
      title: "Subscribed!",
      description: "You've been added to our mailing list.",
    });

    setEmail("");
    setIsDialogOpen(false);
    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-16">
        <section className="py-12 px-4">
          <div className="container mx-auto text-center max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">Upcoming Events</h1>
            <p className="text-muted-foreground">
              Join us for these upcoming church events.
            </p>
          </div>
        </section>

        <section className="py-8 px-4">
          <div className="container mx-auto grid md:grid-cols-2 gap-6 max-w-6xl">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="border-2 border-accent bg-accent/5">
                <CardHeader>
                  <div className="flex gap-2 mb-4">
                    {event.isEntireChurch && <Badge variant="church">Entire Church</Badge>}
                    {event.isFeatured && <Badge variant="featured">Featured</Badge>}
                  </div>

                  <CardTitle className="text-2xl">{event.title}</CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-3" />
                    {formatDate(event.date)}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-3" />
                    {event.time}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-3" />
                    {event.location}
                  </div>

                  {/* ✅ ADD TO CALENDAR */}
                  <Button
                    asChild
                    className="w-full mt-4 bg-primary text-primary-foreground"
                  >
                    <a
                      href={getGoogleCalendarLink(event)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Add to Calendar
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-r from-primary/5 to-accent/5 py-16">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Never Miss an Event</h2>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg">Subscribe to Newsletter</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Subscribe</DialogTitle>
                  <DialogDescription>
                    Get updates on upcoming events.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <Label>Email</Label>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    Subscribe
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
};

export default Events;
