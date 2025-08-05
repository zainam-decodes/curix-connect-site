import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Users, Clock } from "lucide-react";
import heroImage from "@/assets/hero-medical.jpg";

const Hero = () => {
  const scrollToAppointment = () => {
    const element = document.getElementById('appointment');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="CURIX Hospital" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/80"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl text-primary-foreground">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Your Health, 
            <span className="block text-secondary">Our Priority</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Experience world-class healthcare at CURIX Hospital & Clinic. 
            Our dedicated team of medical professionals is committed to providing 
            exceptional care with compassion and expertise.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button 
              size="lg" 
              onClick={scrollToAppointment}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg px-8 py-4"
            >
              Book Appointment <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8 py-4"
            >
              Emergency: +1 (555) 911-HELP
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-primary-foreground/20">
            <div className="text-center">
              <Shield className="h-8 w-8 mx-auto mb-2 text-secondary" />
              <div className="text-2xl font-bold">25+</div>
              <div className="text-sm opacity-80">Years Experience</div>
            </div>
            <div className="text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-secondary" />
              <div className="text-2xl font-bold">50+</div>
              <div className="text-sm opacity-80">Medical Experts</div>
            </div>
            <div className="text-center">
              <Clock className="h-8 w-8 mx-auto mb-2 text-secondary" />
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-sm opacity-80">Emergency Care</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;