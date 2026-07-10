import { useState, useEffect } from 'react';
import { Menu, X, Phone, ChevronDown, ChevronUp, Instagram } from 'lucide-react';
import mainLogo from '../assets/mainlogo.jpeg';

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
    { id: 'domestic', label: 'DOMESTIC Tours', hasDropdown: true },
    { id: 'international', label: 'INTERNATIONAL Tours', hasDropdown: true },
    { id: 'inbound', label: 'INBOUND Tours' },
    { id: 'reviews', label: 'REVIEW' },
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
      className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm flex flex-col"
    >
      {/* Top Black Bar */}
      <div className="w-full bg-black text-white px-4 sm:px-6 lg:px-12 xl:px-16 py-2 flex items-center text-sm border-b-2 border-black">
        <div className="flex space-x-4 items-center">
          <a href="https://wa.me/919566131283" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#FFCC00]">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="currentColor" stroke="none"/>
            </svg>
          </a>
          <a href="https://instagram.com/poletopole_toursandtravels" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform">
            <Instagram className="w-4 h-4 text-[#FFCC00]" />
          </a>
          <span className="text-gray-600">|</span>
          <span className="text-gray-200 text-xs tracking-wider">info@poletopole.in</span>
        </div>
      </div>

      <div className="w-full @container relative">
        <div className="flex items-center justify-between h-[90px] sm:h-[100px] w-full bg-transparent pl-0 pr-0 relative">

          {/* Brand Logo and Name */}
          <div
            id="brand-logo-container"
            className="flex items-center cursor-pointer group shrink-0 py-2"
            onClick={() => {
              setCurrentPage('home');
              setHoveredCategory(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="h-[70px] sm:h-[85px] overflow-hidden group-hover:scale-[1.04] transition-transform duration-300 flex items-center justify-center shrink-0">
              <img
                src={mainLogo}
                alt="Pole to Pole Tours Logo"
                className="h-full w-auto object-contain select-none pointer-events-none drop-shadow-sm mix-blend-multiply"
              />
            </div>
          </div>

          {/* Desktop Navigation Pill - Center Aligned */}
          <div id="desktop-nav-links" className="hidden xl:flex items-center justify-center h-[60px] bg-white rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-slate-200 p-2">
            {navItems.map((item) => {
              const isDropdown = item.hasDropdown;
              const categoryType = item.id as 'international' | 'domestic';

              const isHovered = hoveredCategory === categoryType;
              const isCurrent = currentPage === item.id || (item.id === 'home' && currentPage === 'home');
              const isTabActive = isCurrent || isHovered;

              const handleNavClick = () => {
                setCurrentPage(item.id);
                setHoveredCategory(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
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
                  className="h-full flex items-center relative group"
                >
                  <button
                    id={`nav-${item.id}`}
                    onClick={handleNavClick}
                    className={`h-full flex items-center justify-center transition-all duration-300 font-['Calibri',_sans-serif] cursor-pointer uppercase tracking-wider text-[15px] xl:text-[16px] whitespace-nowrap px-5 xl:px-6 font-bold rounded-full ${isTabActive
                      ? 'bg-[#144C6C] text-white shadow-sm'
                      : 'bg-transparent text-[#144C6C] hover:bg-slate-50'
                      }`}
                  >
                    <span>{item.label}</span>
                    {isDropdown && (
                      <ChevronDown className="w-3.5 h-3.5 ml-1 transition-transform group-hover:rotate-180" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Desktop Contact Button - Right Aligned */}
          <div className="hidden xl:flex items-center pr-8">
            <button
              onClick={() => {
                setCurrentPage('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-[#144C6C] text-white px-3 py-2.5 rounded-full font-display font-black uppercase tracking-tight text-[11px] shadow-md hover:scale-105 active:scale-95 duration-300 transition-transform cursor-pointer"
            >
              CONTACT US
            </button>
          </div>

          {/* Mobile Hamburguer Menu Button */}
          <div className="flex xl:hidden items-center pr-4 sm:pr-6 ml-auto">
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
          className="xl:hidden absolute top-full left-0 w-full bg-white border-t border-slate-200 py-6 px-4 space-y-3 shadow-2xl transition-all duration-500 max-h-[85vh] overflow-y-auto"
        >
          {navItems.map((item) => {
            if (item.id === 'international') {
              const uniqueIntTags = Array.from(new Set([...INT_ASIA_1_PYS, ...INT_ASIA_2_PYS, ...INT_EUROPE_PYS, ...INT_AFRICA_PYS, ...INT_HONEYMOON_PYS]));
              return (
                <div key={item.id} className="space-y-1">
                  <div className="w-full flex items-center justify-between text-slate-700 hover:bg-slate-50 rounded-lg">
                    <button
                      onClick={() => {
                        setCurrentPage('international');
                        setIsOpen(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="flex-1 text-left font-display text-sm uppercase tracking-widest py-3 px-4 cursor-pointer"
                    >
                      {item.label}
                    </button>
                    <button
                      onClick={() => setMobileIntExpanded(!mobileIntExpanded)}
                      className="p-3 cursor-pointer"
                    >
                      {mobileIntExpanded ? <ChevronUp className="w-4 h-4 text-[#144C6C]" /> : <ChevronDown className="w-4 h-4 text-[#144C6C]" />}
                    </button>
                  </div>
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
                  <div className="w-full flex items-center justify-between text-slate-700 hover:bg-slate-50 rounded-lg">
                    <button
                      onClick={() => {
                        setCurrentPage('domestic');
                        setIsOpen(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="flex-1 text-left font-display text-sm uppercase tracking-widest py-3 px-4 cursor-pointer"
                    >
                      {item.label}
                    </button>
                    <button
                      onClick={() => setMobileDomExpanded(!mobileDomExpanded)}
                      className="p-3 cursor-pointer"
                    >
                      {mobileDomExpanded ? <ChevronUp className="w-4 h-4 text-[#144C6C]" /> : <ChevronDown className="w-4 h-4 text-[#144C6C]" />}
                    </button>
                  </div>
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
                  setCurrentPage(item.id);
                  setIsOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`w-full text-left font-['Calibri',_sans-serif] text-sm uppercase tracking-widest py-3 px-4 rounded-lg block cursor-pointer transition-colors ${currentPage === item.id
                  ? 'bg-[#144C6C] text-white'
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
