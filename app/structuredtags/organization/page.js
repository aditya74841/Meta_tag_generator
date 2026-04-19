"use client";

import React, { useState, useRef } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { 
  Building2, 
  Globe, 
  Image as ImageIcon, 
  MapPin, 
  Share2, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Link as LinkIcon,
  Layout,
  Eye,
  Code,
  CheckCircle2,
  Copy,
  Upload,
  Link2,
  Trash2,
  Plus
} from "lucide-react";

export default function OrganizationGenerator() {
  const [orgType, setOrgType] = useState("Organization");
  const [name, setName] = useState("");
  const [altName, setAltName] = useState("");
  const [url, setUrl] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [uploadedLogo, setUploadedLogo] = useState(null); // Base64 for preview
  const [logoMode, setLogoMode] = useState("url"); // "url" or "upload"
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
        setUploadedLogo(reader.result);
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
      "@type": orgType,
      name: name,
      ...(altName && { alternateName: altName }),
      url: url,
      logo: logoMode === "upload" ? "https://example.com/logo.png" : (logoUrl || undefined),
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
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Organization Structured Data</h1>
            <p className="text-indigo-100 mt-1 max-w-2xl">
              Generate Schema.org JSON-LD for organizations, helping search engines understand your brand and social presence.
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
              {/* Basic Info */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-slate-700">Type</label>
                    <select
                      value={orgType}
                      onChange={(e) => setOrgType(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                    >
                      <option value="Organization">Organization</option>
                      <option value="Corporation">Corporation</option>
                      <option value="EducationalOrganization">Educational Org</option>
                      <option value="GovernmentOrganization">Government Org</option>
                      <option value="LocalBusiness">Local Business</option>
                      <option value="NGO">NGO</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-slate-700">Organization Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. MetaForge Pro"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-slate-700">Alternate Name</label>
                    <input
                      type="text"
                      placeholder="e.g. MetaForge"
                      value={altName}
                      onChange={(e) => setAltName(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-slate-700">Website URL</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="url"
                        placeholder="https://example.com"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Logo Section */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-slate-700">Organization Logo</label>
                  <div className="flex bg-slate-100 rounded-lg p-1 text-[11px] font-bold uppercase tracking-tighter">
                    <button
                      onClick={() => setLogoMode("url")}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all ${logoMode === "url" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                    >
                      <Link2 className="h-3 w-3" />
                      URL
                    </button>
                    <button
                      onClick={() => setLogoMode("upload")}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all ${logoMode === "upload" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                    >
                      <Upload className="h-3 w-3" />
                      Upload
                    </button>
                  </div>
                </div>
                
                {logoMode === "url" ? (
                  <div className="relative">
                    <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="url"
                      placeholder="https://example.com/logo.png"
                      value={logoUrl}
                      onChange={(e) => setLogoUrl(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-mono"
                    />
                  </div>
                ) : (
                  <div 
                    onClick={() => fileInputRef.current.click()}
                    className="group border-2 border-dashed border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 transition-all rounded-xl p-6 text-center cursor-pointer"
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileUpload} 
                      className="hidden" 
                      accept="image/*"
                    />
                    <div className="flex flex-col items-center">
                      <div className="bg-slate-50 group-hover:bg-indigo-100 p-2 rounded-full transition-colors mb-2">
                        <Upload className="h-6 w-6 text-slate-400 group-hover:text-indigo-600" />
                      </div>
                      <span className="text-sm font-medium text-slate-600 group-hover:text-indigo-700 font-bold">Upload Logo</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Address */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <MapPin className="h-3 w-3" />
                  Physical Address
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-slate-700">Street Address</label>
                    <input
                      type="text"
                      placeholder="123 Main St"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-slate-700">City</label>
                    <input
                      type="text"
                      placeholder="San Francisco"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-slate-700">State / Region</label>
                    <input
                      type="text"
                      placeholder="California"
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-slate-700">Postal Code</label>
                    <input
                      type="text"
                      placeholder="94103"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-mono"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-slate-700">Country</label>
                    <input
                      type="text"
                      placeholder="USA"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Social Profiles */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Share2 className="h-3 w-3" />
                    Social Profiles
                  </h3>
                  <button
                    onClick={addSocial}
                    className="flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-md text-[11px] font-bold hover:bg-indigo-100 transition-all"
                  >
                    <Plus className="h-3 w-3" />
                    Add Profile
                  </button>
                </div>
                
                <div className="space-y-3">
                  {socials.map((social, index) => (
                    <div key={index} className="flex gap-2">
                      <div className="relative flex-1">
                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          type="url"
                          placeholder="https://facebook.com/metaforge"
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

        {/* Preview and Code Panel */}
        <div className="space-y-8">
          {/* Live Preview */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-amber-500 text-white px-6 py-4 flex items-center gap-2">
              <Eye className="h-5 w-5" />
              <h2 className="font-semibold text-lg uppercase text-white tracking-wide">Brand Identity Preview</h2>
            </div>
            
            <div className="p-8">
              <div className="max-w-md mx-auto bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden">
                <div className="bg-slate-50 p-6 flex flex-col items-center text-center">
                  <div className="h-24 w-24 rounded-2xl bg-white shadow-md border border-slate-100 p-4 mb-4 flex items-center justify-center overflow-hidden">
                    {logoMode === "url" ? (
                      logoUrl ? (
                        <img src={logoUrl} alt="Logo" className="max-h-full max-w-full object-contain" />
                      ) : (
                        <Building2 className="h-12 w-12 text-slate-200" />
                      )
                    ) : (
                      uploadedLogo ? (
                        <img src={uploadedLogo} alt="Logo" className="max-h-full max-w-full object-contain" />
                      ) : (
                        <Upload className="h-12 w-12 text-slate-200" />
                      )
                    )}
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 leading-tight">
                    {name || "Organization Name"}
                  </h3>
                  {altName && <p className="text-slate-500 text-sm mt-1 font-medium italic">({altName})</p>}
                  
                  <div className="flex items-center gap-1.5 mt-4 text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full text-xs font-bold border border-indigo-100">
                    <Globe className="h-3 w-3" />
                    {url ? new URL(url).hostname : "website.com"}
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Address */}
                  {(street || city || region || postalCode || country) && (
                    <div className="flex gap-4">
                      <div className="bg-slate-50 p-2.5 rounded-lg h-fit">
                        <MapPin className="h-5 w-5 text-slate-400" />
                      </div>
                      <div>
                        <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Headquarters</h4>
                        <p className="text-sm text-slate-700 leading-relaxed font-medium">
                          {street && <>{street}<br /></>}
                          {city && <>{city}, </>}
                          {region && <>{region} </>}
                          {postalCode && <>{postalCode}</>}
                          {country && <><br />{country}</>}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Socials */}
                  {socials.some(s => s.trim() !== "") && (
                    <div>
                      <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Share2 className="h-3 w-3" />
                        Connected Profiles
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {socials.filter(s => s.trim() !== "").map((s, idx) => (
                          <div key={idx} className="bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 flex items-center gap-2">
                            <LinkIcon className="h-3 w-3 text-slate-400" />
                            {new URL(s).hostname.replace('www.', '')}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-amber-50 rounded-xl border border-amber-100 text-[13px] text-amber-800 italic text-center">
                Knowledge Graph appearance may vary depending on local SEO authority and site history.
              </div>
            </div>
          </div>

          {/* Code Panel */}
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
               <p>TIP: Incorporate this into your site's header, typically on the homepage.</p>
               {logoMode === "upload" && (
                 <p className="mt-1 text-blue-600">
                    ⚠️ Note: Replace the placeholder logo URL in the code with your actual public image link.
                 </p>
               )}
            </div>

            <div className="bg-[#1e1e1e] p-6 relative group">
              <div className="font-mono text-[13px] leading-relaxed text-[#f8f8f2] whitespace-pre-wrap break-all overflow-x-auto selection:bg-indigo-500/30">
                <span className="text-slate-500 font-bold tracking-tighter opacity-50">&lt;script type="application/ld+json"&gt;</span>
                <div className="pl-4 py-2 border-l border-emerald-500/30 mt-1 mb-1">
                  {jsonText}
                </div>
                <span className="text-slate-500 font-bold tracking-tighter opacity-50">&lt;/script&gt;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
