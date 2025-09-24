import Navigation from "@/components/Navigation";
import About from "@/components/About";
import Ministries from "@/components/Ministries";
import Events from "@/components/Events";
import Footer from "@/components/Footer";

const AboutMinistries = () => {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16"> {/* Account for fixed navigation */}
        <About />
        <Ministries />
        <Events />
      </div>
      <Footer />
    </main>
  );
};

export default AboutMinistries;