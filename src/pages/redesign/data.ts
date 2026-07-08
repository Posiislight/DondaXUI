// Shared content for the DondaX redesign. Kept in one place so pages
// (Home, Products, Detail, Order, GNHub) stay in sync.

export const ASSET = (name: string) => `/redesign/${name}`;

export interface Colour {
  key: 'black' | 'green' | 'red';
  name: string;
  swatch: string;
  image: string;
}

export const COLOURS: Colour[] = [
  { key: 'black', name: 'Midnight Black', swatch: '#141414', image: ASSET('gn-urban.jpg') },
  { key: 'green', name: 'Electric Green', swatch: '#3fa02c', image: ASSET('gn-green.jpg') },
  { key: 'red', name: 'Signal Red', swatch: '#cd2318', image: ASSET('gn-red.jpg') },
];

export const SPECS = [
  { label: 'Range', value: '100 km' },
  { label: 'Top Speed', value: '120 km/h' },
  { label: 'Charge Time', value: '2-3 hrs' },
  { label: 'Weight', value: '95 kg' },
];

export const STAT_STRIP = [
  { value: '100km', label: 'Range per charge' },
  { value: '120km/h', label: 'Top speed' },
  { value: '2-3h', label: 'Fast charge time' },
];

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/#about' },
  { label: 'Products', to: '/products' },
  { label: 'GNHub', to: '/gnhub' },
  { label: 'Order', to: '/order' },
  { label: 'Contact', to: '/#contact' },
];

export interface Story {
  id: number;
  category: 'Product Launch' | 'Company News' | 'Events';
  date: string;
  image: string;
  title: string;
  excerpt: string;
  body: string[];
}

export const STORIES: Story[] = [
  {
    id: 0,
    category: 'Product Launch',
    date: 'July 2026',
    image: ASSET('gn-urban.jpg'),
    title: 'GN Model: Revolutionary Electric Performance',
    excerpt:
      'Our flagship model brings cutting-edge lithium-ion battery technology and smart connectivity to the streets of Africa.',
    body: [
      'The GN Model is the motorcycle DondaX was founded to build: a clean, confident, everyday electric ride designed and assembled for African cities. After two years of prototyping on the streets of Abuja, it is finally here.',
      'At its heart sits an advanced lithium-ion battery pack delivering up to 100km of range on a single charge, and a fast-charge system that tops the pack back up in just 2 to 3 hours. Instant electric torque means you pull away from every light first, in near silence.',
      'We kept the classic café-inspired silhouette riders already love, then stripped away the noise, the fuel costs and the emissions. Chrome detailing, a hand-finished tank and a low, comfortable seat make it feel premium without pricing anyone out.',
      'The GN Model ships in three colours — Midnight Black, Electric Green and Signal Red — and is available to reserve today through a simple order request. This is not just a new bike. It is the start of DondaX on the road.',
    ],
  },
  {
    id: 1,
    category: 'Product Launch',
    date: 'Jul 2026',
    image: ASSET('gn-green.jpg'),
    title: 'Smart Navigation Comes to GN Model',
    excerpt:
      'An over-the-air update brings IoT-connected route planning and live battery insights to every rider.',
    body: [
      'Every GN Model is a connected motorcycle. This month we rolled out our first over-the-air software update, adding smart navigation and live battery insights directly to the handlebar display.',
      'Riders can now plan a route that accounts for real-world range, see estimated charge remaining at their destination, and get gentle prompts when it is time to top up. No dealership visit required — the update installs itself overnight.',
      'Connectivity also means security. Owners can locate their bike from the DondaX app, receive movement alerts, and lock the motor remotely if the bike is ever tampered with.',
      'This is the first of many updates. Because the GN Model is built around software, it will keep getting better long after it leaves our workshop.',
    ],
  },
  {
    id: 2,
    category: 'Company News',
    date: 'Jun 2026',
    image: ASSET('logo-text.jpg'),
    title: 'DondaX Reaches 10,000 Pre-Orders',
    excerpt: 'A major milestone as riders across Nigeria commit to the electric future.',
    body: [
      'We are proud to share that DondaX has passed 10,000 pre-orders for the GN Model — a milestone that tells us Africa is ready to go electric.',
      'The demand has come from every corner of the country: commuters tired of rising fuel prices, delivery riders chasing lower running costs, and a new generation that simply wants a cleaner way to move.',
      'To meet it, we are expanding our Abuja assembly capacity and growing our local supplier network, creating new jobs and keeping more of the value chain here at home.',
      'To everyone who placed an early order: thank you for believing in the mission. Your bikes are being built, and the electric revolution is well and truly under way.',
    ],
  },
  {
    id: 3,
    category: 'Events',
    date: 'Jun 2026',
    image: ASSET('gn-urban.jpg'),
    title: 'Test Rides Land in Abuja',
    excerpt: 'Book a slot at our Gwarinpa HQ and feel the torque of instant electric acceleration.',
    body: [
      'Numbers on a spec sheet only tell half the story. This month we opened test rides at our Gwarinpa headquarters so riders can experience the GN Model for themselves.',
      'Book a slot online, arrive at HQ, and one of our team will walk you through the bike before you take it out on a short guided loop. Most first-time riders are surprised by two things: how quiet it is, and how quickly it moves.',
      'Test-ride weekends will roll out to more cities over the coming months. If you have been on the fence about going electric, this is the easiest way to find out what the fuss is about.',
      'Slots are limited and fill up fast — head to the Contact section to reserve yours.',
    ],
  },
];

export const STORY_FILTERS = [
  { key: 'all', label: 'All', category: null },
  { key: 'launch', label: 'Product Launch', category: 'Product Launch' },
  { key: 'news', label: 'Company News', category: 'Company News' },
  { key: 'events', label: 'Events', category: 'Events' },
] as const;
