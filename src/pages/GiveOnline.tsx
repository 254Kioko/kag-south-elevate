import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Smartphone, CreditCard, Copy } from "lucide-react";

const GiveOnline = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    amount: "",
    category: "",
  });
  const [mpesaData, setMpesaData] = useState({
    phone: "",
    amount: "",
    category: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMpesaPaying, setIsMpesaPaying] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("donation_submissions")
        .insert([{
          name: formData.name,
          phone: formData.phone,
          amount: parseFloat(formData.amount),
          category: formData.category,
        }]);

      if (error) throw error;

      toast({
        title: "Pledge recorded successfully!",
        description: "Thank you for your generous contribution to our ministry.",
      });

      setFormData({ name: "", phone: "", amount: "", category: "" });
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

  const handleMpesaPay = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsMpesaPaying(true);

    try {
      const { data, error } = await supabase.functions.invoke('mpesa-stkpush', {
        body: {
          phone: mpesaData.phone,
          amount: parseFloat(mpesaData.amount),
          category: mpesaData.category,
        },
      });

      if (error) throw error;

      if (data.success) {
        toast({
          title: "M-Pesa prompt sent!",
          description: "Please check your phone and enter your M-Pesa PIN to complete the payment.",
        });
        setMpesaData({ phone: "", amount: "", category: "" });
      } else {
        throw new Error(data.message || "Payment failed");
      }
    } catch (error: any) {
      console.error("M-Pesa payment error:", error);
      toast({
        title: "Payment failed",
        description: error.message || "Please try again or use another payment method.",
        variant: "destructive",
      });
    } finally {
      setIsMpesaPaying(false);
    }
  };

  const copyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: `${label} copied!`,
      description: `${text} has been copied to your clipboard`,
    });
  };

  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        {/* Header */}
        <section className="bg-gradient-subtle py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">
              Give Online
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Your generosity helps us continue our mission of spreading God's love and building our community. 
              Thank you for supporting KAG South C.
            </p>
          </div>
        </section>

        {/* Instant M-Pesa Payment */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <Card className="shadow-elegant border-2 border-primary/20">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Smartphone className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                  <CardTitle className="font-heading text-2xl">Pay Instantly with M-Pesa</CardTitle>
                  <CardDescription>
                    Quick and secure payment directly from your phone
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleMpesaPay} className="space-y-6">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Category
                      </label>
                      <Select
                        value={mpesaData.category}
                        onValueChange={(value) => setMpesaData({ ...mpesaData, category: value })}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Offering">Offering</SelectItem>
                          <SelectItem value="Tithe">Tithe</SelectItem>
                          <SelectItem value="Missions">Missions</SelectItem>
                          <SelectItem value="MF">MF</SelectItem>
                          <SelectItem value="WWK">WWK</SelectItem>
                          <SelectItem value="Youth">Youth</SelectItem>
                          <SelectItem value="Teens Ministry">Teens Ministry</SelectItem>
                          <SelectItem value="Children Ministry">Children Ministry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        M-Pesa Phone Number
                      </label>
                      <Input
                        type="tel"
                        placeholder="e.g., 0712345678"
                        value={mpesaData.phone}
                        onChange={(e) => setMpesaData({ ...mpesaData, phone: e.target.value })}
                        required
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Enter the phone number registered with M-Pesa
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Amount (KSH)
                      </label>
                      <Input
                        type="number"
                        min="1"
                        step="1"
                        placeholder="Enter amount"
                        value={mpesaData.amount}
                        onChange={(e) => setMpesaData({ ...mpesaData, amount: e.target.value })}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={isMpesaPaying}
                    >
                      {isMpesaPaying ? "Processing..." : "Pay with M-Pesa"}
                    </Button>
                  </form>

                  <div className="mt-6 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <p className="text-sm text-green-800 dark:text-green-200 text-center">
                      <strong>How it works:</strong> You'll receive an M-Pesa prompt on your phone. 
                      Enter your PIN to complete the payment instantly.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Other Payment Methods & Pledge Recording */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              
              {/* Ways of Giving */}
              <Card className="shadow-elegant">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Smartphone className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                  <CardTitle className="font-heading text-2xl">Ways to Give</CardTitle>
                  <CardDescription>
                    Choose the method most convenient for you
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Buy Goods */}
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Buy Goods</p>
                    <div className="flex items-center justify-center space-x-3">
                      <span className="text-2xl font-bold text-primary font-mono">Till No: 803777</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyText("803777", "Till number")}
                        className="h-8 w-8 p-0"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Paybill */}
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Paybill</p>
                    <p className="text-lg">
                      <strong>Number:</strong> 247247 <br />
                      <strong>Account:</strong> 803777
                    </p>
                  </div>

                  {/* Bank Transfer */}
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Bank Transfer</p>
                    <div className="flex items-center justify-center space-x-3">
                      <span className="text-lg font-bold text-primary font-mono">1280298934050</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyText("1280298934050", "Bank Account")}
                        className="h-8 w-8 p-0"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Cheques */}
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Cheques</p>
                    <p className="text-lg font-semibold text-primary">
                      Payable to: Kenya Assemblies of God South C Church
                    </p>
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
                        Name
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
                        Category
                      </label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Offering">Offering</SelectItem>
                          <SelectItem value="Tithe">Tithe</SelectItem>
                          <SelectItem value="Missions">Missions</SelectItem>
                          <SelectItem value="MF">MF</SelectItem>
                          <SelectItem value="WWK">WWK</SelectItem>
                          <SelectItem value="Youth">Youth</SelectItem>
                          <SelectItem value="Teens Ministry">Teens Ministry</SelectItem>
                          <SelectItem value="Children Ministry">Children Ministry</SelectItem>
                        </SelectContent>
                      </Select>
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
                      {isSubmitting ? "Recording..." : "Record Pledge"}
                    </Button>
                  </form>

                  <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground text-center">
                      <strong>Note:</strong> This form only records your pledges for our records. 
                      Please complete the actual payment using your preferred method above.
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
