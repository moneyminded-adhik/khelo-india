import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, 
  Home, 
  Play, 
  Camera, 
  Trophy, 
  TrendingUp, 
  Zap,
  MapPin,
  Dumbbell,
  Heart,
  Star,
  Search,
  ArrowRight,
  Target,
  Utensils,
  Brain,
  Shield,
  Flame,
  Menu,
  Clock,
  CheckCircle,
  Users,
  ChevronRight,
  Clipboard,
  Award,
  Hammer,
  Languages,
  Mic
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar,
  Tooltip
} from 'recharts';

/**
 * INDIA ACTIVE AI - OLYMPIC DREAM PLATFORM (FINAL DEMO VERSION)
 * -------------------------------------------------------------
 * DEEP VALUE ADDITIONS:
 * 1. JUGAAD GUIDE: DIY Equipment instructions for low-resource training.
 * 2. SCOUT TRACKER: Real-time status of SAI application (e.g., "Under Review").
 * 3. VILLAGE LEADERBOARD: Hyper-local competition layer.
 * 4. VERNACULAR UI: Language toggle visual.
 * 5. VOICE COACH: Audio feedback toggle in Trainer.
 */

// --- DATA LAYER ---

const ATHLETE_PROFILE = {
  name: "Viraj Sharma",
  location: "Pilani, Rajasthan",
  age: 16,
  level: "District Prospect",
  sport: "Athletics (Hurdles)",
  xp: 1250,
  stats: [
    { subject: 'Speed', A: 85, B: 70, fullMark: 100 },
    { subject: 'Power', A: 65, B: 60, fullMark: 100 },
    { subject: 'Stamina', A: 90, B: 75, fullMark: 100 },
    { subject: 'Agility', A: 55, B: 70, fullMark: 100 },
    { subject: 'Flexibility', A: 70, B: 65, fullMark: 100 },
    { subject: 'Focus', A: 80, B: 60, fullMark: 100 },
  ]
};

const JUGAAD_GUIDE = [
  { id: 1, title: "PVC Hurdles", cost: "₹150", material: "Old Pipes", icon: "🚧" },
  { id: 2, title: "Sandbag Weights", cost: "₹20", material: "Rice Sack + Sand", icon: "🎒" },
  { id: 3, title: "Agility Ladder", cost: "₹0", material: "Chalk / Tape", icon: "🪜" },
];

const SCOUT_STATUS = {
  status: "Under Review",
  step: 2, // 1: Submitted, 2: AI Review, 3: Human Scout, 4: Selected
  message: "Your 600m run data has been flagged for high potential. A SAI coach is assigned."
};

const SPORTS_LIBRARY = {
  athletics: {
    id: 'athletics', name: 'Athletics', icon: '🏃', color: 'bg-orange-100 text-orange-600',
    skills: [
      { id: 'a1', title: 'Sprint Start Technique', level: 'Beginner', type: 'video' },
      { id: 'a2', title: 'Hurdle Clearance', level: 'Intermediate', type: 'ai-drill', mode: 'hurdle' },
    ]
  },
  kabaddi: {
    id: 'kabaddi', name: 'Kabaddi', icon: '🤼', color: 'bg-red-100 text-red-600',
    skills: [
      { id: 'k1', title: 'The Toe Touch', level: 'Intermediate', type: 'ai-drill', mode: 'lunge' },
      { id: 'k2', title: 'Cant Breathing', level: 'Beginner', type: 'video' },
    ]
  },
  badminton: {
    id: 'badminton', name: 'Badminton', icon: '🏸', color: 'bg-blue-100 text-blue-600',
    skills: [
      { id: 'b1', title: 'High Backhand Serve', level: 'Advanced', type: 'ai-drill', mode: 'serve' },
    ]
  }
};

