
import React, { useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence, useMotionValueEvent } from 'framer-motion';
import { 
  Github, Linkedin, MessageSquare, Layers, Send, CheckCircle2,
  Music, Gamepad2, Clock, Headphones
} from 'lucide-react';
import { HeroScene } from './components/ThreeScene';
import { TechnicalArsenal } from './components/TechnicalArsenal';
import { Project, Experience, Skill } from './types';

// --- Constants & Data ---

// REPLACE THIS WITH YOUR DISCORD USER ID
// Make sure you are in the Lanyard server: https://discord.gg/lanyard
const DISCORD_ID = "599189960725364747"; 

const PROJECTS: Project[] = [];

const EXPERIENCE: Experience[] = [
  {
    id: 1,
    role: "Senior Full Stack Engineer",
    company: "TechFlow Systems",
    period: "2022 - Present",
    description: "Leading the frontend architecture migration to Next.js, improving performance by 40%."
  },
  {
    id: 2,
    role: "Software Developer",
    company: "Creative Nodes",
    period: "2020 - 2022",
    description: "Developed scalable backend microservices using Node.js and Docker for high-traffic clients."
  },
  {
    id: 3,
    role: "Junior Web Developer",
    company: "StartUp Inc.",
    period: "2018 - 2020",
    description: "Built responsive UI components and integrated REST APIs for the main product dashboard."
  }
];

