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

interface PositionItem {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  styleClass: string;
  initialRotate: number;
  opacity: string;
}

// --- RESPONSIVE FLOATING PHOTO POSITIONS ---
// Displays on both Mobile (with gentle opacity ~45% for high legibility) and Desktop (full opacity)
const imagePositions: PositionItem[] = [
  // Left Side Floating Column
  { top: '3%', left: '2%', styleClass: 'w-[72px] h-[108px] md:w-[115px] md:h-[170px]', initialRotate: -6, opacity: 'opacity-45 md:opacity-100' },
  { top: '22%', left: '3%', styleClass: 'w-[64px] h-[96px] md:w-[100px] md:h-[148px]', initialRotate: 5, opacity: 'opacity-40 md:opacity-100' },
  { top: '44%', left: '1.5%', styleClass: 'w-[76px] h-[114px] md:w-[120px] md:h-[178px]', initialRotate: -4, opacity: 'opacity-45 md:opacity-100' },
  { top: '65%', left: '3%', styleClass: 'w-[68px] h-[102px] md:w-[105px] md:h-[155px]', initialRotate: 7, opacity: 'opacity-40 md:opacity-100' },
  { top: '84%', left: '2%', styleClass: 'w-[72px] h-[108px] md:w-[110px] md:h-[162px]', initialRotate: -5, opacity: 'opacity-45 md:opacity-100' },

  // Right Side Floating Column
  { top: '4%', right: '2%', styleClass: 'w-[72px] h-[108px] md:w-[110px] md:h-[162px]', initialRotate: 6, opacity: 'opacity-45 md:opacity-100' },
  { top: '25%', right: '3%', styleClass: 'w-[68px] h-[102px] md:w-[115px] md:h-[170px]', initialRotate: -7, opacity: 'opacity-40 md:opacity-100' },
  { top: '47%', right: '1.5%', styleClass: 'w-[70px] h-[105px] md:w-[105px] md:h-[155px]', initialRotate: 4, opacity: 'opacity-45 md:opacity-100' },
  { top: '68%', right: '3%', styleClass: 'w-[76px] h-[114px] md:w-[118px] md:h-[175px]', initialRotate: -5, opacity: 'opacity-40 md:opacity-100' },
  { top: '86%', right: '2%', styleClass: 'w-[68px] h-[102px] md:w-[100px] md:h-[148px]', initialRotate: 6, opacity: 'opacity-45 md:opacity-100' },
];

const getFloatingKeyframes = (index: number) => {
  const yRange = -8 - (index % 4) * 3;
  const dur = 4 + (index % 3) * 1.2;
  const rotDelta = (index % 2 === 0 ? 1 : -1) * (2 + (index % 3));

  return {
    y: [0, yRange, 0],
    rotate: [
      imagePositions[index]?.initialRotate ?? 0,
      (imagePositions[index]?.initialRotate ?? 0) + rotDelta,
      imagePositions[index]?.initialRotate ?? 0,
    ],
    transition: {
      duration: dur,
      repeat: Infinity,
      repeatType: 'reverse' as const,
      ease: 'easeInOut' as const,
    },
  };
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
      {/* Floating Side Photos (Visible on Mobile & Desktop) */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none z-0">
          {testimonials.slice(0, imagePositions.length).map((testimonial, index) => {
            const pos = imagePositions[index];
            const floatAnim = getFloatingKeyframes(index);

            return (
              <motion.div
                key={index}
                className={cn(
                  'absolute rounded-2xl shadow-lg overflow-hidden pointer-events-auto transition-all duration-300 hover:shadow-2xl hover:opacity-100',
                  pos.styleClass,
                  pos.opacity
                )}
                style={{ 
                  top: pos.top, 
                  left: pos.left,
                  right: pos.right,
                  bottom: pos.bottom,
                }}
                initial={{ scale: 0.6, rotate: pos.initialRotate }}
                animate={{
                  scale: 1,
                  ...floatAnim,
                }}
                whileHover={{ scale: 1.15, zIndex: 30, rotate: 0 }}
                custom={index}
              >
                <img
                  src={testimonial.imgSrc}
                  alt={testimonial.alt}
                  className="w-full h-full object-cover rounded-2xl pointer-events-none select-none aspect-[2/3]"
                />
              </motion.div>
            );
          })}
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
