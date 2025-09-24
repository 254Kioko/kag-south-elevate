import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, BookOpen, HandHeart } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Love & Compassion",
      description: "We believe in showing Christ's love through our actions and service to others."
    },
    {
      icon: Users,
      title: "Community",
      description: "Building meaningful relationships and supporting each other in faith and life."
    },
    {
      icon: BookOpen,
      title: "Biblical Truth",
      description: "Grounding our faith and teachings in the unchanging Word of God."
    },
    {
      icon: HandHeart,
      title: "Prayer & Worship",
      description: "Creating sacred moments to connect with God through prayer and praise."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-warm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-primary">
            About Our Church
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Kenya Assemblies of God South C is a vibrant community of believers committed to 
            worship, fellowship, and spiritual growth. We welcome all people to join us in 
            experiencing God's love and grace.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <h3 className="font-heading text-3xl font-semibold mb-6 text-primary">Our Mission</h3>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              To create a welcoming environment where people can encounter God, grow in their faith, 
              and serve others with love and compassion. We are committed to spreading the Gospel 
              and making disciples who make disciples.
            </p>
            
            <h3 className="font-heading text-3xl font-semibold mb-6 text-primary">Our Vision</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To be a church that transforms lives and communities through the power of God's love, 
              where every person feels valued, every gift is utilized, and every heart is changed 
              by the Gospel of Jesus Christ.
            </p>
          </div>

          <div className="bg-gradient-primary rounded-2xl p-8 text-primary-foreground shadow-elegant">
            <h3 className="font-heading text-2xl font-semibold mb-6">Quick Facts</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Established:</span>
                <span className="font-semibold">1952</span>
              </div>
              <div className="flex justify-between">
                <span>Weekly Services:</span>
                <span className="font-semibold">6</span>
              </div>
              <div className="flex justify-between">
                <span>Active Ministries:</span>
                <span className="font-semibold">15+</span>
              </div>
              <div className="flex justify-between">
                <span>Community Programs:</span>
                <span className="font-semibold">8</span>
              </div>
              <div className="flex justify-between">
                <span>Languages:</span>
                <span className="font-semibold">English & Swahili</span>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="text-center mb-12">
          <h3 className="font-heading text-3xl font-semibold mb-4 text-primary">Our Core Values</h3>
          <p className="text-muted-foreground">The principles that guide everything we do</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <Card key={index} className="group hover:shadow-warm transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-8 h-8 text-secondary-foreground" />
                  </div>
                  <h4 className="font-heading text-xl font-semibold mb-3 text-primary">
                    {value.title}
                  </h4>
                  <p className="text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;