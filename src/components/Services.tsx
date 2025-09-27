import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, Users, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom"; 
import eventImage from "@/assets/upcoming-event.jpg"; // ✅ Add an image in assets

const Services = () => {
  const services = [/* ... your services data ... */];

  const midweekServices = [/* ... your midweek data ... */];

  return (
    <>
      <section id="services" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {/* ... existing Sunday & Midweek services code ... */}
        </div>
      </section>

      {/* ✅ Upcoming Events Section */}
      <section id="events" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-primary">
            Upcoming Event
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            Stay connected with what’s happening at KAG South C. Here’s what’s next:
          </p>

          <div className="max-w-3xl mx-auto">
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img
                src={eventImage}
                alt="Upcoming Event"
                className="w-full h-64 object-cover"
              />
              <CardHeader className="text-left p-6">
                <Badge variant="secondary" className="mb-3">Special Event</Badge>
                <CardTitle className="text-2xl font-bold text-primary">
                  Youth Worship Night
                </CardTitle>
                <p className="text-muted-foreground text-sm mt-2">
                  Join us for a powerful night of praise, worship, and fellowship.
                </p>
              </CardHeader>
              <CardContent className="flex items-center justify-between p-6 border-t">
                <div className="flex items-center space-x-4 text-muted-foreground text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>Sunday, Oct 20th</span>
                  <Clock className="w-4 h-4 ml-4" />
                  <span>5:00 PM - 8:00 PM</span>
                </div>
                <Link to="/events">
                  <Button variant="secondary" className="ml-6">
                    More Events
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
