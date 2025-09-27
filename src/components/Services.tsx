import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, Users, Music } from "lucide-react";

const Services = () => {
  const services = [
    {
      title: "1st Service - Empowerment",
      time: "7:30 - 8:45 AM",
      type: "Early Morning",
      description: "Start your day with intercessory prayers and empowerment service",
      features: ["Intercessory Prayers: 7:30-8:00 AM", "Empowerment Service: 8:00-8:45 AM"],
      language: "English/Swahili",
      audience: "Youth"
    },
    {
      title: "2nd Service - Main Service", 
      time: "9:00 - 11:00 AM",
      type: "Morning Worship",
      description: "Our main English worship service with contemporary style",
      features: [
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
      title: "3rd Service - Main Service",
      time: "11:10 AM - 1:30 PM", 
      type: "Main Service",
      description: "Our largest service combining English and Swahili worship",
      features: [
        "Praise & Worship: 11:10-11:40 AM",
        "Accountability Groups: 11:40 AM-12:10 PM",
        "Choir: 12:10-12:25 PM", 
        "Message: 12:25-12:55 PM",
        "Offertory & Closing Prayer: 12:55:15PM"
      ],
      language: "English & Swahili", 
      audience: "Adults"
    }
  ];

  const midweekServices = [
    {
      title: "Devotion ",
      time: "Tuesday 5:30-7:00 PM",
      icon: Clock,
      description: "Evening spiritual reflection and prayer"
    },
    {
      title: "Intercessory Service", 
      time: "Friday 6:00 PM",
      icon: Users,
      description: "Evening prayer and intercession"
    }
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-primary">
            Service Times
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join us for worship, fellowship, and spiritual growth. We have multiple services 
            to accommodate different preferences and schedules.
          </p>
        </div>

        {/* Sunday Services */}
        <div className="mb-16">
          <h3 className="font-heading text-3xl font-semibold mb-8 text-center text-primary">
            Sunday Services
          </h3>
          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {service.type}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-1" />
                      {service.time}
                    </div>
                  </div>
                  <CardTitle className="font-heading text-xl text-primary group-hover:text-primary-glow transition-colors">
                    {service.title}
                  </CardTitle>
                  <p className="text-muted-foreground text-sm">
                    {service.description}
                  </p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-sm mb-2 text-primary">Schedule:</h4>
                      <ul className="space-y-1">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-center">
                            <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-2 flex-shrink-0"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex justify-between text-sm pt-3 border-t">
                      <span className="text-muted-foreground">Language:</span>
                      <span className="font-medium text-primary">{service.language}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Audience:</span>
                      <span className="font-medium text-primary">{service.audience}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Midweek Services */}
        <div>
          <h3 className="font-heading text-3xl font-semibold mb-8 text-center text-primary">
            Midweek Services
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {midweekServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="group hover:shadow-warm transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h4 className="font-heading text-xl font-semibold mb-2 text-primary">
                      {service.title}
                    </h4>
                    <div className="flex items-center justify-center mb-3 text-secondary font-semibold">
                      <Calendar className="w-4 h-4 mr-1" />
                      {service.time}
                    </div>
                    <p className="text-muted-foreground text-sm">
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
  );
};

export default Services;
