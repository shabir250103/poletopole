import React, { useState, useEffect, useRef } from 'react';
import { 
  Compass, 
  MapPin, 
  Calendar, 
  Users, 
  MessageSquare, 
  Phone, 
  Mail, 
  Clock, 
  Star, 
  Check, 
  Search, 
  SlidersHorizontal, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Send, 
  X, 
  Sparkles, 
  Heart, 
  Award, 
  ShieldCheck, 
  Shield, 
  Plane, 
  Hotel, 
  UtensilsCrossed, 
  CalendarDays, 
  Maximize2,
  FileText,
  HelpCircle,
  TrendingUp,
  MessageCircle,
  Coffee,
  Instagram,
  Play,
  Globe,
  Handshake,
  Map,
  Headphones
} from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { TravelPackage, Review, InstagramPost, Message, InquiryInput } from './types';
import { INTERNATIONAL_PACKAGES, DOMESTIC_PACKAGES, REVIEWS, INSTAGRAM_FEED } from './data';
import { formatCurrency, parseMarkdownToHTML } from './utils';

const HERO_VIDEOS = [
  'https://res.cloudinary.com/dnmsztoba/video/upload/q_auto/f_auto/v1779630484/12978273_3840_2160_30fps_naar12.mp4',
  'https://res.cloudinary.com/dnmsztoba/video/upload/q_auto/f_auto/v1779630487/14629596_3840_2160_60fps_tqbpxr.mp4',
  'https://res.cloudinary.com/dnmsztoba/video/upload/q_auto/f_auto/v1779699337/277097_jdpqvy.mp4',
  'https://res.cloudinary.com/dnmsztoba/video/upload/q_auto/f_auto/v1779699338/19229823-uhd_3840_2160_30fps_qhzsn1.mp4',
  'https://res.cloudinary.com/dnmsztoba/video/upload/q_auto/f_auto/v1779699338/218714_tpqyuk.mp4'
];

const REVIEW_IMAGES = [
  'https://res.cloudinary.com/dnmsztoba/image/upload/q_auto/f_auto/v1779633349/Screenshot_20260524-194821_awnmey.png',
  'https://res.cloudinary.com/dnmsztoba/image/upload/q_auto/f_auto/v1779633349/Screenshot_20260524-194827_yvg4eo.png',
  'https://res.cloudinary.com/dnmsztoba/image/upload/q_auto/f_auto/v1779633350/Screenshot_20260524-194835_fajs3v.png',
  'https://res.cloudinary.com/dnmsztoba/image/upload/q_auto/f_auto/v1779633351/Screenshot_20260524-194845_nrydkm.png',
  'https://res.cloudinary.com/dnmsztoba/image/upload/q_auto/f_auto/v1779633351/Screenshot_20260524-194926_qelqeo.png',
  'https://res.cloudinary.com/dnmsztoba/image/upload/q_auto/f_auto/v1779633352/Screenshot_20260524-194930_lcriw1.png',
  'https://res.cloudinary.com/dnmsztoba/image/upload/q_auto/f_auto/v1779633352/Screenshot_20260524-194936_n2gcdr.png',
  'https://res.cloudinary.com/dnmsztoba/image/upload/q_auto/f_auto/v1779633353/Screenshot_20260524-194940_amo9o2.png',
  'https://res.cloudinary.com/dnmsztoba/image/upload/q_auto/f_auto/v1779633354/Screenshot_20260524-194944_yrb43u.png',
  'https://res.cloudinary.com/dnmsztoba/image/upload/q_auto/f_auto/v1779633355/Screenshot_20260524-194948_jdlqkz.png'
];

const VIDEO_HIGHLIGHTS = [
  'https://res.cloudinary.com/dnmsztoba/video/upload/q_auto/f_auto/v1779700176/VID_20260525_020604_622_nifaea.mp4',
  'https://res.cloudinary.com/dnmsztoba/video/upload/q_auto/f_auto/v1779700176/VID_20260525_020709_220_zwev0a.mp4',
  'https://res.cloudinary.com/dnmsztoba/video/upload/q_auto/f_auto/v1779700176/VID_20260525_020554_907_sxx1nw.mp4',
  'https://res.cloudinary.com/dnmsztoba/video/upload/q_auto/f_auto/v1779700175/VID_20260525_020527_966_rs3uiu.mp4',
  'https://res.cloudinary.com/dnmsztoba/video/upload/q_auto/f_auto/v1779700175/VID_20260525_020458_231_donq5k.mp4'
];

