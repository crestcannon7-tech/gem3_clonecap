"use client";


import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ArrowRight, MoveUpRight, Menu, X, Globe, ArrowDown, Check, Send } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * IZUM STUDY CLONE - STEP 3: FEATURES, INVERSION & FOOTER
 * * Added: Features Grid (Brutalist Layout)
 * * Added: Inversion Section (White bg, Black text, Blob)
 * * Added: Mad Libs Contact Form
 * * Tech: Tailwind CSS + Framer Motion
 */

// --- 3D COMPONENTS ---

const ParticleSphere = () => {
   const meshRef = useRef();

   useFrame((state) => {
      const time = state.clock.getElapsedTime();
      if (meshRef.current) {
         meshRef.current.rotation.y = time * 0.1;
         meshRef.current.rotation.z = time * 0.05;
         const beat = Math.sin(time * 2);
         const smoothScale = 1.6 + (beat > 0.8 ? 0.1 : 0);
         meshRef.current.scale.set(smoothScale, smoothScale, smoothScale);
      }
   });

   return (
      <mesh ref={meshRef}>
         <sphereGeometry args={[1.8, 32, 32]} />
         <meshBasicMaterial
            color="#FC3A1E"
            wireframe={true}
            transparent={true}
            opacity={0.8}
         />
      </mesh>
   );
};

// --- MAIN APPLICATION ---

