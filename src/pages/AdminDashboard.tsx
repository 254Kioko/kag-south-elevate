import { useState } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Eye, EyeOff, Users, MessageSquare, Heart, Mail } from "lucide-react";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

interface DonationSubmission {
  id: string;
  name: string;
  phone: string;
  amount: number;
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
  const { toast } = useToast();

  const ADMIN_PASSWORD = "KAGSouthC2024!";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      await fetchSubmissions();
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
        description: "Could not load submissions. Please check your connection.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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
              <CardTitle className="font-heading text-2xl">Admin Login</CardTitle>
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
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h1 className="font-heading text-3xl sm:text-4xl font-bold text-primary mb-2">
                  Admin Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Manage contact submissions and donation records
                </p>
              </div>
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
        </section>

        {/* Stats Cards */}
        <section className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <MessageSquare className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{contactSubmissions.length}</p>
                      <p className="text-sm text-muted-foreground">Contact Messages</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Heart className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{donationSubmissions.length}</p>
                      <p className="text-sm text-muted-foreground">Donations</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

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
                      <p className="text-sm text-muted-foreground">Total Donations</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

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
                      <p className="text-sm text-muted-foreground">Newsletter Subscribers</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Data Tables */}
            <Tabs defaultValue="contacts" className="space-y-6">
              <TabsList className="flex flex-wrap gap-2">
                <TabsTrigger value="contacts" className="flex-1 sm:flex-none">
                  Contacts
                </TabsTrigger>
                <TabsTrigger value="donations" className="flex-1 sm:flex-none">
                  Donations
                </TabsTrigger>
                <TabsTrigger value="newsletter" className="flex-1 sm:flex-none">
                  Newsletter
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
  ) : newsletterSubscriptions.length === 0 ? (
    <p className="text-center py-8 text-muted-foreground">
      No newsletter subscribers yet
    </p>
  ) : (
    <>
      {/* Desktop Table */}
      <div className="hidden sm:block overflow-x-auto">
        <Table className="min-w-[400px]">
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Subscription Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {newsletterSubscriptions.map((subscription) => (
              <TableRow key={subscription.id}>
                <TableCell className="font-medium">{subscription.email}</TableCell>
                <TableCell>{formatDate(subscription.created_at)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-4 sm:hidden">
        {newsletterSubscriptions.map((subscription) => (
          <div
            key={subscription.id}
            className="border rounded-lg p-4 shadow-sm bg-white"
          >
            <p className="text-sm font-semibold">Email:</p>
            <p className="mb-2">{subscription.email}</p>

            <p className="text-sm font-semibold">Subscription Date:</p>
            <p>{formatDate(subscription.created_at)}</p>
          </div>
        ))}
      </div>
    </>
  )}
</CardContent>

                </Card>
              </TabsContent>

              {/* Donations */}
              <TabsContent value="donations">
                <Card>
                  <CardHeader>
                    <CardTitle>Donation Records</CardTitle>
                    <CardDescription>
                      Donations recorded through the Give Online form
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
                        <Table className="min-w-[600px]">
                          <TableHeader>
                            <TableRow>
                              <TableHead>Name</TableHead>
                              <TableHead>Phone</TableHead>
                              <TableHead>Amount (KSH)</TableHead>
                              <TableHead>Date</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {donationSubmissions.map((donation) => (
                              <TableRow key={donation.id}>
                                <TableCell className="font-medium">
                                  {donation.name}
                                </TableCell>
                                <TableCell>{donation.phone}</TableCell>
                                <TableCell className="font-medium">
                                  {donation.amount.toLocaleString()}
                                </TableCell>
                                <TableCell>
                                  {formatDate(donation.created_at)}
                                </TableCell>
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
                        <Table className="min-w-[400px]">
                          <TableHeader>
                            <TableRow>
                              <TableHead>Email</TableHead>
                              <TableHead>Subscription Date</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {newsletterSubscriptions.map((subscription) => (
                              <TableRow key={subscription.id}>
                                <TableCell className="font-medium">
                                  {subscription.email}
                                </TableCell>
                                <TableCell>
                                  {formatDate(subscription.created_at)}
                                </TableCell>
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
    </main>
  );
};

export default AdminDashboard;
