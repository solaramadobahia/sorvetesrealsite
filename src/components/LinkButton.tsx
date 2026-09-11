import * as React from "react";
import { cn } from "@/lib/utils";

export interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "gold" | "white";
  icon?: React.ReactNode;
  showShimmer?: boolean;
  subtitle?: string;
  children: React.ReactNode;
}

export function LinkButton({
  variant = "gold",
  icon,
  showShimmer = false,
  subtitle,
  children,
  className,
  ...props
}: LinkButtonProps) {
  const isGold = variant === "gold";

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative flex items-center justify-between w-full max-w-md py-3.5 px-5 sm:px-6 rounded-2xl font-semibold text-lg md:text-xl transition-all duration-300 ease-out shadow-md hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-real-gold/50 cursor-pointer overflow-hidden min-h-[64px]",
        isGold
          ? "bg-gradient-to-r from-[#EEC234] via-[#F5D152] to-[#EEC234] text-real-wine border-2 border-real-gold/90 hover:from-[#F5CB40] hover:to-[#F5CB40] hover:border-real-gold hover:text-real-wine shadow-[0_4px_18px_rgba(238,194,52,0.3)] hover:shadow-[0_6px_25px_rgba(238,194,52,0.55)]"
          : "bg-real-white text-real-red border-2 border-real-white/90 hover:bg-slate-50 hover:text-[#a52628]",
        className
      )}
      {...props}
    >
      {/* Light Shimmer Beam Effect for highlighted / WhatsApp buttons */}
      {showShimmer && (
        <span className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none z-10">
          <span className="absolute -top-[50%] -bottom-[50%] -left-[100%] w-[60%] bg-gradient-to-r from-transparent via-white/55 to-transparent transform -skew-x-12 animate-shimmer" />
        </span>
      )}

      <div className="flex items-center gap-3.5 z-10 flex-1 text-left">
        {icon ? (
          <span
            className={cn(
              "transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-6 shrink-0",
              isGold ? "text-real-wine" : "text-real-red"
            )}
          >
            {icon}
          </span>
        ) : null}
        <div className="flex flex-col justify-center">
          <span className="tracking-wide text-xl md:text-2xl font-bold uppercase leading-tight">
            {children}
          </span>
          {subtitle && (
            <span
              className={cn(
                "text-xs md:text-sm font-normal tracking-normal normal-case leading-snug mt-0.5 font-sans opacity-90",
                isGold ? "text-real-wine/90" : "text-real-red/90"
              )}
            >
              {subtitle}
            </span>
          )}
        </div>
      </div>

      <svg
        className={cn(
          "w-5 h-5 transition-transform duration-300 ease-out group-hover:translate-x-1 opacity-75 group-hover:opacity-100 z-10 shrink-0 ml-2",
          isGold ? "text-real-wine" : "text-real-red"
        )}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2.5"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>

      {/* Subtle shine / depth layer */}
      <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </a>
  );
}

export default LinkButton;
