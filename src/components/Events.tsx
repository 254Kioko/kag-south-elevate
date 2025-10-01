import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
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

const Events = () => {
  const [email, setEmail] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
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
        // Check if it's a duplicate email error
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

  const upcomingEvents = [
    {
      title: "Youth Sunday Service",
      date: "2024-01-07",
      time: "9:00 AM - 11:00 AM",
      location: "Main Sanctuary",
      description: "A special service led by our youth ministry with contemporary worship and inspiring message.",
      category: "Youth",
      attendees: "150+ Expected",
      featured: true
    },
    {
      title: "Women's Fellowship Meeting",
      date: "2024-01-10", 
      time: "6:00 PM - 8:00 PM",
      location: "Fellowship Hall",
      description: "Monthly gathering for prayer, Bible study, and fellowship among women of the church.",
      category: "Women's Ministry",
      attendees: "80+ Expected",
      featured: false
    },
    {
      title: "Community Outreach Program",
      date: "2024-01-14",
      time: "8:00 AM - 4:00 PM", 
      location: "South C Community",
      description: "Medical camp and food distribution program serving the local community.",
      category: "Outreach",
      attendees: "200+ Expected",
      featured: true
    },
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

  return (
    <section id="events" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-primary">
            Upcoming Events
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay connected with our church community through exciting events, programs, and gatherings 
            designed to strengthen faith and build relationships.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event, index) => (
            <Card key={index} className={`group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 ${
              event.featured ? 'ring-2 ring-secondary shadow-warm' : ''
            }`}>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant={event.featured ? "default" : "secondary"} className="text-xs">
                    {event.category}
                  </Badge>
                  {event.featured && (
                    <Badge variant="outline" className="text-xs border-secondary text-secondary">
                      Featured
                    </Badge>
                  )}
                </div>
                <CardTitle className="font-heading text-xl text-primary group-hover:text-primary-glow transition-colors">
                  {event.title}
                </CardTitle>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {event.description}
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-3 text-secondary flex-shrink-0" />
                    <span className="text-muted-foreground">{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="w-4 h-4 mr-3 text-secondary flex-shrink-0" />
                    <span className="text-muted-foreground">{event.time}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-3 text-secondary flex-shrink-0" />
                    <span className="text-muted-foreground">{event.location}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="w-4 h-4 mr-3 text-secondary flex-shrink-0" />
                    <span className="text-muted-foreground">{event.attendees}</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Event Calendar CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-primary rounded-2xl p-8 text-primary-foreground shadow-elegant max-w-2xl mx-auto">
            <h3 className="font-heading text-2xl font-semibold mb-4">Stay Updated</h3>
            <p className="mb-6 text-primary-foreground/90">
              Never miss an event! Subscribe to our calendar to get notifications about all 
              upcoming services, events, and special programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/events">
                <Button variant="secondary" size="lg" className="font-semibold">
                  <Calendar className="w-5 h-5 mr-2" />
                  View Full Calendar
                </Button>
              </Link>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="lg" className="font-semibold bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20">
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
        </div>
      </div>
    </section>
  );
};

export default Events;