import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  ChevronDown,
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
  Headphones,
  Briefcase,
  GraduationCap,
  Car,
  Wine,
  Gift,
  Palmtree,
  MountainSnow,
  Diamond,
  Ship
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

  // Carousel ref and auto-scroll logic
  const packagesScrollRef = useRef<HTMLDivElement>(null);
  const reviewsScrollRef = useRef<HTMLDivElement>(null);

  const scrollPackages = (direction: 'left' | 'right') => {
    if (packagesScrollRef.current) {
      const scrollAmount = 344; // card width (320) + gap (24)
      packagesScrollRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (currentPage !== 'home') return;

    const pkgInterval = setInterval(() => {
      if (packagesScrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = packagesScrollRef.current;

        // If we hit the end, bounce back to start smoothly
        if (scrollLeft + clientWidth >= scrollWidth - 20) {
          packagesScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          packagesScrollRef.current.scrollBy({ left: 344, behavior: 'smooth' });
        }
      }
    }, 3500); // Auto-scroll every 3.5s

    const revInterval = setInterval(() => {
      if (reviewsScrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = reviewsScrollRef.current;

        if (scrollLeft + clientWidth >= scrollWidth - 20) {
          reviewsScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          reviewsScrollRef.current.scrollBy({ left: 344, behavior: 'smooth' });
        }
      }
    }, 4500); // Auto-scroll every 4.5s

    return () => {
      clearInterval(pkgInterval);
      clearInterval(revInterval);
    };
  }, [currentPage]);

  // Welcome Modal state
  const [welcomeModalOpen, setWelcomeModalOpen] = useState(false);
  const [welcomeSuccess, setWelcomeSuccess] = useState(false);
  const [offerPoster, setOfferPoster] = useState<string | null>(null);
  const [showOfferContent, setShowOfferContent] = useState(true);
  const [welcomeForm, setWelcomeForm] = useState({
    name: '',
    city: '',
    email: '',
    phone: '',
    whatsapp: '',
    destination: '',
    dateOfTravel: '',
    numberOfPeople: '',
    vacationType: '',
    numberOfDays: ''
  });
  const [captchaParams, setCaptchaParams] = useState({ a: Math.floor(Math.random() * 10) + 1, b: Math.floor(Math.random() * 10) + 1 });
  const [captchaInput, setCaptchaInput] = useState('');

  // Supabase dynamic datastreams
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [carouselImages, setCarouselImages] = useState<any[]>([]);
  const [aboutUs, setAboutUs] = useState<any>(null);
  const [servicesImages, setServicesImages] = useState<any[]>([]);
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});
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

        // Fetch active offer poster
        const { data: offerData } = await supabase.from('offers').select('*').order('created_at', { ascending: false }).limit(1);
        if (offerData && offerData.length > 0 && offerData[0].image_url) {
          setOfferPoster(offerData[0].image_url);
        }

        // Fetch about us data
        const { data: aboutData } = await supabase.from('about_us').select('*').order('created_at', { ascending: false }).limit(1);
        if (aboutData && aboutData.length > 0) {
          setAboutUs(aboutData[0]);
        }

        // Fetch services images from storage bucket instead of table
        const { data: srvFiles } = await supabase.storage.from('poletopole').list('services');
        if (srvFiles && srvFiles.length > 0) {
          // Filter out placeholder or empty folders
          const validFiles = srvFiles.filter(f => f.name && f.name !== '.emptyFolderPlaceholder');

          const storageImages = validFiles.map(file => {
            // Extract the service_id from the filename (e.g. "domestic_1783594226567.jpg" -> "domestic")
            // Handle both underscore separated and direct names
            let serviceId = file.name.split('_')[0];
            if (!file.name.includes('_')) {
              serviceId = file.name.split('.')[0];
            }

            const { data: publicUrlData } = supabase.storage.from('poletopole').getPublicUrl(`services/${file.name}`);
            return {
              service_id: serviceId.toLowerCase(),
              image_url: publicUrlData.publicUrl
            };
          });

          // If there are multiple images for the same category, keep the newest one
          const latestStorageImages = storageImages.reverse();
          setServicesImages(latestStorageImages);
        } else {
          // Fallback to table if RLS blocks listing (returns empty array)
          const { data: srvData } = await supabase.from('services_images').select('*');
          if (srvData) setServicesImages(srvData);
        }

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
            tags: Array.isArray(p.tags) ? p.tags : [],
            itinerary: p.itinerary || []
          }));

          setDbStatus('connected');
        } else {
          // No fallback packages. Only show what is actually in the database.
          if (pkgError) console.warn('Supabase packages error:', pkgError);
        }
        setPackages(finalPackages);

        // Fetch carousel images
        const { data: carouselData, error: carouselError } = await supabase
          .from('carousel_images')
          .select('*')
          .order('created_at', { ascending: false });

        if (!carouselError && carouselData) {
          setCarouselImages(carouselData);
        }

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
          setReviews([]);
        }
      } catch (err) {
        console.warn('Supabase offline or fallback active:', err);
        setPackages([...INTERNATIONAL_PACKAGES, ...DOMESTIC_PACKAGES]);
        setReviews([]);
        setDbStatus('offline');
      }
    }

    loadPortfolioData();
  }, []);

  // Welcome Modal initial load trigger
  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem('hasSeenWelcomeModal');
    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setWelcomeModalOpen(true);
        sessionStorage.setItem('hasSeenWelcomeModal', 'true');
      }, 2500); // 2.5 seconds delay
      return () => clearTimeout(timer);
    }
  }, []);

  const handleWelcomeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(captchaInput) !== (captchaParams.a + captchaParams.b)) {
      alert("Incorrect Captcha! Please try again.");
      setCaptchaParams({ a: Math.floor(Math.random() * 10) + 1, b: Math.floor(Math.random() * 10) + 1 });
      setCaptchaInput('');
      return;
    }

    try {
      const extraDetails = `City: ${welcomeForm.city} | Email: ${welcomeForm.email} | Ph: ${welcomeForm.phone} | WA: ${welcomeForm.whatsapp} | Type: ${welcomeForm.vacationType}`;

      const { error } = await supabase.from('bookings').insert({
        name: welcomeForm.name,
        destination: welcomeForm.destination,
        budget: extraDetails,
        number_of_days: welcomeForm.dateOfTravel,
        number_of_persons: welcomeForm.numberOfPeople
      });

      if (error) {
        console.error('Error saving inquiry:', error);
        alert('There was an issue submitting your inquiry. Please try again.');
        return;
      }

      setWelcomeSuccess(true);

      // Reset form
      setWelcomeForm({
        name: '', city: '', email: '', phone: '', whatsapp: '', destination: '', dateOfTravel: '', numberOfPeople: '', vacationType: ''
      });
      setCaptchaInput('');

      // Auto-close after 4 seconds
      setTimeout(() => {
        setWelcomeModalOpen(false);
        setWelcomeSuccess(false);
      }, 4000);
    } catch (err) {
      console.error('Submission error:', err);
      alert('Network error. Please check your connection.');
    }
  };

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

  // Combine carousel images and fallback videos into a cohesive list (max 10 items)
  const heroItems = useMemo(() => {
    const items: Array<{ type: 'image' | 'video'; data: any }> = carouselImages.map(img => ({ type: 'image', data: img }));
    if (items.length < 4) {
      const videosNeeded = 4 - items.length;
      const videosToAdd = HERO_VIDEOS.slice(0, videosNeeded).map(v => ({ type: 'video' as const, data: v }));
      items.push(...videosToAdd);
    }
    return items.slice(0, 10);
  }, [carouselImages]);

  // Auto-advance fallback (25s for video, 5s for image carousel)
  useEffect(() => {
    if (currentPage !== 'home') return;
    const len = heroItems.length;
    if (len === 0) return;

    const activeItem = heroItems[currentVideoIdx % len];
    const duration = activeItem?.type === 'image' ? 5000 : 25000;

    const timer = setTimeout(() => {
      setCurrentVideoIdx((prev) => (prev + 1) % len);
    }, duration);
    return () => clearTimeout(timer);
  }, [currentVideoIdx, currentPage, heroItems]);

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

  // Animated Search Placeholder State
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const placeholderDestinations = ["Maldives", "Dubai", "Europe", "Kerala", "Bali", "Singapore"];
  const [placeholderText, setPlaceholderText] = useState("");
  const [destIndex, setDestIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    if (currentPage !== 'home') return;
    const currentDest = placeholderDestinations[destIndex];

    const handleTyping = () => {
      setPlaceholderText(current => {
        if (!isDeleting) {
          if (current.length < currentDest.length) {
            setTypingSpeed(150);
            return currentDest.substring(0, current.length + 1);
          } else {
            setIsDeleting(true);
            setTypingSpeed(2000); // Wait before deleting
            return current;
          }
        } else {
          if (current.length > 0) {
            setTypingSpeed(100);
            return currentDest.substring(0, current.length - 1);
          } else {
            setIsDeleting(false);
            setDestIndex((prev) => (prev + 1) % placeholderDestinations.length);
            setTypingSpeed(500); // Wait before typing next
            return "";
          }
        }
      });
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [placeholderText, isDeleting, destIndex, typingSpeed, currentPage]);

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

  const renderOurServices = () => {
    const services = [
      { id: 'domestic', title: 'Domestic Tours', icon: <Map className="w-8 h-8" />, desc: 'Discover the hidden gems, vibrant cultures, and majestic landscapes of India.' },
      { id: 'international', title: 'International Tours', icon: <Globe className="w-8 h-8" />, desc: 'Curated global experiences to exotic destinations with personalized, world-class itineraries.' },
      { id: 'inbound', title: 'Inbound Tours', icon: <MapPin className="w-8 h-8" />, desc: 'Specialized local itineraries showcasing our rich heritage for international travelers.' },
      { id: 'cruises', title: 'Cruises', icon: <Ship className="w-8 h-8" />, desc: 'Luxurious sea voyages offering world-class amenities and breathtaking ocean views.' },
      { id: 'flights', title: 'Flight Tickets', icon: <Plane className="w-8 h-8" />, desc: 'Hassle-free booking with the best global flight rates and schedules.' },
      { id: 'hotels', title: 'Hotel Bookings', icon: <Hotel className="w-8 h-8" />, desc: 'Premium accommodations tailored exactly to your comfort, budget, and lifestyle.' },
      { id: 'transport', title: 'Transport Bookings', icon: <Car className="w-8 h-8" />, desc: 'Seamless, reliable, and comfortable private transfers for a stress-free journey.' },
      { id: 'visa', title: 'Visa', icon: <FileText className="w-8 h-8" />, desc: 'Expert, end-to-end visa processing assistance to ensure smooth international travel.' },
      { id: 'airport', title: 'Airport Assistance', icon: <Headphones className="w-8 h-8" />, desc: 'VIP meet-and-greet services for smooth, expedited airport transits and arrivals.' },
      { id: 'insurance', title: 'Travel Insurance', icon: <Shield className="w-8 h-8" />, desc: 'Comprehensive travel coverage protecting you against unexpected emergencies and delays.' }
    ];

    const enhancedServices = services.map(svc => {
      const dynamicImg = servicesImages.find((img: any) => img.service_id === svc.id);
      return {
        ...svc,
        customImage: dynamicImg?.image_url || null
      };
    });

    return (
      <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-4">
        <div className="text-center mb-10">
          <span className="text-[#144C6C] font-black tracking-[0.2em] text-xs uppercase mb-3 block">Our Expertise</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-wide">Our Services</h2>
          <p className="text-slate-500 max-w-2xl mx-auto mt-4 text-sm font-medium">Comprehensive travel solutions designed to make your journey unforgettable and completely stress-free.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 max-w-[1400px] mx-auto">
          {enhancedServices.map((svc) => (
            <div key={svc.id} className="relative rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:border-[#144C6C]/30 hover:shadow-[0_8px_30px_rgb(20,76,108,0.12)] transition-all duration-300 group hover:-translate-y-1 cursor-default aspect-[4/5] flex flex-col">
              {svc.customImage && !brokenImages[svc.id] ? (
                <>
                  <img
                    src={svc.customImage}
                    alt={svc.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={() => setBrokenImages(prev => ({ ...prev, [svc.id]: true }))}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 flex items-end justify-center h-full pb-6">
                    <h3 className="text-white font-bold text-base sm:text-lg md:text-xl font-serif leading-tight drop-shadow-md text-center">{svc.title}</h3>
                  </div>
                </>
              ) : (
                <div className="w-full h-full p-4 sm:p-6 flex flex-col items-center justify-center bg-slate-50 group-hover:bg-white transition-colors">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white shadow-sm border border-slate-100 text-[#144C6C] rounded-full flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 group-hover:bg-[#144C6C] group-hover:text-white transition-all duration-300">
                    {svc.icon}
                  </div>
                  <h3 className="text-slate-900 font-bold text-base sm:text-lg md:text-xl font-serif leading-tight text-center">{svc.title}</h3>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };

  // Unified Why Choose Us component values for premium branding (Who We Are + Why Travel With Us)
  const renderWhyChooseUs = () => {
    return (
      <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 mb-20 relative mt-16">
        <div className="text-center mb-12">
          <span className="text-[#144C6C] font-black tracking-[0.2em] text-xs uppercase mb-3 block">Why Choose Us</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-wide">The Pole to Pole Promise</h2>
          <p className="text-slate-500 max-w-2xl mx-auto mt-4 text-sm font-medium">We don't just book trips; we craft lifelong memories with unwavering reliability, transparency, and premium support.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">

          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:border-[#144C6C]/20 hover:shadow-[0_8px_30px_rgb(20,76,108,0.08)] transition-all duration-300 group hover:-translate-y-1 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-slate-50 text-[#144C6C] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#144C6C] group-hover:text-white transition-all duration-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-slate-900 font-bold text-lg mb-3 font-serif">Verified Excellence</h3>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">Years of proven expertise in crafting flawless, memorable global journeys.</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:border-[#144C6C]/20 hover:shadow-[0_8px_30px_rgb(20,76,108,0.08)] transition-all duration-300 group hover:-translate-y-1 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-slate-50 text-[#144C6C] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#144C6C] group-hover:text-white transition-all duration-300">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-slate-900 font-bold text-lg mb-3 font-serif">Tailored Experiences</h3>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">Every itinerary is meticulously designed around your unique preferences and style.</p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#144C6C] rounded-2xl p-8 shadow-[0_8px_30px_rgb(20,76,108,0.2)] border border-[#144C6C] hover:shadow-[0_12px_40px_rgb(20,76,108,0.3)] transition-all duration-300 group lg:-translate-y-4 flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-4 -mt-4 opacity-10">
              <Globe className="w-32 h-32 text-white" />
            </div>
            <div className="w-14 h-14 bg-white/10 text-white rounded-full flex items-center justify-center mb-6 backdrop-blur-sm group-hover:scale-110 transition-all duration-300 relative z-10">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-white font-bold text-lg mb-3 font-serif relative z-10">Global Network</h3>
            <p className="text-blue-100 text-xs sm:text-sm leading-relaxed relative z-10">Strong partnerships with premium properties worldwide for exclusive client access.</p>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:border-[#144C6C]/20 hover:shadow-[0_8px_30px_rgb(20,76,108,0.08)] transition-all duration-300 group hover:-translate-y-1 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-slate-50 text-[#144C6C] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#144C6C] group-hover:text-white transition-all duration-300">
              <Handshake className="w-6 h-6" />
            </div>
            <h3 className="text-slate-900 font-bold text-lg mb-3 font-serif">Transparent Pricing</h3>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">No hidden fees or surprises. Honest, upfront value for luxury travel experiences.</p>
          </div>

          {/* Card 5 */}
          <div className="bg-white rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:border-[#144C6C]/20 hover:shadow-[0_8px_30px_rgb(20,76,108,0.08)] transition-all duration-300 group hover:-translate-y-1 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-slate-50 text-[#144C6C] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#144C6C] group-hover:text-white transition-all duration-300">
              <Headphones className="w-6 h-6" />
            </div>
            <h3 className="text-slate-900 font-bold text-lg mb-3 font-serif">24/7 Concierge</h3>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">Round-the-clock dedicated assistance from departure to your safe return home.</p>
          </div>

        </div>
      </section>
    );
  };

  const renderCustomerLove = () => {
    return (
      <section className="w-full bg-[#fffbf8] py-20 mb-16 border-y border-[#fcece4]">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#5a4231] tracking-wide">Why Customers Love Pole to Pole</h2>
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 mb-20 max-w-4xl mx-auto divide-x-0 sm:divide-x divide-[#dcbca5]">
          <div className="flex flex-col items-center px-6">
            <span className="text-4xl font-black text-[#6a4220] mb-1">10+</span>
            <span className="text-sm font-bold text-slate-700">Years of Experience</span>
          </div>
          <div className="flex flex-col items-center px-6">
            <span className="text-4xl font-black text-[#6a4220] mb-1">100+</span>
            <span className="text-sm font-bold text-slate-700">Curated Tours</span>
          </div>
          <div className="flex flex-col items-center px-6">
            <span className="text-4xl font-black text-[#6a4220] mb-1">1000+</span>
            <span className="text-sm font-bold text-slate-700">Happy Clients</span>
          </div>
          <div className="flex flex-col items-center px-6">
            <span className="text-4xl font-black text-[#6a4220] mb-1">4.9/5</span>
            <span className="text-sm font-bold text-slate-700">Google Rating</span>
          </div>
        </div>

        {/* Reviews Carousel */}
        <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={reviewsScrollRef}
            className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-2 pt-2"
          >
            {reviews.map((rev, idx) => (
              <div
                key={rev.id || idx}
                className="min-w-[320px] max-w-[360px] bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex-shrink-0 snap-center flex flex-col items-center hover:border-[#ffdbcc]/80 hover:shadow-[0_20px_40px_rgb(255,219,204,0.4)] hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500 p-5 group cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {rev.avatar && (
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="w-full h-auto max-h-[250px] object-cover rounded-xl transition-transform duration-500 group-hover:scale-[1.03] mb-4 shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                )}
                <div className="flex text-amber-400 mb-2 gap-1">
                  {[...Array(Math.min(rev.rating || 5, 5))].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <h4 className="font-bold text-slate-800 text-lg mb-2 text-center font-serif">{rev.name}</h4>
                <p className="text-slate-600 text-sm text-center italic line-clamp-3">"{rev.text}"</p>
                {rev.verified && (
                  <div className="mt-3 inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified Customer
                  </div>
                )}
              </div>
            ))}

            {/* Google Screenshot Reviews */}
            {REVIEW_IMAGES.map((imgSrc, idx) => (
              <div
                key={`img-${idx}`}
                className="min-w-[320px] max-w-[360px] bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex-shrink-0 snap-center flex flex-col justify-center items-center hover:border-[#ffdbcc]/80 hover:shadow-[0_20px_40px_rgb(255,219,204,0.4)] hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500 p-2 group cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${(reviews.length + idx) * 100}ms` }}
              >
                <img
                  src={imgSrc}
                  alt={`Google Review ${idx + 1}`}
                  className="w-full h-auto max-h-[400px] object-contain rounded-2xl transition-transform duration-500 group-hover:scale-[1.03]"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>

      </section>
    );
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
              Request a Quote Details
            </h2>
            <p className="text-xs text-slate-500 mt-2 font-display uppercase tracking-[0.25em] font-semibold">

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
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm text-slate-900 font-bold uppercase focus:outline-[#144C6C] transition-colors"
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
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm text-slate-900 font-bold uppercase focus:outline-[#144C6C] transition-colors"
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
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm text-slate-900 font-bold uppercase focus:outline-[#144C6C] transition-colors"
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
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm text-slate-900 font-bold uppercase focus:outline-[#144C6C] transition-colors"
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
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm text-slate-900 font-bold uppercase focus:outline-[#144C6C] transition-colors"
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
        className={`group relative h-96 rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col hover:-translate-y-1 cursor-pointer hover:shadow-xl ${isHighlighted
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
            {/* Cinematic Boxed video hero banner */}
            <section id="hero-banner" className="w-full max-w-full mx-auto px-0 mt-0 mb-12">
              <div className="relative h-[80vh] min-h-[500px] max-h-[750px] flex items-end justify-end shadow-2xl bg-black">
                {/* Dynamic Image Carousel or Video Fallback */}
                <div className="absolute inset-0 z-0 overflow-hidden bg-black">
                  {(() => {
                    if (heroItems.length === 0) return null;
                    const safeIdx = currentVideoIdx % heroItems.length;
                    const item = heroItems[safeIdx];

                    if (item.type === 'image') {
                      return (
                        <div className="relative w-full h-full">
                          <img
                            key={`img-${safeIdx}`}
                            src={item.data?.image_url}
                            alt={item.data?.title}
                            className="w-full h-full object-cover saturate-[1.1] animate-fade-in"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent"></div>
                          <div className="absolute bottom-16 sm:bottom-24 left-8 sm:left-12 lg:left-20 max-w-2xl text-left animate-fade-in animate-duration-700 z-10">
                            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black text-white tracking-wide mb-4 drop-shadow-2xl leading-tight">
                              {item.data?.title}
                            </h2>
                            {item.data?.description && (
                              <p className="text-white/90 text-sm sm:text-lg font-medium drop-shadow-md line-clamp-3">
                                {item.data?.description}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <video
                          key={`vid-${safeIdx}`}
                          autoPlay
                          muted
                          playsInline
                          preload="auto"
                          onEnded={() => {
                            setCurrentVideoIdx((prev) => (prev + 1) % heroItems.length);
                          }}
                          onTimeUpdate={(e) => {
                            const video = e.currentTarget;
                            if (video.duration) {
                              setVideoProgress((video.currentTime / video.duration) * 100);
                            }
                          }}
                          style={{ imageRendering: 'auto', transform: 'translate3d(0,0,0)' }}
                          className="w-full h-full object-cover opacity-100 brightness-[1.05] contrast-[1.00] saturate-[1.00] animate-fade-in"
                        >
                          <source src={item.data} type="video/mp4" />
                          <img src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1920&q=80" alt="Breathtaking Luxury Resort" />
                        </video>
                      );
                    }
                  })()}
                </div>

                {/* Sleek Minimalist Side Switchers (Left & Right Screen Chevrons) */}
                <button
                  onClick={() => setCurrentVideoIdx((prev) => (prev - 1 + heroItems.length) % heroItems.length)}
                  className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-35 p-3 bg-transparent hover:bg-white/10 active:scale-95 transition-all cursor-pointer rounded-full text-white/90 hover:text-white group select-none"
                  aria-label="Previous item"
                >
                  <ChevronLeft className="w-12 h-12 stroke-[1.25] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] group-hover:-translate-x-1 duration-200 transition-transform" />
                </button>

                <button
                  onClick={() => setCurrentVideoIdx((prev) => (prev + 1) % heroItems.length)}
                  className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-35 p-3 bg-transparent hover:bg-white/10 active:scale-95 transition-all cursor-pointer rounded-full text-white/90 hover:text-white group select-none"
                  aria-label="Next item"
                >
                  <ChevronRight className="w-12 h-12 stroke-[1.25] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] group-hover:translate-x-1 duration-200 transition-transform" />
                </button>


              </div>
            </section>



            {/* Our Services Section */}
            {renderOurServices()}

          </div>
        )}

        {/* 2. ABOUT US VIEW */}
        {currentPage === 'about-us' && (
          <div id="view-about-us" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
            <h1 className="text-4xl font-serif font-black text-[#144C6C] mb-8 uppercase tracking-widest text-center">About Us</h1>
            <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-slate-100 space-y-6 text-slate-700 leading-relaxed text-lg">

              <p className="font-bold text-2xl text-[#144C6C] mb-8">Welcome to Pole To Pole Tours And Travels</p>

              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-8">
                {aboutUs?.founder_image && (
                  <div className="w-48 h-48 sm:w-56 sm:h-56 shrink-0 rounded-full overflow-hidden shadow-xl border-4 border-white mb-6 md:mb-0">
                    <img src={aboutUs.founder_image} alt="Founder" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="space-y-4">
                  <p>I am A. Nizaruddin, the founder of Pole To Pole Tours And Travels. We believe that every journey should be memorable, comfortable, and hassle-free. Since our establishment in 2019, we have been committed to delivering exceptional travel experiences through reliable, personalized, and affordable travel solutions for individuals, families, corporate clients, and groups.</p>
                  <p>Based in India, Chennai. We specialize in creating unforgettable travel experiences across India and around the world. Whether you're planning a family vacation, honeymoon, pilgrimage, educational tour, corporate trip, or an international holiday, our experienced team is here to take care of every detail, ensuring a smooth and enjoyable journey from start to finish.</p>
                </div>
              </div>

              <div className="my-8">
                <h3 className="text-xl font-bold text-[#144C6C] mb-4 uppercase">Our Services</h3>
                <p className="leading-relaxed font-medium text-slate-800">Domestic Tours | International Tours | Inbound Tours | Cruises | Flight Tickets | Hotel Bookings | Transport Bookings | Visa | Airport Assistance | Travel Insurance | Educational & Industrial Tours | Group Tours | Customized Holiday Packages</p>
              </div>

              <div className="my-8">
                <h3 className="text-xl font-bold text-[#144C6C] mb-4 uppercase">Why Choose Us?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#fbbf24] shrink-0 mt-0.5" /> Personalized travel planning tailored to your needs</li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#fbbf24] shrink-0 mt-0.5" /> Competitive pricing with complete transparency</li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#fbbf24] shrink-0 mt-0.5" /> Experienced and trusted travel professionals</li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#fbbf24] shrink-0 mt-0.5" /> Carefully selected hotels and reliable transportation</li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#fbbf24] shrink-0 mt-0.5" /> End-to-end travel assistance</li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#fbbf24] shrink-0 mt-0.5" /> Dedicated customer support before, during, and after your journey</li>
                </ul>
              </div>

              <div className="my-8">
                <h3 className="text-xl font-bold text-[#144C6C] mb-4 uppercase">Our Mission</h3>
                <p>To make travel easy, affordable, and enjoyable by providing high-quality travel services with honesty, professionalism, and a customer-first approach.</p>
              </div>

              <div className="my-8">
                <h3 className="text-xl font-bold text-[#144C6C] mb-4 uppercase">Our Vision</h3>
                <p>At Pole To Pole Tours And Travels, we don't just book trips—we create unforgettable memories. Whether you're exploring India or discovering destinations across the globe, we're here to make every journey special.</p>
              </div>

              <p className="font-black text-[#144C6C] text-center pt-8 text-xl sm:text-2xl uppercase tracking-widest drop-shadow-sm">Travel Beyond Boundaries with Pole To Pole Tours And Travels.</p>
            </div>
          </div>
        )}

        {/* 3. TOUR PACKAGES VIEW */}
        {(currentPage === 'domestic' || currentPage === 'international' || currentPage === 'inbound') && (
          <div id={`view-${currentPage}`} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center max-w-3xl mx-auto mb-12 pt-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-slate-900 tracking-wider uppercase mb-10">
                Tour Packages
              </h1>

              {/* Trip Category Toggle Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => setCurrentPage('domestic')}
                  className={`px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-300 w-full sm:w-auto shadow-sm border cursor-pointer ${currentPage === 'domestic'
                    ? 'bg-[#144C6C] text-white border-[#144C6C] shadow-md scale-105'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-[#144C6C] hover:text-[#144C6C]'
                    }`}
                >
                  Domestic Trip
                </button>
                <button
                  onClick={() => setCurrentPage('international')}
                  className={`px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-300 w-full sm:w-auto shadow-sm border cursor-pointer ${currentPage === 'international'
                    ? 'bg-[#144C6C] text-white border-[#144C6C] shadow-md scale-105'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-[#144C6C] hover:text-[#144C6C]'
                    }`}
                >
                  International Trip
                </button>
                <button
                  onClick={() => setCurrentPage('inbound')}
                  className={`px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-300 w-full sm:w-auto shadow-sm border cursor-pointer ${currentPage === 'inbound'
                    ? 'bg-[#144C6C] text-white border-[#144C6C] shadow-md scale-105'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-[#144C6C] hover:text-[#144C6C]'
                    }`}
                >
                  Inbound Trip
                </button>
              </div>
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
              const currentCategoryVal = currentPage;
              const filtered = packages
                .filter(pkg => {
                  const matchesCat = pkg.category.toLowerCase() === currentCategoryVal;
                  const matchesQuery = pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    pkg.duration.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    pkg.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
                  return matchesCat && matchesQuery;
                })
                .sort((a, b) => a.price - b.price);

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
                      className="group bg-white rounded-2xl overflow-hidden border border-slate-200/60 shadow-sm transition-all duration-300 flex flex-col justify-between"
                    >
                      {/* Image Frame */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                        <img
                          src={pkg.image}
                          alt={pkg.name}
                          className="w-full h-full object-cover transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                          {pkg.duration}
                        </div>
                      </div>

                      {/* Info body */}
                      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                        <div className="space-y-3">
                          <h3 className="text-xl font-serif font-bold text-slate-900 font-display text-left leading-tight">
                            {pkg.name}
                          </h3>
                        </div>

                        {/* Card footer Price Display */}
                        <div className="mt-5 pt-5 border-t border-slate-100 flex items-center justify-between gap-2">
                          <div className="flex flex-col text-left">
                            <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-0.5">Starts From</span>
                            <div className="flex items-baseline gap-1 flex-wrap">
                              <span className="text-lg sm:text-xl font-bold text-[#144C6C]">{formatCurrency(pkg.price)}</span>
                              <span className="text-[10px] font-bold text-slate-500 whitespace-nowrap">* / per person</span>
                            </div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowOfferContent(false);
                              setWelcomeModalOpen(true);
                            }}
                            className="px-4 py-2 bg-[#144C6C] text-white text-[10px] sm:text-xs font-black tracking-widest uppercase rounded-lg hover:bg-[#0c3147] transition-all border border-[#144C6C] shrink-0"
                          >
                            Enquire
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
          <div id="view-package-detail" className="w-full animate-fade-in pb-16">

            {/* Massive, highly engaging full-width image banner */}
            <div className="relative w-full h-[50vh] min-h-[400px] lg:min-h-[500px] overflow-hidden bg-slate-950">
              <img
                src={selectedPackage.image}
                alt={selectedPackage.name}
                className="w-full h-full object-cover shadow-inner transition-transform duration-700 hover:scale-[1.02]"
                referrerPolicy="no-referrer"
              />

              {/* Immersive title overlay info */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end pb-16 px-4 sm:px-6 lg:px-8 text-left">
                {/* Go Back custom route indicator - Positioned inside the banner */}
                <div className="absolute top-6 left-4 sm:left-6 lg:left-8">
                  <button
                    onClick={() => {
                      setCurrentPage('home');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-white hover:bg-white/20 transition-colors font-display cursor-pointer bg-black/30 backdrop-blur-sm px-4 py-2.5 rounded-full border border-white/20 outline-none font-bold shadow-sm"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Go Back</span>
                  </button>
                </div>

                <div className="max-w-5xl mx-auto w-full">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-black text-white leading-tight mb-3 drop-shadow-md">
                    {selectedPackage.name}
                  </h1>
                  <p className="text-white/90 text-xl sm:text-2xl font-medium tracking-wide drop-shadow">
                    {selectedPackage.duration}
                  </p>
                  {selectedPackage.price > 0 && (
                    <p className="text-emerald-400 font-bold text-2xl sm:text-3xl mt-4 tracking-widest uppercase drop-shadow-lg">
                      Starting From ₹{formatCurrency(selectedPackage.price)}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Content Container (overlaps banner slightly) */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
              <div className="bg-white rounded-3xl border border-slate-200/60 shadow-xl overflow-hidden">

                {/* Itinerary Timeline */}
                {selectedPackage.itinerary && selectedPackage.itinerary.length > 0 && (
                  <div className="p-8 sm:p-12 border-b border-slate-100 bg-slate-50/50">
                    <h2 className="text-2xl font-serif font-bold text-slate-900 mb-8 uppercase tracking-widest text-center">Journey Itinerary</h2>
                    <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent max-w-3xl mx-auto">
                      {selectedPackage.itinerary.map((dayItem: any, index: number) => (
                        <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-[#144C6C] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-white font-bold text-sm">
                            {dayItem.day}
                          </div>
                          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-left hover:shadow-md transition-shadow">
                            <h3 className="font-bold text-lg text-slate-800 mb-2 font-display">{dayItem.title}</h3>
                            <p className="text-slate-600 leading-relaxed text-sm whitespace-pre-wrap">{dayItem.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

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
            </div>

            {/* Similar Packages / You Might Also Like */}
            {packages.filter(p => p.id !== selectedPackage.id && p.category === selectedPackage.category).length > 0 && (
              <div className="mt-16 pt-12 border-t border-slate-200/80 overflow-hidden">
                <h3 className="text-2xl font-serif font-bold text-slate-900 mb-8 uppercase tracking-widest text-center">You Might Also Like</h3>
                <div className="relative w-full">
                  <div className="flex w-max animate-marquee gap-6 px-4">
                    {[
                      ...packages.filter(p => p.id !== selectedPackage.id && p.category === selectedPackage.category).slice(0, 6),
                      ...packages.filter(p => p.id !== selectedPackage.id && p.category === selectedPackage.category).slice(0, 6)
                    ].map((pkg, i) => (
                      <div
                        key={`${pkg.id}-${i}`}
                        onClick={() => handleSelectPackage(pkg)}
                        className="w-[280px] sm:w-[320px] shrink-0 group cursor-pointer rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                      >
                        <div className="aspect-[4/3] overflow-hidden relative">
                          <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                          <div className="absolute bottom-5 left-5 right-5 text-left">
                            <h4 className="text-white font-bold text-xl font-serif mb-1 group-hover:text-[#144C6C] transition-colors line-clamp-1">{pkg.name}</h4>
                            <p className="text-white/90 text-sm font-medium">{pkg.duration}</p>
                            {pkg.price > 0 && (
                              <p className="text-emerald-400 font-bold text-sm mt-1">Starting ₹{formatCurrency(pkg.price)}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Elegant Travel Enquiry Form Immediately Below */}
            <div className="mt-16 pt-12 border-t border-slate-200/80">
              {renderBespokeInquirySection()}
            </div>
          </div>
        )}

        {/* GROUP TOURS VIEW */}
        {currentPage === 'group-tours' && (
          <div id="view-group-tours" className="w-full animate-fade-in">
            {/* Hero Section */}
            <div className="relative w-full h-[60vh] sm:h-[70vh] bg-black">
              <img src="https://images.unsplash.com/photo-1522878129833-838a904a0e9e?q=80&w=2670&auto=format&fit=crop" alt="Group Tours" className="w-full h-full object-cover opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end items-center pb-20 px-4">
                <h1 className="text-5xl sm:text-7xl font-serif font-black text-white text-center mb-6 tracking-wide drop-shadow-lg uppercase">
                  Travel Together
                </h1>
                <p className="text-lg sm:text-2xl text-white/90 text-center max-w-3xl font-medium drop-shadow">
                  Expertly curated group tours for unforgettable shared experiences.
                </p>
                <button
                  onClick={() => { setShowOfferContent(false); setWelcomeModalOpen(true); }}
                  className="mt-10 px-8 py-4 bg-[#144C6C] text-white font-bold uppercase tracking-widest text-sm rounded-lg hover:bg-[#0c3147] transition-all shadow-xl hover:-translate-y-1 cursor-pointer"
                >
                  Build Your Own Group
                </button>
              </div>
            </div>

            {/* Upcoming Departures */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-wider uppercase mb-4">Upcoming Departures</h2>
                <div className="h-1 w-24 bg-[#144C6C] mx-auto rounded"></div>
                <p className="mt-6 text-slate-600 text-lg">Join our pre-planned, fixed-departure group tours. Perfect for solo travelers and couples.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {packages.slice(0, 6).map((tour, idx) => (
                  <div
                    key={tour.id || idx}
                    onClick={() => handleSelectPackage(tour)}
                    className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 group cursor-pointer hover:-translate-y-2 transition-all duration-300"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img src={tour.image} alt={tour.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                      <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg uppercase tracking-wider animate-pulse">
                        Filling Fast
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2 line-clamp-1">{tour.name}</h3>
                      <p className="text-[#144C6C] font-bold mb-4 flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> Duration: {tour.duration}
                      </p>
                      <div className="flex justify-between items-end border-t border-slate-100 pt-6 mt-2">
                        <div>
                          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Starting From</p>
                          <p className="text-2xl font-black text-emerald-500">₹{formatCurrency(tour.price)}</p>
                        </div>
                        <button className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-[#144C6C] group-hover:bg-[#144C6C] group-hover:text-white transition-colors cursor-pointer">
                          <ChevronRight className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Specialized Categories */}
            <div className="bg-slate-50 py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-wider uppercase mb-4">Specialized Group Tours</h2>
                  <div className="h-1 w-24 bg-[#144C6C] mx-auto rounded"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { title: 'Corporate & MICE', icon: <Briefcase className="w-10 h-10 mb-4 text-[#144C6C]" />, desc: 'Offsites, team building, and rewards.' },
                    { title: 'Student Escapes', icon: <GraduationCap className="w-10 h-10 mb-4 text-[#144C6C]" />, desc: 'Budget-friendly, high-energy educational trips.' },
                    { title: 'Women-Only Tours', icon: <ShieldCheck className="w-10 h-10 mb-4 text-[#144C6C]" />, desc: 'Curated, safe, and fun female travel groups.' },
                    { title: 'Senior Citizens', icon: <Heart className="w-10 h-10 mb-4 text-[#144C6C]" />, desc: 'Relaxed pacing, medical assistance, extreme comfort.' }
                  ].map((cat, idx) => (
                    <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow text-center border border-slate-100 group">
                      <div className="flex justify-center transform group-hover:scale-110 transition-transform duration-300">
                        {cat.icon}
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 mb-3">{cat.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{cat.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Custom Group Form */}
            <div id="group-inquiry" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#144C6C]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

                <div className="text-center mb-10 relative z-10">
                  <Users className="w-12 h-12 text-[#144C6C] mx-auto mb-4" />
                  <h2 className="text-3xl font-serif font-black text-slate-900 tracking-wider uppercase mb-2">Build Your Own Group</h2>
                  <p className="text-slate-600">Have a group of 10 or more? We can organize a private, bespoke tour exclusively for you.</p>
                </div>

                {renderBespokeInquirySection()}
              </div>
            </div>
          </div>
        )}

        {/* HONEYMOON VIEW */}
        {currentPage === 'honeymoon' && (
          <div id="view-honeymoon" className="w-full animate-fade-in">
            {/* Romantic Hero Section */}
            <div className="relative w-full h-[70vh] sm:h-[80vh] bg-black">
              <img src="https://images.unsplash.com/photo-1549480397-9e7ecbd1720e?auto=format&fit=crop&w=2000&q=80" alt="Honeymoon Escapes" className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end items-center pb-24 px-4">
                <Heart className="w-12 h-12 text-pink-400 mb-6 animate-pulse" />
                <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif font-black text-white text-center mb-6 tracking-widest drop-shadow-2xl">
                  ROMANCE
                </h1>
                <p className="text-xl sm:text-3xl text-white/90 text-center max-w-2xl font-medium drop-shadow-md font-serif italic">
                  Curated escapes for the beginning of forever.
                </p>
                <button
                  onClick={() => {
                    document.getElementById('honeymoon-inquiry')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="mt-12 px-10 py-5 bg-white/10 backdrop-blur-md border border-white/40 text-white font-bold uppercase tracking-widest text-sm rounded-full hover:bg-white hover:text-black transition-all shadow-xl hover:-translate-y-1 cursor-pointer"
                >
                  Plan Your Dream Honeymoon
                </button>
              </div>
            </div>

            {/* Exclusive VIP Perks */}
            <div className="bg-white py-24 border-b border-slate-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-wider uppercase mb-4">Exclusive Honeymoon Perks</h2>
                  <div className="h-1 w-24 bg-pink-400 mx-auto rounded"></div>
                  <p className="mt-6 text-slate-500 text-lg max-w-2xl mx-auto">When you book your honeymoon with Pole to Pole, expect nothing but VIP treatment.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    { title: 'Candlelight Dinners', icon: <Wine className="w-10 h-10 mb-6 text-pink-500" />, desc: 'Romantic private dining under the stars.' },
                    { title: 'Welcome Champagne', icon: <Gift className="w-10 h-10 mb-6 text-pink-500" />, desc: 'Complimentary champagne and cake on arrival.' },
                    { title: 'Couples Spa', icon: <Heart className="w-10 h-10 mb-6 text-pink-500" />, desc: 'Rejuvenating couples massage sessions.' },
                    { title: 'Room Upgrades', icon: <Diamond className="w-10 h-10 mb-6 text-pink-500" />, desc: 'Complimentary room upgrades (subject to availability).' }
                  ].map((perk, idx) => (
                    <div key={idx} className="flex flex-col items-center text-center p-8 rounded-3xl bg-slate-50 hover:bg-pink-50/50 transition-colors border border-slate-100/50">
                      <div className="p-4 bg-white rounded-full shadow-sm mb-4">
                        {perk.icon}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">{perk.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{perk.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Romantic Moments Gallery */}
            <div className="py-20 bg-white overflow-hidden">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-serif font-black text-slate-900 tracking-wider uppercase mb-4">Moments of Magic</h2>
                <div className="h-1 w-24 bg-pink-400 mx-auto rounded"></div>
              </div>
              <div className="relative w-full">
                <div className="flex w-max animate-marquee gap-6 px-4">
                  {[
                    'https://images.unsplash.com/photo-1516815231560-8f41ec531527?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1515404929826-76fff9fef6fe?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1543731068-7e0f5beff43a?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1516815231560-8f41ec531527?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80'
                  ].map((imgUrl, idx) => (
                    <div key={idx} className="w-[300px] h-[400px] sm:w-[400px] sm:h-[500px] shrink-0 rounded-2xl overflow-hidden shadow-lg">
                      <img src={imgUrl} alt="Honeymoon Moment" className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Filter by Vibe */}
            <div className="bg-slate-50 py-24">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-wider uppercase mb-4">Find Your Vibe</h2>
                  <div className="h-1 w-24 bg-pink-400 mx-auto rounded"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: 'Tropical & Beach', icon: <Palmtree className="w-8 h-8 text-white mb-2" />, img: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=800&q=80' },
                    { title: 'Mountains & Snow', icon: <MountainSnow className="w-8 h-8 text-white mb-2" />, img: 'https://images.unsplash.com/photo-1542361664-9be1dfba720a?auto=format&fit=crop&w=800&q=80' },
                    { title: 'Ultra Luxury', icon: <Diamond className="w-8 h-8 text-white mb-2" />, img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80' }
                  ].map((vibe, idx) => (
                    <div key={idx} onClick={() => { document.getElementById('honeymoon-inquiry')?.scrollIntoView({ behavior: 'smooth' }); }} className="relative h-80 rounded-3xl overflow-hidden group cursor-pointer shadow-lg">
                      <img src={vibe.img} alt={vibe.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                        {vibe.icon}
                        <h3 className="text-3xl font-serif font-bold text-white tracking-wide drop-shadow-md">{vibe.title}</h3>
                        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                          <span className="px-6 py-2 bg-white/20 backdrop-blur-sm border border-white/50 text-white rounded-full text-sm font-bold uppercase tracking-widest">Explore</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Specialized Tailor Made Enquiry Form */}
            <div id="honeymoon-inquiry" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
              <div className="bg-white rounded-3xl p-8 sm:p-14 border border-pink-100 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-pink-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

                <div className="text-center mb-10 relative z-10">
                  <Heart className="w-12 h-12 text-pink-500 mx-auto mb-4" />
                  <h2 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-wider uppercase mb-3">Tailor-Made Romance</h2>
                  <p className="text-slate-500 text-lg">Tell us about your dream honeymoon, and we'll craft an unforgettable itinerary just for you.</p>
                </div>

                {renderBespokeInquirySection()}
              </div>
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
                      className={`relative rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xl p-4 flex flex-col items-center justify-center min-h-[385px] md:min-h-[460px] hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${isThirdOnTablet ? 'hidden lg:flex' : ''
                        } ${isSecondOnMobile ? 'hidden md:flex' : 'flex'
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
                    className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${activeReviewImgListIdx === idx
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
              <h1 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 mb-4">Contact Us</h1>
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
                        9, Old Jail Rd, Bundar Rama Garden, George Town,<br />
                        Chennai, Greater Chennai, Tamil Nadu 600001<br />
                        (Operating Globally)
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
                    <h3 className="text-2xl font-serif text-slate-900 font-bold">Request a Quote Details</h3>
                    <p className="text-xs text-slate-500 font-display uppercase tracking-[0.25em] font-semibold mt-1"></p>
                  </div>

                  <form onSubmit={handleInquirySubmit} className="space-y-6">
                    {/* Row 1: Name & Destination */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-black font-display font-bold mb-2">Name </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={bookingForm.name}
                          onChange={handleInputChange}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm text-slate-900 font-bold uppercase focus:outline-none focus:border-[#144C6C] focus:bg-white transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-black font-display font-bold mb-2">Destination </label>
                        <input
                          type="text"
                          name="destination"
                          required
                          value={bookingForm.destination}
                          onChange={handleInputChange}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm text-slate-900 font-bold uppercase focus:outline-none focus:border-[#144C6C] focus:bg-white transition-colors"
                        />
                      </div>
                    </div>

                    {/* Row 2: Budget, Days, Persons */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-black font-display font-bold mb-2">travel date </label>
                        <input
                          type="date"
                          name="budget"
                          required
                          value={bookingForm.budget}
                          onChange={handleInputChange}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm text-slate-900 font-bold uppercase focus:outline-none focus:border-[#144C6C] focus:bg-white transition-colors"
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-black font-display font-bold mb-2">No of nights </label>
                        <input
                          type="number"
                          name="numberOfDays"
                          required
                          value={bookingForm.numberOfDays}
                          onChange={handleInputChange}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm text-slate-900 font-bold uppercase focus:outline-none focus:border-[#144C6C] focus:bg-white transition-colors"
                          min="1"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-black font-display font-bold mb-2">No of pax </label>
                        <input
                          type="number"
                          name="numberOfPersons"
                          required
                          value={bookingForm.numberOfPersons}
                          onChange={handleInputChange}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm text-slate-900 font-bold uppercase focus:outline-none focus:border-[#144C6C] focus:bg-white transition-colors"
                          min="1"
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

      {/* Floating Action Buttons Container */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-row-reverse items-center gap-4">

        {/* Floating Enquire Now Button */}
        <button
          onClick={() => { setShowOfferContent(false); setWelcomeModalOpen(true); }}
          className="bg-[#144C6C] text-white px-6 py-4 rounded-full font-bold uppercase tracking-widest text-xs shadow-[0_4px_20px_rgba(20,76,108,0.45)] hover:scale-105 active:scale-95 duration-300 transition-transform cursor-pointer border border-white/20 flex items-center gap-2"
          aria-label="Open Enquiry Form"
        >
          <Mail className="w-4 h-4" />
          <span>Enquire Now</span>
        </button>

        {/* Floating WhatsApp Action Button */}
        <div
          id="whatsapp-floating-trigger"
          className="flex flex-row-reverse items-center gap-2.5"
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
      </div>

      {/* Welcome Inquiry Modal (Redesigned to match request) */}
      {welcomeModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 sm:p-6 overflow-y-auto animate-fade-in py-10">
          <div className="bg-white w-full max-w-2xl shadow-2xl relative flex flex-col my-auto border border-slate-200 rounded-2xl overflow-hidden">
            {offerPoster && showOfferContent ? (
              <div className="relative flex flex-col">
                <button
                  onClick={() => setWelcomeModalOpen(false)}
                  className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/80 rounded-full transition-colors cursor-pointer z-10"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-white font-bold stroke-[3]" />
                </button>
                <img src={offerPoster} alt="Special Offer" className="w-full h-auto max-h-[70vh] object-contain bg-black" />
                <div className="p-4 bg-white text-center border-t border-slate-100 flex justify-center">
                  <button
                    onClick={() => setShowOfferContent(false)}
                    className="px-8 py-4 bg-[#144C6C] text-white font-bold uppercase tracking-widest text-sm rounded-lg hover:bg-[#0c3147] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                  >
                    Claim Offer & Enquire Now
                  </button>
                </div>
              </div>
            ) : welcomeSuccess ? (
              <div className="flex flex-col items-center justify-center py-16 px-8 text-center bg-slate-50">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <Check className="w-10 h-10 text-green-600 stroke-[3]" />
                </div>
                <h3 className="text-2xl font-serif font-black text-slate-800 mb-2">Thank You!</h3>
                <p className="text-slate-600 font-medium max-w-sm">
                  Your inquiry has been successfully submitted. Our team will contact you shortly to plan your dream vacation.
                </p>
                <button
                  onClick={() => { setWelcomeModalOpen(false); setWelcomeSuccess(false); }}
                  className="mt-8 px-8 py-3 bg-[#144C6C] text-white font-bold uppercase tracking-widest text-xs rounded-full hover:bg-[#0c3147] transition-all"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="bg-[#144C6C] text-white p-4 sm:p-5 relative flex items-center justify-center">
                  <h3 className="text-[15px] font-bold tracking-[0.2em] uppercase">Enquire Now</h3>
                  <button
                    onClick={() => setWelcomeModalOpen(false)}
                    className="absolute right-4 p-1 hover:bg-white/20 rounded transition-colors cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5 text-white font-bold stroke-[3]" />
                  </button>
                </div>

                <form onSubmit={handleWelcomeSubmit} className="p-6 sm:p-8 space-y-4">
                  <input
                    type="text"
                    required
                    value={welcomeForm.name}
                    onChange={(e) => setWelcomeForm({ ...welcomeForm, name: e.target.value })}
                    className="w-full border border-slate-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-[#144C6C] text-slate-800 placeholder-slate-700 font-medium"
                    placeholder="Name"
                  />


                  <input
                    type="email"
                    required
                    value={welcomeForm.email}
                    onChange={(e) => setWelcomeForm({ ...welcomeForm, email: e.target.value })}
                    className="w-full border border-slate-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-[#144C6C] text-slate-800 placeholder-slate-700 font-medium"
                    placeholder="Email Address"
                  />

                  <input
                    type="tel"
                    required
                    value={welcomeForm.phone}
                    onChange={(e) => setWelcomeForm({ ...welcomeForm, phone: e.target.value })}
                    className="w-full border border-slate-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-[#144C6C] text-slate-800 placeholder-slate-700 font-medium"
                    placeholder="Contact Number"
                  />


                  <input
                    type="text"
                    required
                    value={welcomeForm.destination}
                    onChange={(e) => setWelcomeForm({ ...welcomeForm, destination: e.target.value })}
                    className="w-full border border-slate-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-[#144C6C] text-slate-800 placeholder-slate-700 font-medium bg-white"
                    placeholder="Destination"
                    autoComplete="off"
                  />

                  <input
                    type="text"
                    required
                    value={welcomeForm.dateOfTravel}
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (!e.target.value ? (e.target.type = "text") : null)}
                    onChange={(e) => setWelcomeForm({ ...welcomeForm, dateOfTravel: e.target.value })}
                    className="w-full border border-slate-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-[#144C6C] text-slate-800 placeholder-slate-700 font-medium uppercase"
                    placeholder="Travel date"
                    min={new Date().toISOString().split("T")[0]}
                  />

                  <input
                    type="number"
                    required
                    value={welcomeForm.numberOfDays}
                    onChange={(e) => setWelcomeForm({ ...welcomeForm, numberOfDays: e.target.value })}
                    className="w-full border border-slate-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-[#144C6C] text-slate-800 placeholder-slate-700 font-medium"
                    placeholder="No of Nights"
                    min="1"
                  />

                  <input
                    type="number"
                    required
                    value={welcomeForm.numberOfPeople}
                    onChange={(e) => setWelcomeForm({ ...welcomeForm, numberOfPeople: e.target.value })}
                    className="w-full border border-slate-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-[#144C6C] text-slate-800 placeholder-slate-700 font-medium"
                    placeholder="No of Pax"
                    min="1"
                  />


                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full py-4 bg-[#144C6C] text-white font-bold uppercase tracking-[0.15em] text-sm hover:bg-[#144C6C]/90 hover:shadow-md transition-all cursor-pointer rounded-sm"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Global Footer component */}
      <Footer setCurrentPage={setCurrentPage} />

    </div>
  );
}
