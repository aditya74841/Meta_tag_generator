"use client";

import React, { useState, useRef } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { 
  Compass, 
  Clock, 
  DollarSign, 
  Hammer, 
  Package, 
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
  Info,
  ChevronRight,
  ListRestart,
  Wrench,
  BookOpen
} from "lucide-react";

export default function HowToGenerator() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null); // Base64 for preview
  const [imageMode, setImageMode] = useState("url"); // "url" or "upload"
  const [totalTime, setTotalTime] = useState("");
  const [cost, setCost] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [supplies, setSupplies] = useState([""]);
  const [tools, setTools] = useState([""]);
  const [steps, setSteps] = useState([{ title: "", text: "", image: "" }]);
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

  const addSupply = () => setSupplies([...supplies, ""]);
  const updateSupply = (idx, val) => {
    const newS = [...supplies];
    newS[idx] = val;
    setSupplies(newS);
  };
  const removeSupply = (idx) => {
    if (supplies.length > 1) {
      const newS = [...supplies];
      newS.splice(idx, 1);
      setSupplies(newS);
    }
  };

  const addTool = () => setTools([...tools, ""]);
  const updateTool = (idx, val) => {
    const newT = [...tools];
    newT[idx] = val;
    setTools(newT);
  };
  const removeTool = (idx) => {
    if (tools.length > 1) {
      const newT = [...tools];
      newT.splice(idx, 1);
      setTools(newT);
    }
  };

  const addStep = () => setSteps([...steps, { title: "", text: "", image: "" }]);
  const updateStep = (idx, field, val) => {
    const newSteps = [...steps];
    newSteps[idx][field] = val;
    setSteps(newSteps);
  };
  const removeStep = (idx) => {
    if (steps.length > 1) {
      const newSteps = [...steps];
      newSteps.splice(idx, 1);
      setSteps(newSteps);
    }
  };

  const generateJSON = () => {
    return {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: name,
      description: description,
      image: imageMode === "upload" ? "https://example.com/photos/1x1/photo.jpg" : (imageUrl || undefined),
      totalTime: totalTime ? `PT${totalTime}M` : undefined,
      estimatedCost: cost ? {
        "@type": "MonetaryAmount",
        currency: currency,
        value: cost
      } : undefined,
      supply: supplies.filter(s => s.trim()).map(s => ({ "@type": "HowToSupply", name: s })),
      tool: tools.filter(t => t.trim()).map(t => ({ "@type": "HowToTool", name: t })),
      step: steps.filter(s => s.text.trim()).map(s => ({
        "@type": "HowToStep",
        name: s.title,
        text: s.text,
        image: s.image || undefined
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
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8 text-slate-800">
      {/* Header Section */}
      <div className="bg-indigo-600 text-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-lg">
            <Compass className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">How-To Structured Data</h1>
            <p className="text-indigo-100 mt-1 max-w-2xl font-medium">
              Turn your guides into interactive snippets. Show steps, tools, and estimated time directly in search results.
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
              <h2 className="font-semibold text-lg tracking-wide uppercase">Manual Settings</h2>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Identity */}
              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-slate-700">Guide Title *</label>
                <input
                  type="text"
                  placeholder="e.g. How to Build a Birdhouse"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-slate-700">Guide Overview</label>
                <textarea
                  placeholder="Short summary of what the reader will achieve..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium leading-relaxed"
                />
              </div>

              {/* Time & Cost */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
                 <div className="space-y-1.5">
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Time (min)</label>
                    <div className="relative">
                       <Clock className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                       <input type="number" value={totalTime} onChange={(e) => setTotalTime(e.target.value)} className="w-full bg-white border border-slate-300 rounded-lg pl-8 pr-2 py-2 text-xs focus:ring-2 focus:ring-indigo-500 font-bold" />
                    </div>
                 </div>
                 <div className="space-y-1.5">
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Cost</label>
                    <div className="relative">
                       <DollarSign className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                       <input type="number" value={cost} onChange={(e) => setCost(e.target.value)} className="w-full bg-white border border-slate-300 rounded-lg pl-8 pr-2 py-2 text-xs focus:ring-2 focus:ring-indigo-500 font-bold" />
                    </div>
                 </div>
                 <div className="col-span-2 space-y-1.5">
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Currency</label>
                    <input type="text" value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500 font-bold" />
                 </div>
              </div>

              {/* Resources (Tools & Supplies) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                 <div className="space-y-4">
                    <div className="flex items-center justify-between">
                       <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                          <Wrench className="h-3 w-3" /> Tools
                       </h3>
                       <button onClick={addTool} className="text-[10px] font-black text-indigo-600 hover:text-indigo-800 uppercase tracking-tighter">Add Tool</button>
                    </div>
                    {tools.map((t, i) => (
                      <div key={i} className="flex gap-2">
                         <input type="text" value={t} onChange={(e) => updateTool(i, e.target.value)} className="flex-1 bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-medium focus:ring-2 focus:ring-indigo-500" placeholder="e.g. Saw" />
                         <button onClick={() => removeTool(i)} className="p-1.5 text-slate-300 hover:text-rose-500 transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
                      </div>
                    ))}
                 </div>
                 <div className="space-y-4">
                    <div className="flex items-center justify-between">
                       <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                          <Package className="h-3 w-3" /> Supplies
                       </h3>
                       <button onClick={addSupply} className="text-[10px] font-black text-indigo-600 hover:text-indigo-800 uppercase tracking-tighter">Add Item</button>
                    </div>
                    {supplies.map((s, i) => (
                      <div key={i} className="flex gap-2">
                         <input type="text" value={s} onChange={(e) => updateSupply(i, e.target.value)} className="flex-1 bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-medium focus:ring-2 focus:ring-indigo-500" placeholder="e.g. Nails" />
                         <button onClick={() => removeSupply(i)} className="p-1.5 text-slate-300 hover:text-rose-500 transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Steps */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                 <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                       <ListRestart className="h-3 w-3" /> Sequence Steps
                    </h3>
                    <button onClick={addStep} className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100 hover:bg-indigo-100 transition-all">
                       Add Step
                    </button>
                 </div>
                 <div className="space-y-4">
                    {steps.map((step, idx) => (
                      <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 relative group">
                         <div className="flex items-center justify-between border-b border-white pb-2 mb-2">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Step {idx + 1}</span>
                            <button onClick={() => removeStep(idx)} className="p-1.5 text-slate-300 hover:text-rose-500 transition-colors"><Trash2 className="h-4 w-4" /></button>
                         </div>
                         <input
                           type="text"
                           placeholder="Short Heading (Optional)"
                           value={step.title}
                           onChange={(e) => updateStep(idx, "title", e.target.value)}
                           className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-bold focus:ring-2 focus:ring-indigo-500"
                         />
                         <textarea
                           placeholder="Detailed instructions for this step..."
                           value={step.text}
                           onChange={(e) => updateStep(idx, "text", e.target.value)}
                           rows={2}
                           className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-indigo-500 leading-relaxed"
                         />
                         <div className="relative">
                            <ImageIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-400" />
                            <input
                              type="url"
                              placeholder="Step Image URL..."
                              value={step.image}
                              onChange={(e) => updateStep(idx, "image", e.target.value)}
                              className="w-full bg-white border border-slate-300 rounded-lg pl-7 pr-3 py-1.5 text-[10px] font-mono focus:ring-2 focus:ring-indigo-500"
                            />
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

               {/* Main image upload */}
               <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-bold text-slate-700">Guide Banner</label>
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
                      placeholder="https://example.com/guide-cover.jpg"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
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
                      <span className="text-[11px] font-black text-slate-400 group-hover:text-indigo-700 uppercase tracking-widest">Swap Cover</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Previews */}
        <div className="space-y-8">
          {/* Mock Preview */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-amber-500 text-white px-6 py-4 flex items-center gap-2">
              <Eye className="h-5 w-5" />
              <h2 className="font-semibold text-lg uppercase tracking-wide px-1">Visual Walkthrough</h2>
            </div>
            
            <div className="p-8 pb-12 bg-slate-50">
               <div className="max-w-md mx-auto bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden group">
                  <div className="relative h-48 bg-slate-100 overflow-hidden">
                    {imageMode === "url" ? (
                      imageUrl ? (
                        <img src={imageUrl} alt="Cover" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center grayscale opacity-10">
                           <BookOpen className="h-20 w-20" />
                        </div>
                      )
                    ) : (
                      uploadedImage ? (
                        <img src={uploadedImage} alt="Cover" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center grayscale opacity-10">
                           <Upload className="h-20 w-20" />
                        </div>
                      )
                    )}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6 pt-12">
                       <h3 className="text-white text-xl font-black leading-tight italic drop-shadow-md">{name || "How-to Guide Title"}</h3>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex gap-4 mb-6 text-white">
                        <div className="flex-1 bg-indigo-600 rounded-2xl p-3 flex flex-col items-center shadow-lg shadow-indigo-100">
                           <span className="text-[9px] font-black uppercase opacity-60">Est. Time</span>
                           <span className="text-xs font-black">{totalTime || "0"} min</span>
                        </div>
                        <div className="flex-1 bg-emerald-600 rounded-2xl p-3 flex flex-col items-center shadow-lg shadow-emerald-100">
                           <span className="text-[9px] font-black uppercase opacity-60">Est. Cost</span>
                           <span className="text-xs font-black">{currency} {cost || "0"}</span>
                        </div>
                    </div>

                    <p className="text-[13px] text-slate-500 mb-8 italic line-clamp-3 leading-relaxed border-b border-slate-50 pb-6">
                       {description || "A complete step-by-step masterclass covering every detail you need to succeed today..."}
                    </p>

                    <div className="space-y-6">
                       <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                          <ListRestart className="h-3 w-3" /> The Process
                       </h4>
                       <div className="space-y-4">
                          {steps.slice(0, 3).map((s, idx) => (
                             <div key={idx} className="flex gap-4 group/step">
                                <div className="mt-1 w-6 h-6 rounded-full bg-slate-900 text-white text-[10px] font-black flex items-center justify-center shrink-0 shadow-lg shadow-slate-200">
                                   {idx + 1}
                                </div>
                                <div className="flex-1">
                                   <div className="flex items-center justify-between mb-1">
                                      <span className="text-xs font-black text-slate-800 line-clamp-1 italic">{s.title || `Phase ${idx+1}`}</span>
                                      <ChevronRight className="h-3 w-3 text-slate-300 transition-transform group-hover/step:translate-x-1" />
                                   </div>
                                   <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{s.text || "Instruction details will appear here..."}</p>
                                </div>
                                {s.image && (
                                   <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 shadow-sm border border-slate-100">
                                      <img src={s.image} alt="Step" className="w-full h-full object-cover" />
                                   </div>
                                )}
                             </div>
                          ))}
                          {steps.length > 3 && (
                             <div className="pt-2 text-center">
                                <span className="px-4 py-1.5 bg-slate-100 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest">+{steps.length - 3} More Steps</span>
                             </div>
                          )}
                       </div>
                    </div>
                  </div>
               </div>

               <div className="mt-8 flex items-start gap-3 bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                  <Info className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-indigo-800 font-medium leading-relaxed italic">
                    How-to guides with schema are often rewarded with "how-to" rich cards in Google Search, leading to significantly higher CTR.
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
               <p>Place this code block inside your site's &lt;head&gt; tag.</p>
               {imageMode === "upload" && (
                 <p className="mt-1 text-blue-600">
                    ⚠️ Note: Replace the placeholder image URL in the code with your actual public guide image link.
                 </p>
               )}
            </div>
            
            <div className="bg-[#1e1e1e] p-6 relative group overflow-hidden">
               <div className="absolute top-0 right-0 p-4 border-b border-l border-white/5 bg-white/5 uppercase text-[10px] font-black tracking-widest text-emerald-500/40">
                  howto-schema.json
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
