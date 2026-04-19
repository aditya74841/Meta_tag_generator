"use client";

import React, { useState, useRef } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { 
  User, 
  Globe, 
  Briefcase, 
  Building2, 
  MapPin, 
  Share2, 
  Image as ImageIcon, 
  Upload, 
  Link2,
  Trash2,
  Plus,
  Layout,
  Eye,
  Code,
  CheckCircle2,
  Copy,
  Link as LinkIcon
} from "lucide-react";

export default function PersonGenerator() {
  const [name, setName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [url, setUrl] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [uploadedPhoto, setUploadedPhoto] = useState(null); // Base64 for preview
  const [photoMode, setPhotoMode] = useState("url"); // "url" or "upload"
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [socials, setSocials] = useState([""]);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addSocial = () => setSocials([...socials, ""]);
  const removeSocial = (index) => {
    const newSocials = [...socials];
    newSocials.splice(index, 1);
    setSocials(newSocials);
  };
  const updateSocial = (index, value) => {
    const newSocials = [...socials];
    newSocials[index] = value;
    setSocials(newSocials);
  };

  const generateJSON = () => {
    const validSocials = socials.filter(s => s.trim() !== "");
    const address = {
      "@type": "PostalAddress",
      ...(street && { streetAddress: street }),
      ...(city && { addressLocality: city }),
      ...(region && { addressRegion: region }),
      ...(postalCode && { postalCode: postalCode }),
      ...(country && { addressCountry: country }),
    };

    return {
      "@context": "https://schema.org",
      "@type": "Person",
      name: name,
      ...(jobTitle && { jobTitle: jobTitle }),
      ...(company && {
        worksFor: {
          "@type": "Organization",
          name: company,
        },
      }),
      ...(url && { url: url }),
      image: photoMode === "upload" ? "https://example.com/photos/1x1/photo.jpg" : (photoUrl || undefined),
      ...((street || city || region || postalCode || country) && { address }),
      ...(validSocials.length > 0 && { sameAs: validSocials }),
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
            <User className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Person Structured Data</h1>
            <p className="text-indigo-100 mt-1 max-w-2xl">
              Create a rich digital profile for search engines. Professional headshot, career info, and social connections.
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
              <h2 className="font-semibold text-lg tracking-wide uppercase">Core Identity</h2>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Identity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700">Full Name *</label>
                  <input
                    type="text"
                    placeholder="Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700">Personal Website</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="url"
                      placeholder="https://janedoe.me"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Career */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700">Job Title</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Senior Developer"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700">Works For (Org Name)</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Global Tech Corp"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Photo */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-slate-700">Profile Photo</label>
                  <div className="flex bg-slate-100 rounded-lg p-1 text-[10px] font-black uppercase">
                    <button
                      onClick={() => setPhotoMode("url")}
                      className={`px-3 py-1 rounded-md transition-all ${photoMode === "url" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                    >
                      URL
                    </button>
                    <button
                      onClick={() => setPhotoMode("upload")}
                      className={`px-3 py-1 rounded-md transition-all ${photoMode === "upload" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                    >
                      Upload
                    </button>
                  </div>
                </div>
                
                {photoMode === "url" ? (
                  <div className="relative">
                    <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="url"
                      placeholder="https://example.com/photo.jpg"
                      value={photoUrl}
                      onChange={(e) => setPhotoUrl(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-mono"
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
                      <span className="text-sm font-bold text-slate-500 group-hover:text-indigo-700">Choose Profile Picture</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Address */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <MapPin className="h-3 w-3" />
                  Primary Residence
                </h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Street Address"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                    <input
                      type="text"
                      placeholder="State / Region"
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Postal Code"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-mono"
                    />
                    <input
                      type="text"
                      placeholder="Country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                </div>
              </div>

               {/* Socials */}
               <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Share2 className="h-3 w-3" />
                    Digital Footprint
                  </h3>
                  <button
                    onClick={addSocial}
                    className="flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-md text-[10px] font-black uppercase hover:bg-indigo-100 transition-all"
                  >
                    <Plus className="h-3 w-3" />
                    Add Link
                  </button>
                </div>
                
                <div className="space-y-3">
                  {socials.map((social, index) => (
                    <div key={index} className="flex gap-2">
                      <div className="relative flex-1">
                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          type="url"
                          placeholder="https://linkedin.com/in/jane-doe"
                          value={social}
                          onChange={(e) => updateSocial(index, e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-mono"
                        />
                      </div>
                      {socials.length > 1 && (
                        <button
                          onClick={() => removeSocial(index)}
                          className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
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
              <h2 className="font-semibold text-lg uppercase tracking-wide">Identity Card Preview</h2>
            </div>
            
            <div className="p-8">
              <div className="max-w-md mx-auto bg-white rounded-3xl border border-slate-100 shadow-2xl overflow-hidden relative">
                <div className="h-32 bg-indigo-600 relative overflow-hidden">
                   <div className="absolute inset-0 opacity-20 flex flex-wrap gap-4 p-4 grayscale">
                     <Share2 className="h-12 w-12 text-white" />
                     <Globe className="h-8 w-8 text-white" />
                     <User className="h-16 w-16 text-white" />
                   </div>
                </div>
                
                <div className="px-6 pb-8 pt-16 flex flex-col items-center">
                  <div className="absolute top-12 left-1/2 -translate-x-1/2 h-40 w-40 rounded-full border-[6px] border-white shadow-xl bg-slate-50 overflow-hidden text-slate-800">
                    {photoMode === "url" ? (
                      photoUrl ? (
                        <img src={photoUrl} alt="Person" className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center">
                          <User className="h-16 w-16 text-slate-200" />
                        </div>
                      )
                    ) : (
                      uploadedPhoto ? (
                        <img src={uploadedPhoto} alt="Person" className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center">
                          <Upload className="h-16 w-16 text-slate-200" />
                        </div>
                      )
                    )}
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 mt-2">{name || "Your Name"}</h3>
                  <div className="text-indigo-600 font-bold text-sm tracking-wide mt-1 uppercase">{jobTitle || "Your Current Role"}</div>
                  
                  {company && (
                    <div className="flex items-center gap-2 text-slate-400 text-xs mt-3 uppercase tracking-widest font-black">
                      <Building2 className="h-3 w-3" />
                      {company}
                    </div>
                  )}

                  <div className="w-full border-t border-slate-100 my-6"></div>

                  <div className="w-full space-y-4">
                    {/* Information List */}
                    {(url || city || country) && (
                      <div className="space-y-3">
                        {url && (
                          <div className="flex items-center gap-3 text-slate-600">
                             <Globe className="h-4 w-4 text-indigo-500" />
                             <span className="text-xs font-bold truncate max-w-[200px]">{new URL(url).hostname}</span>
                          </div>
                        )}
                        {(city || country) && (
                          <div className="flex items-center gap-3 text-slate-600">
                             <MapPin className="h-4 w-4 text-rose-500" />
                             <span className="text-xs font-bold uppercase tracking-tighter">
                               {city}{city && country && ", "} {country}
                             </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Socials Link Mockup */}
                    {socials.some(s => s.trim() !== "") && (
                       <div className="flex flex-wrap justify-center gap-2 pt-2">
                         {socials.filter(s => s.trim() !== "").map((s, idx) => (
                           <div key={idx} className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 text-indigo-500">
                             <LinkIcon className="h-4 w-4" />
                           </div>
                         ))}
                       </div>
                    )}
                  </div>
                </div>
              </div>
              
              <p className="text-center text-[11px] text-slate-400 mt-8 leading-relaxed px-12">
                Structured data helps Google generate rich snippets for personal brands, resumes, and authoritative bios in search results.
              </p>
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
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 text-blue-700 text-xs font-bold italic">
               <p>TIP: Add this schema to your "About Me" or Biography page.</p>
               {photoMode === "upload" && (
                 <p className="mt-1 text-blue-600">
                    ⚠️ Note: Replace the placeholder image URL in the code with your actual public profile picture link.
                 </p>
               )}
            </div>
            
            <div className="bg-[#1e1e1e] p-6 relative group overflow-hidden">
              <div className="absolute top-0 right-0 p-4 border-b border-l border-white/5 bg-white/5 uppercase text-[10px] font-bold tracking-widest text-[#f8f8f2]/30">
                APPLICATION/LD+JSON
              </div>
              <div className="font-mono text-[13px] leading-relaxed text-[#f8f8f2] whitespace-pre-wrap break-all overflow-x-auto selection:bg-indigo-500/30 pt-4">
                <span className="text-indigo-400/60 font-bold">&lt;script type="application/ld+json"&gt;</span>
                <div className="pl-4 py-2 border-l border-emerald-500/30 mt-1 mb-1">
                  {jsonText}
                </div>
                <span className="text-indigo-400/60 font-bold">&lt;/script&gt;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
