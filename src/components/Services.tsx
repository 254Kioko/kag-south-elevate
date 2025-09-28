import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom"; 
import eventImage from "@/assets/upcoming-event.jpg"; // ✅ Add an image in assets

const Services = () => {
  const services = [
    {
      id: 1,
      badge: "Early Morning",
      badgeColor: "bg-yellow-500",
      time: "7:30 - 8:45 AM",
      name: "1st Service - Empowerment",
      description: "Start your day with intercessory prayers and empowerment service",
      schedule: [
        "Intercessory Prayers: 7:30-8:00 AM",
        "Empowerment Service: 8:00-8:45 AM"
      ],
      language: "English/Swahili",
      audience: "Youth"
    },
    {
      id: 2,
      badge: "Morning Worship",
      badgeColor: "bg-yellow-500",
      time: "9:00 - 11:00 AM",
      name: "2nd Service - Main Service",
      description: "Our main English worship service with contemporary style",
      schedule: [
        "Worship: 9:00-9:30 AM",
        "Accountability Groups: 9:30-10:00 AM",
        "Choir: 10:05-10:15 AM",
        "Message: 10:15-10:45 AM",
        "Offertory & Closing: 10:45-11:00 AM"
      ],
      language: "English",
      audience: "All Ages"
    },
    {
      id: 3,
      badge: "Main Service",
      badgeColor: "bg-yellow-500",
      time: "11:10 AM - 1:30 PM",
      name: "3rd Service - Main Service",
      description: "Our largest service combining English and Swahili worship",
      schedule: [
        "Praise & Worship: 11:10-11:40 AM",
        "Accountability Groups: 11:40 AM-12:10 PM",
        "Choir: 12:10-12:25 PM",
        "Message: 12:25-12:55 PM",
        "Offertory & Closing Prayer: 12:55-1:5PM"
      ],
      language: "English & Swahili",
      audience: "Adults"
    }
  ];

  return (
    <>
      <section id="services" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-center mb-6 text-primary">
            Service Times
          </h2>
          <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-16">
            Join us for worship, fellowship, and spiritual growth. We have multiple services to accommodate different preferences and schedules.
          </p>

          {/* Sunday Services */}
          <div className="mb-16">
            <h3 className="font-heading text-3xl font-bold text-center mb-8 text-primary">
              Sunday Services
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service) => (
                <Card key={service.id} className="text-left hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-muted-foreground">
                        {service.time}
                      </span>
                    </div>
                    <Badge className={`${service.badgeColor} text-white w-fit mb-3`}>
                      {service.badge}
                    </Badge>
                    <CardTitle className="text-xl font-bold text-primary mb-2">
                      {service.name}
                    </CardTitle>
                    <p className="text-muted-foreground text-sm">
                      {service.description}
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="mb-4">
                      <h4 className="font-semibold text-primary mb-2">Schedule:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {service.schedule.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-yellow-500 mr-2">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <div>
                        <span className="font-medium">Language:</span>
                        <span className="text-primary ml-2">{service.language}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm mt-2">
                      <div>
                        <span className="font-medium">Audience:</span>
                        <span className="text-primary ml-2">{service.audience}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
