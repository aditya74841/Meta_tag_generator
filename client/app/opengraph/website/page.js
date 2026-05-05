"use client";

import React, { useState, useRef } from "react";
import OpenGraphLayout from "../../components/OpenGraphLayout";
import { 
  Globe, 
  Type, 
  Link as LinkIcon, 
  Image as ImageIcon,
  AlignLeft,
  Upload,
  Link2
} from "lucide-react";

export default function WebsiteOpenGraph() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageMode, setImageMode] = useState("url");
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

  const generateMetaTags = () => {
    const metaTags = [];
    metaTags.push('<meta property="og:type" content="website" />');
    if (title) metaTags.push(`<meta property="og:title" content="${title}" />`);
    if (url) metaTags.push(`<meta property="og:url" content="${url}" />`);
    
    const finalImage = imageMode === "upload" ? "https://example.com/uploaded-image.jpg" : imageUrl;
    if (finalImage) metaTags.push(`<meta property="og:image" content="${finalImage}" />`);
    
    if (description) metaTags.push(`<meta property="og:description" content="${description}" />`);
    return metaTags.join('\\n');
  };

  const previewData = {
    title,
    url,
    imageUrl,
    description,
    imageMode,
    uploadedImage
  };

  return (
    <OpenGraphLayout
      title="Website Open Graph"
      description="Generate standard Open Graph meta tags to make your website link unfurl beautifully on all platforms."
      icon={Globe}
      type="website"
      metaTagsText={generateMetaTags()}
      previewData={previewData}
    >
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-slate-700">Website Title</label>
        <div className="relative">
          <Type className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="E.g. Acme Corporation"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-slate-700">Website URL</label>
        <div className="relative">
          <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-slate-700">Featured Image</label>
          <div className="flex bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => setImageMode("url")}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-all ${imageMode === "url" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              <Link2 className="h-3.5 w-3.5" />
              URL
            </button>
            <button
              onClick={() => setImageMode("upload")}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-all ${imageMode === "upload" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              <Upload className="h-3.5 w-3.5" />
              Upload
            </button>
          </div>
        </div>
        
        {imageMode === "url" ? (
          <div className="relative">
            <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        ) : (
          <div 
            onClick={() => fileInputRef.current.click()}
            className="group border-2 border-dashed border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all rounded-xl p-6 text-center cursor-pointer"
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              className="hidden" 
              accept="image/*"
            />
            <div className="flex flex-col items-center">
              <div className="bg-slate-50 group-hover:bg-blue-100 p-2 rounded-full transition-colors mb-2">
                <Upload className="h-6 w-6 text-slate-400 group-hover:text-blue-600" />
              </div>
              <span className="text-sm font-medium text-slate-600 group-hover:text-blue-700">Click to upload preview image</span>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-slate-700">Description</label>
        <div className="relative">
          <AlignLeft className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <textarea
            placeholder="A short description of your website..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full bg-white border border-slate-300 rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-y"
          />
        </div>
      </div>

    </OpenGraphLayout>
  );
}
