import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Smartphone, Copy } from "lucide-react";

const GiveOnline = () => {
  const [formData, setFormData] = useState({
    phone: "",
    amount: "",
    category: ""
  });
  const [isStkPushing, setIsStkPushing] = useState(false);
  const { toast } = useToast();

  const handleMpesaPay = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.category || !formData.phone || !formData.amount) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields before proceeding.",
        variant: "destructive",
      });
      return;
    }

    if (parseFloat(formData.amount) < 1) {
      toast({
        title: "Invalid amount",
        description: "Amount must be at least KSH 1.",
        variant: "destructive",
      });
      return;
    }

    setIsStkPushing(true);

    try {
      const { data, error } = await supabase.functions.invoke("mpesa-stkpush", {
        body: {
          phone: formData.phone,
          amount: parseFloat(formData.amount),
          category: formData.category,
        },
      });

      if (error) throw error;

      if (data.success) {
        toast({
          title: "STK Push Sent!",
          description: "Please check your phone and enter your M-Pesa PIN to complete the payment.",
        });
        setFormData({ phone: "", amount: "", category: "" });
      } else {
        toast({
          title: "Payment Failed",
          description: data.message || "Failed to initiate payment. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Error initiating M-Pesa payment:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to process payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsStkPushing(false);
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

        {/* Giving Methods + M-Pesa Form */}
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

              {/* M-Pesa Payment Form */}
              <Card className="shadow-elegant">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Smartphone className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                  <CardTitle className="font-heading text-2xl">Pay with M-Pesa</CardTitle>
                  <CardDescription>
                    Complete your donation instantly using M-Pesa
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleMpesaPay} className="space-y-6">
                    {/* Category First */}
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Category <span className="text-destructive">*</span>
                      </label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select donation category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Offering">Offering</SelectItem>
                          <SelectItem value="Tithe">Tithe</SelectItem>
                          <SelectItem value="Missions">Missions</SelectItem>
                          <SelectItem value="MF">MF</SelectItem>
                          <SelectItem value="WWK">WWK</SelectItem>
                          <SelectItem value="Youth">Youth</SelectItem>
                          <SelectItem value="Teens">Teens</SelectItem>
                          <SelectItem value="Children Ministry">Children Ministry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Phone Number <span className="text-destructive">*</span>
                      </label>
                      <Input
                        type="tel"
                        placeholder="e.g., 0712345678 or 254712345678"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Enter your M-Pesa number (07XX... or 2547XX...)
                      </p>
                    </div>

                    {/* Amount */}
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Amount (KSH) <span className="text-destructive">*</span>
                      </label>
                      <Input
                        type="number"
                        min="1"
                        step="1"
                        placeholder="Enter amount"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700"
                      disabled={isStkPushing}
                    >
                      {isStkPushing ? (
                        <>
                          <Smartphone className="w-4 h-4 mr-2 animate-pulse" />
                          Sending STK Push...
                        </>
                      ) : (
                        <>
                          <Smartphone className="w-4 h-4 mr-2" />
                          Pay with M-Pesa
                        </>
                      )}
                    </Button>
                  </form>

                  {/* Instructions */}
                  <div className="mt-6 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
                    <p className="text-sm text-foreground">
                      <strong className="text-green-700 dark:text-green-400">How it works:</strong>
                    </p>
                    <ol className="text-sm text-muted-foreground mt-2 space-y-1 list-decimal list-inside">
                      <li>Select your donation category</li>
                      <li>Enter your M-Pesa phone number</li>
                      <li>Enter the amount you wish to donate</li>
                      <li>Click "Pay with M-Pesa"</li>
                      <li>Check your phone for the STK Push prompt</li>
                      <li>Enter your M-Pesa PIN to complete</li>
                    </ol>
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
