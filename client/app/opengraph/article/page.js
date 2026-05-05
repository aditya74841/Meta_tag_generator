"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { timezones } from "@/app/constant";
import { 
  Share2, 
  Image as ImageIcon, 
  User, 
  Globe,
  Link as LinkIcon, 
  Copy, 
  CheckCircle2, 
  Eye, 
  Layout,
  Type,
  Upload,
  Link2,
  AlignLeft,
  Clock,
  Hash,
  CalendarDays
} from "lucide-react";

export default function ArticleOpenGraph() {
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    let month = d.getMonth() + 1;
    if (month < 10) month = `0${month}`;
    let day = d.getDate();
    if (day < 10) day = `0${day}`;
    return `${year}-${month}-${day}`;
  };

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageMode, setImageMode] = useState("url"); // "url" or "upload"
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [timeZone, setTimeZone] = useState("UTC");
  const [datePublished, setDatePublished] = useState("");
  const [dateModified, setDateModified] = useState("");
  const [section, setSection] = useState("");
  const [tags, setTags] = useState("");
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

  const getHostname = (urlStr) => {
    if (!urlStr) return "example.com";
    try {
      return new URL(urlStr).hostname.replace("www.", "");
    } catch (error) {
      return "example.com";
    }
  };

  const generateMetaTags = () => {
    const metaTags = [];

    metaTags.push('<meta property="og:type" content="article" />');
    if (title) metaTags.push(`<meta property="og:title" content="${title}" />`);
    if (url) metaTags.push(`<meta property="og:url" content="${url}" />`);
    
    const finalImage = imageMode === "upload" ? "https://example.com/uploaded-image.jpg" : imageUrl;
    if (finalImage) metaTags.push(`<meta property="og:image" content="${finalImage}" />`);
    
    if (description) metaTags.push(`<meta property="og:description" content="${description}" />`);
    if (author) metaTags.push(`<meta property="article:author" content="${author}" />`);
    if (datePublished) {
      metaTags.push(`<meta property="article:published_time" content="${datePublished}${timeZone !== "UTC" ? "" : "Z"}" />`);
    }
    if (dateModified) {
      metaTags.push(`<meta property="article:modified_time" content="${dateModified}${timeZone !== "UTC" ? "" : "Z"}" />`);
    }
    if (section) metaTags.push(`<meta property="article:section" content="${section}" />`);
    
    if (tags) {
      const tagsArray = tags.split(',').map(t => t.trim()).filter(t => t);
      tagsArray.forEach(tag => {
        metaTags.push(`<meta property="article:tag" content="${tag}" />`);
      });
    }

    return metaTags.join('\n');
  };

  const metaTagsText = generateMetaTags();

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
            <Share2 className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Article Open Graph</h1>
            <p className="text-blue-100 mt-1 max-w-2xl">
              Create essential Open Graph meta tags to make your articles and blogs stand out on social media platforms.
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
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700">Article Title</label>
                <div className="relative">
                  <Type className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="E.g. How to Build a Modern Web Application"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                  />
                </div>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-[11px] text-slate-500 uppercase tracking-tighter">Recommended: 40-60 Characters</p>
                  <span className={`text-[11px] font-bold ${title.length > 60 ? 'text-amber-500' : 'text-slate-400'}`}>
                    {title.length}/60
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700">Article URL</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="url"
                    placeholder="https://example.com/my-article"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* Image Section */}
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
                      placeholder="https://example.com/featured-image.jpg"
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
                      <span className="text-xs text-slate-400 mt-1">Recommended size: 1200x627 pixels</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700">Description</label>
                <div className="relative">
                  <AlignLeft className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <textarea
                    placeholder="A comprehensive guide on building modern web applications..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full bg-white border border-slate-300 rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-y"
                  />
                </div>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-[11px] text-slate-500 uppercase tracking-tighter">Recommended: ~150 Characters</p>
                  <span className={`text-[11px] font-bold ${description.length > 200 ? 'text-amber-500' : 'text-slate-400'}`}>
                    {description.length}/150
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Metadata Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-slate-700">Author</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-slate-700">Section</label>
                    <div className="relative">
                      <Layout className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Technology"
                        value={section}
                        onChange={(e) => setSection(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700">Tags (Comma separated)</label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="web development, react, tutorial"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Timestamps</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-slate-700">Published Date</label>
                    <div className="relative">
                      <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="datetime-local"
                        value={datePublished}
                        onChange={(e) => setDatePublished(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-slate-700">Modified Date</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="datetime-local"
                        value={dateModified}
                        onChange={(e) => setDateModified(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700">Timezone</label>
                  <select
                    value={timeZone}
                    onChange={(e) => setTimeZone(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  >
                    {timezones?.map((tz) => (
                      <option key={tz.value} value={tz.value}>{tz.label}</option>
                    )) || <option value="UTC">UTC</option>}
                  </select>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Preview and Code Panel */}
        <div className="flex flex-col gap-8">
          
          {/* Social Preview - NOW ON TOP */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden order-first">
            <div className="bg-[#1877F2] text-white px-6 py-4 flex items-center gap-2">
              <Eye className="h-5 w-5" />
              <h2 className="font-semibold text-lg uppercase text-white">Facebook / LinkedIn Preview</h2>
            </div>
            {/* Flush content layout without inner padded borders */}
            <div className="w-full bg-white flex flex-col">
                {/* Image Area */}
                {imageMode === "url" ? (
                  imageUrl ? (
                    <Image width={800} height={400} unoptimized src={imageUrl} alt="Article Preview" className="w-full aspect-[1.91/1] object-cover border-b border-slate-100" />
                  ) : (
                    <div className="w-full aspect-[1.91/1] bg-slate-100 flex items-center justify-center border-b border-slate-200 text-slate-400">
                      <div className="flex flex-col items-center gap-2">
                        <ImageIcon className="h-10 w-10 text-slate-300" />
                        <span className="text-sm font-medium">1200 x 627 recommended</span>
                      </div>
                    </div>
                  )
                ) : (
                  uploadedImage ? (
                    <Image width={800} height={400} unoptimized src={uploadedImage} alt="Article Preview" className="w-full aspect-[1.91/1] object-cover border-b border-slate-100" />
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
                <div className="p-4 sm:p-5 flex flex-col gap-1.5 bg-[#F2F3F5]">
                  <span className="text-[12px] uppercase text-slate-500 font-semibold tracking-wide truncate">
                    {getHostname(url)}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-[#1d2129] leading-tight line-clamp-2">
                    {title || "Website Title"}
                  </h3>
                  <p className="text-sm text-[#606770] leading-snug line-clamp-1">
                    {description || "A compelling description of your article that encourages users to click."}
                  </p>
                </div>
            </div>
          </div>

          {/* Code Panel - NOW ON BOTTOM */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-800 text-white px-6 py-4 flex justify-between items-center">
              <h2 className="font-semibold text-lg uppercase text-white flex items-center gap-2">
                <Layout className="h-5 w-5" />
                Generated Meta Tags
              </h2>
              <CopyToClipboard text={metaTagsText} onCopy={handleCopy}>
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
              <p className="font-medium italic">Place this code block inside your HTML document&apos;s &lt;head&gt; tag.</p>
              {imageMode === "upload" && (
                <p className="mt-1 text-xs font-bold text-blue-600">
                  ⚠️ Note: An uploaded image cannot be embedded directly in meta tags. Ensure you upload your image to a public server and provide the URL.
                </p>
              )}
            </div>

            <div className="bg-[#1e1e1e] p-6 relative group overflow-hidden">
              <div className="font-mono text-[13px] leading-loose text-[#f8f8f2] whitespace-pre-wrap break-all overflow-x-auto selection:bg-blue-500/30">
                {metaTagsText.split('\n').map((line, i) => {
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
