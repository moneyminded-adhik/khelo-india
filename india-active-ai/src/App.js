import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, Home, Play, Camera, Trophy, Zap, MapPin, Target, Utensils, 
  Brain, Shield, Menu, Clock, CheckCircle, Clipboard, Award, Languages, 
  Mic, ArrowRight, TrendingUp, AlertCircle, ChevronRight, User, Swords, 
  MessageSquare, BarChart2, Share2, X, Calendar, Droplets, Moon, Flame,
  Search, Dumbbell, Send, Volume2, Plus, LineChart, Timer, ExternalLink,
  Settings, Info, History, Maximize2, Lock, Unlock, Hammer, Check, ArrowDownToLine, Share
} from 'lucide-react';
import { 
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, 
  PolarRadiusAxis, Radar, Tooltip, BarChart, Bar, XAxis, YAxis, Cell,
  AreaChart, Area, LineChart as ReLineChart, Line, CartesianGrid, Legend
} from 'recharts';

/**
 * ===================================================================
 * 🇮🇳 INDIA ACTIVE - PERFORMANCE AUTHORITY (v17.2 GLOBAL LOCALIZATION)
 * ===================================================================
 * DESCRIPTION:
 * A comprehensive Progressive Web App (PWA) designed to democratize 
 * Olympic-level sports coaching for Tier-3 Indian athletes using Edge AI.
 * * CORE ARCHITECTURE UPGRADES (v17.2):
 * - UI/UX: Sidebar Navigation implemented for Bookings Management.
 * - Infrastructure: Finish Session UX optimized.
 * - Intelligence: Comprehensive System-wide Hindi/English Translation.
 * ===================================================================
 */

// ==========================================
// 1. DATA MODELS & STATE CONSTANTS
// ==========================================

const USER_DATA = {
  name: "Viraj Sharma",
  tier: "Tier-3 (Ranchi)",
  level: 4, 
  scoutReadiness: 68,
  stats: [
    { subject: 'Speed', A: 85, B: 70, C: 95, raw: "20m: 2.8s" },
    { subject: 'Power', A: 70, B: 60, C: 85, raw: "VJ: 45cm" },
    { subject: 'Agility', A: 90, B: 75, C: 95, raw: "T-Drill: 12.0s" },
    { subject: 'Coord', A: 60, B: 65, C: 80, raw: "Wall Toss: 15" },
    { subject: 'Stamina', A: 80, B: 55, C: 90, raw: "600m: 1:45s" },
  ]
};

const METRICS_DB = {
  physical: [
    { id: 'p1', label: 'Agility (T-Drill)', unit: 'sec', you: 12.00, avg: 13.14, betterIs: 'lower', max: 20, history: [14.2, 13.1, 12.0] },
    { id: 'p2', label: 'Vertical Jump', unit: 'cm', you: 45.0, avg: 35.0, betterIs: 'higher', max: 60, history: [32, 38, 45] },
  ],
  technical: [
    { id: 't1', label: 'Snatch Form', unit: '%', you: 82, avg: 65, betterIs: 'higher', max: 100, history: [40, 60, 82] },
    { id: 't2', label: 'Javelin Release', unit: 'deg', you: 42, avg: 35, betterIs: 'higher', max: 45, history: [30, 38, 42] }
  ],
  cognitive: [
     { id: 'c1', label: 'Reaction Time', unit: 'ms', you: 210, avg: 245, betterIs: 'lower', max: 500, history: [260, 240, 210] },
     { id: 'c2', label: 'Spatial Sense', unit: 'pts', you: 88, avg: 72, betterIs: 'higher', max: 100, history: [70, 80, 88] }
  ]
};

const SPORTS_ACADEMY = {
  weightlifting: {
    title: "Weightlifting", icon: "🏋️", color: "bg-slate-900", progress: 60,
    modules: [
      { id: 'w1', title: "Snatch: Start Posture", type: "ai_drill", focus: "Spine Alignment", tags: ["Posture", "Spine"], locked: false },
      { id: 'w2', title: "The First Pull", type: "video", duration: "6:45", tags: ["Technique", "Power"], locked: false, videoId: "PJxwIEAboJ8" },
      { id: 'w3', title: "Clean: Rack Position", type: "video", duration: "8:00", tags: ["Elbows", "Grip"], locked: false, videoId: "p-sTqT2wBqk" },
      { id: 'w4', title: "Jerk: Dip & Drive", type: "ai_drill", focus: "Vertical Force", tags: ["Power"], locked: true },
      { id: 'w5', title: "Overhead Stability", type: "video", duration: "5:30", tags: ["Shoulder", "Balance"], locked: true, videoId: "m8B2Q6iX8g4" }
    ]
  },
  javelin: {
    title: "Javelin", icon: "🏹", color: "bg-teal-600", progress: 40,
    modules: [
      { id: 'j1', title: "Grip Varieties", type: "video", duration: "4:20", tags: ["Basics"], locked: false, videoId: "1pE13Yt0qE4" },
      { id: 'j2', title: "Crossover Steps (Impulse)", type: "video", duration: "6:45", tags: ["Footwork"], locked: false, videoId: "8e9Q5g6hPqI" },
      { id: 'j3', title: "Release Physics (45°)", type: "ai_drill", focus: "Arm Angle", tags: ["Biomechanics"], locked: true },
      { id: 'j4', title: "The Block Leg", type: "ai_drill", focus: "Knee Stability", tags: ["Power Transfer"], locked: true },
      { id: 'j5', title: "Recovery Phase", type: "video", duration: "3:15", tags: ["Safety"], locked: true, videoId: "2c8G4H_2u9w" }
    ]
  },
  cricket: {
    title: "Cricket", icon: "🏏", color: "bg-blue-600", progress: 80,
    modules: [
      { id: 'c1', title: "Pace Bowling: Seam Position", type: "video", duration: "5:20", tags: ["Skill"], locked: false, videoId: "1i_O1uK3E_E" },
      { id: 'c2', title: "Batting: Cover Drive", type: "ai_drill", duration: "10 mins", tags: ["Footwork"], locked: false },
      { id: 'c3', title: "Spin: Wrist Cock", type: "video", duration: "6:10", tags: ["Technique"], locked: false, videoId: "1v0E_L7kQ_c" },
      { id: 'c4', title: "Fielding: Long Barrier", type: "video", duration: "4:00", tags: ["Defense"], locked: false, videoId: "_oZ-H9L9S2U" },
      { id: 'c5', title: "Pull Shot Mechanics", type: "ai_drill", duration: "12 mins", tags: ["Reaction"], locked: true }
    ]
  }
};

const NUTRITION_PLANS = [
  { id: 'n1', title: "Desi Power Sattu", desc: "50g Sattu + Jaggery + Water. Instant glycogen.", macros: "24g Protein • 320 kcal", sport: "Weightlifting/Kabaddi", icon: "🥤", locked: false,
    recipe: ["Take 50g (approx 3-4 tbsp) of roasted Chana Sattu in a large glass.", "Add 1 tbsp of crushed Jaggery (Gur) and a pinch of black salt for electrolytes.", "Pour 300ml of cold water and squeeze half a fresh lemon into the mix.", "Stir vigorously until no lumps remain. Consume within 30 mins post-workout."]
  },
  { id: 'n2', title: "Ragi Ambali (Malt)", desc: "Finger millet flour with buttermilk. Cooling and dense.", macros: "High Calcium • 210 kcal", sport: "Athletics/Endurance", icon: "🥣", locked: false,
    recipe: ["Mix 2 tbsp of Ragi (finger millet) flour in half a cup of water to form a smooth paste.", "Boil 1 cup of water in a pan and slowly stir in the paste to prevent lump formation.", "Cook on medium flame for 3-5 mins until it thickens, then let it cool completely.", "Stir in 1 cup of fresh buttermilk (Chaas), finely chopped onions, and a pinch of cumin powder."]
  },
  { id: 'n3', title: "Kala Chana Sprout Salad", desc: "Sprouted black chickpeas with lemon and onion.", macros: "18g Protein • 280 kcal", sport: "Javelin/Wrestling", icon: "🥗", locked: false,
    recipe: ["Soak 1 cup of Kala Chana (black chickpeas) overnight, then tie in a muslin cloth for 24 hrs to sprout.", "Lightly steam the sprouted chana for 5 mins to aid digestion (optional but recommended).", "Toss the sprouts with finely chopped cucumber, tomato, green chillies, and fresh coriander.", "Dress with 1 tsp mustard oil, lemon juice, black salt, and roasted cumin powder. Mix well."]
  },
  { id: 'n4', title: "Beetroot Curd Power", desc: "Nitrate-rich beetroot grated in yogurt for O2 flow.", macros: "Probiotics • 150 kcal", sport: "Sprint/Badminton", icon: "🍲", locked: true,
    recipe: ["Wash, peel, and grate half a medium-sized fresh beetroot.", "Whisk 1 bowl (approx 150g) of fresh, thick curd (yogurt) until smooth.", "Mix the grated beetroot into the curd until it takes on a bright pink color.", "Add a tempering (tadka) of 1/2 tsp oil, mustard seeds, and curry leaves. Enjoy chilled!"]
  }
];

const ASSESSMENT_SUITE = [
  { id: 'agility', label: 'Agility', icon: <Zap size={20} />, color: 'text-yellow-500 bg-yellow-50', protocol: 'T-Drill' },
  { id: 'speed', label: 'Speed', icon: <Timer size={20} />, color: 'text-blue-500 bg-blue-50', protocol: '20m Sprint' },
  { id: 'endurance', label: 'Endurance', icon: <Activity size={20} />, color: 'text-green-500 bg-green-50', protocol: '600m Run' },
  { id: 'flex', label: 'Flexibility', icon: <ArrowRight size={20} />, color: 'text-purple-500 bg-purple-50', protocol: 'Sit & Reach' },
  { id: 'balance', label: 'Balance', icon: <Shield size={20} />, color: 'text-teal-500 bg-teal-50', protocol: 'Stork Stand' },
  { id: 'coord', label: 'Coordination', icon: <Target size={20} />, color: 'text-red-500 bg-red-50', protocol: 'Wall Toss' },
  { id: 'strength', label: 'Strength', icon: <Dumbbell size={20} />, color: 'text-indigo-500 bg-indigo-50', protocol: 'Pushups' },
  { id: 'power', label: 'Power', icon: <Flame size={20} />, color: 'text-orange-500 bg-orange-50', protocol: 'Vertical Jump' },
];

const JUGAAD_GUIDE = [
  { id: 1, title: "PVC Hurdles", cost: "₹150", material: "Old Pipes", icon: "🚧", desc: "Build professional grade hurdles using scrap PVC pipes to improve agility and jumping mechanics.", steps: ["Cut 3 pipes of 30cm length each.", "Join the pieces using 2 PVC T-connectors to form a U-shape.", "Fill the base pipes with sand for stability and seal with caps."] },
  { id: 2, title: "Sandbag Weights", cost: "₹20", material: "Rice Sack", icon: "🎒", desc: "Create adjustable weight training equipment using common grain sacks for strength conditioning.", steps: ["Procure an empty, double-layered rice or grain sack.", "Fill with dry sand (Note: 1kg = ~600ml of sand).", "Seal the top tightly with heavy-duty duct tape to prevent leaks."] },
  { id: 3, title: "Agility Ladder", cost: "₹0", material: "Tape/Chalk", icon: "🪜", desc: "Design footwork drills on any flat surface to improve coordination and quickness.", steps: ["Measure and mark 10 consecutive boxes of 40x40cm.", "Use white lime powder if training on a grass or mud ground.", "Use masking tape or chalk if training on concrete."] },
];

