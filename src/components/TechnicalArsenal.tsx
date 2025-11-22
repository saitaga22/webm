
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { Skill } from '../types';

// --- 1. Particle Background ---
const ParticleBackground = () => {
  // Create a fixed set of particles with random initial positions
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 10,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary/20 blur-[1px]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, 50, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-transparent to-dark opacity-80" />
    </div>
  );
};

// --- 2. Skill Card with 3D Tilt & Magnetic Effect ---
const SkillCard = ({ skill }: { skill: Skill }) => {
  const ref = useRef<HTMLDivElement>(null);

  // Mouse position state
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring animation for physics feel
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  // Calculate rotation based on mouse position (Tilt)
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

  // Magnetic translation (Card moves slightly towards cursor)
  const translateX = useTransform(mouseX, [-0.5, 0.5], ["-4px", "4px"]);
  const translateY = useTransform(mouseY, [-0.5, 0.5], ["-4px", "4px"]);

  // Dynamic spotlight gradient
  const spotlightX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const spotlightY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);
  const spotlight = useMotionTemplate`radial-gradient(circle at ${spotlightX} ${spotlightY}, rgba(59,130,246,0.15), transparent 80%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Normalized coordinates (-0.5 to 0.5)
    const mouseXVal = (e.clientX - rect.left) / width - 0.5;
    const mouseYVal = (e.clientY - rect.top) / height - 0.5;

    x.set(mouseXVal);
    y.set(mouseYVal);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        x: translateX,
        y: translateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative min-h-[140px] bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center gap-4 transition-all duration-300 ease-out hover:border-primary/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]"
    >
      {/* Spotlight Effect */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: spotlight }}
      />

      {/* Logo Container with Bloom Effect */}
      <motion.div
        className="relative z-10 p-3 rounded-xl bg-white/5 border border-white/5 group-hover:border-primary/20 group-hover:bg-white/10 transition-colors duration-300 shadow-inner"
        whileHover={{ scale: 1.1 }}
      >
        <img
          src={skill.logo}
          alt={skill.name}
          className="w-10 h-10 object-contain drop-shadow-md"
        />
      </motion.div>

      {/* Label */}
      <span className="relative z-10 font-mono text-sm font-semibold text-slate-400 group-hover:text-white tracking-wide transition-colors duration-300">
        {skill.name}
      </span>

      {/* Corner Accents (Cyberpunk aesthetic) */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 rounded-tl-md group-hover:border-primary/60 transition-colors" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 rounded-br-md group-hover:border-primary/60 transition-colors" />
    </motion.div>
  );
};

// --- 3. Category Block with Grid Entrance ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const CategoryBlock = ({ title, skills }: { title: string; skills: Skill[] }) => {
  return (
    <div className="mb-16 last:mb-0">
      {/* Category Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="flex items-center gap-4 mb-8"
      >
        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500 w-max">
          {title}
        </h3>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-primary via-primary/20 to-transparent shadow-[0_0_10px_#3B82F6]" />
      </motion.div>

      {/* Skill Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 perspective-1000"
      >
        {skills.map((skill, idx) => (
          <motion.div key={idx} variants={itemVariants}>
            <SkillCard skill={skill} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

// --- 4. Main Technical Arsenal Section ---
export const TechnicalArsenal = ({ skills }: { skills: Skill[] }) => {
  const categories = ['Languages', 'Frameworks', 'Databases', 'Tools'];

  return (
    <section id="skills" className="py-32 relative overflow-hidden min-h-screen">
      <ParticleBackground />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold font-sans text-white mb-4 tracking-tighter"
          >
            Technical <span className="text-primary">Arsenal</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 font-mono uppercase tracking-widest text-sm"
          >
            High-Performance Technologies
          </motion.p>
        </div>

        <div className="max-w-7xl mx-auto">
          {categories.map((category) => {
            const categorySkills = skills.filter((s) => s.category === category);
            if (categorySkills.length === 0) return null;
            
            return (
              <CategoryBlock
                key={category}
                title={category}
                skills={categorySkills}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
