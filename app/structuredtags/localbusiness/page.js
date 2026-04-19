"use client";

import React, { useState, useRef } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { 
  Store, 
  MapPin, 
  Phone, 
  Globe, 
  Clock, 
  DollarSign, 
  Layout, 
  Eye, 
  Code, 
  CheckCircle2, 
  Copy,
  Plus,
  Trash2,
  Image as ImageIcon,
  Upload,
  Link2,
  AlertCircle,
  Navigation,
  Star,
  ChevronDown
} from "lucide-react";

export default function LocalBusinessGenerator() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("LocalBusiness");
  const [imageUrl, setImageUrl] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null); // Base64 for preview
  const [imageMode, setImageMode] = useState("url"); // "url" or "upload"
  const [priceRange, setPriceRange] = useState("$$");
  const [telephone, setTelephone] = useState("");
  const [url, setUrl] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [openingHours, setOpeningHours] = useState([
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" }
  ]);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef(null);

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

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

  const addHours = () => setOpeningHours([...openingHours, { days: [], opens: "09:00", closes: "18:00" }]);
  const removeHours = (index) => {
    const newHours = [...openingHours];
    newHours.splice(index, 1);
    setOpeningHours(newHours);
  };
  const toggleDay = (index, day) => {
    const newHours = [...openingHours];
    const days = newHours[index].days;
    if (days.includes(day)) {
      newHours[index].days = days.filter(d => d !== day);
    } else {
      newHours[index].days = [...days, day];
    }
    setOpeningHours(newHours);
  };

  const generateJSON = () => {
    return {
      "@context": "https://schema.org",
      "@type": category,
      name: name,
      image: imageMode === "upload" ? "https://example.com/photos/1x1/photo.jpg" : (imageUrl || undefined),
      priceRange: priceRange,
      telephone: telephone,
      url: url,
      address: {
        "@type": "PostalAddress",
        streetAddress: street,
        addressLocality: city,
        addressRegion: region,
        postalCode: postalCode,
        addressCountry: country
      },
      openingHoursSpecification: openingHours.map(h => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.days,
        opens: h.opens,
        closes: h.closes
      }))
    };
  };

  const jsonText = JSON.stringify(generateJSON(), null, 2);
  const snippet = `<script type="application/ld+json">\n${jsonText}\n</script>`;

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8 text-slate-800 font-sans">
      {/* Header Section */}
      <div className="bg-indigo-600 text-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-lg">
            <Store className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Local Business Structured Data</h1>
            <p className="text-indigo-100 mt-1 max-w-2xl font-medium">
              Optimize your local SEO. Proper schema helps your business appear in the local pack and Google Maps with hours, ratings, and contact info.
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
              <h2 className="font-semibold text-lg tracking-wide uppercase">Store Settings</h2>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Core Identity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-bold text-slate-700">Business Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Zen Coffee Roast"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-bold text-slate-700">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                  >
                    <option value="LocalBusiness">Local Business (General)</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="CafeOrCoffeeShop">Cafe / Coffee Shop</option>
                    <option value="Store">Retail Store</option>
                    <option value="AutomotiveBusiness">Automotive</option>
                    <option value="HealthAndBeautyBusiness">Health & Beauty</option>
                    <option value="ProfessionalService">Professional Service</option>
                  </select>
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div className="space-y-1.5">
                  <label className="block text-sm font-bold text-slate-700">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={telephone}
                      onChange={(e) => setTelephone(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-bold text-slate-700">Website URL</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="url"
                      placeholder="https://zenrost.com"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>

              {/* Price & Image */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                <div className="space-y-1.5">
                  <label className="block text-sm font-bold text-slate-700">Price Range</label>
                  <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
                    {["$", "$$", "$$$", "$$$$"].map(p => (
                      <button
                        key={p}
                        onClick={() => setPriceRange(p)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-black transition-all ${priceRange === p ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-1.5">
                   <label className="block text-sm font-bold text-slate-700">Storefront Image</label>
                   <div 
                    onClick={() => fileInputRef.current.click()}
                    className="flex justify-between items-center bg-slate-100 rounded-lg p-1 text-[10px] font-black uppercase mb-1"
                   >
                    <button
                      onClick={(e) => { e.stopPropagation(); setImageMode("url"); }}
                      className={`px-3 py-1 rounded-md transition-all ${imageMode === "url" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                    >
                      URL
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setImageMode("upload"); }}
                      className={`px-3 py-1 rounded-md transition-all ${imageMode === "upload" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                    >
                      Upload
                    </button>
                  </div>

                  {imageMode === "url" ? (
                    <div className="relative">
                      <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="url"
                        placeholder="https://example.com/store.jpg"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  ) : (
                    <div 
                      onClick={() => fileInputRef.current.click()}
                      className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 hover:border-indigo-400 transition-all cursor-pointer group"
                    >
                      <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
                      <Upload className="h-4 w-4 text-slate-400 group-hover:text-indigo-600" />
                      <span className="text-xs font-bold text-slate-500 group-hover:text-indigo-700 truncate">
                        {uploadedImage ? "Image Loaded" : "Upload Image"}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Address */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <MapPin className="h-3 w-3" />
                  Physical Location
                </h3>
                <input
                  type="text"
                  placeholder="Street Address"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <input
                    type="text"
                    placeholder="State / Region"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Postal Code"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono font-bold"
                  />
                  <input
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Hours */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                 <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      Operating Hours
                    </h3>
                    <button
                      onClick={addHours}
                      className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full hover:bg-indigo-100 transition-all border border-indigo-100"
                    >
                      Add Period
                    </button>
                 </div>

                 {openingHours.map((h, hIdx) => (
                   <div key={hIdx} className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-4 border-l-4 border-l-indigo-400">
                      <div className="flex flex-wrap gap-1.5">
                        {daysOfWeek.map(day => (
                          <button
                            key={day}
                            onClick={() => toggleDay(hIdx, day)}
                            className={`px-2 py-1 rounded text-[10px] font-black border transition-all ${h.days.includes(day) ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-400 border-slate-200"}`}
                          >
                            {day.slice(0, 3)}
                          </button>
                        ))}
                      </div>
                      <div className="flex items-center gap-4">
                         <div className="flex-1 space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Opens</label>
                            <input type="time" value={h.opens} onChange={(e) => {
                              const newHours = [...openingHours];
                              newHours[hIdx].opens = e.target.value;
                              setOpeningHours(newHours);
                            }} className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs focus:ring-2 focus:ring-indigo-500 font-bold" />
                         </div>
                         <div className="flex-1 space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Closes</label>
                            <input type="time" value={h.closes} onChange={(e) => {
                              const newHours = [...openingHours];
                              newHours[hIdx].closes = e.target.value;
                              setOpeningHours(newHours);
                            }} className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs focus:ring-2 focus:ring-indigo-500 font-bold" />
                         </div>
                         <button onClick={() => removeHours(hIdx)} className="p-2 text-slate-300 hover:text-rose-500 transition-colors mt-5">
                            <Trash2 className="h-4 w-4" />
                         </button>
                      </div>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Previews */}
        <div className="space-y-8">
          {/* Google Search/Maps Preview */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-amber-500 text-white px-6 py-4 flex items-center gap-2">
              <Eye className="h-5 w-5" />
              <h2 className="font-semibold text-lg uppercase tracking-wide">Local Result Preview</h2>
            </div>
            
            <div className="p-8">
               <div className="max-w-md mx-auto bg-white rounded-2xl border border-slate-100 shadow-2xl overflow-hidden group">
                  <div className="relative h-48 sm:h-56 bg-slate-100 overflow-hidden">
                   {imageMode === "url" ? (
                     imageUrl ? (
                       <img src={imageUrl} alt="Front" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                     ) : (
                       <div className="h-full w-full flex items-center justify-center opacity-10 grayscale">
                          <Store className="h-20 w-20" />
                       </div>
                     )
                   ) : (
                     uploadedImage ? (
                       <img src={uploadedImage} alt="Front" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                     ) : (
                       <div className="h-full w-full flex items-center justify-center opacity-10 grayscale">
                          <Upload className="h-20 w-20" />
                       </div>
                     )
                   )}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6 pt-12">
                       <h3 className="text-white text-2xl font-black leading-tight drop-shadow-md">{name || "Your Local Business"}</h3>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                       <div className="flex text-amber-500">
                          {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}
                       </div>
                       <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">4.9 • {category}</span>
                    </div>

                    <div className="space-y-4">
                       <div className="flex items-start gap-4">
                          <div className="p-2 bg-rose-50 rounded-lg text-rose-500 shrink-0">
                             <MapPin className="h-4 w-4" />
                          </div>
                          <div>
                             <span className="text-[13px] font-bold text-slate-700 block">Location</span>
                             <span className="text-xs text-slate-500 leading-relaxed italic">
                               {street || "Add street address..."}{city && `, ${city}`}
                             </span>
                          </div>
                          <button className="ml-auto p-2 border border-slate-100 rounded-full hover:bg-slate-50 text-indigo-600">
                             <Navigation className="h-4 w-4" />
                          </button>
                       </div>

                       <div className="flex items-start gap-4 pt-4 border-t border-slate-50">
                          <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600 shrink-0">
                             <Clock className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                             <div className="flex items-center justify-between">
                                <span className="text-[13px] font-bold text-slate-700">Store Hours</span>
                                <span className="text-[10px] font-black text-emerald-600 uppercase bg-emerald-50 px-2 py-0.5 rounded-full">Open Now</span>
                             </div>
                             <div className="mt-2 space-y-1">
                                {openingHours.slice(0, 1).map((h, i) => (
                                  <div key={i} className="flex justify-between text-[11px] text-slate-500 font-medium">
                                    <span>{h.days.length > 0 ? h.days[0] : "Mon"} - {h.days.length > 0 ? h.days[h.days.length-1] : "Fri"}</span>
                                    <span className="font-black text-slate-700">{h.opens} - {h.closes}</span>
                                  </div>
                                ))}
                             </div>
                          </div>
                       </div>

                       <div className="flex items-center gap-3 pt-6">
                          <button className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white font-black py-2.5 rounded-xl text-xs hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                             <Phone className="h-3.5 w-3.5" />
                             Call Now
                          </button>
                          <button className="flex-1 flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 font-black py-2.5 rounded-xl text-xs hover:bg-slate-50 transition-all">
                             <Globe className="h-3.5 w-3.5" />
                             Website
                          </button>
                       </div>
                    </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Generated Code Panel */}
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
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 text-blue-700 text-sm italic">
               <p className="font-semibold text-blue-800">Place this code block inside your site's &lt;head&gt; tag.</p>
               {imageMode === "upload" && (
                 <p className="mt-1 text-xs font-bold text-blue-600">
                    ⚠️ Note: Replace the placeholder image URL in the code with your actual public image link.
                 </p>
               )}
            </div>
            
            <div className="bg-[#1e1e1e] p-6 relative group overflow-hidden">
               <div className="absolute top-0 right-0 p-4 border-b border-l border-white/5 bg-white/5 uppercase text-[10px] font-black tracking-widest text-[#f8f8f2]/20">
                  local-schema.json
               </div>
              <div className="font-mono text-[13px] leading-relaxed text-[#f8f8f2] whitespace-pre-wrap break-all overflow-x-auto selection:bg-indigo-500/40 pt-4">
                <span className="text-indigo-400 font-bold">&lt;script type="application/ld+json"&gt;</span>
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
  );
}