const PLAYFIELDS = [
  { id: 1, name: "J.N. Stadium", distance: "2.5 km", type: "Athletics", status: "Open", image: "🏟️", mapLink: "https://www.google.com/maps/place/Jawaharlal+Nehru+Stadium/" },
  { id: 2, name: "Community Ground Sec-4", distance: "0.8 km", type: "Kabaddi", status: "Open", image: "🌳", mapLink: "https://www.google.com/maps/search/?api=1&query=Community+Ground+Pilani" },
  { id: 3, name: "Birla Vidyapeeth Track", distance: "3.2 km", type: "Multi-sport", status: "Open", image: "⚽", mapLink: "https://www.google.com/maps/place/Birla+Public+School,+Pilani/" },
  { id: 4, name: "Govt School Mud Field", distance: "1.5 km", type: "Wrestling", status: "Closed", image: "🏫", mapLink: "https://www.google.com/maps/search/?api=1&query=Government+Senior+Secondary+School+Pilani" },
  { id: 5, name: "Pilani Gymkhana", distance: "4.0 km", type: "Weightlifting", status: "Open", image: "🏋️", mapLink: "https://www.google.com/maps/place/BITS+Pilani+Gymkhana/" }
];

const TRANSLATIONS = {
  en: {
    appName: "INDIA", appAccent: "ACTIVE", navHome: "HOME", navLab: "LAB", navSports: "SPORTS", navHub: "HUB",
    dailyMission: "Daily Mission", unlockScout: "Unlock Scout Review", target: "Target", protocolOfDay: "Protocol of the Day",
    req: "REQUIRED", coachTip: "Pro Tip: Sattu is a slow-release carb; drink it 2 hours before your 600m run.",
    careerPath: "Career Pathway", district: "DISTRICT", stateElite: "STATE ELITE", olympic: "OLYMPIC",
    athleteLab: "Athlete Lab", analysis: "ANALYSIS", trends: "TRENDS", multiDna: "Multi-Attribute DNA",
    natBenchmark: "NATIONAL BENCHMARK", you: "YOU", average: "AVERAGE",
    arena: "ARENA", assessment: "ASSESSMENT", nutrition: "NUTRITION", rank: "RANK", fields: "FIELDS", bookings: "BOOKINGS",
    liveChallenge: "Live Challenge", acceptChallenge: "Accept Challenge", lastBattle: "Last Battle Result",
    village: "Village", school: "School", natPathway: "National Pathway", reqScout: "Request SAI Review",
    energyBal: "Energy Balance", sportDiets: "Sport-Specific Diets",
    nearbyLabs: "Nearby Labs", sort: "SORT", filter: "FILTER", maps: "Maps", bookSlot: "Book Slot", closed: "Closed", booked: "Booked ✓",
    selectDate: "Select Date", selectTime: "Select Time Slot", confirmBooking: "Confirm Booking",
    myBookings: "My Bookings", cancel: "Cancel", noBookings: "No active bookings. Book a ground in Fields.",
    jugaadLab: "Jugaad Lab", resOpt: "Resource Optimization", postSpec: "Postural Specialization", modules: "MODULES",
    aiScouter: "AI Scouter v2", liveTelemetry: "Live Posture Telemetry", initVision: "Initialize Vision",
    preFlight: "Pre-Flight Check", engageScouter: "Engage Scouter", finish: "FINISH",
    calcIndex: "Calculate Index", bmiLogic: "Biometric Logic", menu: "Menu",
    lockedReq: "Locked (Req: 70%)", history: "History",
    jugaadDesc: "Build professional-grade training equipment using cheap, local materials. Click below for blueprints.",
    cost: "Cost", material: "Mat", constSteps: "Construction Steps", gotIt: "Got it, Building Now!",
    backToSports: "BACK TO SPORTS", masteryUnlocked: "MASTERY UNLOCKED",
    prepSteps: "Preparation Steps", letsCook: "Let's Cook",
    protocolLoaded: "Protocol Loaded", showPip: "Show PIP", hidePip: "Hide PIP",
    liveCorrection: "Live Correction", sync: "SYNC", warning: "WARNING", stable: "STABLE",
    coachLowerHips: "COACH: \"LOWER HIPS!\"", coachHoldForm: "\"Hold this form\"", coachAdjustHips: "\"Lower hips 2.4cm\"",
    sessionComplete: "Session Complete", peakMatch: "Peak Match", xpEarned: "XP Earned", estCal: "Est. Calories Burned",
    share: "Share", continueBtn: "Continue",
    levelLocked: "This career stage is currently locked. Fulfill the national benchmark requirements below to advance your profile.",
    levelUnlocked: "You have successfully achieved this athletic tier. Maintain your stats to prevent relegation.",
    benchmarksReq: "Benchmarks Required", understood: "Understood",
    transmissionComplete: "Transmission Complete", transMsg: "Your Bio-Passport and Vision Lab Telemetry have been securely routed to the SAI Dashboard. Expect a response in 72 hours.", acknowledge: "Acknowledge",
    preFlightItems: ['Mount Phone 6ft away', 'Subject in full frame', 'Adequate Lighting']
  },
  hi: {
    appName: "इंडिया", appAccent: "एक्टिव", navHome: "होम", navLab: "लैब", navSports: "खेल", navHub: "हब",
    dailyMission: "आज का मिशन", unlockScout: "स्काउट रिव्यू अनलॉक करें", target: "लक्ष्य", protocolOfDay: "आज का प्रोटोकॉल",
    req: "अनिवार्य", coachTip: "प्रो टिप: सत्तू पचने में धीमा है; 600m दौड़ से 2 घंटे पहले पिएं।",
    careerPath: "करियर पाथवे", district: "ज़िला", stateElite: "राज्य एलीट", olympic: "ओलंपिक",
    athleteLab: "एथलीट लैब", analysis: "विश्लेषण", trends: "रुझान", multiDna: "मल्टी-एट्रिब्यूट डीएनए",
    natBenchmark: "राष्ट्रीय बेंचमार्क", you: "आप", average: "औसत",
    arena: "अखाड़ा", assessment: "मूल्यांकन", nutrition: "पोषण", rank: "रैंक", fields: "मैदान", bookings: "बुकिंग",
    liveChallenge: "लाइव चुनौती", acceptChallenge: "चुनौती स्वीकार करें", lastBattle: "अंतिम मुकाबला परिणाम",
    village: "गाँव", school: "स्कूल", natPathway: "राष्ट्रीय मार्ग", reqScout: "SAI समीक्षा का अनुरोध करें",
    energyBal: "ऊर्जा संतुलन", sportDiets: "खेल-विशिष्ट आहार",
    nearbyLabs: "नज़दीकी मैदान", sort: "क्रमबद्ध", filter: "फ़िल्टर", maps: "नक्शा", bookSlot: "स्लॉट बुक करें", closed: "बंद", booked: "बुक किया ✓",
    selectDate: "तारीख चुनें", selectTime: "समय चुनें", confirmBooking: "बुकिंग पक्की करें",
    myBookings: "मेरी बुकिंग", cancel: "रद्द करें", noBookings: "कोई बुकिंग नहीं। 'मैदान' से बुक करें।",
    jugaadLab: "जुगाड़ लैब", resOpt: "संसाधन अनुकूलन", postSpec: "शारीरिक विशेषज्ञता", modules: "मॉड्यूल",
    aiScouter: "एआई स्काउट v2", liveTelemetry: "लाइव पोस्चर टेलीमेट्री", initVision: "विज़न चालू करें",
    preFlight: "प्री-फ्लाइट चेक", engageScouter: "स्काउट शुरू करें", finish: "समाप्त",
    calcIndex: "इंडेक्स निकालें", bmiLogic: "बायोमेट्रिक लॉजिक", menu: "मेनू",
    lockedReq: "लॉक (ज़रूरत: 70%)", history: "इतिहास",
    jugaadDesc: "सस्ते, स्थानीय सामग्री से पेशेवर ट्रेनिंग उपकरण बनाएं। ब्लूप्रिंट के लिए नीचे क्लिक करें।",
    cost: "लागत", material: "सामग्री", constSteps: "निर्माण के चरण", gotIt: "समझ गया, अभी बनाऊंगा!",
    backToSports: "खेलों पर वापस जाएं", masteryUnlocked: "महारत हासिल की",
    prepSteps: "तैयारी के चरण", letsCook: "चलिए पकाते हैं",
    protocolLoaded: "प्रोटोकॉल लोड किया गया", showPip: "PIP दिखाएं", hidePip: "PIP छिपाएं",
    liveCorrection: "लाइव सुधार", sync: "सिंक", warning: "चेतावनी", stable: "स्थिर",
    coachLowerHips: "कोच: \"हिप्स नीचे करो!\"", coachHoldForm: "\"यही फॉर्म बनाए रखें\"", coachAdjustHips: "\"हिप्स 2.4cm नीचे करें\"",
    sessionComplete: "सत्र समाप्त", peakMatch: "पीक मैच", xpEarned: "प्राप्त XP", estCal: "अनुमानित कैलोरी बर्न",
    share: "साझा करें", continueBtn: "आगे बढ़ें",
    levelLocked: "यह करियर स्तर अभी लॉक है। आगे बढ़ने के लिए राष्ट्रीय बेंचमार्क आवश्यकताओं को पूरा करें।",
    levelUnlocked: "आपने यह एथलेटिक स्तर सफलतापूर्वक प्राप्त कर लिया है। अपनी स्थिति बनाए रखें।",
    benchmarksReq: "आवश्यक बेंचमार्क", understood: "समझ गया",
    transmissionComplete: "ट्रांसमिशन पूरा हुआ", transMsg: "आपका बायो-पासपोर्ट और विज़न लैब डेटा SAI डैशबोर्ड पर सुरक्षित रूप से भेज दिया गया है। 72 घंटों में प्रतिक्रिया की अपेक्षा करें।", acknowledge: "स्वीकार करें",
    preFlightItems: ['फोन को 6 फीट दूर रखें', 'पूरा शरीर फ्रेम में हो', 'पर्याप्त रोशनी']
  }
};

// ==========================================
// 2. GLOBAL UI COMPONENTS (Nav, Header, Modals)
// ==========================================

const GlobalToast = ({ msg }) => {
  if (!msg) return null;
  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[200] animate-fade-in pointer-events-none">
      <div className="bg-slate-900/90 backdrop-blur-md text-white px-6 py-3 rounded-full shadow-2xl border border-slate-700/50 flex items-center gap-3 w-max max-w-[90vw]">
        <Lock size={14} className="text-orange-500 flex-shrink-0" />
        <span className="text-xs font-bold tracking-wide">{msg}</span>
      </div>
    </div>
  );
};

const NavBtn = ({ icon: Icon, label, active, onClick }) => (
  <button onClick={onClick} className={`flex flex-col items-center w-12 transition-all duration-300 ${active ? 'text-blue-600 scale-110' : 'text-slate-400 hover:text-slate-600'}`}>
    <Icon size={24} strokeWidth={active ? 2.5 : 2} className="mb-1" />
    <span className="text-[10px] font-bold">{label}</span>
  </button>
);

const TopBar = ({ onOpenMenu, onOpenCoach, onProfileClick, hasUnreadAlert, lang, setLang, t }) => (
  <div className="px-6 py-4 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-50/50 shadow-sm">
    <div className="flex items-center gap-3">
      <button onClick={onOpenMenu} className="bg-slate-100 p-2 rounded-full text-slate-600 shadow-inner hover:bg-slate-200 transition-colors active:scale-95">
        <Menu size={18} />
      </button>
      <span className="font-black text-xl tracking-tighter italic text-slate-900">{t.appName}<span className="text-blue-600">{t.appAccent}</span></span>
    </div>
    <div className="flex items-center gap-3">
      <button onClick={() => setLang(lang === 'en' ? 'hi' : 'en')} className="bg-slate-100 hover:bg-slate-200 transition-colors px-2.5 py-1 rounded-md shadow-inner text-[10px] font-black text-slate-700 uppercase active:scale-95">
        {lang === 'en' ? 'अ' : 'A'}
      </button>
      <button onClick={onOpenCoach} className="bg-blue-50/80 text-blue-600 p-2.5 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none transition-all relative">
        <Brain size={20} strokeWidth={2.5}/>
        {hasUnreadAlert && (
           <span className="absolute -top-1 -right-1 flex h-3 w-3">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500 border-2 border-white"></span>
           </span>
        )}
      </button>
      <button onClick={onProfileClick} className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-xs shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none transition-all border-2 border-white">
        VS
      </button>
    </div>
  </div>
);

