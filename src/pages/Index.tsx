import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import ChatBotTest from "@/components/ChatBotTest";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <Team />
      <Contact />
      <Footer />
      <ChatBot />
      <ChatBotTest />
    </div>
  );
};

export default Index;
