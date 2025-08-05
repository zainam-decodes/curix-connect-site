import { Card, CardContent } from "@/components/ui/card";
import { Heart, Award, Users, Stethoscope, Brain, Eye } from "lucide-react";

const About = () => {
  const specialties = [
    {
      icon: Heart,
      title: "Cardiology",
      description: "Advanced heart care with state-of-the-art technology"
    },
    {
      icon: Brain,
      title: "Neurology",
      description: "Expert neurological care and brain health services"
    },
    {
      icon: Eye,
      title: "Ophthalmology",
      description: "Comprehensive eye care and vision correction"
    },
    {
      icon: Stethoscope,
      title: "General Medicine",
      description: "Primary care and preventive health services"
    }
  ];

  return (
    <section id="about" className="py-20 bg-medical-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About CURIX Hospital & Clinic
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            For over 25 years, CURIX has been at the forefront of healthcare innovation, 
            providing compassionate care and medical excellence to our community.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-3xl font-bold text-foreground mb-6">
              Excellence in Healthcare
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              At CURIX Hospital & Clinic, we believe that every patient deserves the highest 
              standard of medical care. Our team of board-certified physicians, nurses, and 
              healthcare professionals work together to ensure your health and well-being.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              We combine cutting-edge medical technology with a personal touch, creating an 
              environment where healing happens not just through advanced treatments, but 
              through genuine care and compassion.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <Award className="h-8 w-8 text-primary" />
                <div>
                  <div className="font-semibold text-foreground">Accredited</div>
                  <div className="text-sm text-muted-foreground">Joint Commission</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="h-8 w-8 text-secondary" />
                <div>
                  <div className="font-semibold text-foreground">50+ Specialists</div>
                  <div className="text-sm text-muted-foreground">Expert Medical Team</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="shadow-medium">
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold text-foreground mb-3">Our Mission</h4>
                <p className="text-muted-foreground">
                  To provide exceptional healthcare services with compassion, integrity, 
                  and respect for every individual we serve.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-medium">
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold text-foreground mb-3">Our Vision</h4>
                <p className="text-muted-foreground">
                  To be the leading healthcare provider in our region, known for 
                  clinical excellence and patient-centered care.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div id="services">
          <h3 className="text-3xl font-bold text-center text-foreground mb-12">
            Our Specialties
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialties.map((specialty, index) => (
              <Card key={index} className="text-center hover:shadow-medium transition-shadow">
                <CardContent className="p-6">
                  <specialty.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-foreground mb-2">
                    {specialty.title}
                  </h4>
                  <p className="text-muted-foreground">
                    {specialty.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;