// --- MODALS ---

const SideMenu = ({ isOpen, onClose, bookedSlots, cancelBooking, t }) => {
  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] animate-fade-in" onClick={onClose}></div>}
      <div className={`fixed top-0 left-0 bottom-0 w-3/4 max-w-[300px] bg-white z-[210] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
         <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
           <h2 className="font-black text-xl text-slate-900 tracking-tighter italic">{t.appName}<span className="text-blue-600">{t.appAccent}</span></h2>
           <button onClick={onClose} className="p-2 bg-white rounded-full text-slate-500 shadow-sm active:scale-95 border border-slate-100"><X size={18}/></button>
         </div>
         
         <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
           <div>
              <h3 className="font-black text-slate-900 text-xs uppercase tracking-widest flex items-center gap-2 mb-4"><Calendar size={14} className="text-blue-600"/> {t.myBookings}</h3>
              {Object.keys(bookedSlots).length === 0 ? (
                <div className="bg-white p-6 rounded-[24px] border border-slate-100 text-center shadow-sm">
                   <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3 border border-slate-100 shadow-inner">
                     <MapPin size={18} className="text-slate-300"/>
                   </div>
                   <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">{t.noBookings}</p>
                </div>
              ) : (
                Object.entries(bookedSlots).map(([id, booking]) => (
                  <div key={id} className="bg-white p-4 rounded-[20px] border border-slate-200 shadow-sm flex flex-col gap-3 relative z-10 mb-3 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-xl shadow-inner border border-slate-100 flex-shrink-0 drop-shadow-sm">{booking.field.image}</div>
                      <div>
                        <h4 className="font-black text-slate-900 text-xs tracking-tight leading-tight">{booking.field.name}</h4>
                        <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest mt-1 bg-blue-50 inline-block px-2 py-0.5 rounded border border-blue-100">{booking.date} | {booking.time}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => cancelBooking(id)}
                      className="w-full bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-[9px] py-2.5 rounded-xl font-black uppercase tracking-widest transition-all active:scale-95 shadow-sm">
                      {t.cancel}
                    </button>
                  </div>
                ))
              )}
           </div>
         </div>
      </div>
    </>
  );
};

const SessionSummaryModal = ({ data, onClose, t }) => {
  if (!data) return null;
  return (
    <div className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in">
       <div className="bg-white w-full max-w-sm rounded-[40px] p-8 text-center animate-slide-up shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-48 h-48 bg-green-500/10 blur-3xl rounded-full -mr-20 -mt-20"></div>
         <button onClick={onClose} className="absolute top-4 right-4 bg-slate-100 p-2 rounded-full text-slate-600 hover:bg-slate-200 transition-colors z-20"><X size={20}/></button>
         
         <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10 border-4 border-white shadow-lg">
           <Trophy className="text-green-600" size={32} />
         </div>
         <h3 className="font-black text-2xl text-slate-900 mb-1 tracking-tight relative z-10">{t.sessionComplete}</h3>
         <p className="text-sm text-slate-500 font-bold mb-8 uppercase tracking-widest relative z-10">{data.drillName}</p>
         
         <div className="grid grid-cols-2 gap-3 mb-8 relative z-10">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-inner">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{t.peakMatch}</p>
               <p className="text-2xl font-black text-blue-600">{data.matchPct}%</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 shadow-inner">
               <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest mb-1">{t.xpEarned}</p>
               <p className="text-2xl font-black text-orange-600">+{data.xp}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-inner col-span-2 flex justify-between items-center">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.estCal}</p>
               <p className="text-lg font-black text-slate-800 flex items-center gap-1"><Flame size={16} className="text-red-500"/> {data.cal} kcal</p>
            </div>
         </div>

         <div className="flex gap-3 relative z-10">
           <button className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-4 rounded-2xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 active:scale-95 shadow-sm">
             <Share size={16}/> {t.share}
           </button>
           <button onClick={onClose} className="flex-[1.5] bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-blue-600/30 active:translate-y-0.5 active:shadow-none transition-all">
             {t.continueBtn}
           </button>
         </div>
       </div>
    </div>
  );
};

const LevelMasteryModal = ({ level, onClose, t }) => {
  if (!level) return null;
  const isLocked = level.num > USER_DATA.level;
  
  return (
    <div className="fixed inset-0 z-[150] bg-black/70 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in">
      <div className="bg-white w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl relative animate-slide-up">
        <button onClick={onClose} className="absolute top-4 right-4 bg-slate-100 p-2 rounded-full text-slate-600 hover:bg-slate-200 transition-colors z-20"><X size={20}/></button>
        <div className={`h-32 flex items-center justify-center border-b ${isLocked ? 'bg-slate-100 border-slate-200' : 'bg-blue-50 border-blue-100'}`}>
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black shadow-lg border-2 border-white ${isLocked ? 'bg-slate-300 text-slate-500' : 'bg-blue-600 text-white'}`}>
             L{level.num}
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            {isLocked ? <Lock size={16} className="text-orange-500"/> : <CheckCircle size={16} className="text-green-500"/>}
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">{level.title}</h2>
          </div>
          <p className="text-sm text-slate-600 mb-6 font-medium leading-relaxed">
            {isLocked ? t.levelLocked : t.levelUnlocked}
          </p>
          
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 shadow-inner">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Target size={14}/> {t.benchmarksReq}</h4>
            <ul className="space-y-4">
              {level.reqs.map((req, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-800 font-bold items-center">
                  <div className={`w-2 h-2 rounded-full ${isLocked ? 'bg-orange-400' : 'bg-green-500'}`}></div>
                  {req}
                </li>
              ))}
            </ul>
          </div>
          <button onClick={onClose} className="w-full mt-6 bg-slate-900 hover:bg-black text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none shadow-lg shadow-slate-900/20">{t.understood}</button>
        </div>
      </div>
    </div>
  );
};

