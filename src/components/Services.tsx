import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import heroImage2 from "@/assets/hero3.jpeg";
import prayerImage from "@/assets/prayer-placeholder.jpg";

const Services = () => {
  const services = [
    {
      id: 1,
      badge: "Early Morning",
      badgeColor: "bg-yellow-500",
      time: "7:30 - 8:45 AM",
      name: "1st Service - Empowerment",
      description:
        "Start your day with intercessory prayers and empowerment service",
      schedule: [
        "Intercessory Prayers: 7:30-8:00 AM",
        "Empowerment Service: 8:00-8:45 AM",
      ],
      language: "English/Swahili",
      audience: "Youth",
    },
    {
      id: 2,
      badge: "Morning Worship",
      badgeColor: "bg-yellow-500",
      time: "9:00 - 11:00 AM",
      name: "2nd Service - Main Service",
      description:
        "Our main English worship service with contemporary style",
      schedule: [
        "Praise & Worship",
        "Choir",
        "Message",
        "Offertory & Closing",
        "Accountability Groups",
      ],
      language: "English",
      audience: "All Ages",
    },
    {
      id: 3,
      badge: "Main Service",
      badgeColor: "bg-yellow-500",
      time: "11:45 AM - 1:30 PM",
      name: "3rd Service - Main Service",
      description:
        "Our largest service combining English and Swahili worship",
      schedule: [
        "Praise & Worship",
        "Choir",
        "Message",
        "Offertory & Closing Prayer",
      ],
      language: "English & Swahili",
      audience: "Adults",
    },
    {
      id: 4,
      badge: "Teens Service",
      badgeColor: "bg-blue-500",
      time: "11:30 AM - 1:30 PM",
      name: "Teens Service",
      description:
        "A vibrant service designed for teenagers to grow in faith and fellowship.",
      schedule: [
        "Praise & Worship",
        "Interactive Session",
        "Message & Discussions",
        "Prayer & Dismissal",
      ],
      language: "English & Swahili",
      audience: "Ages 13-19",
    },
    {
      id: 5,
      badge: "Children’s Church",
      badgeColor: "bg-green-500",
      time: "11:45 AM - 1:30 PM",
      name: "Children’s Service",
      description:
        "Fun, interactive, and faith-filled classes tailored for children.",
      schedule: [
        "Songs & Praise",
        "Bible Story Time",
        "Memory Verses & Games",
        "Creative Activities",
        "Prayer & Snacks",
        "Breakout Classes (by age groups)",
      ],
      language: "English & Swahili",
      audience: "Children (Ages 3-12)",
    },
  ];

  return (
    <>
      {/* Services Section */}
      <section id="services" className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-center mb-6 text-red-600">
            Service Times
          </h2>

          <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Join us for worship, fellowship, and spiritual growth.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.id} className="flex flex-col h-full">
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {service.time}
                  </div>

                  <Badge className={`${service.badgeColor} text-white w-fit`}>
                    {service.badge}
                  </Badge>

                  <CardTitle className="text-xl font-bold text-primary">
                    {service.name}
                  </CardTitle>

                  <p className="text-sm text-muted-foreground">
                    {service.description}
                  </p>

                  <ul className="text-sm space-y-2 pt-4">
                    {service.schedule.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>

                  <div className="pt-4 border-t text-sm space-y-2">
                    <div className="flex justify-between">
                      <span>Language:</span>
                      <span className="font-semibold">{service.language}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Audience:</span>
                      <span className="font-semibold">{service.audience}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
