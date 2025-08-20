import { Facebook, Twitter, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const footerSections = [
    {
      title: "Sections",
      links: ["Business Pulse", "Market Watch", "Tech & Innovation", "Agriculture", "Opinion", "Analysis"]
    },
    {
      title: "Services",
      links: ["Daily Newsletter", "Market Data", "Research Reports", "Business Directory", "Events", "Advertising"]
    },
    {
      title: "About",
      links: ["About Us", "Editorial Team", "Contact Us", "Careers", "Press Kit", "Terms of Service"]
    },
    {
      title: "Connect",
      links: ["Subscribe", "RSS Feeds", "Mobile App", "Newsletters", "Alerts", "Social Media"]
    }
  ];

  return (
    <footer className=" text-white" style={{ backgroundColor: '#3d3d3d' }}
    >
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h4 className="text-2xl font-bold mb-4">
              Business Info <span className="text-red-600">Ethiopia</span>
            </h4>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Ethiopia's leading source for business news, market analysis, and economic insights. 
              Trusted by professionals, investors, and decision-makers across the country.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h5 className="font-semibold mb-4">{section.title}</h5>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="flex flex-col lg:flex-row gap-6 mb-4 lg:mb-0">
              <div className="flex items-center text-gray-400 text-sm">
                <Mail className="h-4 w-4 mr-2" />
                <span>news@businessinfoethiopia.com</span>
              </div>
              <div className="flex items-center text-gray-400 text-sm">
                <Phone className="h-4 w-4 mr-2" />
                <span>+251-11-XXX-XXXX</span>
              </div>
              <div className="flex items-center text-gray-400 text-sm">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Addis Ababa, Ethiopia</span>
              </div>
            </div>
            
            <div className="text-gray-400 text-sm">
              © 2024 Business Info Ethiopia. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}