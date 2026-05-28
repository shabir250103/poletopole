import { useState, useEffect } from 'react';
import { Menu, X, Phone, ChevronDown, ChevronUp } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  onSelectPackage?: (pkgName: string) => void;
  onLocatePackage?: (pkgName: string) => void;
}

// 5 Columns split for Domestic "INDIA" Packages
const NORTH_INDIA_PYS = [
  'Kashmir',
  'Delhi',
  'Agra',
  'Jaipur',
  'Himachal Pradesh',
  'Rajasthan'
];

const SOUTH_INDIA_PYS = [
  'Bangalore',
  'Mysore',
  'Ooty',
  'Kodaikanal',
  'Kerala',
  'Hyderabad',
  'Coorg',
  'Andaman',
  'Lakshadweep'
];

const WEST_INDIA_PYS = [
  'Goa',
  'Mumbai',
  'Pune'
];

const EAST_INDIA_PYS = [
  'Kolkata'
];

const NORTH_EAST_PYS = [
  'Meghalaya',
  'North East India'
];

const HONEYMOON_DOMESTIC_PYS = [
  'Kashmir',
  'Himachal Pradesh',
  'Ooty',
  'Kodaikanal',
  'Kerala',
  'Goa',
  'Coorg',
  'Andaman',
  'Lakshadweep',
  'Meghalaya'
];

const EDUCATIONAL_HERITAGE_PYS = [
  'Delhi',
  'Agra',
  'Jaipur',
  'Mysore',
  'Hyderabad',
  'Kolkata',
  'Rajasthan'
];

// 5 Columns split for International "PACKAGES"
const INT_ASIA_1_PYS = [
  'Dubai',
  'Singapore',
  'Malaysia',
  'Bali',
  'Vietnam',
  'Cambodia',
  'Sri Lanka',
  'Maldives'
];

const INT_ASIA_2_PYS = [
  'Hong Kong',
  'China',
  'Japan',
  'Thailand',
  'Philippines',
  'Kazakhstan',
  'Uzbekistan',
  'Oman'
];

const INT_EUROPE_PYS = [
  'Turkey',
  'Armenia',
  'Georgia',
  'Greece',
  'France',
  'Germany',
  'London',
  'Switzerland'
];

const INT_AFRICA_PYS = [
  'Egypt',
  'Mauritius',
  'Kenya',
  'South Africa',
  'Tanzania'
];

const INT_HONEYMOON_PYS = [
  'Maldives',
  'Bali',
  'Switzerland',
  'Mauritius',
  'Dubai',
  'Greece',
  'Turkey',
  'Sri Lanka',
  'Thailand'
];

