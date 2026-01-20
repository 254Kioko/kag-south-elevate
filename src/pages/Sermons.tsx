import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Youtube, Facebook } from "lucide-react";

const latestSermons = [
  {
    id: 1,
    title: "Christmas Service",
    speaker: "Pst. Simon Kimatu",
    date: "2025-12-25",
    series: "Christ is born",
    description: "Discover how to walk confidently in faith even when you can't see the full path ahead. Learn practical steps to trust God's perfect timing and plan for your life.",
    youtubeUrl: "https://www.youtube.com/embed/RtKqKX8P5-g?si=UQDLyaGc5QexOzhu"
  },
  {
    id: 2,
    title: "Finishing well in the Lord",
    speaker: "Rev Peter Kioko",
    date: "2025-12-18",
    series: "Nuturing",
    description: "Explore the transformative power of prayer and how it can change not just circumstances, but our hearts and minds as we commune with God daily.",
    youtubeUrl: "https://www.youtube.com/embed/Ijv7Y7vVIgI?si=JWupzA_Su1YgmNhx"
  },
  {
    id: 3,
    title: "Finish Strong",
    speaker: "Rev Peter Kioko",
    date: "2025-12-11",
    series: "Persistence",
    description: "Learn biblical principles for building strong, Christ-centered families that honor God and create lasting legacies of faith for generations to come.",
    youtubeUrl: "https://www.youtube.com/embed/ZpWz2WJxWao?si=dNkg1wvCSuWwYwaZ"
  },
  {
    id: 4,
    title: "Thank God for Answered Prayers",
    speaker: "Rev. Peter Kioko",
    date: "2025-12-4",
    series: "Thanksgiving",
    description: "Find hope and strength in God's promises as we navigate through life's difficult seasons. Discover how challenges can become stepping stones to greater faith.",
    youtubeUrl: "https://www.youtube.com/embed/x9SxxcTHH_A?si=dAuqKwwjO5HIQ2VV"
  },
  {
    id: 5,
    title: "The Great Commission: Our Calling",
    speaker: "Rev. Peter Kioko",
    date: "2025-08-31",
    series: "Mission & Ministry",
    description: "Understand our calling as believers to share the Gospel and make disciples. Learn practical ways to fulfill the Great Commission in your daily life.",
    youtubeUrl: "https://www.youtube.com/embed/qe2LFLZUAXA?si=Yl_pYbUUg2iRMbvV"
  },
  {
    id: 6,
    title: "Living in God's Grace",
    speaker: "Pastor Simon Kimaty",
    date: "2025-08-25",
    series: "Grace & Mercy",
    description: "Dive deep into understanding God's amazing grace and how it transforms our lives from the inside out. Experience the freedom that comes from grace.",
    youtubeUrl: "https://www.youtube.com/embed/t38j8O1R8X0?si=FO7xq6yeje6EQrHa"
  },
  {
    id: 7,
    title: "Financial Stewardship & Generosity",
    speaker: "Rev. Peter Kioko",
    date: "2025-08-18",
    series: "Stewardship",
    description: "Learn biblical principles of financial stewardship, generosity, and how to manage resources in a way that honors God and blesses others.",
    youtubeUrl: "https://www.youtube.com/embed/OFYnfPWeDYA?si=jCJ6l6nABIO2S1a5"
  },
  {
    id: 8,
    title: "The Fruits of the Spirit in Action",
    speaker: "Pastor Grace Wanjiku",
    date: "2025-08-11",
    series: "Spiritual Growth",
    description: "Explore how the fruits of the Spirit should manifest in our daily lives and relationships, bringing glory to God and blessing to others.",
    youtubeUrl: "https://www.youtube.com/embed/8Y9ufsyql2g?si=geZw8-GExciqzRMK"
  },
  {
    id: 9,
    title: "Worship: A Lifestyle, Not Just a Service",
    speaker: "Pastor John Mwangi",
    date: "2025-1-4",
    series: "Worship & Praise",
    description: "Discover how worship extends beyond Sunday service into every aspect of our lives. Learn to live as a continuous offering of praise to God.",
    youtubeUrl: "https://www.youtube.com/embed/hedv_tZ-m4o?si=FiEm3dQMGQZ7FLwy"
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
                Latest Services
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
                  {/* YouTube Video Embed */}
                  <div className="aspect-video">
                    <iframe
                      src={sermon.youtubeUrl}
                      title={sermon.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
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

                  <CardContent>
                    <div className="flex gap-2">
                      {/* Watch Sermon Button with YouTube Icon */}
                      <Button asChild className="flex-1 bg-red-600 hover:bg-red-700 text-white">
                        <a href={sermon.youtubeUrl} target="_blank" rel="noopener noreferrer">
                          <Youtube className="w-4 h-4 mr-2" />
                          Watch on YouTube
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
              <Button asChild size="lg" className="font-semibold">
                <a href="https://www.youtube.com/channel/UCAP5aGJBcRy8wMYPfnbqX7w" target="_blank" rel="noopener noreferrer">
                  <Youtube className="w-5 h-5 mr-2" />
                  Follow on YouTube
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                <a href="https://www.facebook.com/p/KAG-SOUTH-C-Church-100064333766328/" target="_blank" rel="noopener noreferrer">
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
