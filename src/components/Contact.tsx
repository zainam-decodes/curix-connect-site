import { Card, CardContent } from "@/components/ui/card";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Calendar,
  Car,
  Accessibility,
  CreditCard,
  Shield,
  Users
} from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "Emergency Line",
      detail: "+1 (555) 911-HELP",
      description: "24/7 Emergency Services",
      color: "text-red-500"
    },
    {
      icon: Phone,
      title: "Main Reception",
      detail: "+1 (555) 123-4567",
      description: "Mon-Fri: 8AM-6PM, Sat: 9AM-2PM",
      color: "text-primary"
    },
    {
      icon: Mail,
      title: "Email",
      detail: "info@curixhospital.com",
      description: "We respond within 24 hours",
      color: "text-secondary"
    },
    {
      icon: MapPin,
      title: "Location",
      detail: "123 Medical Center Drive",
      description: "Downtown Medical District",
      color: "text-muted-foreground"
    }
  ];

  const hours = [
    { day: "Monday - Friday", hours: "8:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "9:00 AM - 2:00 PM" },
    { day: "Sunday", hours: "Emergency Only" },
    { day: "Emergency Services", hours: "24/7 Available" }
  ];

  const facilities = [
    {
      icon: Car,
      title: "Free Parking",
      description: "Complimentary parking for patients and visitors"
    },
    {
      icon: Accessibility,
      title: "Accessibility",
      description: "Full wheelchair accessibility throughout facility"
    },
    {
      icon: CreditCard,
      title: "Insurance",
      description: "Accept most major insurance plans"
    },
    {
      icon: Shield,
      title: "Safety First",
      description: "Enhanced cleaning and safety protocols"
    }
  ];

  const departments = [
    { name: "Emergency Department", phone: "(555) 911-HELP", location: "Ground Floor" },
    { name: "Cardiology", phone: "(555) 123-4571", location: "2nd Floor" },
    { name: "Neurology", phone: "(555) 123-4572", location: "3rd Floor" },
    { name: "Pediatrics", phone: "(555) 123-4573", location: "Children's Wing" },
    { name: "Orthopedics", phone: "(555) 123-4574", location: "Sports Medicine Center" },
    { name: "Ophthalmology", phone: "(555) 123-4575", location: "Eye Care Center" }
  ];

  return (
    <section id="contact" className="py-20 bg-medical-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Contact & Visit Us
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're here to help with all your healthcare needs. Reach out to us 
            or visit our facility for world-class medical care.
          </p>
        </div>

        {/* Emergency Alert */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-12 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Phone className="h-6 w-6 text-red-500" />
            <h3 className="text-xl font-bold text-red-700">Medical Emergency?</h3>
          </div>
          <p className="text-red-600 mb-4">Call our emergency line immediately or dial 911</p>
          <div className="text-2xl font-bold text-red-700">+1 (555) 911-HELP</div>
        </div>

        {/* Contact Information */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <Card key={index} className="hover:shadow-medium transition-shadow text-center">
              <CardContent className="p-6">
                <div className={`p-4 rounded-full w-fit mx-auto mb-4 bg-medical-accent`}>
                  <info.icon className={`h-6 w-6 ${info.color}`} />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{info.title}</h3>
                <p className="text-lg font-medium text-foreground mb-1">{info.detail}</p>
                <p className="text-sm text-muted-foreground">{info.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Hours & Departments */}
          <div className="space-y-8">
            {/* Operating Hours */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <Clock className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">Operating Hours</h3>
                </div>
                <div className="space-y-3">
                  {hours.map((hour, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-muted last:border-0">
                      <span className="text-muted-foreground">{hour.day}</span>
                      <span className="font-medium text-foreground">{hour.hours}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Department Directory */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <Users className="h-6 w-6 text-secondary" />
                  <h3 className="text-xl font-semibold text-foreground">Department Directory</h3>
                </div>
                <div className="space-y-3">
                  {departments.map((dept, index) => (
                    <div key={index} className="flex justify-between items-start py-2 border-b border-muted last:border-0">
                      <div>
                        <div className="font-medium text-foreground">{dept.name}</div>
                        <div className="text-sm text-muted-foreground">{dept.location}</div>
                      </div>
                      <div className="text-sm text-primary font-medium">{dept.phone}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Location & Facilities */}
          <div className="space-y-8">
            {/* Location Map Placeholder */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <MapPin className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">Location & Directions</h3>
                </div>
                <div className="bg-muted rounded-lg h-48 flex items-center justify-center mb-4">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="h-12 w-12 mx-auto mb-2" />
                    <p>Interactive Map</p>
                    <p className="text-sm">123 Medical Center Drive</p>
                    <p className="text-sm">Downtown Medical District</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <p><strong>Address:</strong> 123 Medical Center Drive, Medical District</p>
                  <p><strong>Nearest Metro:</strong> Medical Center Station (Blue Line)</p>
                  <p><strong>Parking:</strong> Free parking available in attached garage</p>
                </div>
              </CardContent>
            </Card>

            {/* Facilities & Services */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <Calendar className="h-6 w-6 text-secondary" />
                  <h3 className="text-xl font-semibold text-foreground">Patient Facilities</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {facilities.map((facility, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="p-2 bg-medical-accent rounded-lg">
                        <facility.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground text-sm">{facility.title}</div>
                        <div className="text-xs text-muted-foreground">{facility.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="bg-primary text-primary-foreground max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Schedule Your Visit?</h3>
              <p className="text-primary-foreground/90 mb-6">
                Our friendly staff is ready to help you schedule an appointment 
                or answer any questions about our services.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>Call: (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>Email: info@curixhospital.com</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;