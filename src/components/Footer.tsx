import mainLogo from '../assets/mainlogo.jpeg';
import { Compass, Mail, MapPin, Phone, Clock, Instagram, Facebook, Youtube, ChevronRight } from 'lucide-react';

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
    <footer id="main-footer" className="bg-[#0b2233] text-white pt-20 pb-10 border-t-4 border-[#fbbf24] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#144C6C] rounded-full blur-[100px] opacity-30"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#fbbf24] rounded-full blur-[120px] opacity-10"></div>
      </div>

      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 pb-16 border-b border-white/10 items-start">

          {/* Column 1: Brand & Bio */}
          <div className="space-y-6 flex flex-col items-start">
            <div className="flex items-center gap-4 group cursor-pointer" onClick={() => handleLinkClick('home')}>
              <div className="w-[200px] h-auto bg-white rounded-2xl p-4 shadow-lg group-hover:scale-105 transition-transform duration-300">
                <img
                  src={mainLogo}
                  alt="Pole to Pole Tours and Travels Logo"
                  className="w-full h-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div className="text-sm text-slate-300 leading-relaxed pr-0 lg:pr-8 pt-2 space-y-3">
              <p>
                Pole To Pole Tours And Travels is a trusted travel company based in Chennai, India, committed to delivering exceptional travel experiences. We take pride in providing reliable, high-quality, and personalized travel services, ensuring every journey is smooth, comfortable, and memorable.
              </p>
              <p>
                Whether you're planning a leisure holiday, a business trip, or a special getaway, our dedicated team is here to create seamless travel experiences tailored to your needs. At Pole To Pole Tours And Travels, your journey begins with trust and ends with unforgettable memories.
              </p>
            </div>
            {/* Socials */}
            <div className="flex items-center gap-4 pt-2">
              <a href="https://instagram.com/poletopole_toursandtravels" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-[#fbbf24] hover:text-[#0b2233] hover:border-[#fbbf24] hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-sm">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-[#fbbf24] hover:text-[#0b2233] hover:border-[#fbbf24] hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-sm">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Contact details */}
          <div className="space-y-6">
            <h3 className="text-sm uppercase tracking-[0.15em] text-white font-bold font-serif flex items-center">
              Contact Details -:
            </h3>
            <ul className="space-y-5 text-sm text-slate-300">
              <li className="flex gap-4 items-start group">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center shrink-0 group-hover:bg-[#fbbf24] group-hover:border-[#fbbf24] group-hover:text-[#0b2233] transition-all duration-300">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="pt-2 leading-relaxed">
                  9, Old Jail Rd, Bundar Rama Garden, George Town,<br />Chennai, Greater Chennai, Tamil Nadu 600001
                </span>
              </li>
              <li className="flex gap-4 items-center group">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center shrink-0 group-hover:bg-[#fbbf24] group-hover:border-[#fbbf24] group-hover:text-[#0b2233] transition-all duration-300">
                  <Phone className="w-4 h-4" />
                </div>
                <a href="tel:+919566131283" className="hover:text-[#fbbf24] transition-colors pt-1 font-medium">
                  +91 9566131283
                </a>
              </li>
              <li className="flex gap-4 items-center group">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center shrink-0 group-hover:bg-[#fbbf24] group-hover:border-[#fbbf24] group-hover:text-[#0b2233] transition-all duration-300">
                  <Mail className="w-4 h-4" />
                </div>
                <a href="mailto:info@poletopole.in" className="hover:text-[#fbbf24] transition-colors pt-1 font-medium">
                  info@poletopole.in
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Location Map */}
          <div className="space-y-6">
            <h3 className="text-sm uppercase tracking-[0.15em] text-white font-bold font-serif flex items-center">
              Location -:
            </h3>
            <div className="w-full h-48 rounded-xl overflow-hidden border-2 border-white/10 relative group hover:border-[#fbbf24] transition-colors duration-500 shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
              <iframe
                title="Google Maps Office Location"
                src="https://maps.google.com/maps?q=9%2C%20Old%20Jail%20Rd%2C%20Bundar%20Rama%20Garden%2C%20George%20Town%2C%20Chennai%2C%20Greater%20Chennai%2C%20Tamil%20Nadu%20600001&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 border-0"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer"
              ></iframe>
              <div className="absolute inset-0 bg-[#144C6C]/20 pointer-events-none group-hover:opacity-0 transition-opacity duration-500"></div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-400">
          <p>© {currentYear} Pole to Pole Tours and Travels. All Rights Reserved.</p>
          <div className="flex items-center">
            <span className="text-[#fbbf24] font-bold tracking-[0.2em] text-[10px] sm:text-xs uppercase">Dream <span className="text-white/30 mx-2">|</span> Travel <span className="text-white/30 mx-2">|</span> Admire</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#fbbf24] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#fbbf24] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