function VideoHighlightCard({ src, index }: { src: string; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(err => console.error("Playback failed", err));
    }
  };

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/50 bg-black group flex flex-col justify-between aspect-[9/16] w-full max-w-[240px] mx-auto transition-transform hover:scale-[1.03] duration-300">
      <div className="relative w-full h-full cursor-pointer" onClick={togglePlay}>
        <video
          ref={videoRef}
          src={src}
          playsInline
          loop
          className="w-full h-full object-cover"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          controls={isPlaying}
        />
        {!isPlaying && (
          <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/30 transition-colors flex flex-col items-center justify-center p-4">
            <div className="w-12 h-12 rounded-full bg-white/95 text-slate-900 flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-white transition-all duration-300">
              <Play className="w-5 h-5 fill-slate-900 translate-x-[1px]" />
            </div>
            <span className="text-white text-[10px] font-semibold uppercase tracking-wider mt-3 drop-shadow">
              Highlight #{index + 1}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [waHover, setWaHover] = useState(false);
  const [currentVideoIdx, setCurrentVideoIdx] = useState<number>(0);
  const [activeReviewImgListIdx, setActiveReviewImgListIdx] = useState<number>(0);

  // Auto-advance video every 10 seconds when on the Home view
  useEffect(() => {
    if (currentPage !== 'home') return;
    const timer = setTimeout(() => {
      setCurrentVideoIdx((prev) => (prev + 1) % HERO_VIDEOS.length);
    }, 10000);
    return () => clearTimeout(timer);
  }, [currentVideoIdx, currentPage]);

  // Auto-advance reviews every 5 seconds when on the reviews view
  useEffect(() => {
    if (currentPage !== 'reviews') return;
    const timer = setTimeout(() => {
      setActiveReviewImgListIdx((prev) => (prev + 1) % REVIEW_IMAGES.length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [activeReviewImgListIdx, currentPage]);

  // States for Searching, Filtering and Sorting packages
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeSort, setActiveSort] = useState('popular'); // popular, price-low, price-high, rating
  const [inquirySuccess, setInquirySuccess] = useState<string | null>(null);
  const [whatsappTemplateUrl, setWhatsappTemplateUrl] = useState<string>('');

  // Contact / Booking form state
  const [bookingForm, setBookingForm] = useState<InquiryInput>({
    name: '',
    destination: '',
    budget: '',
    numberOfDays: '',
    numberOfPersons: '',
  });
  const [formLoading, setFormLoading] = useState(false);

  // Reviews Carousel State
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  // Handle Form changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit Inquiry form
  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.destination) {
      alert('Kindly provide your Name and Desired Destination.');
      return;
    }

    setFormLoading(true);
    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingForm)
      });
      const data = await response.json();
      
      if (data.success) {
        setInquirySuccess(data.message);
        setWhatsappTemplateUrl(data.whatsappUrl);
        // Automatically open WhatsApp on successful formulation
        window.open(data.whatsappUrl, '_blank');
        // Reset form
        setBookingForm({
          name: '',
          destination: '',
          budget: '',
          numberOfDays: '',
          numberOfPersons: '',
        });
      }
    } catch (err) {
      console.error('Submission error:', err);
      // Fallback direct WhatsApp opening in case of any issue
      const template = `Hello Pole to Pole Tours and Travels! I want to inquire about a custom trip:\n\n` +
                        `• *Destination*: ${bookingForm.destination}\n` +
                        `• *Name*: ${bookingForm.name}\n` +
                        `• *Budget*: ${bookingForm.budget || 'Not specified'}\n` +
                        `• *Number of Days*: ${bookingForm.numberOfDays || 'Not specified'}\n` +
                        `• *Number of Persons*: ${bookingForm.numberOfPersons || 'Not specified'}`;
      setInquirySuccess('Your custom inquiry draft is ready! Opening WhatsApp...');
      const fallbackUrl = `https://wa.me/919566131283?text=${encodeURIComponent(template)}`;
      setWhatsappTemplateUrl(fallbackUrl);
      window.open(fallbackUrl, '_blank');
    } finally {
      setFormLoading(false);
    }
  };

  // Helper values for standard luxury WhatsApp links
  const triggerGeneralWA = () => {
    const text = "Hello Pole to Pole Tours and Travels! I am interested in planning a custom vacation package. Please contact me.";
    window.open(`https://wa.me/919566131283?text=${encodeURIComponent(text)}`, '_blank');
  };

  const triggerPackageWA = (pkgName: string) => {
    const text = `Hello Pole to Pole Tours and Travels! I am interested in this package: *${pkgName}*`;
    window.open(`https://wa.me/919566131283?text=${encodeURIComponent(text)}`, '_blank');
  };

  const triggerInquiryWA = (form: InquiryInput) => {
    const text = `Hello Pole to Pole Tours and Travels! I want to inquire about a custom trip:\n\n` +
                 `• *Destination*: ${form.destination || 'Any'}\n` +
                 `• *Name*: ${form.name}\n` +
                 `• *Budget*: ${form.budget || 'Not specified'}\n` +
                 `• *Number of Days*: ${form.numberOfDays || 'Not specified'}\n` +
                 `• *Number of Persons*: ${form.numberOfPersons || 'Not specified'}`;
    window.open(`https://wa.me/919566131283?text=${encodeURIComponent(text)}`, '_blank');
  };

  const nextReview = () => {
    setActiveReviewIndex(prev => (prev + 1) % REVIEWS.length);
  };

  const prevReview = () => {
    setActiveReviewIndex(prev => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  // Unified Why Choose Us component values for premium branding (Who We Are + Why Travel With Us)
  const renderWhyChooseUs = () => {
    return (
      <div id="home-why-and-who-sections" className="space-y-0">
        
        {/* SECTION 1: WHO WE ARE */}
        <section id="who-we-are-section" className="py-12 bg-white border-t border-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            {/* Elegant small blue dash above */}
            <div className="w-12 h-[3.5px] bg-[#2563ea] rounded mx-auto mb-3"></div>
            
            <div className="text-center max-w-3xl mx-auto mb-8">
              <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#0f2d4a] tracking-tight mb-3">
                Who We Are
              </h2>
              <p className="text-slate-700 text-[15px] sm:text-[16px] leading-relaxed max-w-4xl mx-auto">
                Welcome to <span className="font-bold text-[#114c6c]">Pole TO Pole Tours and Travels</span>, where every journey is crafted with care, and your satisfaction is our priority.
              </p>
            </div>

            {/* Compact 4-column features row with fine lines */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 md:gap-y-0 text-center max-w-4xl mx-auto py-4 border-y border-slate-100/80 divide-x divide-slate-100">
              
              {/* Feature 1 */}
              <div id="who-feat-1" className="flex flex-col items-center px-2">
                <div className="w-14 h-14 rounded-full bg-[#f0f7ff] flex items-center justify-center text-[#2563ea] mb-3 shrink-0">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-[#0f2d4a] tracking-wide mb-1">
                  Founded in 2011
                </h3>
                <p className="text-xs text-slate-500">
                  By Nizaruddin
                </p>
              </div>

              {/* Feature 2 */}
              <div id="who-feat-2" className="flex flex-col items-center px-2">
                <div className="w-14 h-14 rounded-full bg-[#f0f7ff] flex items-center justify-center text-[#2563ea] mb-3 shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-[#0f2d4a] tracking-wide mb-1">
                  15+ Years
                </h3>
                <p className="text-xs text-slate-500">
                  Of Experience
                </p>
              </div>

              {/* Feature 3 */}
              <div id="who-feat-3" className="flex flex-col items-center px-2">
                <div className="w-14 h-14 rounded-full bg-[#f0f7ff] flex items-center justify-center text-[#2563ea] mb-3 shrink-0">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-[#0f2d4a] tracking-wide mb-1">
                  Tailored for You
                </h3>
                <p className="text-[11px] text-slate-500 leading-snug max-w-[150px]">
                  Travel experiences designed around your needs.
                </p>
              </div>

              {/* Feature 4 */}
              <div id="who-feat-4" className="flex flex-col items-center px-2">
                <div className="w-14 h-14 rounded-full bg-[#f0f7ff] flex items-center justify-center text-[#2563ea] mb-3 shrink-0">
                  <Handshake className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-[#0f2d4a] tracking-wide mb-1">
                  Your Satisfaction
                </h3>
                <p className="text-[11px] text-slate-500 leading-snug max-w-[150px]">
                  Going above and beyond your expectations.
                </p>
              </div>

            </div>

            <p className="text-center text-xs sm:text-sm text-slate-600 mt-6 max-w-2xl mx-auto font-medium leading-relaxed">
              With over a decade of expertise, we understand the diverse needs of our clients and deliver unforgettable travel experiences.
            </p>
          </div>
        </section>

        {/* SECTION 2: WHY TRAVEL WITH US */}
        <section id="why-travel-with-us-section" className="py-12 bg-[#fafbfd] border-b border-slate-150">
          <div className="max-w-xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold font-serif text-[#0f2d4a] tracking-tight mb-2">
                Why Travel With Us
              </h2>
              {/* Underline bar */}
              <div className="w-14 h-[3px] bg-[#2563ea] rounded mx-auto"></div>
            </div>

            {/* List with light dividers */}
            <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm overflow-hidden divide-y divide-slate-100">
              
              {/* Item 1 */}
              <div className="p-5 flex items-start gap-4 hover:bg-slate-50/20 transition-colors">
                <div className="w-12 h-12 rounded-full bg-[#f0f7ff] flex items-center justify-center text-[#2563ea] shrink-0">
                  <Map className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-[#0f2d4a] mb-1">
                    Personalized Packages
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-normal">
                    Custom itineraries tailored to your travel goals, budget and interests.
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="p-5 flex items-start gap-4 hover:bg-slate-50/20 transition-colors">
                <div className="w-12 h-12 rounded-full bg-[#f0f7ff] flex items-center justify-center text-[#2563ea] shrink-0">
                  <Globe className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-[#0f2d4a] mb-1">
                    Global Reach
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-normal">
                    Explore top destinations across Asia, Europe, America and beyond.
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="p-5 flex items-start gap-4 hover:bg-slate-50/20 transition-colors">
                <div className="w-12 h-12 rounded-full bg-[#f0f7ff] flex items-center justify-center text-[#2563ea] shrink-0 relative">
                  <Headphones className="w-6 h-6" />
                  <span className="absolute -bottom-1 -right-1 bg-[#2563ea] text-[8px] font-bold text-white px-1 py-0.5 rounded-full leading-none transform scale-90">
                    24/7
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-[#0f2d4a] mb-1">
                    24/7 Support
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-normal">
                    We're here whenever you need us—before, during and after your trip.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

      </div>
    );
  };

  const renderBespokeInquirySection = (sectionTag = "Reserve Your Seat", heading = "Design Your Bespoke Custom Tour", subtitle = "Submit a premium design request. Our tour planning team will contact you via WhatsApp or phone to finalize the finest itineraries.") => {
    return (
      <section id="inquiry-form-section" className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full animate-fade-in text-left">
        <div 
          id="booking-inquiry-box"
          className="w-full rounded-3xl p-8 sm:p-12 border border-slate-200 bg-white shadow-xl relative"
        >
          <div className="absolute top-0 right-10 -translate-y-1/2 p-3 rounded-full bg-[#114c6c]/10 border border-[#114c6c]/20 text-[#114c6c] backdrop-blur-lg">
            <Compass className="w-6 h-6 animate-spin-slow" />
          </div>

          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-[0.25em] text-[#114c6c] font-semibold font-display block">
              {sectionTag}
            </span>
            <h2 className="text-3xl font-serif font-bold text-slate-900 mt-1">
              {heading}
            </h2>
            <p className="text-xs text-slate-500 mt-2">
              {subtitle}
            </p>
          </div>

          <form onSubmit={handleInquirySubmit} className="space-y-6">
            {/* Row 1: Name & Destination */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-slate-500 font-display mb-2">Guest Name *</label>
                <input 
                  type="text"
                  name="name"
                  required
                  value={bookingForm.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Sarah Miller"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm text-slate-900 focus:outline-[#114c6c] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#114c6c] font-display mb-2">Desired Destination *</label>
                <input 
                  type="text"
                  name="destination"
                  required
                  value={bookingForm.destination}
                  onChange={handleInputChange}
                  placeholder="e.g. Switzerland, Bali, Kashmir, or any country"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm text-slate-900 focus:outline-[#114c6c] transition-colors"
                />
              </div>
            </div>

            {/* Row 2: Budget, Days, Persons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-slate-500 font-display mb-2">Estimated Budget *</label>
                <input 
                  type="text"
                  name="budget"
                  required
                  value={bookingForm.budget}
                  onChange={handleInputChange}
                  placeholder="e.g. $1,500 or Rs. 1,00,000"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm text-slate-900 focus:outline-[#114c6c] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-slate-500 font-display mb-2">Number of Days *</label>
                <input 
                  type="text"
                  name="numberOfDays"
                  required
                  value={bookingForm.numberOfDays}
                  onChange={handleInputChange}
                  placeholder="e.g. 7 Days"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm text-slate-900 focus:outline-[#114c6c] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-slate-500 font-display mb-2">Number of Persons *</label>
                <input 
                  type="text"
                  name="numberOfPersons"
                  required
                  value={bookingForm.numberOfPersons}
                  onChange={handleInputChange}
                  placeholder="e.g. 2 Persons"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm text-slate-900 focus:outline-[#114c6c] transition-colors"
                />
              </div>
            </div>

            {inquirySuccess && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm space-y-3 animate-fade-in">
                <p>{inquirySuccess}</p>
                {whatsappTemplateUrl && (
                  <a 
                    href={whatsappTemplateUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#25d366] text-white font-semibold text-xs uppercase tracking-widest hover:bg-[#20ba5a] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-white" />
                    <span>Send on WhatsApp Now</span>
                  </a>
                )}
              </div>
            )}

            <div className="pt-4 flex justify-center sm:justify-start">
              <button
                type="submit"
                disabled={formLoading}
                className="w-full sm:w-auto px-8 py-4 bg-[#144c6c] text-white uppercase tracking-widest text-xs font-bold rounded-xl hover:bg-[#144c6c]/95 transition-all disabled:opacity-40 cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4.5 h-4.5 text-white" />
                <span>{formLoading ? 'Formulating...' : 'Send via WhatsApp'}</span>
              </button>
            </div>
          </form>
        </div>
      </section>
    );
  };

  // Package Card Renderer
  const renderPackageCard = (pkg: TravelPackage) => {
    return (
      <div 
        key={pkg.id}
        id={`pkg-card-${pkg.id}`}
        onClick={() => triggerPackageWA(pkg.name)}
        className="group relative h-96 rounded-3xl overflow-hidden border border-slate-200/80 bg-white transition-all duration-300 hover:border-[#114c6c]/40 shadow-sm flex flex-col hover:-translate-y-1 cursor-pointer hover:shadow-xl"
      >
        {/* Destination Image Section */}
        <div className="absolute inset-0 z-0">
          <img 
            src={pkg.image} 
            alt={pkg.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Subtle gradient dark overlay inside card */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>
        </div>

        {/* Content Details */}
        <div className="relative z-10 p-6 h-full flex flex-col justify-end">
          <h3 className="text-2xl font-serif font-bold text-white group-hover:text-amber-400 transition-colors duration-200 leading-snug">
            {pkg.name}
          </h3>
          
          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#25d366] group-hover:text-white transition-colors">
              <span>Explore Package</span>
              <ArrowRight className="w-4 h-4 text-[#25d366] group-hover:translate-x-1.5 duration-200 transition-transform group-hover:text-[#25d366]" />
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div id="app-root-container" className="min-h-screen bg-[#fafafc] text-slate-800 selection:bg-[#114c6c] selection:text-white flex flex-col justify-between relative">
      
      {/* Glassmorphic Navbar */}
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Main Container Views */}
      <main className="flex-1 w-full pt-20">

        {/* 1. HOME VIEW */}
        {currentPage === 'home' && (
          <div id="view-home" className="space-y-0">
            {/* Cinematic Full screen video hero banner */}
            <section id="hero-banner" className="relative min-h-screen flex items-end justify-end overflow-hidden">
              {/* HTML5 video tag background looping */}
              <div className="absolute inset-0 z-0 bg-black">
                <video 
                  key={currentVideoIdx}
                  autoPlay 
                  muted 
                  loop
                  playsInline 
                  preload="auto"
                  style={{ imageRendering: 'auto', transform: 'translate3d(0,0,0)' }}
                  className="w-full h-full object-cover opacity-100 brightness-[1.05] contrast-[1.00] saturate-[1.00]"
                >
                  <source src={HERO_VIDEOS[currentVideoIdx]} type="video/mp4" />
                  {/* Fallback image if video fails to load in sandboxed preview */}
                  <img src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1920&q=80" alt="Breathtaking Luxury Resort" />
                </video>
              </div>

              {/* Sleek Minimalist Side Switchers (Left & Right Screen Chevrons) */}
              <button 
                onClick={() => setCurrentVideoIdx((prev) => (prev - 1 + HERO_VIDEOS.length) % HERO_VIDEOS.length)}
                className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-35 p-3 bg-transparent hover:bg-white/10 active:scale-95 transition-all cursor-pointer rounded-full text-white/90 hover:text-white group select-none"
                aria-label="Previous video"
              >
                <ChevronLeft className="w-12 h-12 stroke-[1.25] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] group-hover:-translate-x-1 duration-200 transition-transform" />
              </button>

              <button 
                onClick={() => setCurrentVideoIdx((prev) => (prev + 1) % HERO_VIDEOS.length)}
                className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-35 p-3 bg-transparent hover:bg-white/10 active:scale-95 transition-all cursor-pointer rounded-full text-white/90 hover:text-white group select-none"
                aria-label="Next video"
              >
                <ChevronRight className="w-12 h-12 stroke-[1.25] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] group-hover:translate-x-1 duration-200 transition-transform" />
              </button>

              {/* Minimalist Indicators (Clean lines at the bottom center, no backgrounds or blur overlays) */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-25 flex items-center gap-3 bg-black/25 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                {HERO_VIDEOS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentVideoIdx(idx)}
                    className="group flex items-center gap-1.5 focus:outline-none cursor-pointer"
                  >
                    <span className={`text-[10px] font-mono transition-colors ${
                      currentVideoIdx === idx ? 'text-amber-400 font-bold' : 'text-white/60 group-hover:text-white'
                    }`}>
                      0{idx + 1}
                    </span>
                    <div className="w-8 h-1 bg-white/30 rounded-full overflow-hidden relative">
                      <div 
                        className="h-full bg-amber-450 transition-all rounded-full"
                        style={{
                          transitionDuration: currentVideoIdx === idx ? '10000ms' : '0ms',
                          transitionTimingFunction: 'linear',
                          width: currentVideoIdx === idx ? '100%' : '0%',
                          backgroundColor: currentVideoIdx === idx ? '#fbbf24' : 'transparent'
                        }}
                      />
                    </div>
                  </button>
                ))}
              </div>

              {/* Hero Content - Clean of any text, containing only CTA buttons bottom-right */}
              <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 text-right pb-16 sm:pb-24 pointer-events-auto">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-end justify-end gap-4 sm:gap-6 mt-10">
                  <button
                    onClick={() => {
                      document.getElementById('booking-inquiry-box')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full sm:w-auto px-10 py-5 text-sm font-display uppercase tracking-[0.25em] bg-[#114c6c] text-white font-bold rounded-full hover:bg-[#114c6c]/90 transition-all duration-300 hover:scale-105 shadow-2xl cursor-pointer flex items-center justify-center gap-2 group animate-fade-in"
                  >
                    <span>Book Your Trip</span>
                    <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1.5 transition-transform" />
                  </button>
                  <button
                    onClick={triggerGeneralWA}
                    className="w-full sm:w-auto px-10 py-5 text-sm font-display uppercase tracking-[0.25em] border border-[#144c6c]/30 hover:border-[#144c6c] text-white bg-[#144c6c] hover:bg-[#144c6c]/90 font-bold rounded-full transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 cursor-pointer shadow-2xl animate-fade-in"
                  >
                    <MessageCircle className="w-5 h-5 text-white" />
                    <span>Contact on WhatsApp</span>
                  </button>
                </div>
              </div>
            </section>

            {/* Why Choose us grid (now placed immediately below Hero) */}
            {renderWhyChooseUs()}

            {/* Interactive Luxury Inquiry Form section (structured) */}
            {renderBespokeInquirySection()}
          </div>
        )}

        {/* 2. INTERNATIONAL PACKAGES VIEW */}
        {currentPage === 'international' && (
          <div id="view-international" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Header indicating Popular Packages */}
            <div className="text-center mb-12 animate-fade-in">
              <span className="text-xs uppercase tracking-[0.25em] text-[#114c6c] font-bold font-display block mb-2">
                Exclusive World Escapes
              </span>
              <h1 className="text-3xl font-serif font-black text-slate-900 justify-center">
                Our Popular Packages
              </h1>
              <div className="h-[2px] w-20 bg-amber-500 mx-auto mt-3 rounded" />
            </div>

            {/* Packages Grid */}
            <div id="intl-packages-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
              {(() => {
                const SELECTED_INTERNATIONAL_NAMES = ['dubai', 'maldives', 'switzerland', 'thailand', 'bali', 'malaysia', 'spain', 'singapore', 'srilanka', 'sri lanka', 'uzbekistan', 'morocco', 'turkey'];
                const filtered = SELECTED_INTERNATIONAL_NAMES.map(name => 
                  INTERNATIONAL_PACKAGES.find(pkg => pkg.name.toLowerCase() === name)
                ).filter((pkg): pkg is TravelPackage => !!pkg);
                return filtered.map((pkg) => renderPackageCard(pkg));
              })()}
            </div>

            {/* Premium Inquiry Section */}
            <div className="mt-16 border-t border-slate-100 pt-10">
              {renderBespokeInquirySection(
                "Exclusive Custom Route",
                "Design Your Custom International Escape",
                "Have other locations in mind? Share your dream international bucket-list directives. Our specialists will design your customized itinerary master plan."
              )}
            </div>
          </div>
        )}

        {/* 3. DOMESTIC PACKAGES VIEW */}
        {currentPage === 'domestic' && (
          <div id="view-domestic" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Header indicating Popular Packages */}
            <div className="text-center mb-12 animate-fade-in">
              <span className="text-xs uppercase tracking-[0.25em] text-[#114c6c] font-bold font-display block mb-2">
                Incredible National Journeys
              </span>
              <h1 className="text-3xl font-serif font-black text-slate-900 justify-center">
                Our Popular Packages
              </h1>
              <div className="h-[2px] w-20 bg-amber-500 mx-auto mt-3 rounded" />
            </div>

            {/* Packages Grid */}
            <div id="domestic-packages-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {(() => {
                const SELECTED_DOMESTIC_NAMES = ['kashmir', 'goa', 'kerala', 'ooty', 'munnar', 'shimla', 'agra', 'bengaluru', 'mumbai', 'jaipur', 'ladakh', 'kodaikanal'];
                const filtered = SELECTED_DOMESTIC_NAMES.map(name => 
                  DOMESTIC_PACKAGES.find(pkg => pkg.name.toLowerCase() === name)
                ).filter((pkg): pkg is TravelPackage => !!pkg);
                return filtered.map((pkg) => renderPackageCard(pkg));
              })()}
            </div>

            {/* Premium Inquiry Section */}
            <div className="mt-16 border-t border-slate-100 pt-10">
              {renderBespokeInquirySection(
                "Bespoke National Passage",
                "Design Your Custom Domestic Escape",
                "Want to blend other beautiful sights, forest safaris or historic walks? Send details to start sketching custom itineraries."
              )}
            </div>
          </div>
        )}

        {/* 4. REVIEWS VIEW */}
        {currentPage === 'reviews' && (
          <div id="view-reviews" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            
            {/* Minimalist Header */}
            <div className="mb-12 text-center animate-fade-in">
              <span className="text-xs uppercase tracking-[0.3em] text-[#114c6c] font-semibold font-display block mb-2">
                The Guest Testament
              </span>
              <h1 className="text-3xl font-serif font-bold text-slate-900">Verified Guest Reviews</h1>
              <p className="text-xs text-slate-500 mt-2 font-display uppercase tracking-widest">Genuine Feedback From Our Real WhatsApp and Google Reviews</p>
            </div>

            {/* Premium Interactive Screenshot Carousel Slider */}
            <div className="max-w-4xl mx-auto mb-20 animate-fade-in">
              
              {/* Active Image Box Frame */}
              <div className="relative group rounded-3xl overflow-hidden border border-slate-200/80 bg-white shadow-xl p-4 sm:p-6 flex flex-col items-center justify-center min-h-[360px] md:min-h-[500px]">
                
                {/* Active Review Image */}
                <div className="w-full flex justify-center items-center">
                  <img 
                    src={REVIEW_IMAGES[activeReviewImgListIdx]} 
                    alt={`Customer Verified Review ${activeReviewImgListIdx + 1}`}
                    className="max-h-[500px] md:max-h-[580px] w-auto max-w-full rounded-2xl object-contain border border-slate-100 shadow p-0.5 select-none transition-all duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Sleek Manual Left Arrow */}
                <button 
                  onClick={() => setActiveReviewImgListIdx((prev) => (prev - 1 + REVIEW_IMAGES.length) % REVIEW_IMAGES.length)}
                  className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-white/95 hover:bg-slate-50 active:scale-95 text-[#114c6c] shadow-lg border border-slate-200/50 transition-all cursor-pointer select-none group"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-6 h-6 stroke-[2] group-hover:-translate-x-0.5 transition-transform" />
                </button>

                {/* Sleek Manual Right Arrow */}
                <button 
                  onClick={() => setActiveReviewImgListIdx((prev) => (prev + 1) % REVIEW_IMAGES.length)}
                  className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-white/95 hover:bg-slate-50 active:scale-95 text-[#114c6c] shadow-lg border border-slate-200/50 transition-all cursor-pointer select-none group"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-6 h-6 stroke-[2] group-hover:translate-x-0.5 transition-transform" />
                </button>

                {/* Counter Tag */}
                <div className="absolute top-4 right-4 bg-[#114c6c]/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#114c6c]/15 text-xs text-[#114c6c] font-display font-bold">
                  {activeReviewImgListIdx + 1} / {REVIEW_IMAGES.length}
                </div>
              </div>

              {/* Progress Bar (switches every 5s automatically) */}
              <div className="w-full h-[4px] bg-slate-100 mt-6 rounded-full overflow-hidden">
                <div 
                  key={activeReviewImgListIdx}
                  className="h-full bg-amber-500 rounded-full"
                  style={{
                    animation: 'reviewProgress 5000ms linear forwards'
                  }}
                />
              </div>

            </div>

            {/* Video Highlights Section */}
            <div className="mt-24 border-t border-slate-100 pt-16">
              <div className="mb-12 text-center animate-fade-in">
                <span className="text-xs uppercase tracking-[0.3em] text-[#114c6c] font-semibold font-display block mb-2">
                  Direct From The Field
                </span>
                <h2 className="text-3xl font-serif font-bold text-slate-900 font-display">Video Highlights</h2>
                <p className="text-xs text-slate-500 mt-2 font-display uppercase tracking-widest">
                  Watch short highlight reels captured by our guests during their journeys (Click to Play)
                </p>
                <div className="h-[2px] w-20 bg-amber-500 mx-auto mt-4 rounded" />
              </div>

              {/* Grid of 5 videos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto px-4">
                {VIDEO_HIGHLIGHTS.map((videoUrl, idx) => (
                  <div key={idx} className="animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                    <VideoHighlightCard src={videoUrl} index={idx} />
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* 6. CONTACT US VIEW */}
        {currentPage === 'contact' && (
          <div id="view-contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                 {/* Header details */}
            <div className="text-center max-w-2xl mx-auto mb-16 pt-8">
              <span className="text-xs uppercase tracking-[0.3em] text-[#114c6c] font-semibold font-display block mb-3">
                Reach Out
              </span>
              <h1 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 mb-4">Contact Pole to Pole</h1>
              <div className="h-[2px] w-24 bg-[#114c6c]/40 mx-auto rounded mb-4"></div>
              <p className="text-sm text-slate-500 leading-relaxed">
                Connect with our expert travel advisors to map out bespoke domestic and international vacation routes, ask questions about custom packages, or arrange group excursions.
              </p>
            </div>

            {/* Layout container grid split: Contact Details left, Inquiry form right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
              
              {/* Left Column: Coordinates details */}
              <div id="contact-details-box" className="lg:col-span-5 space-y-8">
                
                <div className="p-8 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-6">
                  <h3 className="text-xl font-serif font-bold text-slate-900 mb-4">Pole to Pole Tours and Travels</h3>
                  
                  <div className="flex gap-4">
                    <div className="p-3 bg-[#114c6c]/10 border border-[#114c6c]/15 rounded-xl text-[#114c6c] h-fit">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-xs uppercase tracking-wider text-slate-500">Location Area</span>
                      <p className="text-sm text-slate-800 mt-1 leading-relaxed">
                        Old Jail Road, near Arts College,<br />
                        Chennai - 600001 (Operating Globally)
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="p-3 bg-[#114c6c]/10 border border-[#114c6c]/15 rounded-xl text-[#114c6c] h-fit">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-xs uppercase tracking-wider text-slate-500">Direct Talk & Text</span>
                      <a href="tel:+919566131283" className="text-sm text-slate-800 font-display font-medium hover:text-[#114c6c] transition-colors mt-1 block">
                        +91 95661 31283
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="p-3 bg-[#114c6c]/10 border border-[#114c6c]/15 rounded-xl text-[#114c6c] h-fit">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-xs uppercase tracking-wider text-slate-500">Direct Planning Email</span>
                      <a href="mailto:info@poletopole.in" className="text-sm text-slate-800 font-display select-all hover:text-[#114c6c] transition-colors mt-1 block">
                        info@poletopole.in
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="p-3 bg-[#114c6c]/10 border border-[#114c6c]/15 rounded-xl text-[#114c6c] h-fit">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-xs uppercase tracking-wider text-slate-500">Active Desk Hours</span>
                      <p className="text-sm text-slate-800 mt-1">
                        Mon - Sat: 9:00 AM - 6:00 PM EST <br />
                        <span className="text-xs text-[#114c6c] font-light italic">Direct Client Line: Call, Text, or WhatsApp</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Instant Callback Box option */}
                <div className="p-8 rounded-2xl border border-[#25d366]/20 bg-[#25d366]/5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 border border-[#25d366]/10 bg-[#25d366]/10 rounded-full text-[#25d366]">
                      <MessageCircle className="w-5 h-5 animate-bounce" />
                    </div>
                    <h4 className="text-md font-serif font-semibold text-slate-900">Instant WhatsApp Callback Desk</h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Prefer direct audio ring or instant voice messages? Bypass standard procedures securely. Click below to begin dialog with our director.
                  </p>
                  <button 
                    onClick={triggerGeneralWA}
                    className="w-full py-3 bg-[#25d366] text-white uppercase tracking-widest text-xs font-bold rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-white" />
                    <span>Instant WhatsApp Voice Desk</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Interactive Luxury Booking Form */}
              <div className="lg:col-span-7">
                <div id="booking-inquiry-box" className="rounded-3xl p-8 sm:p-10 border border-slate-200 bg-white shadow-xl">
                  
                  <div className="mb-8">
                    <span className="text-xs uppercase tracking-[0.25em] text-[#114c6c] block mb-1">Planning Registration</span>
                    <h3 className="text-2xl font-serif text-slate-900">Submit Holiday Directives</h3>
                    <p className="text-xs text-slate-500 mt-1">Provide details of your planned vacation or lineage search.</p>
                  </div>

                  <form onSubmit={handleInquirySubmit} className="space-y-6">
                    {/* Row 1: Name & Destination */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-slate-500 font-display mb-2">Guest Name *</label>
                        <input 
                          type="text"
                          name="name"
                          required
                          value={bookingForm.name}
                          onChange={handleInputChange}
                          placeholder="e.g. Sarah Miller"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm text-slate-900 focus:outline-none focus:border-[#114c6c] focus:bg-white transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-[#114c6c] font-display mb-2">Desired Destination *</label>
                        <input 
                          type="text"
                          name="destination"
                          required
                          value={bookingForm.destination}
                          onChange={handleInputChange}
                          placeholder="e.g. Switzerland, Bali, Kashmir, or any country"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm text-slate-900 focus:outline-none focus:border-[#114c6c] focus:bg-white transition-colors"
                        />
                      </div>
                    </div>

                    {/* Row 2: Budget, Days, Persons */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-slate-500 font-display mb-2">Estimated Budget *</label>
                        <input 
                          type="text"
                          name="budget"
                          required
                          value={bookingForm.budget}
                          onChange={handleInputChange}
                          placeholder="e.g. $1,500 or Rs. 1,00,000"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm text-slate-900 focus:outline-none focus:border-[#114c6c] focus:bg-white transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-slate-500 font-display mb-2">Number of Days *</label>
                        <input 
                          type="text"
                          name="numberOfDays"
                          required
                          value={bookingForm.numberOfDays}
                          onChange={handleInputChange}
                          placeholder="e.g. 7 Days"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm text-slate-900 focus:outline-none focus:border-[#114c6c] focus:bg-white transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-slate-500 font-display mb-2">Number of Persons *</label>
                        <input 
                          type="text"
                          name="numberOfPersons"
                          required
                          value={bookingForm.numberOfPersons}
                          onChange={handleInputChange}
                          placeholder="e.g. 2 Persons"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm text-slate-900 focus:outline-none focus:border-[#114c6c] focus:bg-white transition-colors"
                        />
                      </div>
                    </div>

                    {inquirySuccess && (
                      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm space-y-3 animate-fade-in">
                        <p>{inquirySuccess}</p>
                        {whatsappTemplateUrl && (
                          <a 
                            href={whatsappTemplateUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#25d366] text-white font-semibold text-xs uppercase tracking-widest hover:bg-[#20ba5a] transition-colors"
                          >
                            <MessageCircle className="w-4 h-4 text-white" />
                            <span>Send on WhatsApp Now</span>
                          </a>
                        )}
                      </div>
                    )}

                    <div className="pt-4 flex justify-center sm:justify-start">
                      <button
                        type="submit"
                        disabled={formLoading}
                        className="w-full sm:w-auto px-8 py-4 bg-[#144c6c] text-white uppercase tracking-widest text-xs font-bold rounded-xl hover:bg-[#144c6c]/95 transition-all disabled:opacity-40 cursor-pointer flex items-center justify-center gap-2"
                      >
                        <MessageCircle className="w-4.5 h-4.5 text-white" />
                        <span>{formLoading ? 'Formulating...' : 'Send via WhatsApp'}</span>
                      </button>
                    </div>
                  </form>

                </div>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* Floating WhatsApp Action Button (All pages) */}
      <div 
        id="whatsapp-floating-trigger"
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2.5"
        onMouseEnter={() => setWaHover(true)}
        onMouseLeave={() => setWaHover(false)}
      >
        <button
          onClick={triggerGeneralWA}
          className="p-4 bg-[#25d366] text-black rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.45)] hover:scale-110 active:scale-95 duration-300 transition-all border border-white/20 hover:bg-[#20ba5a] cursor-pointer relative z-45"
          aria-label="Contact Concierge on WhatsApp"
        >
          <MessageCircle className="w-6 h-6 fill-black text-black" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-500 rounded-full animate-ping"></span>
        </button>

        {waHover && (
          <div className="bg-white text-slate-800 border border-slate-200/80 backdrop-blur-md px-3.5 py-2.5 rounded-xl block text-xs font-display pointer-events-none transition-all duration-300 shadow-xl max-w-xs uppercase tracking-wider relative animate-fade-in">
            <p className="text-[10px] text-[#114c6c] font-bold block">Concierge Connected</p>
            <p className="font-light text-slate-500 mt-0.5 whitespace-nowrap">WhatsApp Online Chat desk</p>
          </div>
        )}
        </div>

      {/* Global Footer component */}
      <Footer setCurrentPage={setCurrentPage} />

    </div>
  );
}
