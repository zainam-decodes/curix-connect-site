import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import AppointmentForm from "@/components/AppointmentForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <AppointmentForm />
      <Footer />
    </div>
  );
};

export default Index;
