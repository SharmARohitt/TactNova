import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ChevronDown, Zap, Globe, Cpu, Palette } from 'lucide-react';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';
import * as THREE from 'three';

// Animated 3D Planet Component
const AnimatedPlanet: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 100, 200]} scale={2.5}>
      <MeshDistortMaterial
        color="#0ea5e9"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
};

// Floating particles
const FloatingParticles: React.FC = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      particlesRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
    }
  });

  const particles = new Array(100).fill(0).map(() => ({
    position: [
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
    ],
  }));

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[new Float32Array(particles.flatMap(p => p.position)), 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#d946ef" />
    </points>
  );
};

export const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const x = (clientX / innerWidth) * 100;
      const y = (clientY / innerHeight) * 100;
      
      heroRef.current.style.background = `
        radial-gradient(circle at ${x}% ${y}%, 
        rgba(14, 165, 233, 0.1) 0%, 
        rgba(217, 70, 239, 0.05) 50%, 
        transparent 100%)
      `;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral-950 cyber-bg pt-24"
    >
      {/* Background 3D Scene */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#0ea5e9" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#d946ef" />
          
          <AnimatedPlanet />
          <FloatingParticles />
          <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
          
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-8"
        >
            {/* Main Heading */}
            <div className="space-y-8">
              {/* Welcome Text and Brand Animation */}
              <div className="flex flex-col items-center space-y-2">
                {/* Welcome Text Animation */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-center relative"
                >
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-neutral-100 tracking-[0.2em] uppercase" 
                      style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    Welcome To
                  </h2>
                </motion.div>

                {/* Brand Name Animation */}
                <motion.h1 
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 1.2, 
                    delay: 0.8, 
                    ease: [0.25, 0.46, 0.45, 0.94] 
                  }}
                  className="text-5xl md:text-7xl lg:text-8xl font-bold text-white font-display leading-tight"
                  style={{ fontFamily: 'Orbitron, Poppins, sans-serif' }}
                >
                  <span 
                    className="bg-gradient-to-r from-primary-400 via-accent-400 to-primary-400 bg-clip-text text-transparent glitch"
                    data-text="TACTNOVA"
                  >
                    TACTNOVA
                  </span>
                </motion.h1>

                {/* Dual Niche Platform Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 1.3 }}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500/20 to-accent-500/20 border border-primary-500/30 rounded-full text-primary-300 text-sm md:text-base font-medium shadow-lg backdrop-blur-sm"
                >
                  <Zap className="w-5 h-5 mr-3" />
                  Dual-Niche Innovation Platform
                </motion.div>
              </div>
            
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.8 }}
                className="text-xl md:text-2xl text-neutral-300 max-w-3xl mx-auto leading-relaxed"
              >
                Where technology meets creativity. We solve complex challenges across 
                <span className="text-primary-400 font-semibold"> tech</span> and 
                <span className="text-accent-400 font-semibold"> non-tech</span> domains 
                to build the future.
              </motion.p>
            </div>

          {/* Path Selection CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="group relative p-8 bg-gradient-to-br from-primary-600/20 to-primary-800/20 border border-primary-500/30 rounded-2xl backdrop-blur-sm hover:border-primary-400/50 transition-all duration-300 cursor-pointer w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                  <Cpu className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Tech Innovation</h3>
                <p className="text-neutral-300 text-sm">AI, Full-Stack, Cybersecurity & Quantum</p>
                <Link to="/tech-solutions">
                  <Button 
                    variant="primary" 
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                  >
                    Explore Tech Solutions
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="group relative p-8 bg-gradient-to-br from-accent-600/20 to-accent-800/20 border border-accent-500/30 rounded-2xl backdrop-blur-sm hover:border-accent-400/50 transition-all duration-300 cursor-pointer w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl flex items-center justify-center">
                  <Palette className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Creative Impact</h3>
                <p className="text-neutral-300 text-sm">Strategy, Branding, Experience & Growth</p>
                <Link to="/non-tech-solutions">
                  <Button 
                    variant="primary" 
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                  >
                    Explore Creative Solutions
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-16"
          >
            {[
              { label: 'Projects Delivered', value: '1000+', icon: Globe },
              { label: 'Happy Clients', value: '300+', icon: Zap },
              { label: 'Success Rate', value: '98%', icon: Cpu },
              { label: 'Global Reach', value: '50+', icon: Palette },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                  className="text-center space-y-2"
                >
                  <Icon className="w-8 h-8 mx-auto text-primary-400" />
                  <div className="text-2xl md:text-3xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-neutral-400">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        onClick={scrollToNextSection}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-neutral-400 hover:text-primary-400 transition-colors duration-200"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center space-y-2"
        >
          <span className="text-sm">Discover More</span>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.button>
    </section>
  );
};
