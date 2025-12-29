import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Home = () => {
  return (
    <main className="min-h-screen relative">
      <Navigation />
      <Hero />
      <Services />
      <Footer />

      {/* Sticky WhatsApp Icon */}
      <WhatsAppButton />
    </main>
  );
};

export default Home;
