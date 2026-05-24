export interface TravelPackage {
  id: string;
  category: 'international' | 'domestic';
  name: string;
  duration: string;
  price: number;
  rating: number;
  image: string;
  highlights: string[];
  hotels: string;
  flightIncluded: boolean;
  mealsIncluded: boolean;
  guidesIncluded: boolean;
  visaAssistance: boolean;
  tags: string[];
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  avatar: string;
  text: string;
  date: string;
  verified: boolean;
}

export interface InstagramPost {
  id: string;
  imageUrl: string;
  type: 'reel' | 'photo';
  likes: string;
  comments: string;
  caption: string;
  link: string;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export interface InquiryInput {
  name: string;
  destination: string;
  budget: string;
  numberOfDays: string;
  numberOfPersons: string;
}
