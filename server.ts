import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client lazily
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn('GEMINI_API_KEY is not defined. AI Chatbot running in fallback mode.');
    }
    aiClient = new GoogleGenAI({
      apiKey: key || 'MOCK_KEY_FOR_BUILD',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Custom curated packages context for the AI Advisor
const CONTEXT_CATALOG = `
You are the intelligent, warm, and structured Virtual Travel Assistant of "Pole to Pole Travels", headed by our expert travel coordinators and founder Nizaruddin.
Your tone is friendly, passionate, helpful, and highly detailed. You love designing professional travel programs, configuring custom tour itineraries, and making effortless bookings for individuals, families, and corporate groups.

Here is Pole to Pole Travels' active premium catalog:

1. INTERNATIONAL PACKAGES:
- "Imperial Europe Treasures Tour" (10 Days Custom, Starting Price: $1,200 per person). Custom itinerary profiling, exploring historic cities across Germany, Austria, and France, private rail passes, and local bilingual guides.
- "Antarctica Polar Explorer Cruise" (12 Days Expedition, Starting Price: $3,450 per person). Premium cruise to view massive icebergs, ride Zodiac inflatables, meet polar guides, and view colonies of penguins safely.
- "Bespoke Australia & New Zealand Trek" (30 Days Trans-Tasman, Starting Price: $4,100 per person). Full month-long trek. Includes Great Barrier Reef snorkeling, Sydney Harbour private yacht sunset cruise, Queenstown helicopter flyovers, and custom luxury lodge stays.
- "Kenyan Savanna Wilderness Safari" (7 Days Private, Starting Price: $1,950 per person). Private open-roof safari drives, Eco-luxe glamping tents in Maasai Mara, sunrise hot air balloon flight, and direct local naturalists guiding.

2. DOMESTIC PACKAGES:
- "Grand Western National Parks Loop" (14 Days, Starting Price: $1,100 per caravan/guest). Campervan rental, route outline through iconic US National Parks, guided hiking, star observation, and luxury cabin reservations.
- "Scenic Blue Ridge and Smokies Roadtrip" (5 Days Curated Heritage, Starting Price: $450 per person). Routing through majestic mountains, scenic byways, historic villages, and boutique B&B bookings.

Pricing model: Standard customized itinerary planning service ranges from $50 to $150 per day depending on detail level.

Your rules:
1. Always guide the customer to book / text via our contact phone +91 95661 31283 or fill out our online Inquiry Form.
2. If the user asks about pricing, mention it clearly (tours, custom daily fees between $50-$150).
3. Be enthusiastic, friendly, and structured. Use bullet points. Encourage epic vacations, group itineraries, or adventure loops.
4. Offer to prepare a brief copy-pastable WhatsApp inquiry they can text directly to our team (+91 95661 31283).
`;

// AI Assistant Endpoint
app.post('/api/chatbot', async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const ai = getAiClient();
    
    // Check if the API key is set or if we are in fallback mode
    if (process.env.GEMINI_API_KEY === undefined) {
      // Simulate elegant Virtual Concierge response when key is missing to ensure zero application crashes
      const mockResponses: { [key: string]: string } = {
        'hi': 'Hello! Welcome to **Pole to Pole Travels**. I am your Virtual Travel Assistant. How can I help you customize your dream holiday itinerary or book custom vacation packages today?',
        'hello': 'Hello! Welcome to **Pole to Pole Travels**. I am your Virtual Travel Assistant. How can I help you customize your dream holiday itinerary or book custom vacation packages today?',
        'germany': 'Our **Imperial Europe Treasures Tour** is a spectacular 10-day custom voyage ($1,200/guest) visiting historic landmarks across Munich, Berlin, and the Rhine. Would you like me to help draft an inquiry copy for our travel planning team?',
        'national parks': 'Our team\'s **Grand Western National Parks Loop** ($1,100) covers a dozen stunning US National Parks with fully equipped campervans and camping/lodge permits. Perfect for outdoor lovers!',
        'antarctica': 'The **Antarctica Polar Explorer Cruise** starting from $3,450 is a once-in-a-lifetime expedition of ice-bays and penguin colonies. We can help you prepare gear and land excursions!'
      };

      const lc = message.toLowerCase();
      let reply = 'I would be delighted to assist you with your travel plans! It looks like our AI live connection is currently offline, but I can guide you to some of our signature programs like the **Imperial Europe Treasures Tour**, the **Western National Parks Campervan Loop**, or a classic **Antarctica Explorer Cruise**. Please feel free to text our team directly at **+91 95661 31283** to coordinate instantly!';
      
      for (const [key, response] of Object.entries(mockResponses)) {
        if (lc.includes(key)) {
          reply = response;
          break;
        }
      }

      // Add small timeout to feel realistic
      await new Promise(resolve => setTimeout(resolve, 800));
      return res.json({ reply });
    }

    // Build the query instructions including history
    let messagesContent = `${CONTEXT_CATALOG}\n\n`;
    
    if (history && history.length > 0) {
      messagesContent += `### Conversation History ###\n`;
      history.forEach((h: any) => {
        const speaker = h.role === 'user' ? 'Customer' : 'Assistant';
        messagesContent += `${speaker}: ${h.text}\n`;
      });
      messagesContent += `\n`;
    }
    
    messagesContent += `### Latest Conversation Request ###\nCustomer: ${message}\nAssistant (Generate next enthusiastic response):`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: messagesContent,
    });

    const reply = response.text || 'I would love to help you plan your next trip with Pole to Pole Travels. Please get in touch with our team at +91 95661 31283!';
    res.json({ reply });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ 
      error: 'Assistant is briefly organizing details.', 
      reply: 'My apologies, I had a slight disruption in my AI signal. Please contact our team directly on +91 95661 31283 for swift help!' 
    });
  }
});

// App Inquiries endpoint (mimicking booking logic)
app.post('/api/inquiry', (req, res) => {
  const { name, destination, budget, numberOfDays, numberOfPersons } = req.body;
  if (!name || !destination) {
    return res.status(400).json({ error: 'Name and Destination are required' });
  }
  
  console.log(`Bespoke Tour Inquiry received from ${name} to ${destination} - Budget: ${budget}, Days: ${numberOfDays}, Persons: ${numberOfPersons}`);
  
  // Format standard WhatsApp copy message to share back with user or trigger
  const messageTemplate = `Hello Pole to Pole Travels! I want to inquire about a custom trip:\n\n` +
                          `• *Destination*: ${destination}\n` +
                          `• *Name*: ${name}\n` +
                          `• *Budget*: ${budget || 'Not specified'}\n` +
                          `• *Number of Days*: ${numberOfDays || 'Not specified'}\n` +
                          `• *Number of Persons*: ${numberOfPersons || 'Not specified'}`;
                          
  const whatsappUrl = `https://wa.me/919566131283?text=${encodeURIComponent(messageTemplate)}`;
  
  res.json({ 
    success: true, 
    message: 'Your inquiry has been formulated! Tap below to send it directly over WhatsApp to Pole to Pole Travels.',
    whatsappUrl 
  });
});

// Setup Vite & static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Pole to Pole Travels Server] running elegantly on http://localhost:${PORT}`);
  });
}

startServer();
