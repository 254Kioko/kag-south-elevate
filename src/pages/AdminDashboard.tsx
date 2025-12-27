import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Users, MessageSquare, Heart, Mail } from "lucide-react";

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
  const { toast } = useToast();
  const navigate = useNavigate(); // ✅ add this

  const ADMIN_PASSWORD = "KAGSouthC2024!";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      fetchSubmissions();
      toast({ title: "Login successful", description: "Welcome to the admin dashboard" });
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
      toast({ title: "Error loading data", description: "Could not load submissions.", variant: "destructive" });
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

  const totalDonations = donationSubmissions.reduce((sum, donation) => sum + donation.amount, 0);

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen">
        <Navigation />
        <div className="pt-16 min-h-screen flex items-center justify-center bg-gradient-subtle">
          <Card className="w-full max-w-md shadow-elegant">
            <CardHeader className="text-center">
              <CardTitle className="font-heading text-2xl">Admin Login</CardTitle>
              <CardDescription>Enter the admin password to access the dashboard</CardDescription>
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
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="font-heading text-4xl font-bold text-primary mb-2">Admin Dashboard</h1>
                <p className="text-muted-foreground">Manage contact submissions and donation records</p>
              </div>
              <div className="flex gap-3">
                
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

        {/* Stats + Tables */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            {/* Summary cards */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <DashboardStat icon={MessageSquare} color="blue" label="Contact Messages" value={contactSubmissions.length} />
              <DashboardStat icon={Heart} color="green" label="Pledges" value={donationSubmissions.length} />
              <DashboardStat icon={Users} color="primary" label="Total Pledges" value={`KSH ${totalDonations.toLocaleString()}`} />
              <DashboardStat icon={Mail} color="purple" label="Newsletter Subscribers" value={newsletterSubscriptions.length} />
            </div>

            {/* Tabs */}
            <Tabs defaultValue="contacts" className="space-y-6">
              <TabsList>
                <TabsTrigger value="contacts">Contact Submissions</TabsTrigger>
                <TabsTrigger value="donations">Pledge Records</TabsTrigger>
                <TabsTrigger value="newsletter">Newsletter Subscribers</TabsTrigger>
              </TabsList>

              <TabsContent value="contacts">
                <DataTable
                  title="Contact Submissions"
                  description="Messages received through the contact form"
                  loading={loading}
                  data={contactSubmissions}
                  columns={["name", "phone", "message", "created_at"]}
                  formatDate={formatDate}
                />
              </TabsContent>

              <TabsContent value="donations">
                <DataTable
                  title="Records of Pledges"
                  description="Pledges recorded through the Give Online form"
                  loading={loading}
                  data={donationSubmissions}
                  columns={["name", "phone", "category", "amount", "created_at"]}
                  formatDate={formatDate}
                />
              </TabsContent>

              <TabsContent value="newsletter">
                <DataTable
                  title="Newsletter Subscribers"
                  description="Email addresses collected from newsletter subscriptions"
                  loading={loading}
                  data={newsletterSubscriptions}
                  columns={["email", "created_at"]}
                  formatDate={formatDate}
                />
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>
    </main>
  );
};

// ✅ Helper Components
const DashboardStat = ({ icon: Icon, color, label, value }: any) => (
  <Card>
    <CardContent className="p-6 flex items-center space-x-3">
      <div className={`p-3 rounded-full bg-${color}-100`}>
        <Icon className={`w-6 h-6 text-${color}-600`} />
      </div>
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </CardContent>
  </Card>
);

const DataTable = ({ title, description, loading, data, columns, formatDate }: any) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      {loading ? (
        <p className="text-center py-8">Loading...</p>
      ) : data.length === 0 ? (
        <p className="text-center py-8 text-muted-foreground">No records yet</p>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((col: string) => (
                  <TableHead key={col}>{col.replace("_", " ").toUpperCase()}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item: any) => (
                <TableRow key={item.id}>
                  {columns.map((col: string) => (
                    <TableCell key={col}>
                      {col === "created_at"
                        ? formatDate(item[col])
                        : col === "amount"
                        ? `KSH ${item[col]?.toLocaleString()}`
                        : item[col] || <span className="text-muted-foreground text-xs italic">N/A</span>}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </CardContent>
  </Card>
);

export default AdminDashboard;
