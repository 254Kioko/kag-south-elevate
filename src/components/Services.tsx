import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import eventImage from "@/assets/upcoming-event.jpg"; 
import prayerImage from "@/assets/prayer-placeholder.jpg"; // ✅ fixed: unique variable name

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
      </section>
{/* Latest Sermon */}
<div className="mt-20 text-center">
  <h3 className="font-heading text-3xl font-bold text-primary mb-6">
    Latest Service
  </h3>

  <div className="max-w-6xl mx-auto">
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 md:h-[500px] lg:h-[550px]">
        {/* Left side: Video */}
        <div className="bg-black h-[300px] md:h-full">
          <iframe
            className="w-full h-full rounded-t-lg md:rounded-none md:rounded-l-lg"
            src="https://www.youtube.com/embed/B8HubOEGN88?si=9yCZ5FuB0NrgXQ2s"
            title="Last Week's Sermon"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Right side: Description */}
        <div className="text-left p-8 flex flex-col justify-center md:space-y-3">
          <CardHeader className="p-0">
            <CardTitle className="text-3xl font-bold text-primary mb-3">
              He is still the way maker
            </CardTitle>
            <div className="flex items-center text-muted-foreground text-sm space-x-6 mb-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Sunday, Sept 28, 2025</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>10:15 AM</span>
              </div>
            </div>
            <p className="text-muted-foreground text-base mb-4 leading-relaxed">
              <span className="font-semibold">Preacher: </span> Rev. Peter Kioko
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              In this sermon, we explored the power of faith and trust in God even in challenging seasons.
              Be inspired and encouraged to keep walking with Him.
            </p>
          </CardHeader>

          <CardContent className="p-0 mt-6">
            <Link to="/sermons">
              <Button size="lg" className="font-semibold">
                View More Sermons
              </Button>
            </Link>
          </CardContent>
        </div>
      </div>
    </Card>
  </div>
</div>



    {/* Upcoming Event */}
<div className="mt-20 text-center">
  <h3 className="font-heading text-3xl font-bold text-primary mb-6">
    Upcoming Event
  </h3>

  <div className="max-w-6xl mx-auto">
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left side: Image */}
        <div className="bg-gray-200">
          <img
            src="/event-image.jpg"
            alt="Upcoming Event"
            className="w-full h-full object-cover md:h-[350px]"
          />
        </div>

        {/* Right side: Details */}
        <div className="text-left p-8 flex flex-col justify-center">
          <CardHeader className="p-0">
            <CardTitle className="text-2xl font-bold text-primary mb-3">
              Annual Youth Conference 2025
            </CardTitle>
            <div className="flex flex-wrap items-center text-muted-foreground text-sm space-x-4 mb-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>October 12, 2025</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>KAG South C Church</span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Join us for a spirit-filled weekend of worship, teaching, and fellowship.  
              Discover your purpose and ignite your passion for Christ alongside other believers.
            </p>
          </CardHeader>

          <CardContent className="p-0 mt-5">
            <Link to="/events">
              <Button className="font-semibold">Learn More</Button>
            </Link>
          </CardContent>
        </div>
      </div>
    </Card>
  </div>
</div>


      {/* Call to Action */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center bg-gradient-primary rounded-2xl p-8 text-primary-foreground shadow-elegant">
          <h3 className="font-heading text-2xl font-semibold mb-4">
            Ready to Get Involved?
          </h3>
          <p className="mb-6 text-primary-foreground/90 max-w-2xl mx-auto">
            Join one of our ministries and discover how God can use your gifts to make a difference. 
            Whether you're new to faith or a seasoned believer, there's a place for you.
          </p>

          <Link to="/about-ministries">
            <Button variant="secondary" size="lg" className="font-semibold">
              Connect With a Ministry
            </Button>
          </Link>
        </div>
      </section>

      {/* Prayer Requests Section */}
   <div className="mt-20 text-center">
  <h3 className="font-heading text-3xl font-bold text-primary mb-6">
    Prayer Request
  </h3>

  <div className="max-w-6xl mx-auto">
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left side: Image */}
        <div className="bg-gray-100">
          <img
            src="/prayer-image.jpg"
            alt="Prayer Request"
            className="w-full h-full object-cover md:h-[350px]"
          />
        </div>

        {/* Right side: Form */}
        <div className="text-left p-8 flex flex-col justify-center">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-2xl font-bold text-primary mb-2">
              Submit a Prayer Request
            </CardTitle>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We believe in the power of prayer. Share your request below and our team will stand with you in faith.
            </p>
          </CardHeader>

          <CardContent className="p-0">
            <form className="flex flex-col space-y-3 text-left">
              <input
                type="text"
                placeholder="Your Name"
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <textarea
                placeholder="Your prayer request..."
                rows={4}
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              ></textarea>
              <Button className="mt-2 font-semibold">Send Request</Button>
            </form>
          </CardContent>
        </div>
      </div>
    </Card>
  </div>
</div>
    </>
  );
};

export default Services;
