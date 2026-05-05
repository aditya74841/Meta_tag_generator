"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  Calendar,
  MapPin,
  Globe,
  Clock,
  Tag as PriceTag,
  Building2,
  Search,
  Eye,
  Code,
  CheckCircle2,
  Copy,
  Layout,
  Plus,
  Trash2,
  Image as ImageIcon,
  Upload,
  Link2,
  AlertCircle,
  Video
} from "lucide-react";

export default function EventGenerator() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [locationName, setLocationName] = useState("");
  const [locationUrl, setLocationUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null); // Base64 for preview
  const [imageMode, setImageMode] = useState("url"); // "url" or "upload"
  const [isVirtual, setIsVirtual] = useState(false);
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [organizer, setOrganizer] = useState("");
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateJSON = () => {
    return {
      "@context": "https://schema.org",
      "@type": "Event",
      name: name,
      ...(startDate && { startDate: startDate }),
      ...(endDate && { endDate: endDate }),
      image: imageMode === "upload" ? "https://example.com/photos/1x1/photo.jpg" : (imageUrl || undefined),
      ...(description && { description: description }),
      location: isVirtual ? {
        "@type": "VirtualLocation",
        url: locationUrl
      } : {
        "@type": "Place",
        name: locationName,
        address: {
          "@type": "PostalAddress",
          streetAddress: locationName // Simplified for now
        }
      },
      ...(organizer && {
        organizer: {
          "@type": "Organization",
          name: organizer
        }
      }),
      ...(price && {
        offers: {
          "@type": "Offer",
          price: price,
          priceCurrency: currency,
          url: locationUrl // Usually ticket URL
        }
      })
    };
  };

  const jsonText = JSON.stringify(generateJSON(), null, 2);
  const snippet = `<script type="application/ld+json">\n${jsonText}\n</script>`;

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="bg-indigo-600 text-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-lg">
            <Calendar className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Event Structured Data</h1>
            <p className="text-indigo-100 mt-1 max-w-2xl">
              Create SEO-optimized events to appear in Google Search and Google Maps event results.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-slate-800">
        {/* Configuration Panel */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden h-fit">
            <div className="bg-slate-800 text-white px-6 py-4 flex items-center gap-2">
              <Layout className="h-5 w-5" />
              <h2 className="font-semibold text-lg tracking-wide uppercase">Event Details</h2>
            </div>

            <div className="p-6 space-y-6">
              {/* Identity */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700">Event Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. World Tech Summit 2024"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700">Description</label>
                  <textarea
                    placeholder="Briefly describe what happens at the event..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700">Start Date & Time</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="datetime-local"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700">End Date (Optional)</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="datetime-local"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <MapPin className="h-3 w-3" />
                    Event Format
                  </h3>
                  <div className="flex bg-slate-100 rounded-lg p-1 text-[10px] font-black uppercase">
                    <button
                      onClick={() => setIsVirtual(false)}
                      className={`px-3 py-1 rounded-md transition-all ${!isVirtual ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500"}`}
                    >
                      Venue
                    </button>
                    <button
                      onClick={() => setIsVirtual(true)}
                      className={`px-3 py-1 rounded-md transition-all ${isVirtual ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500"}`}
                    >
                      Virtual
                    </button>
                  </div>
                </div>

                {!isVirtual ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Venue Name (e.g. Moscone Center)"
                      value={locationName}
                      onChange={(e) => setLocationName(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative">
                      <Video className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="url"
                        placeholder="Live Stream URL (e.g. Zoom link)"
                        value={locationUrl}
                        onChange={(e) => setLocationUrl(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Banner Image */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-slate-700">Event Image</label>
                  <div className="flex bg-slate-100 rounded-lg p-1 text-[10px] font-black uppercase">
                    <button
                      onClick={() => setImageMode("url")}
                      className={`px-3 py-1 rounded-md transition-all ${imageMode === "url" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                    >
                      URL
                    </button>
                    <button
                      onClick={() => setImageMode("upload")}
                      className={`px-3 py-1 rounded-md transition-all ${imageMode === "upload" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                    >
                      Upload
                    </button>
                  </div>
                </div>

                {imageMode === "url" ? (
                  <div className="relative">
                    <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="url"
                      placeholder="https://example.com/banner.jpg"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                    />
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current.click()}
                    className="group border-2 border-dashed border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 transition-all rounded-xl p-8 text-center cursor-pointer"
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      className="hidden"
                      accept="image/*"
                    />
                    <div className="flex flex-col items-center">
                      <div className="bg-slate-50 p-3 rounded-full mb-2 group-hover:bg-indigo-100 transition-colors">
                        <Upload className="h-6 w-6 text-slate-300 group-hover:text-indigo-600" />
                      </div>
                      <span className="text-sm font-bold text-slate-500 group-hover:text-indigo-700">Upload Banner Image</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Pricing & Organizer */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700">Ticket Price</label>
                  <div className="relative">
                    <PriceTag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="number"
                      placeholder="0.00"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700">Organized By</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Company Name"
                      value={organizer}
                      onChange={(e) => setOrganizer(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Preview & Code */}
        <div className="space-y-8">
          {/* Live Preview */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-amber-500 text-white px-6 py-4 flex items-center gap-2">
              <Eye className="h-5 w-5" />
              <h2 className="font-semibold text-lg uppercase tracking-wide">Ticket Preview</h2>
            </div>

            <div className="p-8 pb-12">
              <div className="max-w-md mx-auto bg-white rounded-3xl border border-slate-100 shadow-2xl overflow-hidden relative group">
                <div className="h-44 bg-slate-100 relative overflow-hidden">
                  {imageMode === "url" ? (
                    imageUrl ? (
                      <Image width={800} height={400} unoptimized src={imageUrl} alt="Event Banner" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center opacity-20 grayscale">
                        <Calendar className="h-20 w-20 text-slate-400" />
                      </div>
                    )
                  ) : (
                    uploadedImage ? (
                      <Image width={800} height={400} unoptimized src={uploadedImage} alt="Event Banner" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center opacity-20 grayscale">
                        <Upload className="h-20 w-20 text-slate-400" />
                      </div>
                    )
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-md text-indigo-600 text-[10px] font-black px-3 py-1.5 rounded-full uppercase shadow-lg border border-indigo-50 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      {price ? `${currency} ${price}` : "Free Entry"}
                    </span>
                  </div>
                </div>

                <div className="p-6 relative">
                  <div className="flex gap-4 mb-4">
                    <div className="flex flex-col items-center justify-center bg-indigo-50 px-4 py-2 rounded-2xl h-fit border border-indigo-100">
                      <span className="text-indigo-600 text-xs font-black uppercase tracking-tighter">
                        {startDate ? new Date(startDate).toLocaleString('en-US', { month: 'short' }) : "Mon"}
                      </span>
                      <span className="text-slate-900 text-2xl font-black leading-tight">
                        {startDate ? new Date(startDate).getDate() : "00"}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-black text-slate-900 line-clamp-2 leading-tight mb-1">{name || "Your Event Name"}</h3>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                        <Clock className="h-3 w-3" />
                        {startDate ? new Date(startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "12:00 PM"}
                        {endDate && ` - ${new Date(endDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-500 line-clamp-3 mb-6 leading-relaxed italic">
                    {description || "Add a description to tell people about your amazing event..."}
                  </p>

                  <div className="flex flex-col gap-3 pt-6 border-t border-slate-50 font-bold">
                    <div className="flex items-center gap-3 text-slate-700">
                      <div className="p-2 bg-slate-50 rounded-lg">
                        {isVirtual ? <Video className="h-4 w-4 text-rose-500" /> : <MapPin className="h-4 w-4 text-rose-500" />}
                      </div>
                      <span className="text-xs">{isVirtual ? "Virtual Event" : (locationName || "Venue Name")}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-700">
                      <div className="p-2 bg-slate-50 rounded-lg text-emerald-500">
                        <Building2 className="h-4 w-4" />
                      </div>
                      <span className="text-xs">{organizer || "Presented By Organizer"}</span>
                    </div>
                  </div>

                  {/* Perforated edge effect */}
                  <div className="absolute -bottom-1 left-0 right-0 h-1 flex justify-center gap-2 overflow-hidden px-4">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-50 border border-slate-100 flex-shrink-0" />
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-amber-50 rounded-xl border border-amber-100 flex gap-3">
                <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0" />
                <p className="text-[12px] text-amber-800 leading-relaxed font-medium italic">
                  Events using structured data may appear with rich details in Google Search results and on Google Maps.
                </p>
              </div>
            </div>
          </div>

          {/* Generated Code */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden text-white">
            <div className="bg-emerald-600 px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                <h2 className="font-semibold text-lg uppercase tracking-wide">Generated JSON-LD</h2>
              </div>
              <CopyToClipboard text={snippet} onCopy={handleCopy}>
                <button
                  type="button"
                  className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition-all text-white shadow-sm"
                  title={copied ? "Copied!" : "Copy to clipboard"}
                >
                  {copied ? <CheckCircle2 className="h-5 w-5 text-emerald-300" /> : <Copy className="h-5 w-5 text-white" />}
                </button>
              </CopyToClipboard>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 text-blue-700 text-sm">
              <p className="font-medium italic">Place this code block inside your site&apos;s &lt;head&gt; tag.</p>
              {imageMode === "upload" && (
                <p className="mt-1 text-xs font-bold text-blue-600">
                  ⚠️ Note: Replace the placeholder image URL in the code with your actual public image link.
                </p>
              )}
              <div className="bg-[#1e1e1e] p-6 relative group overflow-hidden">
                <div className="absolute top-0 right-0 p-4 border-b border-l border-white/5 bg-white/5 uppercase text-[10px] font-bold tracking-widest text-[#f8f8f2]/20">
                  event-schema.json
                </div>
                <div className="font-mono text-[13px] leading-relaxed text-[#f8f8f2] whitespace-pre-wrap break-all overflow-x-auto selection:bg-indigo-500/30 pt-4 px-1">
                  <span className="text-indigo-400 font-bold">&lt;script type=&quot;application/ld+json&quot;&gt;</span>
                  <div className="pl-4 py-2 border-l border-emerald-500/30 mt-1 mb-1 font-medium">
                    {jsonText}
                  </div>
                  <span className="text-indigo-400 font-bold">&lt;/script&gt;</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
