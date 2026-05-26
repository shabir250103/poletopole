import { useState, useEffect } from 'react';
import { Menu, X, Phone, Compass, ChevronDown, ChevronUp } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const INTERNATIONAL_CATEGORIES = [
  {
    title: 'Asia',
    destinations: [
      'Bali',
      'Cambodia',
      'China',
      'Hong Kong',
      'Japan',
      'Indonesia',
      'Kazakhstan',
      'Russia',
      'South Korea',
      'Malaysia',
      'Singapore',
      'Philippines',
      'Taiwan',
      'Thailand',
      'Vietnam',
      'Uzbekistan'
    ]
  },
  {
    title: 'Europe',
    destinations: [
      'Armenia',
      'Austria',
      'Belgium',
      'Bulgaria',
      'Croatia',
      'Czech Republic',
      'Denmark Republic',
      'Finland Republic',
      'France',
      'Germany',
      'Greece',
      'Greenland',
      'Hungary',
      'Iceland',
      'Ireland',
      'Italy',
      'London',
      'Netherlands',
      'Norway',
      'Portugal',
      'Romania',
      'Russia',
      'Slovakia',
      'Spain',
      'Sweden',
      'Switzerland',
      'Turkey',
      'United Kingdom'
    ]
  },
  {
    title: 'Africa & Pacific',
    destinations: [
      'HEADER:Africa',
      'Kenya',
      'Morocco',
      'Seychelles',
      'South Africa',
      'Zimbabwe',
      'Tanzania',
      'HEADER:Pacific',
      'Australia',
      'Fiji',
      'New Zealand'
    ]
  },
  {
    title: 'America & Islands',
    destinations: [
      'HEADER:America',
      'Alaska',
      'Canada',
      'Central America',
      'North America',
      'South America',
      'USA',
      'HEADER:Island',
      'Madagascar',
      'Maldives',
      'Mauritius',
      'Reunion',
      'Sri Lanka'
    ]
  },
  {
    title: 'Middle East & Specials',
    destinations: [
      'HEADER:Middle East',
      'Jordan',
      'Oman',
      'Qatar',
      'UAE',
      'Dubai',
      'Egypt',
      'HEADER:Cruises',
      'Cordelia Cruises',
      'HEADER:Honeymoon',
      'Maldives',
      'Bali',
      'Mauritius',
      'Phuket',
      'Switzerland',
      'Seychelles',
      'Langkawi',
      'Paris',
      'Italy',
      'Krabi',
      'Greece',
      'Thailand',
      'Dubai',
      'Sri Lanka',
      'Singapore',
      'Malaysia',
      'Croatia',
      'South Africa',
      'Koh Samui',
      'Australia',
      'Spain',
      'Europe'
    ]
  }
];

const DOMESTIC_CATEGORIES = [
  {
    title: 'North India',
    destinations: [
      'Agra',
      'Chandigarh',
      'Delhi',
      'Gulmarg',
      'Haridwar & Rishikesh',
      'Himachal Pradesh',
      'Jaipur',
      'Jaisalmer',
      'Jammu and Kashmir',
      'Ladakh',
      'Lucknow',
      'Manali',
      'Mussoorie',
      'Shimla',
      'Srinagar',
      'Uttarakhand'
    ]
  },
  {
    title: 'South India',
    destinations: [
      'Alleppey',
      'Araku Valley',
      'Bangalore',
      'Chennai',
      'Coorg',
      'Hyderabad',
      'Kanyakumari',
      'Karnataka',
      'Kerala',
      'Kochi',
      'Munnar',
      'Mysore',
      'Ooty',
      'Rameswaram',
      'Tamil Nadu',
      'Thekkady',
      'Tirupati',
      'Wayanad'
    ]
  },
  {
    title: 'East & West India',
    destinations: [
      'HEADER:East India',
      'Bihar',
      'Darjeeling',
      'Kolkata',
      'Odisha',
      'Puri',
      'West Bengal',
      'HEADER:West India',
      'Ahmedabad',
      'Goa',
      'Gujarat',
      'Jodhpur',
      'Mahabaleshwar',
      'Maharashtra',
      'Mumbai',
      'Pune',
      'Rajasthan',
      'Udaipur'
    ]
  },
  {
    title: 'Northeast & Central',
    destinations: [
      'HEADER:North East',
      'Arunachal Pradesh',
      'Gangtok',
      'Guwahati',
      'Manipur',
      'Meghalaya',
      'Pelling',
      'Shillong',
      'Sikkim',
      'Tawang',
      'HEADER:Central India',
      'Bhopal',
      'Chhattisgarh',
      'Gwalior',
      'Indore',
      'Madhya Pradesh',
      'Pachmarhi',
      'Ujjain'
    ]
  },
  {
    title: 'Spiritual & Honeymoon',
    destinations: [
      'HEADER:Spiritual',
      'Ayodhya',
      'Tirupati',
      'HEADER:Honeymoon',
      'Andaman',
      'Coorg',
      'Darjeeling',
      'Goa',
      'Himachal',
      'Kashmir',
      'Kerala',
      'Kodaikanal',
      'Manali',
      'Munnar',
      'Ooty',
      'Shimla',
      'HEADER:Educational',
      'Bangalore',
      'Darjeeling',
      'Goa',
      'Kochi',
      'Manali',
      'Mysore'
    ]
  }
];

