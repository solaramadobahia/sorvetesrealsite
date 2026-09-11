import * as React from "react";
import { cn } from "@/lib/utils";

export interface FeatureCardProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  bannerImage: string;
  badge?: string;
  title: string;
  description: string;
}

export function FeatureCard({
  bannerImage,
  badge = "LOJA & MUSEU",
  title,
  description,
  className,
  ...props
}: FeatureCardProps) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative flex flex-col w-full max-w-md rounded-2xl overflow-hidden bg-white text-real-red border-2 border-white/90 shadow-md hover:shadow-2xl transition-all duration-300 ease-out transform hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-real-gold/50 cursor-pointer z-10",
        className
      )}
      {...props}
    >
      {/* 1. HORIZONTAL BANNER IMAGE AT THE TOP */}
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-slate-900">
        <img
          src={bannerImage}
          alt={title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
        
        {/* BADGE ON TOP OF IMAGE */}
        {badge && (
          <span className="absolute top-3 left-3 bg-real-gold text-real-wine font-bold text-[10px] sm:text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-md backdrop-blur-sm border border-yellow-300/50">
            {badge}
          </span>
        )}
      </div>

      {/* 2. CARD CONTENT UNDERNEATH THE IMAGE */}
      <div className="p-4 sm:p-5 flex flex-col gap-1.5 text-left bg-white">
        <div className="flex items-center justify-between gap-2">
          <h3 className="tracking-wide text-lg sm:text-xl md:text-2xl font-bold uppercase leading-tight text-real-red group-hover:text-[#a52628]">
            {title}
          </h3>
          <svg
            className="w-6 h-6 transition-transform duration-300 ease-out group-hover:translate-x-1 text-real-red shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
        
        <p className="text-xs sm:text-sm font-sans font-normal text-real-red/90 leading-snug">
          {description}
        </p>
      </div>

      {/* Subtle shine on hover */}
      <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </a>
  );
}

export default FeatureCard;
