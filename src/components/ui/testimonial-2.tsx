"use client";

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface Testimonial {
  imgSrc: string;
  alt: string;
}

export interface AnimatedTestimonialGridProps {
  testimonials: Testimonial[];
  className?: string;
  children?: React.ReactNode;
}

interface OrganicSlotConfig {
  top: string;
  left?: string;
  right?: string;
  rotate: number;
  styleClass: string;
  opacity: string;
  intervalMs: number;
  initialPhotoIndex: number;
  floatY: number;
}

// --- ORGANIC STAGGERED POSITIONS & CYCLE TIMERS ---
// Photos are dynamically spaced and staggered (not in a straight column)
// They smoothly fade in and out to cycle through all 10 brand photos
const organicSlots: OrganicSlotConfig[] = [
  // Left Side (Staggered X offsets & dynamic rotations)
  { top: '3%', left: '1.5%', rotate: -12, styleClass: 'w-[56px] h-[84px] sm:w-[90px] sm:h-[135px] md:w-[120px] md:h-[180px]', opacity: 'opacity-40 md:opacity-100', intervalMs: 6500, initialPhotoIndex: 0, floatY: -10 },
  { top: '25%', left: '5%', rotate: 14, styleClass: 'w-[52px] h-[78px] sm:w-[82px] sm:h-[123px] md:w-[108px] md:h-[162px]', opacity: 'opacity-35 md:opacity-100', intervalMs: 8200, initialPhotoIndex: 1, floatY: -8 },
  { top: '48%', left: '1%', rotate: -9, styleClass: 'w-[60px] h-[90px] sm:w-[95px] sm:h-[142px] md:w-[125px] md:h-[188px]', opacity: 'opacity-40 md:opacity-100', intervalMs: 7000, initialPhotoIndex: 2, floatY: -12 },
  { top: '74%', left: '4.5%', rotate: 11, styleClass: 'w-[54px] h-[81px] sm:w-[86px] sm:h-[129px] md:w-[112px] md:h-[168px]', opacity: 'opacity-35 md:opacity-100', intervalMs: 9000, initialPhotoIndex: 3, floatY: -9 },

  // Right Side (Staggered X offsets & dynamic rotations)
  { top: '5%', right: '4.5%', rotate: 15, styleClass: 'w-[54px] h-[81px] sm:w-[86px] sm:h-[129px] md:w-[112px] md:h-[168px]', opacity: 'opacity-35 md:opacity-100', intervalMs: 7500, initialPhotoIndex: 4, floatY: -9 },
  { top: '28%', right: '1.5%', rotate: -11, styleClass: 'w-[60px] h-[90px] sm:w-[95px] sm:h-[142px] md:w-[125px] md:h-[188px]', opacity: 'opacity-40 md:opacity-100', intervalMs: 6000, initialPhotoIndex: 5, floatY: -11 },
  { top: '52%', right: '5%', rotate: 8, styleClass: 'w-[52px] h-[78px] sm:w-[82px] sm:h-[123px] md:w-[108px] md:h-[162px]', opacity: 'opacity-35 md:opacity-100', intervalMs: 8500, initialPhotoIndex: 6, floatY: -8 },
  { top: '76%', right: '2%', rotate: -14, styleClass: 'w-[56px] h-[84px] sm:w-[90px] sm:h-[135px] md:w-[120px] md:h-[180px]', opacity: 'opacity-40 md:opacity-100', intervalMs: 6800, initialPhotoIndex: 7, floatY: -10 },
];

const OrganicFloatingCard = ({
  slot,
  testimonials,
}: {
  slot: OrganicSlotConfig;
  testimonials: Testimonial[];
}) => {
  const [photoIndex, setPhotoIndex] = React.useState(slot.initialPhotoIndex);
  const [isFading, setIsFading] = React.useState(false);

  React.useEffect(() => {
    if (!testimonials || testimonials.length === 0) return;

    const timer = setInterval(() => {
      // Start smooth fade out
      setIsFading(true);

      setTimeout(() => {
        // Swap to next photo in pool
        setPhotoIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        // Start smooth fade in
        setIsFading(false);
      }, 1000);
    }, slot.intervalMs);

    return () => clearInterval(timer);
  }, [slot.intervalMs, testimonials]);

  const currentPhoto = testimonials[photoIndex % testimonials.length];
  if (!currentPhoto) return null;

  return (
    <div
      className={cn('absolute pointer-events-none z-0', slot.styleClass)}
      style={{
        top: slot.top,
        left: slot.left,
        right: slot.right,
      }}
    >
      <motion.div
        className={cn(
          'w-full h-full rounded-2xl shadow-xl overflow-hidden pointer-events-auto transition-all duration-300 hover:shadow-2xl hover:opacity-100',
          slot.opacity
        )}
        initial={{ scale: 0.8, opacity: 0, rotate: slot.rotate }}
        animate={{
          scale: isFading ? 0.85 : 1,
          opacity: isFading ? 0 : 1,
          rotate: [slot.rotate, slot.rotate + (slot.rotate > 0 ? 3 : -3), slot.rotate],
          y: [0, slot.floatY, 0],
        }}
        transition={{
          opacity: { duration: 1, ease: 'easeInOut' },
          scale: { duration: 1, ease: 'easeInOut' },
          y: { duration: 4 + (slot.initialPhotoIndex % 3), repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
          rotate: { duration: 5 + (slot.initialPhotoIndex % 2), repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
        }}
        whileHover={{ scale: 1.15, zIndex: 30, rotate: 0 }}
      >
        <img
          src={currentPhoto.imgSrc}
          alt={currentPhoto.alt}
          className="w-full h-full object-cover rounded-2xl pointer-events-none select-none aspect-[2/3]"
        />
      </motion.div>
    </div>
  );
};

export const AnimatedTestimonialGrid = ({
  testimonials,
  className,
  children,
}: AnimatedTestimonialGridProps) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={cn(
        'relative w-full min-h-screen mx-auto overflow-hidden bg-real-red text-white',
        className
      )}
    >
      {/* Floating Organic Photos (Staggered placement & fluid fade cycle) */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none z-0">
          {organicSlots.map((slot, index) => (
            <OrganicFloatingCard
              key={index}
              slot={slot}
              testimonials={testimonials}
            />
          ))}
        </div>
      )}

      {/* Main Content Layout */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {children}
      </div>
    </div>
  );
};

export default AnimatedTestimonialGrid;
