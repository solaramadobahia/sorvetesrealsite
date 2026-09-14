"use client";

import * as React from "react";
import { STORES_DATA, Store } from "@/data/stores";
import { WhatsAppIcon, StorePinIcon } from "@/components/Icons";

type RegionFilter = "Todas" | "Salvador e Região" | "Litoral & Ilha" | "Interior";

const REGIONS: RegionFilter[] = [
  "Todas",
  "Salvador e Região",
  "Litoral & Ilha",
  "Interior",
];

// Haversine formula to compute distance in kilometers between two geo coordinates
function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function formatDistance(distanceKm: number): string {
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)} m`;
  }
  return `${distanceKm.toFixed(1).replace(".", ",")} km`;
}

interface StoreWithDistance extends Store {
  distanceKm?: number;
}

export function StoreLocator() {
  const [selectedRegion, setSelectedRegion] = React.useState<RegionFilter>("Todas");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedStore, setSelectedStore] = React.useState<StoreWithDistance>(STORES_DATA[0]);

  // GPS / Geolocation state
  const [userCoords, setUserCoords] = React.useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = React.useState(false);
  const [locationError, setLocationError] = React.useState<string | null>(null);
  const [gpsActive, setGpsActive] = React.useState(false);

  // Map element ref for smooth scrolling on mobile
  const mapSectionRef = React.useRef<HTMLDivElement>(null);

  // Filter and sort stores based on region, search query, and user GPS
  const filteredStores: StoreWithDistance[] = React.useMemo(() => {
    // 1. Calculate distance for each store if userCoords are known
    const storesWithDistances: StoreWithDistance[] = STORES_DATA.map((store) => {
      if (userCoords) {
        const dist = calculateDistanceKm(userCoords.lat, userCoords.lng, store.lat, store.lng);
        return { ...store, distanceKm: dist };
      }
      return store;
    });

    // 2. Filter by region and search query
    const filtered = storesWithDistances.filter((store) => {
      const matchesRegion =
        selectedRegion === "Todas" || store.region === selectedRegion;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        store.name.toLowerCase().includes(q) ||
        store.address.toLowerCase().includes(q) ||
        store.city.toLowerCase().includes(q);

      return matchesRegion && matchesSearch;
    });

    // 3. Sort by distance if GPS is active, or maintain default curated priority
    if (gpsActive && userCoords) {
      return [...filtered].sort((a, b) => (a.distanceKm ?? 99999) - (b.distanceKm ?? 99999));
    }

    return filtered;
  }, [selectedRegion, searchQuery, userCoords, gpsActive]);

  // When filtered list changes, ensure a valid store is selected
  React.useEffect(() => {
    if (filteredStores.length > 0 && !filteredStores.some((s) => s.id === selectedStore.id)) {
      setSelectedStore(filteredStores[0]);
    }
  }, [filteredStores, selectedStore]);

  // Handle GPS location request
  const handleGetLocation = () => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      setLocationError("Seu navegador não possui suporte a geolocalização.");
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserCoords(coords);
        setGpsActive(true);
        setIsLocating(false);
        setSelectedRegion("Todas"); // Reset to show the closest everywhere

        // Auto-select the closest store
        const sorted = [...STORES_DATA]
          .map((store) => ({
            ...store,
            distanceKm: calculateDistanceKm(coords.lat, coords.lng, store.lat, store.lng),
          }))
          .sort((a, b) => (a.distanceKm ?? 99999) - (b.distanceKm ?? 99999));

        if (sorted.length > 0) {
          setSelectedStore(sorted[0]);
        }
      },
      (error) => {
        setIsLocating(false);
        if (error.code === error.PERMISSION_DENIED) {
          setLocationError("Permissão de GPS negada. Ative o acesso à localização no navegador.");
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setLocationError("Sinal de GPS indisponível no momento. Tente novamente.");
        } else if (error.code === error.TIMEOUT) {
          setLocationError("Tempo limite para obter localização excedido.");
        } else {
          setLocationError("Não foi possível obter sua localização atual.");
        }
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 }
    );
  };

  const handleClearGps = () => {
    setUserCoords(null);
    setGpsActive(false);
    setLocationError(null);
  };

  const handleSelectStore = (store: StoreWithDistance) => {
    setSelectedStore(store);
    // On small screens, smoothly scroll down to map
    if (window.innerWidth < 1024 && mapSectionRef.current) {
      mapSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Google Maps Embed URL centered on selected store's high-precision address query
  const mapEmbedUrl = React.useMemo(() => {
    const query = encodeURIComponent(
      selectedStore.exactQuery || `${selectedStore.name}, ${selectedStore.address}, ${selectedStore.city} - BA`
    );
    return `https://maps.google.com/maps?q=${query}&t=&z=17&ie=UTF8&iwloc=&output=embed`;
  }, [selectedStore]);

  return (
    <div className="w-full max-w-5xl flex flex-col gap-6 z-20 mx-auto px-2 sm:px-4">
      
      {/* 1. CONTROLS: SEARCH + LATERAL GPS BUTTON + REGION FILTERS */}
      <div className="flex flex-col items-center gap-3.5 w-full max-w-3xl mx-auto text-center">
        
        {/* Search Input with Lateral GPS Button */}
        <div className="flex items-center gap-2.5 w-full">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-real-wine/70">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por bairro, rua ou cidade..."
              className="w-full pl-11 pr-16 py-3.5 rounded-2xl bg-white text-real-wine placeholder-real-wine/50 font-medium text-base shadow-lg border-2 border-real-gold focus:outline-none focus:ring-4 focus:ring-real-gold/50 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-real-wine/60 hover:text-real-wine text-xs sm:text-sm font-bold"
              >
                Limpar
              </button>
            )}
          </div>

          {/* Lateral GPS Button (Location Icon only) */}
          <button
            onClick={gpsActive ? handleClearGps : handleGetLocation}
            disabled={isLocating}
            title={
              gpsActive
                ? "GPS Ativo (clique para desativar)"
                : "Encontrar lojas mais próximas pelo meu GPS"
            }
            aria-label="Encontrar lojas mais próximas pelo meu GPS"
            className={`shrink-0 w-[52px] h-[52px] sm:w-[54px] sm:h-[54px] rounded-2xl flex items-center justify-center transition-all duration-200 shadow-lg border-2 cursor-pointer ${
              gpsActive
                ? "bg-emerald-600 text-white border-emerald-400 hover:bg-emerald-700 scale-105 ring-4 ring-emerald-400/30"
                : "bg-gradient-to-r from-[#EEC234] via-[#F5D152] to-[#EEC234] hover:brightness-105 active:scale-95 text-real-wine border-yellow-300"
            }`}
          >
            {isLocating ? (
              <svg
                className="w-6 h-6 animate-spin text-real-wine"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              /* Location GPS Crosshair Pin Icon */
              <svg
                className={`w-6 h-6 ${gpsActive ? "text-white" : "text-real-wine"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="7" strokeWidth="2.5" />
                <line x1="12" y1="2" x2="12" y2="5" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="12" y1="19" x2="12" y2="22" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="2" y1="12" x2="5" y2="12" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="19" y1="12" x2="22" y2="12" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="12" cy="12" r="2" fill="currentColor" />
              </svg>
            )}
          </button>
        </div>

        {/* GPS Active indicator banner */}
        {gpsActive && (
          <div className="inline-flex items-center justify-center gap-2 bg-emerald-700/90 text-white font-bold text-xs sm:text-sm py-1.5 px-4 rounded-xl border border-emerald-400/60 shadow-lg backdrop-blur-md">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
              GPS Ativo: Lojas ordenadas por proximidade
            </span>
            <button
              onClick={handleClearGps}
              className="ml-2 bg-black/30 hover:bg-black/50 text-white/90 px-2 py-0.5 rounded-md text-xs font-semibold hover:text-white transition-colors"
              title="Desativar GPS"
            >
              ✕ Desativar
            </button>
          </div>
        )}

        {/* Location Error Message */}
        {locationError && (
          <p className="text-xs sm:text-sm text-yellow-200 bg-black/60 px-4 py-2 rounded-xl border border-yellow-400/40 backdrop-blur-md max-w-md mx-auto">
            ⚠️ {locationError}
          </p>
        )}

        {/* Region Filter Chips (Centered with Glassmorphism) */}
        <div className="flex flex-wrap items-center justify-center gap-2 w-full pt-1">
          {REGIONS.map((region) => {
            const isSelected = selectedRegion === region;
            const count =
              region === "Todas"
                ? STORES_DATA.length
                : STORES_DATA.filter((s) => s.region === region).length;

            return (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer text-center ${
                  isSelected
                    ? "bg-real-gold text-real-wine shadow-xl border-2 border-yellow-300 scale-105"
                    : "bg-black/50 hover:bg-black/70 text-white/90 backdrop-blur-md border border-white/20 hover:border-real-gold/50 shadow-md"
                }`}
              >
                {region} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. MAIN CONTENT: STORES LIST COMES FIRST, MAP COMES SECOND */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-start">
        
        {/* COL 1: STORES LIST (ORDER 1 - FIRST BEFORE MAP) */}
        <div className="lg:col-span-5 order-1 flex flex-col gap-3 w-full">
          <div className="flex items-center justify-between text-real-gold font-bold text-sm sm:text-base px-2">
            <span>{filteredStores.length} lojas encontradas</span>
            <span className="text-xs text-white/80">
              {gpsActive ? "Mais próximas primeiro" : "Clique para ver no mapa"}
            </span>
          </div>

          <div className="flex flex-col gap-2.5 max-h-[580px] overflow-y-auto pr-1 scrollbar-thin">
            {filteredStores.map((store) => {
              const isSelected = store.id === selectedStore.id;

              return (
                <div
                  key={store.id}
                  onClick={() => handleSelectStore(store)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all duration-200 text-left flex flex-col gap-1.5 ${
                    isSelected
                      ? "bg-gradient-to-br from-white via-white to-[#FFF9E6] text-real-wine border-2 border-real-gold shadow-2xl scale-[1.02]"
                      : "bg-[#160406]/90 hover:bg-[#25070b]/95 backdrop-blur-xl text-white border border-white/25 hover:border-real-gold/70 shadow-xl hover:scale-[1.01]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <h4
                      className={`font-black text-base sm:text-lg leading-snug ${
                        isSelected ? "text-real-red" : "text-real-gold"
                      }`}
                    >
                      {store.name}
                    </h4>
                    <span
                      className={`text-[10px] sm:text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full whitespace-nowrap ${
                        isSelected
                          ? "bg-real-wine text-real-gold border border-real-wine"
                          : "bg-white/15 text-white border border-white/25 backdrop-blur-md"
                      }`}
                    >
                      {store.city}
                    </span>
                  </div>

                  <p
                    className={`text-xs sm:text-sm font-normal line-clamp-2 ${
                      isSelected ? "text-neutral-800 font-medium" : "text-white/90"
                    }`}
                  >
                    {store.address}
                  </p>

                  {/* Distance badge when GPS is active */}
                  {store.distanceKm !== undefined && (
                    <div className="flex items-center gap-1.5 pt-0.5">
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-md flex items-center gap-1 ${
                          isSelected
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : "bg-emerald-950/80 text-emerald-300 border border-emerald-500/40"
                        }`}
                      >
                        📍 A {formatDistance(store.distanceKm)} de você
                      </span>
                    </div>
                  )}

                  <div
                    className={`flex items-center justify-between pt-1.5 mt-1 border-t text-[11px] sm:text-xs ${
                      isSelected ? "border-neutral-200" : "border-white/15"
                    }`}
                  >
                    <span className={isSelected ? "text-neutral-600 font-semibold" : "text-white/70"}>
                      {store.phone}
                    </span>
                    <span
                      className={`font-bold flex items-center gap-1 ${
                        isSelected ? "text-real-wine" : "text-real-gold"
                      }`}
                    >
                      {isSelected ? "Selecionada ✓" : "Ver no mapa →"}
                    </span>
                  </div>
                </div>
              );
            })}

            {filteredStores.length === 0 && (
              <div className="p-8 text-center bg-black/70 backdrop-blur-xl rounded-2xl border border-white/20 text-white shadow-xl">
                <p className="font-bold text-base text-real-gold">Nenhuma loja encontrada</p>
                <p className="text-xs sm:text-sm text-white/80 mt-1">
                  Tente buscar por outro termo ou selecione &ldquo;Todas&rdquo; nas categorias acima.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* COL 2: MAP & SELECTED STORE HIGHLIGHT (ORDER 2 - AFTER THE LIST) */}
        <div
          ref={mapSectionRef}
          className="lg:col-span-7 order-2 flex flex-col gap-4 w-full lg:sticky lg:top-6"
        >
          {/* Dynamic Google Map Container */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden border-2 border-real-gold shadow-2xl bg-neutral-900">
            <iframe
              title={`Mapa - ${selectedStore.name}`}
              src={mapEmbedUrl}
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Overlay badge with store name */}
            <div className="absolute top-3 left-3 bg-real-wine/90 text-real-gold font-bold text-xs sm:text-sm px-3 py-1.5 rounded-xl backdrop-blur-md shadow-lg border border-real-gold/50 flex items-center gap-1.5 pointer-events-none">
              <StorePinIcon className="w-4 h-4 text-real-gold" />
              <span>{selectedStore.name}</span>
            </div>
          </div>

          {/* Selected Store Highlight Card */}
          <div className="w-full bg-white text-real-wine rounded-2xl p-4 sm:p-6 shadow-2xl border-2 border-real-gold flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider bg-real-gold/30 text-real-wine px-2.5 py-1 rounded-md">
                  {selectedStore.region} • {selectedStore.city}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-real-red mt-1.5 leading-tight">
                  {selectedStore.name}
                </h3>
              </div>

              {selectedStore.distanceKm !== undefined && (
                <span className="self-start sm:self-center bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs sm:text-sm px-3 py-1 rounded-full whitespace-nowrap">
                  📍 A {formatDistance(selectedStore.distanceKm)} de você
                </span>
              )}
            </div>

            <p className="text-sm sm:text-base font-normal text-neutral-800 flex items-start gap-2 pt-1">
              <StorePinIcon className="w-5 h-5 text-real-red shrink-0 mt-0.5" />
              <span>{selectedStore.address}</span>
            </p>

            {/* Action Buttons: Como Chegar (Google Maps) + WhatsApp / Contato (Perfect Alignment & Centered Text) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-neutral-200">
              <a
                href={selectedStore.gmapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#EEC234] via-[#F5D152] to-[#EEC234] text-real-wine font-black text-sm sm:text-base py-3.5 px-4 rounded-xl shadow-md hover:shadow-xl hover:brightness-105 active:scale-95 transition-all text-center uppercase tracking-wide border border-yellow-400"
              >
                <svg
                  className="w-5 h-5 text-real-wine shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>Como Chegar</span>
              </a>

              {selectedStore.whatsappUrl ? (
                <a
                  href={selectedStore.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm sm:text-base py-3.5 px-4 rounded-xl shadow-md hover:shadow-xl active:scale-95 transition-all text-center"
                >
                  <WhatsAppIcon className="w-5 h-5 text-white shrink-0" />
                  <span>{selectedStore.phone}</span>
                </a>
              ) : (
                <a
                  href={`tel:${selectedStore.phone.replace(/[^0-9]/g, "")}`}
                  className="inline-flex items-center justify-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-sm sm:text-base py-3.5 px-4 rounded-xl shadow-sm active:scale-95 transition-all text-center"
                >
                  <span>📞 {selectedStore.phone}</span>
                </a>
              )}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default StoreLocator;
