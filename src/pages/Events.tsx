import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import eventYouth from "@/assets/event-youth.jpg";
import eventPrayer from "@/assets/event-prayer.jpg";
import eventOutreach from "@/assets/event-outreach.jpg";

const upcomingEvents = [
  {
    id: 1,
    title: "Youth Fellowship Night",
    description: "Join us for an evening of worship, games, and fellowship with our young adults community.",
    date: "2024-10-15",
    time: "7:00 PM - 9:00 PM",
    location: "KAG South C Main Hall",
    image: eventYouth,
    attendees: 45
  },
  {
    id: 2,
    title: "Prayer & Fasting Meeting",
    description: "Come together for a powerful time of prayer and seeking God's face as we fast and intercede.",
    date: "2024-10-20",
    time: "6:00 AM - 8:00 AM",
    location: "Prayer Room",
    image: eventPrayer,
    attendees: 30
  },
  {
    id: 3,
    title: "Community Outreach Program",
    description: "Join us as we reach out to our local community with love, care, and practical support.",
    date: "2024-10-25",
    time: "9:00 AM - 2:00 PM",
    location: "Kibera Slums",
    image: eventOutreach,
    attendees: 60
  },
  {
    id: 4,
    title: "Women's Conference",
    description: "A special gathering for all women to be empowered, encouraged, and equipped for ministry.",
    date: "2024-11-02",
    time: "9:00 AM - 4:00 PM",
    location: "KAG South C Main Auditorium",
    image: eventYouth,
    attendees: 120
  },
  {
    id: 5,
    title: "Men's Breakfast Meeting",
    description: "Brothers, come together for fellowship, food, and powerful ministry focused on godly manhood.",
    date: "2024-11-08",
    time: "7:00 AM - 9:00 AM",
    location: "Church Grounds",
    image: eventPrayer,
    attendees: 80
  },
  {
    id: 6,
    title: "Children's Fun Day",
    description: "A special day dedicated to our little ones with games, activities, and Bible stories.",
    date: "2024-11-12",
    time: "10:00 AM - 3:00 PM",
    location: "Church Playground",
    image: eventOutreach,
    attendees: 90
  },
  {
    id: 7,
    title: "Marriage Enrichment Seminar",
    description: "Couples, join us for practical teachings on building strong, Christ-centered marriages.",
    date: "2024-11-18",
    time: "2:00 PM - 6:00 PM",
    location: "Conference Room",
    image: eventYouth,
    attendees: 40
  },
  {
    id: 8,
    title: "Choir Practice & Concert",
    description: "Come practice with the choir and stay for our special evening concert performance.",
    date: "2024-11-22",
    time: "4:00 PM - 8:00 PM",
    location: "Main Sanctuary",
    image: eventPrayer,
    attendees: 150
  },
  {
    id: 9,
    title: "Bible Study Marathon",
    description: "An intensive day of studying God's Word together with different topics and speakers.",
    date: "2024-11-28",
    time: "8:00 AM - 6:00 PM",
    location: "Multiple Classrooms",
    image: eventOutreach,
    attendees: 100
  },
  {
    id: 10,
    title: "Thanksgiving Service",
    description: "Join us for a special thanksgiving service as we celebrate God's faithfulness this year.",
    date: "2024-11-30",
    time: "10:00 AM - 12:00 PM",
    location: "Main Sanctuary",
    image: eventYouth,
    attendees: 300
  }
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

const Events = () => {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
                Upcoming Events
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Join us for these upcoming events and be part of our vibrant church community. 
                Each event is designed to bring us closer to God and to one another.
              </p>
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {event.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2" />
                      {formatDate(event.date)}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="w-4 h-4 mr-2" />
                      Expected: {event.attendees} people
                    </div>
                    <Button className="w-full">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-primary/5 to-accent/5 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-heading font-bold mb-6">
              Never Miss an Event
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Stay updated with all our church events and activities. Subscribe to our newsletter 
              or follow us on social media to get the latest updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                Subscribe to Newsletter
              </Button>
              <Button variant="outline" size="lg">
                View Full Calendar
              </Button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default Events;
