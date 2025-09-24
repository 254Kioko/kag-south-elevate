import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Services />
      <Footer />
    </main>
  );
};

export default Home;