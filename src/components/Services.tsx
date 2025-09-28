import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, Users, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom"; 
import eventImage from "@/assets/upcoming-event.jpg"; // ✅ Add an image in assets

const Services = () => {
  const services = [
    {
      id: 1,
      time: "8:00 AM",
      name: "First Service",
      description: "Traditional worship service with choir and hymns",
      icon: Music,
      capacity: "200 seats",
    },
    {
      id: 2,
      time: "10:30 AM",
      name: "Main Service",
      description: "Contemporary worship with praise team and full program",
      icon: Users,
      capacity: "500 seats",
    },
    {
      id: 3,
      time: "6:00 PM",
      name: "Evening Service",
      description: "Intimate worship and fellowship gathering",
      icon: Clock,
      capacity: "150 seats",
    },
  ];

  const midweekServices = [
    {
      id: 1,
      day: "Wednesday",
      time: "7:00 PM",
      name: "Prayer Meeting",
      description: "Join us for prayer, worship, and fellowship",
      icon: Users,
    },
    {
      id: 2,
      day: "Friday",
      time: "6:30 PM",
      name: "Youth Fellowship",
      description: "Young people gathering for worship and teaching",
      icon: Music,
    },
    {
      id: 3,
      day: "Saturday",
      time: "2:00 PM",
      name: "Bible Study",
      description: "Deep dive into God's word with discussion",
      icon: Calendar,
    },
  ];

  return (
    <>
      <section id="services" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-center mb-6 text-primary">
            Service Times
          </h2>
          <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-16">
            Join us for worship, fellowship, and spiritual growth throughout the week.
          </p>

          {/* Sunday Services */}
          <div className="mb-16">
            <h3 className="font-heading text-3xl font-bold text-center mb-8 text-primary">
              Sunday Services
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service) => {
                const IconComponent = service.icon;
                return (
                  <Card key={service.id} className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl font-bold text-primary">
                        {service.name}
                      </CardTitle>
                      <div className="text-2xl font-bold text-foreground">
                        {service.time}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-3">
                        {service.description}
                      </p>
                      <Badge variant="outline">{service.capacity}</Badge>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Midweek Services */}
          <div>
            <h3 className="font-heading text-3xl font-bold text-center mb-8 text-primary">
              Midweek Services
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {midweekServices.map((service) => {
                const IconComponent = service.icon;
                return (
                  <Card key={service.id} className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl font-bold text-primary">
                        {service.name}
                      </CardTitle>
                      <div className="text-lg font-semibold text-foreground">
                        {service.day} - {service.time}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
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
