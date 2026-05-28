import { Compass, Mail, MapPin, Phone, Clock, Instagram, Facebook, Youtube } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-slate-50 border-t border-slate-200 pt-20 pb-10">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-16 border-b border-slate-200">
          
            {/* Column 1: Brand & Bio */}
            <div id="footer-col-brand" className="space-y-6">
            <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 group cursor-pointer" onClick={() => handleLinkClick('home')}>
              <div className="w-[105px] h-[105px] sm:w-[125px] sm:h-[125px] lg:w-[140px] lg:h-[140px] overflow-hidden group-hover:scale-[1.08] transition-transform duration-300 flex items-center justify-center shrink-0 relative bg-transparent mix-blend-multiply">
                <img 
                  src="https://res.cloudinary.com/dnmsztoba/image/upload/q_auto/f_auto/v1779877875/Screenshot_20260526-204225_ptew1q.png" 
                  alt="Pole to Pole Tours and Travels Logo" 
                  className="w-full h-full object-contain select-none pointer-events-none"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col text-[#144C6C] justify-center ml-1 sm:ml-2 lg:ml-3 select-none">
                <span className="font-sans text-[20px] sm:text-[24px] lg:text-[27px] xl:text-[30px] font-black tracking-[0.03em] leading-none uppercase">
                  POLE TO POLE
                </span>
                <span className="font-sans text-[11px] sm:text-[13.5px] lg:text-[15px] xl:text-[16.5px] font-black tracking-[0.05em] uppercase mt-0.5 sm:mt-1 leading-none">
                  TOURS AND TRAVELS
                </span>
                <div className="h-[2px] sm:h-[2.5px] bg-[#fbbf24] w-full mt-1 sm:mt-1.5 mb-1 sm:mb-1.5 rounded-full" />
                <div className="flex items-center justify-between font-sans text-[8.5px] sm:text-[10.5px] lg:text-[11.5px] xl:text-[12.5px] font-extrabold uppercase tracking-[0.02em] leading-none">
                  <span>DREAM</span>
                  <span className="text-[#144C6C]/60 font-light px-[1px]">|</span>
                  <span>TRAVEL</span>
                  <span className="text-[#144C6C]/60 font-light px-[1px]">|</span>
                  <span>ADMIRE</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
              We make travel simple and profoundly personal from custom adventure itineraries and weekend escapes to customized group and individual packages. pole to pole tours and travels creates flawless, bespoke journeys that inspire lifetime memories.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com/poletopole_toursandtravels"
                target="_blank"
                rel="noreferrer"
                id="footer-social-ig"
                className="p-2.5 rounded-full border border-slate-200 bg-white text-slate-500 hover:text-[#144C6C] hover:border-[#144C6C]/40 transition-all duration-300 hover:scale-110 shadow-sm"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                id="footer-social-fb"
                className="p-2.5 rounded-full border border-slate-200 bg-white text-slate-500 hover:text-[#144C6C] hover:border-[#144C6C]/40 transition-all duration-300 hover:scale-110 shadow-sm"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div id="footer-col-links" className="space-y-6">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#144C6C] font-semibold font-display">
              Travel Pages
            </h3>
            <ul className="space-y-3.5 text-sm text-slate-600">
              <li>
                <button
                  onClick={() => handleLinkClick('home')}
                  className="hover:text-[#144C6C] transition-colors duration-250 cursor-pointer"
                >
                  Explore Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('international')}
                  className="hover:text-[#144C6C] transition-colors duration-250 cursor-pointer"
                >
                  International Outings
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('domestic')}
                  className="hover:text-[#144C6C] transition-colors duration-250 cursor-pointer"
                >
                  Domestic & National Parks
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('reviews')}
                  className="hover:text-[#144C6C] transition-colors duration-250 cursor-pointer"
                >
                  Guest Stories
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('contact')}
                  className="hover:text-[#144C6C] transition-colors duration-250 cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact details */}
          <div id="footer-col-contact" className="space-y-6">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#144C6C] font-semibold font-display">
              INFO
            </h3>
            <ul className="space-y-4 text-sm text-slate-600">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-[#144C6C] shrink-0 mt-0.5" />
                <span>
                  Old Jail Road, near Arts College,
                  <br />
                  Chennai - 600001
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="w-5 h-5 text-[#144C6C] shrink-0" />
                <a href="tel:+919566131283" className="hover:text-[#144C6C] transition-colors">
                  +91 9566131283
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="w-5 h-5 text-[#144C6C] shrink-0" />
                <a href="mailto:info@poletopole.in" className="hover:text-[#144C6C] transition-colors">
                  info@poletopole.in
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <Clock className="w-5 h-5 text-[#144C6C] shrink-0" />
                <span>Mon - Sat : 10:00 AM - 7:00 PM IST</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Google Maps Embed */}
          <div id="footer-col-map" className="space-y-6">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#144C6C] font-semibold font-display">
              LOCATION
            </h3>
            <div className="w-full h-40 rounded-xl overflow-hidden border border-slate-200 relative group hover:border-[#144C6C]/40 transition-colors duration-300 shadow-sm">
              <iframe
                title="Google Maps Office Location"
                src="https://maps.google.com/maps?q=Old%20Jail%20Road%20near%20Arts%20College%20Chennai%20600001&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full grayscale opacity-85 hover:grayscale-0 transition-all duration-300 border-0 rounded-xl"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer"
              ></iframe>
              <div className="absolute inset-0 bg-[#144C6C]/5 pointer-events-none group-hover:bg-transparent transition-colors duration-300"></div>
            </div>
          </div>

        </div>

        {/* Down Copyright Section */}
        <div id="footer-bottom-bar" className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-display">
          <p>© {currentYear} Pole to Pole Tours and Travels. All Rights Reserved. Dream | Travel | Admire.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#144C6C] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#144C6C] transition-colors">Terms of Planning</a>
            <a href="#" className="hover:text-[#144C6C] transition-colors">Bespoke Options</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
