import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import eventImage from "@/assets/upcoming-event.jpg";
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
      <section id="services" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-center mb-6 text-primary">
            Service Times
          </h2>
          <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-16">
            Join us for worship, fellowship, and spiritual growth. We have multiple services to accommodate different preferences and schedules.
          </p>

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

        {/* Latest Sermon */}
        <div className="mt-20 text-center">
          <h3 className="font-heading text-3xl font-bold text-primary mb-6">
            Latest Service
          </h3>
          <div className="max-w-5xl mx-auto">
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2">
                  <iframe
                    className="w-full h-64 md:h-full"
                    src="https://www.youtube.com/embed/B8HubOEGN88?si=9yCZ5FuB0NrgXQ2s"
                    title="Last Week's Sermon"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>

                <div className="md:w-1/2 flex flex-col justify-center">
                  <CardHeader className="text-left p-6">
                    <CardTitle className="text-2xl font-bold text-primary mb-2">
                      He is still the way maker
                    </CardTitle>
                    <div className="flex items-center text-muted-foreground text-sm space-x-6 mb-3">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>Sunday, Sept 28, 2025</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>10:15 AM</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-base mb-4">
                      <span className="font-semibold">Preacher: </span> Rev. Peter Kioko
                    </p>
                    <p className="text-muted-foreground text-sm mb-6">
                      In this sermon, we explored the power of faith and trust in God even in challenging seasons. Be inspired and encouraged to keep walking with Him.
                    </p>
                    <Link to="/sermons">
                      <Button size="lg" className="font-semibold">
                        View More Sermons
                      </Button>
                    </Link>
                  </CardHeader>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Upcoming Event */}
        <div className="container mx-auto px-4 text-center mt-20">
          <h4 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-primary">
            Upcoming Event
          </h4>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            Stay connected with what’s happening at KAG South C. Here’s what’s next:
          </p>

          <div className="max-w-5xl mx-auto">
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2">
                  <img
                    src={eventImage}
                    alt="Upcoming Event"
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>

                <div className="md:w-1/2 flex flex-col justify-center">
                  <CardHeader className="text-left p-6">
                    <Badge variant="secondary" className="mb-3">Special Event</Badge>
                    <CardTitle className="text-2xl font-bold text-primary">
                      Men's Fellowship Day
                    </CardTitle>
                    <p className="text-muted-foreground text-sm mt-2">
                      Join us for a powerful day with the Men.
                    </p>
                    <div className="flex items-center text-muted-foreground text-sm space-x-6 mt-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>Sunday, Oct 20th</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>9:00 AM - 1:30 PM</span>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Link to="/events">
                        <Button variant="secondary" className="font-semibold">
                          More Events
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Prayer Request */}
        <div className="mt-20 text-center">
          <h3 className="font-heading text-3xl font-bold text-primary mb-4">
            Share Your Prayer Needs
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            Whether you’re seeking healing, breakthrough, or thanksgiving — our prayer team is ready to stand with you in faith.
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-4 mb-20">
          <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2">
                <img
                  src={prayerImage}
                  alt="Prayer Request"
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>

              <div className="md:w-1/2 flex flex-col justify-center">
                <CardHeader className="text-left p-6">
                  <CardTitle className="text-2xl font-bold text-primary mb-3">
                    Send Your Prayer Requests
                  </CardTitle>
                  <p className="text-muted-foreground mb-6">
                    We believe in the power of prayer. Share your request with us, and our pastoral team will join you in faith.
                  </p>
                  <Link to="/contact">
                    <Button size="lg" className="font-semibold">
                      Submit Prayer Request
                    </Button>
                  </Link>
                </CardHeader>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
};

export default Services;