const IzumClone = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
   const scrollTargetRef = useRef(null);

   // Custom Cursor
   useEffect(() => {
      const handleMouseMove = (e) => {
         setMousePos({ x: e.clientX, y: e.clientY });
      };
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
   }, []);

   const handleScrollDown = () => {
      scrollTargetRef.current?.scrollIntoView({ behavior: 'smooth' });
   };

   return (
      <div className="min-h-screen bg-[#050505] text-[#FAFAFA] font-mono selection:bg-[#FC3A1E] selection:text-white overflow-x-hidden relative">


         {/* --- CURSOR & NOISE --- */}
         <div className="fixed w-4 h-4 bg-[#FC3A1E] rounded-full pointer-events-none z-[100] mix-blend-difference hidden md:block" style={{ left: mousePos.x, top: mousePos.y, transform: 'translate(-50%, -50%)' }} />
         <div className="fixed w-12 h-12 border border-white/20 rounded-full pointer-events-none z-[99] transition-transform duration-500 hidden md:block" style={{ left: mousePos.x, top: mousePos.y, transform: 'translate(-50%, -50%)' }} />
         <div className="noise-overlay"></div>

         {/* --- NAV --- */}
         <nav className="fixed top-0 left-0 w-full z-40 px-6 py-6 flex justify-between items-center mix-blend-difference text-white">
            <div className="flex items-center gap-2 group cursor-pointer">
               <div className="w-3 h-3 bg-[#FC3A1E] group-hover:animate-ping"></div>
               <span className="font-oswald text-xl tracking-tighter font-bold">AKASH.STUDY</span>
            </div>
            <div className="hidden md:flex items-center gap-8 font-space text-xs tracking-widest uppercase text-white/70">
               {['Curriculum', 'Mentors', 'Pricing', 'Login'].map((item) => (
                  <a key={item} href="#" className="hover:text-[#FC3A1E] transition-colors relative group">{item}</a>
               ))}
               <button className="border border-white/20 px-6 py-2 hover:bg-[#FC3A1E] hover:border-[#FC3A1E] hover:text-black transition-all duration-300">
                  Start Learning
               </button>


            </div>
            <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X /> : <Menu />}</button>
         </nav>

         {isMenuOpen && (
            <div className="fixed inset-0 bg-[#050505] z-30 flex flex-col justify-center items-center gap-8 font-oswald text-4xl">
               {/* Mobile Menu Content */}
               <div className="text-white">Mobile Menu</div>
            </div>
         )}

         {/* --- HERO --- */}
         <main className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-grid-pattern border-x border-white/5 mx-auto max-w-[1600px]">
            <div className="absolute inset-0 z-10 w-full h-full">
               <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} intensity={1.5} color="#FC3A1E" />
                  <ParticleSphere />
               </Canvas>
            </div>
            <div className="relative z-20 w-full px-6 flex flex-col items-center justify-center h-full pointer-events-none">
               <div className="text-center mix-blend-difference">
                  <h1 className="font-oswald text-[15vw] leading-[0.8] font-bold uppercase tracking-tighter text-white">
                     Learn <br /> <span className="text-outline">To Code</span>
                  </h1>
               </div>
               <button onClick={handleScrollDown} className="pointer-events-auto absolute bottom-10 right-6 group flex items-center gap-4 text-right hover:text-[#FC3A1E] transition-colors">
                  <div className="font-space text-xs uppercase tracking-widest text-white/70 group-hover:text-[#FC3A1E]">Push Me Up <br /><span className="text-[10px] opacity-50">To Scroll Down</span></div>
                  <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center group-hover:bg-[#FC3A1E] group-hover:text-black transition-all duration-300"><ArrowDown size={20} /></div>
               </button>
            </div>
         </main>

         {/* --- SECTION 1: FEATURES GRID (WHY US) --- */}
         <section ref={scrollTargetRef} className="bg-[#050505] border-x border-white/5 max-w-[1600px] mx-auto">
            {/* Title Block */}
            <div className="border-b border-white/10 p-6 md:p-12">
               <div className="font-space text-xs text-[#FC3A1E] uppercase tracking-widest mb-4">// 001. Architecture</div>
               <h2 className="font-oswald text-6xl md:text-8xl uppercase text-white leading-none">
                  Why <span className="text-outline">Us?</span>
               </h2>
            </div>

            {/* The Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2">
               {/* Cell 1 */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="border-b border-r border-white/10 p-12 min-h-[400px] flex flex-col justify-between hover:bg-white/5 transition-colors group"
               >
                  <div className="text-4xl font-oswald text-white/20 group-hover:text-[#FC3A1E] transition-colors">01</div>
                  <div>
                     <h3 className="text-3xl font-oswald uppercase mb-4">No Fluff <br />Curriculum</h3>
                     <p className="font-space text-sm text-white/60 leading-relaxed max-w-sm">We skip the "Hello World" basics. Dive straight into Shader Materials, Buffer Geometries, and Server Actions.</p>
                  </div>
               </motion.div>

               {/* Cell 2 */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="border-b border-white/10 p-12 min-h-[400px] flex flex-col justify-between hover:bg-white/5 transition-colors group"
               >
                  <div className="text-4xl font-oswald text-white/20 group-hover:text-[#FC3A1E] transition-colors">02</div>
                  <div>
                     <h3 className="text-3xl font-oswald uppercase mb-4">Production <br />Ready</h3>
                     <p className="font-space text-sm text-white/60 leading-relaxed max-w-sm">Build artifacts, not tutorials. Every project you ship is portfolio-grade and optimized for Core Web Vitals.</p>
                  </div>
               </motion.div>

               {/* Cell 3 */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="border-b md:border-b-0 border-r border-white/10 p-12 min-h-[400px] flex flex-col justify-between hover:bg-white/5 transition-colors group"
               >
                  <div className="text-4xl font-oswald text-white/20 group-hover:text-[#FC3A1E] transition-colors">03</div>
                  <div>
                     <h3 className="text-3xl font-oswald uppercase mb-4">Community <br />Led</h3>
                     <p className="font-space text-sm text-white/60 leading-relaxed max-w-sm">Join a discord of 2,400+ creative developers. Code reviews, pair programming, and job board access.</p>
                  </div>
               </motion.div>

               {/* Cell 4 */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="p-12 min-h-[400px] flex flex-col justify-between hover:bg-white/5 transition-colors group relative overflow-hidden"
               >
                  <div className="absolute top-0 right-0 p-4">
                     <MoveUpRight className="text-[#FC3A1E]" size={32} />
                  </div>
                  <div className="text-4xl font-oswald text-white/20 group-hover:text-[#FC3A1E] transition-colors">04</div>
                  <div>
                     <h3 className="text-3xl font-oswald uppercase mb-4">Career <br />Placement</h3>
                     <p className="font-space text-sm text-white/60 leading-relaxed max-w-sm">Our graduates work at Vercel, Stripe, and top creative agencies worldwide.</p>
                  </div>
               </motion.div>
            </div>
         </section>

         {/* --- SECTION 2: THE INVERSION (WHITE BG) --- */}
         <section className="bg-[#FAFAFA] text-[#050505] py-32 overflow-hidden relative">
            <div className="max-w-[1600px] mx-auto px-6 relative z-10">
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                  {/* Left: Text Content */}
                  <div className="lg:col-span-7">
                     <div className="font-space text-xs text-[#FC3A1E] uppercase tracking-widest mb-4 border border-[#FC3A1E] inline-block px-2 py-1">
                     // 002. Inversion
                     </div>
                     <h2 className="font-oswald text-[10vw] lg:text-9xl leading-[0.85] uppercase mb-12 tracking-tighter">
                        Break <br /> The <span className="italic font-serif">Grid</span>
                     </h2>

                     <div className="space-y-6 max-w-xl">
                        {[
                           "Live 1-on-1 Mentorship Sessions",
                           "Weekly Code Reviews & Refactoring",
                           "Access to Private Component Library",
                           "Lifetime Course Updates"
                        ].map((benefit, i) => (
                           <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -50 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="flex items-center gap-4 group cursor-pointer"
                           >
                              <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-[#FC3A1E] group-hover:text-white transition-all">
                                 <Check size={14} />
                              </div>
                              <span className="font-space text-lg uppercase tracking-wide border-b border-transparent group-hover:border-black transition-all">{benefit}</span>
                           </motion.div>
                        ))}
                     </div>
                  </div>

                  {/* Right: The Blob Visual */}
                  <div className="lg:col-span-5 relative flex justify-center items-center h-[500px]">
                     {/* The Blob */}
                     <div className="animate-blob w-[350px] h-[350px] bg-[#050505] relative z-10 flex items-center justify-center text-white text-center p-8">
                        <span className="font-oswald text-4xl uppercase leading-tight pointer-events-none select-none">
                           Create <br /> <span className="text-[#FC3A1E]">Don't</span> <br /> Copy
                        </span>
                     </div>

                     {/* Rotating Rings around Blob */}
                     <div className="absolute inset-0 border border-black/10 rounded-full animate-[spin_10s_linear_infinite]"></div>
                     <div className="absolute inset-12 border border-black/5 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                  </div>
               </div>
            </div>
         </section>

         {/* --- SECTION 3: MAD LIBS FOOTER --- */}
         <footer className="bg-[#050505] text-white pt-32 pb-12 border-t border-white/10">
            <div className="max-w-[1600px] mx-auto px-6 border-x border-white/5 h-full">

               <div className="mb-24 max-w-4xl mx-auto">
                  <div className="font-space text-xs text-[#FC3A1E] uppercase tracking-widest mb-8">
                  // 003. Initialize Contact
                  </div>

                  {/* The Mad Libs Form */}
                  <form className="font-oswald text-4xl md:text-6xl uppercase leading-snug tracking-tight">
                     <p>
                        Hey Akash, my name is
                        <input type="text" placeholder="YOUR NAME" className="bg-transparent border-b-2 border-white/20 text-[#FC3A1E] placeholder-white/20 focus:outline-none focus:border-[#FC3A1E] px-2 w-[300px] md:w-[400px] mx-2 transition-colors" />
                        . I'm looking to learn
                        <input type="text" placeholder="WEBGL / NEXT.JS" className="bg-transparent border-b-2 border-white/20 text-[#FC3A1E] placeholder-white/20 focus:outline-none focus:border-[#FC3A1E] px-2 w-[300px] md:w-[450px] mx-2 transition-colors" />
                        for my next project. You can reach me at
                        <input type="email" placeholder="EMAIL ADDRESS" className="bg-transparent border-b-2 border-white/20 text-[#FC3A1E] placeholder-white/20 focus:outline-none focus:border-[#FC3A1E] px-2 w-[300px] md:w-[500px] mx-2 transition-colors" />
                        . Let's build something crazy.
                     </p>

                     <div className="mt-16 flex justify-end">
                        <button type="button" className="group flex items-center gap-4 bg-[#FC3A1E] text-black px-8 py-4 text-xl font-bold tracking-widest hover:bg-white transition-colors">
                           SEND MESSAGE <Send size={24} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                     </div>
                  </form>
               </div>

               {/* Bottom Bar */}
               <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/10 font-space text-xs text-white/40 uppercase tracking-widest">
                  <div>&copy; 2024 AKASH. ALL SYSTEMS NORMAL.</div>
                  <div className="flex gap-8 mt-4 md:mt-0">
                     <a href="#" className="hover:text-white transition-colors">Twitter</a>
                     <a href="#" className="hover:text-white transition-colors">Instagram</a>
                     <a href="#" className="hover:text-white transition-colors">Github</a>
                  </div>
               </div>
            </div>
         </footer>
      </div>
   );
};

export default IzumClone;
