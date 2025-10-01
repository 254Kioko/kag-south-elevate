import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Heart, Baby, Music, GraduationCap, HandHeart, UserCheck, BookOpen } from "lucide-react";

const Ministries = () => {
  const ministries = [
     {
      icon: GraduationCap,
      title: "Men's Fellowship",
      description: "Building strong Christian men through fellowship, accountability, and spiritual growth.",
      activities: ["Men's Fellowship", "Bible Study", "Accountability Groups", "Community Projects"],
      color: "bg-gradient-secondary"
    },
     {
      icon: Heart,
      title: "WWK - Women's Ministry", 
      description: "Supporting women in their spiritual journey through fellowship, Bible study, and community service.",
      activities: ["Bible Study Groups", "Community Service", "Mentorship Programs", "Prayer Circles"],
      color: "bg-gradient-secondary"
    },
    {
      icon: Users,
      title: "Youth Ministry",
      description: "Empowering young people to grow in faith and leadership through dynamic programs and mentorship.",
      activities: ["Youth Sunday Services", "Leadership Training", "Community Outreach", "Sports & Recreation"],
      color: "bg-gradient-primary"
    },
     {
      icon: Music,
      title: "Praise & Worship",
      description: "Leading the congregation in heartfelt worship through music, choir, and creative arts.",
      activities: ["Adult Choir", "Youth Band", "Worship Team Training", "Music Lessons"],
      color: "bg-gradient-primary"
    },
    {
  icon: Music,
  title: "Media Team",
  description: "Capturing and amplifying the message of Christ through sound, visuals, and technology to enhance worship and extend outreach.",
  activities: [
    "Sound & Audio Engineering",
    "Live Streaming & Video Production",
    "Photography & Graphic Design",
    "Projection & Lighting Support",
    "Social Media & Content Creation"
  ],
  color: "bg-gradient-primary"
}

   
    {
      icon: Baby,
      title: "Children's Ministry",
      description: "Nurturing children's faith through age-appropriate teaching, activities, and loving care.",
      activities: ["Sunday School", "Vacation Bible School", "Children's Choir", "Family Events"],
      color: "bg-accent"
    },
   
   
    {
      icon: HandHeart,
      title: "Community Outreach",
      description: "Serving our local community through various programs and humanitarian efforts.",
      activities: ["Food Programs", "Medical Camps", "Education Support", "Elderly Care"],
      color: "bg-accent"
    },
    {
      icon: UserCheck,
      title: "Discipleship",
      description: "Helping believers grow deeper in their faith through structured learning and mentorship.",
      activities: ["New Member Classes", "Bible Study", "Mentorship", "Leadership Development"],
      color: "bg-gradient-primary"
    },
    {
      icon: BookOpen,
      title: "Prayer Ministry",
      description: "Interceding for the church and community through organized prayer initiatives.",
      activities: ["Prayer Groups", "Intercessory Prayer", "Healing Ministry", "Prayer Requests"],
      color: "bg-gradient-secondary"
    }
  ];

  return (
    <section id="ministries" className="py-20 bg-gradient-warm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-primary">
            Our Ministries
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover ways to grow, serve, and connect through our various ministry opportunities. 
            There's a place for everyone to use their gifts and make a difference.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {ministries.map((ministry, index) => {
            const IconComponent = ministry.icon;
            return (
              <Card key={index} className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2">
                <CardHeader className="pb-4">
                  <div className={`w-16 h-16 ${ministry.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="font-heading text-xl text-primary group-hover:text-primary-glow transition-colors">
                    {ministry.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {ministry.description}
                  </p>
                  <div>
                    <h4 className="font-semibold text-sm mb-2 text-primary">Activities:</h4>
                    <ul className="space-y-1">
                      {ministry.activities.map((activity, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground flex items-center">
                          <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-2 flex-shrink-0"></div>
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-primary rounded-2xl p-8 text-primary-foreground shadow-elegant">
          <h3 className="font-heading text-2xl font-semibold mb-4">Ready to Get Involved?</h3>
          <p className="mb-6 text-primary-foreground/90 max-w-2xl mx-auto">
            Join one of our ministries and discover how God can use your gifts to make a difference. 
            Whether you're new to faith or a seasoned believer, there's a place for you.
          </p>
      
        </div>
      </div>
    </section>
  );
};

export default Ministries;
