"use client";

import React from "react";

/**
 * Reusable AdBanner component for Google AdSense or other ad providers.
 * In a real scenario, you would replace the placeholder div with the AdSense script.
 */
export default function AdBanner({ slot, format = "auto", responsive = "true", className = "" }) {
  return (
    <div className={`w-full overflow-hidden my-4 ${className}`}>
      {/* Placeholder for legal compliance and UX testing */}
      <div className="bg-slate-100 border border-slate-200 border-dashed rounded-lg p-4 flex flex-col items-center justify-center min-h-[100px]">
        <span className="text-[10px] uppercase tracking-widest text-slate-400 mb-2 font-semibold">Advertisement</span>
        <div className="text-slate-300 font-medium italic text-sm">
          Ad Slot: {slot || "Global Placeholder"}
        </div>
      </div>

      {/* 
        IN PRODUCTION: 
        Uncomment the code below and replace with your actual AdSense data-ad-client
      */}
      {/* 
      <ins className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" 
           data-ad-slot={slot}
           data-ad-format={format}
           data-full-width-responsive={responsive}></ins>
      <script>
           (adsbygoogle = window.adsbygoogle || []).push({});
      </script>
      */}
    </div>
  );
}
