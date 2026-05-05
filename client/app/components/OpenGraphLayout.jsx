"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { 
  Share2, 
  Image as ImageIcon, 
  Copy, 
  CheckCircle2, 
  Eye, 
  Layout,
  Upload
} from "lucide-react";

export default function OpenGraphLayout({
  title,
  description,
  icon: Icon,
  type,
  metaTagsText,
  previewData,
  children
}) {
  const [copied, setCopied] = useState(false);

  const getHostname = (urlStr) => {
    if (!urlStr) return "example.com";
    try {
      return new URL(urlStr).hostname.replace("www.", "");
    } catch (error) {
      return "example.com";
    }
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="bg-blue-600 text-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-lg">
            {Icon ? <Icon className="h-8 w-8 text-white" /> : <Share2 className="h-8 w-8 text-white" />}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">{title}</h1>
            <p className="text-blue-100 mt-1 max-w-2xl">
              {description}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Configuration Panel */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden h-fit">
            <div className="bg-slate-800 text-white px-6 py-4 flex items-center gap-2">
              <Layout className="h-5 w-5" />
              <h2 className="font-semibold text-lg tracking-wide uppercase text-white">Configuration</h2>
            </div>
            
            <div className="p-6 space-y-6">
              {children}
            </div>
          </div>
        </div>

        {/* Preview and Code Panel */}
        <div className="flex flex-col gap-8">
          
          {/* Social Preview */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden order-first">
            <div className="bg-[#1877F2] text-white px-6 py-4 flex items-center gap-2">
              <Eye className="h-5 w-5" />
              <h2 className="font-semibold text-lg uppercase text-white">Facebook / LinkedIn Preview</h2>
            </div>
            {/* Flush content layout without inner padded borders */}
            <div className="w-full bg-white flex flex-col">
                {/* Image Area */}
                {previewData.imageMode === "url" ? (
                  previewData.imageUrl ? (
                    <Image width={800} height={400} unoptimized src={previewData.imageUrl} alt="Preview" className="w-full aspect-[1.91/1] object-cover border-b border-slate-100" />
                  ) : (
                    <div className="w-full aspect-[1.91/1] bg-slate-100 flex items-center justify-center border-b border-slate-200 text-slate-400">
                      <div className="flex flex-col items-center gap-2">
                        <ImageIcon className="h-10 w-10 text-slate-300" />
                        <span className="text-sm font-medium">1200 x 627 recommended</span>
                      </div>
                    </div>
                  )
                ) : (
                  previewData.uploadedImage ? (
                    <Image width={800} height={400} unoptimized src={previewData.uploadedImage} alt="Preview" className="w-full aspect-[1.91/1] object-cover border-b border-slate-100" />
                  ) : (
                    <div className="w-full aspect-[1.91/1] bg-slate-100 flex items-center justify-center border-b border-slate-200 text-slate-400">
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="h-10 w-10 text-slate-300" />
                        <span className="text-sm font-medium">Upload preview image</span>
                      </div>
                    </div>
                  )
                )}

                {/* Content Area */}
                <div className="p-4 sm:p-5 flex flex-col gap-1.5 bg-[#F2F3F5] relative">
                  {type !== "website" && type && (
                     <span className="absolute top-[-30px] left-2 bg-indigo-500/80 text-white px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider backdrop-blur-sm shadow-sm">
                       {type}
                     </span>
                  )}
                  <span className="text-[12px] uppercase text-slate-500 font-semibold tracking-wide truncate">
                    {getHostname(previewData.url)}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-[#1d2129] leading-tight line-clamp-2">
                    {previewData.title || "Website Title"}
                  </h3>
                  <p className="text-sm text-[#606770] leading-snug line-clamp-1">
                    {previewData.description || "A compelling description of your content that encourages users to click."}
                  </p>
                  {previewData.extraPreviewComponent}
                </div>
            </div>
          </div>

          {/* Code Panel */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-800 text-white px-6 py-4 flex justify-between items-center">
              <h2 className="font-semibold text-lg uppercase text-white flex items-center gap-2">
                <Layout className="h-5 w-5" />
                Generated Meta Tags
              </h2>
              <CopyToClipboard text={metaTagsText || ""} onCopy={handleCopy}>
                <button 
                  type="button"
                  className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition-all text-white shadow-sm"
                  title={copied ? "Copied!" : "Copy to clipboard"}
                >
                  {copied ? <CheckCircle2 className="h-5 w-5 text-emerald-400" /> : <Copy className="h-5 w-5" />}
                </button>
              </CopyToClipboard>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 text-blue-700 text-sm">
              <p className="font-medium italic">Place this code block inside your HTML document's &lt;head&gt; tag.</p>
              {previewData.imageMode === "upload" && (
                <p className="mt-1 text-xs font-bold text-blue-600">
                  ⚠️ Note: An uploaded image cannot be embedded directly in meta tags. Ensure you upload your image to a public server and provide the URL.
                </p>
              )}
            </div>

            <div className="bg-[#1e1e1e] p-6 relative group overflow-hidden">
              <div className="font-mono text-[13px] leading-loose text-[#f8f8f2] whitespace-pre-wrap break-all overflow-x-auto selection:bg-blue-500/30">
                {(metaTagsText || "").split('\n').map((line, i) => {
                  return (
                    <div key={i}>
                      {line.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
                    </div>
                  );
                })}
                {!metaTagsText && <span className="text-slate-500 italic">&lt;!-- Enter details to generate tags --&gt;</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
