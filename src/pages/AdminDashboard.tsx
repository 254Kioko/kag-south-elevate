import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import {
  Eye,
  EyeOff,
  Users,
  MessageSquare,
  Heart,
  Mail,
  Camera,
} from "lucide-react";

interface ContactSubmission {
  id: string;
  name: string | null;
  phone: string | null;
  email: string | null;
  message: string;
  created_at: string;
}

interface DonationSubmission {
  id: string;
  name: string;
  phone: string;
  amount: number;
  category: string | null;
  created_at: string;
}

interface NewsletterSubscription {
  id: string;
  email: string;
  created_at: string;
}

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [donationSubmissions, setDonationSubmissions] = useState<DonationSubmission[]>([]);
  const [newsletterSubscriptions, setNewsletterSubscriptions] = useState<NewsletterSubscription[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCCTV, setShowCCTV] = useState(false);
  const { toast } = useToast();

  const ADMIN_PASSWORD = "KAGSouthC2024!";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      fetchSubmissions();
      toast({
        title: "Login successful",
        description: "Welcome to the admin dashboard",
      });
    } else {
      toast({
        title: "Invalid password",
        description: "Please enter the correct admin password",
        variant: "destructive",
      });
    }
  };

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const { data: contacts } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });
      const { data: donations } = await supabase
        .from("donation_submissions")
        .select("*")
        .order("created_at", { ascending: false });
      const { data: newsletters } = await supabase
        .from("newsletter_subscriptions")
        .select("*")
        .order("created_at", { ascending: false });

      if (contacts) setContactSubmissions(contacts);
      if (donations) setDonationSubmissions(donations);
      if (newsletters) setNewsletterSubscriptions(newsletters);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      toast({
        title: "Error loading data",
        description: "Could not load submissions.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const totalDonations = donationSubmissions.reduce(
    (sum, donation) => sum + donation.amount,
    0
  );

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen">
        <Navigation />
        <div className="pt-16 min-h-screen flex items-center justify-center bg-gradient-subtle">
          <Card className="w-full max-w-md shadow-elegant">
            <CardHeader className="text-center">
              <CardTitle className="font-heading text-2xl">
                Admin Login
              </CardTitle>
              <CardDescription>
                Enter the admin password to access the dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Admin Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        {/* Header */}
        <section className="bg-gradient-subtle py-8">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="font-heading text-4xl font-bold text-primary mb-2">
                  Admin Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Manage contact submissions and donation records
                </p>
              </div>
              <div className="flex gap-3">
                {/* CCTV Button */}
                <Button
                  variant="secondary"
                  onClick={() => setShowCCTV(true)}
                  className="flex items-center gap-2 bg-primary text-white hover:bg-primary-light"
                >
                  <Camera className="w-4 h-4" />
                  CCTV
                </Button>

                {/* Logout Button */}
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsAuthenticated(false);
                    setPassword("");
                  }}
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              {/* Contact */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <MessageSquare className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        {contactSubmissions.length}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Contact Messages
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Donations */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Heart className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        {donationSubmissions.length}
                      </p>
                      <p className="text-sm text-muted-foreground">Pledges</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Total Donations */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        KSH {totalDonations.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Total Pledges
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="bg-purple-100 p-3 rounded-full">
                      <Mail className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        {newsletterSubscriptions.length}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Newsletter Subscribers
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Data Tabs */}
            <Tabs defaultValue="contacts" className="space-y-6">
              <TabsList>
                <TabsTrigger value="contacts">Contact Submissions</TabsTrigger>
                <TabsTrigger value="donations">Pledges Records</TabsTrigger>
                <TabsTrigger value="newsletter">
                  Newsletter Subscribers
                </TabsTrigger>
              </TabsList>

              {/* Contacts */}
              <TabsContent value="contacts">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Submissions</CardTitle>
                    <CardDescription>
                      Messages received through the contact form
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <p className="text-center py-8">Loading...</p>
                    ) : contactSubmissions.length === 0 ? (
                      <p className="text-center py-8 text-muted-foreground">
                        No contact submissions yet
                      </p>
                    ) : (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Name</TableHead>
                              <TableHead>Phone</TableHead>
                              <TableHead>Message</TableHead>
                              <TableHead>Date</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {contactSubmissions.map((s) => (
                              <TableRow key={s.id}>
                                <TableCell>
                                  {s.name || (
                                    <span className="text-muted-foreground text-xs italic">
                                      Anonymous
                                    </span>
                                  )}
                                </TableCell>
                                <TableCell>
                                  {s.phone || (
                                    <span className="text-muted-foreground text-xs">
                                      N/A
                                    </span>
                                  )}
                                </TableCell>
                                <TableCell className="max-w-xs truncate">
                                  {s.message}
                                </TableCell>
                                <TableCell>{formatDate(s.created_at)}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Donations */}
              <TabsContent value="donations">
                <Card>
                  <CardHeader>
                    <CardTitle>Records of Pledges</CardTitle>
                    <CardDescription>
                      Pledges recorded through the Give Online form
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <p className="text-center py-8">Loading...</p>
                    ) : donationSubmissions.length === 0 ? (
                      <p className="text-center py-8 text-muted-foreground">
                        No donation records yet
                      </p>
                    ) : (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Name</TableHead>
                              <TableHead>Phone</TableHead>
                              <TableHead>Category</TableHead>
                              <TableHead>Amount</TableHead>
                              <TableHead>Date</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {donationSubmissions.map((d) => (
                              <TableRow key={d.id}>
                                <TableCell>{d.name}</TableCell>
                                <TableCell>{d.phone}</TableCell>
                                <TableCell>
                                  {d.category ? (
                                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary capitalize">
                                      {d.category}
                                    </span>
                                  ) : (
                                    <span className="text-muted-foreground text-xs">
                                      N/A
                                    </span>
                                  )}
                                </TableCell>
                                <TableCell>
                                  KSH {d.amount.toLocaleString()}
                                </TableCell>
                                <TableCell>{formatDate(d.created_at)}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Newsletter */}
              <TabsContent value="newsletter">
                <Card>
                  <CardHeader>
                    <CardTitle>Newsletter Subscribers</CardTitle>
                    <CardDescription>
                      Email addresses collected from newsletter subscriptions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <p className="text-center py-8">Loading...</p>
                    ) : newsletterSubscriptions.length === 0 ? (
                      <p className="text-center py-8 text-muted-foreground">
                        No newsletter subscribers yet
                      </p>
                    ) : (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Email</TableHead>
                              <TableHead>Subscription Date</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {newsletterSubscriptions.map((n) => (
                              <TableRow key={n.id}>
                                <TableCell>{n.email}</TableCell>
                                <TableCell>{formatDate(n.created_at)}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>

      {/* CCTV Modal */}
      <Dialog open={showCCTV} onOpenChange={setShowCCTV}>
        <DialogContent className="max-w-5xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-heading text-primary">
              CCTV Monitoring Points
            </DialogTitle>
          </DialogHeader>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            {[
              { id: 1, name: "Main Entrance" },
              { id: 2, name: "Sanctuary" },
              { id: 3, name: "Parking Lot" },
              { id: 4, name: "Church Office" },
              { id: 5, name: "Children’s Area" },
            ].map((point) => (
              <div
                key={point.id}
                className="border rounded-lg shadow-soft overflow-hidden bg-muted"
              >
                <div className="p-3 bg-primary text-white text-sm font-medium">
                  {point.name}
                </div>
                <div className="aspect-video bg-black flex items-center justify-center text-white text-sm">
                  CCTV Feed {point.id}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default AdminDashboard;
