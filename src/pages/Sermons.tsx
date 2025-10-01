import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export default function SermonSection() {
  return (
    <section id="sermon" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Last Week's Sermon */}
        <div className="mt-20 text-center">
          <h3 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-6">
            Last Week’s Service
          </h3>

          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              {/* YouTube Sermon Preview */}
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  className="w-full h-[400px] md:h-[500px] rounded-t-lg"
                  src="https://www.youtube.com/embed/B8HubOEGN88?si=9yCZ5FuB0NrgXQ2s"
                  title="Last Week's Sermon"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Sermon Info */}
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

                <p className="text-muted-foreground text-sm">
                  In this sermon, we explored the power of faith and trust in God even in
                  challenging seasons. Be inspired and encouraged to keep walking with Him.
                </p>
              </CardHeader>

              {/* CTA Button */}
              <CardContent className="p-6 border-t text-center">
                <Link to="/sermons.tsx">
                  <Button size="lg" className="font-semibold">
                    View More Sermons
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
