import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import AboutMinistries from "./pages/AboutMinistries";
import Contact from "./pages/Contact";
import GiveOnline from "./pages/GiveOnline";
import Events from "./pages/Events";
import Sermons from "./pages/Sermons";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import { Routes, Route } from "react-router-dom";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-ministries" element={<AboutMinistries />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/give-online" element={<GiveOnline />} />
        <Route path="/events" element={<Events />} />
        <Route path="/sermons" element={<Sermons />} />
        <Route path="/admin" element={<AdminDashboard />} />
        {/* Catch-all 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
