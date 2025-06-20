// Kenyan Counties and Regional Data
export const KENYAN_COUNTIES = [
  { id: 1, name: 'Baringo', region: 'Rift Valley' },
  { id: 2, name: 'Bomet', region: 'Rift Valley' },
  { id: 3, name: 'Bungoma', region: 'Western' },
  { id: 4, name: 'Busia', region: 'Western' },
  { id: 5, name: 'Elgeyo Marakwet', region: 'Rift Valley' },
  { id: 6, name: 'Embu', region: 'Eastern' },
  { id: 7, name: 'Garissa', region: 'North Eastern' },
  { id: 8, name: 'Homa Bay', region: 'Nyanza' },
  { id: 9, name: 'Isiolo', region: 'Eastern' },
  { id: 10, name: 'Kajiado', region: 'Rift Valley' },
  { id: 11, name: 'Kakamega', region: 'Western' },
  { id: 12, name: 'Kericho', region: 'Rift Valley' },
  { id: 13, name: 'Kiambu', region: 'Central' },
  { id: 14, name: 'Kilifi', region: 'Coast' },
  { id: 15, name: 'Kirinyaga', region: 'Central' },
  { id: 16, name: 'Kisii', region: 'Nyanza' },
  { id: 17, name: 'Kisumu', region: 'Nyanza' },
  { id: 18, name: 'Kitui', region: 'Eastern' },
  { id: 19, name: 'Kwale', region: 'Coast' },
  { id: 20, name: 'Laikipia', region: 'Central' },
  { id: 21, name: 'Lamu', region: 'Coast' },
  { id: 22, name: 'Machakos', region: 'Eastern' },
  { id: 23, name: 'Makueni', region: 'Eastern' },
  { id: 24, name: 'Mandera', region: 'North Eastern' },
  { id: 25, name: 'Marsabit', region: 'Northern' },
  { id: 26, name: 'Meru', region: 'Eastern' },
  { id: 27, name: 'Migori', region: 'Nyanza' },
  { id: 28, name: 'Mombasa', region: 'Coast' },
  { id: 29, name: 'Murang\'a', region: 'Central' },
  { id: 30, name: 'Nairobi', region: 'Nairobi' },
  { id: 31, name: 'Nakuru', region: 'Rift Valley' },
  { id: 32, name: 'Nandi', region: 'Rift Valley' },
  { id: 33, name: 'Narok', region: 'Rift Valley' },
  { id: 34, name: 'Nyamira', region: 'Nyanza' },
  { id: 35, name: 'Nyandarua', region: 'Central' },
  { id: 36, name: 'Nyeri', region: 'Central' },
  { id: 37, name: 'Samburu', region: 'Rift Valley' },
  { id: 38, name: 'Siaya', region: 'Nyanza' },
  { id: 39, name: 'Taita Taveta', region: 'Coast' },
  { id: 40, name: 'Tana River', region: 'Coast' },
  { id: 41, name: 'Tharaka Nithi', region: 'Eastern' },
  { id: 42, name: 'Trans Nzoia', region: 'Rift Valley' },
  { id: 43, name: 'Turkana', region: 'Northern' },
  { id: 44, name: 'Uasin Gishu', region: 'Rift Valley' },
  { id: 45, name: 'Vihiga', region: 'Western' },
  { id: 46, name: 'Wajir', region: 'North Eastern' },
  { id: 47, name: 'West Pokot', region: 'Rift Valley' },
];

export const MAJOR_CITIES = [
  { id: 'nairobi', name: 'Nairobi', county: 'Nairobi', population: '4.4M' },
  { id: 'mombasa', name: 'Mombasa', county: 'Mombasa', population: '1.2M' },
  { id: 'kisumu', name: 'Kisumu', county: 'Kisumu', population: '610K' },
  { id: 'nakuru', name: 'Nakuru', county: 'Nakuru', population: '570K' },
  { id: 'eldoret', name: 'Eldoret', county: 'Uasin Gishu', population: '475K' },
  { id: 'thika', name: 'Thika', county: 'Kiambu', population: '280K' },
  { id: 'malindi', name: 'Malindi', county: 'Kilifi', population: '207K' },
  { id: 'kitale', name: 'Kitale', county: 'Trans Nzoia', population: '190K' },
  { id: 'garissa', name: 'Garissa', county: 'Garissa', population: '180K' },
  { id: 'kakamega', name: 'Kakamega', county: 'Kakamega', population: '175K' },
];

