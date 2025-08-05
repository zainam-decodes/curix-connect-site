import { Heart, Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="h-8 w-8 text-secondary" />
              <span className="text-2xl font-bold">CURIX</span>
              <span className="text-lg opacity-90">Hospital & Clinic</span>
            </div>
            <p className="opacity-90 mb-6 max-w-md">
              Providing exceptional healthcare services with compassion and expertise for over 25 years. 
              Your health and well-being are our top priorities.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-6 w-6 opacity-70 hover:opacity-100 cursor-pointer transition-opacity" />
              <Twitter className="h-6 w-6 opacity-70 hover:opacity-100 cursor-pointer transition-opacity" />
              <Instagram className="h-6 w-6 opacity-70 hover:opacity-100 cursor-pointer transition-opacity" />
              <Linkedin className="h-6 w-6 opacity-70 hover:opacity-100 cursor-pointer transition-opacity" />
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 opacity-90">
                <Phone className="h-5 w-5" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 opacity-90">
                <Mail className="h-5 w-5" />
                <span>info@curixhospital.com</span>
              </div>
              <div className="flex items-center space-x-2 opacity-90">
                <MapPin className="h-5 w-5" />
                <span>123 Medical Center Drive<br />Health City, HC 12345</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Hours</h3>
            <div className="space-y-2 opacity-90">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Emergency: 24/7</span>
              </div>
              <div className="mt-3">
                <div className="font-medium">Outpatient Services:</div>
                <div className="text-sm mt-1">
                  Mon - Fri: 7:00 AM - 8:00 PM<br />
                  Saturday: 8:00 AM - 6:00 PM<br />
                  Sunday: 9:00 AM - 5:00 PM
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center opacity-75">
          <p>&copy; 2024 CURIX Hospital & Clinic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;