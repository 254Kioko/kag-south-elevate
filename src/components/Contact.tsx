import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock, Send, Heart } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["South C ", "Nairobi, Kenya"],
    action: "Get Directions",
    href: "https://www.google.com/maps/search/?api=1&query=South+C+Nairobi+Kenya",
    external: true,
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+254 724177832", "+254 XXX XXXXXX"],
    action: "Call Now",
    href: "tel:+254724177832",
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["info@kagsouthc.org"],
    action: "Send Email",
    href: "mailto:info@kagsouthc.org",
  },
];


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Message Sent Successfully!",
      description: "Thank you for reaching out. We'll get back to you within 24 hours.",
    });

    setIsSubmitting(false);
    
    // Reset form
    const form = e.target as HTMLFormElement;
    form.reset();
  };

  return (
    <section id="contact" className="py-20 bg-gradient-warm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-primary">
            Contact Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We'd love to hear from you! Reach out with questions, prayer requests, 
            or to learn more about joining our church family.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <div>
              <h3 className="font-heading text-2xl font-semibold mb-6 text-primary">
                Get In Touch
              </h3>
              <p className="text-muted-foreground mb-8">
                Whether you're new to the area, looking for a church home, or need prayer, 
                we're here for you. Our doors and hearts are always open.
              </p>
            </div>

            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <Card key={index} className="group hover:shadow-soft transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <IconComponent className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-heading font-semibold mb-2 text-primary">
                          {info.title}
                        </h4>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-sm text-muted-foreground">
                            {detail}
                          </p>
                        ))}
                      <a href={info.href}
  target={info.external ? "_blank" : undefined}
  rel={info.external ? "noopener noreferrer" : undefined}
>
  <Button
    variant="link"
    className="p-0 h-auto mt-2 text-secondary hover:text-secondary-light text-sm"
  >
    {info.action}
  </Button>
</a>

                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="font-heading text-2xl text-primary flex items-center">
                  <Send className="w-6 h-6 mr-3 text-secondary" />
                  Send Us a Message/ Prayer Request
                </CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input id="firstName" name="firstName" required className="bg-background" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input id="lastName" name="lastName" required className="bg-background" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email" name="email" type="email" required className="bg-background" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" name="phone" type="tel" className="bg-background" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Select name="subject" required>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Select a subject..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="prayer">Prayer Request</SelectItem>
                        <SelectItem value="ministry">Ministry Information</SelectItem>
                        <SelectItem value="pastoral">Pastoral Care</SelectItem>
                        <SelectItem value="events">Events & Programs</SelectItem>
                        <SelectItem value="volunteer">Volunteer Opportunities</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea 
                      id="message" 
                      name="message" 
                      placeholder="Please share your message, prayer request, or any questions you may have..."
                      className="min-h-[120px] bg-background"
                      required 
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <Button 
                      type="submit" 
                      size="lg" 
                      disabled={isSubmitting}
                      className="font-semibold"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Heart className="w-5 h-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      * Required fields
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Prayer Request Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-primary rounded-2xl p-8 text-primary-foreground shadow-elegant max-w-2xl mx-auto">
            <h3 className="font-heading text-2xl font-semibold mb-4">Need Prayer?</h3>
            <p className="mb-6 text-primary-foreground/90">
              We believe in the power of prayer. Submit your prayer request and our dedicated 
              prayer team will lift you up in prayer.
            </p>
            <Button variant="secondary" size="lg" className="font-semibold">
              <Heart className="w-5 h-5 mr-2" />
              Submit Prayer Request
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