export const REGIONS = [
  { id: 'central', name: 'Central Kenya', counties: ['Kiambu', 'Kirinyaga', 'Laikipia', 'Murang\'a', 'Nyandarua', 'Nyeri'] },
  { id: 'coast', name: 'Coast', counties: ['Kilifi', 'Kwale', 'Lamu', 'Mombasa', 'Taita Taveta', 'Tana River'] },
  { id: 'eastern', name: 'Eastern', counties: ['Embu', 'Isiolo', 'Kitui', 'Machakos', 'Makueni', 'Meru', 'Tharaka Nithi'] },
  { id: 'nairobi', name: 'Nairobi', counties: ['Nairobi'] },
  { id: 'north_eastern', name: 'North Eastern', counties: ['Garissa', 'Mandera', 'Wajir'] },
  { id: 'northern', name: 'Northern', counties: ['Marsabit', 'Turkana'] },
  { id: 'nyanza', name: 'Nyanza', counties: ['Homa Bay', 'Kisii', 'Kisumu', 'Migori', 'Nyamira', 'Siaya'] },
  { id: 'rift_valley', name: 'Rift Valley', counties: ['Baringo', 'Bomet', 'Elgeyo Marakwet', 'Kajiado', 'Kericho', 'Nakuru', 'Nandi', 'Narok', 'Samburu', 'Trans Nzoia', 'Uasin Gishu', 'West Pokot'] },
  { id: 'western', name: 'Western', counties: ['Bungoma', 'Busia', 'Kakamega', 'Vihiga'] },
];

// Popular meetup locations in major cities
export const MEETUP_LOCATIONS = {
  nairobi: [
    { name: 'Java House', type: 'cafe', area: 'Westlands' },
    { name: 'Carnivore Restaurant', type: 'restaurant', area: 'Langata' },
    { name: 'Uhuru Gardens', type: 'park', area: 'Langata' },
    { name: 'Sarit Centre', type: 'mall', area: 'Westlands' },
    { name: 'City Market', type: 'market', area: 'CBD' },
    { name: 'Karura Forest', type: 'nature', area: 'Kiambu Road' },
  ],
  mombasa: [
    { name: 'Fort Jesus', type: 'historical', area: 'Old Town' },
    { name: 'Nyali Beach', type: 'beach', area: 'Nyali' },
    { name: 'Bamburi Beach', type: 'beach', area: 'Bamburi' },
    { name: 'City Mall', type: 'mall', area: 'Nyali' },
    { name: 'Mama Ngina Waterfront', type: 'waterfront', area: 'CBD' },
  ],
  kisumu: [
    { name: 'Dunga Beach', type: 'beach', area: 'Dunga' },
    { name: 'Kisumu Museum', type: 'museum', area: 'CBD' },
    { name: 'West End Shopping Mall', type: 'mall', area: 'CBD' },
    { name: 'Hippo Point', type: 'nature', area: 'Dunga' },
  ],
  nakuru: [
    { name: 'Lake Nakuru National Park', type: 'nature', area: 'Lake Nakuru' },
    { name: 'Nakuru Town', type: 'town', area: 'CBD' },
    { name: 'Menengai Crater', type: 'nature', area: 'Menengai' },
  ],
};

// Swahili greetings and phrases
export const SWAHILI_GREETINGS = [
  { swahili: 'Habari', english: 'How are you?', casual: true },
  { swahili: 'Mambo', english: 'What\'s up?', casual: true },
  { swahili: 'Sasa', english: 'What\'s happening?', casual: true },
  { swahili: 'Hujambo', english: 'Hello (formal)', casual: false },
  { swahili: 'Karibu', english: 'Welcome', casual: false },
  { swahili: 'Jambo', english: 'Hello', casual: true },
];

// Common Sheng phrases
export const SHENG_PHRASES = [
  { sheng: 'Niaje', english: 'How are you?', context: 'greeting' },
  { sheng: 'Poa', english: 'Cool/Good', context: 'response' },
  { sheng: 'Sawa', english: 'Okay/Fine', context: 'agreement' },
  { sheng: 'Mambo vipi', english: 'How are things?', context: 'greeting' },
  { sheng: 'Uko poa', english: 'You\'re cool', context: 'compliment' },
  { sheng: 'Tupatane', english: 'Let\'s meet', context: 'meetup' },
];

export default {
  KENYAN_COUNTIES,
  MAJOR_CITIES,
  REGIONS,
  MEETUP_LOCATIONS,
  SWAHILI_GREETINGS,
  SHENG_PHRASES,
}; 