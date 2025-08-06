import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Brain, 
  Eye, 
  Stethoscope, 
  Baby, 
  Bone, 
  Shield, 
  Users,
  Clock,
  Star
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Heart,
      title: "Cardiology",
      description: "Comprehensive heart care with advanced diagnostic and treatment options",
      features: ["ECG & Stress Testing", "Cardiac Catheterization", "Pacemaker Services", "Heart Surgery"],
      availability: "24/7 Emergency",
      rating: 4.9
    },
    {
      icon: Brain,
      title: "Neurology",
      description: "Expert neurological care for brain, spine, and nervous system disorders",
      features: ["MRI & CT Scans", "Stroke Treatment", "Epilepsy Care", "Memory Disorders"],
      availability: "Mon-Fri",
      rating: 4.8
    },
    {
      icon: Eye,
      title: "Ophthalmology",
      description: "Complete eye care from routine exams to complex surgical procedures",
      features: ["LASIK Surgery", "Cataract Treatment", "Retinal Care", "Glaucoma Management"],
      availability: "Mon-Sat",
      rating: 4.9
    },
    {
      icon: Baby,
      title: "Pediatrics",
      description: "Specialized care for infants, children, and adolescents",
      features: ["Well-Child Visits", "Immunizations", "Growth Monitoring", "Developmental Assessments"],
      availability: "24/7 Emergency",
      rating: 5.0
    },
    {
      icon: Bone,
      title: "Orthopedics",
      description: "Treatment of musculoskeletal system disorders and injuries",
      features: ["Joint Replacement", "Sports Medicine", "Fracture Care", "Physical Therapy"],
      availability: "Mon-Fri",
      rating: 4.7
    },
    {
      icon: Stethoscope,
      title: "General Medicine",
      description: "Primary care and preventive health services for all ages",
      features: ["Annual Checkups", "Chronic Disease Management", "Preventive Care", "Health Screenings"],
      availability: "Mon-Sat",
      rating: 4.8
    }
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Medical Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive healthcare services delivered by our team of experienced medical professionals
            using state-of-the-art technology and evidence-based practices.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-medium transition-all duration-300 hover:-translate-y-1 group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-medical-accent rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <service.icon className="h-8 w-8 text-primary group-hover:text-current" />
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{service.rating}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground mb-4">
                  {service.description}
                </p>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-foreground mb-2">Services Include:</h4>
                  <ul className="space-y-1">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-secondary" />
                    <span className="text-sm text-muted-foreground">{service.availability}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {service.availability.includes('24/7') ? 'Emergency Available' : 'Scheduled Visits'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="p-4 bg-primary rounded-full mb-4">
                <Shield className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Quality Assured</h3>
              <p className="text-muted-foreground text-sm">All services meet international healthcare standards</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-4 bg-secondary rounded-full mb-4">
                <Users className="h-8 w-8 text-secondary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Expert Team</h3>
              <p className="text-muted-foreground text-sm">Board-certified specialists with years of experience</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-4 bg-accent border border-accent-foreground rounded-full mb-4">
                <Clock className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Available 24/7</h3>
              <p className="text-muted-foreground text-sm">Emergency services available around the clock</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;