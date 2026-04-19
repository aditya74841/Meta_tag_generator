"use client";

import React, { useState, useRef } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { 
  Video as VideoIcon, 
  Play, 
  Clock, 
  Calendar, 
  Link2, 
  Layout, 
  Eye, 
  Code, 
  CheckCircle2, 
  Copy,
  Plus,
  Trash2,
  Image as ImageIcon,
  Upload,
  AlertCircle,
  Clapperboard,
  Tv,
  Youtube,
  MonitorPlay
} from "lucide-react";

export default function VideoGenerator() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [uploadedThumbnail, setUploadedThumbnail] = useState(null); // Base64 for preview
  const [imageMode, setImageMode] = useState("url"); // "url" or "upload"
  const [uploadDate, setUploadDate] = useState("");
  const [contentUrl, setContentUrl] = useState("");
  const [embedUrl, setEmbedUrl] = useState("");
  const [durationH, setDurationH] = useState("");
  const [durationM, setDurationM] = useState("");
  const [durationS, setDurationS] = useState("");
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedThumbnail(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateJSON = () => {
    const duration = () => {
        if (!durationH && !durationM && !durationS) return undefined;
        let d = "PT";
        if (durationH) d += `${durationH}H`;
        if (durationM) d += `${durationM}M`;
        if (durationS) d += `${durationS}S`;
        return d;
    };

    return {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: name,
      description: description,
      thumbnailUrl: [imageMode === "upload" ? "https://example.com/photos/1x1/photo.jpg" : (thumbnailUrl || undefined)],
      uploadDate: uploadDate,
      duration: duration(),
      contentUrl: contentUrl,
      embedUrl: embedUrl
    };
  };

  const jsonText = JSON.stringify(generateJSON(), null, 2);
  const snippet = `<script type="application/ld+json">\n${jsonText}\n</script>`;

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8 text-slate-800">
      {/* Header Section */}
      <div className="bg-indigo-600 text-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-lg">
            <VideoIcon className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Video Structured Data</h1>
            <p className="text-indigo-100 mt-1 max-w-2xl font-medium">
              Improve your video SEO. Help Google understand your video content to appear in search carousels and rich results.
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
              <h2 className="font-semibold text-lg tracking-wide uppercase">Video Metadata</h2>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Identity */}
              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-slate-700">Video Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Masterclass: Advanced Web Design"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-slate-700">Description</label>
                <textarea
                  placeholder="Tell search engines what this video is about..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium leading-relaxed"
                />
              </div>

              {/* Timing & URLs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                 <div className="space-y-1.5">
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Duration (H:M:S)</label>
                    <div className="flex gap-1">
                       <input type="number" placeholder="H" value={durationH} onChange={(e) => setDurationH(e.target.value)} className="w-12 bg-white border border-slate-300 rounded-lg px-1 py-2 text-center text-xs focus:ring-2 focus:ring-indigo-500 font-bold" />
                       <input type="number" placeholder="M" value={durationM} onChange={(e) => setDurationM(e.target.value)} className="w-12 bg-white border border-slate-300 rounded-lg px-1 py-2 text-center text-xs focus:ring-2 focus:ring-indigo-500 font-bold" />
                       <input type="number" placeholder="S" value={durationS} onChange={(e) => setDurationS(e.target.value)} className="w-12 bg-white border border-slate-300 rounded-lg px-1 py-2 text-center text-xs focus:ring-2 focus:ring-indigo-500 font-bold" />
                    </div>
                 </div>
                 <div className="col-span-2 space-y-1.5">
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Upload Date</label>
                    <div className="relative">
                       <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                       <input type="date" value={uploadDate} onChange={(e) => setUploadDate(e.target.value)} className="w-full bg-white border border-slate-300 rounded-lg pl-8 pr-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500 font-bold" />
                    </div>
                 </div>
              </div>

              {/* Technical URLs */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                 <div className="space-y-1.5">
                    <label className="block text-sm font-bold text-slate-700 flex items-center gap-2">
                       Content URL
                       <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded uppercase font-black">Direct File</span>
                    </label>
                    <div className="relative">
                       <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                       <input type="url" placeholder="https://cdn.example.com/movie.mp4" value={contentUrl} onChange={(e) => setContentUrl(e.target.value)} className="w-full border border-slate-300 rounded-lg pl-10 pr-3 py-2.5 text-xs font-mono focus:ring-2 focus:ring-indigo-500" />
                    </div>
                 </div>
                 <div className="space-y-1.5">
                    <label className="block text-sm font-bold text-slate-700 flex items-center gap-2">
                       Embed URL
                       <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded uppercase font-black">YouTube/Vimeo</span>
                    </label>
                    <div className="relative">
                       <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                       <input type="url" placeholder="https://youtube.com/embed/..." value={embedUrl} onChange={(e) => setEmbedUrl(e.target.value)} className="w-full border border-slate-300 rounded-lg pl-10 pr-3 py-2.5 text-xs font-mono focus:ring-2 focus:ring-indigo-500" />
                    </div>
                 </div>
              </div>

               {/* Thumbnail upload */}
               <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-bold text-slate-700">Thumbnail Image</label>
                  <div className="flex bg-slate-100 rounded-lg p-1 text-[10px] font-black uppercase shadow-inner">
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
                      placeholder="https://example.com/poster.jpg"
                      value={thumbnailUrl}
                      onChange={(e) => setThumbnailUrl(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-3 py-2.5 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                ) : (
                  <div 
                    onClick={() => fileInputRef.current.click()}
                    className="group border-2 border-dashed border-slate-200 hover:border-indigo-400 hover:bg-slate-50 transition-all rounded-xl p-8 text-center cursor-pointer"
                  >
                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
                    <div className="flex flex-col items-center">
                      <div className="bg-slate-50 p-2.5 rounded-full mb-1 group-hover:bg-indigo-100 transition-colors shadow-sm">
                        <Upload className="h-5 w-5 text-slate-300 group-hover:text-indigo-600" />
                      </div>
                      <span className="text-[11px] font-black text-slate-400 group-hover:text-indigo-700 uppercase tracking-widest">Swap Poster</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Previews */}
        <div className="space-y-8">
          {/* Player Preview */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-amber-500 text-white px-6 py-4 flex items-center gap-2">
              <Eye className="h-5 w-5" />
              <h2 className="font-semibold text-lg uppercase tracking-wide px-1">Visual Mockup</h2>
            </div>
            
            <div className="p-8 pb-12 bg-slate-50">
               <div className="max-w-md mx-auto bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden group">
                  <div className="relative aspect-video bg-slate-900 overflow-hidden group-hover:bg-black transition-colors">
                    {imageMode === "url" ? (
                      thumbnailUrl ? (
                        <img src={thumbnailUrl} alt="Thumbnail" className="h-full w-full object-cover opacity-70 group-hover:opacity-40 transition-opacity duration-700" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center grayscale opacity-10">
                           <Tv className="h-20 w-20 text-white" />
                        </div>
                      )
                    ) : (
                      uploadedThumbnail ? (
                        <img src={uploadedThumbnail} alt="Thumbnail" className="h-full w-full object-cover opacity-70 group-hover:opacity-40 transition-opacity duration-700" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center grayscale opacity-10">
                           <Upload className="h-20 w-20 text-white" />
                        </div>
                      )
                    )}
                    
                    {/* Controls Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-600 transition-all duration-300 shadow-2xl">
                          <Play className="h-8 w-8 text-white fill-current translate-x-0.5" />
                       </div>
                    </div>

                    <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white text-[10px] font-black px-2 py-1 rounded shadow-lg uppercase tracking-tighter">
                       {(durationH || durationM || durationS) ? 
                        `${durationH ? durationH + ":" : ""}${durationM || "00"}:${durationS || "00"}` 
                        : "LIVE"}
                    </div>
                  </div>

                  <div className="p-8">
                     <h3 className="text-xl font-black text-slate-900 leading-tight mb-2 italic line-clamp-2">{name || "Your High-Production Video Title"}</h3>
                     <p className="text-[13px] text-slate-500 mb-6 italic line-clamp-2 leading-relaxed">
                       {description || "Explore the unseen moments and technical brilliance behind this production..."}
                     </p>

                     <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                        <div className="flex items-center gap-2">
                           <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-indigo-600">
                              <Clapperboard className="h-4 w-4" />
                           </div>
                           <div className="flex flex-col">
                              <span className="text-[9px] font-black text-slate-400 uppercase">Released</span>
                              <span className="text-[11px] font-black text-slate-900 italic">{uploadDate || "Dec 2023"}</span>
                           </div>
                        </div>
                        <button className="bg-slate-900 text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-slate-100">
                           Watch 
                        </button>
                     </div>
                  </div>
               </div>

               <div className="mt-8 flex items-start gap-3 bg-red-50 p-4 rounded-xl border border-red-100/50">
                  <MonitorPlay className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-red-800 font-medium leading-relaxed italic">
                    Videos with correct <strong>uploadDate</strong> and <strong>thumbnailUrl</strong> are eligible for the video carousel and key moments in search.
                  </p>
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
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 text-blue-700 text-xs font-black uppercase tracking-tight italic">
               <p>Place this code block near your video player or in the &lt;head&gt; tag.</p>
               {imageMode === "upload" && (
                 <p className="mt-1 text-blue-600">
                    ⚠️ Note: Replace the placeholder thumbnail URL in the code with your actual public image link.
                 </p>
               )}
            </div>
            
            <div className="bg-[#1e1e1e] p-6 relative group overflow-hidden">
               <div className="absolute top-0 right-0 p-4 border-b border-l border-white/5 bg-white/5 uppercase text-[10px] font-black tracking-widest text-emerald-500/40">
                  video-schema.json
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
