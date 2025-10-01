import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Play, Youtube, Facebook } from "lucide-react";

const latestSermons = [
  {
    id: 1,
    title: "Walking in Faith: Trusting God's Plan",
    speaker: "Pastor John Mwangi",
    date: "2025-09-28",
    series: "Faith Journey",
    description: "Discover how to walk confidently in faith even when you can't see the full path ahead. Learn practical steps to trust God's perfect timing and plan for your life.",
    youtubeUrl: "https://www.youtube.com/embed/aAvcYfBPsng?si=avcFovO7PNV7bIfe",
    duration: "35 minutes"
  },
  {
    id: 2,
    title: "The Power of Prayer in Daily Life",
    speaker: "Pastor Sarah Njoki",
    date: "2025-09-21",
    series: "Prayer & Devotion",
    description: "Explore the transformative power of prayer and how it can change not just circumstances, but our hearts and minds as we commune with God daily.",
    youtubeUrl: "https://www.youtube.com/embed/58nB_-4SH7k?si=hQk5LELZCjcl_EKn",
    duration: "28 minutes"
  },
  {
    id: 3,
    title: "Building Strong Families God's Way",
    speaker: "Pastor David Kamau",
    date: "2025-08-13",
    series: "Family Values",
    description: "Learn biblical principles for building strong, Christ-centered families that honor God and create lasting legacies of faith for generations to come.",
    youtubeUrl: "https://www.youtube.com/embed/DZ_PFu3VtE4?si=jOMfsXb8LWLGTZsh",
    duration: "42 minutes"
  },
  {
    id: 4,
    title: "Overcoming Life's Challenges with Hope",
    speaker: "Pastor Grace Wanjiku",
    date: "2025-09-6",
    series: "Hope & Perseverance",
    description: "Find hope and strength in God's promises as we navigate through life's difficult seasons. Discover how challenges can become stepping stones to greater faith.",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    duration: "31 minutes"
  },
  {
    id: 5,
    title: "The Great Commission: Our Calling",
    speaker: "Pastor John Mwangi",
    date: "2025-08-31",
    series: "Mission & Ministry",
    description: "Understand our calling as believers to share the Gospel and make disciples. Learn practical ways to fulfill the Great Commission in your daily life.",
    youtubeUrl: "https://www.youtube.com/embed/JDRFWUAJheQ?si=rMMu0VhLvy0Xfnfg",
    duration: "38 minutes"
  },
  {
    id: 6,
    title: "Living in God's Grace",
    speaker: "Pastor Sarah Njoki",
    date: "2025-08-25",
    series: "Grace & Mercy",
    description: "Dive deep into understanding God's amazing grace and how it transforms our lives from the inside out. Experience the freedom that comes from grace.",
    youtubeUrl: "https://www.youtube.com/embed/7Kf5HmhWqvA?si=JCB7YUjBsXb8-fFt",
    duration: "33 minutes"
  },
  {
    id: 7,
    title: "Financial Stewardship & Generosity",
    speaker: "Pastor David Kamau",
    date: "2025-08-18",
    series: "Stewardship",
    description: "Learn biblical principles of financial stewardship, generosity, and how to manage resources in a way that honors God and blesses others.",
    youtubeUrl: "https://www.youtube.com/embed/7Kf5HmhWqvA?si=KGSj_CqPCwatNTUN",
    duration: "29 minutes"
  },
  {
    id: 8,
    title: "The Fruits of the Spirit in Action",
    speaker: "Pastor Grace Wanjiku",
    date: "2025-08-11",
    series: "Spiritual Growth",
    description: "Explore how the fruits of the Spirit should manifest in our daily lives and relationships, bringing glory to God and blessing to others.",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    duration: "36 minutes"
  },
  {
    id: 9,
    title: "Worship: A Lifestyle, Not Just a Service",
    speaker: "Pastor John Mwangi",
    date: "2025-1-4",
    series: "Worship & Praise",
    description: "Discover how worship extends beyond Sunday service into every aspect of our lives. Learn to live as a continuous offering of praise to God.",
    youtubeUrl: "https://www.youtube.com/embed/0Rxwa7uM0-M?si=CPh0ImG8V2ZHabkd",
    duration: "34 minutes"
  },
  {
    id: 10,
    title: "Unity in the Body of Christ",
    speaker: "Pastor Sarah Njoki",
    date: "2025-07-26",
    series: "Church Community",
    description: "Understand the importance of unity in the church and how we can work together as one body to accomplish God's purposes on earth.",
    youtubeUrl: "https://www.youtube.com/embed/hedv_tZ-m4o?si=FiEm3dQMGQZ7FLwy",
    duration: "30 minutes"
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

const Sermons = () => {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
                Latest Sermons
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Be encouraged and equipped through our weekly sermons. Each message is carefully 
                prepared to help you grow in your faith and walk with God.
              </p>
            </div>
          </div>
        </section>

        {/* Sermons Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestSermons.map((sermon) => (
                <Card key={sermon.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <Play className="w-16 h-16 text-primary" />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="w-4 h-4" />
                      {formatDate(sermon.date)}
                    </div>
                    <CardTitle className="text-xl line-clamp-2">{sermon.title}</CardTitle>
                    <CardDescription>
                      <div className="mb-2">
                        <span className="font-medium">{sermon.speaker}</span>
                        <span className="mx-2">•</span>
                        <span className="text-xs bg-accent/20 px-2 py-1 rounded">{sermon.series}</span>
                      </div>
                      <p className="text-sm line-clamp-3">{sermon.description}</p>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm text-muted-foreground">
                      Duration: {sermon.duration}
                    </div>
                    <div className="flex gap-2">
                      <Button asChild className="flex-1">
                        <a href={sermon.youtubeUrl} target="_blank" rel="noopener noreferrer">
                          <Play className="w-4 h-4 mr-2" />
                          Watch Sermon
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Social Media CTA */}
        <section className="bg-gradient-to-r from-primary/5 to-accent/5 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-heading font-bold mb-6">
              Follow Us for More Sermons
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Don't miss any of our powerful messages! Follow us on YouTube and Facebook 
              to get notified when new sermons are uploaded and to join our online community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
                <a href="https://youtube.com/@kagsouthc" target="_blank" rel="noopener noreferrer">
                  <Youtube className="w-5 h-5 mr-2" />
                  Follow on YouTube
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                <a href="https://facebook.com/kagsouthc" target="_blank" rel="noopener noreferrer">
                  <Facebook className="w-5 h-5 mr-2" />
                  Follow on Facebook
                </a>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              Subscribe to our channels to never miss a sermon and be part of our growing online community.
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default Sermons;
