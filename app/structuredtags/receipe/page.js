"use client";

import React, { useState, useRef } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { 
  Utensils, 
  Clock, 
  Users, 
  Flame, 
  ChefHat, 
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
  Timer,
  BookOpen,
  Wheat,
  ListOrdered
} from "lucide-react";

export default function RecipeGenerator() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [yields, setYields] = useState("");
  const [calories, setCalories] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null); // Base64 for preview
  const [imageMode, setImageMode] = useState("url"); // "url" or "upload"
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);
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

  const addIngredient = () => setIngredients([...ingredients, ""]);
  const updateIngredient = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };
  const removeIngredient = (index) => {
    if (ingredients.length > 1) {
      const newIngredients = [...ingredients];
      newIngredients.splice(index, 1);
      setIngredients(newIngredients);
    }
  };

  const addInstruction = () => setInstructions([...instructions, ""]);
  const updateInstruction = (index, value) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };
  const removeInstruction = (index) => {
    if (instructions.length > 1) {
        const newInstructions = [...instructions];
        newInstructions.splice(index, 1);
        setInstructions(newInstructions);
    }
  };

  const generateJSON = () => {
    return {
      "@context": "https://schema.org/",
      "@type": "Recipe",
      name: name,
      image: imageMode === "upload" ? "https://example.com/photos/1x1/photo.jpg" : (imageUrl || undefined),
      description: description,
      prepTime: prepTime ? `PT${prepTime}M` : undefined,
      cookTime: cookTime ? `PT${cookTime}M` : undefined,
      recipeYield: yields,
      nutrition: {
        "@type": "NutritionInformation",
        calories: calories ? `${calories} calories` : undefined
      },
      recipeIngredient: ingredients.filter(i => i.trim()),
      recipeInstructions: instructions.filter(i => i.trim()).map(i => ({
        "@type": "HowToStep",
        text: i
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
            <Utensils className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Recipe Structured Data</h1>
            <p className="text-indigo-100 mt-1 max-w-2xl font-medium">
              Share your culinary creations. Enable rich results with cook time, calories, and step-by-step instructions.
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
              <h2 className="font-semibold text-lg tracking-wide uppercase">Culinaries Details</h2>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Identity */}
              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-slate-700">Recipe Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Classic Italian Lasagna"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-slate-700">Description</label>
                <textarea
                  placeholder="Tell the story of this dish..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
                />
              </div>

              {/* Timing & Yield */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
                 <div className="space-y-1.5">
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Prep (min)</label>
                    <div className="relative">
                       <Clock className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                       <input type="number" value={prepTime} onChange={(e) => setPrepTime(e.target.value)} className="w-full bg-white border border-slate-300 rounded-lg pl-8 pr-2 py-2 text-xs focus:ring-2 focus:ring-indigo-500 font-bold" />
                    </div>
                 </div>
                 <div className="space-y-1.5">
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Cook (min)</label>
                    <div className="relative">
                       <ChefHat className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                       <input type="number" value={cookTime} onChange={(e) => setCookTime(e.target.value)} className="w-full bg-white border border-slate-300 rounded-lg pl-8 pr-2 py-2 text-xs focus:ring-2 focus:ring-indigo-500 font-bold" />
                    </div>
                 </div>
                 <div className="space-y-1.5">
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Yields</label>
                    <div className="relative">
                       <Users className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                       <input type="text" value={yields} placeholder="4 people" onChange={(e) => setYields(e.target.value)} className="w-full bg-white border border-slate-300 rounded-lg pl-8 pr-2 py-2 text-xs focus:ring-2 focus:ring-indigo-500 font-bold" />
                    </div>
                 </div>
                 <div className="space-y-1.5">
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Calories</label>
                    <div className="relative">
                       <Flame className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                       <input type="number" value={calories} onChange={(e) => setCalories(e.target.value)} className="w-full bg-white border border-slate-300 rounded-lg pl-8 pr-2 py-2 text-xs focus:ring-2 focus:ring-indigo-500 font-bold" />
                    </div>
                 </div>
              </div>

              {/* Image upload */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-bold text-slate-700">Display Image</label>
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
                      placeholder="https://example.com/lasagna.jpg"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-3 py-2.5 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                      <div className="bg-slate-50 p-2.5 rounded-full mb-1 group-hover:bg-indigo-100 transition-colors shadow-sm">
                        <Upload className="h-5 w-5 text-slate-300 group-hover:text-indigo-600" />
                      </div>
                      <span className="text-[11px] font-black text-slate-500 group-hover:text-indigo-700 uppercase tracking-widest">Swap Picture</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Ingredients List */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                 <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                       <Wheat className="h-3 w-3" />
                       Ingredients
                    </h3>
                    <button onClick={addIngredient} className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100 hover:bg-indigo-100 transition-all">
                       Add Item
                    </button>
                 </div>
                 <div className="space-y-2">
                    {ingredients.map((ing, idx) => (
                      <div key={idx} className="flex gap-2">
                         <input
                           type="text"
                           placeholder="e.g. 500g Ground Beef"
                           value={ing}
                           onChange={(e) => updateIngredient(idx, e.target.value)}
                           className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500 font-medium"
                         />
                         <button onClick={() => removeIngredient(idx)} className="p-2 text-slate-300 hover:text-rose-500 transition-colors">
                            <Trash2 className="h-4 w-4" />
                         </button>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Instructions Steps */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                 <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                       <ListOrdered className="h-3 w-3" />
                       Instructions
                    </h3>
                    <button onClick={addInstruction} className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100 hover:bg-indigo-100 transition-all">
                       Add Step
                    </button>
                 </div>
                 <div className="space-y-3">
                    {instructions.map((step, idx) => (
                      <div key={idx} className="flex gap-3 items-start group">
                         <div className="mt-1 w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0 text-[10px] font-black group-hover:bg-indigo-600 group-hover:text-white transition-all">
                            {idx + 1}
                         </div>
                         <textarea
                           placeholder="Describe the process..."
                           value={step}
                           onChange={(e) => updateInstruction(idx, e.target.value)}
                           rows={1}
                           className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500 font-medium resize-none"
                         />
                         <button onClick={() => removeInstruction(idx)} className="p-2 text-slate-300 hover:text-rose-500 transition-colors shrink-0">
                            <Trash2 className="h-4 w-4" />
                         </button>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Previews */}
        <div className="space-y-8">
          {/* Card Preview */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-amber-500 text-white px-6 py-4 flex items-center gap-2">
              <Eye className="h-5 w-5" />
              <h2 className="font-semibold text-lg uppercase tracking-wide px-1">Culinary Preview</h2>
            </div>
            
            <div className="p-8 pb-12">
               <div className="max-w-md mx-auto bg-white rounded-3xl border border-slate-100 shadow-2xl overflow-hidden group">
                  <div className="relative h-56 bg-slate-50 overflow-hidden">
                    {imageMode === "url" ? (
                      imageUrl ? (
                        <img src={imageUrl} alt="Dish" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center grayscale opacity-10">
                           <ChefHat className="h-24 w-24" />
                        </div>
                      )
                    ) : (
                      uploadedImage ? (
                        <img src={uploadedImage} alt="Dish" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center grayscale opacity-10">
                           <Upload className="h-24 w-24" />
                        </div>
                      )
                    )}
                    <div className="absolute top-4 right-4 flex gap-2">
                       <span className="bg-white/90 backdrop-blur text-[10px] font-black px-2.5 py-1 rounded-full text-amber-600 shadow-sm flex items-center gap-1 uppercase tracking-tighter">
                          <Star className="h-3 w-3 fill-current" /> 5.0
                       </span>
                    </div>
                  </div>

                  <div className="p-8">
                     <h3 className="text-2xl font-black text-slate-900 leading-tight mb-3 italic">{name || "Italian Lasagna Magnifico"}</h3>
                     <p className="text-[13px] text-slate-500 mb-8 leading-relaxed line-clamp-2">
                       {description || "A layered masterpiece of tender pasta, savory meat sauce, and creamy béchamel..."}
                     </p>

                     <div className="flex gap-6 mb-8 py-4 border-y border-slate-50">
                        <div className="flex flex-col items-center">
                           <span className="text-[10px] font-black text-slate-300 uppercase">Prep</span>
                           <span className="text-sm font-black text-indigo-600">{prepTime || "0"}m</span>
                        </div>
                        <div className="flex flex-col items-center pl-6 border-l border-slate-100">
                           <span className="text-[10px] font-black text-slate-300 uppercase">Cook</span>
                           <span className="text-sm font-black text-indigo-600">{cookTime || "0"}m</span>
                        </div>
                        <div className="flex flex-col items-center pl-6 border-l border-slate-100">
                           <span className="text-[10px] font-black text-slate-300 uppercase">Yields</span>
                           <span className="text-sm font-black text-indigo-600">{yields || "2"}</span>
                        </div>
                        <div className="flex flex-col items-center pl-6 border-l border-slate-100">
                           <span className="text-[10px] font-black text-slate-300 uppercase">Kcal</span>
                           <span className="text-sm font-black text-rose-500">{calories || "0"}</span>
                        </div>
                     </div>

                     <div className="space-y-6">
                        <div>
                           <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-3">
                              <BookOpen className="h-3 w-3" /> 
                              Method Sneak-Peek
                           </h4>
                           <div className="space-y-2">
                             {instructions.slice(0, 2).map((s, idx) => (
                               <div key={idx} className="flex gap-2 text-xs font-bold text-slate-700 items-start">
                                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                                  <span className="italic">{s || `Instruction step ${idx + 1}`}</span>
                               </div>
                             ))}
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="mt-8 flex items-start gap-3 bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                  <AlertCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-emerald-800 font-medium leading-relaxed italic">
                    Recipes with rich schema are eligible to appear in the Google Carousel, Voice-Search, and smart displays (like Nest Hub).
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
                    ⚠️ Note: Replace the placeholder image URL in the code with your actual public recipe image link.
                 </p>
               )}
            </div>
            
            <div className="bg-[#1e1e1e] p-6 relative group overflow-hidden">
               <div className="absolute top-0 right-0 p-4 border-b border-l border-white/5 bg-white/5 uppercase text-[10px] font-black tracking-widest text-[#f8f8f2]/20">
                  recipe-schema.ld
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
