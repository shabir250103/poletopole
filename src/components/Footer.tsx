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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-16 border-b border-slate-200">
          
          {/* Column 1: Brand & Bio */}
          <div id="footer-col-brand" className="space-y-6">
            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => handleLinkClick('home')}>
              <div className="w-12 h-12 rounded-full border-2 border-[#114c6c]/20 bg-white group-hover:scale-[1.08] transition-transform duration-300 overflow-hidden flex items-center justify-center p-0.5 shadow-md shrink-0">
                <img 
                  src="https://res.cloudinary.com/dnmsztoba/image/upload/q_auto/f_auto/v1779209814/regenerated_image_1779202070069_xb72nl.jpg" 
                  alt="Pole to Pole Tours and Travels Logo" 
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col text-[#114c6c] justify-center">
                <span className="font-sans text-sm sm:text-base font-black tracking-[0.01em] leading-none select-none">
                  POLE TO POLE
                </span>
                <span className="font-sans text-[9px] sm:text-[10px] font-black tracking-[0.02em] uppercase select-none mt-0.5 leading-none">
                  TOURS AND TRAVELS
                </span>
                <div className="h-[1.5px] bg-[#fbbf24] w-full mt-0.5 mb-1 rounded" />
                <div className="flex items-center justify-between font-sans text-[6px] sm:text-[7.5px] font-extrabold uppercase tracking-[0.10em] leading-none select-none">
                  <span>DREAM</span>
                  <span className="text-[#fbbf24] font-black px-0.5">|</span>
                  <span>TRAVEL</span>
                  <span className="text-[#fbbf24] font-black px-0.5">|</span>
                  <span>ADMIRE</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
              We make travel simple and profoundly personal. From custom adventure itineraries and ancestry genealogy research to beautiful matching vacation apparel, Colleen creates flawless, bespoke journeys that trace history and inspire lifetime memories.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com/poletopole_toursandtravels"
                target="_blank"
                rel="noreferrer"
                id="footer-social-ig"
                className="p-2.5 rounded-full border border-slate-200 bg-white text-slate-500 hover:text-[#114c6c] hover:border-[#114c6c]/40 transition-all duration-300 hover:scale-110 shadow-sm"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                id="footer-social-fb"
                className="p-2.5 rounded-full border border-slate-200 bg-white text-slate-500 hover:text-[#114c6c] hover:border-[#114c6c]/40 transition-all duration-300 hover:scale-110 shadow-sm"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div id="footer-col-links" className="space-y-6">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#114c6c] font-semibold font-display">
              Travel Pages
            </h3>
            <ul className="space-y-3.5 text-sm text-slate-600">
              <li>
                <button
                  onClick={() => handleLinkClick('home')}
                  className="hover:text-[#114c6c] transition-colors duration-250 cursor-pointer"
                >
                  Explore Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('international')}
                  className="hover:text-[#114c6c] transition-colors duration-250 cursor-pointer"
                >
                  International Outings
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('domestic')}
                  className="hover:text-[#114c6c] transition-colors duration-250 cursor-pointer"
                >
                  Domestic & National Parks
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('reviews')}
                  className="hover:text-[#114c6c] transition-colors duration-250 cursor-pointer"
                >
                  Guest Stories
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('contact')}
                  className="hover:text-[#114c6c] transition-colors duration-250 cursor-pointer"
                >
                  Contact Colleen
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact details */}
          <div id="footer-col-contact" className="space-y-6">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#114c6c] font-semibold font-display">
              Pole to Pole Desk
            </h3>
            <ul className="space-y-4 text-sm text-slate-600">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-[#114c6c] shrink-0 mt-0.5" />
                <span>
                  Old Jail Road, near Arts College,
                  <br />
                  Chennai - 600001
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="w-5 h-5 text-[#114c6c] shrink-0" />
                <a href="tel:+919566131283" className="hover:text-[#114c6c] transition-colors">
                  +91 95661 31283
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="w-5 h-5 text-[#114c6c] shrink-0" />
                <a href="mailto:info@poletopole.in" className="hover:text-[#114c6c] transition-colors">
                  info@poletopole.in
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <Clock className="w-5 h-5 text-[#114c6c] shrink-0" />
                <span>Mon - Sat: 9:00 AM - 6:00 PM EST</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Google Maps Embed */}
          <div id="footer-col-map" className="space-y-6">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#114c6c] font-semibold font-display">
              Planning Center
            </h3>
            <div className="w-full h-40 rounded-xl overflow-hidden border border-slate-200 relative group hover:border-[#114c6c]/40 transition-colors duration-300 shadow-sm">
              <iframe
                title="Google Maps Office Location"
                src="https://maps.google.com/maps?q=Old%20Jail%20Road%20near%20Arts%20College%20Chennai%20600001&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full grayscale opacity-85 hover:grayscale-0 transition-all duration-300 border-0 rounded-xl"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer"
              ></iframe>
              <div className="absolute inset-0 bg-[#114c6c]/5 pointer-events-none group-hover:bg-transparent transition-colors duration-300"></div>
            </div>
          </div>

        </div>

        {/* Down Copyright Section */}
        <div id="footer-bottom-bar" className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-display">
          <p>© {currentYear} Pole to Pole Tours and Travels. All Rights Reserved. Dream | Travel | Admire.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#114c6c] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#114c6c] transition-colors">Terms of Planning</a>
            <a href="#" className="hover:text-[#114c6c] transition-colors">Bespoke Options</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
