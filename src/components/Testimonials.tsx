import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      age: 34,
      location: "New York",
      service: "Cardiology",
      rating: 5,
      text: "Dr. Martinez and the cardiology team saved my life. Their quick diagnosis and expert care during my heart attack was exceptional. The staff was compassionate and professional throughout my entire stay.",
      image: "👩‍💼"
    },
    {
      name: "Michael Chen",
      age: 45,
      location: "California",
      service: "Orthopedics",
      rating: 5,
      text: "After my knee replacement surgery, I'm back to playing tennis! Dr. Williams and the orthopedic team were amazing. The physical therapy program helped me recover faster than expected.",
      image: "👨‍💻"
    },
    {
      name: "Emily Rodriguez",
      age: 28,
      location: "Texas",
      service: "Pediatrics",
      rating: 5,
      text: "Dr. Thompson has been our family pediatrician for 3 years. She's wonderful with children and always takes time to address our concerns. We couldn't ask for better care for our kids.",
      image: "👩‍🏫"
    },
    {
      name: "Robert Davis",
      age: 62,
      location: "Florida",
      service: "Neurology",
      rating: 5,
      text: "The neurology department helped me manage my epilepsy effectively. Dr. Park's expertise and the caring nursing staff made all the difference in improving my quality of life.",
      image: "👨‍🔬"
    },
    {
      name: "Lisa Thompson",
      age: 39,
      location: "Illinois",
      service: "Ophthalmology",
      rating: 5,
      text: "My LASIK surgery was performed perfectly by Dr. Kumar. The vision correction has changed my life completely. The pre and post-operative care was outstanding.",
      image: "👩‍⚕️"
    },
    {
      name: "James Wilson",
      age: 52,
      location: "Georgia",
      service: "General Medicine",
      rating: 5,
      text: "Dr. Lee has been my primary care physician for over 5 years. Her thorough approach to preventive care and early detection helped catch my diabetes early. Excellent doctor!",
      image: "👨‍💼"
    }
  ];

  const stats = [
    { number: "98%", label: "Patient Satisfaction" },
    { number: "15,000+", label: "Patients Served Annually" },
    { number: "4.9/5", label: "Average Rating" },
    { number: "25+", label: "Years of Excellence" }
  ];

  return (
    <section className="py-20 bg-medical-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            What Our Patients Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real stories from real patients who have experienced the CURIX difference.
            Your health and satisfaction are our top priorities.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-medium transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
              <CardContent className="p-6">
                <div className="absolute top-4 right-4 opacity-10">
                  <Quote className="h-12 w-12 text-primary" />
                </div>
                
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-muted-foreground mb-6 italic">
                  "{testimonial.text}"
                </p>

                {/* Patient Info */}
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{testimonial.image}</div>
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Age {testimonial.age} • {testimonial.location}
                    </div>
                    <div className="text-xs text-primary font-medium">
                      {testimonial.service} Patient
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-primary to-secondary text-primary-foreground max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Join Thousands of Satisfied Patients
              </h3>
              <p className="text-primary-foreground/90 mb-6">
                Experience the same level of care and compassion that has made 
                CURIX Hospital & Clinic the trusted choice for families in our community.
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>4.9/5 Rating</span>
                </div>
                <div>•</div>
                <div>15,000+ Happy Patients</div>
                <div>•</div>
                <div>25+ Years Experience</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;