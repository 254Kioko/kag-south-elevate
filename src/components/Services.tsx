import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom"; 
import eventImage from "@/assets/upcoming-event.jpg"; 
import prayerImage from "@/assets/prayer-placeholder.jpg"; // ✅ upload your image here later

const Services = () => {
  const services = [
    // ... your existing service objects
  ];

  return (
    <>
      {/* Services Section */}
      {/* ... (unchanged code above) */}

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

      {/* Prayer Request Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h3 className="font-heading text-4xl font-bold text-primary mb-6">
            Send in Your Prayer Requests
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            We believe in the power of prayer. Share your needs, concerns, or thanksgivings, and our prayer team will stand with you in faith.
          </p>

          <div className="max-w-3xl mx-auto">
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img
                src={prayerImage}
                alt="Prayer Request"
                className="w-full h-64 object-cover"
              />
              <CardHeader className="text-left p-6">
                <CardTitle className="text-2xl font-bold text-primary mb-2">
                  We’d Love to Pray With You
                </CardTitle>
                <p className="text-muted-foreground text-sm">
                  Submit your prayer requests today, and our intercessory team will lift you up in prayer during our weekly sessions.
                </p>
              </CardHeader>
              <CardContent className="p-6 border-t text-center">
                <Link to="/contact">
                  <Button size="lg" className="font-semibold">
                    Send a Prayer Request
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
