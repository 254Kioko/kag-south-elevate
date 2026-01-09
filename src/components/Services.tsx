import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import heroImage2 from "@/assets/fasting.jpg";
import prayerImage from "@/assets/prayer-placeholder.jpg";

const getGoogleCalendarLink = () => {
  const title = encodeURIComponent("Prayer and Fasting - KAG South C");
  const details = encodeURIComponent(
    "Join us for a powerful prayer and fasting season at KAG South C."
  );
  const location = encodeURIComponent("KAG South C Church, Nairobi");

  const start = "20260119";
  const end = "20260131";

  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${start}/${end}`;
};

const Services = () => {
  const services = [
    {
      id: 1,
      badge: "Early Morning",
      badgeColor: "bg-yellow-500",
      time: "7:30 - 8:45 AM",
      name: "1st Service – Empowerment",
      description:
        "Start your day with intercessory prayers and empowerment service.",
      schedule: [
        "Intercessory Prayers: 7:30–8:00 AM",
        "Empowerment Service: 8:00–8:45 AM",
      ],
      language: "English / Swahili",
      audience: "Youth",
    },
    {
      id: 2,
      badge: "Morning Worship",
      badgeColor: "bg-yellow-500",
      time: "9:00 - 11:00 AM",
      name: "2nd Service – Main Service",
      description:
        "Our main English worship service with contemporary praise.",
      schedule: [
        "Praise & Worship",
        "Choir",
        "Message",
        "Offertory & Closing",
      ],
      language: "English",
      audience: "All Ages",
    },
    {
      id: 3,
      badge: "Main Service",
      badgeColor: "bg-yellow-500",
      time: "11:45 AM - 1:30 PM",
      name: "3rd Service – Main Service",
      description:
        "Our largest service combining English and Swahili worship.",
      schedule: [
        "Praise & Worship",
        "Choir",
        "Message",
        "Offertory & Closing Prayer",
      ],
      language: "English & Swahili",
      audience: "Adults",
    },
  ];

  return (
    <>
      {/* SERVICES */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-red-600 mb-6">
            Service Times
          </h2>

          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Join us for worship, fellowship, and spiritual growth.
          </p>

          {/* 🔥 FIXED GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {services.map((service) => (
              <Card
                key={service.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row h-full">
                  
                  {/* IMAGE */}
                  <div className="md:w-1/3 h-48 md:h-auto">
                    <img
                      src={heroImage2}
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="md:w-2/3 p-6 flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {service.time}
                      </span>
                    </div>

                    <Badge className={`${service.badgeColor} text-white w-fit mb-3`}>
                      {service.badge}
                    </Badge>

                    <CardTitle className="text-xl text-primary mb-2">
                      {service.name}
                    </CardTitle>

                    <p className="text-sm text-muted-foreground mb-4">
                      {service.description}
                    </p>

                    <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                      {service.schedule.map((item, i) => (
                        <li key={i} className="flex">
                          <span className="text-yellow-500 mr-2">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-4 border-t text-sm flex gap-6">
                      <span>
                        <strong>Language:</strong> {service.language}
                      </span>
                      <span>
                        <strong>Audience:</strong> {service.audience}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* UPCOMING EVENT */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto flex flex-col md:flex-row overflow-hidden">
            <div className="md:w-1/2 h-64 md:h-auto">
              <img
                src={heroImage2}
                alt="Prayer and Fasting"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="md:w-1/2 p-8 space-y-4">
              <Badge>Special Event</Badge>
              <CardTitle className="text-2xl text-primary">
                Prayer & Fasting
              </CardTitle>

              <div className="flex gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Jan 19–30, 2026
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" /> All Day
                </span>
              </div>

              <div className="flex gap-4 pt-4">
                <a href={getGoogleCalendarLink()} target="_blank">
                  <Button variant="secondary">Add to Calendar</Button>
                </a>
                <Link to="/events">
                  <Button variant="secondary">More Events</Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* PRAYER */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto flex flex-col md:flex-row overflow-hidden">
            <div className="md:w-1/2 h-64 md:h-auto">
              <img
                src={prayerImage}
                alt="Prayer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="md:w-1/2 p-8 space-y-4">
              <CardTitle className="text-2xl text-primary">
                Submit a Prayer Request
              </CardTitle>
              <p className="text-muted-foreground">
                Share your prayer needs with our pastoral team.
              </p>
              <Link to="/contact">
                <Button size="lg">Send Prayer Request</Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
};

export default Services;
