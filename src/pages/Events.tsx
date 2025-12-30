import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Bell } from "lucide-react";

type EventType = {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  isEntireChurch: boolean;
  isFeatured: boolean;
};

const events: EventType[] = [
  {
    id: 1,
    title: "Prayer & Fasting",
    description:
      "A dedicated period of prayer and fasting as the church seeks God for direction, renewal, and spiritual growth.",
    date: "2025-01-19",
    time: "January 19th - 30th",
    location: "Main Sanctuary",
    isEntireChurch: true,
    isFeatured: true,
  },
  {
    id: 2,
    title: "Leaders Seminar",
    description:
      "A leadership empowerment seminar focused on equipping church leaders for effective ministry and service.",
    date: "2025-02-01",
    time: "9:00 AM - 4:00 PM",
    location: "Church Hall",
    isEntireChurch: false,
    isFeatured: true,
  },
  {
    id: 3,
    title: "WWK Sunday",
    description:
      "A special Women of Worth Kenya (WWK) Sunday celebrating women through worship, teaching, and fellowship.",
    date: "2025-02-01",
    time: "9:00 AM - 1:30 PM",
    location: "Main Sanctuary",
    isEntireChurch: true,
    isFeatured: false,
  },
  {
    id: 4,
    title: "Mission Pledges Sunday",
    description:
      "A Sunday dedicated to committing resources and support towards missions and kingdom advancement.",
    date: "2025-03-01",
    time: "9:00 AM - 1:30 PM",
    location: "Main Sanctuary",
    isEntireChurch: true,
    isFeatured: true,
  },
  {
    id: 5,
    title: "Revival Meetings",
    description:
      "A powerful revival meeting focused on prayer, repentance, spiritual renewal, and revival.",
    date: "2025-03-15",
    time: "March 15th - 18th",
    location: "Main Sanctuary",
    isEntireChurch: true,
    isFeatured: true,
  },
  {
    id: 6,
    title: "Mission Sunday",
    description:
      "A service dedicated to missions, testimonies, and encouraging global and local evangelism.",
    date: "2025-04-12",
    time: "9:00 AM - 1:30 PM",
    location: "Main Sanctuary",
    isEntireChurch: true,
    isFeatured: false,
  },
  {
    id: 7,
    title: "Evangelism & Outreach",
    description:
      "A church-wide outreach focused on spreading the gospel through practical evangelism activities.",
    date: "2025-04-12",
    time: "2:00 PM - 6:00 PM",
    location: "Community Outreach Areas",
    isEntireChurch: true,
    isFeatured: false,
  },
  {
    id: 8,
    title: "Teens Sunday",
    description:
      "A special Sunday led by teens featuring worship, teaching, and activities tailored for teenagers.",
    date: "2025-04-19",
    time: "9:00 AM - 1:30 PM",
    location: "Main Sanctuary",
    isEntireChurch: false,
    isFeatured: false,
  },
  {
    id: 9,
    title: "Parental Seminar",
    description:
      "A seminar aimed at equipping parents with biblical principles for raising godly children.",
    date: "2025-05-01",
    time: "9:00 AM - 4:00 PM",
    location: "Church Hall",
    isEntireChurch: false,
    isFeatured: false,
  },
  {
    id: 10,
    title: "Baptism & Children Dedication",
    description:
      "A special service for water baptism and dedication of children to the Lord.",
    date: "2025-05-24",
    time: "9:00 AM - 1:30 PM",
    location: "Main Sanctuary",
    isEntireChurch: true,
    isFeatured: true,
  },
  {
    id: 11,
    title: "Outreach & Evangelism",
    description:
      "A day dedicated to evangelism and outreach within the community.",
    date: "2025-05-24",
    time: "2:00 PM - 6:00 PM",
    location: "Community Outreach Areas",
    isEntireChurch: true,
    isFeatured: false,
  },
  {
    id: 12,
    title: "Youth Sunday",
    description:
      "A vibrant Sunday service led by the youth with worship, testimonies, and teaching.",
    date: "2025-06-14",
    time: "9:00 AM - 1:30 PM",
    location: "Main Sanctuary",
    isEntireChurch: false,
    isFeatured: false,
  },
  {
    id: 13,
    title: "Youth Seminar",
    description:
      "A seminar focused on empowering youth spiritually, socially, and purposefully.",
    date: "2025-06-28",
    time: "9:00 AM - 4:00 PM",
    location: "Church Hall",
    isEntireChurch: false,
    isFeatured: false,
  },
  {
    id: 14,
    title: "Prayer & Fasting",
    description:
      "A mid-year season of prayer and fasting as the church seeks God for renewed strength and guidance.",
    date: "2025-06-29",
    time: "June 29th - July 3rd",
    location: "Main Sanctuary",
    isEntireChurch: true,
    isFeatured: true,
  },
];

const addToCalendar = (event: EventType) => {
  const startDate = new Date(event.date);
  const endDate = new Date(startDate);
  endDate.setHours(endDate.getHours() + 2);

  const formatDate = (date: Date) =>
    date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const ics = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
BEGIN:VALARM
TRIGGER:-P3D
ACTION:DISPLAY
DESCRIPTION:Reminder
END:VALARM
END:VEVENT
END:VCALENDAR
`.trim();

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${event.title}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const Events = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Upcoming Events</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <Card key={event.id}>
              <CardContent className="p-6">
                <h3 className="font-semibold text-xl mb-2">{event.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {event.description}
                </p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {event.location}
                  </div>
                </div>

                {/* 🔔 Reminder button only */}
                <div className="flex justify-end mt-4">
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="Set reminder"
                    onClick={() => addToCalendar(event)}
                  >
                    <Bell className="w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
