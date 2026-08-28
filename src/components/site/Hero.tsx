import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useTestDrive } from "./TestDriveContext";

import cadillac from "@/assets/generated/cadillac_escalade_1787850081539.jpg";
import chevrolet from "@/assets/generated/Chevrolet Tahoe at Golden Hour.png";
import infiniti from "@/assets/generated/Infiniti QX60 by the Mountain Lake.png";
import nissan from "@/assets/generated/nissan_pathfinder_1787850058100.jpg";
import suzuki from "@/assets/generated/Grand Vitara at Sunset Mountains.png";
import yamaha from "@/assets/generated/Yamaha MT-09 SP at Sunset.png";

const slides = [
  {
    id: "cadillac",
    brand: "CADILLAC",
    model: "ESCALADE",
    tagline: "The Standard of the World",
    image: cadillac,
    imageClass: "object-cover object-[80%_center] md:object-[75%_center]",
  },
  {
    id: "chevrolet",
    brand: "CHEVROLET",
    model: "TAHOE",
    tagline: "Find New Roads",
    image: chevrolet,
    imageClass: "object-cover object-[70%_center]",
  },
  {
    id: "nissan",
    brand: "NISSAN",
    model: "PATHFINDER",
    tagline: "Innovation That Excites",
    image: nissan,
    imageClass: "object-cover object-[80%_center]",
  },
  {
    id: "infiniti",
    brand: "INFINITI",
    model: "QX60",
    tagline: "Luxury Should Be Lived In",
    image: infiniti,
    imageClass: "object-cover object-[75%_center]",
  },
  {
    id: "suzuki",
    brand: "SUZUKI",
    model: "GRAND VITARA",
    tagline: "Way of Life!",
    image: suzuki,
    imageClass: "object-cover object-[70%_center]",
  },
  {
    id: "yamaha",
    brand: "YAMAHA",
    model: "MT-09 SP",
    tagline: "Revs Your Heart",
    image: yamaha,
    imageClass: "object-cover object-[75%_center]",
  }
];

export function Hero() {
  const { openModal } = useTestDrive();
  const [[page, direction], setPage] = useState([0, 1]);

  const current = ((page % slides.length) + slides.length) % slides.length;
  const slide = slides[current];

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [page]);

  if (!slide) return null;

  const imageVariants: Variants = {
    enter: {
      zIndex: 10,
      opacity: 0,
    },
    center: {
      zIndex: 10,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeInOut" }
    },
    exit: {
      zIndex: 0,
      opacity: 0,
      transition: { duration: 0.6, ease: "easeInOut" }
    }
  };

  const textItem: Variants = {
    hidden: { y: 30, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
    exit: { y: -20, opacity: 0, transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } }
  };

  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden bg-[#050505]">
      {/* Background Images */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={imageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 z-0 origin-center"
        >
          {/* Overlays for contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/30 z-10" />
          <img
            src={slide.image}
            alt={slide.model}
            className={`w-full h-full ${slide.imageClass || "object-cover object-center"}`}
          />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-20 mx-auto h-full w-full max-w-[1400px] px-5 sm:px-8 flex flex-col justify-center">
        <div className="flex flex-col md:flex-row items-end justify-between w-full h-full pb-32 pt-32">

          {/* Left Content */}
          <div className="w-full md:w-3/5 flex flex-col justify-center h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
                  exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
                }}
                initial="hidden"
                animate="show"
                exit="exit"
                className="flex flex-col"
              >
                <motion.div variants={textItem} className="flex items-center gap-3 mb-4">
                  <div className="h-[2px] w-8 bg-[#FFC72C]"></div>
                  <span className="eyebrow text-[#FFC72C] text-[12px] font-bold tracking-[0.25em]">
                    {slide.brand}
                  </span>
                </motion.div>

                <motion.h1 variants={textItem} className="display-xl text-white text-[4rem] sm:text-[5.5rem] lg:text-[7rem] leading-[0.9] uppercase tracking-tight drop-shadow-lg">
                  {slide.model}
                </motion.h1>

                <motion.p variants={textItem} className="mt-6 text-white/90 text-lg sm:text-xl font-light max-w-md tracking-wide drop-shadow-md">
                  {slide.tagline}
                </motion.p>

                <motion.div variants={textItem} className="mt-10 flex flex-col sm:flex-row gap-4">
                  <a
                    href="#vehicles"
                    className="group flex items-center justify-center gap-3 bg-white text-black hover:bg-[#FFC72C] px-8 py-4 text-sm font-bold tracking-widest transition-all duration-400 rounded-none"
                  >
                    DISCOVER MORE
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>

                  <button
                    onClick={() => openModal(`${slide.brand} ${slide.model}`)}
                    className="group relative flex items-center justify-center border border-white/30 bg-black/20 backdrop-blur-sm hover:border-white hover:bg-white/10 text-white px-8 py-4 text-sm font-bold tracking-widest transition-all duration-400 rounded-none overflow-hidden"
                  >
                    BOOK A TEST DRIVE
                  </button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#050505] to-transparent z-10 pointer-events-none" />

      {/* Unique Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 z-30 mx-auto w-full max-w-[1400px] px-5 sm:px-8 pb-8 flex items-end justify-between">
        <div className="flex items-center gap-6">
          <AnimatePresence mode="wait">
            <motion.div 
              key={page}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-white flex items-baseline gap-2 font-display"
            >
              <span className="text-4xl sm:text-5xl font-bold leading-none">
                {(current + 1).toString().padStart(2, "0")}
              </span>
              <span className="text-white/40 text-lg sm:text-xl">
                / {slides.length.toString().padStart(2, "0")}
              </span>
            </motion.div>
          </AnimatePresence>
          
          <div className="hidden sm:flex flex-col gap-1 ml-2 border-l border-white/20 pl-6">
             <span className="text-white/60 text-[10px] tracking-widest uppercase">Now Showing</span>
             <AnimatePresence mode="wait">
               <motion.span 
                 key={page}
                 initial={{ opacity: 0, x: -10 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: 10 }}
                 className="text-white font-bold tracking-[0.2em] uppercase block"
               >
                 {slide.brand}
               </motion.span>
             </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => paginate(-1)}
            className="h-12 w-12 border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors group"
          >
            <ChevronRight className="h-5 w-5 rotate-180 -ml-0.5 transition-transform group-hover:-translate-x-0.5" />
          </button>
          <button 
            onClick={() => paginate(1)}
            className="h-12 w-12 border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors group"
          >
            <ChevronRight className="h-5 w-5 ml-0.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>

    </section>
  );
}