const CAREER_PATH = [
  {
    level: "District",
    status: "Active",
    modules: [
      { id: 3, title: "Sprint Mechanics", score: 85, type: "drill" },
      { id: 4, title: "Hurdle Mobility", score: 60, type: "ai-ghost", recommend: true },
    ]
  },
  {
    level: "State",
    status: "Locked",
    modules: [
      { id: 6, title: "Race Strategy", score: 0 },
    ]
  }
];

const NUTRITION_PLAN = {
  local_hacks: [
    { name: "Sattu Drink", benefit: "Protein/Coolant", cost: "₹10" },
    { name: "Sprouted Chana", benefit: "Iron/Stamina", cost: "₹5" },
    { name: "Banana Shake", benefit: "Pre-workout", cost: "₹15" }
  ]
};

// --- COMPONENT: NAVIGATION BAR ---
const NavBar = ({ activeTab, setActiveTab }) => (
  <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-2 flex justify-between items-center z-50 shadow-[0_-5px_20px_rgba(0,0,0,0.03)] sm:relative sm:border-t-0 sm:shadow-none sm:justify-center sm:gap-8 h-16 text-[10px]">
    <NavIcon icon={Home} label="Home" isActive={activeTab === 'home'} onClick={() => setActiveTab('home')} />
    <NavIcon icon={Brain} label="Academy" isActive={activeTab === 'academy'} onClick={() => setActiveTab('academy')} />
    <div className="relative -top-5">
      <button 
        onClick={() => setActiveTab('train')}
        className="bg-orange-600 text-white p-4 rounded-full shadow-lg shadow-orange-600/40 transform transition-transform hover:scale-110 active:scale-95 border-4 border-white"
      >
        <Camera size={28} />
      </button>
    </div>
    <NavIcon icon={Target} label="Hub" isActive={activeTab === 'hub'} onClick={() => setActiveTab('hub')} />
  </div>
);

