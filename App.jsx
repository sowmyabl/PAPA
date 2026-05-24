import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import confetti from 'canvas-confetti';
import { 
  Volume2, VolumeX, Plane, MapPin, 
  Code, Coffee, Sparkles, Heart, 
  Map, Calendar, Send, Compass, 
  BookOpen, Star, Award, ChevronRight, X
} from 'lucide-react';

import ThreeStarfield from './components/ThreeStarfield';
import CustomCursor from './components/CustomCursor';
import useAmbientAudio from './hooks/useAmbientAudio';
import Lenis from 'lenis';

export default function App() {
  const [entered, setEntered] = useState(false);
  const [isWarping, setIsWarping] = useState(false);
  const [activeNickname, setActiveNickname] = useState(null);
  const [activeCountry, setActiveCountry] = useState(null);
  const [activeSecret, setActiveSecret] = useState(null);
  const [secretsFound, setSecretsFound] = useState([]);
  
  // Audio state
  const { isMuted, toggleMute, playChime } = useAmbientAudio();
  
  // Timeline ref for GSAP scroll animations
  const timelineRef = useRef(null);
  const promiseRef = useRef(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (!entered) return;

    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential ease
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [entered]);

  // Handle entering the universe
  const handleEnter = () => {
    setIsWarping(true);
    playChime('high');
    
    // Animate transition
    setTimeout(() => {
      setEntered(true);
      setIsWarping(false);
      // Automatically toggle audio on enter since user interacted
      toggleMute();
    }, 1500);
  };

  // Nickname universe data
  const nicknames = [
    { 
      id: 'papa', 
      name: 'Papa', 
      desc: 'The Code Architect & Anchor', 
      color: 'from-amber-400 to-yellow-500',
      memory: 'The absolute pillar of calm. Whenever late-night code breaks, server crashes, or we fail assignments, you are the one who solves it with quiet genius. Truly the anchor in our chaotic universe.'
    },
    { 
      id: 'magalu', 
      name: 'Magalu', 
      desc: 'The Dreamer & Co-Pilot', 
      color: 'from-blue-400 to-indigo-600',
      memory: 'The ultimate counterpart. Complaining about code, dreaming of distant airports, scheming rich ideas, and making every boring class feel like an adventure. Your official partner in crime.'
    },
    { 
      id: 'sumitra', 
      name: 'Sumitra', 
      desc: 'The Silent Savior', 
      color: 'from-teal-400 to-emerald-500',
      memory: 'The quiet guardian of our sanity. Watching our chaotic debates with a warm smile, keeping us grounded when we are compiling assignments 2 minutes before the deadline.'
    },
    { 
      id: 'hegna', 
      name: 'Hegna', 
      desc: 'Late Night Debugger', 
      color: 'from-cyan-400 to-blue-500',
      memory: 'The coding warrior. Sharing the physical and mental stress of endless lab files, code templates, and drinking countless cups of tea while discussing how to conquer the tech industry.'
    },
    { 
      id: 'gundana', 
      name: 'Gundana', 
      desc: 'The Heart of the Circle', 
      color: 'from-pink-400 to-rose-500',
      memory: 'The sweet soul who keeps the group happy. Always bringing positive energy, sharing snacks, and ensuring that our engineering-stressed lives still have laughter and light.'
    },
    { 
      id: 'chaos-partner', 
      name: 'Chaos Partner', 
      desc: 'The 3 AM Instigator', 
      color: 'from-purple-400 to-fuchsia-600',
      memory: 'From creating bugs on purpose, making stupid jokes during intense exams, to planning random food runs when we should be sleeping. Life is empty without this beautiful chaos.'
    },
    { 
      id: 'future-traveler', 
      name: 'Future Traveler', 
      desc: 'The Global Dreamers', 
      color: 'from-yellow-400 to-orange-500',
      memory: 'Our future self-avatars. The version of us that will look back at college stress while standing on glaciers in Iceland or streets of Tokyo. The promise we are building every single day.'
    }
  ];

  // Travel countries data
  const countries = [
    {
      id: 'ladakh',
      name: 'Ladakh',
      stamp: 'IXL-LEH',
      coords: { x: '68%', y: '43%' },
      date: 'Upcoming Summer',
      dream: 'Biking through the stark majestic valleys of Leh, sitting silently next to the crystal blue Pangong Lake, and stargazing in the highest cold deserts of India.'
    },
    {
      id: 'japan',
      name: 'Japan',
      stamp: 'NRT-TOKYO',
      coords: { x: '78%', y: '45%' },
      date: 'Future Spring',
      dream: 'Walking under cherry blossom tunnels in Kyoto, eating real ramen in neon-drenched Tokyo streets, and visiting futuristic robotics centers together. A blend of tech and tradition.'
    },
    {
      id: 'thailand',
      name: 'Thailand',
      stamp: 'BKK-BANGKOK',
      coords: { x: '73%', y: '48%' },
      date: 'Future Winter',
      dream: 'Exploring golden temples in Bangkok, tasting world-renowned street food, island-hopping in Phuket, and watching tropical sunsets over the Andaman Sea.'
    },
    {
      id: 'maldives',
      name: 'Maldives',
      stamp: 'MLE-MALE',
      coords: { x: '67%', y: '54%' },
      date: 'Future Summer',
      dream: 'Relaxing in overwater bungalows, diving into crystal-clear turquoise waters, stargazing over the Indian Ocean, and talking about how far we have come.'
    },
    {
      id: 'iceland',
      name: 'Iceland',
      stamp: 'KEF-REYKJAVIK',
      coords: { x: '42%', y: '22%' },
      date: 'Future Winter',
      dream: 'Chasing the glowing green ribbons of the Northern Lights, bathing in the Blue Lagoon, and standing in awe of black sand beaches. Promising friendship under the arctic stars.'
    },
    {
      id: 'switzerland',
      name: 'Switzerland',
      stamp: 'ZRH-ZURICH',
      coords: { x: '48%', y: '32%' },
      date: 'Future Autumn',
      dream: 'Riding the panoramic trains past towering snowy Alps, drinking rich Swiss hot chocolate, and celebrating that we finally made it out of the engineering grind.'
    },
    {
      id: 'italy',
      name: 'Italy',
      stamp: 'FCO-ROME',
      coords: { x: '49%', y: '36%' },
      date: 'Future Summer',
      dream: 'Strolling through historical ruins in Rome, riding gondolas in Venice, and having deep midnight conversations over Italian gelato. Live the sweet life (Dolce Vita).'
    },
    {
      id: 'paris',
      name: 'Paris',
      stamp: 'CDG-PARIS',
      coords: { x: '47%', y: '34%' },
      date: 'Future Spring',
      dream: 'Staring at the glowing Eiffel Tower at night, visiting world-class art collections, sharing hot croissants, and remembering our college tea-stall schemes.'
    },
    {
      id: 'london',
      name: 'London',
      stamp: 'LHR-LONDON',
      coords: { x: '45%', y: '32%' },
      date: 'Future Autumn',
      dream: 'Crossing the historic Tower Bridge, riding the giant London Eye, walking through rainy streets with warm coffee, and planning our next coding adventure.'
    },
    {
      id: 'newyork',
      name: 'New York',
      stamp: 'JFK-NYC',
      coords: { x: '28%', y: '35%' },
      date: 'Future New Year',
      dream: 'Looking down at the sea of golden skyscrapers from the Empire State Building, walking through snowy Central Park, and celebrating big city life.'
    }
  ];

  // Timeline events
  const timelineEvents = [
    {
      title: 'Hackathon Nights',
      icon: <Code className="w-5 h-5" />,
      desc: 'Surviving on energy drinks and panic. Writing 800 lines of spaghetti code, only for Papa to calmly fix the bug in 2 minutes.',
      glow: 'shadow-blue-500/20'
    },
    {
      title: 'Coding Stress',
      icon: <Coffee className="w-5 h-5" />,
      desc: 'Staring at terminal screens full of red errors at 2 AM. Questioning why we chose engineering, yet laughing our way through it.',
      glow: 'shadow-yellow-500/20'
    },
    {
      title: 'Tea Shop Conversations',
      icon: <Sparkles className="w-5 h-5" />,
      desc: 'Solving global crises and plotting how to get insanely rich over a hot cup of Rs.10 ginger tea outside the campus gate.',
      glow: 'shadow-teal-500/20'
    },
    {
      title: 'Assignment Suffering',
      icon: <BookOpen className="w-5 h-5" />,
      desc: 'Copying code, pleading for deadlines, and submitting files seconds before 11:59 PM. The true test of our friendship.',
      glow: 'shadow-red-500/20'
    },
    {
      title: 'Dreams of Wealth',
      icon: <Award className="w-5 h-5" />,
      desc: 'Browsing luxury villas and travel vlogs during boring lectures, swearing that one day we would travel the world first-class.',
      glow: 'shadow-purple-500/20'
    },
    {
      title: 'Campus Walkways',
      icon: <Heart className="w-5 h-5" />,
      desc: 'The quiet walks after heavy exams. The small moments that felt like nothing then, but mean everything now.',
      glow: 'shadow-pink-500/20'
    }
  ];

  // Secret messages hidden in stars
  const secrets = [
    { id: 1, text: "Secret Note #1: Remember the time we almost failed the DBMS project and started writing poetry instead? Best night ever.", coords: { top: '15%', left: '82%' } },
    { id: 2, text: "Secret Note #2: Papa's secret superpower: staying quiet for 3 hours, then writing code that runs perfectly on the first try.", coords: { top: '45%', left: '12%' } },
    { id: 3, text: "Secret Note #3: Magalu's travel promise: I will make sure we go to Japan, even if I have to drag you onto the flight myself!", coords: { top: '75%', left: '88%' } },
    { id: 4, text: "Secret Note #4: Tea is not just a drink, it's an engineering debugger. Best code is solved at the stall.", coords: { top: '30%', left: '35%' } },
    { id: 5, text: "Secret Note #5: Happy Birthday Papa! You are truly irreplaceable. Here's to a lifetime of adventures and coding.", coords: { top: '65%', left: '50%' } }
  ];

  const handleSecretClick = (secret) => {
    playChime('warm');
    setActiveSecret(secret);
    if (!secretsFound.includes(secret.id)) {
      setSecretsFound([...secretsFound, secret.id]);
    }
    // Confetti for secret discovery
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#ffe875', '#1e1e64']
    });
  };

  const triggerBirthdayBlast = () => {
    playChime('high');
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.85 },
        colors: ['#ffe875', '#1e1e64', '#ffea00']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.85 },
        colors: ['#ffe875', '#1e1e64', '#ffea00']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  return (
    <div className="relative min-h-screen bg-space-black selection:bg-gold-glow selection:text-space-black overflow-hidden">
      {/* Custom cursor element */}
      <CustomCursor />
      
      {/* Background Starfield */}
      <ThreeStarfield />

      {/* Ambient Audio Controller */}
      {entered && (
        <button
          onClick={toggleMute}
          className="fixed top-6 right-6 z-[100] p-3 rounded-full border border-gold-glow/20 bg-midnight/55 backdrop-blur-md text-gold-glow hover:border-gold-glow/50 hover:bg-royal/30 transition-all duration-300 shadow-md group"
          title={isMuted ? "Play Audio" : "Mute Audio"}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 group-hover:scale-110 transition-transform" />
          ) : (
            <div className="relative flex items-center justify-center">
              <Volume2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-glow opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold-glow"></span>
              </span>
            </div>
          )}
        </button>
      )}

      {/* Hidden Clickable Stars (only visible after entering) */}
      {entered && secrets.map((sec) => (
        <button
          key={sec.id}
          onClick={() => handleSecretClick(sec)}
          className="absolute z-40 p-1 group animate-slow-pulse hover:opacity-100 transition-opacity"
          style={{ top: sec.coords.top, left: sec.coords.left }}
        >
          <Star className={`w-3 h-3 text-gold-glow/60 group-hover:text-gold-glow group-hover:scale-150 transition-all duration-300 ${secretsFound.includes(sec.id) ? 'fill-gold-glow' : ''}`} />
          <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 text-[10px] text-gold-glow bg-space-black/90 px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            {secretsFound.includes(sec.id) ? 'Discovered' : 'Click Star'}
          </span>
        </button>
      ))}

      <AnimatePresence mode="wait">
        {/* OPENING SCENE */}
        {!entered && (
          <motion.div
            key="intro"
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-space-black/95 text-center px-4 overflow-hidden ${
              isWarping ? 'animate-pulse' : ''
            }`}
          >
            {/* Animated Background Nebulas */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-royal/15 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
              <div className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] bg-gold-glow/5 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '12s' }} />
            </div>

            {/* Warp Speed Tunnel Effect Overlay */}
            {isWarping && (
              <div className="absolute inset-0 bg-gradient-to-r from-royal/20 via-transparent to-royal/20 pointer-events-none scale-150 animate-slow-spin" />
            )}

            <div className="max-w-2xl space-y-8 z-10">
              <div className="space-y-6">
                <motion.p
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                  className="font-playfair italic text-lg md:text-xl text-blue-300/80 tracking-wide"
                >
                  Before the dreams…
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.2, delay: 1.0, ease: "easeOut" }}
                  className="font-playfair italic text-lg md:text-xl text-blue-200/80 tracking-wide"
                >
                  Before the world tour…
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 1.5, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
                  className="font-cinzel text-3xl md:text-5xl font-bold text-glow-gold text-gold-glow tracking-wider uppercase leading-snug"
                >
                  There was just a <span className="text-blue-400 text-glow-blue drop-shadow-[0_0_15px_rgba(30,144,255,0.6)]">Papa</span> <br/> and his Magalu.
                </motion.h1>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 2.4, ease: "easeOut" }}
                className="pt-6"
              >
                <button
                  onClick={handleEnter}
                  className="relative px-8 py-3.5 bg-gradient-to-r from-royal to-indigo-900 border border-gold-glow/30 hover:border-gold-glow rounded-full text-gold-glow text-lg font-outfit uppercase tracking-widest hover:text-glow-yellow transition-all duration-500 shadow-[0_0_20px_rgba(255,232,117,0.15)] hover:shadow-[0_0_30px_rgba(255,232,117,0.4)] transform hover:-translate-y-1 overflow-hidden group"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  Enter Our Universe
                </button>
              </motion.div>
            </div>
            
            {/* Ambient copyright */}
            <div className="absolute bottom-6 text-xs text-blue-300/30 tracking-widest font-outfit">
              PAPA & MAGALU • DIGITAL MEMORY SYSTEM v1.0
            </div>
          </motion.div>
        )}

        {/* MAIN LUXURY UNIVERSE PLATFORM */}
        {entered && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="relative z-10 w-full flex flex-col items-center"
          >
            {/* Floating Top Header */}
            <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-gold-glow/10 bg-space-black/40 backdrop-blur-md sticky top-0 z-50">
              <div className="flex items-center space-x-2">
                <Compass className="w-5 h-5 text-gold-glow animate-spin-slow" />
                <span className="font-cinzel text-lg font-bold text-gold-glow tracking-widest text-glow-gold">
                  PAPA & MAGALU
                </span>
              </div>
              <nav className="hidden md:flex items-center space-x-8 text-sm font-outfit tracking-widest text-blue-100/70 uppercase">
                <a href="#birthday" className="hover:text-gold-glow hover:text-glow-yellow transition-all">Birthday</a>
                <a href="#universe" className="hover:text-gold-glow hover:text-glow-yellow transition-all">Universe</a>
                <a href="#travel" className="hover:text-gold-glow hover:text-glow-yellow transition-all">Travel</a>
                <a href="#memories" className="hover:text-gold-glow hover:text-glow-yellow transition-all">Memories</a>
                <a href="#promise" className="hover:text-gold-glow hover:text-glow-yellow transition-all">Promise</a>
                <a href="#future" className="hover:text-gold-glow hover:text-glow-yellow transition-all">Future</a>
              </nav>
            </header>

            {/* SECTION 1: BIRTHDAY REVEAL */}
            <section id="birthday" className="min-h-screen w-full flex flex-col items-center justify-center text-center px-4 relative">
              <div className="absolute inset-0 nebula-gold pointer-events-none opacity-60" />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
                className="max-w-4xl space-y-6 z-10"
              >
                <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-gold-glow/20 bg-gold-glow/5 text-gold-glow text-xs uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  <span>Cinematic Broadcast System</span>
                </div>
                

                
                <h2 className="font-playfair italic text-2xl md:text-3xl text-blue-200/80 tracking-wide">
                  25th May • Celestial Alignment
                </h2>
                
                <h1 className="font-cinzel text-5xl md:text-8xl font-black text-gold-glow text-glow-gold tracking-widest leading-none">
                  HAPPY BIRTHDAY,<br/>PAPA.
                </h1>
                
                <p className="max-w-xl mx-auto font-outfit text-base md:text-lg text-blue-100/60 font-light leading-relaxed">
                  This is not a normal birthday page. It is a digital archive of late-night compilation errors, shared dreams, long tea talks, and the unspoken promises that bind our futures together.
                </p>

                <div className="pt-6">
                  <button
                    onClick={triggerBirthdayBlast}
                    className="px-8 py-3 bg-gradient-to-r from-gold-deep to-gold-glow text-space-black hover:bg-gold-glow rounded-full text-sm font-outfit font-semibold uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_25px_#ffe875] transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    Trigger Cosmic Wish 💛
                  </button>
                </div>
              </motion.div>

              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                <p className="text-[10px] tracking-widest uppercase text-blue-300/30 font-outfit mb-1">Scroll to Travel</p>
                <div className="w-[1px] h-10 bg-gradient-to-b from-gold-glow to-transparent mx-auto" />
              </div>
            </section>

            {/* SECTION 2: PAPA & MAGALU NICKNAME UNIVERSE */}
            <section id="universe" className="min-h-screen w-full flex flex-col items-center justify-center py-20 px-6 relative border-t border-royal/10">
              <div className="absolute inset-0 nebula-blue pointer-events-none opacity-40" />

              <div className="max-w-6xl w-full space-y-12 z-10">
                <div className="text-center space-y-4 max-w-2xl mx-auto">
                  <h2 className="font-cinzel text-3xl md:text-5xl font-bold tracking-widest text-blue-200">
                    NICKNAME CONSTELLATION
                  </h2>
                  <p className="font-outfit text-sm text-blue-200/50 uppercase tracking-widest">
                    Hover and click the floating energy orbs to unlock emotional memory archives.
                  </p>
                </div>

                {/* Floating Nickname Grid/Sphere */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 max-w-4xl mx-auto">
                  {nicknames.map((nick, idx) => (
                    <motion.button
                      key={nick.id}
                      onClick={() => {
                        playChime('warm');
                        setActiveNickname(nick);
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center text-center space-y-3 relative group overflow-hidden border border-gold-glow/5"
                    >
                      {/* Gradient pulse element */}
                      <div className="absolute -inset-10 bg-gradient-to-br from-indigo-900/10 to-royal/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full blur-xl" />

                      <div className={`w-12 h-12 rounded-full bg-gradient-to-tr ${nick.color} flex items-center justify-center text-space-black font-cinzel font-bold text-lg shadow-[0_0_15px_rgba(255,232,117,0.2)] group-hover:shadow-[0_0_25px_rgba(255,232,117,0.5)] transition-all duration-500`}>
                        {nick.name[0]}
                      </div>

                      <div className="space-y-1">
                        <h3 className="font-cinzel text-base font-bold text-glow-gold text-gold-glow group-hover:text-white transition-colors">
                          {nick.name}
                        </h3>
                        <p className="font-outfit text-[11px] text-blue-300/40 uppercase tracking-widest">
                          {nick.desc}
                        </p>
                      </div>
                      
                      <div className="text-[10px] text-gold-glow/50 font-outfit uppercase tracking-widest pt-2 flex items-center group-hover:text-gold-glow transition-colors">
                        Access Feed <ChevronRight className="w-3 h-3 ml-0.5" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 3: WORLD TRAVEL DREAMS */}
            <section id="travel" className="min-h-screen w-full flex flex-col items-center justify-center py-20 px-6 relative border-t border-royal/10 bg-space-dark/50">
              <div className="absolute inset-0 nebula-gold pointer-events-none opacity-20" />

              <div className="max-w-6xl w-full space-y-10 z-10">
                <div className="text-center space-y-4 max-w-2xl mx-auto">
                  <h2 className="font-cinzel text-3xl md:text-5xl font-bold tracking-widest text-gold-glow text-glow-gold">
                    FUTURE FLIGHT DECKS
                  </h2>
                  <p className="font-outfit text-sm text-blue-200/50 uppercase tracking-widest">
                    World travel pathways. Where we are heading when the dreams turn into reality.
                  </p>
                </div>

                {/* Interactive Map Layout */}
                <div className="relative w-full max-w-5xl aspect-[16/9] border border-gold-glow/10 rounded-3xl overflow-hidden bg-space-black/70 glass-card p-4 flex flex-col md:flex-row gap-6">
                  {/* Map Graphic Panel (Left) */}
                  <div className="relative flex-1 bg-midnight/35 border border-indigo-950/60 rounded-2xl overflow-hidden flex items-center justify-center">
                    {/* Glowing Vector Map Silhouette (Abstract SVG lines) */}
                    <svg viewBox="0 0 1000 500" className="w-full h-full pointer-events-none">
                      {/* Radar sweep grids */}
                      <g stroke="rgba(30, 144, 255, 0.05)" strokeWidth="0.5">
                        <line x1="100" y1="0" x2="100" y2="500" strokeDasharray="4,4" />
                        <line x1="200" y1="0" x2="200" y2="500" strokeDasharray="4,4" />
                        <line x1="300" y1="0" x2="300" y2="500" strokeDasharray="4,4" />
                        <line x1="400" y1="0" x2="400" y2="500" strokeDasharray="4,4" />
                        <line x1="500" y1="0" x2="500" y2="500" strokeDasharray="4,4" />
                        <line x1="600" y1="0" x2="600" y2="500" strokeDasharray="4,4" />
                        <line x1="700" y1="0" x2="700" y2="500" strokeDasharray="4,4" />
                        <line x1="800" y1="0" x2="800" y2="500" strokeDasharray="4,4" />
                        <line x1="900" y1="0" x2="900" y2="500" strokeDasharray="4,4" />
                        
                        <line x1="0" y1="100" x2="1000" y2="100" strokeDasharray="4,4" />
                        <line x1="0" y1="200" x2="1000" y2="200" strokeDasharray="4,4" />
                        <line x1="0" y1="300" x2="1000" y2="300" strokeDasharray="4,4" />
                        <line x1="0" y1="400" x2="1000" y2="400" strokeDasharray="4,4" />
                      </g>
                      
                      {/* Stylized Continental Silhouettes */}
                      <g fill="rgba(30, 144, 255, 0.05)" stroke="rgba(30, 144, 255, 0.25)" strokeWidth="1">
                        {/* North America */}
                        <path d="M 80,100 L 180,90 L 250,130 L 280,160 L 250,230 L 220,220 L 200,250 L 180,250 L 170,220 L 140,210 L 120,180 L 90,170 Z" />
                        {/* South America */}
                        <path d="M 240,260 L 280,280 L 310,310 L 330,360 L 280,440 L 260,450 L 250,400 L 230,320 L 225,280 Z" />
                        {/* Greenland */}
                        <path d="M 320,50 L 370,40 L 400,70 L 350,90 Z" />
                        {/* Africa */}
                        <path d="M 450,240 L 510,210 L 550,220 L 570,250 L 575,290 L 550,350 L 510,400 L 490,410 L 485,380 L 450,290 L 440,260 Z" />
                        {/* Europe */}
                        <path d="M 430,120 L 470,100 L 530,110 L 540,160 L 510,180 L 480,210 L 440,200 Z" />
                        {/* Asia */}
                        <path d="M 540,110 L 680,90 L 800,80 L 880,110 L 900,160 L 880,220 L 850,260 L 820,300 L 780,290 L 750,270 L 720,290 L 680,280 L 620,290 L 580,260 L 540,220 L 550,160 Z" />
                        {/* Australia */}
                        <path d="M 780,360 L 850,350 L 880,390 L 840,430 L 800,420 L 770,390 Z" />
                        {/* India Highlight Overlay */}
                        <path d="M 650,220 L 675,230 L 690,260 L 675,295 L 660,270 L 645,250 Z" fill="rgba(255, 232, 117, 0.08)" stroke="rgba(255, 232, 117, 0.3)" />
                      </g>

                      {/* Concentric radar sweeps centered around India (680, 215) */}
                      <circle cx="680" cy="215" r="60" fill="none" stroke="rgba(255,232,117,0.15)" strokeDasharray="3,3" />
                      <circle cx="680" cy="215" r="140" fill="none" stroke="rgba(30,144,255,0.08)" strokeDasharray="6,6" />
                      <circle cx="680" cy="215" r="260" fill="none" stroke="rgba(30,144,255,0.04)" />

                      {/* Interactive Route Arcs dynamically overlayed from Ladakh (680, 215) */}
                      {countries.map((c) => {
                        const originX = 680;
                        const originY = 215;
                        const destX = parseFloat(c.coords.x) * 10;
                        const destY = parseFloat(c.coords.y) * 5;
                        
                        // Calculate midpoint and control point offset
                        const midX = (originX + destX) / 2;
                        const midY = (originY + destY) / 2;
                        const dist = Math.sqrt(Math.pow(destX - originX, 2) + Math.pow(destY - originY, 2));
                        const ctrlX = midX;
                        const ctrlY = midY - dist * 0.22; // proportional arc height

                        return (
                          <g key={`route-${c.id}`}>
                            {/* Route Path */}
                            <path
                              d={`M ${originX},${originY} Q ${ctrlX},${ctrlY} ${destX},${destY}`}
                              fill="none"
                              stroke={activeCountry?.id === c.id ? "#ffe875" : "rgba(30, 144, 255, 0.3)"}
                              strokeWidth={activeCountry?.id === c.id ? "3.5" : "1"}
                              strokeDasharray={activeCountry?.id === c.id ? "none" : "3,3"}
                              className="transition-all duration-300"
                            />
                            {/* Destination pulse circle */}
                            {activeCountry?.id === c.id && (
                              <circle cx={destX} cy={destY} r="3" fill="#ffe875" className="animate-ping" />
                            )}
                          </g>
                        );
                      })}
                    </svg>

                    {/* Glowing Airport/Destination Pins */}
                    {countries.map((country) => (
                      <button
                        key={country.id}
                        onClick={() => {
                          playChime('warm');
                          setActiveCountry(country);
                        }}
                        style={{ left: country.coords.x, top: country.coords.y }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 group"
                      >
                        <span className="relative flex h-5 w-5">
                          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${activeCountry?.id === country.id ? 'bg-gold-glow' : 'bg-royal'}`} />
                          <span className={`relative inline-flex rounded-full h-5 w-5 border border-space-black flex items-center justify-center ${activeCountry?.id === country.id ? 'bg-gold-glow text-space-black' : 'bg-royal text-gold-glow'} group-hover:scale-125 transition-transform duration-300`}>
                            <MapPin className="w-2.5 h-2.5" />
                          </span>
                        </span>
                        
                        {/* Tooltip on Hover */}
                        <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-space-black/95 border border-gold-glow/20 px-3 py-1 rounded-md text-[11px] font-outfit uppercase tracking-widest text-gold-glow opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                          {country.name}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Stamp Details Panel (Right) */}
                  <div className="w-full md:w-80 flex flex-col justify-between border-t md:border-t-0 md:border-l border-gold-glow/10 pt-6 md:pt-0 md:pl-6">
                    <AnimatePresence mode="wait">
                      {activeCountry ? (
                        <motion.div
                          key={activeCountry.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.4 }}
                          className="space-y-6 flex-1 flex flex-col justify-between"
                        >
                          {/* Passport Stamp Design */}
                          <div className="space-y-4">
                            <div className="border-4 border-double border-gold-glow/40 p-4 rounded-xl relative overflow-hidden flex flex-col items-center justify-center text-center max-w-[220px] mx-auto rotate-[-2deg]">
                              <div className="absolute top-0 right-0 w-8 h-8 bg-gold-glow/10 rounded-bl-full flex items-center justify-center border-l border-b border-gold-glow/30">
                                <Plane className="w-3.5 h-3.5 text-gold-glow" />
                              </div>
                              <span className="font-cinzel text-[10px] text-blue-300/60 uppercase tracking-widest">Border Entry Control</span>
                              <span className="font-cinzel text-xl font-extrabold text-gold-glow tracking-widest my-1">{activeCountry.stamp}</span>
                              <span className="font-outfit text-xs text-blue-100/40 uppercase tracking-widest border-t border-gold-glow/20 pt-1 w-full">{activeCountry.date}</span>
                            </div>

                            <div className="space-y-2">
                              <h3 className="font-cinzel text-lg font-bold text-glow-gold text-gold-glow">
                                {activeCountry.name}
                              </h3>
                              <p className="font-outfit text-sm text-blue-100/70 leading-relaxed font-light">
                                {activeCountry.dream}
                              </p>
                            </div>
                          </div>

                          <div className="text-[11px] font-outfit text-blue-300/40 tracking-wider">
                            FLIGHT SCHEDULER: PENDING GRADUATION
                          </div>
                        </motion.div>
                      ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center py-10 opacity-60">
                          <Plane className="w-10 h-10 text-gold-glow/30 mb-3 animate-bounce" />
                          <h3 className="font-cinzel text-sm font-bold text-gold-glow uppercase tracking-wider">Select a Flight Deck</h3>
                          <p className="font-outfit text-xs text-blue-100/50 mt-1 max-w-[200px]">
                            Click a map node to display our boarding stamp details.
                          </p>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: HOLOGRAPHIC TIMELINE */}
            <section id="memories" ref={timelineRef} className="min-h-screen w-full flex flex-col items-center justify-center py-24 px-6 relative border-t border-royal/10">
              <div className="max-w-5xl w-full space-y-16 z-10">
                <div className="text-center space-y-4 max-w-2xl mx-auto">
                  <h2 className="font-cinzel text-3xl md:text-5xl font-bold tracking-widest text-blue-200">
                    ENGINEERING ARCHIVES
                  </h2>
                  <p className="font-outfit text-sm text-blue-200/50 uppercase tracking-widest">
                    The foundations of our universe. From classroom assignments to global dreams.
                  </p>
                </div>

                {/* Vertical Timeline */}
                <div className="relative border-l border-gold-glow/20 pl-8 space-y-12 max-w-3xl mx-auto">
                  {timelineEvents.map((event, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, delay: idx * 0.1 }}
                      className="relative group"
                    >
                      {/* Timeline dot */}
                      <span className="absolute -left-[45px] top-1 flex h-8 w-8 items-center justify-center rounded-full bg-space-black border border-gold-glow/40 text-gold-glow group-hover:border-gold-glow group-hover:shadow-[0_0_10px_#ffe875] transition-all duration-300">
                        {event.icon}
                      </span>

                      {/* Glass Card */}
                      <div className={`glass-card p-6 rounded-2xl border border-gold-glow/5 shadow-md ${event.glow} transition-shadow duration-500`}>
                        <h3 className="font-cinzel text-lg font-bold text-gold-glow text-glow-gold group-hover:text-white transition-colors mb-2">
                          {event.title}
                        </h3>
                        <p className="font-outfit text-sm text-blue-100/70 font-light leading-relaxed">
                          {event.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 5: EMOTIONAL PROMISE SCENE */}
            <section id="promise" ref={promiseRef} className="min-h-screen w-full flex flex-col items-center justify-center py-20 px-6 relative border-t border-royal/10 bg-gradient-to-b from-space-black via-midnight/25 to-space-black">
              <div className="absolute inset-0 nebula-blue pointer-events-none opacity-30" />

              <div className="max-w-4xl w-full space-y-10 z-10 text-center relative px-4">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-15">
                  <Plane className="w-24 h-24 text-gold-glow animate-float" />
                </div>
                
                <h2 className="font-cinzel text-sm font-semibold tracking-widest text-gold-glow uppercase text-glow-gold">
                  Our Unwritten Covenant
                </h2>

                {/* Storytelling Text Board */}
                <div className="glass-card max-w-2xl mx-auto p-10 md:p-14 rounded-3xl border border-gold-glow/10 shadow-[0_0_30px_rgba(30,144,255,0.05)] text-left relative overflow-hidden">
                  <div className="absolute -top-10 -left-10 w-40 h-40 bg-royal/10 rounded-full blur-2xl pointer-events-none" />
                  
                  <blockquote className="space-y-6 text-blue-100/90 font-playfair italic text-lg md:text-2xl leading-relaxed tracking-wide">
                    <motion.p
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.2 }}
                    >
                      “I don’t know where life will take us.<br/>
                      Maybe life changes. Maybe we become busy.<br/>
                      Maybe we travel far away.”
                    </motion.p>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 1.2 }}
                    >
                      “But one thing I never want to change is this bond.”
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 2.2 }}
                      className="text-gold-glow text-glow-gold font-bold text-xl md:text-3xl border-t border-gold-glow/20 pt-6 mt-6 not-italic"
                    >
                      “I should always remain your Magalu,<br/>
                      and you should always remain my Papa.”
                    </motion.p>
                  </blockquote>

                  {/* Tiny heart stamp */}
                  <div className="absolute bottom-6 right-8 flex items-center space-x-1 opacity-40">
                    <Heart className="w-3.5 h-3.5 text-gold-glow fill-gold-glow" />
                    <span className="font-cinzel text-[10px] text-blue-200 uppercase tracking-widest">Eternal Seal</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: FUTURE US SPLIT-SCREEN */}
            <section id="future" className="min-h-screen w-full flex flex-col md:flex-row relative border-t border-royal/10 overflow-hidden">
              {/* Left Screen: Student Life */}
              <div className="flex-1 min-h-[50vh] md:min-h-screen bg-space-black relative flex flex-col items-center justify-center p-8 border-b md:border-b-0 md:border-r border-gold-glow/10 group overflow-hidden">
                <div className="absolute inset-0 bg-royal/5 opacity-50 group-hover:scale-105 transition-transform duration-700 pointer-events-none" />
                
                <div className="space-y-6 text-center md:text-left max-w-md z-10">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-900/35 border border-indigo-500/20 flex items-center justify-center mx-auto md:mx-0 text-indigo-400">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h3 className="font-cinzel text-3xl font-extrabold text-blue-200 tracking-wider">
                    THE LAB CLASSROOMS
                  </h3>
                  <div className="space-y-4 text-sm text-blue-100/60 font-light leading-relaxed">
                    <p className="flex items-center space-x-2 justify-center md:justify-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-glow"></span>
                      <span>Struggling to solve assignments before midnight</span>
                    </p>
                    <p className="flex items-center space-x-2 justify-center md:justify-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-glow"></span>
                      <span>Surviving lectures by drawing dreams in margins</span>
                    </p>
                    <p className="flex items-center space-x-2 justify-center md:justify-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-glow"></span>
                      <span>Coffee & tea dependency just to keep compiling</span>
                    </p>
                  </div>
                  <p className="font-playfair italic text-blue-300/40 text-base">
                    "Where the dreams began."
                  </p>
                </div>
              </div>

              {/* Right Screen: Travel Life */}
              <div className="flex-1 min-h-[50vh] md:min-h-screen bg-space-dark relative flex flex-col items-center justify-center p-8 group overflow-hidden">
                <div className="absolute inset-0 bg-gold-glow/5 opacity-50 group-hover:scale-105 transition-transform duration-700 pointer-events-none" />

                <div className="space-y-6 text-center md:text-left max-w-md z-10">
                  <div className="w-12 h-12 rounded-2xl bg-gold-glow/10 border border-gold-glow/20 flex items-center justify-center mx-auto md:mx-0 text-gold-glow">
                    <Plane className="w-6 h-6 animate-float" />
                  </div>
                  <h3 className="font-cinzel text-3xl font-extrabold text-gold-glow text-glow-gold tracking-wider">
                    GLOBAL DEPARTURES
                  </h3>
                  <div className="space-y-4 text-sm text-blue-100/60 font-light leading-relaxed">
                    <p className="flex items-center space-x-2 justify-center md:justify-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-glow"></span>
                      <span>Boarding first-class flights to Tokyo & Reykjavik</span>
                    </p>
                    <p className="flex items-center space-x-2 justify-center md:justify-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-glow"></span>
                      <span>Stargazing on black sand shores instead of terminals</span>
                    </p>
                    <p className="flex items-center space-x-2 justify-center md:justify-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-glow"></span>
                      <span>The freedom to create, explore, and live without limits</span>
                    </p>
                  </div>
                  <p className="font-playfair italic text-gold-glow/40 text-base">
                    "Where the dreams turn real."
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 8: FINAL ENDING SCENE */}
            <section className="min-h-screen w-full flex flex-col items-center justify-center text-center px-4 relative border-t border-royal/10">
              <div className="absolute inset-0 nebula-gold pointer-events-none opacity-40" />

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
                className="max-w-3xl space-y-8 z-10"
              >
                <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-royal to-gold-glow rounded-full p-[1px] flex items-center justify-center animate-slow-spin">
                  <div className="w-full h-full bg-space-black rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-gold-glow fill-gold-glow animate-pulse" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h2 className="font-playfair italic text-2xl md:text-3xl text-blue-200/80 tracking-wide">
                    From Classrooms to Countries…
                  </h2>
                  <h1 className="font-cinzel text-4xl md:text-7xl font-black text-gold-glow text-glow-gold tracking-widest">
                    PAPA & MAGALU FOREVER.
                  </h1>
                </div>

                <div className="pt-8 border-t border-gold-glow/10 max-w-sm mx-auto">
                  <p className="font-cinzel text-lg font-bold text-glow-yellow text-glowing-yellow tracking-widest uppercase">
                    HAPPY BIRTHDAY, PAPA 💛
                  </p>
                  <p className="font-outfit text-xs text-blue-300/30 uppercase tracking-widest mt-2">
                    System active • Always and forever your Magalu
                  </p>
                </div>
              </motion.div>

              {/* Tiny footer details */}
              <div className="absolute bottom-6 text-[10px] text-blue-300/20 tracking-wider">
                PROUDLY COMPILED WITH LOVE • HOSTED ON STARFIELD-NET
              </div>
            </section>

            {/* DETAILS MODAL FOR NICKNAME UNIVERSE */}
            <AnimatePresence>
              {activeNickname && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-space-black/90 backdrop-blur-lg"
                >
                  <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="glass-card max-w-md w-full p-8 rounded-3xl border border-gold-glow/20 shadow-[0_0_50px_rgba(255,232,117,0.15)] relative overflow-hidden"
                  >
                    <button
                      onClick={() => {
                        playChime('standard');
                        setActiveNickname(null);
                      }}
                      className="absolute top-5 right-5 p-2 rounded-full hover:bg-royal/20 border border-gold-glow/10 hover:border-gold-glow/30 text-gold-glow transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <div className="flex flex-col items-center text-center space-y-6 pt-4">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-tr ${activeNickname.color} flex items-center justify-center text-space-black font-cinzel font-bold text-2xl shadow-[0_0_20px_rgba(255,232,117,0.3)]`}>
                        {activeNickname.name[0]}
                      </div>

                      <div className="space-y-1">
                        <span className="font-outfit text-[10px] text-gold-glow/60 uppercase tracking-widest border border-gold-glow/20 px-2 py-0.5 rounded-full">
                          Memory Node Entry
                        </span>
                        <h3 className="font-cinzel text-2xl font-black text-glow-gold text-gold-glow pt-2">
                          {activeNickname.name}
                        </h3>
                        <p className="font-outfit text-xs text-blue-300/40 uppercase tracking-widest">
                          {activeNickname.desc}
                        </p>
                      </div>

                      <p className="font-outfit text-sm md:text-base text-blue-100/80 leading-relaxed font-light">
                        {activeNickname.memory}
                      </p>

                      <div className="w-full pt-4 border-t border-gold-glow/10 flex items-center justify-center text-[10px] text-blue-300/30 tracking-widest font-outfit uppercase">
                        DECRYPTION COMPLETE • SYSTEM SECURE
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* DETAILS MODAL FOR SECRET STARS */}
            <AnimatePresence>
              {activeSecret && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-space-black/90 backdrop-blur-lg"
                >
                  <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="glass-card max-w-sm w-full p-8 rounded-3xl border border-gold-glow/20 shadow-[0_0_50px_rgba(255,232,117,0.15)] relative overflow-hidden text-center space-y-6"
                  >
                    <button
                      onClick={() => {
                        playChime('standard');
                        setActiveSecret(null);
                      }}
                      className="absolute top-5 right-5 p-2 rounded-full hover:bg-royal/20 border border-gold-glow/10 hover:border-gold-glow/30 text-gold-glow transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <div className="w-12 h-12 rounded-full bg-gold-glow/10 border border-gold-glow/30 flex items-center justify-center mx-auto text-gold-glow">
                      <Star className="w-5 h-5 fill-gold-glow" />
                    </div>

                    <div className="space-y-1">
                      <span className="font-outfit text-[9px] text-gold-glow/60 uppercase tracking-widest border border-gold-glow/20 px-2 py-0.5 rounded-full">
                        Star Signal Unlocked
                      </span>
                      <h3 className="font-cinzel text-lg font-bold text-glow-gold text-gold-glow pt-2">
                        Celestial Secret
                      </h3>
                    </div>

                    <p className="font-playfair italic text-sm text-blue-100/90 leading-relaxed">
                      {activeSecret.text}
                    </p>

                    <div className="text-[10px] text-blue-300/30 tracking-widest font-outfit uppercase pt-2 border-t border-gold-glow/10">
                      Discovered {secretsFound.length} of {secrets.length} Secrets
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
