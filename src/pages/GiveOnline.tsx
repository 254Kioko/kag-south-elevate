import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Heart, Smartphone, CreditCard, Copy } from "lucide-react";

const GiveOnline = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    amount: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('donation_submissions')
        .insert([{
          name: formData.name,
          phone: formData.phone,
          amount: parseFloat(formData.amount)
        }]);

      if (error) throw error;

      toast({
        title: "Donation recorded successfully!",
        description: "Thank you for your generous contribution to our ministry.",
      });

      setFormData({ name: "", phone: "", amount: "" });
    } catch (error) {
      console.error("Error submitting donation:", error);
      toast({
        title: "Error recording donation",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyTillNumber = () => {
    navigator.clipboard.writeText("803777");
    toast({
      title: "Till number copied!",
      description: "803777 has been copied to your clipboard",
    });
  };

  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        {/* Header */}
        <section className="bg-gradient-subtle py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-primary p-4 rounded-full">
              </div>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">
              Give Online
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Your generosity helps us continue our mission of spreading God's love and building our community. 
              Thank you for supporting KAG South C.
            </p>
          </div>
        </section>

        {/* Giving Methods */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* MPesa Instructions */}
              <Card className="shadow-elegant">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Smartphone className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                  <CardTitle className="font-heading text-2xl">Give via MPesa</CardTitle>
                  <CardDescription>
                    Send your donation directly through MPesa Buy Goods
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Till Number */}
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Till Number</p>
                    <div className="flex items-center justify-center space-x-3">
                      <span className="text-3xl font-bold text-primary font-mono">803777</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={copyTillNumber}
                        className="h-8 w-8 p-0"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="space-y-4">
                    <h3 className="font-heading font-semibold text-lg">How to Give:</h3>
                    <ol className="space-y-3 text-sm">
                      <li className="flex items-start space-x-3">
                        <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">
                          1
                        </span>
                        <span>Go to MPesa menu on your phone</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">
                          2
                        </span>
                        <span>Select "Lipa na MPesa" then "Buy Goods and Services"</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">
                          3
                        </span>
                        <span>Enter Till Number: <strong>803777</strong></span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">
                          4
                        </span>
                        <span>Enter the amount you wish to give</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">
                          5
                        </span>
                        <span>Enter your MPesa PIN to complete</span>
                      </li>
                    </ol>
                  </div>
                </CardContent>
              </Card>

              {/* Donation Form */}
              <Card className="shadow-elegant">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <CreditCard className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                  <CardTitle className="font-heading text-2xl">Record Your Pledge</CardTitle>
                  <CardDescription>
                    Help us track your contribution for better stewardship
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Full Name
                      </label>
                      <Input
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        placeholder="e.g., 0700 000 000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Amount (KSH)
                      </label>
                      <Input
                        type="number"
                        min="1"
                        step="0.01"
                        placeholder="Enter amount"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Recording..." : "Record Donation"}
                    </Button>
                  </form>

                  <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground text-center">
                      <strong>Note:</strong> This form only records your donation for our records. 
                      Please complete the actual payment through MPesa using the till number above.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Bible Verse */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4 text-center">
            <blockquote className="max-w-4xl mx-auto">
              <p className="text-2xl md:text-3xl font-heading italic text-primary mb-4">
                "Each of you should give what you have decided in your heart to give, 
                not reluctantly or under compulsion, for God loves a cheerful giver."
              </p>
              <cite className="text-lg font-medium text-muted-foreground">
                — 2 Corinthians 9:7
              </cite>
            </blockquote>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default GiveOnline;