const NavIcon = ({ icon: Icon, label, isActive, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center w-14 transition-all duration-300 ${isActive ? 'text-orange-600' : 'text-gray-400 hover:text-gray-600'}`}
  >
    <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
    <span className="mt-1 font-medium truncate w-full text-center">{label}</span>
  </button>
);

// --- COMPONENT: HOME DASHBOARD ---
const Dashboard = ({ setActiveTab }) => (
  <div className="space-y-6 pb-24 animate-fade-in">
    {/* Header */}
    <div className="flex justify-between items-center pt-2">
      <div className="flex items-center gap-3">
        <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-orange-500 p-0.5 relative">
           <img src="/api/placeholder/100/100" alt="Profile" className="h-full w-full rounded-full bg-gray-200 object-cover" />
           <div className="absolute bottom-0 right-0 bg-orange-600 text-white text-[8px] px-1.5 py-0.5 rounded-full font-bold border border-white">Lvl 3</div>
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-900 leading-tight flex items-center gap-1">
            {ATHLETE_PROFILE.name} <Shield size={14} className="fill-blue-500 text-blue-500" />
          </h1>
          <p className="text-xs text-gray-500">{ATHLETE_PROFILE.location}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button className="bg-white border border-gray-200 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 text-gray-600">
          <Languages size={14} /> A/अ
        </button>
        <button className="bg-white border border-gray-200 p-2 rounded-full"><Menu size={20} className="text-gray-600" /></button>
      </div>
    </div>

    {/* Scout Status Tracker (High Value Add) */}
    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
      <div className="flex justify-between items-center mb-2">
         <h3 className="font-bold text-blue-900 text-sm flex items-center gap-2">
           <Award size={16} className="text-blue-600" /> SAI Scout Application
         </h3>
         <span className="bg-blue-200 text-blue-800 text-[10px] px-2 py-0.5 rounded-full font-bold animate-pulse">
           {SCOUT_STATUS.status}
         </span>
      </div>
      <p className="text-xs text-blue-700 mb-3">{SCOUT_STATUS.message}</p>
      {/* Progress Steps */}
      <div className="flex items-center gap-1">
        {[1,2,3,4].map(step => (
          <div key={step} className={`h-1.5 rounded-full flex-1 ${step <= SCOUT_STATUS.step ? 'bg-blue-500' : 'bg-blue-200'}`}></div>
        ))}
      </div>
    </div>

    {/* Coach Jeet Mission */}
    <div className="bg-gray-900 rounded-3xl p-5 text-white shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
      <div className="flex items-start gap-4 relative z-10">
        <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-sm">
          <Target size={28} className="text-orange-400" />
        </div>
        <div>
          <p className="text-gray-300 text-xs font-medium uppercase tracking-wider mb-1">Coach Jeet Says:</p>
          <h2 className="text-lg font-bold mb-1">Hurdle Mechanics Day</h2>
          <p className="text-xs text-gray-300 leading-relaxed mb-3">"Your hip mobility score is low. Fix your trail leg form."</p>
          <button onClick={() => setActiveTab('train')} className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-2">
            Start Drill <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>

    {/* Bio-Passport (Radar) */}
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-gray-800 text-sm">Bio-Passport Analysis</h3>
        <span className="text-[10px] bg-green-50 text-green-700 px-2 py-1 rounded-full font-bold">Healthy</span>
      </div>
      <div className="h-40 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={ATHLETE_PROFILE.stats}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 9 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar name="Viraj" dataKey="A" stroke="#f97316" strokeWidth={2} fill="#f97316" fillOpacity={0.4} />
            <Radar name="Avg" dataKey="B" stroke="#9ca3af" strokeWidth={1} fill="#9ca3af" fillOpacity={0.1} />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

// --- COMPONENT: ACADEMY (LIBRARY + JUGAAD + PATH) ---
const Academy = ({ setActiveTab, setDrillContext }) => {
  const [view, setView] = useState('library'); 

  return (
    <div className="space-y-6 pb-24 animate-slide-in-right">
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
        {['Library', 'Career Path', 'Jugaad Guide'].map(v => (
          <button 
            key={v}
            onClick={() => setView(v.toLowerCase())}
            className={`px-4 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition-all ${view === v.toLowerCase() || (v==='Career Path' && view==='career path') || (v==='Jugaad Guide' && view==='jugaad guide') ? 'bg-gray-900 text-white shadow-lg' : 'bg-gray-100 text-gray-500'}`}
          >
            {v}
          </button>
        ))}
      </div>

      {view === 'library' && (
        <div className="grid grid-cols-2 gap-4">
          {Object.values(SPORTS_LIBRARY).map((sport) => (
            <div key={sport.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer group"
                 onClick={() => {
                   if (sport.skills[0].type === 'ai-drill') {
                     setDrillContext({ mode: sport.skills[0].mode, type: 'drill' });
                     setActiveTab('train');
                   }
                 }}
            >
              <div className={`w-10 h-10 rounded-full ${sport.color} flex items-center justify-center mb-3 text-xl group-hover:scale-110 transition-transform`}>
                {sport.icon}
              </div>
              <h4 className="font-bold text-gray-900">{sport.name}</h4>
              <p className="text-xs text-gray-400 mt-1">{sport.skills.length} Modules</p>
            </div>
          ))}
        </div>
      )}

      {view === 'jugaad guide' && (
        <div className="space-y-4">
          <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
            <h3 className="font-bold text-yellow-900 text-sm">No Equipment? No Problem.</h3>
            <p className="text-xs text-yellow-700 mt-1">Build your own gym with local materials.</p>
          </div>
          {JUGAAD_GUIDE.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 w-10 h-10 rounded-lg flex items-center justify-center text-xl">{item.icon}</div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{item.title}</h4>
                  <p className="text-[10px] text-gray-500">Material: {item.material}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">{item.cost}</span>
            </div>
          ))}
        </div>
      )}

      {view === 'career path' && (
        <div className="space-y-6 border-l-2 border-gray-200 pl-4 ml-2">
          {CAREER_PATH.map((level, idx) => (
            <div key={idx} className={`relative ${level.status === 'Locked' ? 'opacity-50 grayscale' : ''}`}>
              <div className={`absolute -left-[21px] top-0 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center text-white text-xs font-bold ${level.status === 'Locked' ? 'bg-gray-300' : 'bg-orange-600'}`}>
                {idx + 1}
              </div>
              <h3 className="font-bold text-gray-900 ml-2">{level.level} Championship</h3>
              <div className="mt-3 space-y-3">
                {level.modules.map(mod => (
                  <div key={mod.id} 
                       onClick={() => {
                         if(mod.type === 'ai-ghost') {
                           setDrillContext({ mode: 'hurdle', type: 'ghost' });
                           setActiveTab('train');
                         }
                       }}
                       className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-100 p-2 rounded-lg">{mod.type === 'ai-ghost' ? <Brain size={16} /> : <Zap size={16} />}</div>
                      <div>
                        <p className="text-sm font-bold text-gray-800">{mod.title}</p>
                        <p className="text-[10px] text-gray-500">{mod.type === 'ai-ghost' ? 'AI Ghost Mode' : 'Drill'}</p>
                      </div>
                    </div>
                    {mod.score > 0 ? <CheckCircle size={16} className="text-green-500" /> : <Play size={16} className="text-gray-300" />}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// --- COMPONENT: HUB (ASSESSMENT, NUTRITION, RANK) ---
const Hub = () => {
  const [activeSection, setActiveSection] = useState('rank');

  return (
    <div className="space-y-6 pb-24 animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-900">Athlete Hub</h1>
      
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {['rank', 'nutrition', 'assessment'].map(sec => (
          <button 
            key={sec}
            onClick={() => setActiveSection(sec)}
            className={`px-4 py-2 rounded-full text-xs font-bold capitalize whitespace-nowrap ${activeSection === sec ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-500'}`}
          >
            {sec === 'rank' ? 'Leaderboard' : sec}
          </button>
        ))}
      </div>

      {activeSection === 'rank' && (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
           {/* Hyper-local Toggle */}
           <div className="bg-gray-50 p-2 flex gap-2">
             <button className="flex-1 bg-white shadow-sm py-1 rounded text-xs font-bold text-gray-900">My Village</button>
             <button className="flex-1 text-gray-500 py-1 rounded text-xs font-medium">District</button>
             <button className="flex-1 text-gray-500 py-1 rounded text-xs font-medium">State</button>
           </div>
           
           <div className="bg-yellow-50 p-3 border-b border-yellow-100 flex justify-between items-center">
             <span className="text-xs font-bold text-yellow-800">Pilani Village Rank</span>
             <Trophy size={16} className="text-yellow-600" />
           </div>
           {[
             { rank: 1, name: "Ramesh K.", score: 990, village: "Pilani" },
             { rank: 2, name: "Viraj (You)", score: 985, village: "Pilani" },
             { rank: 3, name: "Suresh P.", score: 830, village: "Surajgarh" },
           ].map((u) => (
             <div key={u.rank} className={`flex justify-between p-3 border-b border-gray-50 ${u.name.includes('You') ? 'bg-orange-50' : ''}`}>
               <div className="flex items-center gap-3">
                 <span className="text-sm font-bold text-gray-500 w-6">#{u.rank}</span>
                 <div>
                   <p className="text-sm font-bold text-gray-900">{u.name}</p>
                   <p className="text-[10px] text-gray-400">{u.village}</p>
                 </div>
               </div>
               <span className="text-sm font-mono text-gray-600 font-bold">{u.score}</span>
             </div>
           ))}
        </div>
      )}

      {activeSection === 'nutrition' && (
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-xl border border-green-100 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-green-900">Desi Fuel Plan</h3>
              <p className="text-xs text-green-700">High Protein, Low Cost</p>
            </div>
            <Utensils className="text-green-500" />
          </div>
          <div className="grid grid-cols-1 gap-3">
            {NUTRITION_PLAN.local_hacks.map((item, idx) => (
              <div key={idx} className="bg-white p-3 rounded-xl border border-gray-100 flex justify-between items-center">
                 <div>
                   <h4 className="font-bold text-sm text-gray-900">{item.name}</h4>
                   <p className="text-[10px] text-gray-500">{item.benefit}</p>
                 </div>
                 <span className="text-xs font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded">{item.cost}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {activeSection === 'assessment' && (
         <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
           <div className="flex items-center gap-3 mb-4">
             <div className="bg-blue-100 p-2 rounded-full text-blue-600"><Clipboard size={20} /></div>
             <div>
               <h3 className="font-bold text-gray-800">MYAS Protocols</h3>
               <p className="text-xs text-gray-500">Official Fitness Assessment</p>
             </div>
           </div>
           <div className="space-y-4">
             <div>
               <label className="text-xs font-bold text-gray-500">Performance</label>
               <div className="grid grid-cols-2 gap-2 mt-1">
                 <input type="number" placeholder="600m Run (sec)" className="bg-gray-50 p-2 rounded-lg text-sm" />
                 <input type="number" placeholder="Sit & Reach (cm)" className="bg-gray-50 p-2 rounded-lg text-sm" />
               </div>
             </div>
             <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-blue-200">Submit to SAI</button>
           </div>
         </div>
       )}
    </div>
  );
};

// --- COMPONENT: AI TRAINER (GHOST MODE) ---
const AITrainer = ({ drillContext }) => {
  const [activeDrill, setActiveDrill] = useState(false);
  const [feedback, setFeedback] = useState("Align with the Ghost");
  const canvasRef = useRef(null);
  const requestRef = useRef();
  
  const ghostMode = drillContext?.type === 'ghost';
  const modeName = drillContext?.mode || 'General';

  useEffect(() => {
    if (!activeDrill) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let frame = 0;
    
    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Simulation Background
      ctx.fillStyle = '#111827';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      for(let i=0; i<canvas.width; i+=40) { ctx.beginPath(); ctx.moveTo(i,0); ctx.lineTo(i,canvas.height); ctx.stroke(); }

      const centerX = 200;
      const centerY = 300;
      
      // --- ANIMATION LOGIC ---
      if (ghostMode) {
        // Ghost animation
        const ghostY = Math.sin(frame * 0.1) * 40; 
        const ghostLeg = Math.cos(frame * 0.1) * 30;
        
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.3)';
        ctx.lineWidth = 6;
        ctx.lineCap = 'round';
        ctx.setLineDash([]);
        drawSkeleton(ctx, centerX + 20, centerY - ghostY, ghostLeg, 'rgba(0, 255, 255, 0.3)');
        
        ctx.font = "12px sans-serif";
        ctx.fillStyle = "rgba(0, 255, 255, 0.7)";
        ctx.fillText("PRO GHOST", centerX + 50, centerY - 100);
      }

      // User animation (simulated)
      const userY = Math.sin(frame * 0.1 - 0.5) * 35;
      const userLeg = Math.cos(frame * 0.1 - 0.5) * 25;
      const isGoodForm = Math.abs(userY - (Math.sin(frame * 0.1) * 40)) < 10;
      const userColor = isGoodForm ? '#22c55e' : '#f97316';
      
      setFeedback(isGoodForm ? "Perfect Sync!" : "Adjust Form!");
      drawSkeleton(ctx, centerX, centerY - userY, userLeg, userColor);

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [activeDrill, ghostMode]);

  const drawSkeleton = (ctx, x, y, legOffset, strokeColor) => {
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 4;
    ctx.beginPath(); ctx.arc(x, y - 60, 15, 0, Math.PI * 2); ctx.stroke(); // Head
    ctx.beginPath(); ctx.moveTo(x, y - 45); ctx.lineTo(x, y + 20); ctx.stroke(); // Body
    ctx.beginPath(); ctx.moveTo(x, y + 20); ctx.lineTo(x - 20 - legOffset, y + 80); ctx.stroke(); // Leg L
    ctx.beginPath(); ctx.moveTo(x, y + 20); ctx.lineTo(x + 20 + legOffset, y + 80); ctx.stroke(); // Leg R
    ctx.beginPath(); ctx.moveTo(x, y - 35); ctx.lineTo(x - 30, y - 10 - legOffset); ctx.stroke(); // Arm L
    ctx.beginPath(); ctx.moveTo(x, y - 35); ctx.lineTo(x + 30, y - 10 + legOffset); ctx.stroke(); // Arm R
  };

  return (
    <div className="h-full flex flex-col pb-24 bg-black animate-fade-in relative">
      <div className="absolute top-0 left-0 right-0 p-4 z-20 flex justify-between items-start bg-gradient-to-b from-black/90 to-transparent">
         <div>
           <span className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded animate-pulse">LIVE</span>
           <h2 className="text-white font-bold text-lg mt-1">{modeName} Mode</h2>
         </div>
         <div className="flex gap-2">
            <div className="bg-gray-800 p-2 rounded-full text-white"><Mic size={16} /></div>
            {ghostMode && <div className="text-cyan-400 text-xs border border-cyan-500/50 px-2 py-1 rounded flex items-center">Ghost Active</div>}
         </div>
      </div>

      <div className="flex-grow relative flex items-center justify-center bg-gray-900">
        {!activeDrill ? (
          <div className="text-center p-8 max-w-xs relative z-10">
            <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-orange-500">
              <Camera size={32} className="text-white" />
            </div>
            <h3 className="text-white font-bold text-xl mb-2">Ready to Train?</h3>
            <p className="text-gray-400 text-sm mb-6">Position yourself 6ft away.</p>
            <button onClick={() => setActiveDrill(true)} className="bg-white text-black w-full py-3 rounded-full font-bold">Start {ghostMode ? 'Ghost Sync' : 'Session'}</button>
          </div>
        ) : (
          <>
            <canvas ref={canvasRef} width={400} height={600} className="w-full h-full object-cover opacity-90" />
            <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-3 rounded-xl border border-gray-700">
              <span className="text-xs text-gray-400 block">AI Feedback</span>
              <span className="text-white font-bold text-lg">{feedback}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// --- MAIN APP ---
export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [drillContext, setDrillContext] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex justify-center">
      <div className="w-full max-w-md bg-white shadow-2xl overflow-hidden min-h-screen relative flex flex-col">
        <div className={`px-4 py-2 flex justify-between items-center text-[10px] font-bold sticky top-0 z-50 ${activeTab === 'train' ? 'bg-black text-white' : 'bg-white text-gray-800'}`}>
          <span className="flex items-center gap-1"><div className="w-2 h-2 bg-green-500 rounded-full"></div> ONLINE</span>
          <span className="font-mono">INDIA ACTIVE vFINAL</span>
        </div>

        <div className={`flex-grow overflow-y-auto scrollbar-hide ${activeTab === 'train' ? 'bg-black' : 'bg-gray-50'}`}>
          {activeTab === 'home' && <Dashboard setActiveTab={setActiveTab} />}
          {activeTab === 'academy' && <Academy setActiveTab={setActiveTab} setDrillContext={setDrillContext} />}
          {activeTab === 'hub' && <Hub />}
          {activeTab === 'train' && <AITrainer drillContext={drillContext} />}
        </div>

        <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; } .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; } @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } } .animate-fade-in { animation: fade-in 0.4s ease-out forwards; } @keyframes slide-in-right { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } } .animate-slide-in-right { animation: slide-in-right 0.3s ease-out forwards; }`}</style>
    </div>
  );
}
