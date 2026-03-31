export interface Project {
  id: string
  title: string
  description: string
  category: string
  year: string
  techStack: string[]
  gridCols: 5 | 7
  imageColor: string
  role: string
  tagline: string
  overview: string
  challenge: string
  research: string[]
  decisions: { heading: string; body: string }[]
  reflection: string
  prototypeUrl?: string
}

export const projects: Project[] = [
  {
    id: 'rumiere-clothing',
    title: 'Rumière Clothing Brand',
    description: 'An e-commerce experience for a clothing and footwear brand — editorial layouts built around user confidence and reduced hesitation at key decision points.',
    tagline: 'Designing a clothing brand website that helps users self-identify with the brand quickly and purchase with confidence.',
    category: 'E-Commerce',
    year: '2026',
    techStack: ['Figma', 'UX Research', 'Prototyping'],
    gridCols: 7,
    imageColor: '#C8B89A',
    role: 'UI/UX Design',
    overview: 'Rumière is a multi-category fashion brand covering clothing, footwear, and accessories. The core design question was deceptively simple: how do you create an editorial experience that feels aspirational without making shopping feel inaccessible? Fashion e-commerce has two dominant modes — luxury brands that prioritise visual drama over usability, and mass-market platforms that optimise for efficiency at the cost of identity. Rumière needed a third path.',
    challenge: 'Users make brand affiliation decisions in under 8 seconds of landing. If the aesthetic doesn\'t immediately resonate, they leave — before ever seeing the product. For those who stay, the next drop-off point is the product page, where fit and size uncertainty drives the majority of abandoned carts. The design had to solve both: hook fast, then hold.',
    research: [
      'Competitive audit across Gucci, Tommy Hilfiger, ASOS, and Zara revealed two extremes: image-first luxury layouts that sacrifice findability, and filter-heavy mass-market interfaces that sacrifice desire.',
      'Fashion shoppers browse visually before comparing details — editorial grids support this naturally, but must be adapted to avoid the "luxury-only" trap for broader audiences.',
      'Fit and size uncertainty is the primary driver of pre-purchase abandonment, not price.',
      'Calm, uncluttered product pages increase perceived trust — visual noise raises hesitation at the exact moment a user is deciding to buy.',
    ],
    decisions: [
      {
        heading: 'Editorial hero grid on landing',
        body: 'The entry point needed to answer one question fast: "is this brand for me?" A full-bleed editorial grid of lifestyle imagery lets users self-select within seconds — before they\'ve read a single word of copy. This was a deliberate choice to prioritise emotional alignment over product information at the top of the funnel.',
      },
      {
        heading: 'Outfit builder over isolated product pages',
        body: 'Showing items in context of complete looks directly addresses the core hesitation point: "will this actually work with what I own?" An interactive outfit builder reduces individual product uncertainty by surfacing combinations, not just items. This shifts the user\'s mental model from "buying a shirt" to "completing a look."',
      },
      {
        heading: 'Size guide at the decision point, not the footer',
        body: 'Most e-commerce sites bury sizing information in footer links or accordion menus. Research showed that users who encounter sizing friction at the product page simply leave — they don\'t go looking for help. Surfacing the size guide and review highlights directly on the product page, at the moment of decision, eliminates that exit.',
      },
    ],
    reflection: 'The most important lesson was that editorial minimalism only works when every empty space is intentional. A beautiful layout that obscures product information doesn\'t serve users — it serves the designer\'s aesthetic. The final design preserved the editorial voice while embedding usability at every decision point.',
    prototypeUrl: 'https://www.figma.com/proto/QEQJcXsC3cSqHhCUIbn58L/Rumiere-clothing?node-id=3-79&t=4jB3rcW787KSVnI2-1',
  },
  {
    id: 'onara-healthcare',
    title: 'Onara Healthcare App',
    description: 'A mobile health app that helps patients intuitively navigate medical history and appointments — clarity first, data second.',
    tagline: 'Helping patients intuitively navigate medical history & appointments — without the anxiety of clinical interfaces.',
    category: 'Healthcare',
    year: '2025',
    techStack: ['Figma', 'Interaction Design', 'Prototyping', 'UX Research'],
    gridCols: 5,
    imageColor: '#A8BFB0',
    role: 'UX/UI Design, Interaction Design, Prototyping, Testing',
    overview: 'Onara is a mobile health app designed around a simple insight: patients don\'t think about their health the way hospitals organise it. Existing apps — KenHealth, MyChart, Ada Health — are built around system logic. Onara was designed around patient logic: what happened, when, and what do I do next.',
    challenge: 'Three consistent pain points emerged across research: users didn\'t know which doctor specialisation to book (medical terminology is a barrier, not a guide); they couldn\'t find past prescriptions or visit notes without navigating multiple disconnected tabs; and the clinical visual language of existing apps created anxiety rather than reassurance — making users feel like something was wrong, even when nothing was.',
    research: [
      'Comparative audit of KenHealth, MyChart, Healow, and Ada Health: data is consistently scattered across tabs, requiring users to context-switch to complete basic tasks.',
      'Interview feedback surfaced a clear principle: patients want "clarity first, data second." They don\'t need every health metric visible at once — they need to find what they came for.',
      'Trust increased significantly when medical data was presented chronologically rather than categorically — "what happened" is more intuitive than "what type of record is this."',
      'UX heuristic review identified accessibility failures common across all audited apps — low contrast, dense information hierarchy, and absent empty states.',
    ],
    decisions: [
      {
        heading: 'Doctor filters with plain-language categories',
        body: 'Asking users to select a "Cardiologist" or "Pulmonologist" puts the burden of medical knowledge on the patient. The filter system was redesigned around symptoms and body areas ("Heart & Chest", "Breathing") with smart suggestions based on recent history. The result: users reach the right specialist without needing to know the right word.',
      },
      {
        heading: 'One unified medical timeline',
        body: 'The most-requested feature in user interviews wasn\'t a new feature — it was the ability to see everything in one place. A single chronological timeline of visits, prescriptions, and notes replaced the tab-based navigation of competing apps. One place, no context-switching, no "where did I see that?" moments.',
      },
      {
        heading: 'Comfort-driven visual system',
        body: 'Clinical interfaces use sharp edges, high-density layouts, and sterile colour palettes because they were designed by and for clinicians. Onara uses rounded cards, generous whitespace, and a warm neutral palette — because the end user is a patient, and patients need to feel safe, not processed. Every visual decision was evaluated against one question: does this reduce or increase anxiety?',
      },
      {
        heading: 'Booking flow under 4 screens',
        body: 'Each screen in the booking flow has exactly one primary action. No parallel decisions, no optional steps buried mid-flow. The constraint of 4 screens forced prioritisation: what does the user absolutely need to see at this moment, and what can wait? The result is a flow with no cognitive dead ends.',
      },
    ],
    reflection: 'Healthcare UX sits at the intersection of usability and emotional design. A technically correct interface that makes a patient feel anxious has failed. The most impactful decisions here weren\'t about layout — they were about tone. Every label, every transition, and every empty state was designed to communicate one thing: you are in control, and this is manageable.',
    prototypeUrl: 'https://www.figma.com/proto/4bYLbdYyvqXCdW40Y1MjDl/Onara-medical-app?node-id=0-1&t=kKq01oe3Fi8OJzOf-1',
  },
  {
    id: 'nexa-fintech',
    title: 'Nexa Fintech App',
    description: 'A low-stress multi-recipient payment flow — sending different amounts to multiple people in a single, deliberate action.',
    tagline: 'Solving the most overlooked friction in everyday banking: splitting payments without repeating yourself.',
    category: 'Fintech',
    year: '2025',
    techStack: ['Figma', 'Visual Design', 'UX Research', 'Wireframing'],
    gridCols: 5,
    imageColor: '#B0B8C8',
    role: 'Visual Design, UX Research, Wireframing, Prototyping',
    overview: 'Most payment apps were designed for one-to-one transfers. Nexa was designed around a specific, underserved scenario: sending different amounts to multiple people at once — splitting a dinner bill, paying group expenses, settling a shared purchase. The flow that every consumer banking app forces users to repeat three or four times was redesigned as a single deliberate action.',
    challenge: 'The core tension in multi-recipient payments is between efficiency and deliberateness. Move too fast and users make errors with real money. Too many confirmation steps and the flow feels burdensome. There\'s no undo in a sent payment. The design had to feel calm and controlled without feeling slow — and had to prevent errors without creating friction.',
    research: [
      'Most consumer fintech apps (M-Pesa, PayPal, Revolut) require repeating the full send flow once per recipient — no native multi-send in the consumer tier.',
      'Batch transfer tools exist across platforms, but are consistently gated behind business or pro accounts — treating a common consumer need as an edge case.',
      'Users sending to multiple recipients report the highest friction in everyday banking — more than international transfers or currency conversion.',
      'Mental arithmetic at payment confirmation is the primary cause of send errors. Users second-guess totals, cancel, and restart.',
    ],
    decisions: [
      {
        heading: 'Recipient selection before amount entry',
        body: 'The flow starts by selecting all recipients, then assigns amounts — not the reverse. This mirrors how users actually think ("I need to pay these three people") rather than how apps typically work ("send to someone, then send again"). Separating selection from amount entry also prevents the most common error: adding a recipient after you\'ve already started entering an amount.',
      },
      {
        heading: 'Live running total, always visible',
        body: 'A persistent total counter updates in real time as users assign per-recipient amounts. This eliminates mental arithmetic entirely — users can see the impact of each entry without calculating. The total turning red when it exceeds available balance was added as a secondary affordance to prevent overdraft errors without requiring a blocking modal.',
      },
      {
        heading: 'Consistent colour language for money direction',
        body: 'Green for incoming, a distinct neutral for outgoing — applied consistently across every screen that displays a transaction. This isn\'t a new pattern, but it\'s one that many fintech apps apply inconsistently. Consistency here means users can scan their transaction history without reading every line.',
      },
    ],
    reflection: 'This project was about scope as much as design. Rather than building a complete banking product, the work focused entirely on one broken user journey and solved it properly. That constraint — refusing to widen scope — produced a more considered solution than a broad, shallow product concept would have. The strongest portfolio pieces often come from going deep on one problem, not wide across many.',
    prototypeUrl: 'https://www.figma.com/proto/VU2nq7DCfeT0UUEkp3Kb0S/Nexa-Banking?node-id=0-1&t=ZWFr4aKIrjnVRJgs-1',
  },
  {
    id: 'madaraka-express',
    title: 'Madaraka Express Redesign',
    description: 'Redesigning Kenya\'s intercity rail booking experience to improve clarity, trust, and trip management.',
    tagline: 'Applying proven transport UX conventions to rebuild trust in a premium rail product that deserved better.',
    category: 'Transport',
    year: '2025',
    techStack: ['Figma', 'UX Research', 'Interaction Design', 'Prototyping'],
    gridCols: 7,
    imageColor: '#C4A882',
    role: 'UX/UI Design, Interaction Design, Prototyping, Testing',
    overview: 'The Madaraka Express connects Nairobi to Mombasa — a flagship product of Kenya\'s Standard Gauge Railway. The existing e-ticketing experience had fundamental UX failures that undermined a genuinely premium product: a fragmented booking flow, no seat selection, no trip management, and visual design that communicated uncertainty rather than confidence. The redesign\'s mandate was clear: make the experience as good as the train.',
    challenge: 'The redesign had to serve two very different audiences simultaneously: older, less digitally fluent users who form the existing customer base, and younger commuters and tourists who would expand it. Adding features like seat selection and trip history without increasing the complexity felt by either group. Unifying Economy, First, and Premium booking into a single coherent system rather than three separate experiences.',
    research: [
      'Competitive audit across JamboJet, Kenya Airways, Eurostar, Deutsche Bahn, and regional ferry/bus apps identified universal transport UX patterns that users already know and expect.',
      'Seat selection is a standard expectation in transport booking — its absence in the existing system created distrust. Users reported uncertainty about what they were actually purchasing without a seat reference.',
      'Persistent booking summaries are the single most effective way to prevent booking errors — users who can see their selections throughout checkout arrive at payment with confidence, not anxiety.',
      'Trip management and history pages directly reduce customer support load. Users who can self-serve their booking don\'t need to call.',
      'Premium options perform best when integrated into the main flow — isolating them on a separate path signals that they are niche, which suppresses uptake.',
    ],
    decisions: [
      {
        heading: 'Seat selection as a core booking step',
        body: 'Not an optional extra, not an upsell modal — a native step in the booking flow, between class selection and passenger details. Every comparable transport product users interact with includes this step. Its absence in the original created a gap between user expectation and product reality. Adding it bridges that gap and provides a booking reference users can hold onto.',
      },
      {
        heading: 'Persistent live booking summary',
        body: 'A summary panel stays visible throughout the checkout flow, showing route, class, seat, and running total. The rationale: the most common booking error is discovering a mistake at the payment screen, after the user has entered all their details. A persistent summary makes errors visible the moment they happen, not at the end.',
      },
      {
        heading: 'Unified booking system for all three classes',
        body: 'Economy, First, and Premium travellers enter the same booking flow. Class-specific details — pricing, inclusions, seat maps — surface contextually at the class selection step, not as separate entry points. This removes the cognitive overhead of choosing a path before you\'ve chosen a seat, and makes the experience feel like one product rather than three.',
      },
      {
        heading: 'Trip management as a first-class feature',
        body: 'Upcoming and past journeys in a single hub, with quick rebooking for recurring routes. This wasn\'t a feature request — it was a gap identified from support data patterns. Users who travel regularly between Nairobi and Mombasa were re-entering the same journey details repeatedly. The trip management hub reduces that friction and rewards loyalty without requiring a points system.',
      },
    ],
    reflection: 'The most important design principle here was familiarity over novelty. Users booking rail tickets have mental models formed by every transport booking they\'ve ever made. The job wasn\'t to reinvent the pattern — it was to execute it more clearly, with more respect for the user\'s time, and with enough visual refinement to match the quality of the product it represents. The constraint of "don\'t surprise them" paradoxically led to more thoughtful decisions at every step.',
    prototypeUrl: 'https://www.figma.com/proto/paUclpc5kKdXP810iIBJjE/SGR-Redesign?node-id=62-261&t=Ya5V3CUrRkCLrsqs-1',
  },
]

export const siteConfig = {
  name: 'Edgar Jerry',
  role: 'Product Designer',
  tagline: 'Clarity, Flow, Impact',
  version: 'v.2.0.26',
  email: 'edgarjerry0@gmail.com',
  github: 'https://github.com/edgarjerry',
  linkedin: 'https://linkedin.com/in/edgarjerry',
  instagram: 'https://instagram.com/eddyj.erry/',
  twitter: 'https://x.com/Edgar00313492',
  dribbble: 'https://dribbble.com/eddyjerry',
  behance: 'https://behance.net/edgarjerry',
  location: 'Nairobi, Kenya',
  available: true,
}
