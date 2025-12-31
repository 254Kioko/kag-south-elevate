import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Home = () => {
  return (
    <main className="min-h-screen relative">
      <Helmet>
        <title>KAG South C Church | Worship • Missions • Community</title>

        <meta
          name="description"
          content="KAG South C Church is a Christ-centered church in Nairobi committed to worship, prayer, missions, and community outreach."
        />

        {/* Open Graph */}
        <meta property="og:title" content="KAG South C Church" />
        <meta
          property="og:description"
          content="Join us for worship, prayer, and powerful services at KAG South C Church."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kagsouthc.org/" />
        <meta property="og:image" content="https://kagsouthc.org/main.jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter / X */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://kagsouthc.org/main.jpeg" />
      </Helmet>

      <Navigation />
      <Hero />
      <Services />
      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default Home;
