"use client";

import React from "react";
import { Eye } from "lucide-react";

export default function MetaTagsPreview({ title, description }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-amber-500 text-white px-4 py-3 flex items-center gap-2">
        <Eye className="h-5 w-5" />
        <h3 className="font-semibold text-lg">Search Engine Preview</h3>
      </div>
      <div className="p-6">
        <h4 className="text-[#1a0dab] text-xl cursor-pointer hover:underline truncate">
          {title || "Your Page Title Here"}
        </h4>
        <p className="text-emerald-700 text-sm mt-0.5 truncate">
          {process.env.NEXT_PUBLIC_WEBSITE_URL || "https://metaforge.allaboutcse.com"}
        </p>
        <p className="text-slate-600 text-sm mt-2 line-clamp-2">
          {description ||
            "Your page description will appear here. Make it compelling to encourage clicks from search results."}
        </p>
      </div>
    </div>
  );
}
