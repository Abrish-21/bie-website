import { Facebook, Twitter, Linkedin, Send, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const footerSections = [
    {
      title: "Quick Links",
      links: ["Business Pulse", "Insight Center", "Economy Explained", "Opportunities"],
    },
    {
      title: "About",
      links: ["About Us", "Editorial Team", "Careers", "Terms of Service"],
    },
  ];

  return (
    <footer className="bg-[#3d3d3d] text-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Brand and Description */}
          <div className="flex items-center space-x-4">
            <a href="/">
              <img
                src="/logo/bie-logo.png"
                alt="Business Info Ethiopia Logo"
                width="120"
                height="80"
                className="object-contain"
              />
            </a>
            <p className="text-gray-400 text-sm max-w-md leading-snug">
              Ethiopia's leading source for business news, market analysis, and economic insights. 
            </p>
          </div>

          {/* Links Section */}
          <div className="flex space-x-12">
            {footerSections.map((section, index) => (
              <div key={index}>
                <h5 className="font-semibold text-sm mb-2">{section.title}</h5>
                <ul className="space-y-1">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Footer Row */}
        <div className="border-t border-gray-700 mt-4 pt-4 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm gap-4">
          {/* Contact and Social Links */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              <span> info@yfpartnersltd.com</span>
            </div>
           
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              <span>Addis Ababa, Ethiopia</span>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-4 mt-2 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
             
              
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Send className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            © 2025 Business Info Ethiopia. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
