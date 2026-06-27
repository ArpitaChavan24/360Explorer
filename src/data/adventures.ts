export interface Adventure {
  id: string;
  title: string;
  price: string;
  currency?: 'INR' | 'USD';
  priceInr?: string;
  priceUsd?: string;
  location: string;
  rating: number;
  image: string;
  description: string;
  duration: string;
  difficulty: string;
  category: 'Himalayan' | 'Desert' | 'Snow' | 'Jungle' | 'Camping';
  highlights: string[];
  itinerary: { 
    day: number | string; 
    title: string; 
    description: string;
    details?: {
      elevation?: string;
      distance?: string;
      hikingTime?: string;
      habitat?: string;
      meals?: string;
      lodging?: string;
    }
  }[];
  inclusions?: string[];
  exclusions?: string[];
}

export const adventures: Adventure[] = [
  {
    id: '1',
    title: 'Conquer the Roof of Africa in Just 6 Days',
    price: '₹1,65,000',
    location: 'Mount Kilimanjaro, Tanzania',
    rating: 5,
    image: '/image/RoofOfAfrica1.jpg',
    description: 'Mount Kilimanjaro is the highest mountain in Africa and the highest single free-standing mountain in the world.',
    duration: '6 Days',
    difficulty: 'Challenging',
    category: 'Snow',
    highlights: ['Uhuru Peak Summit', 'Stunning Sunrises', 'Diverse Ecosystems', 'Expert Guides'],
    itinerary: [
      { day: 1, title: 'Machame Gate to Machame Camp', description: 'Begin your journey through lush rainforests.' }
    ]
  },
  {
    id: '2',
    title: 'Conquer the Roof of the World - Everest Expedition',
    price: '₹2,50,000',
    location: 'Mount Everest, Nepal',
    rating: 5,
    image: '/image/RoofofEverest.jpg',
    description: 'The ultimate adventure. Standing at 8,848.86m, Everest is the highest point on Earth.',
    duration: '60 Days',
    difficulty: 'Extreme',
    category: 'Himalayan',
    highlights: ['Khumbu Icefall', 'South Col', 'Hillary Step', 'World Record Achievement'],
    itinerary: [
      { day: 1, title: 'Arrival in Kathmandu', description: 'Gear check and briefing.' }
    ]
  },
  {
    id: '4',
    title: 'Kedarkantha Winter Trek - The Snow Paradise',
    price: '₹16,000',
    location: 'Uttarakhand, India',
    rating: 4.8,
    image: '/image/Kedarnath.jpg',
    description: 'Kedarkantha is one of the most popular winter treks in India.',
    duration: '6 Days',
    difficulty: 'Easy to Moderate',
    category: 'Snow',
    highlights: ['Juda Ka Talab', 'Summit Sunrise', 'Pine Forests', 'Snow Slopes'],
    itinerary: [
      { day: 1, title: 'Dehradun to Sankri', description: 'Long drive through scenic mountains.' }
    ]
  },
  {
    id: '5',
    title: 'Roopkund Trek - The Skeleton Lake Adventure',
    price: '₹18,000',
    location: 'Uttarakhand, India',
    rating: 4.9,
    image: '/image/RoopkundTrek.jpg',
    description: 'A trek shrouded in mystery. Roopkund lake is famous for the hundreds of human skeletons found at its edge.',
    duration: '8 Days',
    difficulty: 'Moderate to Difficult',
    category: 'Himalayan',
    highlights: ['Skeleton Lake', 'Ali & Bedni Bugyal', 'Junargali Pass', 'Mt Trishul Views'],
    itinerary: [
      { day: 1, title: 'Kathgodam to Lohajung', description: 'Scenic drive to the base village.' }
    ]
  },
  {
    id: '8',
    title: 'Chadar Frozen River Trek - Leh Ladakh',
    price: '₹22,000',
    location: 'Leh Ladakh, India',
    rating: 5,
    image: '/image/ChadarFrozenRiverTrek.jpg',
    description: 'Walking on the frozen Zanskar river is a once-in-a-lifetime experience.',
    duration: '9 Days',
    difficulty: 'Difficult',
    category: 'Snow',
    highlights: ['Walking on Ice', 'Nerak Waterfall', 'Caves', 'Sub-zero Temperatures'],
    itinerary: [
      { day: 1, title: 'Arrival in Leh', description: 'Full day rest for acclimatization.' }
    ]
  },
  {
    id: '101',
    title: 'Valley of Flowers Trek',
    price: '₹15,000',
    location: 'Uttarakhand, India',
    rating: 4.9,
    image: '/image/ValleyofFlowers.jpg',
    description: 'A UNESCO World Heritage site known for its meadows of endemic alpine flowers.',
    duration: '6 Days',
    difficulty: 'Moderate',
    category: 'Himalayan',
    highlights: ['Alpine Flowers', 'UNESCO Site', 'Hemkund Sahib', 'Snowy Peaks'],
    itinerary: [{ day: 1, title: 'Haridwar to Joshimath', description: 'Scenic drive.' }]
  },
  {
    id: '102',
    title: 'Hampta Pass Trek',
    price: '₹12,000',
    location: 'Himachal Pradesh, India',
    rating: 4.8,
    image: '/image/HamptaPass.jpg',
    description: 'A dramatic pass crossing between the lush Kullu valley and the stark Spiti valley.',
    duration: '5 Days',
    difficulty: 'Moderate',
    category: 'Himalayan',
    highlights: ['Pass Crossing', 'Chandratal Lake', 'Snow Slopes'],
    itinerary: [{ day: 1, title: 'Manali to Jobra', description: 'Starting the trek.' }]
  },
  {
    id: '103',
    title: 'Sandakphu Phalut Trek',
    price: '₹16,500',
    location: 'West Bengal, India',
    rating: 4.9,
    image: '/image/SandakphuPhalutTrek.jpg',
    description: 'Highest peak in West Bengal, offering views of four of the world\'s five highest peaks.',
    duration: '7 Days',
    difficulty: 'Moderate',
    category: 'Himalayan',
    highlights: ['Kanchenjunga View', 'Everest View', 'Sleeping Buddha'],
    itinerary: [{ day: 1, title: 'NJP to Manebhanjan', description: 'Drive to border town.' }]
  },
  {
    id: '104',
    title: 'Brahmatal Winter Trek',
    price: '₹11,000',
    location: 'Uttarakhand, India',
    rating: 4.7,
    image: '/image/BrahmatalWinterTrek.jpg',
    description: 'A classic winter trek offering magnificent views of Mt. Trishul and Mt. Nanda Ghunti.',
    duration: '6 Days',
    difficulty: 'Moderate',
    category: 'Snow',
    highlights: ['Frozen Lake', 'Forest Campsites', 'Peak Views'],
    itinerary: [{ day: 1, title: 'Kathgodam to Lohajung', description: 'Base village drive.' }]
  },
  {
    id: '105',
    title: 'Goechala Trek',
    price: '₹22,000',
    location: 'Sikkim, India',
    rating: 5,
    image: '/image/GoechalaTrek.jpg',
    description: 'The closest you can get to Kanchenjunga, the third highest peak in the world.',
    duration: '11 Days',
    difficulty: 'Challenging',
    category: 'Himalayan',
    highlights: ['Kanchenjunga View', 'Rhododendron Forests', 'Samiti Lake'],
    itinerary: [{ day: 1, title: 'NJP to Yuksom', description: 'Journey to Sikkim.' }]
  },
  {
    id: '106',
    title: 'Har Ki Dun Trek',
    price: '₹14,000',
    location: 'Uttarakhand, India',
    rating: 4.8,
    image: '/image/HarKiDunTrek.jpg',
    description: 'A cradle-shaped valley in the heart of the Govind Ballabh Pant National Park.',
    duration: '7 Days',
    difficulty: 'Moderate',
    category: 'Himalayan',
    highlights: ['Ancient Villages', 'Swargarohini Peaks', 'River Walks'],
    itinerary: [{ day: 1, title: 'Dehradun to Sankri', description: 'Gateway to Har Ki Dun.' }]
  },
  {
    id: '107',
    title: 'Kuari Pass Trek',
    price: '₹13,500',
    location: 'Uttarakhand, India',
    rating: 4.8,
    image: '/image/KuariPassTrek.jpg',
    description: 'Known as the Lord Curzon Trail, offering 360-degree views of the Garhwal Himalayas.',
    duration: '6 Days',
    difficulty: 'Moderate',
    category: 'Himalayan',
    highlights: ['Nanda Devi View', 'Oak Forests', 'Gorson Bugyal'],
    itinerary: [{ day: 1, title: 'Haridwar to Joshimath', description: 'Scenic drive.' }]
  },
  {
    id: '108',
    title: 'Rupin Pass Trek',
    price: '₹21,000',
    location: 'Uttarakhand/Himachal, India',
    rating: 5,
    image: '/image/RupinPass.jpg',
    description: 'A high altitude pass trek that starts in Uttarakhand and ends in Himachal Pradesh.',
    duration: '9 Days',
    difficulty: 'Challenging',
    category: 'Himalayan',
    highlights: ['Three Stage Waterfall', 'Pass Crossing', 'Snow Bridge'],
    itinerary: [{ day: 1, title: 'Dehradun to Dhaula', description: 'Starting point drive.' }]
  },
  {
    id: '109',
    title: 'Tarsar Marsar Trek',
    price: '₹19,000',
    location: 'Kashmir, India',
    rating: 5,
    image: '/image/TarsarMarsa.jpg',
    description: 'Experience the pristine beauty of the twin alpine lakes in the heart of Kashmir.',
    duration: '7 Days',
    difficulty: 'Moderate',
    category: 'Himalayan',
    highlights: ['Twin Lakes', 'Kashmiri Meadows', 'Snow Peaks'],
    itinerary: [{ day: 1, title: 'Srinagar to Aru', description: 'Gateway to the lakes.' }]
  },
  {
    id: '110',
    title: 'Markha Valley Trek',
    price: '₹25,000',
    location: 'Ladakh, India',
    rating: 4.9,
    image: '/image/MarkhaValley.jpg',
    description: 'A popular trek in Ladakh, passing through high passes and ancient Buddhist monasteries.',
    duration: '9 Days',
    difficulty: 'Challenging',
    category: 'Himalayan',
    highlights: ['Kongmaru La Pass', 'Ladakhi Culture', 'Hemis National Park'],
    itinerary: [{ day: 1, title: 'Leh Acclimatization', description: 'Preparing for the altitude.' }]
  },
  {
    id: '111',
    title: 'Buran Ghati Trek',
    price: '₹18,000',
    location: 'Himachal Pradesh, India',
    rating: 4.9,
    image: '/image/BuranGhati.jpg',
    description: 'A perfect adventure trek with deep forests, meadows, and a thrilling pass crossing.',
    duration: '7 Days',
    difficulty: 'Challenging',
    category: 'Himalayan',
    highlights: ['Chandranahan Lake', 'Pass Descent', 'Pine Forests'],
    itinerary: [{ day: 1, title: 'Shimla to Janglik', description: 'Remote village drive.' }]
  },
  {
    id: '112',
    title: 'Bali Pass Trek',
    price: '₹24,000',
    location: 'Uttarakhand, India',
    rating: 5,
    image: '/image/BaliPass.jpg',
    description: 'Connects the Tons river valley with the Yamuna river valley over a high pass.',
    duration: '8 Days',
    difficulty: 'Extreme',
    category: 'Himalayan',
    highlights: ['Ruinsara Lake', 'Bali Pass Summit', 'Yamunotri Temple'],
    itinerary: [{ day: 1, title: 'Dehradun to Sankri', description: 'Expedition start.' }]
  },
  {
    id: '113',
    title: 'Pin Parvati Pass Trek',
    price: '₹35,000',
    location: 'Himachal Pradesh, India',
    rating: 5,
    image: '/image/PinParvatiPass.jpg',
    description: 'One of the most challenging and rewarding treks in the Indian Himalayas.',
    duration: '11 Days',
    difficulty: 'Extreme',
    category: 'Himalayan',
    highlights: ['Mantalai Lake', 'Pass Crossing', 'Spiti Landscape'],
    itinerary: [{ day: 1, title: 'Manali to Barsheni', description: 'Entering Parvati Valley.' }]
  },
  {
    id: '114',
    title: 'Gaumukh Tapovan Trek',
    price: '₹17,000',
    location: 'Uttarakhand, India',
    rating: 4.9,
    image: '/image/GaumukhTapovan.jpg',
    description: 'Trek to the source of the Holy Ganges and the high altitude meadow of Tapovan.',
    duration: '7 Days',
    difficulty: 'Moderate to Difficult',
    category: 'Himalayan',
    highlights: ['Gangotri Glacier', 'Mt Shivling View', 'Holy Source'],
    itinerary: [{ day: 1, title: 'Rishikesh to Uttarkashi', description: 'Sacred journey.' }]
  },
  {
    id: '115',
    title: 'Pangarchulla Peak Trek',
    price: '₹14,500',
    location: 'Uttarakhand, India',
    rating: 4.8,
    image: '/image/PangarchullaPeak.jpg',
    description: 'A summit climb trek offering a great introduction to mountaineering.',
    duration: '6 Days',
    difficulty: 'Difficult',
    category: 'Himalayan',
    highlights: ['Summit Climb', 'Nanda Devi View', 'Snow Ridges'],
    itinerary: [{ day: 1, title: 'Haridwar to Joshimath', description: 'Summit base drive.' }]
  },
  {
    id: '116',
    title: 'Zanskar Valley Expedition',
    price: '₹45,000',
    location: 'Ladakh, India',
    rating: 5,
    image: '/image/ZanskarValley.jpg',
    description: 'Explore the remote and ancient kingdom of Zanskar, one of the last true wildernesses.',
    duration: '14 Days',
    difficulty: 'Extreme',
    category: 'Desert',
    highlights: ['Phugtal Monastery', 'Shinkula Pass', 'Remote Villages'],
    itinerary: [{ day: 1, title: 'Manali to Jispa', description: 'Leh-Manali Highway.' }]
  },
  {
    id: '117',
    title: 'Munsiyari Milam Glacier Trek',
    price: '₹28,000',
    location: 'Uttarakhand, India',
    rating: 4.7,
    image: '/image/MunsiyariMilamGlacier.jpg',
    description: 'A historic trade route trek to one of the largest glaciers in the Kumaon region.',
    duration: '10 Days',
    difficulty: 'Moderate to Difficult',
    category: 'Himalayan',
    highlights: ['Milam Glacier', 'Panchachuli Peaks', 'Johar Valley'],
    itinerary: [{ day: 1, title: 'Kathgodam to Munsiyari', description: 'Long Himalayan drive.' }]
  },
  {
    id: '118',
    title: 'Bhrigu Lake Trek',
    price: '₹9,000',
    location: 'Himachal Pradesh, India',
    rating: 4.6,
    image: '/image/BhriguLake.jpg',
    description: 'A short trek to a sacred high-altitude lake that never fully freezes.',
    duration: '4 Days',
    difficulty: 'Moderate',
    category: 'Himalayan',
    highlights: ['Sacred Lake', 'Alpine Meadows', 'Solang Valley Views'],
    itinerary: [{ day: 1, title: 'Manali to Gulaba', description: 'Short drive to start.' }]
  },
  {
    id: '119',
    title: 'Dayara Bugyal Trek',
    price: '₹10,500',
    location: 'Uttarakhand, India',
    rating: 4.8,
    image: '/image/DayaraBugyal.jpg',
    description: 'One of the most beautiful high-altitude meadows in India, perfect for beginners.',
    duration: '5 Days',
    difficulty: 'Easy to Moderate',
    category: 'Himalayan',
    highlights: ['High Meadows', 'Barnala Lake', 'Peak Panoramas'],
    itinerary: [{ day: 1, title: 'Dehradun to Raithal', description: 'Scenic village start.' }]
  },
  {
    id: '120',
    title: 'Pindari Glacier Trek',
    price: '₹16,000',
    location: 'Uttarakhand, India',
    rating: 4.7,
    image: '/image/PindariGlacier.jpg',
    description: 'A classic trek in the Kumaon region leading to the snout of the Pindari glacier.',
    duration: '7 Days',
    difficulty: 'Moderate',
    category: 'Himalayan',
    highlights: ['Zero Point', 'Kumaoni Culture', 'Pindar River'],
    itinerary: [{ day: 1, title: 'Kathgodam to Lohajung', description: 'Classic route start.' }]
  },
  {
    id: '201',
    title: 'Machu Picchu Inca Trail',
    price: '₹85,000',
    location: 'Cusco, Peru',
    rating: 5,
    image: '/image/MachuPicchuInca.jpg',
    description: 'Trek the legendary Inca Trail to the Lost City of the Incas.',
    duration: '4 Days',
    difficulty: 'Moderate',
    category: 'Camping',
    highlights: ['Sun Gate', 'Ancient Ruins', 'Cloud Forests'],
    itinerary: [{ day: 1, title: 'Cusco to Wayllabamba', description: 'Inca Trail start.' }]
  },
  {
    id: '202',
    title: 'Patagonia W-Trek',
    price: '₹1,20,000',
    location: 'Torres del Paine, Chile',
    rating: 5,
    image: '/image/PatagoniaW.jpg',
    description: 'Experience the dramatic granite towers and glaciers of Chilean Patagonia.',
    duration: '5 Days',
    difficulty: 'Moderate',
    category: 'Snow',
    highlights: ['Grey Glacier', 'French Valley', 'The Towers'],
    itinerary: [{ day: 1, title: 'Puerto Natales to Paine', description: 'Entering the park.' }]
  },
  {
    id: '204',
    title: 'Annapurna Base Camp',
    price: '₹45,000',
    location: 'Annapurna, Nepal',
    rating: 4.9,
    image: '/image/AnnapurnaBase.jpg',
    description: 'Trek to the heart of the Annapurna massif for a 360-degree mountain view.',
    duration: '10 Days',
    difficulty: 'Moderate',
    category: 'Himalayan',
    highlights: ['Machapuchare View', 'Hot Springs', 'Base Camp'],
    itinerary: [{ day: 1, title: 'Pokhara to Ghandruk', description: 'Gurung village start.' }]
  },
  {
    id: '205',
    title: 'Iceland Laugavegur Trail',
    price: '₹1,50,000',
    location: 'Landmannalaugar, Iceland',
    rating: 4.9,
    image: '/image/IcelandLaugavegurTrail.jpg',
    description: 'Hike through volcanic landscapes, glaciers, and colorful rhyolite mountains.',
    duration: '4 Days',
    difficulty: 'Moderate',
    category: 'Snow',
    highlights: ['Geothermal Areas', 'Volcanic Deserts', 'Thorsmork Valley'],
    itinerary: [{ day: 1, title: 'Reykjavik to Landmannalaugar', description: 'Highland bus journey.' }]
  },
  {
    id: '206',
    title: 'Dolomites High Alta Via 1',
    price: '₹1,40,000',
    location: 'Cortina, Italy',
    rating: 5,
    image: '/image/DolomitesHighAlta.jpg',
    description: 'A stunning trek through the dramatic limestone peaks of the Italian Dolomites.',
    duration: '8 Days',
    difficulty: 'Challenging',
    category: 'Camping',
    highlights: ['Refugio Stays', 'Cinque Torri', 'Mountain Lakes'],
    itinerary: [{ day: 1, title: 'Lago di Braies start', description: 'Iconic lake start.' }]
  },
  {
    id: '207',
    title: 'Milford Track',
    price: '₹95,000',
    location: 'Fiordland, New Zealand',
    rating: 5,
    image: '/image/MilfordTrack.jpg',
    description: 'Described as "the finest walk in the world" through New Zealand\'s Fiordland.',
    duration: '4 Days',
    difficulty: 'Moderate',
    category: 'Jungle',
    highlights: ['Sutherland Falls', 'Mackinnon Pass', 'Milford Sound'],
    itinerary: [{ day: 1, title: 'Te Anau to Glade House', description: 'Boat to track start.' }]
  },
  {
    id: '208',
    title: 'Mount Fuji Summit',
    price: '₹35,000',
    location: 'Fujinomiya, Japan',
    rating: 4.8,
    image: '/image/MountFuji.jpg',
    description: 'Climb Japan\'s iconic volcano for a legendary sunrise view above the clouds.',
    duration: '2 Days',
    difficulty: 'Moderate',
    category: 'Snow',
    highlights: ['Goraiko Sunrise', 'Crater Walk', 'Iconic Summit'],
    itinerary: [{ day: 1, title: '5th Station to 8th Station', description: 'Mountain hut stay.' }]
  },
  {
    id: '209',
    title: 'Swiss Alps Eiger Trail',
    price: '₹1,60,000',
    location: 'Grindelwald, Switzerland',
    rating: 4.9,
    image: '/image/SwissAlpsEigerTrail.jpg',
    description: 'Hike directly under the famous Eiger North Face for world-class alpine views.',
    duration: '3 Days',
    difficulty: 'Moderate',
    category: 'Himalayan',
    highlights: ['Eiger North Face', 'Jungfrau Region', 'Alpine Meadows'],
    itinerary: [{ day: 1, title: 'Grindelwald to Alpiglen', description: 'Alpine village start.' }]
  },
  {
    id: '211',
    title: 'Grand Canyon Rim-to-Rim',
    price: '₹55,000',
    location: 'Arizona, USA',
    rating: 5,
    image: '/image/GrandCanyon.jpg',
    description: 'A life-changing journey from one rim of the Grand Canyon to the other.',
    duration: '3 Days',
    difficulty: 'Extreme',
    category: 'Desert',
    highlights: ['Phantom Ranch', 'Colorado River', 'Geologic History'],
    itinerary: [{ day: 1, title: 'North Rim to Cottonwood', description: 'Deep canyon descent.' }]
  },
  {
    id: '212',
    title: 'Tanzania Serengeti Safari',
    price: '₹2,50,000',
    location: 'Serengeti, Tanzania',
    rating: 5,
    image: '/image/TanzaniaSerengetiSafari.jpg',
    description: 'Witness the Great Migration and the Big Five in the world\'s most famous park.',
    duration: '7 Days',
    difficulty: 'Easy',
    category: 'Jungle',
    highlights: ['Great Migration', 'Big Five', 'Luxury Camping'],
    itinerary: [{ day: 1, title: 'Arusha to Serengeti', description: 'Bush flight arrival.' }]
  },
  {
    id: '213',
    title: 'Galapagos Island Hopping',
    price: '₹3,20,000',
    location: 'Galapagos, Ecuador',
    rating: 5,
    image: '/image/GalapagosIslandHopping.jpg',
    description: 'Discover the unique wildlife that inspired Charles Darwin\'s theory of evolution.',
    duration: '8 Days',
    difficulty: 'Easy',
    category: 'Jungle',
    highlights: ['Giant Tortoises', 'Marine Iguanas', 'Snorkeling'],
    itinerary: [{ day: 1, title: 'Quito to Baltra', description: 'Island arrival.' }]
  },
  {
    id: '214',
    title: 'Jordan Petra & Wadi Rum',
    price: '₹1,10,000',
    location: 'Wadi Rum, Jordan',
    rating: 4.9,
    image: '/image/JordanPetra.jpg',
    description: 'Explore the ancient Rose City of Petra and camp in the majestic desert of Wadi Rum.',
    duration: '6 Days',
    difficulty: 'Moderate',
    category: 'Desert',
    highlights: ['The Treasury', 'Bedouin Camping', 'Star Gazing'],
    itinerary: [{ day: 1, title: 'Amman to Petra', description: 'Ancient history start.' }]
  },
  {
    id: '215',
    title: 'Norway Preikestolen Hike',
    price: '₹75,000',
    location: 'Stavanger, Norway',
    rating: 4.9,
    image: '/image/NorwayPreikestolenHike.jpg',
    description: 'Hike to the famous Pulpit Rock for a breathtaking view over Lysefjord.',
    duration: '3 Days',
    difficulty: 'Moderate',
    category: 'Snow',
    highlights: ['Pulpit Rock', 'Lysefjord View', 'Fjord Cruise'],
    itinerary: [{ day: 1, title: 'Stavanger to Preikestolen', description: 'Fjord adventure.' }]
  },
  {
    id: '216',
    title: 'Canadian Rockies Banf',
    price: '₹1,30,000',
    location: 'Alberta, Canada',
    rating: 5,
    image: '/image/CanadianRockiesBanf.jpg',
    description: 'Explore the turquoise lakes and towering peaks of Banff and Jasper National Parks.',
    duration: '7 Days',
    difficulty: 'Easy to Moderate',
    category: 'Snow',
    highlights: ['Lake Louise', 'Icefields Parkway', 'Glacier Walk'],
    itinerary: [{ day: 1, title: 'Calgary to Banff', description: 'Mountain town arrival.' }]
  },
  {
    id: '217',
    title: 'Australian Outback Red Centre',
    price: '₹1,45,000',
    location: 'Uluru, Australia',
    rating: 4.8,
    image: '/image/AustralianOutbackRedCentre.jpg',
    description: 'Discover the spiritual heart of Australia and the massive monolith of Uluru.',
    duration: '5 Days',
    difficulty: 'Moderate',
    category: 'Desert',
    highlights: ['Uluru Sunset', 'Kata Tjuta', 'Kings Canyon'],
    itinerary: [{ day: 1, title: 'Alice Springs arrival', description: 'Outback gateway.' }]
  },
  {
    id: '218',
    title: 'Amazon Rainforest Survival',
    price: '₹1,90,000',
    location: 'Manaus, Brazil',
    rating: 4.9,
    image: '/image/AmazonRainforestSurvival.jpg',
    description: 'Deep jungle immersion and survival training in the world\'s largest rainforest.',
    duration: '10 Days',
    difficulty: 'Extreme',
    category: 'Jungle',
    highlights: ['Jungle Trekking', 'Piranha Fishing', 'Indigenous Culture'],
    itinerary: [{ day: 1, title: 'Manaus to Jungle Lodge', description: 'Deep river journey.' }]
  },
  {
    id: '219',
    title: 'Antarctica Polar Expedition',
    price: '₹12,00,000',
    location: 'Antarctica',
    rating: 5,
    image: '/image/AntarcticaPolarExpedition.jpg',
    description: 'The ultimate bucket list expedition to the white continent at the bottom of the world.',
    duration: '12 Days',
    difficulty: 'Moderate',
    category: 'Snow',
    highlights: ['Drake Passage', 'Penguin Colonies', 'Iceberg Kayaking'],
    itinerary: [{ day: 1, title: 'Ushuaia Embarkation', description: 'Southernmost city start.' }]
  },
  {
    id: '220',
    title: 'Vietnam Ha Long Bay Kayak',
    price: '₹65,000',
    location: 'Ha Long, Vietnam',
    rating: 4.8,
    image: '/image/VietnamHaLongBayKayak.jpg',
    description: 'Paddle through the emerald waters and limestone karsts of a UNESCO World Heritage site.',
    duration: '4 Days',
    difficulty: 'Easy',
    category: 'Jungle',
    highlights: ['Hidden Caves', 'Floating Villages', 'Overnight Cruise'],
    itinerary: [{ day: 1, title: 'Hanoi to Ha Long', description: 'Bay arrival.' }]
  },
  {
    id: 'zanzibar-beach-3',
    title: '3 Days Zanzibar Beach stay',
    price: '$399',
    currency: 'USD',
    location: 'Zanzibar, Tanzania',
    rating: 5,
    image: '/image/ZanzibarBeach.jpg',
    description: 'Stone Town is the ancient city and cultural heart of Zanzibar. One could simply meander through the winding alleys, bustling bazaars and mosques for countless hours. This tour captures the essence of Zanzibar by visiting iconic landmarks.',
    duration: '3 Days',
    difficulty: 'Easy',
    category: 'Jungle',
    highlights: ['Stone Town Tour', 'Forodhani Garden', 'Kendwa Beaches', 'Cultural Heritage'],
    itinerary: [
      { 
        day: 1, 
        title: 'Arrive in Zanzibar', 
        description: 'Our driver will collect you from the airport and transport you to the hotel in Stone Town. Stone Town is the ancient city and cultural heart of Zanzibar. Optional Historical Stone Town tour visiting the House of Wonders, the Palace Museum, Dr Livingston’s house and the Arab Fort.',
        details: { lodging: 'Tembo House Hotel' }
      },
      { 
        day: 2, 
        title: 'Stone Town to Kendwa', 
        description: 'Optional spice tour in the morning. After midday, make our way to Kendwa to explore the finest Zanzibar beaches with golden sand and shimmering water. Optional visit to the Tortoise Island.',
        details: { lodging: 'Tembo House Hotel' }
      },
      { 
        day: 3, 
        title: 'Departure', 
        description: 'Enjoy a delicious breakfast before transportation to Zanzibar International airport where you will connect your flight.' 
      }
    ],
    inclusions: [
      'Accommodation B&B',
      'Return airport transfers',
      'Excursion fees',
      'Pickups and drop-offs',
      'Entrance fees',
      'Local Taxes, VAT',
      'English-speaking Tour Guide'
    ],
    exclusions: [
      'Local flights',
      'Tippings',
      'Extras on holidays',
      'Dinner and Lunch'
    ]
  },
  {
    id: 'zanzibar-beach-4',
    title: '4 Days Zanzibar Beach stay',
    price: '$599',
    currency: 'USD',
    location: 'Zanzibar, Tanzania',
    rating: 5,
    image: '/image/ZanzibarBeach2.jpg',
    description: 'Experience the best of Zanzibar with beach relaxation, spice farm trips, and Stone Town exploration. Stay at the beautiful Sunset Kendwa Beach resort.',
    duration: '4 Days',
    difficulty: 'Easy',
    category: 'Jungle',
    highlights: ['Sunset Kendwa Beach', 'Spice Farm Trip', 'Stone Town Shopping', 'Private Island Excursions'],
    itinerary: [
      { 
        day: 1, 
        title: 'Arrival in Zanzibar', 
        description: 'Pick up from Zanzibar airport and transfer to Sunset Kendwa Beach resort. Meet our guide for briefings and all activities explained.',
        details: { lodging: 'Sunset Kendwa Beach resort' }
      },
      { 
        day: 2, 
        title: 'Beach Time and Free Space', 
        description: 'Individual space and beach relaxing at Sunset Kendwa Bungalow resort. Plan activities like water sports on your own.',
        details: { lodging: 'Sunset Kendwa Beach resort' }
      },
      { 
        day: 3, 
        title: 'Spice Farm Trip', 
        description: 'Excursion to spice and fruit plantations for the famous Spice Tour. Detailed description of traditional uses in medicine, cosmetics and cooking. Opulent lunch at our guides’ home.',
        details: { lodging: 'Tembo House Hotel' }
      },
      { 
        day: 4, 
        title: 'Airport Transfer', 
        description: 'Take a tour in Stone Town and do shopping. Transfer to airport (about one hour drive).' 
      }
    ],
    inclusions: [
      'One way Flight to Zanzibar',
      'All Airport and Ground transfers',
      'All lodging and meals as noted',
      'Private guides for island excursions',
      'Government taxes, VAT and service charges'
    ],
    exclusions: [
      'Tanzania VISA $50',
      'Extras at the hotel (drinks, snacks, laundry, etc.)',
      'Tipping'
    ]
  },
  {
    id: 'zanzibar-island-5',
    title: '5 Days Zanzibar Island',
    price: '$550',
    currency: 'USD',
    location: 'Zanzibar, Tanzania',
    rating: 5,
    image: '/image/ZanzibarIsland.jpg',
    description: 'World Class Highlights: Zanzibar island Kendwa beaches, Stone town, Dolphin watching, spice tour.',
    duration: '5 Days',
    difficulty: 'Easy',
    category: 'Jungle',
    highlights: ['Dolphin Watching', 'Stone Town (UNESCO)', 'Spice Plantations', 'Romantic Sunsets'],
    itinerary: [
      { 
        day: 1, 
        title: 'Arrival & Transfer', 
        description: 'Arrive Zanzibar airport, clear immigration, pick up and transfer to Kendwa beach resort. Itinerary briefing and unique gifts.',
        details: { lodging: 'Kendwa Rock Beach Resort' }
      },
      { 
        day: 2, 
        title: 'Dolphin Watching', 
        description: 'Early morning trip in the North for Dolphin watching. Optional swimming with them. Afternoon lunch and beach walk.',
        details: { lodging: 'Sunset Kendwa Beach Resort' }
      },
      { 
        day: 3, 
        title: 'Beach Unwind', 
        description: 'Kendwa beach is the perfect place to unwind. Haven for underwater lovers with snorkeling or scuba diving.',
        details: { lodging: 'Sunset Kendwa Beach Resort' }
      },
      { 
        day: 4, 
        title: 'Stone Town & Spices', 
        description: 'Guided tour of Stone Town (UNESCO World Heritage Site). Trace footsteps of Arab Sultans and see actual Zanzibar doors. Afternoon tour of spice plantations.',
        details: { lodging: 'Tembo Hotel or Equivalent' }
      },
      { 
        day: 5, 
        title: 'Free Morning & Departure', 
        description: 'Shopping, relaxing in the pool or beach. Afternoon transfer to airport at 14:00.' 
      }
    ],
    inclusions: [
      'All Airport and Ground transfers',
      'All lodging and meals as noted',
      'Private guides for island excursions',
      'Government taxes, VAT and service charges'
    ],
    exclusions: [
      'Tanzania VISA $50',
      'Extras at the hotel',
      'Tipping'
    ]
  },
  {
    id: 'kilimanjaro-marangu-6',
    title: '6 Days Kilimanjaro Trek Marangu Route',
    price: '$950',
    currency: 'USD',
    location: 'Mount Kilimanjaro, Tanzania',
    rating: 5,
    image: '/image/-418.jpg',
    description: 'The Marangu Route is one of the most popular routes to the summit of Kilimanjaro, offering hut accommodation.',
    duration: '7 Days',
    difficulty: 'Challenging',
    category: 'Snow',
    highlights: ['Uhuru Peak Summit', 'Maundi Crater', 'Diverse Habitats', 'Hut Accommodation'],
    itinerary: [
      { 
        day: 1, 
        title: 'Arrival', 
        description: 'Pick up and transfer to the Keys Hotel. Pre-trek orientation.',
        details: { lodging: 'Keys Hotel' }
      },
      { 
        day: 2, 
        title: 'National Park Gate to Mandara Hut', 
        description: 'Drive to Kilimanjaro National Park entrance. Walk through rainforest to Mandara camp. Side trip to Maundi Crater for altitude adjustment.',
        details: { 
          elevation: '1860m/6100ft to 2700m/8875ft',
          distance: '8km/5mi',
          hikingTime: '3-4 hours',
          habitat: 'Montane Forest',
          meals: 'Lunch/ Dinner (LD)',
          lodging: 'Mandara Hut'
        }
      },
      { 
        day: 3, 
        title: 'Mandara Hut to Horombo Hut', 
        description: 'Follow ascending path over open moorlands. Views of Mawenzi and Kibo summit. Look for giant Lobelia and Groundsel plants.',
        details: { 
          elevation: '2700m/8875ft to 3700m/12,200ft',
          distance: '12km/7.5mi',
          hikingTime: '5-6 hours',
          habitat: 'Heathland',
          meals: 'All',
          lodging: 'Horombo Hut'
        }
      },
      { 
        day: 4, 
        title: 'Horombo Hut to Kibo Hut', 
        description: 'Pass the last watering point onto the saddle of Kilimanjaro. Transition into the "Moonscape". Early dinner and preparation for summit.',
        details: { 
          elevation: '3700m/12,200ft to 4700m/15,500ft',
          distance: '9km/5.5mi',
          hikingTime: '5-6 hours',
          habitat: 'Alpine Desert',
          meals: 'All',
          lodging: 'Kibo Hut'
        }
      },
      { 
        day: 5, 
        title: 'Kibo Hut to Summit, descend to Horombo Hut', 
        description: 'Midnight departure for summit. Steep ascent to Gilman\'s point and then Uhuru Peak (5895m), the highest point in Africa. Descent to Horombo encampment.',
        details: { 
          elevation: '4700 to 5895 to 3700m',
          distance: '6km up, 15km down',
          hikingTime: '10-12 hours',
          habitat: 'Alpine Desert',
          meals: 'All',
          lodging: 'Horombo Camp'
        }
      },
      { 
        day: 6, 
        title: 'Horombo Hut to Trail Head, drive to Moshi', 
        description: 'Steady descent through moorland and rainforest path to Marangu gate. Vehicle transfer back to hotel.',
        details: { 
          elevation: '3700m/12,200ft to 1700m/5500ft',
          distance: '20km/12.5mi',
          hikingTime: '4-5 hours',
          habitat: 'Forest',
          meals: 'All'
        }
      },
      { 
        day: 7, 
        title: 'Departure', 
        description: 'Drop at Kilimanjaro International airport or extend stay.' 
      }
    ],
    inclusions: [
      'Accommodation on Mountain huts',
      '2 NIGHT accommodation before and after',
      'Professional mountain guides',
      'All Park and Rescue fees',
      'All meals while on Mountain',
      'Arrival and Departure transfers',
      'Mess hut/tents with tables and chairs',
      'Clean, purified drinking water'
    ],
    exclusions: [
      'Tanzania Visa $50',
      'Personal Expenses',
      'Optional Tours',
      'Tips',
      'Special high-altitude insurance',
      'Equipment and clothing (Available on rent)'
    ]
  },
  {
    id: 'kilimanjaro-rongai-6',
    title: '6 Days Kilimanjaro Trekking Rongai route',
    price: '$1,100',
    currency: 'USD',
    location: 'Mount Kilimanjaro, Tanzania',
    rating: 5,
    image: '/image/-047.jpg',
    description: 'The Rongai route begins at the remote northern side of Kilimanjaro near the Kenyan border. It offers a true wilderness experience and a more gradual ascent.',
    duration: '8 Days',
    difficulty: 'Challenging',
    category: 'Snow',
    highlights: ['Northern Slopes', 'Jagged Mawenzi Peak', 'Barren Desert Saddle', 'Gradual Ascent'],
    itinerary: [
      { day: 1, title: 'Arrive in Moshi', description: 'Private transfer from JRO airport to Moshi. Pre-climb briefing and equipment check at the hotel.' },
      { day: 2, title: 'Rongai One', description: 'Climb begins from Nale Moru (1,950 m) through fields of maize and potatoes before entering the pine forest. Track winds consistently through attractive forest sheltering Colobus monkeys.', details: { elevation: '1950m to 2600m', hikingTime: '3-4 hours', habitat: 'Forest/Moorland', lodging: 'Rongai One Camp' } },
      { day: 3, title: 'Kikelewa campsite', description: 'Morning walk is a steady ascent to Second Cave (3,450 m) with superb views of Kibo. Strike out across moorland toward the jagged peaks of Mawenzi.', details: { elevation: '2600m to 3600m', hikingTime: '6-7 hours', habitat: 'Moorland', lodging: 'Kikelewa Camp' } },
      { day: 4, title: 'Mawenzi Tarn', description: 'Short but steep climb rewarded by superball-roundd views. Tangible sense of wilderness beneath towering spires of Mawenzi. Afternoon free for acclimatization.', details: { elevation: '4330m', hikingTime: '3-4 hours', habitat: 'Alpine Desert', lodging: 'Mawenzi Tarn' } },
      { day: 5, title: 'Kibo campsite', description: 'Cross the lunar desert of the ‘Saddle’ between Mawenzi and Kibo peaks. Preparation for the final ascent.', details: { elevation: '4700m', hikingTime: '5-6 hours', habitat: 'Alpine Desert', lodging: 'Kibo Camp' } },
      { day: 6, title: 'Gillman’s Point & Uhuru Peak', description: 'Final steepest climb by torchlight at 1 a.m. Spectacular sunrise over Mawenzi. Round trip to Uhuru Peak (5896m) passing glaciers.', details: { elevation: '5896m to 3720m', hikingTime: '11-15 hours', habitat: 'Arctic/Moorland', lodging: 'Horombo Hut' } },
      { day: 7, title: 'Marangu Gate', description: 'Steady descent through moorland to Mandara Hut (2,700m). Continue through lovely lush forest to Marangu Gate. Transfer to Moshi.', details: { elevation: '3720m to 1830m', hikingTime: '5-6 hours', habitat: 'Forest', lodging: 'Moshi' } },
      { day: 8, title: 'Departure', description: 'After breakfast, transfer to Kilimanjaro Airport (JRO). Option to extend for safari or relax in Indian Ocean.' }
    ],
    inclusions: ['Pre/Post trek Moshi hotel', 'Waterproof 4-season tents', 'Professional guides', 'Park & Rescue fees', 'All mountain meals', 'Airport transfers', 'Emergency Oxygen', 'Summit certificate', 'Private chemical flush toilets'],
    exclusions: ['Tanzania Visa $50', 'Personal Expenses', 'Optional Tours', 'Tips', 'High-altitude insurance', 'Equipment rental']
  },
  {
    id: 'kilimanjaro-machame-6',
    title: '6 Days Kilimanjaro Machame Route',
    price: '$1,299',
    currency: 'USD',
    location: 'Mount Kilimanjaro, Tanzania',
    rating: 5,
    image: '/image/-234.jpg',
    description: 'The Machame route, also known as the "Whiskey route", is a scenic but physically demanding journey through diverse ecological zones.',
    duration: '8 Days',
    difficulty: 'Extreme',
    category: 'Snow',
    highlights: ['Rainforest Ascent', 'Shira Plateau', 'Lava Tower', 'Barranco Wall', 'Uhuru Peak'],
    itinerary: [
      { day: 1, title: 'Machame Gate to Machame Camp', description: 'Drive to Machame Gate through Machame village. Walk through rain forest on a winding trail up a ridge. Trail can be muddy and slippery.', details: { elevation: '1830m to 3050m', distance: '11km', hikingTime: '5-6 hours', habitat: 'Montane Forest', lodging: 'Machame Camp' } },
      { day: 2, title: 'Machame Camp to Shira Camp', description: 'Leave forest glades and continue on ascending path, crossing the valley along a steep rocky ridge. Turn west onto a river gorge.', details: { elevation: '3050m to 3850m', distance: '5km', hikingTime: '4-5 hours', habitat: 'Moorland', lodging: 'Shira Camp' } },
      { day: 3, title: 'Lava Tower & Barranco Camp', description: 'Direction changes South East towards Lava Tower ("Shark’s Tooth"). Descent to Barranco Camp for important acclimatization.', details: { elevation: '3850m to 4000m', distance: '10km', hikingTime: '5-6 hours', habitat: 'Semi-desert', lodging: 'Barranco Camp' } },
      { day: 4, title: 'Barranco Wall to Barafu Camp', description: 'Steep ridge up Barranco Wall (4250m) through Karanga Valley. Complete the South Circuit with views of the summit from many angles.', details: { elevation: '4000m to 4700m', distance: '9km', hikingTime: '6-8 hours', habitat: 'Alpine Desert', lodging: 'Barafu Camp' } },
      { day: 5, title: 'Summit Day & Mweka Camp', description: 'Midnight ascent through heavy scree to Stella Point. Continue 1-hour to Uhuru Peak. Descent straight down to Mweka Camp.', details: { elevation: '4700m to 5895m to 3090m', distance: '18km', hikingTime: '10-13 hours', habitat: 'Arctic/Forest', lodging: 'Mweka Camp' } },
      { day: 6, title: 'Mweka Gate to Moshi', description: 'Final descent through forest to Mweka Park Gate for certificates. Drive back to hotel in Moshi/Arusha.', details: { elevation: '3090m to 1680m', distance: '10km', hikingTime: '3-4 hours', habitat: 'Forest', lodging: 'Outpost Lodge' } },
      { day: 7, title: 'Departure', description: 'Transfer to Airport.' }
    ],
    inclusions: ['Waterproof tents', 'Professional guides', 'Park & Rescue fees', 'All mountain meals', 'Airport transfers', 'Porters', 'Hotel in Arusha/Moshi', 'Sleeping Mattress'],
    exclusions: ['Visa $50', 'Personal Expenses', 'Optional Tours', 'Tips', 'Insurance', 'Equipment rental']
  },
  {
    id: 'kilimanjaro-machame-7',
    title: '7 Days Hike Via Machame Route',
    price: '$1,500',
    currency: 'USD',
    location: 'Mount Kilimanjaro, Tanzania',
    rating: 5,
    image: '/image/-440.jpg',
    description: 'The 7-day Machame route adds an extra day at Karanga Camp for superior acclimatization, significantly increasing summit success rates.',
    duration: '9 Days',
    difficulty: 'Extreme',
    category: 'Snow',
    highlights: ['Acclimatization Day', 'Barranco Wall', 'Stella Point Sunrise', 'Uhuru Peak', 'Diverse Habitats'],
    itinerary: [
      { day: 1, title: 'Arrival', description: 'Arrival at Kilimanjaro International airport. Pick up and transfer to the Hotel for pre-trek orientation.' },
      { day: 2, title: 'Machame Gate to Machame Camp', description: 'Drive to National Park Gate. Hike through rain forest on a winding trail up a ridge.', details: { elevation: '1830m to 3050m', distance: '11km', hikingTime: '5-6 hours', habitat: 'Montane Forest', lodging: 'Machame Camp' } },
      { day: 3, title: 'Machame Camp to Shira Camp', description: 'Ascend along a steep rocky ridge. Turn west onto a river gorge until arriving at Shira campsite.', details: { elevation: '3050m to 3850m', distance: '5km', hikingTime: '4-5 hours', habitat: 'Moorland', lodging: 'Shira Camp' } },
      { day: 4, title: 'Shira Camp to Lava Tower to Barranco Camp', description: 'Hike east up a ridge, then South East to Lava Tower. Descend to Barranco for acclimatization.', details: { elevation: '3850m to 4000m', distance: '10km', hikingTime: '5-6 hours', habitat: 'Semi-desert', lodging: 'Barranco Camp' } },
      { day: 5, title: 'Barranco to Karanga Camp', description: 'Climb the steep Barranco Wall to Karanga Valley. Short hiking day for energy conservation.', details: { elevation: '4000m to 4050m', distance: '5km', hikingTime: '3-4 hours', habitat: 'Alpine Desert', lodging: 'Karanga Camp' } },
      { day: 6, title: 'Karanga to Barafu Camp', description: 'Final approach to base camp. Prepare for the midnight summit attempt.', details: { elevation: '4050m to 4700m', distance: '4km', hikingTime: '3-4 hours', habitat: 'Alpine Desert', lodging: 'Barafu Camp' } },
      { day: 7, title: 'Summit & Mweka Camp', description: 'Midnight departure for summit. Magnificent sunrise at Stella Point. Uhuru Peak (5895m). Descent to Mweka.', details: { elevation: '4700m to 5895m to 3090m', distance: '18km', hikingTime: '10-13 hours', habitat: 'Arctic/Forest', lodging: 'Mweka Camp' } },
      { day: 8, title: 'Mweka Gate to Moshi', description: 'Final descent to gate. Receive certificates. Drive back to hotel in Moshi.', details: { elevation: '3090m to 1680m', distance: '10km', hikingTime: '3-4 hours', habitat: 'Forest' } },
      { day: 9, title: 'Departure', description: 'Transfer to Airport for flight home or safari extension.' }
    ],
    inclusions: ['2 nights hotel', 'Professional guides', 'Park & Rescue fees', 'All mountain meals', 'Mess tents', 'Purified water', 'Crater fees'],
    exclusions: ['Visa $50', 'Personal Expenses', 'Tips', 'Insurance', 'Equipment rental']
  },
  {
    id: 'kilimanjaro-marangu-8',
    title: '8 Days Kilimanjaro Trek Marangu Route',
    price: '$1,300',
    currency: 'USD',
    location: 'Mount Kilimanjaro, Tanzania',
    rating: 5,
    image: '/image/-445.jpg',
    description: 'The 8-day Marangu route provides the most comfortable and successful ascent with hut accommodation and two acclimatization days.',
    duration: '8 Days',
    difficulty: 'Challenging',
    category: 'Snow',
    highlights: ['Hut Accommodation', 'Zebra Rock', 'Maundi Crater', 'Uhuru Peak Summit'],
    itinerary: [
      { day: 1, title: 'Arrival', description: 'Arrival at JRO airport. Transfer to Keys Hotel for pre-trek orientation.', details: { lodging: 'Keys Hotel' } },
      { day: 2, title: 'Mandara Hut', description: 'Hike through rainforest. Side trip to Maundi Crater for altitude adjustment.', details: { elevation: '1860m to 2700m', distance: '8km', hikingTime: '3-4 hours', habitat: 'Montane Forest', lodging: 'Mandara Hut' } },
      { day: 3, title: 'Horombo Hut', description: 'Follow ascending path over open moorlands. Views of Mawenzi and Kibo peaks.', details: { elevation: '2700m to 3700m', distance: '12km', hikingTime: '5-6 hours', habitat: 'Heathland', lodging: 'Horombo Hut' } },
      { day: 4, title: 'Acclimatization Day', description: 'Free Extra Day at Horombo. Visit Zebra Rock for acclimatization.', details: { lodging: 'Horombo Hut' } },
      { day: 5, title: 'Kibo Hut', description: 'Cross the saddle of Kilimanjaro between Kibo and Mawenzi. Early dinner and sleep.', details: { elevation: '3700m to 4700m', distance: '9km', hikingTime: '5-6 hours', habitat: 'Alpine Desert', lodging: 'Kibo Hut' } },
      { day: 6, title: 'Summit & Horombo', description: 'Midnight departure for Uhuru Peak (5895m). Spectacular views at every turn. Descend to Horombo.', details: { elevation: '4700m to 5895m to 3700m', distance: '21km', hikingTime: '10-12 hours', habitat: 'Arctic/Alpine Desert', lodging: 'Horombo Camp' } }
    ],
    inclusions: ['Mountain huts', '2 nights hotel', 'Professional guides', 'Park & Rescue fees', 'All mountain meals', 'Transfers', 'Purified water'],
    exclusions: ['Visa $50', 'Personal Expenses', 'Tips', 'Equipment rental']
  },
  {
    id: 'bhutan-meditation-10',
    title: '10 Days Bhutan Inner Silence Meditation Journey',
    price: '$1,499',
    currency: 'USD',
    location: 'Bhutan',
    rating: 5,
    image: '/image/-512.jpg',
    description: 'A journey into self-discovery. Practice yoga with 360-degree views, meditate with monks, and walk through rhododendron forests in the Land of the Thunder Dragon.',
    duration: '10 Days',
    difficulty: 'Easy',
    category: 'Himalayan',
    highlights: ['Buddha Dordenma', 'Tiger’s Nest (Taktsang)', 'Monk Meditation', 'Shinrin Yoku', 'Sound Bath'],
    itinerary: [
      { day: '1-3', title: 'Thimphu: Spiritual Awakening', description: 'Soar over Himalayas. Visit Textile and Folk Heritage museums. Meditate at Buddha Dordenma. Traditional cultural program. Zen walking and outdoor silent meditation.', details: { lodging: 'Thimphu Hotel' } },
      { day: '3-5', title: 'Punakha: Flow and Energy', description: 'Drive through Dochu La Pass (108 stupas). Yoga overlooking valleys. Hike to Chimi Lhakhang. Laughter Yoga and Sun Salutations at Punakha Dzong.', details: { lodging: 'Punakha Hotel' } },
      { day: '5-7', title: 'Gangtey: Mindful Immersion', description: 'Visit Gangtey Monastery. Mindful "Forest Bathing" in pine forests. Sound bath with Tibetan singing bowls. Meditation session with 300 monks.', details: { lodging: 'Gangtey Hotel' } },
      { day: '7-9', title: 'Paro: The Sacred Path', description: 'Visit local farmhouse. Stop at Kyichu Lhakhang (oldest temple). Epic hike to Tiger’s Nest (Taktsang) monastery. Closing wellness session.', details: { lodging: 'Paro Hotel' } },
      { day: 10, title: 'Departure', description: 'Wonderful journey ends. Drive to Paro Airport for flight onwards.' }
    ],
    inclusions: [
      'Private yoga & meditation sessions',
      'All accommodation (Thimphu, Punakha, Gangtey, Paro)',
      'Expert spiritual guides',
      'Monastery entry fees',
      'Airport transfers',
      'Vegan & Mindful dining plan',
      'Tibetan singing bowl session'
    ],
    exclusions: [
      'International flights',
      'Bhutan Visa fee',
      'Personal wellness treatments',
      'Tips for guides',
      'Travel insurance'
    ]
  },
  {
    id: 'everest-basecamp-15',
    title: '15 Days Life Transformational Everest Basecamp Trek',
    price: '$1,200',
    currency: 'USD',
    location: 'Everest Region, Nepal',
    rating: 5,
    image: '/image/EverestBasecampTrek.jpg',
    description: 'A life-transforming 15-day journey to the base of the world\'s highest peak. Designed for proper acclimatization and a complete cultural immersion in the Himalayas.',
    duration: '15 Days',
    difficulty: 'Extreme',
    category: 'Himalayan',
    highlights: ['Everest Base Camp (5364m)', 'Kala Pathar Sunrise', 'Namche Bazaar', 'Tengboche Monastery', 'Sherpa Culture'],
    itinerary: [
      { day: 1, title: 'Arrival in Kathmandu', description: 'Airport pickup and transfer to hotel. Traditional Nepali dinner and cultural program with local folk dance.' },
      { day: 2, title: 'Kathmandu Sightseeing', description: 'Full day at leisure to explore UNESCO Heritage sites like Durbar Square, Boudhanath, and Swayambhunath.' },
      { day: 3, title: 'Fly to Lukla & Trek to Phakding', description: 'Scenic flight to Lukla (2800m). Begin trekking to Phakding alongside spectacular views.', details: { elevation: '2800m to 2652m', hikingTime: '3-4 hours', lodging: 'Lodge in Phakding' } },
      { day: 4, title: 'Trek to Namche Bazaar', description: 'Cross Dudhkoshi River and hanging bridges. Enter Everest National Park at Jorsale.', details: { elevation: '2652m to 3446m', hikingTime: '6-7 hours', lodging: 'Lodge in Namche Bazaar' } },
      { day: 5, title: 'Acclimatization Walk', description: 'Hike to Mt. Everest View Point (3870m) for sunrise. Visit Sherpa museum and monasteries.', details: { elevation: '3446m to 3870m', hikingTime: '3 hours', lodging: 'Lodge in Namche Bazaar' } },
      { day: 6, title: 'Walk to Khumjung', description: 'Visit the capital of Sherpas, Sir Edmund Hillary school, and monastery with yeti scalp.', details: { elevation: '3446m to 3780m', lodging: 'Lodge in Namche Bazaar' } },
      { day: 7, title: 'Trek to Tengboche', description: 'Steep uphill trek through rhododendron forests. Visit the famous Tengboche Monastery.', details: { elevation: '3860m', hikingTime: '6 hours', habitat: 'Forest', lodging: 'Lodge in Tengboche' } },
      { day: 8, title: 'Trek to Dingboche', description: 'Path alongside the valley. Pass Pangboche and see ancient limestone caves.', details: { elevation: '3860m to 4410m', hikingTime: '6-7 hours', lodging: 'Lodge in Dingboche' } },
      { day: 9, title: 'Trek to Lobuche', description: 'Steep route uphill passing memorials of climbers. Views of Mt. Pumori and Khumbu Glacier.', details: { elevation: '4410m to 4930m', hikingTime: '6-8 hours', habitat: 'Alpine Desert', lodging: 'Lodge in Lobuche' } },
      { day: 10, title: 'Trek to EBC & Gorakshep', description: 'Reach Gorakshep, then continue to Everest Base Camp (5364m). Return to Gorakshep for night.', details: { elevation: '4930m to 5364m to 5170m', hikingTime: '7-8 hours', habitat: 'Glacier', lodging: 'Lodge in Gorakshep' } },
      { day: 11, title: 'Kala Pathar & Lobuche', description: 'Sunrise hike to Kala Pathar (5540m) for the best Everest view. Descend to Lobuche.', details: { elevation: '5170m to 5540m to 4940m', hikingTime: '9 hours', lodging: 'Lodge in Lobuche' } },
      { day: 12, title: 'Trek to Tengboche', description: 'Resume descent towards Tengboche. Easier breathing as altitude decreases.', details: { elevation: '4940m to 3860m', hikingTime: '8-9 hours', lodging: 'Lodge in Tengboche' } },
      { day: 13, title: 'Trek to Jorsale', description: 'Moderate trek descending to Jorsale via Namche Bazaar.', details: { elevation: '3860m to 3000m', hikingTime: '5-6 hours', lodging: 'Lodge in Jorsale' } },
      { day: 14, title: 'Back to Lukla & Kathmandu', description: 'Final trek to Lukla, then catch a scenic flight back to Kathmandu.', details: { elevation: '3000m to 2800m to 1400m', hikingTime: '4-5 hours', lodging: 'Hotel in Kathmandu' } },
      { day: 15, title: 'Departure', description: 'Airport drop-off for flight back home with golden memories.' }
    ],
    inclusions: [
      'Airport pickup & drop in KTM',
      'BB accommodation in Kathmandu',
      'KTM-Lukla-KTM air fare',
      'Lodge accommodation during trek',
      'All meals (B, L, D) and Tea/Coffee',
      'National Park & TIMS fees',
      'Porter (1 for 2 members, 15kg limit)',
      'Professional Guide & Co-guide',
      'Traditional Nepali Dinner & Program'
    ],
    exclusions: [
      'International flights',
      'Nepal Visa fee',
      'Personal trekking gear',
      'Hot shower & battery charging fees',
      'Tips for guides and porters',
      'Travel & Medical Insurance'
    ]
  }
];
