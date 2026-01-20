import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import heroImage2 from "@/assets/fasting.jpg";
import prayerImage from "@/assets/prayer-placeholder.jpg";
import themeImage from "@/assets/theme.jpeg";

const getGoogleCalendarLink = () => {
  const title = encodeURIComponent("Prayer and Fasting - KAG South C");
  const details = encodeURIComponent(
    "Join us for a powerful prayer and fasting season at KAG South C."
  );
  const location = encodeURIComponent("KAG South C Church, Nairobi");

  // Jan 19–30, 2026 (all day event)
  const start = "20260119";
  const end = "20260131"; // Google calendar end date is exclusive

  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${start}/${end}`;
};

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
          {/* RED TITLE ONLY HERE */}
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-center mb-6 text-red-600">
            Service Times
          </h2>

          <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Join us for worship, fellowship, and spiritual growth. We have multiple services to accommodate different preferences and schedules.
          </p>

          <div className="mb-12">
            {/* BLACK TITLE HERE */}
            <h3 className="font-heading text-3xl font-bold text-center mb-8 text-foreground">
              Sunday Services
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <Card key={service.id} className="text-left hover:shadow-lg transition-shadow flex flex-col h-full">
                  <CardHeader className="pb-4 space-y-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-muted-foreground">
                        {service.time}
                      </span>
                    </div>
                    <Badge className={`${service.badgeColor} text-white w-fit`}>
                      {service.badge}
                    </Badge>
                    <CardTitle className="text-xl font-bold text-primary">
                      {service.name}
                    </CardTitle>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0 flex-grow">
                    <div className="mb-6">
                      <h4 className="font-semibold text-primary mb-3">Schedule:</h4>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        {service.schedule.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-yellow-500 mr-2">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-3 text-sm pt-4 border-t">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-muted-foreground">Language:</span>
                        <span className="text-primary font-semibold">{service.language}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-muted-foreground">Audience:</span>
                        <span className="text-primary font-semibold">{service.audience}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Theme Highlight Section */}
<section className="py-16 bg-background">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      
      {/* Image */}
    {/* Image */}
<div className="w-full space-y-3">
 

  <img
    src={themeImage}
    alt="2026 Theme - Walking in Obedience"
    className="rounded-lg shadow-lg w-full object-cover"
  />
</div>


      {/* Text */}
      <div className="space-y-6">
        <h3 className="font-heading text-3xl md:text-4xl font-bold mb-6 text-foreground">
          2026 Theme: Walking in Obedience
        </h3>

        <p className="text-muted-foreground text-lg leading-relaxed">
          As a church, we step into 2026 committed to living according to God’s
          word. Walking in obedience means trusting God fully, honoring His
          commands, and allowing His promises to unfold in our lives.
        </p>

        <p className="italic text-muted-foreground">
          “If you live in accordance with my statutes and are careful to obey my
          commands…” — Leviticus 26:3
        </p>
      </div>

    </div>
  </div>
</section>


      {/* Latest Sermon */}
      <section id="latest-service" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h3 className="font-heading text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Latest Service
          </h3>
          <div className="max-w-5xl mx-auto">
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2">
                  <iframe
                    className="w-full aspect-video md:h-full"
                    src="https://www.youtube.com/embed/0Z8vyr8kGhI?si=hR9DjzkRJ0HNX4tP"
                    title="Walking in Obedience"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>

                <div className="md:w-1/2 flex flex-col justify-center">
                  <CardHeader className="text-left p-8 space-y-4">
                    <CardTitle className="text-2xl font-bold text-primary">
PRAYER AND FASTING               </CardTitle>
                    <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>Sunday, January 18th</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>9:00 PM-1:30 PM </span>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-base">
                      <span className="font-semibold">Preacher: </span> Rev. Peter Kioko
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
Join us in prayer and fasting from the 19th to 30thJanuary as we pray for every aspect of our lives.             </p>
                    <Link to="/sermons">
                      <Button size="lg" className="font-semibold">
                       Watch More Services
                      </Button>
                    </Link>
                  </CardHeader>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

    {/* Upcoming Event */}
      
<section className="py-16 bg-background">
  <div className="container mx-auto px-4 text-center">
    <h3 className="font-heading text-3xl md:text-4xl font-bold mb-6 text-foreground">
      Upcoming Event
    </h3>

    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
      Stay connected with what's happening at KAG South C. Here's what's next:
    </p>

    <div className="max-w-4xl mx-auto">
      <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col md:flex-row">
        
        {/* Image */}
        <div className="relative md:w-1/2 h-64 md:h-auto">
          <img
            src={heroImage2}
            alt="Upcoming Event"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </div>

        {/* Content */}
        <div className="md:w-1/2 flex flex-col justify-center text-left p-8 space-y-4">
          <Badge variant="secondary" className="w-fit">
            Special Event
          </Badge>

          <CardTitle className="text-2xl font-bold text-primary">
            Prayer and Fasting
          </CardTitle>

          <p className="text-muted-foreground text-sm leading-relaxed">
            Join us for a powerful prayer and fasting season as we ask God to help
            us walk in obedience.
          </p>

          <div className="flex flex-col gap-3 text-muted-foreground text-sm pt-2">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>January 19th – 30th, 2026</span>
            </div>

            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>6AM - 6PM</span>
            </div>
          </div>

        <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <a
    href={getGoogleCalendarLink()}
    target="_blank"
    rel="noopener noreferrer"
  >
    <Button variant="secondary" className="font-semibold">
      Add to Calendar
    </Button>
  </a>
  <Link to="/events">
    <Button variant="secondary" className="font-semibold">
      More Events
    </Button>
  </Link>


</div>

        </div>

      </Card>
    </div>
  </div>
</section>


      {/* Call to Action */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center bg-gradient-primary rounded-2xl p-12 text-primary-foreground shadow-elegant max-w-4xl mx-auto">
            <h3 className="font-heading text-2xl md:text-3xl font-semibold mb-4">
              Ready to Get Involved?
            </h3>
            <p className="mb-8 text-primary-foreground/90 max-w-2xl mx-auto text-base leading-relaxed">
              Join one of our ministries and discover how God can use your gifts to make a difference.
              Whether you're new to faith or a seasoned believer, there's a place for you.
            </p>
            <Link to="/about-ministries">
              <Button variant="secondary" size="lg" className="font-semibold">
                Connect With a Ministry
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Prayer Requests Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Share Your Prayer Needs
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base leading-relaxed">
              This section allows you to submit your prayer requests directly to our pastoral team,
              who will stand with you in faith and lift your needs before God.
            </p>
          </div>

          <Card className="overflow-hidden max-w-4xl mx-auto shadow-lg flex flex-col md:flex-row">
            <div className="md:w-1/2">
              <img
                src={prayerImage}
                alt="Prayer Request"
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 flex flex-col justify-center p-8 text-left space-y-4">
              <CardTitle className="text-2xl font-bold text-primary">
                Send Your Prayer Requests
              </CardTitle>
              <p className="text-muted-foreground leading-relaxed">
                We believe in the power of prayer. Share your prayer requests with us, and our pastoral team will stand with you in faith.
              </p>
              <div className="pt-2">
                <Link to="/contact">
                  <Button size="lg" className="font-semibold">
                    Submit Prayer Request
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>

    </>
  );
};

export default Services;