export default function Navbar({ currentPage, setCurrentPage }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Hover categories for desktop menu
  const [hoveredCategory, setHoveredCategory] = useState<'international' | 'domestic' | null>(null);

  // Mobile accordion states
  const [mobileIntExpanded, setMobileIntExpanded] = useState(false);
  const [mobileDomExpanded, setMobileDomExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerPackageWA = (pkgName: string) => {
    const cleanName = pkgName.replace('Educational: ', '').replace('HEADER:', '');
    const text = `Hello Pole to Pole Travels! I am interested in the custom tour package for *${cleanName}*. Please provide more details, pricing and available itineraries.`;
    window.open(`https://wa.me/919566131283?text=${encodeURIComponent(text)}`, '_blank');
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'domestic', label: 'Domestic Packages', hasDropdown: true },
    { id: 'international', label: 'International Packages', hasDropdown: true },
    { id: 'reviews', label: 'Reviews' },
    { id: 'contact', label: 'Contact Us' },
  ];

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled || hoveredCategory
          ? 'bg-white/95 backdrop-blur-md md:py-4 py-3 border-b border-slate-200 shadow-md'
          : 'bg-white/85 backdrop-blur-sm md:py-6 py-4 border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo and Name */}
          <div
            id="brand-logo-container"
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => {
              setCurrentPage('home');
              setHoveredCategory(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="w-[54px] h-[54px] sm:w-[72px] sm:h-[72px] rounded-full border-2 border-[#114c6c]/25 bg-white group-hover:scale-[1.08] transition-transform duration-300 overflow-hidden flex items-center justify-center p-0.5 shadow-md shrink-0">
              <img 
                src="https://res.cloudinary.com/dnmsztoba/image/upload/q_auto/f_auto/v1779209814/regenerated_image_1779202070069_xb72nl.jpg" 
                alt="Pole to Pole Tours and Travels Logo" 
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col text-[#114c6c] justify-center">
              <span className="font-sans text-[17px] sm:text-[21px] lg:text-[24px] font-black tracking-[0.01em] leading-none select-none">
                POLE TO POLE
              </span>
              <span className="font-sans text-[11px] sm:text-[13px] lg:text-[15px] font-black tracking-[0.02em] uppercase select-none mt-0.5 leading-none">
                TOURS AND TRAVELS
              </span>
              <div className="h-[2px] bg-[#fbbf24] w-full mt-1 mb-1.5 rounded" />
              <div className="flex items-center justify-between font-sans text-[7.5px] sm:text-[8.5px] lg:text-[10px] font-extrabold uppercase tracking-[0.12em] leading-none select-none">
                <span>DREAM</span>
                <span className="text-[#fbbf24] font-black px-0.5">|</span>
                <span>TRAVEL</span>
                <span className="text-[#fbbf24] font-black px-0.5">|</span>
                <span>ADMIRE</span>
              </div>
            </div>
          </div>
 
          {/* Desktop Navigation links */}
          <div id="desktop-nav-links" className="hidden lg:flex items-center gap-x-4 xl:gap-x-6 ml-auto pl-6">
            {navItems.map((item) => {
              if (item.hasDropdown) {
                const categoryType = item.id as 'international' | 'domestic';
                return (
                  <div
                    key={item.id}
                    className="relative py-2 group/navlink"
                    onMouseEnter={() => setHoveredCategory(categoryType)}
                    onMouseLeave={() => setHoveredCategory(null)}
                  >
                    <button
                      id={`nav-${item.id}`}
                      onClick={() => {
                        setCurrentPage(item.id);
                        setHoveredCategory(null);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`text-xs uppercase tracking-widest transition-all duration-300 relative py-2 font-display cursor-pointer hover:text-[#114c6c] flex items-center gap-1.5 ${
                        currentPage === item.id || hoveredCategory === categoryType
                          ? 'text-[#114c6c]'
                          : 'text-slate-600'
                      }`}
                    >
                      <span className="font-bold text-[13.5px] xl:text-[15px] leading-[16px] not-italic no-underline whitespace-nowrap">{item.label}</span>
                      <ChevronDown className="w-3 h-3 opacity-75 group-hover/navlink:rotate-180 transition-transform duration-300" />
                      {(currentPage === item.id || hoveredCategory === categoryType) && (
                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#114c6c]" />
                      )}
                    </button>
 
                    {/* MEGA DROPDOWN PANEL */}
                    {hoveredCategory === categoryType && (
                      <div
                        id={`${item.id}-mega-menu`}
                        className="absolute left-1/2 -translate-x-[45%] top-full mt-2 w-[1000px] max-w-[90vw] bg-white border border-slate-200 rounded-2xl p-8 shadow-2xl z-50 max-h-[75vh] overflow-y-auto premium-scrollbar before:content-[''] before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 before:bg-transparent"
                      >
                        <div className="grid grid-cols-5 gap-6 text-left">
                          {(categoryType === 'international' ? INTERNATIONAL_CATEGORIES : DOMESTIC_CATEGORIES).map((cat, catIdx) => (
                            <div key={catIdx} className="space-y-3">
                              <h4 className="text-[#114c6c] font-serif font-semibold text-xs tracking-wider uppercase border-b border-slate-100 pb-2">
                                {cat.title}
                              </h4>
                              <ul className="space-y-1.5">
                                {cat.destinations.map((dest, destIdx) => {
                                  if (dest.startsWith('HEADER:')) {
                                    const subTitle = dest.replace('HEADER:', '');
                                    return (
                                      <li key={destIdx} className="pt-2 pb-1 first:pt-0 border-b border-slate-100/60">
                                        <span className="text-[10px] font-black text-[#114c6c] uppercase tracking-wider block">
                                          {subTitle}
                                        </span>
                                      </li>
                                    );
                                  }
                                  return (
                                    <li key={destIdx}>
                                      <button
                                        onClick={() => {
                                          triggerPackageWA(dest);
                                          setHoveredCategory(null);
                                        }}
                                        className="text-[11.5px] text-slate-600 hover:text-[#114c6c] text-left transition-colors font-display w-full flex items-start gap-1 py-0.5 group/item"
                                      >
                                        <span className="text-amber-500 mr-1 font-sans">•</span>
                                        <span className="truncate">{dest}</span>
                                      </button>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          ))}
                        </div>
                        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                          <p className="text-[10px] uppercase tracking-widest text-slate-400">
                            * Clicking on any destination instantly initiates a personalized WhatsApp inquiries *
                          </p>
                          <button
                            onClick={() => {
                              setCurrentPage(categoryType);
                              setHoveredCategory(null);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="text-xs uppercase tracking-wider text-[#114c6c] hover:bg-[#114c6c] hover:text-white border border-[#114c6c]/30 px-4 py-1.5 rounded-full transition-all bg-[#114c6c]/5 font-display"
                          >
                            View All Packages
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
 
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setHoveredCategory(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`uppercase tracking-widest transition-all duration-300 relative py-2 font-display cursor-pointer hover:text-[#114c6c] font-bold text-[13.5px] xl:text-[15px] whitespace-nowrap ${
                    item.id === 'home' ? 'leading-[16px] text-justify' : 'leading-[16px]'
                  } ${
                    currentPage === item.id
                      ? 'text-[#114c6c]'
                      : 'text-slate-600'
                  }`}
                >
                  {item.label}
                  {currentPage === item.id && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#114c6c]" />
                  )}
                </button>
              );
            })}
          </div>
 
          {/* Mobile Hamburguer Menu Button */}
          <div className="flex lg:hidden">
            <button
              id="mobile-menu-trigger"
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700 hover:text-slate-900 p-2 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
 
      {/* Mobile Menu panel */}
      {isOpen && (
        <div
          id="mobile-menu-drawer"
          className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-slate-200 py-6 px-4 space-y-3 shadow-2xl transition-all duration-500 max-h-[85vh] overflow-y-auto"
        >
          {navItems.map((item) => {
            if (item.id === 'international') {
              return (
                <div key={item.id} className="space-y-1">
                  <button
                    onClick={() => setMobileIntExpanded(!mobileIntExpanded)}
                    className="w-full text-left font-display text-sm uppercase tracking-widest py-3 px-4 rounded-lg flex items-center justify-between text-slate-700 hover:bg-slate-50"
                  >
                    <span>{item.label}</span>
                    {mobileIntExpanded ? <ChevronUp className="w-4 h-4 text-[#114c6c]" /> : <ChevronDown className="w-4 h-4 text-[#114c6c]" />}
                  </button>
                  {mobileIntExpanded && (
                    <div className="pl-6 pr-4 py-2 space-y-4 bg-slate-50 rounded-lg border-l border-[#114c6c] max-h-80 overflow-y-auto premium-scrollbar">
                      {INTERNATIONAL_CATEGORIES.map((cat, idx) => (
                        <div key={idx} className="space-y-1.5">
                          <p className="text-[10.5px] text-[#114c6c] font-bold uppercase tracking-wider border-b border-slate-200 pb-0.5">{cat.title}</p>
                          <div className="flex flex-wrap gap-1.5">
                            {cat.destinations.map((dest, dIdx) => {
                              if (dest.startsWith('HEADER:')) {
                                return (
                                  <div key={dIdx} className="w-full text-[9.5px] font-black text-[#114c6c] uppercase tracking-widest mt-2 mb-0.5 first:mt-0">
                                    {dest.replace('HEADER:', '')}
                                  </div>
                                );
                              }
                              return (
                                <button
                                  key={dIdx}
                                  onClick={() => {
                                    triggerPackageWA(dest);
                                    setIsOpen(false);
                                  }}
                                  className="text-[10px] bg-white border border-slate-200 hover:border-[#114c6c] text-slate-700 px-2.5 py-1 rounded shadow-sm"
                                >
                                  {dest}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
 
            if (item.id === 'domestic') {
              return (
                <div key={item.id} className="space-y-1">
                  <button
                    onClick={() => setMobileDomExpanded(!mobileDomExpanded)}
                    className="w-full text-left font-display text-sm uppercase tracking-widest py-3 px-4 rounded-lg flex items-center justify-between text-slate-700 hover:bg-slate-50"
                  >
                    <span>{item.label}</span>
                    {mobileDomExpanded ? <ChevronUp className="w-4 h-4 text-[#114c6c]" /> : <ChevronDown className="w-4 h-4 text-[#114c6c]" />}
                  </button>
                  {mobileDomExpanded && (
                    <div className="pl-6 pr-4 py-2 space-y-4 bg-slate-50 rounded-lg border-l border-[#114c6c] max-h-80 overflow-y-auto premium-scrollbar">
                      {DOMESTIC_CATEGORIES.map((cat, idx) => (
                        <div key={idx} className="space-y-1.5">
                          <p className="text-[10.5px] text-[#114c6c] font-bold uppercase tracking-wider border-b border-slate-200 pb-0.5">{cat.title}</p>
                          <div className="flex flex-wrap gap-1.5">
                            {cat.destinations.map((dest, dIdx) => {
                              if (dest.startsWith('HEADER:')) {
                                return (
                                  <div key={dIdx} className="w-full text-[9.5px] font-black text-[#114c6c] uppercase tracking-widest mt-2 mb-0.5 first:mt-0">
                                    {dest.replace('HEADER:', '')}
                                  </div>
                                );
                              }
                              return (
                                <button
                                  key={dIdx}
                                  onClick={() => {
                                    triggerPackageWA(dest);
                                    setIsOpen(false);
                                  }}
                                  className="text-[10px] bg-white border border-slate-200/50 hover:border-[#114c6c] text-slate-700 px-2.5 py-1 rounded shadow-sm"
                                >
                                  {dest}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={item.id}
                id={`mob-nav-${item.id}`}
                onClick={() => {
                  setCurrentPage(item.id);
                  setIsOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`w-full text-left font-display text-sm uppercase tracking-widest py-3 px-4 rounded-lg block cursor-pointer transition-colors ${
                  currentPage === item.id
                    ? 'bg-[#114c6c]/10 text-[#114c6c] border-l-2 border-[#114c6c]'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <div className="pt-4 border-t border-slate-200/85 flex flex-col gap-3 px-4">
            <a
              id="mob-call-cta"
              href="tel:+919566131283"
              className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-[#114c6c] border border-[#114c6c]/30 bg-[#114c6c]/5 py-3 rounded-full font-display"
            >
              <Phone className="w-4 h-4 text-[#114c6c]" />
              <span>Call Us</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
