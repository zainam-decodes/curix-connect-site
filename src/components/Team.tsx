import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  Award, 
  MapPin, 
  Heart,
  Brain,
  Eye,
  Baby,
  Bone,
  Stethoscope
} from "lucide-react";

const Team = () => {
  const doctors = [
    {
      name: "Dr. Maria Martinez",
      specialty: "Cardiology",
      title: "Chief of Cardiology",
      experience: "15+ years",
      education: "Harvard Medical School",
      certifications: ["Board Certified Cardiologist", "Interventional Cardiology"],
      location: "Main Hospital",
      image: "👩‍⚕️",
      icon: Heart,
      bio: "Specializes in preventive cardiology and minimally invasive procedures."
    },
    {
      name: "Dr. James Park",
      specialty: "Neurology",
      title: "Chief of Neurology",
      experience: "20+ years",
      education: "Johns Hopkins University",
      certifications: ["Board Certified Neurologist", "Epilepsy Specialist"],
      location: "Neurology Center",
      image: "👨‍⚕️",
      icon: Brain,
      bio: "Expert in stroke treatment and neurodegenerative diseases."
    },
    {
      name: "Dr. Priya Kumar",
      specialty: "Ophthalmology",
      title: "Director of Eye Care",
      experience: "12+ years",
      education: "Stanford Medical School",
      certifications: ["Board Certified Ophthalmologist", "LASIK Specialist"],
      location: "Eye Care Center",
      image: "👩‍⚕️",
      icon: Eye,
      bio: "Leading expert in refractive surgery and retinal disorders."
    },
    {
      name: "Dr. Sarah Thompson",
      specialty: "Pediatrics",
      title: "Chief of Pediatrics",
      experience: "18+ years",
      education: "Mayo Clinic",
      certifications: ["Board Certified Pediatrician", "Child Development Specialist"],
      location: "Children's Wing",
      image: "👩‍⚕️",
      icon: Baby,
      bio: "Dedicated to comprehensive care for children from birth to adolescence."
    },
    {
      name: "Dr. Robert Williams",
      specialty: "Orthopedics",
      title: "Chief of Orthopedic Surgery",
      experience: "22+ years",
      education: "Cleveland Clinic",
      certifications: ["Board Certified Orthopedic Surgeon", "Sports Medicine"],
      location: "Orthopedic Center",
      image: "👨‍⚕️",
      icon: Bone,
      bio: "Specializes in joint replacement and sports injury rehabilitation."
    },
    {
      name: "Dr. Lisa Lee",
      specialty: "General Medicine",
      title: "Director of Primary Care",
      experience: "16+ years",
      education: "University of Pennsylvania",
      certifications: ["Board Certified Internal Medicine", "Geriatric Medicine"],
      location: "Primary Care Clinic",
      image: "👩‍⚕️",
      icon: Stethoscope,
      bio: "Focuses on preventive care and chronic disease management."
    }
  ];

  const achievements = [
    {
      title: "Top Hospital Award",
      year: "2023",
      organization: "Healthcare Excellence Institute"
    },
    {
      title: "Patient Safety Excellence",
      year: "2022",
      organization: "National Patient Safety Foundation"
    },
    {
      title: "Best Employer in Healthcare",
      year: "2023",
      organization: "Regional Business Journal"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Meet Our Expert Team
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our team of board-certified physicians and healthcare professionals 
            are dedicated to providing you with the highest quality medical care.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {doctors.map((doctor, index) => (
            <Card key={index} className="hover:shadow-medium transition-all duration-300 hover:-translate-y-1 group">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <div className="text-6xl mb-4">{doctor.image}</div>
                    <div className="absolute -bottom-2 -right-2 p-2 bg-primary rounded-full group-hover:bg-secondary transition-colors">
                      <doctor.icon className="h-4 w-4 text-primary-foreground" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    {doctor.name}
                  </h3>
                  <p className="text-primary font-medium mb-1">
                    {doctor.title}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {doctor.specialty}
                  </Badge>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{doctor.education}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{doctor.experience} Experience</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{doctor.location}</span>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm mt-4 italic">
                  {doctor.bio}
                </p>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-foreground mb-2">Certifications:</h4>
                  <div className="flex flex-wrap gap-1">
                    {doctor.certifications.map((cert, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Hospital Achievements */}
        <div className="bg-medical-accent rounded-lg p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Award-Winning Healthcare
            </h3>
            <p className="text-muted-foreground">
              Recognition for our commitment to excellence in patient care and medical innovation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="bg-background/50 border-0">
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-primary rounded-full w-fit mx-auto mb-4">
                    <Award className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">
                    {achievement.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {achievement.organization}
                  </p>
                  <Badge variant="secondary" className="mt-2">
                    {achievement.year}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">50+</div>
            <div className="text-muted-foreground">Medical Specialists</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-secondary mb-2">100+</div>
            <div className="text-muted-foreground">Nursing Staff</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">25+</div>
            <div className="text-muted-foreground">Years Experience</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-secondary mb-2">24/7</div>
            <div className="text-muted-foreground">Emergency Care</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;