const SKILLS: Skill[] = [
  // Languages
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", category: 'Languages' },
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", category: 'Languages' },
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", category: 'Languages' },
  { name: "Go", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original-wordmark.svg", category: 'Languages' },
  { name: "Swift", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg", category: 'Languages' },

  // Frameworks
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", category: 'Frameworks' },
  { name: "Next.js", logo: "https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_dark_background.png", category: 'Frameworks' },
  { name: "Vue.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg", category: 'Frameworks' },
  { name: "Svelte", logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Svelte_Logo.svg", category: 'Frameworks' },
  { name: "Tailwind", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg", category: 'Frameworks' },
  { name: "Bootstrap", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg", category: 'Frameworks' },
  { name: "Three.js", logo: "https://global.discourse-cdn.com/standard17/uploads/threejs/original/2X/e/e4f86d2200d2d35c30f7b1494e96b9595ebc2751.png", category: 'Frameworks' },
  { name: "Framer", logo: "https://www.vectorlogo.zone/logos/framer/framer-icon.svg", category: 'Frameworks' },
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg", category: 'Frameworks' },
  { name: "Express", logo: "https://www.vectorlogo.zone/logos/expressjs/expressjs-icon.svg", category: 'Frameworks' },
  { name: "NestJS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg", category: 'Frameworks' },
  { name: "Prisma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg", category: 'Frameworks' },
  
  // Databases
  { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg", category: 'Databases' },
  { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg", category: 'Databases' },
  { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg", category: 'Databases' },
  { name: "Redis", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg", category: 'Databases' },
  { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg", category: 'Databases' },
  { name: "Supabase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg", category: 'Databases' },
  { name: "SQLite", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg", category: 'Databases' },

  // Tools
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg", category: 'Tools' },
  { name: "Kubernetes", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg", category: 'Tools' },
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg", category: 'Tools' },
  { name: "AWS", logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg", category: 'Tools' },
  { name: "Azure", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg", category: 'Tools' },
  { name: "Linux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg", category: 'Tools' },
  { name: "Nginx", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg", category: 'Tools' },
  { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg", category: 'Tools' },
  { name: "Postman", logo: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg", category: 'Tools' },
  { name: "VS Code", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg", category: 'Tools' },
  { name: "Vite", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg", category: 'Tools' },
  { name: "Webpack", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/webpack/webpack-original.svg", category: 'Tools' },
];

// --- UI Components ---

const SectionHeading = ({ children, subtitle }: { children: React.ReactNode, subtitle?: boolean }) => (
  <div className="mb-12 md:mb-20 text-center">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-bold font-sans bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mt-4 h-1 w-20 bg-primary mx-auto rounded-full"
      />
    )}
  </div>
);

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  onClick?: () => void;
  href?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button = ({ children, variant = 'primary', onClick, href, className = '', type = 'button' }: ButtonProps) => {
  const baseClass = "relative px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 group overflow-hidden";
  const variants = {
    primary: "bg-primary text-white shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.8)] border border-primary/50",
    outline: "bg-transparent border border-white/20 text-white hover:border-primary hover:text-primary hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]",
    ghost: "bg-transparent text-slate-400 hover:text-white"
  };

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
    </>
  );

  if (href) {
    return <a href={href} className={`${baseClass} ${variants[variant]} ${className}`}>{content}</a>;
  }
  return <button type={type} onClick={onClick} className={`${baseClass} ${variants[variant]} ${className}`}>{content}</button>;
};

const NavLink = ({ href, children, active }: { href: string, children: React.ReactNode, active: boolean }) => (
  <a 
    href={href} 
    className={`text-sm font-medium transition-colors duration-300 relative ${active ? 'text-primary' : 'text-slate-400 hover:text-white'}`}
  >
    {children}
    {active && (
      <motion.span 
        layoutId="nav-indicator"
        className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary shadow-[0_0_10px_#3B82F6]"
      />
    )}
  </a>
);

// --- Discord / Lanyard Component ---

interface LanyardData {
  discord_user: {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
  };
  discord_status: string;
  activities: {
    type: number;
    name: string;
    state?: string;
    details?: string;
    application_id?: string;
    timestamps?: { start: number };
    assets?: { large_image?: string };
  }[];
  listening_to_spotify: boolean;
  spotify: {
    song: string;
    artist: string;
    album_art_url: string;
  } | null;
}

const useLanyard = (userId: string) => {
  const [data, setData] = useState<LanyardData | null>(null);

  useEffect(() => {
    if (!userId) return;

    const socket = new WebSocket('wss://api.lanyard.rest/socket');

    socket.onopen = () => {
      socket.send(JSON.stringify({
        op: 2,
        d: { subscribe_to_id: userId }
      }));
    };

    socket.onmessage = (msg) => {
      const message = JSON.parse(msg.data);
      // INIT_STATE or PRESENCE_UPDATE
      if (message.t === 'INIT_STATE' || message.t === 'PRESENCE_UPDATE') {
        setData(message.d as LanyardData);
      }
    };

    const heartbeat = setInterval(() => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ op: 3 }));
      }
    }, 30000);

    return () => {
      clearInterval(heartbeat);
      socket.close();
    };
  }, [userId]);

  return data;
};

const DiscordStatus = ({ className = "" }: { className?: string }) => {
  const data = useLanyard(DISCORD_ID);
  
  const statusColors = {
    online: 'bg-green-500',
    idle: 'bg-yellow-500',
    dnd: 'bg-red-500',
    offline: 'bg-slate-500'
  };

  const getStatusColor = (status: string) => statusColors[status as keyof typeof statusColors] || statusColors.offline;

  if (!data) {
    // Loading / Fallback state
    return (
      <div className={`glass-card p-6 rounded-xl border border-white/5 animate-pulse flex items-center gap-4 ${className}`}>
         <div className="w-16 h-16 rounded-full bg-white/10" />
         <div className="space-y-2 flex-1">
            <div className="h-4 bg-white/10 rounded w-1/3" />
            <div className="h-3 bg-white/10 rounded w-2/3" />
         </div>
      </div>
    );
  }

  const { discord_user, discord_status, activities, listening_to_spotify, spotify } = data;
  const activity = activities.find((a) => a.type === 0); // Type 0 is "Playing"

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`glass-card p-6 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-primary/30 transition-colors duration-300 ${className}`}
    >
      {/* Header: Avatar & Identity */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <img 
            src={`https://cdn.discordapp.com/avatars/${discord_user.id}/${discord_user.avatar}.png`} 
            alt="Discord Avatar" 
            className="w-16 h-16 rounded-full border-2 border-white/10 shadow-lg"
          />
          <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-[#0a0a0a] ${getStatusColor(discord_status)} shadow-[0_0_10px_currentcolor]`} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            {discord_user.username}
            {discord_status !== 'offline' && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/5 font-mono uppercase tracking-wider">
                {discord_status}
              </span>
            )}
          </h3>
          <p className="text-sm text-slate-400 font-mono">#{discord_user.discriminator}</p>
        </div>
      </div>

      {/* Activity Section */}
      <div className="space-y-4">
        {/* Spotify */}
        {listening_to_spotify && spotify && (
          <div className="bg-[#1db954]/10 border border-[#1db954]/20 p-3 rounded-lg flex items-center gap-3">
            <div className="relative">
              <img src={spotify.album_art_url} alt="Album Art" className="w-12 h-12 rounded-md" />
              <div className="absolute -bottom-1 -right-1 bg-[#1db954] text-black p-0.5 rounded-full">
                <Music size={10} />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-[#1db954] font-bold mb-0.5">LISTENING TO SPOTIFY</p>
              <p className="text-sm font-semibold text-white truncate">{spotify.song}</p>
              <p className="text-xs text-slate-400 truncate">by {spotify.artist}</p>
            </div>
          </div>
        )}

        {/* Coding / Game Activity */}
        {activity && !listening_to_spotify && (
           <div className="bg-primary/5 border border-primary/20 p-3 rounded-lg flex items-start gap-3">
              <div className="relative mt-1">
                 {activity.assets?.large_image ? (
                   <img 
                     src={`https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`} 
                     className="w-12 h-12 rounded-md" 
                     alt="Asset"
                   />
                 ) : (
                   <div className="w-12 h-12 rounded-md bg-primary/20 flex items-center justify-center text-primary">
                      <Gamepad2 size={24} />
                   </div>
                 )}
              </div>
              <div className="flex-1 min-w-0">
                 <p className="text-xs text-primary font-bold mb-0.5 uppercase">{activity.name}</p>
                 <p className="text-sm text-white truncate">{activity.details}</p>
                 <p className="text-xs text-slate-400 truncate">{activity.state}</p>
                 {activity.timestamps && (
                   <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-500 font-mono">
                      <Clock size={10} />
                      <span>
                         {Math.floor((Date.now() - activity.timestamps.start) / 1000 / 60)}m elapsed
                      </span>
                   </div>
                 )}
              </div>
           </div>
        )}

        {/* Fallback/Default Status if nothing playing */}
        {!listening_to_spotify && !activity && (
          <div className="bg-white/5 border border-white/5 p-3 rounded-lg flex items-center gap-3">
             <div className="w-12 h-12 rounded-md bg-white/5 flex items-center justify-center text-slate-400">
                <Headphones size={20} />
             </div>
             <div>
                <p className="text-sm text-white font-medium">Chilling</p>
                <p className="text-xs text-slate-400">No active game or music</p>
             </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// --- Main Sections ---

const FULL_TEXT = ["Full-Stack Developer", "Software Engineer", "Game & Web Systems"];

const Hero = () => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === FULL_TEXT[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 1000);
      return () => clearTimeout(timeout);
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % FULL_TEXT.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  useEffect(() => {
    setText(FULL_TEXT[index].substring(0, subIndex));
  }, [subIndex, index]);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <HeroScene />
      </div>
      
      <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Discord Status replacing the "Hello I am" text */}
            <div className="mb-8 relative z-20">
              <DiscordStatus className="w-full max-w-md shadow-[0_0_40px_rgba(59,130,246,0.15)] bg-black/40 backdrop-blur-xl" />
            </div>

            {/* Hidden H1 for SEO */}
            <h1 className="sr-only">BadClause Portfolio</h1>

            <div className="h-8 mb-8">
              <span className="text-2xl md:text-3xl text-slate-300 font-light font-mono border-r-2 border-primary pr-2 animate-pulse">
                {text}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-12">
              <Button href="#projects">View Projects</Button>
              <Button variant="outline" href="#contact">Contact Me</Button>
            </div>

            <div className="flex gap-6">
              {[Github, Linkedin, MessageSquare].map((Icon, i) => (
                <a key={i} href="#" className="text-slate-400 hover:text-primary transition-colors transform hover:scale-110 duration-200">
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
        {/* Right side is empty to let the 3D orb shine through */}
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-500">
         <div className="w-6 h-10 border-2 border-slate-500 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-primary rounded-full animate-scroll" />
         </div>
      </div>
    </section>
  );
};

const Projects = () => (
  <section id="projects" className="py-24 bg-dark/50">
    <div className="container mx-auto px-6">
      <SectionHeading subtitle>Featured Work</SectionHeading>
      
      <motion.div 
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         className="glass-card min-h-[300px] flex flex-col items-center justify-center rounded-2xl p-8 md:p-12 border border-white/5 text-center relative overflow-hidden"
      >
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 blur-3xl rounded-full pointer-events-none" />
         
         <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 relative z-10 border border-white/10">
            <Layers className="text-primary w-8 h-8" />
         </div>
         
         <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 relative z-10">
            Featured work will add soon
         </h3>
         <p className="text-slate-400 max-w-md relative z-10">
            I'm currently updating my portfolio with my latest high-impact projects. Stay tuned for something special.
         </p>
      </motion.div>
    </div>
  </section>
);

const ExperienceTimeline = () => (
  <section id="experience" className="py-24 relative">
    <div className="container mx-auto px-6">
      <SectionHeading subtitle>Journey</SectionHeading>
      
      <div className="max-w-3xl mx-auto relative">
        {/* Line */}
        <div className="absolute left-0 md:left-1/2 w-0.5 h-full bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0 transform md:-translate-x-1/2" />
        
        <div className="space-y-12">
          {EXPERIENCE.map((exp, idx) => (
            <motion.div 
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`relative flex flex-col md:flex-row gap-8 ${idx % 2 === 0 ? 'md:text-right' : 'md:flex-row-reverse text-left'}`}
            >
              <div className="flex-1 md:w-1/2">
                 <div className="glass-card p-6 rounded-xl border-l-2 border-l-primary md:border-l-white/5 md:border-t-2 hover:border-primary transition-colors duration-300">
                    <h4 className="text-xl font-bold text-white">{exp.role}</h4>
                    <p className="text-primary font-mono text-sm mb-2">{exp.company}</p>
                    <p className="text-slate-400 text-sm leading-relaxed">{exp.description}</p>
                 </div>
              </div>
              
              <div className="absolute left-[-5px] md:left-1/2 w-3 h-3 bg-primary rounded-full transform md:-translate-x-1/2 mt-6 ring-4 ring-dark z-10 shadow-[0_0_10px_#3B82F6]" />
              
              <div className="flex-1 md:w-1/2 md:pt-6">
                <span className="text-sm font-mono text-slate-500">{exp.period}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Contact = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      // Reset after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-dark/80">
       <div className="container mx-auto px-6 max-w-5xl">
          <div className="glass-card rounded-3xl p-8 md:p-12 overflow-hidden relative">
             {/* Background Glow */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-3xl rounded-full -mr-20 -mt-20 pointer-events-none" />
             
             <div className="grid md:grid-cols-2 gap-12">
               <div className="flex flex-col">
                  <h2 className="text-3xl font-bold text-white mb-6">Let's Work Together</h2>
                  <p className="text-slate-400 mb-8">
                    Have a project in mind or want to discuss modern web technologies? I'm always open to new opportunities and collaborations.
                  </p>

                  {/* Discord Status Widget */}
                  <div className="mb-8">
                    <DiscordStatus />
                  </div>
                  
                  <div className="space-y-4 mt-auto">
                     <div className="flex items-center gap-4 text-slate-300 hover:text-primary transition-colors">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary">
                           <MessageSquare size={20} />
                        </div>
                        <span>hello@badclause.dev</span>
                     </div>
                     <div className="flex items-center gap-4 text-slate-300 hover:text-primary transition-colors">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary">
                           <Linkedin size={20} />
                        </div>
                        <span>linkedin.com/in/badclause</span>
                     </div>
                  </div>
               </div>
               
               <form onSubmit={handleSubmit} className="space-y-4 relative">
                  <div>
                    <label className="block text-xs font-mono text-slate-500 mb-1 ml-2">NAME</label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                      placeholder="John Doe" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-500 mb-1 ml-2">EMAIL</label>
                    <input 
                      required
                      type="email" 
                      className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                      placeholder="john@example.com" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-500 mb-1 ml-2">MESSAGE</label>
                    <textarea 
                      required
                      rows={4}
                      className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none"
                      placeholder="Tell me about your project..." 
                    />
                  </div>
                  
                  <Button 
                    className="w-full mt-4" 
                    variant="primary"
                    type="submit"
                  >
                    {status === 'submitting' ? 'Sending...' : 'Send Message'} 
                    {status === 'idle' && <Send size={16} />}
                  </Button>

                  <AnimatePresence>
                    {status === 'success' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-dark/95 backdrop-blur flex flex-col items-center justify-center rounded-xl z-20"
                      >
                         <CheckCircle2 size={48} className="text-green-500 mb-2" />
                         <p className="text-white font-bold">Message Sent!</p>
                         <p className="text-slate-400 text-sm">I'll get back to you soon.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
               </form>
             </div>
          </div>
       </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-black py-8 border-t border-white/5">
    <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
       <div className="text-2xl font-bold tracking-tighter text-white">
          Bad<span className="text-primary">Clause</span>
       </div>
       <div className="text-slate-500 text-sm font-mono">
         © {new Date().getFullYear()} BadClause. All rights reserved.
       </div>
       <div className="flex gap-6">
          <a href="https://github.com/badclause" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-primary transition-colors"><Github size={20}/></a>
          <a href="https://www.linkedin.com/in/badclause" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-primary transition-colors"><Linkedin size={20}/></a>
       </div>
    </div>
  </footer>
);

// --- App Layout ---

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'skills', 'projects', 'experience', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 200 && rect.bottom >= 200;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-dark text-white font-body selection:bg-primary/30 selection:text-white">
      {/* Navbar */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-dark/80 backdrop-blur-md py-4 border-b border-white/5' : 'py-6 bg-transparent'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#home" className="text-2xl font-bold tracking-tighter text-white z-50 relative">
             Bad<span className="text-primary">Clause</span>
          </a>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {['Home', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => {
               const lower = item.toLowerCase();
               return (
                 <NavLink key={lower} href={`#${lower}`} active={activeSection === lower}>
                   {item}
                 </NavLink>
               );
            })}
          </nav>

          {/* Mobile Menu (Simplified for this implementation) */}
          <div className="md:hidden text-slate-400">
             <span className="text-xs font-mono">MENU</span>
          </div>
        </div>
      </header>

      <main>
        <Hero />
        <TechnicalArsenal skills={SKILLS} />
        <Projects />
        <ExperienceTimeline />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