const JugaadModal = ({ item, onClose, t }) => {
  if (!item) return null;
  return (
    <div className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in">
      <div className="bg-white/95 backdrop-blur-xl w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 bg-slate-100 p-2 rounded-full text-slate-600 hover:bg-slate-200 transition-colors"><X size={20}/></button>
        <div className="bg-amber-100/80 h-32 flex items-center justify-center border-b border-amber-200/50">
          <span className="text-6xl drop-shadow-md">{item.icon}</span>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-black text-slate-900 mb-1">{item.title}</h2>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded shadow-sm">{t.cost}: {item.cost}</span>
            <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded shadow-sm">{t.material}: {item.material}</span>
          </div>
          <p className="text-sm text-slate-600 mb-5 leading-relaxed">{item.desc}</p>
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 shadow-inner">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Hammer size={14}/> {t.constSteps}</h4>
            <ul className="space-y-4">
              {item.steps.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-800 font-medium">
                  <span className="flex-shrink-0 w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-black shadow-sm">{i+1}</span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ul>
          </div>
          <button onClick={onClose} className="w-full mt-6 bg-slate-900 hover:bg-black text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none shadow-lg shadow-slate-900/20">{t.gotIt}</button>
        </div>
      </div>
    </div>
  );
};

const RecipeModal = ({ plan, onClose, t }) => {
  if (!plan) return null;
  return (
    <div className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in">
      <div className="bg-white/95 backdrop-blur-xl w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 bg-slate-100 p-2 rounded-full text-slate-600 hover:bg-slate-200 transition-colors"><X size={20}/></button>
        <div className="bg-green-100/80 h-32 flex items-center justify-center border-b border-green-200/50">
          <span className="text-6xl drop-shadow-md">{plan.icon}</span>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-black text-slate-900 mb-1">{plan.title}</h2>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] font-bold bg-orange-100 text-orange-700 px-2 py-1 rounded shadow-sm uppercase tracking-wider">{plan.macros}</span>
          </div>
          <p className="text-sm text-slate-600 mb-5 leading-relaxed">{plan.desc}</p>
          
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 shadow-inner max-h-[250px] overflow-y-auto">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Utensils size={14}/> {t.prepSteps}</h4>
            <ul className="space-y-4">
              {plan.recipe && plan.recipe.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-800 font-medium">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-black shadow-sm">{i+1}</span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ul>
          </div>
          <button onClick={onClose} className="w-full mt-6 bg-slate-900 hover:bg-black text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none shadow-lg shadow-slate-900/20">{t.letsCook}</button>
        </div>
      </div>
    </div>
  );
};

const AICoachOverlay = ({ isOpen, onClose, context, lang, t }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  // Contextual Initialization & Smart Alerts
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initialMsgs = [];
      
      // Smart Readiness Alert Logic (Triggered if 65-69%)
      if (USER_DATA.scoutReadiness >= 65 && USER_DATA.scoutReadiness <= 69) {
        initialMsgs.push({
          role: 'bot', 
          text: lang === 'hi' 
            ? `🚨 प्रो-अलर्ट: आप SAI रिव्यू के लिए चुने जाने से सिर्फ ${70 - USER_DATA.scoutReadiness}% दूर हैं! आज अपनी फुर्ती (Agility) पर ध्यान दें।`
            : `🚨 PROACTIVE ALERT: You are only ${70 - USER_DATA.scoutReadiness}% away from being flagged for SAI Review. Let's focus on Agility today.`,
          isProactive: true,
          card: { title: "Agility Accelerator", desc: "Added to Daily Mission", link: "#", isProPlan: true }
        });
      }

      initialMsgs.push({ 
        role: 'bot', 
        text: lang === 'hi' ? "नमस्ते विराज! मैं आपका AI कोच हूँ। आज ट्रेनिंग शुरू करें?" : "Namaste Viraj! I'm your AI Biomechanic Coach. How can I help you level up today?" 
      });

      setMessages(initialMsgs);
    }
  }, [isOpen, context, lang]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;
    
    setMessages(prev => [...prev, { role: 'user', text }]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = { role: 'bot', text: "I'm analyzing your request against our sports database..." };
      const lowerText = text.toLowerCase();

      const userStats = USER_DATA.stats;
      const worstStat = userStats.reduce((prev, curr) => (prev.A < curr.A) ? prev : curr);
      const bestStat = userStats.reduce((prev, curr) => (prev.A > curr.A) ? prev : curr);

      if (lowerText.includes('weakness') || lowerText.includes('improve')) {
        botResponse.text = `I accessed your Bio-Passport Data Layer.\n\n⚠️ **Analysis:** Your lowest metric is **${worstStat.subject}** (${worstStat.A}/100).\n\n**The Fix:** We should prioritize ${worstStat.subject}-specific modules today to reach National benchmarks.`;
        botResponse.card = { title: `${worstStat.subject} Correction Protocol`, desc: "Personalized AI routine loaded based on your data.", link: "#", isProPlan: true };
      } else if (lowerText.includes('diet') || lowerText.includes('food')) {
        botResponse.text = "For an athlete in Ranchi, hydration and recovery are your bottlenecks. You burn ~2800 kcal but only eat ~2200.\n\n**The Fix:** Add a dense protein source post-training.";
        botResponse.card = { title: "Desi Power Sattu", desc: "50g Sattu + Jaggery + Water. Costs ₹15. 24g Protein.", link: "#" };
      } else {
        botResponse.text = lang === 'hi' ? "मैंने इसे समझ लिया है। अपने होम टैब मिशन पर ध्यान दें।" : "I understand. I've logged this in your intelligence layer and updated your daily protocol in the Home tab. Focus on consistency.";
      }

      setIsTyping(false);
      setMessages(prev => [...prev, botResponse]);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-end justify-center animate-fade-in">
      <div className="bg-white/95 backdrop-blur-xl w-full max-w-md h-[85vh] rounded-t-[40px] shadow-2xl flex flex-col overflow-hidden animate-slide-up">
        {/* Chat Header */}
        <div className="bg-[#1e1b4b]/90 backdrop-blur-md p-6 flex justify-between items-center text-white border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-full border border-blue-400/30 shadow-inner"><Brain className="text-blue-400" /></div>
            <div>
              <h3 className="font-black tracking-tight uppercase">AI Scouter Coach</h3>
              <p className="text-[10px] text-green-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span> Connected to Data Layer
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors active:scale-90"><X size={20}/></button>
        </div>

        {/* Chat Body */}
        <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-slate-50/50">
          {messages.map((m, i) => (
            <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className="max-w-[85%] space-y-2">
                <div className={`p-4 rounded-3xl text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${m.role === 'user' ? 'bg-blue-600 text-white rounded-br-none shadow-blue-600/20' : m.isProactive ? 'bg-orange-50 border border-orange-200 text-orange-900 rounded-bl-none shadow-orange-500/10' : 'bg-white text-slate-800 border border-slate-100 rounded-bl-none'}`}>
                  {m.text}
                </div>
                {/* PRO PLAN Action Cards */}
                {m.card && (
                  <div className={`mt-2 p-4 rounded-2xl shadow-md flex items-center justify-between animate-fade-in relative overflow-hidden ${m.card.isProPlan ? 'bg-orange-50/50 border-2 border-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.15)]' : 'bg-white border border-blue-100'}`}>
                    {m.card.isProPlan && (
                       <div className="absolute top-0 left-0 bg-orange-500 text-white text-[8px] font-black px-2 py-0.5 rounded-br-lg tracking-widest z-10 shadow-sm">
                         PRO PLAN
                       </div>
                    )}
                    <div className={`flex-1 mr-4 relative z-10 ${m.card.isProPlan ? 'mt-3' : ''}`}>
                      <p className="text-xs font-black text-slate-900 mb-1">{m.card.title}</p>
                      <p className="text-[10px] text-slate-500 leading-tight">{m.card.desc}</p>
                    </div>
                    <button 
                      onClick={() => window.open(m.card.link, '_blank')}
                      className={`relative z-10 p-2 rounded-xl transition-colors active:scale-90 ${m.card.isProPlan ? 'bg-orange-100 text-orange-600 hover:bg-orange-200' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
                    >
                      <ExternalLink size={16}/>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
             <div className="flex justify-start">
               <div className="bg-slate-200/80 backdrop-blur-sm px-4 py-2 rounded-full text-xs text-slate-600 font-medium animate-pulse shadow-sm border border-slate-300">Processing telemetry...</div>
             </div>
          )}
          <div ref={scrollRef} />
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-white/90 backdrop-blur-md border-t border-slate-200/50 flex gap-2">
          <input 
            className="flex-1 bg-slate-100 rounded-full px-5 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-inner border border-slate-200 font-medium text-slate-800" 
            placeholder={lang === 'hi' ? "कोच से पूछें..." : "Try: 'What's my weakness?'"}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend} 
            className="p-4 bg-blue-600 text-white rounded-full active:translate-y-0.5 active:shadow-none transition-all shadow-lg hover:bg-blue-700 border-2 border-white"
          >
            <Send size={18}/>
          </button>
        </div>
      </div>
    </div>
  );
};

const VideoPlayerOverlay = ({ module, onClose }) => {
  if (!module) return null;
  const videoSrc = module.videoId 
    ? `https://www.youtube.com/embed/${module.videoId}?autoplay=1&rel=0`
    : `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(module.title + " sports technique")}`;

  return (
    <div className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-xl flex flex-col justify-center animate-fade-in">
      <button onClick={onClose} className="absolute top-6 right-6 text-white bg-white/10 p-2 rounded-full z-10 hover:bg-white/30 transition-colors active:scale-90"><X size={24} /></button>
      <div className="w-full aspect-video bg-slate-900 flex items-center justify-center relative shadow-[0_0_50px_rgba(0,0,0,0.5)] border-y border-white/10">
         <iframe 
           src={videoSrc} 
           title={module.title}
           className="w-full h-full"
           frameBorder="0"
           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
           allowFullScreen
         ></iframe>
      </div>
      <div className="p-6 text-white">
        <div className="flex items-center justify-between mb-2">
           <h2 className="text-2xl font-black tracking-tight">{module.title}</h2>
           <button className="text-white hover:text-blue-400 transition-colors active:scale-90"><Maximize2 size={20}/></button>
        </div>
        <div className="flex gap-2 mb-4">
           {module.tags.map(tag => <span key={tag} className="bg-white/10 border border-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{tag}</span>)}
        </div>
        <p className="text-gray-400 text-xs font-medium">Professional coaching lesson • {module.duration}</p>
      </div>
    </div>
  );
};

// --- 3. SUB-COMPONENTS (SCALES & BARS) ---

const LinearProgressionScale = ({ level, onLevelClick, t }) => {
  const levels = [
    { num: 1, title: "Village Novice", reqs: ["Complete Assessment"] },
    { num: 2, title: "Village Elite", reqs: ["Agility > 60", "Complete 1 Jugaad"] },
    { num: 3, title: "Block Prospect", reqs: ["Speed > 75", "10 Training Sessions"] },
    { num: 4, title: "District Prospect", reqs: ["Scout Readiness > 60%"] },
    { num: 5, title: "State Elite", reqs: ["Speed > 90", "600m < 1:40s", "3 Masterclasses"] },
    { num: 6, title: "National Selection", reqs: ["Scout Readiness > 85%", "SAI Verification"] },
    { num: 7, title: "Olympic Pathway", reqs: ["National Medalist Data"] }
  ];

  return (
    <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
      <div className="flex justify-between items-center mb-5 relative z-10">
        <h3 className="font-black text-slate-900 text-xs uppercase tracking-widest flex items-center gap-2"><Trophy size={14} className="text-orange-500"/> {t.careerPath}</h3>
        <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded shadow-inner border border-blue-100">Lvl {level}</span>
      </div>
      <div className="flex items-center gap-1 relative z-10">
        {levels.map(l => (
          <button 
            key={l.num} 
            onClick={() => onLevelClick(l)}
            className="flex-1 flex flex-col items-center gap-2 group outline-none"
          >
            <div className={`h-2 w-full rounded-full transition-all duration-500 shadow-inner ${l.num <= level ? 'bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.5)]' : 'bg-slate-100 group-hover:bg-slate-200'}`} />
            <span className={`text-[8px] font-black transition-colors ${l.num === level ? 'text-blue-600 scale-110' : l.num < level ? 'text-slate-500' : 'text-slate-300'}`}>L{l.num}</span>
          </button>
        ))}
      </div>
      <div className="mt-4 flex justify-between text-[8px] font-black uppercase tracking-widest text-slate-400 relative z-10">
        <span>{t.district}</span>
        <span className="text-blue-600">{t.stateElite}</span>
        <span>{t.olympic}</span>
      </div>
    </div>
  );
};

const MetricBar = ({ label, value, avg, unit, betterIs, max, t }) => {
  const valuePct = Math.min((value / max) * 100, 100);
  const avgPct = Math.min((avg / max) * 100, 100);
  const isElite = betterIs === 'higher' ? value > avg : value < avg;
  
  let badgeText = "AVG";
  let badgeColor = "bg-gray-100 text-gray-500 border-gray-200";
  if (isElite) {
    badgeText = "ELITE";
    badgeColor = "bg-green-50 text-green-700 border-green-200";
  } else if ((betterIs === 'higher' && value < avg * 0.8) || (betterIs === 'lower' && value > avg * 1.2)) {
    badgeText = "POOR";
    badgeColor = "bg-orange-50 text-orange-700 border-orange-200";
  }

  return (
    <div className="mb-5 p-4 bg-slate-50/50 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-black text-slate-800 tracking-tight">{label}</span>
        <span className={`text-[9px] font-black px-2 py-0.5 rounded shadow-sm border uppercase tracking-wider ${badgeColor}`}>{badgeText}</span>
      </div>
      
      {/* You Bar */}
      <div className="mb-2">
        <div className="flex justify-between text-[10px] mb-1">
          <span className="font-black text-blue-600 uppercase tracking-widest">{t.you}</span>
          <span className="font-black text-blue-600">{value} <span className="font-medium text-[8px]">{unit}</span></span>
        </div>
        <div className="h-3.5 w-full bg-white rounded-full overflow-hidden border border-slate-200 shadow-inner">
          <div className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-out" style={{ width: `${valuePct}%` }}></div>
        </div>
      </div>

      {/* Avg Bar */}
      <div>
        <div className="flex justify-between text-[10px] mb-1">
          <span className="font-black text-slate-400 uppercase tracking-widest">{t.average}</span>
          <span className="font-black text-slate-500">{avg} <span className="font-medium text-[8px]">{unit}</span></span>
        </div>
        <div className="h-2.5 w-full bg-white rounded-full overflow-hidden border border-slate-200 shadow-inner">
          <div className="h-full bg-slate-400 rounded-full transition-all duration-1000 ease-out opacity-50" style={{ width: `${avgPct}%` }}></div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 4. TAB SCREENS (ROUTED VIEWS)
// ==========================================

const HomeTab = ({ setActiveTab, setHubSection, t, showToast, onLevelClick }) => (
  <div className="space-y-6 pb-28 animate-fade-in p-4 pt-4">
    
    {/* Daily Mission Protocol */}
    <div className="bg-gradient-to-br from-[#1e1b4b] to-blue-900 rounded-[32px] p-6 text-white shadow-xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] transition-transform duration-1000 group-hover:scale-110 pointer-events-none"></div>
      <div className="relative z-10 flex justify-between items-start mb-4">
        <div>
           <div className="flex items-center gap-2 mb-2">
              <p className="text-blue-300 text-[10px] font-black uppercase tracking-[0.2em]">{t.dailyMission}</p>
              <span className="bg-blue-600 border border-blue-400 px-2 py-0.5 rounded text-[8px] font-black shadow-sm">L4 PATH</span>
           </div>
           <h2 className="text-2xl font-black italic tracking-tighter leading-tight max-w-[200px] drop-shadow-md">{t.unlockScout}</h2>
           <p className="text-xs text-blue-100 mt-2 font-medium bg-white/10 inline-block px-2 py-1 rounded backdrop-blur-sm border border-white/5"><span className="font-bold text-white">{t.target}:</span> 90% Match in Javelin Release.</p>
        </div>
        
        {/* Circular Progress Gauge */}
        <div className="relative w-20 h-20 flex items-center justify-center flex-shrink-0 drop-shadow-xl">
           <svg className="w-full h-full transform -rotate-90">
             <circle cx="40" cy="40" r="36" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
             <circle cx="40" cy="40" r="36" stroke="#22c55e" strokeWidth="8" fill="none" strokeDasharray="226" strokeDashoffset={226 * (1 - 0.65)} strokeLinecap="round" className="transition-all duration-1000 ease-out" />
           </svg>
           <div className="absolute text-center">
             <span className="text-xl font-black text-white">65%</span>
           </div>
        </div>
      </div>
      
      {/* Proactive Coaching Insight */}
      <div className="relative z-10 mt-2 bg-slate-900/50 backdrop-blur-md p-3 rounded-xl border border-white/10 flex items-start gap-2">
         <Info size={14} className="text-blue-300 mt-0.5 flex-shrink-0" />
         <p className="text-[10px] text-blue-100 font-medium leading-tight">{t.coachTip}</p>
      </div>
    </div>

    {/* Interactive L1-L7 Progression */}
    <LinearProgressionScale level={USER_DATA.level} onLevelClick={onLevelClick} t={t} />

    {/* Quick Action Grid */}
    <div className="grid grid-cols-4 gap-3">
      {[
        { l: t.navTrain || 'Train', i: <Camera />, c: 'bg-blue-100 text-blue-600 hover:bg-blue-200 border border-blue-200/50', a: () => setActiveTab('train') },
        { l: t.navSports || 'Learn', i: <Brain />, c: 'bg-green-100 text-green-600 hover:bg-green-200 border border-green-200/50', a: () => setActiveTab('academy') },
        { l: t.assessment || 'Tests', i: <Clipboard />, c: 'bg-purple-100 text-purple-600 hover:bg-purple-200 border border-purple-200/50', a: () => { setHubSection('assessment'); setActiveTab('hub'); } },
        { l: t.fields || 'Fields', i: <MapPin />, c: 'bg-orange-100 text-orange-600 hover:bg-orange-200 border border-orange-200/50', a: () => { setHubSection('fields'); setActiveTab('hub'); } },
      ].map((it, idx) => (
        <button key={idx} onClick={it.a} className="flex flex-col items-center gap-2 active:scale-90 transition-all group outline-none">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${it.c} shadow-sm group-hover:shadow-md transition-all shadow-inner`}>{it.i}</div>
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest group-hover:text-slate-800 transition-colors">{it.l}</span>
        </button>
      ))}
    </div>

    {/* Recommended Drill Hook */}
    <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-black text-slate-900 text-xs uppercase tracking-widest">{t.protocolOfDay}</h3>
        <span className="text-[9px] font-black text-orange-600 bg-orange-50 px-2 py-1 rounded shadow-sm border border-orange-100">{t.req}</span>
      </div>
      <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-inner hover:bg-white hover:shadow-md hover:border-blue-200 transition-all cursor-pointer active:scale-95" onClick={() => setActiveTab('train')}>
        <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm text-2xl border border-slate-100 flex-shrink-0 drop-shadow-sm">🏹</div>
        <div className="flex-1 pr-2">
          <h4 className="text-sm font-black text-slate-900 tracking-tight leading-tight mb-1">Javelin: Release Angle</h4>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Focus: 45° Vector Analysis</p>
        </div>
        <button className="text-blue-600 p-3 bg-blue-50 rounded-full shadow-sm hover:bg-blue-600 hover:text-white transition-colors border border-blue-100"><Play size={16} fill="currentColor" /></button>
      </div>
    </div>
  </div>
);

const MetricsTab = ({ t }) => {
  const [activeSub, setActiveSub] = useState('physical');
  const [view, setView] = useState('current');
  const [showBenchmark, setShowBenchmark] = useState(false);

  return (
    <div className="space-y-6 pb-28 animate-fade-in p-4 pt-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black italic tracking-tighter uppercase text-slate-900 drop-shadow-sm">{t.athleteLab}</h1>
        <div className="flex bg-slate-100/80 backdrop-blur-sm p-1 rounded-xl shadow-inner border border-slate-200">
          <button onClick={() => setView('current')} className={`px-4 py-1.5 rounded-lg text-[10px] font-black transition-all ${view === 'current' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}>{t.analysis}</button>
          <button onClick={() => setView('history')} className={`px-4 py-1.5 rounded-lg text-[10px] font-black transition-all ${view === 'history' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}>{t.trends}</button>
        </div>
      </div>

      {/* Spider Chart DNA */}
      <div className="bg-gradient-to-br from-[#1e1b4b] to-indigo-900 p-6 rounded-[32px] text-white relative overflow-hidden shadow-2xl border border-slate-800">
        <div className="flex justify-between items-center mb-4 relative z-10">
          <h3 className="font-black text-blue-300 text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 drop-shadow-md"><Target size={14}/> {t.multiDna}</h3>
          <button onClick={() => setShowBenchmark(!showBenchmark)} className={`text-[8px] font-black px-2 py-1.5 rounded shadow-sm border transition-all active:scale-95 ${showBenchmark ? 'bg-yellow-500 text-black border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.4)]' : 'bg-white/10 text-white border-white/20 hover:bg-white/20'}`}>{t.natBenchmark}</button>
        </div>
        <div className="h-64 w-full relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={USER_DATA.stats}>
              <PolarGrid stroke="rgba(255,255,255,0.15)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#cbd5e1', fontSize: 10, fontWeight: '900' }} />
              <Radar name={t.you} dataKey="A" stroke="#3b82f6" strokeWidth={3} fill="#3b82f6" fillOpacity={0.4} />
              <Radar name={t.average} dataKey="B" stroke="#64748b" strokeWidth={2} fill="#94a3b8" fillOpacity={0.1} />
              {showBenchmark && <Radar name="National Std" dataKey="C" stroke="#facc15" strokeWidth={2} fill="#facc15" fillOpacity={0.2} strokeDasharray="4 4" />}
              <Tooltip contentStyle={{ backgroundColor: 'rgba(30,27,75,0.9)', backdropFilter: 'blur(8px)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', color: 'white', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }} itemStyle={{ fontWeight: 'black' }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Raw Protocol Data Grid */}
        <div className="grid grid-cols-3 gap-2 mt-4 relative z-10">
          {USER_DATA.stats.slice(0, 3).map(s => (
             <div key={s.subject} className="bg-white/10 p-2.5 rounded-xl border border-white/10 text-center backdrop-blur-md shadow-inner">
                <p className="text-[8px] text-blue-200 font-bold uppercase tracking-[0.2em] mb-0.5">{s.subject}</p>
                <p className="text-xs text-white font-black drop-shadow-sm">{s.raw}</p>
             </div>
          ))}
        </div>
        <div className="absolute right-0 bottom-0 w-48 h-48 bg-blue-500/20 blur-[60px] rounded-full pointer-events-none"></div>
      </div>

      {/* Sub-navigation */}
      <div className="flex p-1 bg-slate-100 rounded-xl shadow-inner border border-slate-200">
        {['physical', 'technical', 'cognitive'].map(cat => (
          <button key={cat} onClick={() => setActiveSub(cat)} className={`flex-1 py-2.5 text-[10px] font-black uppercase rounded-lg transition-all shadow-sm ${activeSub === cat ? 'bg-white text-blue-600 border border-slate-200' : 'text-slate-500 hover:text-slate-700 shadow-none'}`}>{cat}</button>
        ))}
      </div>

      {/* Metric Visualizations */}
      <div className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm space-y-2">
        {(METRICS_DB[activeSub] || []).map(m => ( 
          <div key={m.id}>
            {view === 'current' ? (
              <MetricBar {...m} t={t} />
            ) : (
              <div className="mb-8 p-4 bg-slate-50/50 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{m.label} {t.history}</p>
                  <TrendingUp size={14} className="text-green-500" />
                </div>
                <div className="h-24 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <ReLineChart data={m.history.map((v, i) => ({ i, v }))}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <Line type="monotone" dataKey="v" stroke="#2563eb" strokeWidth={3} dot={{ r: 5, fill: '#2563eb', strokeWidth: 2, stroke: 'white' }} activeDot={{ r: 8, strokeWidth: 0 }} />
                      <Tooltip contentStyle={{ borderRadius: '12px', fontSize: '12px', fontWeight: 'bold', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}/>
                    </ReLineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const HubTab = ({ activeSection, setActiveSection, setActiveTab, setDrillContext, bookedSlots, setBookedSlots, showToast, t }) => {
  const [h, setH] = useState('');
  const [w, setW] = useState('');
  const [bmi, setBmi] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [fieldFilter, setFieldFilter] = useState('All');
  const [fieldSort, setFieldSort] = useState('Nearest'); 
  const [showFieldFilter, setShowFieldFilter] = useState(false);
  const [bookingField, setBookingField] = useState(null);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [showScoutModal, setShowScoutModal] = useState(false);

  const calcBMI = () => {
    if(h && w) {
      const v = (w / ((h/100)**2)).toFixed(1);
      setBmi({ v, c: v < 18.5 ? 'Underweight' : v > 25 ? 'Overweight' : 'Normal' });
    }
  };

  const sortedFields = [...PLAYFIELDS]
    .filter(f => fieldFilter === 'All' || f.type === fieldFilter)
    .sort((a, b) => {
       if (fieldSort === 'Open Now') {
         return (a.status === 'Open' ? -1 : 1) - (b.status === 'Open' ? -1 : 1);
       } else {
         return parseFloat(a.distance) - parseFloat(b.distance);
       }
    });

  return (
    <div className="space-y-6 pb-28 animate-fade-in p-4 pt-4">
      <RecipeModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} t={t} />
      
      {/* UX FIX: Horizontal Sub-nav (Robust Scrollable Container) */}
      <div className="relative mb-6">
        <div className="w-full overflow-x-auto scrollbar-hide py-2 pr-8">
           <div className="flex gap-2 w-max px-1">
            {[
              { id: 'arena', label: t.arena },
              { id: 'assessment', label: t.assessment },
              { id: 'nutrition', label: t.nutrition },
              { id: 'rank', label: t.rank },
              { id: 'fields', label: t.fields }
            ].map(sec => (
              <button key={sec.id} onClick={() => setActiveSection(sec.id)} className={`px-4 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-sm whitespace-nowrap flex-shrink-0 active:scale-95 ${activeSection === sec.id ? 'bg-[#1e1b4b] text-white shadow-lg' : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}>{sec.label}</button>
            ))}
          </div>
        </div>
        <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none"></div>
      </div>
      
      {/* THE ARENA (1v1 Battles) */}
      {activeSection === 'arena' && (
        <div className="space-y-6 animate-slide-up">
           <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-[32px] border border-orange-200 shadow-sm relative overflow-hidden group">
             <div className="flex justify-between items-start mb-5 relative z-10">
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-orange-100"><Swords size={28} className="text-orange-600"/></div>
                <span className="bg-red-600 text-white text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest animate-pulse shadow-md">{t.liveChallenge}</span>
             </div>
             <h3 className="text-xl font-black text-slate-900 leading-tight mb-1 relative z-10 tracking-tight">Ramesh K. challenged you!</h3>
             <p className="text-xs text-slate-600 font-bold mb-6 relative z-10 uppercase tracking-wider">Protocol: 20m Sprint Battle</p>
             <button 
               onClick={() => { setDrillContext({ mode: 'Battle', drill: '20m Sprint vs Ramesh' }); setActiveTab('train'); }} 
               className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-orange-600/30 active:-translate-y-0.5 active:shadow-none transition-all relative z-10 border-2 border-orange-500"
             >
               {t.acceptChallenge}
             </button>
             <div className="absolute right-0 bottom-0 w-32 h-32 bg-red-500/10 blur-3xl rounded-full transition-transform group-hover:scale-150 pointer-events-none"></div>
           </div>

           <div className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm">
              <h3 className="font-black text-slate-900 text-xs uppercase tracking-widest mb-5 flex items-center gap-2"><History size={14}/> {t.lastBattle}</h3>
              <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl mb-5 border border-slate-100 shadow-inner">
                 <div className="text-center w-20">
                   <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">{t.you}</p>
                   <p className="text-2xl font-black text-slate-900 drop-shadow-sm">82</p>
                 </div>
                 <div className="text-slate-300 font-black italic text-lg px-4 border-x border-slate-200">VS</div>
                 <div className="text-center w-20">
                   <p className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-1">Suresh</p>
                   <p className="text-2xl font-black text-slate-900 drop-shadow-sm">78</p>
                 </div>
              </div>
              <div className="h-40 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={USER_DATA.stats}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 9, fontWeight: '900' }} />
                    <Radar name={t.you} dataKey="A" stroke="#2563eb" strokeWidth={3} fill="#3b82f6" fillOpacity={0.3} />
                    <Radar name="Suresh" dataKey="B" stroke="#ef4444" strokeWidth={3} fill="#f87171" fillOpacity={0.3} />
                    <Tooltip contentStyle={{ borderRadius: '12px', fontSize: '12px', fontWeight: 'bold', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}/>
                  </RadarChart>
                </ResponsiveContainer>
              </div>
           </div>
        </div>
      )}

      {activeSection === 'assessment' && (
        <div className="space-y-4 animate-slide-up">
          <div className="grid grid-cols-4 gap-3 bg-white p-5 rounded-[32px] shadow-sm border border-slate-100">
            {ASSESSMENT_SUITE.map(a => (
              <button 
                key={a.id} 
                onClick={() => { setDrillContext({ mode: 'Assessment', drill: a.label }); setActiveTab('train'); }}
                className="flex flex-col items-center gap-2 group active:scale-95 transition-all outline-none"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner border border-transparent group-hover:shadow-md transition-all ${a.color}`}>{a.icon}</div>
                <span className="text-[9px] font-black text-slate-600 text-center uppercase tracking-tight group-hover:text-slate-900">{a.label}</span>
              </button>
            ))}
          </div>

          <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden">
            <h3 className="font-black text-slate-900 text-xs uppercase tracking-widest mb-6 flex items-center gap-2 relative z-10"><Activity size={18} className="text-blue-500"/> {t.bmiLogic}</h3>
            <div className="flex gap-3 mb-5 relative z-10">
              <input type="number" placeholder="Ht (cm)" value={h} onChange={e=>setH(e.target.value)} className="w-1/2 bg-slate-50 rounded-2xl p-4 text-sm font-black border border-slate-200 outline-none focus:ring-2 ring-blue-500 transition-all shadow-inner text-slate-800 placeholder:text-slate-400" />
              <input type="number" placeholder="Wt (kg)" value={w} onChange={e=>setW(e.target.value)} className="w-1/2 bg-slate-50 rounded-2xl p-4 text-sm font-black border border-slate-200 outline-none focus:ring-2 ring-blue-500 transition-all shadow-inner text-slate-800 placeholder:text-slate-400" />
            </div>
            <button onClick={calcBMI} className="w-full bg-[#1e1b4b] hover:bg-black text-white py-4 rounded-2xl font-black text-sm active:translate-y-0.5 active:shadow-none transition-all uppercase tracking-widest shadow-lg shadow-blue-900/20 relative z-10 border border-slate-800">{t.calcIndex}</button>
            {bmi && (
              <div className="mt-6 text-center animate-fade-in bg-slate-50 p-6 rounded-[24px] border border-slate-200 shadow-inner relative z-10">
                <p className="text-5xl font-black text-slate-900 tracking-tighter drop-shadow-sm">{bmi.v}</p>
                <p className={`text-xs font-black uppercase tracking-[0.2em] mt-2 px-3 py-1 inline-block rounded-full shadow-sm border ${bmi.c === 'Normal' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-orange-100 text-orange-700 border-orange-200'}`}>{bmi.c} Range</p>
              </div>
            )}
            <div className="absolute right-0 bottom-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
          </div>
        </div>
      )}

      {activeSection === 'nutrition' && (
        <div className="space-y-4 animate-slide-up">
          <div className="bg-green-50 p-6 rounded-[32px] border border-green-200 flex justify-between items-center shadow-sm">
            <div>
              <h3 className="font-black text-green-900 uppercase tracking-widest text-xs mb-1">{t.energyBal}</h3>
              <p className="text-[10px] text-green-700 font-bold uppercase tracking-wider">Protein: 65g / 90g</p>
            </div>
            <div className="w-16 h-16 rounded-full border-[6px] border-green-200 border-t-green-600 flex items-center justify-center text-sm font-black text-green-800 shadow-inner bg-white">72%</div>
          </div>
          
          <div className="flex justify-between items-center px-1 mt-6 mb-2">
            <h3 className="font-black text-slate-900 text-xs uppercase tracking-widest flex items-center gap-2"><Utensils size={14} className="text-orange-500"/> {t.sportDiets}</h3>
          </div>

          <div className="space-y-3">
             {NUTRITION_PLANS.map((plan, idx) => (
                <button 
                  key={idx} 
                  onClick={() => {
                    if(plan.locked) showToast("Reach L5 State Elite to unlock this specialized diet.");
                    else setSelectedPlan(plan);
                  }}
                  className={`w-full bg-white border p-4 rounded-[24px] flex justify-between items-center group shadow-sm transition-all relative overflow-hidden ${plan.locked ? 'border-slate-100 opacity-70 cursor-not-allowed' : 'border-slate-200 active:scale-95 hover:border-blue-300 hover:shadow-md'}`}
                >
                  <div className="flex items-center gap-4 text-left">
                    <div className="text-3xl bg-slate-50 p-2.5 rounded-xl border border-slate-100 shadow-inner drop-shadow-sm">{plan.icon}</div>
                    <div className="pr-4">
                      <p className={`font-black text-xs uppercase tracking-tight mb-1 ${plan.locked ? 'text-slate-500' : 'text-slate-900'}`}>{plan.title}</p>
                      <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">{plan.macros} • {plan.sport}</p>
                    </div>
                  </div>
                  <div className={`bg-slate-50 p-2.5 rounded-full transition-colors flex-shrink-0 shadow-inner border border-slate-100 ${plan.locked ? 'text-orange-400' : 'group-hover:bg-blue-600 text-slate-400 group-hover:text-white group-hover:border-blue-500'}`}>
                     {plan.locked ? <Lock size={16} strokeWidth={2.5}/> : <ArrowRight size={16} strokeWidth={2.5}/>}
                  </div>
                  {plan.locked && <div className="absolute inset-0 bg-slate-50/30 backdrop-blur-[1px]"></div>}
                </button>
             ))}
          </div>
        </div>
      )}

      {activeSection === 'fields' && (
        <div className="space-y-4 animate-slide-up">
          <div className="flex justify-between items-center px-2 mb-4 relative z-20">
            <h3 className="font-black text-slate-900 text-xs uppercase tracking-widest flex items-center gap-2"><MapPin size={14} className="text-blue-600"/> {t.nearbyLabs}</h3>
            <div className="flex gap-2">
              <button 
                onClick={() => setFieldSort(fieldSort === 'Nearest' ? 'Open Now' : 'Nearest')}
                className="text-[9px] font-black text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-lg active:scale-95 transition-all shadow-sm uppercase tracking-widest hover:bg-slate-50">
                {t.sort}: {fieldSort}
              </button>
              <div className="relative">
                <button 
                  onClick={() => setShowFieldFilter(!showFieldFilter)}
                  className="text-[9px] font-black text-blue-600 flex items-center gap-1 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-lg active:scale-95 transition-all shadow-sm uppercase tracking-widest hover:bg-blue-100">
                  {fieldFilter === 'All' ? t.filter : fieldFilter} <Settings size={12}/>
                </button>
                {showFieldFilter && (
                  <div className="absolute right-0 mt-2 w-36 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden">
                    {['All', ...new Set(PLAYFIELDS.map(f => f.type))].map(type => (
                      <button
                        key={type}
                        onClick={() => { setFieldFilter(type); setShowFieldFilter(false); }}
                        className={`w-full text-left px-4 py-3 text-xs font-black uppercase tracking-wider transition-colors ${fieldFilter === type ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          {sortedFields.map(f => (
            <div key={f.id} className="bg-white p-5 rounded-[28px] border border-slate-200 shadow-sm flex gap-5 hover:shadow-md transition-all relative z-10">
              <div className="w-16 h-16 bg-slate-50 rounded-[20px] flex items-center justify-center text-3xl shadow-inner border border-slate-100 flex-shrink-0 drop-shadow-sm">{f.image}</div>
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-black text-slate-900 text-sm tracking-tight leading-tight pr-2">{f.name}</h4>
                  <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-md shadow-sm border tracking-widest ${f.status === 'Open' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>{f.status === 'Open' ? 'Open' : t.closed}</span>
                </div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{f.type} • {f.distance}</p>
                <div className="mt-4 flex gap-2 w-full">
                  <button 
                    onClick={() => window.open(f.mapLink, '_blank')}
                    className="flex-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-[9px] py-2.5 rounded-xl font-black uppercase tracking-widest transition-all active:scale-95 shadow-sm">
                    {t.maps}
                  </button>
                  <button 
                    onClick={() => setBookingField(f)}
                    disabled={f.status !== 'Open' || bookedSlots[f.id]}
                    className={`flex-[1.5] text-[9px] py-2.5 rounded-xl font-black uppercase tracking-widest transition-all shadow-sm active:translate-y-0.5 active:shadow-none border ${f.status !== 'Open' ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed shadow-none' : bookedSlots[f.id] ? 'bg-green-500 text-white border-green-600 shadow-none' : 'bg-[#1e1b4b] hover:bg-black text-white border-slate-900 shadow-lg shadow-blue-900/10'}`}>
                    {f.status !== 'Open' ? t.closed : bookedSlots[f.id] ? t.booked : t.bookSlot}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeSection === 'rank' && (
        <div className="space-y-6 animate-slide-up">
           <div className="bg-white rounded-[28px] border border-slate-200 overflow-hidden shadow-sm">
             <div className="bg-slate-50/80 backdrop-blur-sm p-2 flex gap-2 border-b border-slate-200">
               <button className="flex-1 bg-white shadow-sm py-2 rounded-xl text-xs font-black text-slate-900 uppercase tracking-widest border border-slate-100">{t.village}</button>
               <button className="flex-1 text-slate-500 hover:bg-slate-200 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors">{t.school}</button>
             </div>
             {[1,2,3].map(i => (
               <div key={i} className={`flex justify-between items-center p-5 border-b border-slate-50 last:border-0 transition-colors ${i === 2 ? 'bg-blue-50/50' : 'hover:bg-slate-50'}`}>
                 <div className="flex items-center gap-4">
                   <span className={`text-sm font-black w-6 text-center ${i === 1 ? 'text-yellow-500' : i === 2 ? 'text-blue-600' : 'text-slate-400'}`}>#{i}</span>
                   <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-black text-xs text-slate-600 shadow-inner border border-white">{i === 2 ? 'VS' : 'OP'}</div>
                   <span className="text-sm font-black text-slate-900 tracking-tight">{i === 2 ? 'Viraj (You)' : 'Ramesh K.'}</span>
                 </div>
                 <span className="text-sm font-mono text-blue-600 font-black bg-white px-3 py-1 rounded-lg shadow-sm border border-slate-100">{980 - (i*10)}</span>
               </div>
             ))}
           </div>

           {/* SAI Scout Flag (National Selection Standard) */}
           <div className="bg-gradient-to-br from-blue-900 to-indigo-950 p-6 rounded-[32px] shadow-2xl relative overflow-hidden group border border-slate-800">
               <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/20 blur-[60px] rounded-full pointer-events-none group-hover:bg-blue-500/30 transition-colors"></div>
               <div className="relative z-10">
                 <div className="flex items-center gap-3 mb-3">
                   <Shield className="text-yellow-400" size={24} />
                   <h3 className="text-white font-black text-lg italic tracking-tight uppercase">{t.natPathway}</h3>
                 </div>
                 <p className="text-blue-200 text-xs font-medium mb-6 leading-relaxed">Your Scout Readiness is <span className="text-white font-black">{USER_DATA.scoutReadiness}%</span>. Level <span className="text-white font-black">{USER_DATA.level}</span> achieved.</p>
                 
                 <button 
                   onClick={() => setShowScoutModal(true)}
                   disabled={!(USER_DATA.level >= 4 && USER_DATA.scoutReadiness > 70)}
                   className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all active:translate-y-0.5 active:shadow-none border ${USER_DATA.level >= 4 && USER_DATA.scoutReadiness > 70 ? 'bg-yellow-400 hover:bg-yellow-500 text-slate-900 shadow-[0_0_20px_rgba(250,204,21,0.4)] border-yellow-300 cursor-pointer' : 'bg-slate-800/80 text-slate-500 cursor-not-allowed border-slate-700/50 backdrop-blur-sm shadow-inner'}`}
                 >
                   {USER_DATA.level >= 4 && USER_DATA.scoutReadiness > 70 ? t.reqScout : t.lockedReq}
                 </button>
               </div>
           </div>
        </div>
      )}

      {/* Booking Modal */}
      {bookingField && (
        <div className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-white/95 backdrop-blur-xl w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl relative p-8 animate-slide-up border border-slate-200/50">
            <button onClick={() => setBookingField(null)} className="absolute top-6 right-6 bg-slate-100 p-2 rounded-full text-slate-600 hover:bg-slate-200 transition-colors"><X size={20}/></button>
            <h3 className="text-2xl font-black text-slate-900 mb-1 tracking-tight">{t.bookSlot}</h3>
            <p className="text-[10px] font-black text-blue-600 mb-8 uppercase tracking-widest bg-blue-50 inline-block px-3 py-1 rounded-full border border-blue-100">{bookingField.name} • {bookingField.type}</p>
            
            <div className="space-y-5">
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block flex items-center gap-2"><Calendar size={14}/> {t.selectDate}</label>
                <input 
                  type="date" 
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-inner uppercase tracking-wider" 
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block flex items-center gap-2"><Clock size={14}/> {t.selectTime}</label>
                <select 
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-inner uppercase tracking-wider">
                  <option value="" disabled>Select a slot...</option>
                  <option value="06:00 AM - 08:00 AM">06:00 AM - 08:00 AM</option>
                  <option value="08:00 AM - 10:00 AM">08:00 AM - 10:00 AM</option>
                  <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
                  <option value="06:00 PM - 08:00 PM">06:00 PM - 08:00 PM</option>
                </select>
              </div>
            </div>
            
            <button 
              onClick={() => {
                if (bookingDate && bookingTime) {
                  setBookedSlots(prev => ({...prev, [bookingField.id]: { field: bookingField, date: bookingDate, time: bookingTime }}));
                  setBookingField(null);
                  setBookingDate("");
                  setBookingTime("");
                }
              }} 
              disabled={!bookingDate || !bookingTime}
              className={`w-full mt-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all border ${(!bookingDate || !bookingTime) ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/30 active:translate-y-0.5 active:shadow-none border-blue-700'}`}>
              {t.confirmBooking}
            </button>
          </div>
        </div>
      )}

      {/* SAI Scout Success Modal */}
      {showScoutModal && (
        <div className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in">
           <div className="bg-white/95 backdrop-blur-xl w-full max-w-sm rounded-[40px] p-8 text-center animate-slide-up shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-48 h-48 bg-green-500/10 blur-3xl rounded-full pointer-events-none"></div>
             <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-lg relative z-10">
               <Shield className="text-green-600" size={40} />
             </div>
             <h3 className="font-black text-2xl text-slate-900 mb-2 tracking-tight relative z-10">{t.transmissionComplete}</h3>
             <p className="text-xs text-slate-600 font-medium mb-8 leading-relaxed relative z-10">{t.transMsg}</p>
             <button onClick={() => setShowScoutModal(false)} className="w-full bg-slate-900 hover:bg-black text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest active:translate-y-0.5 active:shadow-none transition-all shadow-lg shadow-slate-900/20 relative z-10 border border-black">{t.acknowledge}</button>
           </div>
        </div>
      )}
    </div>
  );
};

const AcademyTab = ({ setActiveTab, setDrillContext, showToast, t }) => {
  const [category, setCategory] = useState(null);
  const [video, setVideo] = useState(null);
  const [jugaadItem, setJugaadItem] = useState(null);

  if (category) {
    const data = SPORTS_ACADEMY[category]; 
    return (
      <div className="pb-28 animate-slide-in-right px-4 pt-4">
        {video && <VideoPlayerOverlay module={video} onClose={() => setVideo(null)} />}
        <button onClick={() => setCategory(null)} className="flex items-center text-slate-600 mb-6 text-[10px] font-black uppercase tracking-widest hover:text-blue-600 transition-colors bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-slate-200 w-fit active:scale-95">
          <ChevronRight className="rotate-180 mr-1" size={16} /> {t.backToSports}
        </button>
        
        {/* Dynamic Sport Header with Mastery Progress */}
        <div className={`${data.color} p-8 rounded-[40px] mb-8 text-center shadow-2xl relative overflow-hidden border border-slate-800`}>
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 blur-[60px] rounded-full -mr-20 -mt-20 pointer-events-none"></div>
          <div className="relative z-10">
            <div className="text-6xl mb-4 drop-shadow-lg">{data.icon}</div>
            <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">{data.title} Lab</h2>
            <div className="mt-6 w-full bg-black/40 rounded-full h-2.5 overflow-hidden shadow-inner border border-white/10">
               <div className="h-full bg-blue-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(59,130,246,0.8)]" style={{ width: `${data.progress}%` }}></div>
            </div>
            <p className="text-[10px] text-blue-100 font-black mt-3 uppercase tracking-[0.2em]">{data.progress}% {t.masteryUnlocked}</p>
          </div>
        </div>

        {/* Module List with Locked/Unlocked UX */}
        <div className="space-y-4">
          {data.modules.map((mod) => (
            <button 
               key={mod.id} 
               onClick={() => { 
                 if(mod.locked) {
                   showToast("Unlock Level 5 to access advanced masterclasses.");
                   return;
                 }
                 if (mod.type === 'ai_drill') { 
                   setDrillContext({ mode: category, drill: mod.title }); setActiveTab('train'); 
                 } else { 
                   setVideo(mod); 
                 } 
               }} 
               className={`w-full p-5 rounded-[28px] border shadow-sm flex items-center gap-5 transition-all text-left relative overflow-hidden outline-none ${mod.locked ? 'bg-slate-50/50 border-slate-200 opacity-70 cursor-not-allowed' : 'bg-white border-slate-200 active:scale-[0.98] hover:shadow-md hover:border-blue-200 cursor-pointer group'}`}
            >
              <div className={`w-14 h-14 rounded-[20px] flex items-center justify-center text-2xl shadow-inner border border-slate-100 flex-shrink-0 transition-transform ${mod.locked ? 'bg-slate-200 text-slate-400' : mod.type === 'ai_drill' ? 'bg-blue-50 text-blue-600 group-hover:scale-110' : 'bg-orange-50 text-orange-600 group-hover:scale-110'}`}>
                {mod.locked ? <Lock size={20}/> : mod.type === 'ai_drill' ? <Camera size={24} /> : <Play size={24} />}
              </div>
              <div className="flex-1 pr-6 z-10">
                <h4 className={`text-sm tracking-tight mb-1.5 leading-tight ${mod.locked ? 'font-bold text-slate-500' : 'font-black text-slate-900 group-hover:text-blue-700 transition-colors'}`}>{mod.title}</h4>
                <div className="flex gap-2 flex-wrap">
                  {!mod.locked && <p className={`text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-sm border ${mod.type === 'ai_drill' ? 'bg-blue-600 text-white border-blue-700' : 'bg-orange-600 text-white border-orange-700'}`}>{mod.type === 'ai_drill' ? 'AI SCOUTER' : 'TECHNICAL'}</p>}
                  {mod.tags.map(tag => <span key={tag} className="text-[9px] text-slate-500 font-bold uppercase border border-slate-200 bg-slate-50 px-2 py-0.5 rounded shadow-sm">{tag}</span>)}
                </div>
              </div>
              {!mod.locked && <div className="absolute right-5 text-green-500 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0 bg-green-50 p-2 rounded-full border border-green-100"><ArrowRight size={16} strokeWidth={3}/></div>}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-28 animate-fade-in px-4 pt-4">
      <JugaadModal item={jugaadItem} onClose={() => setJugaadItem(null)} t={t} />
      
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-[40px] border border-amber-200 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex justify-between items-start">
          <div>
            <h3 className="font-black text-amber-900 text-2xl tracking-tighter uppercase italic drop-shadow-sm">{t.jugaadLab}</h3>
            <p className="text-amber-700 text-[10px] font-black uppercase tracking-[0.2em] mt-1 mb-4 bg-amber-200/50 inline-block px-2 py-1 rounded">{t.resOpt}</p>
          </div>
          <div className="bg-white/60 p-3 rounded-2xl backdrop-blur-md shadow-inner border border-white"><Hammer className="text-amber-600" size={24} /></div>
        </div>
        
        <p className="text-xs text-amber-800 font-bold mb-6 relative z-10 pr-4 leading-relaxed">{t.jugaadDesc}</p>
        
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide relative z-10 -mx-2 px-2">
          {JUGAAD_GUIDE.map((item, i) => (
            <button key={i} onClick={() => setJugaadItem(item)} className="bg-white/90 backdrop-blur-sm p-5 rounded-[28px] shadow-sm min-w-[160px] border border-amber-100 flex flex-col items-center group hover:shadow-lg hover:-translate-y-1 active:translate-y-0 transition-all outline-none">
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform drop-shadow-md">{item.icon}</div>
              <p className="text-[10px] font-black text-slate-800 uppercase mb-2 tracking-tight text-center">{item.title}</p>
              <span className="text-[10px] text-white bg-green-600 font-black px-3 py-1 rounded-full shadow-sm border border-green-700">{item.cost}</span>
            </button>
          ))}
        </div>
        <div className="absolute right-0 bottom-0 w-64 h-64 bg-orange-500/10 blur-[80px] rounded-full pointer-events-none"></div>
      </div>
      
      <div className="px-1 mt-8 mb-4">
         <h3 className="font-black text-slate-900 text-xs uppercase tracking-widest flex items-center gap-2">
           <Target size={16} className="text-blue-600"/> {t.postSpec}
         </h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(SPORTS_ACADEMY).map(([key, data]) => (
          <button key={key} onClick={() => setCategory(key)} className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm flex flex-col items-center gap-4 hover:shadow-lg hover:border-blue-200 transition-all active:scale-95 group relative overflow-hidden outline-none">
            <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center text-3xl shadow-inner border-2 border-white/50 ${data.color} text-white group-hover:rotate-6 transition-transform z-10`}>{data.icon}</div>
            <div className="text-center z-10 relative">
              <h4 className="font-black text-slate-900 text-sm uppercase tracking-tighter mb-1.5">{data.title}</h4>
              <p className="text-[8px] text-slate-500 font-black uppercase tracking-[0.2em] bg-slate-50 px-2 py-1 rounded-md border border-slate-100 shadow-sm inline-block">{data.modules.length} {t.modules}</p>
            </div>
            {/* Embedded Progress Bar */}
            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-slate-100">
               <div className="h-full bg-blue-500 transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(59,130,246,0.6)]" style={{ width: `${data.progress}%` }}></div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

const AITrainerTab = ({ drillContext, setActiveTab, t }) => {
  const [active, setActive] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [matchPct, setMatchPct] = useState(94);
  const [showPip, setShowPip] = useState(false); 
  const canvasRef = useRef(null);
  const requestRef = useRef();

  // Core Canvas Simulation Logic
  useEffect(() => {
    if(active && !showSummary && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      let frame = 0;
      
      const animate = () => {
        frame++;
        ctx.clearRect(0,0,400,600);
        
        // Match Pct Fluctuation Simulator
        const currentMatch = Math.floor(85 + Math.sin(frame * 0.05) * 12);
        if (frame % 10 === 0) setMatchPct(currentMatch);

        // 1. Scouter Grid Overlay
        ctx.strokeStyle = 'rgba(255,255,255,0.05)';
        for(let i=0; i<400; i+=40) { ctx.beginPath(); ctx.moveTo(i,0); ctx.lineTo(i,600); ctx.stroke(); }
        
        // 2. CoG (Center of Gravity) Indicator
        const cx = 200 + Math.sin(frame*0.02)*10;
        const cy = 300 + Math.cos(frame*0.02)*20;
        
        ctx.beginPath();
        ctx.arc(cx, cy, 6, 0, Math.PI*2);
        ctx.fillStyle = currentMatch < 80 ? '#f97316' : '#22c55e';
        ctx.fill();
        ctx.strokeStyle = currentMatch < 80 ? 'rgba(249, 115, 22, 0.4)' : 'rgba(34, 197, 94, 0.3)';
        ctx.lineWidth = 12;
        ctx.stroke();

        // --- GHOST SKELETON (Perfect Form Overlay) ---
        ctx.beginPath();
        ctx.moveTo(200, 300 - 120);
        ctx.lineTo(200, 300);
        ctx.lineTo(200 - 40, 300 + 120);
        ctx.moveTo(200, 300);
        ctx.lineTo(200 + 40, 300 + 120);
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.5)';
        ctx.lineWidth = 4;
        ctx.setLineDash([8, 6]);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
        ctx.setLineDash([]); 

        // 3. Biomechanical Vectors (Body Skeleton - User)
        ctx.beginPath();
        ctx.moveTo(cx, cy - 120);
        ctx.lineTo(cx, cy);
        ctx.lineTo(cx - 40, cy + 120);
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + 40, cy + 120);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();

        // 4. Knee Angle Visualizer
        ctx.beginPath();
        ctx.arc(cx - 20, cy + 60, 25, 0, Math.PI * 0.7);
        ctx.strokeStyle = '#f97316'; 
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // 5. HUD Data Overlay
        ctx.fillStyle = 'white';
        ctx.font = 'bold 12px monospace';
        ctx.fillText(`KNEE_L: 124.5°`, cx + 60, cy + 70);
        ctx.fillText(`KNEE_R: 123.8°`, cx + 60, cy + 90);
        ctx.fillText(`COG_STABILITY: ${currentMatch < 80 ? t.warning : t.stable}`, cx + 60, cy + 110);
        
        // 6. Retro CRT Scanline Effect
        ctx.fillStyle = 'rgba(37, 99, 235, 0.05)';
        ctx.fillRect(0, (frame*2.5) % 600, 400, 3);

        requestRef.current = requestAnimationFrame(animate);
      };
      requestRef.current = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(requestRef.current);
    }
  }, [active, showSummary, t]);

  const handleEndSession = () => {
    setActive(false);
    setShowSummary(true);
  };

  const handleCloseSummary = () => {
    setShowSummary(false);
    setActiveTab('home'); // Route back to home loop
  };

  if (showSummary) {
     return <SessionSummaryModal 
              data={{ drillName: drillContext?.drill || "Biomechanical Baseline", matchPct: 91, xp: 45, cal: 120 }} 
              onClose={handleCloseSummary} 
              t={t}
            />;
  }

  if (!active) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-10 bg-slate-50 animate-fade-in text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200/50 rounded-full blur-[100px] pointer-events-none -mr-20 -mt-20"></div>
        
        <div className="w-40 h-40 bg-white rounded-[48px] flex items-center justify-center mb-10 animate-pulse text-blue-600 shadow-[0_10px_40px_rgba(37,99,235,0.15)] border-4 border-white relative z-10">
          <Camera size={64} strokeWidth={1.5} />
        </div>
        <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tighter italic uppercase relative z-10 drop-shadow-sm">{t.aiScouter}</h2>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-10 relative z-10">{t.liveTelemetry}</p>
        
        <div className="bg-white p-8 rounded-[32px] border border-slate-200 mb-10 w-full shadow-lg relative z-10">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center justify-center gap-2"><Settings size={12} className="text-blue-500"/> {t.protocolLoaded}</p>
          <p className="text-xl font-black text-blue-600 leading-tight uppercase italic drop-shadow-sm">{drillContext?.drill || "Biomechanical Baseline"}</p>
        </div>
        
        <button onClick={() => setShowChecklist(true)} className="bg-[#1e1b4b] hover:bg-black text-white w-full py-6 rounded-[28px] font-black text-sm active:translate-y-0.5 active:shadow-none transition-all shadow-xl shadow-blue-900/20 uppercase tracking-widest relative z-10 border border-slate-800">{t.initVision}</button>
        
        {showChecklist && (
          <div className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md flex items-center justify-center p-6">
            <div className="bg-white/95 backdrop-blur-xl w-full max-w-sm rounded-[40px] p-8 animate-slide-up shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 blur-3xl -mr-10 -mt-10 rounded-full"></div>
              <h3 className="font-black text-2xl mb-8 relative z-10 tracking-tight text-slate-900">{t.preFlight}</h3>
              <div className="space-y-4 mb-10 relative z-10">
                {t.preFlightItems.map(item => (
                  <div key={item} className="flex items-center gap-4 bg-white p-4 rounded-[20px] border border-slate-100 shadow-sm">
                    <div className="bg-blue-50 p-1.5 rounded-full shadow-inner"><CheckCircle size={18} className="text-blue-600"/></div>
                    <span className="text-xs font-black text-slate-700 uppercase tracking-tight">{item}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => { setShowChecklist(false); setActive(true); }} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-[24px] font-black text-sm uppercase tracking-widest active:translate-y-0.5 active:shadow-none transition-all shadow-lg shadow-blue-600/30 relative z-10 border border-blue-700">{t.engageScouter}</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="h-full bg-black relative flex flex-col overflow-hidden animate-fade-in">
      {/* Top Header */}
      <div className="absolute top-0 left-0 right-0 p-8 z-20 flex justify-between items-center bg-gradient-to-b from-black/90 to-transparent">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_15px_red]"></div>
            <span className="text-white font-mono text-xs uppercase tracking-[0.2em] font-black drop-shadow-md">Scouter Active</span>
          </div>
          <p className="text-white/50 font-mono text-[8px] uppercase tracking-widest ml-6">FRAME RATE: 60 FPS • AI: ONLINE</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowPip(!showPip)}
            className={`px-3 py-2 rounded-xl text-[8px] font-black tracking-widest uppercase transition-all border shadow-sm ${showPip ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50' : 'bg-white/10 text-white/70 border-white/20 hover:bg-white/20'}`}
          >
            {showPip ? t.hidePip : t.showPip}
          </button>
          <button onClick={handleEndSession} className="bg-green-500/20 hover:bg-green-500/40 p-2 px-3 rounded-xl text-green-400 backdrop-blur-xl border border-green-500/50 shadow-lg active:scale-90 transition-all flex items-center gap-2">
             <CheckCircle size={16} strokeWidth={3} />
             <span className="text-[10px] font-black uppercase tracking-widest">{t.finish}</span>
          </button>
        </div>
      </div>

      {/* Pro-Sync Reference Mini-Window (Toggleable) */}
      {showPip && (
        <div className="absolute top-28 right-6 w-32 aspect-video bg-slate-900 rounded-xl overflow-hidden border-2 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.3)] z-30 flex items-center justify-center animate-fade-in">
          <div className="absolute top-1 left-1 bg-cyan-600 text-[8px] font-black px-1.5 py-0.5 rounded text-white z-10 shadow-sm">PRO-SYNC</div>
          <div className="relative w-full h-full flex items-center justify-center opacity-60">
            <div className="w-1.5 h-8 bg-cyan-400 rounded-full animate-pulse transform rotate-12"></div>
            <div className="w-1 h-6 bg-cyan-300 rounded-full animate-pulse transform -rotate-12 -ml-1 mt-4"></div>
            <div className="absolute top-2 w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      )}
      
      {/* Voice Command Simulated Overlay */}
      {active && matchPct < 80 && (
         <div className="absolute top-[40%] w-full flex justify-center z-50 pointer-events-none">
           <div className="bg-black/60 backdrop-blur-sm px-6 py-3 rounded-[24px] border-2 border-orange-500 animate-bounce shadow-[0_0_30px_rgba(249,115,22,0.4)]">
             <span className="text-3xl font-black text-orange-500 uppercase tracking-widest drop-shadow-md">
               {t.coachLowerHips}
             </span>
           </div>
         </div>
      )}

      {/* Main Canvas */}
      <canvas ref={canvasRef} width={400} height={600} className="w-full h-full object-cover opacity-80" />
      
      {/* Bottom Live Feedback HUD */}
      <div className={`absolute bottom-32 left-6 right-6 bg-black/70 backdrop-blur-2xl p-6 rounded-[32px] border-l-[6px] shadow-2xl border-t border-r border-b border-white/10 flex justify-between items-center transition-colors ${matchPct < 80 ? 'border-l-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.2)]' : 'border-l-green-500'}`}>
        <div>
          <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${matchPct < 80 ? 'text-orange-400' : 'text-green-400'}`}>{t.liveCorrection}</p>
          <p className="text-white font-black text-xl italic tracking-tight">{matchPct < 80 ? t.coachAdjustHips : t.coachHoldForm}</p>
        </div>
        <div className="text-right">
           <p className="text-white/40 text-[8px] font-black uppercase tracking-widest mb-1">{t.sync}</p>
           <p className={`font-black text-2xl ${matchPct < 80 ? 'text-orange-400 animate-pulse' : 'text-blue-400'}`}>{matchPct}%</p>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 5. MAIN APPLICATION SHELL
// ==========================================

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [hubSection, setHubSection] = useState('assessment');
  const [drillContext, setDrillContext] = useState(null);
  
  // App Global States
  const [language, setLanguage] = useState('en');
  const [coachOpen, setCoachOpen] = useState(false);
  const [hasSeenCoachAlert, setHasSeenCoachAlert] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [levelModal, setLevelModal] = useState(null);
  
  // Menu & Booking States Lifted to App Level
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [bookedSlots, setBookedSlots] = useState({});

  const t = TRANSLATIONS[language];

  const handleOpenCoach = () => {
    setCoachOpen(true);
    setHasSeenCoachAlert(true);
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3500);
  };

  const cancelBooking = (id) => {
    setBookedSlots(prev => {
      const next = {...prev};
      delete next[id];
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center font-sans text-slate-900 select-none antialiased">
      <div className="w-full max-w-md bg-white shadow-2xl overflow-hidden min-h-screen relative flex flex-col">
        
        <GlobalToast msg={toastMsg} />
        <LevelMasteryModal level={levelModal} onClose={() => setLevelModal(null)} t={t} />
        
        {/* Dynamic Sidebar Menu for Bookings */}
        <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} bookedSlots={bookedSlots} cancelBooking={cancelBooking} t={t} />

        {/* Persistent Top Header with Notification Support */}
        <TopBar onOpenMenu={() => setIsMenuOpen(true)} onOpenCoach={handleOpenCoach} onProfileClick={() => { setHubSection('rank'); setActiveTab('hub'); }} hasUnreadAlert={!hasSeenCoachAlert} lang={language} setLang={setLanguage} t={t} />

        {/* Dynamic Content Area */}
        <div className="flex-grow overflow-y-auto scrollbar-hide bg-slate-50/50">
          {activeTab === 'home' && <HomeTab setActiveTab={setActiveTab} setHubSection={setHubSection} t={t} showToast={showToast} onLevelClick={setLevelModal} />}
          {activeTab === 'metrics' && <MetricsTab t={t} />}
          {activeTab === 'hub' && <HubTab activeSection={hubSection} setActiveSection={setHubSection} setActiveTab={setActiveTab} setDrillContext={setDrillContext} bookedSlots={bookedSlots} setBookedSlots={setBookedSlots} showToast={showToast} t={t} />}
          {activeTab === 'academy' && <AcademyTab setActiveTab={setActiveTab} setDrillContext={setDrillContext} showToast={showToast} t={t} />}
          {/* Fallback for 'learn' logic -> Academy */}
          {activeTab === 'learn' && <AcademyTab setActiveTab={setActiveTab} setDrillContext={setDrillContext} showToast={showToast} t={t} />}
          {activeTab === 'train' && <AITrainerTab drillContext={drillContext} setActiveTab={setActiveTab} t={t} />}
        </div>

        {/* High-Contrast Bottom Navigation - Glassmorphism applied */}
        <div className="bg-white/80 backdrop-blur-md border-t border-slate-200/50 px-8 py-3 flex justify-between items-center z-50 h-24 pb-8 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] relative">
          <NavBtn icon={Home} label={t.navHome} active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
          <NavBtn icon={BarChart2} label={t.navLab} active={activeTab === 'metrics'} onClick={() => setActiveTab('metrics')} />
          
          {/* Primary Action Button (Camera) */}
          <div className="relative -top-10">
            <button onClick={() => setActiveTab('train')} className="bg-[#1e1b4b] text-white p-5 rounded-[32px] shadow-2xl border-[6px] border-white active:translate-y-1 active:shadow-none hover:-translate-y-1 transition-all shadow-blue-900/30 outline-none"><Camera size={30} strokeWidth={2.5}/></button>
          </div>
          
          <NavBtn icon={Brain} label={t.navSports} active={activeTab === 'academy' || activeTab === 'learn'} onClick={() => setActiveTab('academy')} />
          <NavBtn icon={User} label={t.navHub} active={activeTab === 'hub'} onClick={() => setActiveTab('hub')} />
        </div>

        {/* Global Chatbot Overlay */}
        <AICoachOverlay isOpen={coachOpen} onClose={() => setCoachOpen(false)} context={activeTab === 'hub' ? hubSection : activeTab} lang={language} t={t} />
      </div>
      
      {/* Global Utility Styles */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes slide-up { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .animate-slide-up { animation: slide-up 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        @keyframes slide-in-right { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
        .animate-slide-in-right { animation: slide-in-right 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
}

