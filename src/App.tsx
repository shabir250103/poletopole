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
  ArrowLeft,
  CheckCircle2,
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
import AdminPanel from './components/AdminPanel';
import { supabase } from './lib/supabase';
import { TravelPackage, Review, InstagramPost, Message, InquiryInput } from './types';
import { INTERNATIONAL_PACKAGES, DOMESTIC_PACKAGES, REVIEWS, INSTAGRAM_FEED, IMAGE_MAP } from './data';
import { formatCurrency, parseMarkdownToHTML } from './utils';

const HERO_VIDEOS = [
  'https://res.cloudinary.com/dnmsztoba/video/upload/q_auto/f_auto/v1779699338/19229823-uhd_3840_2160_30fps_qhzsn1.mp4',
  'https://res.cloudinary.com/dnmsztoba/video/upload/q_auto/f_auto/v1779630484/12978273_3840_2160_30fps_naar12.mp4',
  'https://res.cloudinary.com/dnmsztoba/video/upload/q_auto/f_auto/v1779778887/14920853_3840_2160_24fps_kpyyn3.mp4',
  'https://res.cloudinary.com/dnmsztoba/video/upload/q_auto/f_auto/v1779201365/14852259_3840_2160_30fps_iiim6v.mp4'
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
  const [selectedPackage, setSelectedPackage] = useState<TravelPackage | null>(null);
  const [waHover, setWaHover] = useState(false);
  const [currentVideoIdx, setCurrentVideoIdx] = useState<number>(0);
  const [videoProgress, setVideoProgress] = useState<number>(0);
  const [activeReviewImgListIdx, setActiveReviewImgListIdx] = useState<number>(0);
  const [highlightedPackageId, setHighlightedPackageId] = useState<string | null>(null);

  // Supabase dynamic datastreams
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [dbStatus, setDbStatus] = useState<'testing' | 'loading' | 'connected' | 'offline'>('loading');

  // Load packages and reviews from Supabase
  useEffect(() => {
    // Sync current pathname or hash route for admin view
    const path = window.location.pathname;
    if (path === '/admin' || window.location.hash === '#admin') {
      setCurrentPage('admin');
    }

    async function loadPortfolioData() {
      try {
        setDbStatus('loading');
        // Fetch packages
        const { data: pkgData, error: pkgError } = await supabase
          .from('packages')
          .select('*')
          .order('name', { ascending: true });

        let finalPackages: TravelPackage[] = [];
        if (!pkgError && pkgData && pkgData.length > 0) {
          finalPackages = pkgData.map(p => ({
            id: p.id,
            category: p.category,
            name: p.name,
            duration: p.duration,
            price: p.price,
            rating: p.rating,
            image: p.image,
            highlights: Array.isArray(p.highlights) ? p.highlights : [],
            hotels: p.hotels,
            flightIncluded: p.flight_included ?? true,
            mealsIncluded: p.meals_included ?? true,
            guidesIncluded: p.guides_included ?? true,
            visaAssistance: p.visa_assistance ?? true,
            tags: Array.isArray(p.tags) ? p.tags : []
          }));
          setDbStatus('connected');
        } else {
          // Fallback or empty seed
          finalPackages = [...INTERNATIONAL_PACKAGES, ...DOMESTIC_PACKAGES];
        }
        setPackages(finalPackages);

        // Fetch reviews
        const { data: revData, error: revError } = await supabase
          .from('reviews')
          .select('*')
          .order('date', { ascending: false });

        if (!revError && revData && revData.length > 0) {
          const mappedReviews: Review[] = revData.map(r => ({
            id: r.id,
            name: r.name,
            rating: r.rating,
            avatar: r.avatar,
            text: r.text,
            date: r.date,
            verified: r.verified ?? true
          }));
          setReviews(mappedReviews);
        } else {
          setReviews(REVIEWS);
        }
      } catch (err) {
        console.warn('Supabase offline or fallback active:', err);
        setPackages([...INTERNATIONAL_PACKAGES, ...DOMESTIC_PACKAGES]);
        setReviews(REVIEWS);
        setDbStatus('offline');
      }
    }

    loadPortfolioData();
  }, []);

  // Click handler for package cards (Page 1 -> Page 2)
  const handleSelectPackage = (pkgName: string) => {
    const cleanName = pkgName.replace('Educational: ', '').replace('HEADER:', '');
    
    // Find matching package
    const pkg = packages.find(
      p => p.name.toLowerCase() === cleanName.toLowerCase()
    );

    if (pkg) {
      setSelectedPackage(pkg);
      setBookingForm(prev => ({
        ...prev,
        destination: pkg.name
      }));
    } else {
      // Find package details dynamic mapping
      const isDomestic = cleanName.toLowerCase().includes('kashmir') || 
                         cleanName.toLowerCase().includes('delhi') || 
                         cleanName.toLowerCase().includes('manali') ||
                         cleanName.toLowerCase().includes('agra') ||
                         cleanName.toLowerCase().includes('jaipur') ||
                         cleanName.toLowerCase().includes('kerala') ||
                         cleanName.toLowerCase().includes('goa') ||
                         cleanName.toLowerCase().includes('ooty') ||
                         cleanName.toLowerCase().includes('coorg') ||
                         cleanName.toLowerCase().includes('andaman') ||
                         cleanName.toLowerCase().includes('lakshadweep') ||
                         cleanName.toLowerCase().includes('meghalaya') ||
                         cleanName.toLowerCase().includes('kolkata') ||
                         cleanName.toLowerCase().includes('mysore');

      const mockPkg: TravelPackage = {
        id: cleanName.replace(/\s+/g, '-').toLowerCase(),
        category: isDomestic ? 'domestic' : 'international',
        name: cleanName,
        duration: '5 Nights / 6 Days',
        price: 0,
        rating: 4.9,
        image: IMAGE_MAP[cleanName] || (isDomestic
          ? 'https://images.unsplash.com/photo-1506461883276-594a12b11cc3?auto=format&fit=crop&w=800&q=80'
          : 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80'),
        highlights: ['Customizable Private Route', 'Elite Cozy Stays', 'Perfect Coordinates', '24/7 Concierge Support'],
        hotels: 'Boutique Resorts / Premium Cozy Accommodations',
        flightIncluded: true,
        mealsIncluded: true,
        guidesIncluded: true,
        visaAssistance: true,
        tags: [isDomestic ? 'Domestic' : 'International']
      };
      setSelectedPackage(mockPkg);
      setBookingForm(prev => ({
        ...prev,
        destination: cleanName
      }));
    }
    
    setCurrentPage('package-detail');
    setInquirySuccess(null);
    setWhatsappTemplateUrl('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Click handler for search/megamenu items (Navbar -> Page 2 directly)
  const handleLocatePackage = (pkgName: string) => {
    handleSelectPackage(pkgName);
  };

  // Reset video progress animation state when video index transitions
  useEffect(() => {
    setVideoProgress(0);
  }, [currentVideoIdx]);

  // Safety auto-advance fallback (25 seconds) in case video playback gets stuck or is blocked from triggering onEnded
  useEffect(() => {
    if (currentPage !== 'home') return;
    const timer = setTimeout(() => {
      setCurrentVideoIdx((prev) => (prev + 1) % HERO_VIDEOS.length);
    }, 25000);
    return () => clearTimeout(timer);
  }, [currentVideoIdx, currentPage]);

  // Auto-advance reviews image slideshow every 5 seconds when on reviews tab
  useEffect(() => {
    if (currentPage !== 'reviews') return;
    const interval = setInterval(() => {
      setActiveReviewImgListIdx((prev) => (prev + 1) % REVIEW_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
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

  // Guest Testimonial reviews submission state
  const [reviewForm, setReviewForm] = useState({
    name: '',
    rating: 5,
    text: ''
  });
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSuccessMessage, setReviewSuccessMessage] = useState<string | null>(null);

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
      // Direct insertion to Supabase bookings table
      try {
        const { error: dbErr } = await supabase.from('bookings').insert({
          name: bookingForm.name,
          destination: bookingForm.destination,
          budget: bookingForm.budget,
          number_of_days: bookingForm.numberOfDays,
          number_of_persons: bookingForm.numberOfPersons
        });
        if (dbErr) {
          console.error('Error inserting booking to Supabase:', dbErr);
        }
      } catch (innerErr) {
        console.error('Db connection error on booking submission:', innerErr);
      }

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

  // Submit Guest Review directly to Supabase
  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.name.trim() || !reviewForm.text.trim()) {
      alert('Kindly provide your Name and Review message.');
      return;
    }
    setSubmittingReview(true);
    setReviewSuccessMessage(null);
    try {
      const { error } = await supabase.from('reviews').insert({
        name: reviewForm.name,
        rating: reviewForm.rating,
        text: reviewForm.text,
        verified: true,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(reviewForm.name)}`
      });

      if (error) throw error;

      setReviewSuccessMessage('Thank you! Your verified review has been published.');
      setReviewForm({ name: '', rating: 5, text: '' });
      
      // Refetch reviews to update state instantly
      const { data: revData } = await supabase.from('reviews').select('*').order('date', { ascending: false });
      if (revData && revData.length > 0) {
        const mappedReviews: Review[] = revData.map(r => ({
          id: r.id,
          name: r.name,
          rating: r.rating,
          avatar: r.avatar,
          text: r.text,
          date: r.date,
          verified: r.verified ?? true
        }));
        setReviews(mappedReviews);
      }
    } catch (err) {
      console.error('Error submitting review:', err);
      alert('Error occurred while attempting to send testimonial. Please check your database rules.');
    } finally {
      setSubmittingReview(false);
    }
  };

  // Helper values for standard luxury WhatsApp links
  const triggerGeneralWA = () => {
    const text = "Hello Pole to Pole Tours and Travels! I am interested in planning a custom vacation package. Please contact me.";
    window.open(`https://wa.me/919566131283?text=${encodeURIComponent(text)}`, '_blank');
  };

  const triggerPackageWA = (pkgName: string) => {
    const text = `Hello Pole to Pole Tours and Travels! I am interested in the tour package for *${pkgName}*. Please provide more details, pricing and available itineraries.`;
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
    setActiveReviewIndex(prev => (prev + 1) % (reviews.length || 1));
  };

  const prevReview = () => {
    setActiveReviewIndex(prev => (prev - 1 + (reviews.length || 1)) % (reviews.length || 1));
  };

  // Unified Why Choose Us component values for premium branding (Who We Are + Why Travel With Us)
  const renderWhyChooseUs = () => {
    return null;
  };

  const renderBespokeInquirySection = () => {
    return (
      <section id="inquiry-form-section" className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full animate-fade-in text-left">
        <div 
          id="booking-inquiry-box"
          className="w-full rounded-3xl p-8 sm:p-12 border border-slate-200 bg-white shadow-xl relative"
        >
          <div className="absolute top-0 right-10 -translate-y-1/2 p-3 rounded-full bg-[#144C6C]/10 border border-[#144C6C]/20 text-[#144C6C] backdrop-blur-lg">
            <Compass className="w-6 h-6 animate-spin-slow" />
          </div>

          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-3xl font-serif font-bold text-slate-900 justify-center">
              Travel Enquiry
            </h2>
            <p className="text-xs text-slate-500 mt-2 font-display uppercase tracking-[0.25em] font-semibold">
              Details
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
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm text-slate-900 focus:outline-[#144C6C] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#144C6C] font-display mb-2">Desired Destination *</label>
                <input 
                  type="text"
                  name="destination"
                  required
                  value={bookingForm.destination}
                  onChange={handleInputChange}
                  placeholder="e.g. Switzerland, Bali, Kashmir, or any country"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm text-slate-900 focus:outline-[#144C6C] transition-colors"
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
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm text-slate-900 focus:outline-[#144C6C] transition-colors"
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
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm text-slate-900 focus:outline-[#144C6C] transition-colors"
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
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm text-slate-900 focus:outline-[#144C6C] transition-colors"
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
    const isHighlighted = highlightedPackageId === pkg.id;
    return (
      <div 
        key={pkg.id}
        id={`pkg-card-${pkg.id}`}
        onClick={() => handleSelectPackage(pkg.name)}
        className={`group relative h-96 rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col hover:-translate-y-1 cursor-pointer hover:shadow-xl ${
          isHighlighted 
            ? 'border-[#144C6C] ring-4 ring-[#144C6C]/40 ring-offset-4 scale-[1.03] shadow-[0_20px_50px_rgba(20,76,108,0.3)] z-20' 
            : 'border-slate-200/80 bg-white hover:border-[#144C6C]/40 shadow-sm'
        }`}
      >
        {/* Destination Image Section */}
        <div className="absolute inset-0 z-0 bg-slate-100">
          <img 
            src={pkg.image} 
            alt={pkg.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          {/* Subtle gradient dark overlay inside card */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>
        </div>

        {/* Content Details */}
        <div className="relative z-10 p-6 h-full flex flex-col justify-end">
          {isHighlighted && (
            <div className="absolute top-4 left-4 bg-[#144C6C] text-white font-display uppercase tracking-widest text-[9px] font-black px-3 py-1.5 rounded-full shadow-inner animate-bounce">
              ★ Selected Destination
            </div>
          )}

          <h3 className="text-2xl font-serif font-bold text-white group-hover:text-blue-100 transition-colors duration-200 leading-snug">
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
    <div id="app-root-container" className="min-h-screen bg-[#fafafc] text-slate-800 selection:bg-[#144C6C] selection:text-white flex flex-col justify-between relative">
      
      {/* Glassmorphic Navbar */}
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} onSelectPackage={handleSelectPackage} onLocatePackage={handleLocatePackage} />

      {/* Main Container Views */}
      <main className="flex-1 w-full pt-[121px] sm:pt-[141px] lg:pt-[156px]">

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
                  playsInline 
                  preload="auto"
                  onEnded={() => {
                    setCurrentVideoIdx((prev) => (prev + 1) % HERO_VIDEOS.length);
                  }}
                  onTimeUpdate={(e) => {
                    const video = e.currentTarget;
                    if (video.duration) {
                      setVideoProgress((video.currentTime / video.duration) * 100);
                    }
                  }}
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
                      currentVideoIdx === idx ? 'text-blue-100 font-bold' : 'text-white/60 group-hover:text-white'
                    }`}>
                      0{idx + 1}
                    </span>
                    <div className="w-8 h-1 bg-white/30 rounded-full overflow-hidden relative">
                      <div 
                        className="h-full rounded-full"
                        style={{
                          transition: 'width 200ms linear, background-color 200ms',
                          width: currentVideoIdx === idx ? `${videoProgress}%` : (idx < currentVideoIdx ? '100%' : '0%'),
                          backgroundColor: currentVideoIdx === idx ? '#144C6C' : (idx < currentVideoIdx ? 'rgba(255,255,255,0.7)' : 'transparent')
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
                      const target = document.getElementById('booking-inquiry-box');
                      if (target) {
                        const yOffset = -110; 
                        const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                      }
                    }}
                    className="w-full sm:w-auto px-10 py-5 text-sm font-display uppercase tracking-[0.25em] bg-[#144C6C] text-white font-bold rounded-full hover:bg-[#144C6C]/90 transition-all duration-300 hover:scale-105 shadow-2xl cursor-pointer flex items-center justify-center gap-2 group animate-fade-in"
                  >
                    <span>Book Your Trip</span>
                    <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1.5 transition-transform" />
                  </button>
                  <button
                    onClick={triggerGeneralWA}
                    className="w-full sm:w-auto px-10 py-5 text-sm font-display uppercase tracking-[0.25em] border border-[#144C6C]/30 hover:border-[#144C6C] text-white bg-[#144C6C] hover:bg-[#144C6C]/90 font-bold rounded-full transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 cursor-pointer shadow-2xl animate-fade-in"
                  >
                    <MessageCircle className="w-5 h-5 text-white" />
                    <span>Contact on WhatsApp</span>
                  </button>
                </div>
              </div>
            </section>

            {/* Interactive Luxury Inquiry Form section (structured) */}
            {renderBespokeInquirySection()}
          </div>
        )}

        {/* 2. ABOUT US VIEW */}
        {currentPage === 'about-us' && (
          <div id="view-about-us" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-4xl font-serif font-black text-[#144C6C] mb-8 uppercase tracking-widest text-center">About Us</h1>
            <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-slate-100 space-y-6 text-slate-700 leading-relaxed text-lg">
                <p>Welcome to Pole to Pole Tours and Travels — your trusted travel partner for memorable journeys across the world.</p>
                <p>We specialize in creating hassle-free travel experiences with personalized service, affordable packages and professional support. From family holidays and honeymoon trips to corporate travel and group tours, we ensure every journey is comfortable, enjoyable and well planned.</p>
                <div className="my-8">
                    <h3 className="text-xl font-bold text-[#144C6C] mb-4 uppercase">Our services include:</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-[#fbbf24]" /> International & Domestic Tour Packages</li>
                        <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-[#fbbf24]" /> Flight Ticket Bookings</li>
                        <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-[#fbbf24]" /> Hotel Reservations</li>
                        <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-[#fbbf24]" /> Visa Assistance</li>
                        <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-[#fbbf24]" /> Airport Transfers</li>
                        <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-[#fbbf24]" /> Cruise & Holiday Packages</li>
                        <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-[#fbbf24]" /> Customized Group Tours</li>
                        <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-[#fbbf24]" /> Travel Insurance & More.</li>
                    </ul>
                </div>
                <p>At Pole to Pole Tours and Travels customer satisfaction is our priority. We believe travel is not just about reaching a destination — it’s about creating unforgettable memories. With dedicated support, competitive pricing and attention to detail, we strive to make every trip smooth and stress-free.</p>
                <p>Whether you are planning a relaxing vacation, business trip, spiritual tour or adventure holiday, we are here to guide you every step of the way.</p>
                <p className="font-bold text-[#144C6C] text-center pt-4">Travel with confidence. Travel with us.</p>
            </div>
          </div>
        )}

        {/* 3. DOMESTIC & INTERNATIONAL VIEW */}
        {(currentPage === 'domestic' || currentPage === 'international') && (
          <div id={`view-${currentPage}`} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center max-w-3xl mx-auto mb-12 pt-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-slate-900 tracking-wider uppercase">
                {currentPage === 'domestic' ? 'Domestic Packages' : 'International Packages'}
              </h1>
            </div>

            {/* Catalog search bar and status indicator */}
            <div className="max-w-xl mx-auto mb-12 relative">
              <input
                type="text"
                placeholder="Search destinations, packages or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 bg-white border border-slate-200 focus:outline-none focus:border-[#144C6C]/50 rounded-full font-display text-sm shadow-sm"
              />
              <Search className="w-5 h-5 text-slate-400 absolute right-6 top-1/2 -translate-y-1/2" />
            </div>

            {/* Bounded grid of matching packages */}
            {(() => {
              const currentCategoryVal = currentPage === 'domestic' ? 'domestic' : 'international';
              const filtered = packages.filter(pkg => {
                const matchesCat = pkg.category.toLowerCase() === currentCategoryVal;
                const matchesQuery = pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                     pkg.duration.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                     pkg.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
                return matchesCat && matchesQuery;
              });

              if (filtered.length === 0) {
                return (
                  <div className="text-center py-20 px-4 rounded-3xl border border-dashed border-slate-200">
                    <p className="text-slate-400 text-sm font-display">No packages found matching your query. Try searching for other destinations!</p>
                  </div>
                );
              }

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filtered.map((pkg) => (
                    <div 
                      key={pkg.id} 
                      id={`pkg-card-${pkg.id}`}
                      className="group bg-white rounded-2xl overflow-hidden border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                    >
                      {/* Image Frame */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                        <img 
                          src={pkg.image} 
                          alt={pkg.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Info body */}
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div className="space-y-3">
                          <h3 className="text-xl font-serif font-bold text-slate-900 group-hover:text-[#144C6C] transition-colors font-display text-left">
                            {pkg.name}
                          </h3>
                        </div>

                        {/* Card footer CTA */}
                        <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-end">
                          <button
                            onClick={() => handleSelectPackage(pkg.name)}
                            className="px-4 py-2.5 bg-[#144c6c] text-white text-[10px] font-sans font-black tracking-widest uppercase rounded-lg hover:bg-[#0c3147] transition-all cursor-pointer border border-[#144c6c]"
                          >
                            Explore Trip
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        )}

        {/* PACKAGE DETAILS VIEW */}
        {currentPage === 'package-detail' && selectedPackage && (
          <div id="view-package-detail" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Go Back custom route indicator */}
            <div className="mb-6 animate-fade-in text-left">
              <button 
                onClick={() => {
                  setCurrentPage('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#144C6C] hover:underline transition-colors font-display cursor-pointer bg-transparent border-none outline-none font-bold"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Go Back to Home</span>
              </button>
            </div>

            {/* Immersive Package details featuring JUST the big high quality image, package title, and prominent "Explore" button */}
            <div className="bg-white rounded-3xl border border-slate-200/60 shadow-xl overflow-hidden animate-fade-in">
              {/* Massive, highly engaging image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 border-b border-slate-100">
                <img 
                  src={selectedPackage.image} 
                  alt={selectedPackage.name} 
                  className="w-full h-full object-cover shadow-inner hover:scale-[1.01] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Immersive title overlay info */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex flex-col justify-end p-6 sm:p-10 text-left">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-white leading-tight">
                    {selectedPackage.name}
                  </h1>
                </div>
              </div>

               {/* Action Area: Beautiful clean section with the explore button */}
               <div className="p-8 sm:p-12 text-center space-y-6">
                {/* Highly prominent custom explore CTA button */}
                <button
                  onClick={() => {
                    const target = document.getElementById('booking-inquiry-box');
                    if (target) {
                      const yOffset = -110; 
                      const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                  }}
                  className="inline-flex items-center gap-2.5 px-10 py-5 text-sm sm:text-base font-display uppercase tracking-[0.25em] bg-[#144C6C] text-white font-black rounded-full hover:bg-[#0c3147] transition-all duration-300 hover:scale-105 shadow-xl cursor-pointer border border-[#144C6C]/20"
                >
                  <Compass className="w-5 h-5 animate-spin-slow" />
                  <span>Explore & Customise This Trip</span>
                </button>
              </div>
            </div>

            {/* Elegant Travel Enquiry Form Immediately Below */}
            <div className="mt-16 pt-12 border-t border-slate-200/80">
              {renderBespokeInquirySection()}
            </div>
          </div>
        )}

        {/* 4. REVIEWS VIEW */}
        {currentPage === 'reviews' && (
          <div id="view-reviews" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            
            {/* Minimalist Header */}
            <div className="mb-12 text-center animate-fade-in animate-duration-500">
              <h1 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-wider uppercase">CLIENT REVIEWS</h1>
            </div>

            {/* Premium Interactive Screenshot Carousel Slider */}
            <div className="max-w-6xl mx-auto mb-20 animate-fade-in relative px-10">
              
              {/* Sliding Multi-Card Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                {[0, 1, 2].map((offset) => {
                  const targetIdx = (activeReviewImgListIdx + offset) % REVIEW_IMAGES.length;
                  const isThirdOnTablet = offset === 2;
                  const isSecondOnMobile = offset >= 1;

                  return (
                    <div 
                      key={offset}
                      className={`relative rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xl p-4 flex flex-col items-center justify-center min-h-[385px] md:min-h-[460px] hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${
                        isThirdOnTablet ? 'hidden lg:flex' : ''
                      } ${
                        isSecondOnMobile ? 'hidden md:flex' : 'flex'
                      }`}
                    >
                      <img 
                        src={REVIEW_IMAGES[targetIdx]} 
                        alt={`Customer Verified Review ${targetIdx + 1}`}
                        className="max-h-[340px] md:max-h-[400px] w-auto max-w-full rounded-2xl object-contain shadow-sm select-none transition-all duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  );
                })}
              </div>

              {/* Sleek Manual Left Arrow */}
              <button 
                onClick={() => setActiveReviewImgListIdx((prev) => (prev - 1 + REVIEW_IMAGES.length) % REVIEW_IMAGES.length)}
                className="absolute left-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white hover:bg-slate-50 active:scale-95 text-[#144C6C] shadow-lg border border-slate-200 transition-all cursor-pointer select-none group z-10"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-6 h-6 stroke-[2] group-hover:-translate-x-0.5 transition-transform" />
              </button>

              {/* Sleek Manual Right Arrow */}
              <button 
                onClick={() => setActiveReviewImgListIdx((prev) => (prev + 1) % REVIEW_IMAGES.length)}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white hover:bg-slate-50 active:scale-95 text-[#144C6C] shadow-lg border border-slate-200 transition-all cursor-pointer select-none group z-10"
                aria-label="Next review"
              >
                <ChevronRight className="w-6 h-6 stroke-[2] group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* Dot Indicators */}
              <div className="flex justify-center items-center gap-2 mt-8">
                {REVIEW_IMAGES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveReviewImgListIdx(idx)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                      activeReviewImgListIdx === idx 
                        ? 'bg-[#144c6c] scale-125 shadow-md' 
                        : 'bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

            </div>

            {/* Video Highlights Section */}
            <div className="mt-24 border-t border-slate-100 pt-16">
              <div className="mb-12 text-center animate-fade-in">
                <h2 className="text-3xl font-serif font-black text-slate-900 tracking-wider uppercase">VIDEO HIGHLIGHTS</h2>
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
                            <div className="text-center max-w-2xl mx-auto mb-16 pt-8">
              <span className="text-xs uppercase tracking-[0.3em] text-[#144C6C] font-semibold font-display block mb-3">
                Reach Out
              </span>
              <h1 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 mb-4">Contact Pole to Pole</h1>
              <div className="h-[2px] w-24 bg-[#144C6C]/40 mx-auto rounded mb-4"></div>
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
                    <div className="p-3 bg-[#144C6C]/10 border border-[#144C6C]/15 rounded-xl text-[#144C6C] h-fit">
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
                    <div className="p-3 bg-[#144C6C]/10 border border-[#144C6C]/15 rounded-xl text-[#144C6C] h-fit">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-xs uppercase tracking-wider text-slate-500">Direct Talk & Text</span>
                      <a href="tel:+919566131283" className="text-sm text-slate-800 font-display font-medium hover:text-[#144C6C] transition-colors mt-1 block">
                        +91 9566131283
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="p-3 bg-[#144C6C]/10 border border-[#144C6C]/15 rounded-xl text-[#144C6C] h-fit">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-xs uppercase tracking-wider text-slate-500">Direct Planning Email</span>
                      <a href="mailto:info@poletopole.in" className="text-sm text-slate-800 font-display select-all hover:text-[#144C6C] transition-colors mt-1 block">
                        info@poletopole.in
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="p-3 bg-[#144C6C]/10 border border-[#144C6C]/15 rounded-xl text-[#144C6C] h-fit">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-xs uppercase tracking-wider text-slate-500">Active Desk Hours</span>
                      <p className="text-sm text-slate-800 mt-1">
                        Mon - Sat : 10:00 AM - 7:00 PM IST <br />
                        <span className="text-xs text-[#144C6C] font-light italic">Direct Client Line: Call, Text, or WhatsApp</span>
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
                    <h3 className="text-2xl font-serif text-slate-900 font-bold">Travel Enquiry</h3>
                    <p className="text-xs text-slate-500 font-display uppercase tracking-[0.25em] font-semibold mt-1">Details</p>
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
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm text-slate-900 focus:outline-none focus:border-[#144C6C] focus:bg-white transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-[#144C6C] font-display mb-2">Desired Destination *</label>
                        <input 
                          type="text"
                          name="destination"
                          required
                          value={bookingForm.destination}
                          onChange={handleInputChange}
                          placeholder="e.g. Switzerland, Bali, Kashmir, or any country"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm text-slate-900 focus:outline-none focus:border-[#144C6C] focus:bg-white transition-colors"
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
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm text-slate-900 focus:outline-none focus:border-[#144C6C] focus:bg-white transition-colors"
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
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm text-slate-900 focus:outline-none focus:border-[#144C6C] focus:bg-white transition-colors"
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
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm text-slate-900 focus:outline-none focus:border-[#144C6C] focus:bg-white transition-colors"
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

        {/* 7. ADMIN STAFF PORTAL VIEW */}
        {currentPage === 'admin' && (
          <div id="view-admin" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <AdminPanel 
              onClose={() => {
                setCurrentPage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
              defaultPackages={[...INTERNATIONAL_PACKAGES, ...DOMESTIC_PACKAGES]}
              defaultReviews={REVIEWS} 
            />
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
            <p className="text-[10px] text-[#144C6C] font-bold block">Concierge Connected</p>
            <p className="font-light text-slate-500 mt-0.5 whitespace-nowrap">WhatsApp Online Chat desk</p>
          </div>
        )}
        </div>

      {/* Global Footer component */}
      <Footer setCurrentPage={setCurrentPage} />

    </div>
  );
}
