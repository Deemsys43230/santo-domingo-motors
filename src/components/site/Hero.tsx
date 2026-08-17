import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Star, Headset, CreditCard } from "lucide-react";
import { useRef } from "react";
import heroImg from "@/assets/premium_white_suv.png";
import { useTestDrive } from "./TestDriveContext";

export function Hero() {
  const { openModal } = useTestDrive();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section 
      ref={ref} 
      className="relative flex flex-col justify-between overflow-hidden" 
      style={{ 
        backgroundColor: '#050505',
        backgroundImage: 'radial-gradient(circle at 75% 40%, #111111 0%, #050505 60%)',
        minHeight: "85vh"
      }}
    >
      {/* Showroom Lighting Effect */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-1/4 h-px w-1/3 bg-gradient-to-r from-transparent via-[#FFC72C]/30 to-transparent"></div>
        <div className="absolute top-1/4 right-[20%] h-[500px] w-[500px] rounded-full bg-[#FFC72C]/5 blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/3 h-px w-1/4 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] flex-1 flex flex-col md:flex-row items-center px-5 sm:px-8 pt-16 lg:pt-16 pb-8 lg:pb-12">
        
        {/* Left Content (40%) */}
        <div className="w-full md:w-[40%] flex flex-col z-20 mt-8 md:mt-0 order-1">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="h-[2px] w-8 bg-[#FFC72C]"></div>
            <span className="eyebrow text-[#FFC72C] text-[11px] font-bold tracking-[0.25em]">
              SINCE 1920
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="display-xl text-white text-[13vw] sm:text-[9vw] md:text-[6rem] lg:text-[7.5rem] leading-[0.85]"
          >
            <span className="block">DRIVE WHAT</span>
            <span className="block">MOVES YOU.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mt-4 text-[#A0A0A0] text-lg sm:text-xl font-light max-w-md"
          >
            Discover your next vehicle.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <a 
              href="#vehicles" 
              className="group flex items-center justify-center gap-3 bg-[#FFC72C] hover:bg-[#FFD659] text-[#080808] px-8 py-4 text-sm font-bold tracking-widest transition-all duration-300 rounded-none"
            >
              EXPLORE VEHICLES
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            
            <button 
              onClick={() => openModal()}
              className="group flex items-center justify-center border border-white/50 hover:border-white hover:bg-white text-white hover:text-[#080808] px-8 py-4 text-sm font-bold tracking-widest transition-all duration-300 rounded-none"
            >
              BOOK A TEST DRIVE
            </button>
          </motion.div>
        </div>

        {/* Right Content - Vehicle (60%) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full md:w-[60%] relative mt-12 md:mt-0 z-10 order-2"
        >
          <motion.div className="relative">
            {/* Showroom floor reflection/shadow */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[80%] h-12 bg-black blur-xl opacity-90 rounded-[100%]"></div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[60%] h-4 bg-white/5 blur-md rounded-[100%]"></div>
            
            <img 
              src={heroImg} 
              alt="Premium luxury vehicle" 
              className="w-full h-auto object-contain relative z-10"
              style={{
                /* Minimal mask to fade extreme left edge if it's not a transparent png */
                maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 100%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 100%)'
              }}
            />
          </motion.div>
        </motion.div>

      </div>

      {/* Trust Strip (Bottom) */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1, delayChildren: 0.8 } }
        }}
        className="relative z-20 w-full border-t border-white/10 bg-black/50 backdrop-blur-md mt-auto order-3"
      >
        <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
          <div className="flex overflow-x-auto lg:grid lg:grid-cols-4 lg:divide-x divide-white/10 py-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory">
            
            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="flex items-center gap-4 px-2 lg:px-6 min-w-[280px] lg:min-w-0 snap-start">
              <ShieldCheck className="h-7 w-7 text-[#FFC72C] flex-shrink-0" strokeWidth={1.5} />
              <div>
                <h3 className="text-white text-[10px] sm:text-xs font-bold tracking-widest mb-1 uppercase">TRUST & RELIABILITY</h3>
                <p className="text-[#A0A0A0] text-[11px] leading-tight">Since 1920, driven by trust.</p>
              </div>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="flex items-center gap-4 px-2 lg:px-6 min-w-[280px] lg:min-w-0 snap-start">
              <Star className="h-7 w-7 text-[#FFC72C] flex-shrink-0" strokeWidth={1.5} />
              <div>
                <h3 className="text-white text-[10px] sm:text-xs font-bold tracking-widest mb-1 uppercase">PREMIUM BRANDS</h3>
                <p className="text-[#A0A0A0] text-[11px] leading-tight">Top marques. Unmatched quality.</p>
              </div>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="flex items-center gap-4 px-2 lg:px-6 min-w-[280px] lg:min-w-0 snap-start">
              <Headset className="h-7 w-7 text-[#FFC72C] flex-shrink-0" strokeWidth={1.5} />
              <div>
                <h3 className="text-white text-[10px] sm:text-xs font-bold tracking-widest mb-1 uppercase">EXPERT SUPPORT</h3>
                <p className="text-[#A0A0A0] text-[11px] leading-tight">We're here for you every step.</p>
              </div>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="flex items-center gap-4 px-2 lg:px-6 min-w-[280px] lg:min-w-0 snap-start">
              <CreditCard className="h-7 w-7 text-[#FFC72C] flex-shrink-0" strokeWidth={1.5} />
              <div>
                <h3 className="text-white text-[10px] sm:text-xs font-bold tracking-widest mb-1 uppercase">FLEXIBLE FINANCING</h3>
                <p className="text-[#A0A0A0] text-[11px] leading-tight">Solutions tailored to your needs.</p>
              </div>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </section>
  );
}
