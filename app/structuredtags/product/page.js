"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { 
  ShoppingBag, 
  Tag, 
  Star, 
  ShieldCheck, 
  DollarSign, 
  Globe, 
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
  Package,
  ArrowRight,
  Sparkles,
  MessageCircle,
  Info
} from "lucide-react";

export default function ProductGenerator() {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [availability, setAvailability] = useState("InStock");
  const [condition, setCondition] = useState("NewCondition");
  const [rating, setRating] = useState("4.5");
  const [reviewCount, setReviewCount] = useState("128");
  const [imageUrl, setImageUrl] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null); // Base64 for preview
  const [imageMode, setImageMode] = useState("url"); // "url" or "upload"
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
      "@context": "https://schema.org/",
      "@type": "Product",
      name: name,
      image: imageMode === "upload" ? "https://example.com/photos/1x1/photo.jpg" : (imageUrl || undefined),
      description: description,
      sku: sku,
      brand: {
        "@type": "Brand",
        name: brand
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: rating,
        reviewCount: reviewCount
      },
      offers: {
        "@type": "Offer",
        url: "#",
        priceCurrency: currency,
        price: price,
        itemCondition: `https://schema.org/${condition}`,
        availability: `https://schema.org/${availability}`
      }
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
            <ShoppingBag className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Product Structured Data</h1>
            <p className="text-indigo-100 mt-1 max-w-2xl font-medium">
              Maximize sales with rich snippets. Show price, availability, and review ratings directly in search results.
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
              <h2 className="font-semibold text-lg tracking-wide uppercase">Product Meta</h2>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Identity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-bold text-slate-700">Product Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Aura Pro Headphones"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-bold text-slate-700">Brand Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Sonic Labs"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5 pt-4 border-t border-slate-100">
                <label className="block text-sm font-bold text-slate-700">Short Description</label>
                <textarea
                  placeholder="Key features and selling points..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
                />
              </div>

              {/* Offer Info */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
                 <div className="col-span-1 space-y-1.5">
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Currency</label>
                    <input type="text" value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full bg-white border border-slate-300 rounded-lg px-2 py-2 text-xs focus:ring-2 focus:ring-indigo-500 font-bold text-center" />
                 </div>
                 <div className="col-span-1 space-y-1.5">
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Price</label>
                    <div className="relative">
                       <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-400" />
                       <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full bg-white border border-slate-300 rounded-lg pl-6 pr-2 py-2 text-xs focus:ring-2 focus:ring-indigo-500 font-bold" />
                    </div>
                 </div>
                 <div className="col-span-2 space-y-1.5">
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest pl-1">SKU / Identifier</label>
                    <input type="text" value={sku} onChange={(e) => setSku(e.target.value)} className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500 font-mono" placeholder="ABC-123-XYZ" />
                 </div>
              </div>

              {/* Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-white">
                <div className="space-y-1.5">
                  <label className="block text-sm font-bold text-slate-700">Availability</label>
                  <select
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="w-full bg-white border border-slate-200 text-slate-700 rounded-lg px-3 py-2.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="InStock">In Stock</option>
                    <option value="OutOfStock">Out of Stock</option>
                    <option value="PreOrder">Pre-order</option>
                    <option value="SoldOut">Sold Out</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-bold text-slate-700">Item Condition</label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="w-full bg-white border border-slate-200 text-slate-700 rounded-lg px-3 py-2.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="NewCondition">New</option>
                    <option value="UsedCondition">Used</option>
                    <option value="RefurbishedCondition">Refurbished</option>
                  </select>
                </div>
              </div>

              {/* Rating */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div className="space-y-1.5">
                   <label className="block text-sm font-bold text-slate-700 flex items-center gap-2">
                     Rating Value
                     <span className="text-[10px] font-black bg-amber-100 text-amber-700 px-1.5 rounded uppercase tracking-tighter">0-5</span>
                   </label>
                   <div className="relative">
                      <Star className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-amber-400 fill-current" />
                      <input type="number" step="0.1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} className="w-full border border-slate-300 rounded-lg pl-9 pr-3 py-2.5 text-xs font-bold focus:ring-2 focus:ring-indigo-500" />
                   </div>
                </div>
                <div className="space-y-1.5">
                   <label className="block text-sm font-bold text-slate-700">Total Reviews</label>
                   <div className="relative">
                      <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input type="number" value={reviewCount} onChange={(e) => setReviewCount(e.target.value)} className="w-full border border-slate-300 rounded-lg pl-10 pr-3 py-2.5 text-xs font-bold focus:ring-2 focus:ring-indigo-500" />
                   </div>
                </div>
              </div>

              {/* Image upload */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-bold text-slate-700">Product Image</label>
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
                      placeholder="https://example.com/product.jpg"
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
                      <span className="text-[11px] font-black text-slate-400 group-hover:text-indigo-700 uppercase tracking-widest">
                        {uploadedImage ? "Change Image" : "Upload Image"}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Previews */}
        <div className="space-y-8">
          {/* Shopping Result Preview */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-amber-500 text-white px-6 py-4 flex items-center gap-2">
              <Eye className="h-5 w-5" />
              <h2 className="font-semibold text-lg uppercase tracking-wide px-1">Search Appearance</h2>
            </div>
            
            <div className="p-8 pb-12">
               <div className="max-w-sm mx-auto bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden group">
                  <div className="relative h-64 bg-slate-50 border-b border-slate-100 overflow-hidden">
                    {imageMode === "url" ? (
                      imageUrl ? (
                        <Image width={800} height={400} unoptimized src={imageUrl} alt="Product" className="h-full w-full object-contain p-8 group-hover:scale-110 transition-transform duration-700" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center grayscale opacity-10">
                           <Package className="h-24 w-24" />
                        </div>
                      )
                    ) : (
                      uploadedImage ? (
                        <Image width={800} height={400} unoptimized src={uploadedImage} alt="Product" className="h-full w-full object-contain p-8 group-hover:scale-110 transition-transform duration-700" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center grayscale opacity-10">
                           <Upload className="h-24 w-24" />
                        </div>
                      )
                    )}
                    <div className="absolute top-4 right-4">
                       <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg ${availability === "InStock" ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"}`}>
                          {availability === "InStock" ? "Available" : "Stock Alert"}
                       </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                       <span className="text-[11px] font-black text-indigo-600 uppercase tracking-widest">{brand || "Sonic Labs"}</span>
                       <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-amber-500 fill-current" />
                          <span className="text-xs font-black text-slate-900">{rating}</span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase">({reviewCount})</span>
                       </div>
                    </div>

                    <h3 className="text-xl font-black text-slate-900 leading-tight mb-2 line-clamp-2">{name || "Aura Pro High-Fidelity Headphones"}</h3>
                    <p className="text-[13px] text-slate-500 mb-6 leading-relaxed italic">{description || "Professional grade noise cancelling wireless headset for studio and travel..."}</p>

                    <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                       <div className="flex flex-col">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Current Price</span>
                          <span className="text-2xl font-black text-slate-900 tracking-tighter">
                            {currency} {price || "0.00"}
                          </span>
                       </div>
                       <button className="bg-slate-900 text-white p-3 rounded-2xl hover:bg-indigo-600 transition-all shadow-xl shadow-slate-100 group-hover:shadow-indigo-100">
                          <ArrowRight className="h-5 w-5" />
                       </button>
                    </div>
                  </div>
               </div>

               <div className="mt-8 flex items-start gap-3 bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                  <Sparkles className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-indigo-800 font-medium leading-relaxed italic">
                    Rich snippets like price and stars can increase click-through rates by up to <strong>30%</strong>. Google prioritizes pages with merchant-correct schema.
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
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 text-blue-700 text-[11px] font-black uppercase tracking-tight italic">
               <p>Place this code block inside your site&apos;s &lt;head&gt; tag.</p>
               {imageMode === "upload" && (
                 <p className="mt-1 text-blue-600">
                    ⚠️ Note: Replace the placeholder image URL in the code with your actual public product image link.
                 </p>
               )}
            </div>
            
            <div className="bg-[#1e1e1e] p-6 relative group overflow-hidden">
               <div className="absolute top-0 right-0 p-4 border-b border-l border-white/5 bg-white/5 uppercase text-[10px] font-black tracking-widest text-emerald-500/40">
                  product-schema.json
               </div>
              <div className="font-mono text-[13px] leading-relaxed text-[#f8f8f2] whitespace-pre-wrap break-all overflow-x-auto selection:bg-indigo-500/40 pt-4">
                <span className="text-indigo-400 font-bold tracking-tight">&lt;script type=&quot;application/ld+json&quot;&gt;</span>
                <div className="pl-4 py-2 border-l border-emerald-500/30 mt-1 mb-1 font-medium">
                  {jsonText}
                </div>
                <span className="text-indigo-400 font-bold tracking-tight">&lt;/script&gt;</span>
              </div>
            </div>
            
            <div className="bg-amber-500 px-6 py-2.5 flex items-center gap-2 text-[10px] font-black uppercase text-amber-950">
               <Info className="h-3.5 w-3.5" />
               Recommendation: Use GTIN or SKU for better product recognition.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