export default function Navbar({ currentPage, setCurrentPage, onSelectPackage, onLocatePackage }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<'international' | 'domestic' | null>(null);
  const [mobileIntExpanded, setMobileIntExpanded] = useState(false);
  const [mobileDomExpanded, setMobileDomExpanded] = useState(false);

  // Close hover category on page shift
  useEffect(() => {
    setHoveredCategory(null);
  }, [currentPage]);

  const triggerGeneralWA = () => {
    const text = "Hi Pole to Pole Travels, I would like to make an inquiry about a custom holiday package.";
    window.open(`https://wa.me/919566131283?text=${encodeURIComponent(text)}`, '_blank');
  };

  const triggerPackageWA = (pkgName: string) => {
    const text = `Hi Pole to Pole Travels, I am interested in inquiring about your customized package for: ${pkgName}. Please share details!`;
    window.open(`https://wa.me/919566131283?text=${encodeURIComponent(text)}`, '_blank');
  };

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'about-us', label: 'ABOUT US' },
    { id: 'domestic', label: 'DOMESTIC PACKAGES', hasDropdown: true },
    { id: 'international', label: 'INTERNATIONAL PACKAGES', hasDropdown: true },
    { id: 'reviews', label: 'REVIEWS' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const handleSelectDest = (dest: string) => {
    if (onSelectPackage) {
      onSelectPackage(dest);
    } else if (onLocatePackage) {
      onLocatePackage(dest);
    } else {
      triggerPackageWA(dest);
    }
    setHoveredCategory(null);
  };

  const renderDestSquareButton = (dest: string) => {
    return (
      <li key={dest} className="flex items-center">
        <button
          onClick={() => handleSelectDest(dest)}
          className="text-[12px] font-sans font-semibold text-slate-800 hover:text-[#144C6C] text-left transition-colors w-full flex items-center py-0.5 group/item cursor-pointer"
        >
          <span className="text-slate-800 mr-2 text-[10px] select-none">&#9642;</span>
          <span className="truncate">{dest}</span>
        </button>
      </li>
    );
  };

  return (
    <nav
      id="main-nav"
      className="fixed top-0 left-0 w-full z-50 bg-white border-b border-slate-200 shadow-sm py-2"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 @container relative">
        <div className="flex items-center justify-between h-[105px] sm:h-[125px] lg:h-[140px]">
          
          {/* Brand Logo and Name - Stable, unchanging padding on hover */}
          <div
            id="brand-logo-container"
            className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 cursor-pointer group"
            onClick={() => {
              setCurrentPage('home');
              setHoveredCategory(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="w-[105px] h-[105px] sm:w-[125px] sm:h-[125px] lg:w-[140px] lg:h-[140px] overflow-hidden group-hover:scale-[1.04] transition-transform duration-300 flex items-center justify-center shrink-0 relative bg-transparent mix-blend-multiply">
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
 
          {/* Desktop Navigation links - Fully hover based transitions */}
          <div id="desktop-nav-links" className="hidden lg:flex items-center gap-x-1.5 xl:gap-x-3 ml-auto h-full">
            {navItems.map((item) => {
              const isDropdown = item.hasDropdown;
              const categoryType = item.id as 'international' | 'domestic';
              
              const isHovered = hoveredCategory === categoryType;
              const isCurrent = currentPage === item.id || (item.id === 'home' && currentPage === 'home');
              const isTabActive = isCurrent || isHovered;

              const handleNavClick = () => {
                if (item.id === 'about-us') {
                  setCurrentPage('about-us');
                  setHoveredCategory(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  setCurrentPage(item.id);
                  setHoveredCategory(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              };

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => {
                    if (isDropdown) {
                      setHoveredCategory(categoryType);
                    }
                  }}
                  onMouseLeave={() => {
                    if (isDropdown) {
                      setHoveredCategory(null);
                    }
                  }}
                  className="h-full flex items-center pt-2 pb-2"
                >
                  <button
                    id={`nav-${item.id}`}
                    onClick={(e) => {
                      handleNavClick();
                    }}
                    className={`h-[60px] flex items-center justify-center transition-all duration-200 font-display cursor-pointer uppercase tracking-widest text-[12px] xl:text-[13px] whitespace-nowrap px-3 py-2 rounded font-black ${
                      isTabActive 
                        ? 'bg-[#144C6C] text-white shadow-sm' 
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isDropdown && (
                      <ChevronDown className="w-3.5 h-3.5 ml-1" />
                    )}
                  </button>
                </div>
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
 
        {/* ==============================================
             SYMMETRICAL CENTRED MEGA DROP-DOWNS (DOMESTIC)
             ============================================== */}
        {hoveredCategory === 'domestic' && (
          <div
            id="domestic-mega-menu"
            onMouseEnter={() => setHoveredCategory('domestic')}
            onMouseLeave={() => setHoveredCategory(null)}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-0 w-full max-w-[1140px] bg-[#f8f9fa] border-4 border-[#144C6C] rounded-md p-6 shadow-2xl z-50 text-left animate-fade-in before:content-[''] before:absolute before:-top-4 before:left-0 before:right-0 before:h-4 before:bg-transparent"
          >
            <div className="grid grid-cols-5 gap-5 text-slate-800">
              
              {/* Column 1: North India Packages */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-[#144C6C] font-sans font-black text-[13px] uppercase tracking-wider pb-1.5 border-b-2 border-slate-300">
                    North India Packages
                  </h4>
                  <ul className="space-y-1.5 mt-2">
                    {NORTH_INDIA_PYS.map((dest) => renderDestSquareButton(dest))}
                  </ul>
                </div>
              </div>
 
              {/* Column 2: South India Packages */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-[#144C6C] font-sans font-black text-[13px] uppercase tracking-wider pb-1.5 border-b-2 border-slate-300">
                    South India Packages
                  </h4>
                  <ul className="space-y-1.5 mt-2">
                    {SOUTH_INDIA_PYS.map((dest) => renderDestSquareButton(dest))}
                  </ul>
                </div>
              </div>
 
              {/* Column 3: West India & East India */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-[#144C6C] font-sans font-black text-[13px] uppercase tracking-wider pb-1.5 border-b-2 border-slate-300">
                    West India Packages
                  </h4>
                  <ul className="space-y-1.5 mt-2">
                    {WEST_INDIA_PYS.map((dest) => renderDestSquareButton(dest))}
                  </ul>
                </div>
                <div className="pt-2">
                  <h4 className="text-[#144C6C] font-sans font-black text-[13px] uppercase tracking-wider pb-1.5 border-b-2 border-slate-300">
                    East India Packages
                  </h4>
                  <ul className="space-y-1.5 mt-2">
                    {EAST_INDIA_PYS.map((dest) => renderDestSquareButton(dest))}
                  </ul>
                </div>
              </div>
 
              {/* Column 4: North East India Packages */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-[#144C6C] font-sans font-black text-[13px] uppercase tracking-wider pb-1.5 border-b-2 border-slate-300">
                    North East India Packages
                  </h4>
                  <ul className="space-y-1.5 mt-2">
                    {NORTH_EAST_PYS.map((dest) => renderDestSquareButton(dest))}
                  </ul>
                </div>
              </div>
 
              {/* Column 5: Honeymoon & Educational */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-[#144C6C] font-sans font-black text-[13px] uppercase tracking-wider pb-1.5 border-b-2 border-slate-300">
                    Honeymoon Packages
                  </h4>
                  <ul className="space-y-1.5 mt-2">
                    {HONEYMOON_DOMESTIC_PYS.map((dest) => renderDestSquareButton(dest))}
                  </ul>
                </div>
                <div className="pt-2">
                  <h4 className="text-[#144C6C] font-sans font-black text-[13px] uppercase tracking-wider pb-1.5 border-b-2 border-slate-300">
                    Educational & Heritage Packages
                  </h4>
                  <ul className="space-y-1.5 mt-2">
                    {EDUCATIONAL_HERITAGE_PYS.map((dest) => renderDestSquareButton(dest))}
                  </ul>
                </div>
              </div>
 
            </div>
          </div>
        )}
 
        {/* ==============================================
             SYMMETRICAL CENTRED MEGA DROP-DOWNS (INTERNATIONAL)
             ============================================== */}
        {hoveredCategory === 'international' && (
          <div
            id="international-mega-menu"
            onMouseEnter={() => setHoveredCategory('international')}
            onMouseLeave={() => setHoveredCategory(null)}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-0 w-full max-w-[1140px] bg-[#f8f9fa] border-4 border-[#144C6C] rounded-md p-6 shadow-2xl z-50 text-left animate-fade-in before:content-[''] before:absolute before:-top-4 before:left-0 before:right-0 before:h-4 before:bg-transparent"
          >
            <div className="grid grid-cols-5 gap-5 text-slate-800">
              
              {/* Column 1: Asia Core */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-[#144C6C] font-sans font-black text-[13px] uppercase tracking-wider pb-1.5 border-b-2 border-slate-300">
                    Asia
                  </h4>
                  <ul className="space-y-1.5 mt-2">
                    {INT_ASIA_1_PYS.map((dest) => renderDestSquareButton(dest))}
                  </ul>
                </div>
              </div>
 
              {/* Column 2: Asia South & East */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-[#144C6C] font-sans font-black text-[13px] uppercase tracking-wider pb-1.5 border-b-2 border-slate-300">
                    Asia
                  </h4>
                  <ul className="space-y-1.5 mt-2">
                    {INT_ASIA_2_PYS.map((dest) => renderDestSquareButton(dest))}
                  </ul>
                </div>
              </div>
 
              {/* Column 3: Europe */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-[#144C6C] font-sans font-black text-[13px] uppercase tracking-wider pb-1.5 border-b-2 border-slate-300">
                    Europe
                  </h4>
                  <ul className="space-y-1.5 mt-2">
                    {INT_EUROPE_PYS.map((dest) => renderDestSquareButton(dest))}
                  </ul>
                </div>
              </div>
 
              {/* Column 4: Africa */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-[#144C6C] font-sans font-black text-[13px] uppercase tracking-wider pb-1.5 border-b-2 border-slate-300">
                    Africa
                  </h4>
                  <ul className="space-y-1.5 mt-2">
                    {INT_AFRICA_PYS.map((dest) => renderDestSquareButton(dest))}
                  </ul>
                </div>
              </div>
 
              {/* Column 5: Honeymoon & All Packages Core */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-[#144C6C] font-sans font-black text-[13px] uppercase tracking-wider pb-1.5 border-b-2 border-slate-300">
                    Honeymoon Packages
                  </h4>
                  <ul className="space-y-1.5 mt-2">
                    {INT_HONEYMOON_PYS.map((dest) => renderDestSquareButton(dest))}
                  </ul>
                </div>
              </div>
 
            </div>
          </div>
        )}
 
      </div>
 
      {/* Mobile Menu panel */}
      {isOpen && (
        <div
          id="mobile-menu-drawer"
          className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-slate-200 py-6 px-4 space-y-3 shadow-2xl transition-all duration-500 max-h-[85vh] overflow-y-auto"
        >
          {navItems.map((item) => {
            if (item.id === 'international') {
              const uniqueIntTags = Array.from(new Set([...INT_ASIA_1_PYS, ...INT_ASIA_2_PYS, ...INT_EUROPE_PYS, ...INT_AFRICA_PYS, ...INT_HONEYMOON_PYS]));
              return (
                <div key={item.id} className="space-y-1">
                  <button
                    onClick={() => setMobileIntExpanded(!mobileIntExpanded)}
                    className="w-full text-left font-display text-sm uppercase tracking-widest py-3 px-4 rounded-lg flex items-center justify-between text-slate-700 hover:bg-slate-50"
                  >
                    <span>{item.label}</span>
                    {mobileIntExpanded ? <ChevronUp className="w-4 h-4 text-[#144C6C]" /> : <ChevronDown className="w-4 h-4 text-[#144C6C]" />}
                  </button>
                  {mobileIntExpanded && (
                    <div className="pl-6 pr-4 py-2 space-y-3 bg-slate-50 rounded-lg border-l border-[#144C6C] max-h-80 overflow-y-auto premium-scrollbar">
                      <p className="text-[11px] text-[#144C6C] font-bold uppercase tracking-wider">International Packages</p>
                      <div className="flex flex-wrap gap-1.5">
                        {uniqueIntTags.map((dest, dIdx) => (
                          <button
                            key={dIdx}
                            onClick={() => {
                              handleSelectDest(dest);
                              setIsOpen(false);
                            }}
                            className="text-[10px] bg-white border border-slate-200 hover:border-[#144C6C] text-slate-700 px-2.5 py-1 rounded shadow-sm cursor-pointer"
                          >
                            {dest}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }
 
            if (item.id === 'domestic') {
              const uniqueDomTags = Array.from(new Set([...NORTH_INDIA_PYS, ...SOUTH_INDIA_PYS, ...WEST_INDIA_PYS, ...EAST_INDIA_PYS, ...NORTH_EAST_PYS, ...HONEYMOON_DOMESTIC_PYS, ...EDUCATIONAL_HERITAGE_PYS]));
              return (
                <div key={item.id} className="space-y-1">
                  <button
                    onClick={() => setMobileDomExpanded(!mobileDomExpanded)}
                    className="w-full text-left font-display text-sm uppercase tracking-widest py-3 px-4 rounded-lg flex items-center justify-between text-slate-700 hover:bg-slate-50"
                  >
                    <span>{item.label}</span>
                    {mobileDomExpanded ? <ChevronUp className="w-4 h-4 text-[#144C6C]" /> : <ChevronDown className="w-4 h-4 text-[#144C6C]" />}
                  </button>
                  {mobileDomExpanded && (
                    <div className="pl-6 pr-4 py-2 space-y-3 bg-slate-50 rounded-lg border-l border-[#144C6C] max-h-80 overflow-y-auto premium-scrollbar">
                      <p className="text-[11px] text-[#144C6C] font-bold uppercase tracking-wider">Domestic Packages</p>
                      <div className="flex flex-wrap gap-1.5">
                        {uniqueDomTags.map((dest, dIdx) => (
                          <button
                            key={dIdx}
                            onClick={() => {
                              handleSelectDest(dest);
                              setIsOpen(false);
                            }}
                            className="text-[10px] bg-white border border-slate-200/50 hover:border-[#144C6C] text-slate-700 px-2.5 py-1 rounded shadow-sm cursor-pointer"
                          >
                            {dest}
                          </button>
                        ))}
                      </div>
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
                  if (item.id === 'about-us') {
                    setCurrentPage('about-us');
                    setIsOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    setCurrentPage(item.id);
                    setIsOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className={`w-full text-left font-display text-sm uppercase tracking-widest py-3 px-4 rounded-lg block cursor-pointer transition-colors ${
                  currentPage === item.id
                    ? 'bg-[#144C6C]/10 text-[#144C6C] border-l-2 border-[#144C6C]'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <div className="pt-4 border-t border-slate-200/85 flex flex-col gap-3 px-4">
            <button
              onClick={triggerGeneralWA}
              className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-slate-100 bg-[#144C6C] py-3 rounded-full font-display w-full cursor-pointer shadow-sm"
            >
              <Phone className="w-4 h-4" />
              <span>Call / WhatsApp Us</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
