"use client";

import * as React from "react";
import { STORES_DATA, Store } from "@/data/stores";
import { WhatsAppIcon, StorePinIcon } from "@/components/Icons";

type RegionFilter = "Todas" | "Salvador" | "Região Metropolitana" | "Litoral & Ilha" | "Interior";

const REGIONS: RegionFilter[] = [
  "Todas",
  "Salvador",
  "Região Metropolitana",
  "Litoral & Ilha",
  "Interior",
];

export function StoreLocator() {
  const [selectedRegion, setSelectedRegion] = React.useState<RegionFilter>("Todas");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedStore, setSelectedStore] = React.useState<Store>(STORES_DATA[0]);

  // Filter stores based on region and search query
  const filteredStores = React.useMemo(() => {
    return STORES_DATA.filter((store) => {
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
  }, [selectedRegion, searchQuery]);

  // When filtering changes, if selected store isn't in filtered list, pick the first one
  React.useEffect(() => {
    if (filteredStores.length > 0 && !filteredStores.some((s) => s.id === selectedStore.id)) {
      setSelectedStore(filteredStores[0]);
    }
  }, [filteredStores, selectedStore]);

  // Google Maps Embed URL centered on selected store's high-precision address query
  const mapEmbedUrl = React.useMemo(() => {
    const query = encodeURIComponent(
      selectedStore.exactQuery || `${selectedStore.name}, ${selectedStore.address}, ${selectedStore.city} - BA`
    );
    return `https://maps.google.com/maps?q=${query}&t=&z=17&ie=UTF8&iwloc=&output=embed`;
  }, [selectedStore]);

  return (
    <div className="w-full max-w-5xl flex flex-col gap-6 z-20 mx-auto px-2 sm:px-4">
      
      {/* 1. SEARCH & REGION FILTERS */}
      <div className="flex flex-col gap-3 w-full">
        {/* Search Input */}
        <div className="relative w-full">
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
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white text-real-wine placeholder-real-wine/50 font-medium text-base shadow-md border-2 border-real-gold/80 focus:outline-none focus:ring-4 focus:ring-real-gold/50 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-real-wine/60 hover:text-real-wine text-sm font-bold"
            >
              Limpar
            </button>
          )}
        </div>

        {/* Region Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
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
                className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-real-gold text-real-wine shadow-md border border-yellow-300 scale-105"
                    : "bg-black/30 text-white/90 hover:bg-black/40 border border-white/20"
                }`}
              >
                {region} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. MAIN CONTENT: MAP + STORES LIST */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-start">
        
        {/* MAP & SELECTED STORE HIGHLIGHT (7 COLS ON DESKTOP) */}
        <div className="lg:col-span-7 flex flex-col gap-4 w-full">
          
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
          <div className="w-full bg-white text-real-wine rounded-2xl p-4 sm:p-5 shadow-xl border-2 border-real-gold flex flex-col gap-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider bg-real-gold/30 text-real-wine px-2 py-0.5 rounded-md">
                  {selectedStore.region} • {selectedStore.city}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-real-red mt-1 leading-tight">
                  {selectedStore.name}
                </h3>
              </div>
            </div>

            <p className="text-sm sm:text-base font-normal text-neutral-800 flex items-start gap-2">
              <StorePinIcon className="w-5 h-5 text-real-red shrink-0 mt-0.5" />
              <span>{selectedStore.address}</span>
            </p>

            {/* Action Buttons: Como Chegar (Google Maps) + WhatsApp / Contato */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-neutral-200">
              <a
                href={selectedStore.gmapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#EEC234] via-[#F5D152] to-[#EEC234] text-real-wine font-bold text-sm sm:text-base py-3 px-4 rounded-xl shadow-md hover:shadow-lg hover:brightness-105 active:scale-95 transition-all text-center uppercase tracking-wide border border-yellow-400"
              >
                <svg
                  className="w-5 h-5 text-real-wine"
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
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm sm:text-base py-3 px-4 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all text-center"
                >
                  <WhatsAppIcon className="w-5 h-5 text-white" />
                  <span>{selectedStore.phone}</span>
                </a>
              ) : (
                <a
                  href={`tel:${selectedStore.phone.replace(/[^0-9]/g, "")}`}
                  className="inline-flex items-center justify-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-sm sm:text-base py-3 px-4 rounded-xl shadow-sm active:scale-95 transition-all text-center"
                >
                  <span>📞 {selectedStore.phone}</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* STORES LIST (5 COLS ON DESKTOP) */}
        <div className="lg:col-span-5 flex flex-col gap-3 w-full">
          <div className="flex items-center justify-between text-real-gold font-bold text-sm sm:text-base px-1">
            <span>{filteredStores.length} lojas encontradas</span>
            <span className="text-xs text-white/70">Clique para ver no mapa</span>
          </div>

          <div className="flex flex-col gap-2.5 max-h-[550px] overflow-y-auto pr-1 scrollbar-thin">
            {filteredStores.map((store) => {
              const isSelected = store.id === selectedStore.id;

              return (
                <div
                  key={store.id}
                  onClick={() => setSelectedStore(store)}
                  className={`p-3.5 rounded-2xl cursor-pointer transition-all duration-200 border-2 text-left flex flex-col gap-1 ${
                    isSelected
                      ? "bg-white text-real-wine border-real-gold shadow-lg scale-[1.01]"
                      : "bg-black/30 hover:bg-black/45 text-white border-white/15 shadow-sm"
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
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md whitespace-nowrap ${
                        isSelected
                          ? "bg-real-wine text-real-gold"
                          : "bg-white/10 text-white/80"
                      }`}
                    >
                      {store.city}
                    </span>
                  </div>

                  <p
                    className={`text-xs sm:text-sm font-normal line-clamp-2 ${
                      isSelected ? "text-neutral-800" : "text-white/80"
                    }`}
                  >
                    {store.address}
                  </p>

                  <div className="flex items-center justify-between pt-1 mt-1 border-t border-white/10 text-[11px]">
                    <span className={isSelected ? "text-neutral-600" : "text-white/60"}>
                      {store.phone}
                    </span>
                    <span
                      className={`font-semibold flex items-center gap-1 ${
                        isSelected ? "text-real-wine" : "text-real-gold"
                      }`}
                    >
                      Ver no mapa →
                    </span>
                  </div>
                </div>
              );
            })}

            {filteredStores.length === 0 && (
              <div className="p-8 text-center bg-black/20 rounded-2xl border border-white/10 text-white/80">
                <p className="font-bold text-base">Nenhuma loja encontrada</p>
                <p className="text-xs text-white/60 mt-1">
                  Tente buscar por outro bairro ou selecione &ldquo;Todas&rdquo; nas abas acima.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}

export default StoreLocator;
