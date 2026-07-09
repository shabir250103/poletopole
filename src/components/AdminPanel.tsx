import React, { useState, useEffect } from 'react';
import { 
  supabase, 
  SupabasePackage, 
  SupabaseBooking, 
  SupabaseReview 
} from '../lib/supabase';
import { 
  LayoutDashboard, 
  Plus, 
  Edit2, 
  Trash2, 
  BookOpen, 
  MessageSquare, 
  Database, 
  LogOut, 
  Lock, 
  Mail, 
  Key, 
  Check, 
  X, 
  Loader2, 
  AlertCircle, 
  Globe, 
  TrendingUp, 
  Inbox, 
  Star,
  Sparkles,
  RefreshCw,
  Copy,
  Image,
  Tag
} from 'lucide-react';

interface AdminPanelProps {
  onClose: () => void;
  defaultPackages: any[];
  defaultReviews: any[];
}

export default function AdminPanel({ onClose, defaultPackages, defaultReviews }: AdminPanelProps) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authEmail, setAuthEmail] = useState<string>('admin@poletopole.com');
  const [authPassword, setAuthPassword] = useState<string>('');
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Tabs & Views State
  const [activeTab, setActiveTab] = useState<'packages' | 'bookings' | 'reviews' | 'carousel' | 'offers' | 'setup'>('packages');
  const [loading, setLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Data States
  const [packages, setPackages] = useState<SupabasePackage[]>([]);
  const [bookings, setBookings] = useState<SupabaseBooking[]>([]);
  const [reviews, setReviews] = useState<SupabaseReview[]>([]);
  const [carouselItems, setCarouselItems] = useState<any[]>([]);
  const [offers, setOffers] = useState<any[]>([]);

  // Package Form Modal State
  const [packageModalOpen, setPackageModalOpen] = useState<boolean>(false);
  const [isEditingPackage, setIsEditingPackage] = useState<boolean>(false);
  const [packageForm, setPackageForm] = useState<Partial<SupabasePackage>>({
    id: '',
    category: 'international',
    name: '',
    duration: '5 Nights / 6 Days',
    price: 0,
    rating: 4.8,
    image: '',
    highlights: ['Tailored daily details', 'Private local coordinates', 'WhatsApp direct travel desk help'],
    hotels: 'Handpicked Cozy Boutique Stays',
    flight_included: true,
    meals_included: true,
    guides_included: true,
    visa_assistance: true,
    tags: []
  });

  // Review Form Modal State
  const [reviewModalOpen, setReviewModalOpen] = useState<boolean>(false);
  const [reviewForm, setReviewForm] = useState<Partial<SupabaseReview>>({
    id: '',
    name: '',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
    text: '',
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
    verified: true
  });

  // Carousel Form Modal State
  const [carouselModalOpen, setCarouselModalOpen] = useState<boolean>(false);
  const [carouselForm, setCarouselForm] = useState<any>({ id: null, title: '', description: '', image_url: '' });

  // Offer Form Modal State
  const [offerModalOpen, setOfferModalOpen] = useState<boolean>(false);
  const [offerForm, setOfferForm] = useState<any>({ id: null, title: '', image_url: '' });

  // Check login status on load
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setIsAuthenticated(true);
      }
    };
    checkSession();
  }, []);

  // Fetch dashboard data
  useEffect(() => {
    if (isAuthenticated) {
      loadPackages();
      loadBookings();
      loadReviews();
      loadCarousel();
      loadOffers();
    }
  }, [isAuthenticated]);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);

    try {
      // 1. Attempt official Supabase auth login
      const { data, error } = await supabase.auth.signInWithPassword({
        email: authEmail,
        password: authPassword
      });

      if (error) {
        throw error;
      } else if (data.session) {
        setIsAuthenticated(true);
        showNotification('Successfully authenticated via Supabase Auths.');
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      setAuthError(err.message || 'Authentication failed. Use admin@poletopole.com with admin123 as fallback.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    showNotification('Logged out successfully.');
  };

  // --- Supabase Storage Helpers ---
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, prefix: string): Promise<string | null> => {
    const file = e.target.files?.[0];
    if (!file) return null;

    setLoading(true);
    try {
      const ext = file.name.split('.').pop();
      const fileName = `${prefix}_${Date.now()}.${ext}`;
      
      const { data, error } = await supabase.storage
        .from('poletopole')
        .upload(fileName, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('poletopole')
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (err: any) {
      console.error('Storage Upload Error Detail:', err);
      let errMsg = err.message || 'Unknown error';
      if (errMsg.includes('row-level security')) {
        errMsg = 'RLS Policy Error: You must run the Storage Security Policies SQL in your Supabase dashboard.';
      }
      showNotification(`Upload failed: ${errMsg}`, 'error');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteFromStorage = async (url: string) => {
    try {
      if (url && url.includes('poletopole/')) {
        const fileName = url.split('poletopole/').pop();
        if (fileName) {
          await supabase.storage.from('poletopole').remove([fileName]);
        }
      }
    } catch (err) {
      console.error('Failed to delete old image from storage', err);
    }
  };

  // --- CRUD Operations ---
  const loadPackages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      setPackages(data || []);
    } catch (err: any) {
      console.error("Failed to load packages from Supabase:", err);
      showNotification("Supabase 'packages' table not queryable or doesn't exist yet. Fallback to offline memory catalogue is active.", 'error');
      // Set default ones
      const mapped = defaultPackages.map((p, i) => ({
        id: p.id || `pkg-${i}`,
        category: p.category,
        name: p.name,
        duration: p.duration || '5 Nights / 6 Days',
        price: p.price || 0,
        rating: p.rating || 4.9,
        image: p.image,
        highlights: p.highlights || [],
        hotels: p.hotels || 'Resorts',
        flight_included: p.flightIncluded ?? true,
        meals_included: p.mealsIncluded ?? true,
        guides_included: p.guidesIncluded ?? true,
        visa_assistance: p.visaAssistance ?? true,
        tags: p.tags || []
      }));
      setPackages(mapped);
    } finally {
      setLoading(false);
    }
  };

  const loadBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (err) {
      console.error("Failed to fetch bookings from Supabase:", err);
    }
  };

  const loadReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (err) {
      console.error("Failed to load reviews:", err);
      // fallback reviews
      const mapped = defaultReviews.map((r, i) => ({
        id: r.id || `rev-${i}`,
        name: r.name,
        rating: r.rating || 5,
        avatar: r.avatar,
        text: r.text,
        date: r.date,
        verified: r.verified ?? true
      }));
      setReviews(mapped);
    }
  };

  const loadCarousel = async () => {
    try {
      const { data, error } = await supabase
        .from('carousel_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCarouselItems(data || []);
    } catch (err) {
      console.error("Failed to fetch carousel items:", err);
    }
  };

  const loadOffers = async () => {
    try {
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOffers(data || []);
    } catch (err) {
      console.error("Failed to fetch offers:", err);
    }
  };

  // Seeding Default Database Data
  const handleSeedDefaults = async () => {
    setLoading(true);
    try {
      // 1. Seed Packages
      showNotification('Seeding default package catalog...');
      const pkgRecords = defaultPackages.map((p) => ({
        id: p.id,
        category: p.category,
        name: p.name,
        duration: p.duration || '5 Nights / 6 Days',
        price: p.price || 0,
        rating: parseFloat((p.rating || 4.8 + Math.random() * 0.2).toFixed(1)),
        image: p.image,
        highlights: p.highlights || ['Premium coordinates', 'Full support desk helping'],
        hotels: p.hotels || 'Handpicked Premium Accommodations',
        flight_included: p.flightIncluded ?? true,
        meals_included: p.mealsIncluded ?? true,
        guides_included: p.guidesIncluded ?? true,
        visa_assistance: p.visaAssistance ?? true,
        tags: p.tags || []
      }));

      const { error: pkgError } = await supabase
        .from('packages')
        .upsert(pkgRecords, { onConflict: 'id' });

      if (pkgError) throw pkgError;

      // 2. Seed Reviews
      const revRecords = defaultReviews.map((r) => ({
        id: r.id,
        name: r.name,
        rating: r.rating,
        avatar: r.avatar,
        text: r.text,
        date: r.date,
        verified: r.verified ?? true
      }));

      const { error: revError } = await supabase
        .from('reviews')
        .upsert(revRecords, { onConflict: 'id' });

      if (revError) throw revError;

      showNotification('Bespoke Travel catalog and client reviews seeded successfully onto Supabase!');
      loadPackages();
      loadReviews();
    } catch (err: any) {
      console.error('Seeding error:', err);
      showNotification(`Seeding failed. Make sure you created the database tables first. Error: ${err.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Travel Package Form save (Add / Edit)
  const handleSavePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!packageForm.name || !packageForm.id) {
      showNotification('Package Name and ID are both required.', 'error');
      return;
    }

    setLoading(true);
    try {
      // Highlights & tags split from strings if formatted as strings
      const payload: SupabasePackage = {
        id: packageForm.id,
        category: packageForm.category as 'international' | 'domestic',
        name: packageForm.name,
        duration: packageForm.duration || '5 Nights / 6 Days',
        price: Number(packageForm.price) || 0,
        rating: Number(packageForm.rating) || 4.9,
        image: packageForm.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828',
        highlights: Array.isArray(packageForm.highlights) 
          ? packageForm.highlights 
          : String(packageForm.highlights).split('\n').filter(Boolean),
        hotels: packageForm.hotels || 'Boutique accommodations',
        flight_included: !!packageForm.flight_included,
        meals_included: !!packageForm.meals_included,
        guides_included: !!packageForm.guides_included,
        visa_assistance: !!packageForm.visa_assistance,
        tags: Array.isArray(packageForm.tags) 
          ? packageForm.tags 
          : String(packageForm.tags).split(',').map(s => s.trim()).filter(Boolean)
      };

      const existingPkg = packages.find(p => p.id === payload.id);

      const { error } = await supabase
        .from('packages')
        .upsert(payload, { onConflict: 'id' });

      if (error) throw error;

      if (existingPkg && existingPkg.image && existingPkg.image !== payload.image) {
        await deleteFromStorage(existingPkg.image);
      }

      showNotification(`Package "${payload.name}" saved successfully!`);
      setPackageModalOpen(false);
      loadPackages();
    } catch (err: any) {
      console.error('Error saving package:', err);
      // Local array addition if Supabase is not connected
      if (isEditingPackage) {
        setPackages(prev => prev.map(p => p.id === packageForm.id ? { ...p, ...packageForm } as SupabasePackage : p));
      } else {
        setPackages(prev => [...prev, { ...packageForm, highlights: Array.isArray(packageForm.highlights) ? packageForm.highlights : [] } as SupabasePackage]);
      }
      showNotification(`Saved package to memory fallback (Database check failed: ${err.message})`, 'success');
      setPackageModalOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePackage = async (id: string) => {
    if (!confirm('Are you absolutely sure you want to delete this travel package? This is permanent.')) return;

    setLoading(true);
    try {
      const existingPkg = packages.find(p => p.id === id);

      const { error } = await supabase
        .from('packages')
        .delete()
        .eq('id', id);

      if (error) throw error;

      if (existingPkg && existingPkg.image) {
        await deleteFromStorage(existingPkg.image);
      }
      showNotification('Package deleted successfully!');
      loadPackages();
    } catch (err: any) {
      console.error('Error deleting package:', err);
      setPackages(prev => prev.filter(p => p.id !== id));
      showNotification('Deleted package from local state fallback.', 'success');
    } finally {
      setLoading(false);
    }
  };

  // Review Form save (Add / Manage)
  const handleSaveReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.name || !reviewForm.text) {
      showNotification('Reviewer Name and Feedback details are required.', 'error');
      return;
    }

    setLoading(true);
    try {
      const id = reviewForm.id || `rev-custom-${Date.now()}`;
      const payload: SupabaseReview = {
        id,
        name: reviewForm.name,
        rating: Number(reviewForm.rating) || 5,
        avatar: reviewForm.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
        text: reviewForm.text,
        date: reviewForm.date || new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
        verified: !!reviewForm.verified
      };

      const existingRev = reviews.find(r => r.id === payload.id);

      const { error } = await supabase
        .from('reviews')
        .upsert(payload, { onConflict: 'id' });

      if (error) throw error;

      if (existingRev && existingRev.avatar && existingRev.avatar !== payload.avatar) {
        await deleteFromStorage(existingRev.avatar);
      }

      showNotification(`Review by "${payload.name}" registered successfully!`);
      setReviewModalOpen(false);
      loadReviews();
    } catch (err: any) {
      console.error('Error saving review:', err);
      // save fallback memory list
      const id = reviewForm.id || `rev-custom-${Date.now()}`;
      setReviews(prev => [...prev, { ...reviewForm, id } as SupabaseReview]);
      showNotification('Created review in temporary fallback storage layout.', 'success');
      setReviewModalOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async (id: string) => {
    if (!confirm('Permanently wipe this review profile record?')) return;
    
    setLoading(true);
    try {
      const existingRev = reviews.find(r => r.id === id);

      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', id);
        
      if (error) throw error;

      if (existingRev && existingRev.avatar && !existingRev.avatar.includes('unsplash')) {
        await deleteFromStorage(existingRev.avatar);
      }
      showNotification('Review deleted.');
      loadReviews();
    } catch (err: any) {
      console.error('Error deleting review:', err);
      setReviews(prev => prev.filter(r => r.id !== id));
      showNotification('Review deleted from temporary fallback layout.', 'success');
    }
  };

  // --- Carousel Handlers ---
  const handleSaveCarousel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!carouselForm.title || !carouselForm.image_url) {
      showNotification('Title and Image are required for Carousel.', 'error');
      return;
    }
    setLoading(true);
    try {
      const existing = carouselItems.find(c => c.id === carouselForm.id);
      
      const payload = {
        title: carouselForm.title,
        description: carouselForm.description,
        image_url: carouselForm.image_url
      };
      
      let error;
      if (carouselForm.id) {
        const res = await supabase.from('carousel_images').update(payload).eq('id', carouselForm.id);
        error = res.error;
      } else {
        const res = await supabase.from('carousel_images').insert(payload);
        error = res.error;
      }
      
      if (error) throw error;
      
      if (existing && existing.image_url && existing.image_url !== payload.image_url) {
        await deleteFromStorage(existing.image_url);
      }
      
      showNotification('Carousel image saved successfully!');
      setCarouselModalOpen(false);
      loadCarousel();
    } catch (err: any) {
      console.error('Error saving carousel:', err);
      showNotification(`Error saving carousel: ${err.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCarousel = async (id: number, imageUrl: string) => {
    if (!confirm('Are you sure you want to delete this carousel image?')) return;
    setLoading(true);
    try {
      if (imageUrl) {
        await deleteFromStorage(imageUrl);
      }
      const { error } = await supabase.from('carousel_images').delete().eq('id', id);
      if (error) throw error;
      showNotification('Carousel image deleted.');
      loadCarousel();
    } catch (err: any) {
      console.error('Error deleting carousel:', err);
      showNotification(`Error deleting carousel: ${err.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  // --- Offer Handlers ---
  const handleSaveOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!offerForm.title || !offerForm.image_url) {
      showNotification('Title and Image are required for the Offer poster.', 'error');
      return;
    }
    setLoading(true);
    try {
      const existing = offers.find(o => o.id === offerForm.id);
      const payload = { title: offerForm.title, image_url: offerForm.image_url };
      
      let error;
      if (offerForm.id) {
        const res = await supabase.from('offers').update(payload).eq('id', offerForm.id);
        error = res.error;
      } else {
        const res = await supabase.from('offers').insert(payload);
        error = res.error;
      }
      
      if (error) throw error;
      
      if (existing && existing.image_url && existing.image_url !== payload.image_url) {
        await deleteFromStorage(existing.image_url);
      }
      
      showNotification('Offer saved successfully!');
      setOfferModalOpen(false);
      loadOffers();
    } catch (err: any) {
      console.error('Error saving offer:', err);
      showNotification(`Error saving offer: ${err.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOffer = async (id: number, imageUrl: string) => {
    if (!confirm('Are you sure you want to delete this offer?')) return;
    setLoading(true);
    try {
      if (imageUrl) {
        await deleteFromStorage(imageUrl);
      }
      const { error } = await supabase.from('offers').delete().eq('id', id);
      if (error) throw error;
      showNotification('Offer deleted.');
      loadOffers();
    } catch (err: any) {
      console.error('Error deleting offer:', err);
      showNotification(`Error deleting offer: ${err.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBooking = async (id: string | undefined) => {
    if (!id) return;
    if (!confirm('Are you sure you want to dismiss / archive this booking inquiry receipt?')) return;

    try {
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', id);

      if (error) throw error;
      showNotification('Booking record archived successfully.');
      loadBookings();
    } catch (err: any) {
      console.error('Archiving failed:', err);
      setBookings(prev => prev.filter(b => b.id !== id));
      showNotification('Archived from memory fallback layout.', 'success');
    }
  };

  // Copy SQL script Helper
  const copySQLCommand = () => {
    const code = `
-- 1. Create packages table
create table if not exists packages (
  id text primary key,
  category text not null,
  name text not null,
  duration text default '5 Nights / 6 Days',
  price numeric default 0,
  rating numeric default 4.8,
  image text,
  highlights text[] default '{}',
  hotels text default 'Handpicked Premium Accommodations',
  flight_included boolean default true,
  meals_included boolean default true,
  guides_included boolean default true,
  visa_assistance boolean default true,
  tags text[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create bookings table (Inquiries)
create table if not exists bookings (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  destination text not null,
  budget text,
  number_of_days text,
  number_of_persons text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Create reviews table
create table if not exists reviews (
  id text primary key,
  name text not null,
  rating integer default 5,
  avatar text default 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
  text text not null,
  date text not null,
  verified boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Create carousel_images table
create table if not exists carousel_images (
  id bigint generated by default as identity primary key,
  title text not null,
  description text,
  image_url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Create offers table
create table if not exists offers (
  id bigint generated by default as identity primary key,
  title text not null,
  image_url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Set RLS Security Policies
alter table packages enable row level security;
alter table bookings enable row level security;
alter table reviews enable row level security;
alter table carousel_images enable row level security;
alter table offers enable row level security;

-- Policies for Packages (Free public reading, Auth write)
drop policy if exists "Allow public select packages" on packages;
create policy "Allow public select packages" on packages for select using (true);
drop policy if exists "Allow write packages for all" on packages;
create policy "Allow write packages for all" on packages for all using (true) with check (true);

-- Policies for Bookings (Public insertion, All for administrator)
drop policy if exists "Allow public insert bookings" on bookings;
create policy "Allow public insert bookings" on bookings for insert with check (true);
drop policy if exists "Allow all bookings admin" on bookings;
create policy "Allow all bookings admin" on bookings for all using (true);

-- Policies for Reviews (Public insert & select, all admin)
drop policy if exists "Allow public select reviews" on reviews;
create policy "Allow public select reviews" on reviews for select using (true);
drop policy if exists "Allow public insert reviews" on reviews;
create policy "Allow public insert reviews" on reviews for insert with check (true);
drop policy if exists "Allow all reviews admin" on reviews;
create policy "Allow all reviews admin" on reviews for all using (true);

-- Policies for Carousel Images (Public select, Auth all)
drop policy if exists "Allow public select carousel" on carousel_images;
create policy "Allow public select carousel" on carousel_images for select using (true);
drop policy if exists "Allow write carousel for all" on carousel_images;
create policy "Allow write carousel for all" on carousel_images for all using (true) with check (true);

-- Policies for Offers (Public select, Auth all)
drop policy if exists "Allow public select offers" on offers;
create policy "Allow public select offers" on offers for select using (true);
drop policy if exists "Allow write offers for all" on offers;
create policy "Allow write offers for all" on offers for all using (true) with check (true);

-- 7. Set up Storage Bucket for Images
insert into storage.buckets (id, name, public) 
values ('poletopole', 'poletopole', true)
on conflict (id) do update set public = true;

-- Storage Policies for 'poletopole' bucket
drop policy if exists "Public Access" on storage.objects;
create policy "Public Access" on storage.objects for select using ( bucket_id = 'poletopole' );

drop policy if exists "Auth Insert" on storage.objects;
create policy "Auth Insert" on storage.objects for insert with check ( bucket_id = 'poletopole' and auth.role() = 'authenticated' );

drop policy if exists "Auth Update" on storage.objects;
create policy "Auth Update" on storage.objects for update using ( bucket_id = 'poletopole' and auth.role() = 'authenticated' );

drop policy if exists "Auth Delete" on storage.objects;
create policy "Auth Delete" on storage.objects for delete using ( bucket_id = 'poletopole' and auth.role() = 'authenticated' );
`;
    navigator.clipboard.writeText(code);
    showNotification('SQL schema script copied to clipboard! Paste it into the SQL Editor in your Supabase Dashboard.');
  };

  // Login Gate View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 absolute inset-0 z-50">
        <div className="max-w-md w-full space-y-8 bg-slate-800 p-8 sm:p-10 rounded-3xl border border-slate-700 shadow-2xl relative text-left">
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-2 rounded-full hover:bg-slate-700 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#144C6C] text-white flex items-center justify-center mx-auto mb-4 border border-blue-500/20">
              <Lock className="w-8 h-8 text-blue-100" />
            </div>
            <h2 className="text-2xl font-serif font-black text-white tracking-tight">
              Pole to Pole Desk Login
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Access the travel bookings control panel & package supervisor.
            </p>
          </div>

          {authError && (
            <div className="rounded-xl bg-red-500/10 border border-red-500/25 p-4 text-xs text-red-400 flex items-start gap-2.5">
              <AlertCircle className="w-4.5 h-4.5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Authentication Alert</p>
                <p className="mt-0.5 opacity-90">{authError}</p>
              </div>
            </div>
          )}

          <form className="mt-6 space-y-5" onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-widest text-slate-400 font-bold block mb-2">
                  Admin Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <input
                    type="email"
                    required
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-700/60 border border-slate-600 rounded-xl text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#144C6C]"
                    placeholder="admin@poletopole.com"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-widest text-slate-400 font-bold block mb-2">
                  Access Key / Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Key className="w-4.5 h-4.5" />
                  </div>
                  <input
                    type="password"
                    required
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-700/60 border border-slate-600 rounded-xl text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#144C6C]"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-4 px-4 bg-[#144C6C] text-white uppercase tracking-widest text-[11px] font-black rounded-xl hover:bg-[#144C6C]/95 transition-all outline-none focus:ring-2 focus:focus:ring-blue-500 flex items-center justify-center gap-2 cursor-pointer border border-[#144C6C]"
            >
              {authLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Connecting Securely...</span>
                </>
              ) : (
                <span>Access Management System</span>
              )}
            </button>

            <div className="pt-2 text-center text-[10px] text-slate-400 leading-relaxed border-t border-slate-700">
              <span className="font-bold text-slate-300 block mb-1">Local Testing Support:</span>
              If your database isn't provisioned yet, use: <br/>  
              <span className="font-mono text-blue-300">admin@poletopole.com</span> with secret key <span className="font-mono text-blue-300">admin123</span>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 absolute inset-0 z-50 overflow-y-auto pb-20 text-left">
      {/* Toast Notification */}
      {notification && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-4 rounded-xl shadow-2xl border flex items-center gap-3 transition-all duration-300 max-w-md ${
          notification.type === 'success' 
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
            : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          {notification.type === 'success' ? (
            <Check className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          )}
          <span className="text-xs font-medium">{notification.message}</span>
        </div>
      )}

      {/* Admin Top Header Dashboard Bar */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 py-4 px-4 sm:px-6 lg:px-8 text-white shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#144C6C] to-cyan-500 text-white flex items-center justify-center font-serif font-black shadow-inner">
              P
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold font-serif leading-none tracking-tight">Pole to Pole Desk</h1>
                <span className="text-[9px] bg-slate-800 border border-slate-700 rounded-full px-2 py-0.5 text-[#144C6C] font-mono font-black uppercase">
                  v1.2 Supabase
                </span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-bold">
                Control panel & reservation manager
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-slate-800 border border-slate-700 rounded-lg hover:text-red-400 transition-colors flex items-center gap-2 cursor-pointer min-h-[38px] leading-tight"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">Logout</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer border border-transparent hover:border-slate-700 shrink-0"
              title="Return to site"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Screen Frame container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Navigation Tab rail */}
        <div className="flex border-b border-slate-200 mb-8 overflow-x-auto select-none gap-2">
          <button
            onClick={() => setActiveTab('packages')}
            className={`py-3 px-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === 'packages' 
                ? 'border-[#144C6C] text-[#144C6C]' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Travel Catalogue ({packages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className={`py-3 px-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === 'bookings' 
                ? 'border-[#144C6C] text-[#144C6C]' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Bookings & Inquiries ({bookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-3 px-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === 'reviews' 
                ? 'border-[#144C6C] text-[#144C6C]' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Guest Reviews ({reviews.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('carousel')}
            className={`py-3 px-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === 'carousel' 
                ? 'border-[#144C6C] text-[#144C6C]' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Image className="w-4 h-4" />
            <span>Carousel ({carouselItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('offers')}
            className={`py-3 px-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === 'offers' 
                ? 'border-[#144C6C] text-[#144C6C]' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Offers ({offers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('setup')}
            className={`py-3 px-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === 'setup' 
                ? 'border-[#144C6C] text-[#144C6C]' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Supabase Setup Helper</span>
          </button>
        </div>

        {/* 1. TRAVEL CATALOGUE TAB */}
        {activeTab === 'packages' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-250 shadow-sm">
              <div>
                <h2 className="text-xl font-serif font-black text-slate-900">Manage Travel Catalogues</h2>
                <p className="text-xs text-slate-500 mt-1 font-sans">
                  Instantly publish, edit or delete travel items. Synchronized automatically with the client-facing menus.
                </p>
              </div>

              <div className="flex gap-2.5">
                <button
                  onClick={() => {
                    setPackages([]);
                    loadPackages();
                  }}
                  className="px-4 py-2 text-xs font-bold border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 rounded-xl cursor-pointer transition-colors flex items-center gap-2 shrink-0"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Sync DB</span>
                </button>
                
                {packages.length === 0 && (
                  <button
                    onClick={handleSeedDefaults}
                    className="px-4 py-2 text-xs font-bold text-slate-800 bg-amber-100 hover:bg-amber-200 border border-amber-200 rounded-xl cursor-pointer transition-colors flex items-center gap-2 shrink-0 animate-pulse"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Seed Default Packages</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    setIsEditingPackage(false);
                    setPackageForm({
                      id: `pkg-${Date.now()}`,
                      category: 'international',
                      name: '',
                      duration: '5 Nights / 6 Days',
                      price: 0,
                      rating: 4.8,
                      image: '',
                      highlights: ['Tailored daily details', 'Private local coordinates', 'WhatsApp direct travel desk help'],
                      hotels: 'Handpicked Cozy Boutique Stays',
                      flight_included: true,
                      meals_included: true,
                      guides_included: true,
                      visa_assistance: true,
                      tags: []
                    });
                    setPackageModalOpen(true);
                  }}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#144C6C] hover:bg-[#144C6C]/95 rounded-xl cursor-pointer shadow-lg hover:shadow-xl transition-all flex items-center gap-2 shrink-0 font-display"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Package</span>
                </button>
              </div>
            </div>

            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center bg-white rounded-3xl border border-slate-200 shadow-sm">
                <Loader2 className="w-10 h-10 animate-spin text-[#144C6C] mb-4" />
                <p className="text-sm text-slate-500">Retrieving travel portfolio...</p>
              </div>
            ) : packages.length === 0 ? (
              <div className="py-20 text-center bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
                <Globe className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600 font-bold text-base">No active travel destinations found</p>
                <p className="text-slate-450 text-xs mt-1.5 max-w-sm mx-auto">
                  Seed the defaults to instantly configure beautiful, high-resolution initial packages into your Supabase database.
                </p>
                <div className="mt-5 flex justify-center gap-3">
                  <button
                    onClick={handleSeedDefaults}
                    className="px-6 py-3 bg-amber-100 border border-amber-200 text-amber-900 font-bold rounded-xl hover:bg-amber-200 transition-colors cursor-pointer text-xs"
                  >
                    Click to Seed Default Catalog
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {packages.map((pkg) => (
                  <div key={pkg.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                    <div>
                      {/* Thumbnail Image */}
                      <div className="h-44 w-full bg-slate-100 relative">
                        <img 
                          src={pkg.image} 
                          alt={pkg.name} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border text-white ${
                          pkg.category === 'international' 
                            ? 'bg-blue-600 border-blue-500' 
                            : 'bg-emerald-600 border-emerald-500'
                        }`}>
                          {pkg.category}
                        </span>
                        
                        <div className="absolute top-3 right-3 flex items-center bg-black/50 text-white font-mono px-2 py-1 rounded text-xs gap-1">
                          <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                          <span>{pkg.rating}</span>
                        </div>
                      </div>

                      {/* Info Panel */}
                      <div className="p-5">
                        <h3 className="text-base font-bold text-slate-900 line-clamp-1">{pkg.name}</h3>
                        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                          <span>{pkg.duration}</span>
                          <span>•</span>
                          <span className="font-semibold text-slate-700">{pkg.hotels}</span>
                        </p>

                        {/* highlights chips */}
                        <div className="mt-3.5 flex flex-wrap gap-1.5">
                          {pkg.highlights.slice(0, 3).map((h, i) => (
                            <span key={i} className="text-[10px] bg-slate-100 text-slate-650 px-2 py-0.5 rounded-full line-clamp-1 max-w-full">
                              ✓ {h}
                            </span>
                          ))}
                        </div>

                        {/* tags */}
                        {pkg.tags && pkg.tags.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                            {pkg.tags.map((tg, i) => (
                              <span key={i} className="text-[9px] bg-blue-50/70 border border-blue-100 font-bold text-[#144C6C] uppercase px-2 py-0.5 rounded">
                                {tg}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Button actions */}
                    <div className="bg-slate-50/80 px-5 py-3.5 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-mono">
                        ID: {pkg.id}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setIsEditingPackage(true);
                            setPackageForm({
                              ...pkg
                            });
                            setPackageModalOpen(true);
                          }}
                          className="p-2 text-slate-600 hover:text-[#144C6C] bg-white border border-slate-200 rounded-lg hover:border-[#144C6C]/30 cursor-pointer"
                          title="Edit Package"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeletePackage(pkg.id)}
                          className="p-2 text-slate-600 hover:text-red-650 bg-white border border-slate-200 rounded-lg hover:border-red-200 cursor-pointer"
                          title="Delete Package"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 2. BOOKINGS AND INQUIRIES TAB */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-serif font-black text-slate-900">Bookings / Custom Trip Inquiries</h2>
                <p className="text-xs text-slate-500 mt-1 font-sans">
                  This panel lists and logs inquiries submitted by tourists using the online forms.
                </p>
              </div>
              <button
                onClick={loadBookings}
                className="px-4 py-2 text-xs font-bold border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 rounded-xl cursor-pointer transition-colors flex items-center gap-2 self-start sm:self-auto shrink-0"
              >
                <RefreshCw className="w-3.5 h-3.5 animate-spin-hover" />
                <span>Refresh Bookings</span>
              </button>
            </div>

            {bookings.length === 0 ? (
              <div className="py-24 text-center bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
                <Inbox className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600 font-bold text-base">Inquiry Inbox is empty</p>
                <p className="text-slate-450 text-xs mt-1.5 max-w-sm mx-auto">
                  When visitors submit custom travel inquiries on the site, they will register here instantly.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-[13px]">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-900 text-slate-400 border-b border-slate-800 uppercase tracking-widest text-[9px] font-black">
                        <th className="py-4.5 px-6">Requester</th>
                        <th className="py-4.5 px-6">Destination Requested</th>
                        <th className="py-4.5 px-6">Days</th>
                        <th className="py-4.5 px-6">Persons</th>
                        <th className="py-4.5 px-6">Budget Index</th>
                        <th className="py-4.5 px-6">Submitted At</th>
                        <th className="py-4.5 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {bookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-4.5 px-6 font-bold text-slate-900">{booking.name}</td>
                          <td className="py-4.5 px-6">
                            <span className="inline-flex items-center gap-1.5 font-medium text-[#144C6C]">
                              <Globe className="w-3.5 h-3.5 text-[#144C6C]/60" />
                              {booking.destination}
                            </span>
                          </td>
                          <td className="py-4.5 px-6 font-mono text-xs">{booking.number_of_days || 'Not set'}</td>
                          <td className="py-4.5 px-6 font-mono text-xs">{booking.number_of_persons || 'Not set'}</td>
                          <td className="py-4.5 px-6 font-mono text-xs text-emerald-600 font-bold">{booking.budget || 'Not set'}</td>
                          <td className="py-4.5 px-6 text-slate-500 font-mono text-xs">
                            {booking.created_at ? new Date(booking.created_at).toLocaleString('en-US') : 'In-memory placeholder'}
                          </td>
                          <td className="py-4.5 px-6 text-right">
                            <button
                              onClick={() => handleDeleteBooking(booking.id)}
                              className="p-2 text-slate-400 hover:text-red-650 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              title="Archive Inquiry"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 3. REVIEWS MANAGEMENT TAB */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-serif font-black text-slate-900">Manage Guest Testaments</h2>
                <p className="text-xs text-slate-500 mt-1 font-sans">
                  Configure text reviews displayed in the Testimonials sections of your pages.
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={loadReviews}
                  className="px-4 py-2 text-xs font-bold border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 rounded-xl cursor-pointer transition-colors flex items-center gap-2 shrink-0"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Sync Reviews</span>
                </button>

                <button
                  onClick={() => {
                    setReviewForm({
                      id: `rev-${Date.now()}`,
                      name: '',
                      rating: 5,
                      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
                      text: '',
                      date: new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
                      verified: true
                    });
                    setReviewModalOpen(true);
                  }}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#144C6C] hover:bg-[#144C6C]/95 rounded-xl cursor-pointer shadow-md transition-all flex items-center gap-1.5 shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Review</span>
                </button>
              </div>
            </div>

            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center bg-white rounded-3xl border border-slate-200 shadow-sm">
                <Loader2 className="w-10 h-10 animate-spin text-[#144C6C] mb-4" />
                <p className="text-sm text-slate-500">Retrieving reviews portfolio...</p>
              </div>
            ) : reviews.length === 0 ? (
              <div className="py-20 text-center bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
                <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600 font-bold text-base">No customized reviews registered</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.map((rev) => (
                  <div key={rev.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <img 
                            src={rev.avatar} 
                            alt={rev.name} 
                            className="w-11 h-11 rounded-full object-cover border border-slate-200"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <h4 className="font-bold text-sm text-slate-900">{rev.name}</h4>
                            <p className="text-[10px] text-slate-400 font-mono mt-0.5">{rev.date}</p>
                          </div>
                        </div>

                        <div className="flex items-center text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded text-xs gap-1">
                          <Star className="w-3 h-3 fill-amber-500" />
                          <span className="font-bold">{rev.rating}</span>
                        </div>
                      </div>

                      <p className="mt-4 text-xs text-slate-600 leading-relaxed italic">
                        "{rev.text}"
                      </p>
                    </div>

                    <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-mono">
                      <span>ID: {rev.id}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setReviewForm({
                              ...rev
                            });
                            setReviewModalOpen(true);
                          }}
                          className="px-2.5 py-1 text-[11px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded transition-colors cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteReview(rev.id)}
                          className="px-2.5 py-1 text-[11px] font-bold text-red-650 bg-red-50 hover:bg-red-100 rounded transition-colors cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CAROUSEL TAB */}
        {activeTab === 'carousel' && (
          <div className="space-y-6">
            <div className="flex justify-between items-end mb-4">
              <div>
                <h2 className="text-2xl font-serif font-black text-slate-900 tracking-wider uppercase mb-1">Carousel Master</h2>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Manage Home Hero Sliders</p>
              </div>
              <button
                onClick={() => {
                  setCarouselForm({ id: null, title: '', description: '', image_url: '' });
                  setCarouselModalOpen(true);
                }}
                className="bg-[#144C6C] hover:bg-[#144C6C]/95 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 cursor-pointer shadow-sm transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>New Slide</span>
              </button>
            </div>
            
            {loading ? (
              <div className="py-20 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-[#144C6C]" /></div>
            ) : carouselItems.length === 0 ? (
              <div className="py-16 text-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50">
                <p className="text-slate-500 font-bold mb-4">No carousel slides uploaded yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {carouselItems.map(c => (
                  <div key={c.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group">
                    <div className="h-48 relative overflow-hidden bg-slate-100">
                      <img src={c.image_url} alt={c.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-bold text-slate-800 line-clamp-1">{c.title}</h3>
                      {c.description && <p className="text-xs text-slate-500 mt-1 line-clamp-2">{c.description}</p>}
                      <div className="mt-auto pt-4 flex gap-2">
                         <button
                           onClick={() => {
                             setCarouselForm(c);
                             setCarouselModalOpen(true);
                           }}
                           className="flex-1 px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-center cursor-pointer"
                         >
                           Edit
                         </button>
                         <button
                           onClick={() => handleDeleteCarousel(c.id, c.image_url)}
                           className="px-3 py-1.5 text-xs font-bold text-red-650 bg-red-50 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
                         >
                           Delete
                         </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* OFFERS TAB */}
        {activeTab === 'offers' && (
          <div className="space-y-6">
            <div className="flex justify-between items-end mb-4">
              <div>
                <h2 className="text-2xl font-serif font-black text-slate-900 tracking-wider uppercase mb-1">Promotional Offers</h2>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Manage Home Page Posters</p>
              </div>
              <button
                onClick={() => {
                  setOfferForm({ id: null, title: '', image_url: '' });
                  setOfferModalOpen(true);
                }}
                className="bg-[#144C6C] hover:bg-[#144C6C]/95 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 cursor-pointer shadow-sm transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>New Offer</span>
              </button>
            </div>
            
            {loading ? (
              <div className="py-20 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-[#144C6C]" /></div>
            ) : offers.length === 0 ? (
              <div className="py-16 text-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50">
                <p className="text-slate-500 font-bold mb-4">No offers created yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {offers.map(o => (
                  <div key={o.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group">
                    <div className="h-48 relative overflow-hidden bg-slate-100">
                      <img src={o.image_url} alt={o.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-bold text-slate-800 line-clamp-1">{o.title}</h3>
                      <div className="mt-auto pt-4 flex gap-2">
                         <button
                           onClick={() => {
                             setOfferForm(o);
                             setOfferModalOpen(true);
                           }}
                           className="flex-1 px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-center cursor-pointer"
                         >
                           Edit
                         </button>
                         <button
                           onClick={() => handleDeleteOffer(o.id, o.image_url)}
                           className="px-3 py-1.5 text-xs font-bold text-red-650 bg-red-50 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
                         >
                           Delete
                         </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 4. SETUP TAB */}
        {activeTab === 'setup' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-serif font-black text-slate-900 flex items-center gap-2">
                <Database className="w-6 h-6 text-[#144C6C]" />
                <span>Configure Supabase SQL Tables</span>
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                To connect the React front-end seamlessly with your own database workspace, please execute the SQL queries below within your Supabase SQL Editor.
              </p>

              <div className="rounded-xl bg-slate-900 text-slate-300 text-xs p-5 font-mono overflow-x-auto relative max-h-[420px] shadow-inner border border-slate-850">
                <button
                  onClick={copySQLCommand}
                  className="absolute top-3 right-3 px-3 py-1.5 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer font-sans text-[10px] font-bold uppercase tracking-wider uppercase border border-slate-700"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy SQL Script</span>
                </button>
                <pre className="text-left mt-6 h-full overflow-y-auto">
{`-- Create 'packages' table
create table if not exists packages (
  id text primary key,
  category text not null,
  name text not null,
  duration text default '5 Nights / 6 Days',
  price numeric default 0,
  rating numeric default 4.8,
  image text,
  highlights text[] default '{}',
  hotels text default 'Handpicked Premium Accommodations',
  flight_included boolean default true,
  meals_included boolean default true,
  guides_included boolean default true,
  visa_assistance boolean default true,
  tags text[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create 'bookings' table
create table if not exists bookings (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  destination text not null,
  budget text,
  number_of_days text,
  number_of_persons text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create 'reviews' table
create table if not exists reviews (
  id text primary key,
  name text not null,
  rating integer default 5,
  avatar text default 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
  text text not null,
  date text not null,
  verified boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on Row Level Security (RLS)
alter table packages enable row level security;
alter table bookings enable row level security;
alter table reviews enable row level security;

-- Setup secure readable/writable rules
create policy "Allow public reading on packages" on packages for select using (true);
create policy "Allow all actions on packages" on packages for all using (true) with check (true);

create policy "Allow public inserting bookings" on bookings for insert with check (true);
create policy "Allow all actions on bookings" on bookings for all using (true);

create policy "Allow public reading on reviews" on reviews for select using (true);
create policy "Allow public inserting reviews" on reviews for insert with check (true);
create policy "Allow all actions on reviews" on reviews for all using (true);
`}
                </pre>
              </div>

              <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4.5 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-xs text-blue-800 leading-relaxed">
                  <p className="font-bold">Next Steps inside Supabase Admin portal:</p>
                  <ol className="list-decimal list-inside space-y-1.5 mt-2">
                    <li>Go to your <strong className="font-semibold text-blue-900">Supabase Dashboard</strong>.</li>
                    <li>Click on the <strong className="font-semibold text-blue-900">SQL Editor</strong> icon in the left side rail.</li>
                    <li>Choose <strong className="font-semibold text-blue-900">New Query</strong>.</li>
                    <li>Paste the copied script and click the gold/green <strong className="font-semibold text-blue-900">Run</strong> button.</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* TRAVEL PACKAGE ADD/EDIT MODAL FORM */}
      {packageModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in text-left">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
              <h3 className="text-lg font-serif font-black text-slate-900">
                {isEditingPackage ? 'Edit Existing Package' : 'Publish New Tour Package'}
              </h3>
              <button
                onClick={() => setPackageModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePackage} className="space-y-6 text-xs text-slate-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="uppercase tracking-widest text-slate-500 font-bold block mb-1.5">
                    Package Permanent ID (no spaces)
                  </label>
                  <input
                    type="text"
                    required
                    disabled={isEditingPackage}
                    value={packageForm.id}
                    onChange={(e) => setPackageForm(prev => ({ ...prev, id: e.target.value.toLowerCase().replace(/\s+/g, '-') }))}
                    placeholder="e.g. maldives-luxury-getaway"
                    className="w-full px-4 py-2.5 border border-slate-250 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#144C6C] bg-white text-slate-800"
                  />
                </div>

                <div>
                  <label className="uppercase tracking-widest text-slate-500 font-bold block mb-1.5">
                    Branch Category
                  </label>
                  <div className="flex gap-2 p-1 bg-slate-100 rounded-xl">
                    {(['domestic', 'international', 'inbound'] as const).map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setPackageForm(prev => ({ ...prev, category: cat }))}
                        className={`flex-1 px-2 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                          packageForm.category === cat 
                            ? 'bg-white text-[#144C6C] shadow-sm ring-1 ring-slate-200' 
                            : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="uppercase tracking-widest text-slate-500 font-bold block mb-1.5">
                    Destination Title
                  </label>
                  <input
                    type="text"
                    required
                    value={packageForm.name}
                    onChange={(e) => setPackageForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. Kashmir Autumn Splendor"
                    className="w-full px-4 py-2.5 border border-slate-250 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#144C6C] bg-white text-slate-800"
                  />
                </div>

                <div>
                  <label className="uppercase tracking-widest text-slate-500 font-bold block mb-1.5">
                    Duration Span
                  </label>
                  <input
                    type="text"
                    required
                    value={packageForm.duration}
                    onChange={(e) => setPackageForm(prev => ({ ...prev, duration: e.target.value }))}
                    placeholder="e.g. 5 Nights / 6 Days"
                    className="w-full px-4 py-2.5 border border-slate-250 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#144C6C] bg-white text-slate-800"
                  />
                </div>

                <div>
                  <label className="uppercase tracking-widest text-slate-500 font-bold block mb-1.5">
                    Starting Rating
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    required
                    value={packageForm.rating}
                    onChange={(e) => setPackageForm(prev => ({ ...prev, rating: parseFloat(e.target.value) }))}
                    className="w-full px-4 py-2.5 border border-slate-250 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#144C6C] bg-white text-slate-800"
                  />
                </div>

                <div>
                  <label className="uppercase tracking-widest text-slate-500 font-bold block mb-1.5">
                    Starting Price (INR or USD)
                  </label>
                  <input
                    type="number"
                    required
                    value={packageForm.price}
                    onChange={(e) => setPackageForm(prev => ({ ...prev, price: parseInt(e.target.value) }))}
                    className="w-full px-4 py-2.5 border border-slate-250 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#144C6C] bg-white text-slate-800"
                  />
                </div>

                <div>
                  <label className="uppercase tracking-widest text-slate-500 font-bold block mb-1.5">
                    Premium Hotel Description
                  </label>
                  <input
                    type="text"
                    value={packageForm.hotels}
                    onChange={(e) => setPackageForm(prev => ({ ...prev, hotels: e.target.value }))}
                    placeholder="e.g. Handpicked Boutique Home Stays"
                    className="w-full px-4 py-2.5 border border-slate-250 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#144C6C] bg-white text-slate-800"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="uppercase tracking-widest text-slate-500 font-bold block mb-1.5">
                    Exquisite Cover Image (URL or Upload)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={packageForm.image}
                      onChange={(e) => setPackageForm(prev => ({ ...prev, image: e.target.value }))}
                      placeholder="https://images.unsplash.com/..."
                      className="flex-1 px-4 py-2.5 border border-slate-250 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#144C6C] bg-white text-slate-800"
                    />
                    <label className="flex-shrink-0 cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl border border-slate-250 flex items-center justify-center font-bold text-xs transition-colors">
                      Upload File
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={async (e) => {
                          const url = await handleFileUpload(e, 'package');
                          if (url) {
                            setPackageForm(prev => ({ ...prev, image: url }));
                          }
                        }}
                      />
                    </label>
                  </div>
                  {packageForm.image && packageForm.image.startsWith('data:image') && (
                    <p className="text-[10px] text-green-600 mt-1">Image file loaded successfully.</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="uppercase tracking-widest text-slate-500 font-bold block mb-1.5">
                    Highlights Portfolio (1 item per line)
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={Array.isArray(packageForm.highlights) ? packageForm.highlights.join('\n') : packageForm.highlights}
                    onChange={(e) => setPackageForm(prev => ({ ...prev, highlights: e.target.value.split('\n') }))}
                    placeholder="Private local coordinators&#10;Handpicked meals included&#10;Sandalwood forest visit"
                    className="w-full px-4 py-2.5 border border-slate-250 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#144C6C] bg-white text-slate-800 font-mono"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="uppercase tracking-widest text-slate-500 font-bold block mb-1.5">
                    Search Tags (separated by commas)
                  </label>
                  <input
                    type="text"
                    value={Array.isArray(packageForm.tags) ? packageForm.tags.join(', ') : packageForm.tags}
                    onChange={(e) => setPackageForm(prev => ({ ...prev, tags: e.target.value.split(',').map(s => s.trim()) }))}
                    placeholder="Kashmir, HoneyMoon, Scenic Views"
                    className="w-full px-4 py-2.5 border border-slate-250 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#144C6C] bg-white text-slate-800"
                  />
                </div>
              </div>

              {/* Inclusions switches */}
              <div className="border-t border-slate-100 pt-4">
                <label className="uppercase tracking-widest text-slate-500 font-bold block mb-3">
                  Service Inclusions
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <label className="flex items-center gap-2 hover:bg-slate-50 p-2 rounded-lg cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={packageForm.flight_included}
                      onChange={(e) => setPackageForm(prev => ({ ...prev, flight_included: e.target.checked }))}
                      className="rounded text-[#144C6C] focus:ring-[#144C6C]"
                    />
                    <span>Flight Booked</span>
                  </label>

                  <label className="flex items-center gap-2 hover:bg-slate-50 p-2 rounded-lg cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={packageForm.meals_included}
                      onChange={(e) => setPackageForm(prev => ({ ...prev, meals_included: e.target.checked }))}
                      className="rounded text-[#144C6C] focus:ring-[#144C6C]"
                    />
                    <span>Meals catered</span>
                  </label>

                  <label className="flex items-center gap-2 hover:bg-slate-50 p-2 rounded-lg cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={packageForm.guides_included}
                      onChange={(e) => setPackageForm(prev => ({ ...prev, guides_included: e.target.checked }))}
                      className="rounded text-[#144C6C] focus:ring-[#144C6C]"
                    />
                    <span>Local Guides</span>
                  </label>

                  <label className="flex items-center gap-2 hover:bg-slate-50 p-2 rounded-lg cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={packageForm.visa_assistance}
                      onChange={(e) => setPackageForm(prev => ({ ...prev, visa_assistance: e.target.checked }))}
                      className="rounded text-[#144C6C] focus:ring-[#144C6C]"
                    />
                    <span>Visa Assistance</span>
                  </label>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-5 flex justify-end gap-3.5">
                <button
                  type="button"
                  onClick={() => setPackageModalOpen(false)}
                  className="px-5 py-2.5 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-55 transition-colors cursor-pointer"
                >
                  Discard Changes
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 text-white bg-[#144C6C] hover:bg-[#144C6C]/95 font-bold rounded-xl border border-[#144C6C] cursor-pointer shadow-md flex items-center gap-2"
                >
                  {loading && <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />}
                  <span>Save and Publish</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CAROUSEL ADD/EDIT MODAL */}
      {carouselModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 w-full max-w-md shadow-2xl animate-fade-in text-left">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
              <h3 className="text-lg font-serif font-black text-slate-900">
                {carouselForm.id ? 'Edit Slide' : 'New Slide'}
              </h3>
              <button onClick={() => setCarouselModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSaveCarousel} className="space-y-4">
              <div>
                <label className="uppercase tracking-widest text-slate-500 font-bold block mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={carouselForm.title}
                  onChange={e => setCarouselForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl bg-white text-slate-800"
                />
              </div>
              <div>
                <label className="uppercase tracking-widest text-slate-500 font-bold block mb-1">Description (Optional)</label>
                <input
                  type="text"
                  value={carouselForm.description}
                  onChange={e => setCarouselForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl bg-white text-slate-800"
                />
              </div>
              <div>
                <label className="uppercase tracking-widest text-slate-500 font-bold block mb-1">Image</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={carouselForm.image_url}
                    onChange={e => setCarouselForm(prev => ({ ...prev, image_url: e.target.value }))}
                    className="flex-1 px-4 py-2 border border-slate-200 rounded-xl bg-white text-slate-800"
                  />
                  <label className="flex-shrink-0 cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-xl border border-slate-200 flex items-center justify-center font-bold text-xs transition-colors">
                    Upload
                    <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                      const url = await handleFileUpload(e, 'carousel');
                      if (url) setCarouselForm((prev: any) => ({ ...prev, image_url: url }));
                    }} />
                  </label>
                </div>
              </div>
              <div className="border-t border-slate-100 pt-5 flex justify-end gap-3.5">
                <button type="submit" disabled={loading} className="px-5 py-2.5 text-white bg-[#144C6C] hover:bg-[#144C6C]/95 font-bold rounded-xl shadow-md flex items-center gap-2">
                  {loading && <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />}
                  <span>Save Slide</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* OFFERS ADD/EDIT MODAL */}
      {offerModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 w-full max-w-md shadow-2xl animate-fade-in text-left">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
              <h3 className="text-lg font-serif font-black text-slate-900">
                {offerForm.id ? 'Edit Offer' : 'New Offer'}
              </h3>
              <button onClick={() => setOfferModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSaveOffer} className="space-y-4">
              <div>
                <label className="uppercase tracking-widest text-slate-500 font-bold block mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={offerForm.title}
                  onChange={e => setOfferForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl bg-white text-slate-800"
                />
              </div>
              <div>
                <label className="uppercase tracking-widest text-slate-500 font-bold block mb-1">Image</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={offerForm.image_url}
                    onChange={e => setOfferForm(prev => ({ ...prev, image_url: e.target.value }))}
                    className="flex-1 px-4 py-2 border border-slate-200 rounded-xl bg-white text-slate-800"
                  />
                  <label className="flex-shrink-0 cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-xl border border-slate-200 flex items-center justify-center font-bold text-xs transition-colors">
                    Upload
                    <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                      const url = await handleFileUpload(e, 'offer');
                      if (url) setOfferForm((prev: any) => ({ ...prev, image_url: url }));
                    }} />
                  </label>
                </div>
              </div>
              <div className="border-t border-slate-100 pt-5 flex justify-end gap-3.5">
                <button type="submit" disabled={loading} className="px-5 py-2.5 text-white bg-[#144C6C] hover:bg-[#144C6C]/95 font-bold rounded-xl shadow-md flex items-center gap-2">
                  {loading && <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />}
                  <span>Save Offer</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* REVIEW ADD/EDIT MODAL FORM */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 w-full max-w-md shadow-2xl animate-fade-in text-left">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
              <h3 className="text-lg font-serif font-black text-slate-900">
                Register Review Feedback
              </h3>
              <button
                onClick={() => setReviewModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-650 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveReview} className="space-y-4 text-xs text-slate-700">
              <div>
                <label className="uppercase tracking-widest text-slate-500 font-bold block mb-1">
                  Reviewer / Family Name
                </label>
                <input
                  type="text"
                  required
                  value={reviewForm.name}
                  onChange={(e) => setReviewForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Miller Family"
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl bg-white text-slate-800"
                />
              </div>

              <div>
                <label className="uppercase tracking-widest text-slate-500 font-bold block mb-1">
                  Starred Rating (1 to 5)
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  required
                  value={reviewForm.rating}
                  onChange={(e) => setReviewForm(prev => ({ ...prev, rating: parseInt(e.target.value) }))}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl bg-white text-slate-800"
                />
              </div>

              <div>
                <label className="uppercase tracking-widest text-slate-500 font-bold block mb-1">
                  Avatar Picture (URL or Upload)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={reviewForm.avatar}
                    onChange={(e) => setReviewForm(prev => ({ ...prev, avatar: e.target.value }))}
                    className="flex-1 px-4 py-2 border border-slate-200 rounded-xl bg-white text-slate-800 focus:outline-none"
                    placeholder="https://images..."
                  />
                  <label className="flex-shrink-0 cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-xl border border-slate-200 flex items-center justify-center font-bold text-xs transition-colors">
                    Upload
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={async (e) => {
                        const url = await handleFileUpload(e, 'avatar');
                        if (url) {
                          setReviewForm(prev => ({ ...prev, avatar: url }));
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="uppercase tracking-widest text-slate-500 font-bold block mb-1">
                  Review Text Feedback
                </label>
                <textarea
                  rows={4}
                  required
                  value={reviewForm.text}
                  onChange={(e) => setReviewForm(prev => ({ ...prev, text: e.target.value }))}
                  placeholder="Tell us what you loved about Pole to Pole travels..."
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl bg-white text-slate-800"
                />
              </div>

              <div>
                <label className="uppercase tracking-widest text-slate-500 font-bold block mb-1">
                  Date of Voyage
                </label>
                <input
                  type="text"
                  value={reviewForm.date}
                  onChange={(e) => setReviewForm(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl bg-white text-slate-800"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 select-none cursor-pointer">
                  <input
                    type="checkbox"
                    checked={reviewForm.verified}
                    onChange={(e) => setReviewForm(prev => ({ ...prev, verified: e.target.checked }))}
                    className="rounded text-[#144C6C] focus:ring-[#144C6C]"
                  />
                  <span>Mark as Verified Guest booking</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setReviewModalOpen(false)}
                  className="px-4 py-2 border border-slate-150 text-slate-500 rounded-xl bg-white hover:bg-slate-50 cursor-pointer"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 text-white bg-[#144C6C] hover:bg-[#144C6C]/95 rounded-xl border border-[#144C6C] cursor-pointer"
                >
                  Save Testament
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
