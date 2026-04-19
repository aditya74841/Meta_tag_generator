"use client";

import React, { useState, useRef } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { 
  FileText, 
  Image as ImageIcon, 
  Calendar, 
  User, 
  Building, 
  Link as LinkIcon, 
  Copy, 
  CheckCircle2, 
  Eye, 
  Layout,
  Type,
  Upload,
  Link2
} from "lucide-react";
// import AdBanner from "../../components/AdBanner";

export default function ArticleStructuredData() {
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    let month = d.getMonth() + 1;
    if (month < 10) month = `0${month}`;
    let day = d.getDate();
    if (day < 10) day = `0${day}`;
    return `${year}-${month}-${day}`;
  };

  const [type, setType] = useState("Article");
  const [url, setUrl] = useState("");
  const [headline, setHeadline] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null); // Base64 for preview
  const [imageMode, setImageMode] = useState("url"); // "url" or "upload"
  const [datePublished, setDatePublished] = useState(formatDate(Date.now()));
  const [dateModified, setDateModified] = useState(formatDate(Date.now()));
  const [authorType, setAuthorType] = useState("Person");
  const [publisherName, setPublisherName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [authorName, setAuthorName] = useState("");
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

  const jsonData = {
    "@context": "https://schema.org",
    "@type": type,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    author: {
      "@type": authorType,
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: publisherName,
      logo: {
        "@type": "ImageObject",
        url: logoUrl,
      },
    },
    headline: headline,
    image: imageMode === "upload" ? "https://example.com/photos/1x1/photo.jpg" : imageUrl,
    datePublished: datePublished,
    dateModified: dateModified,
  };

  const jsonText = JSON.stringify(jsonData, null, 2);
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
            <FileText className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Article Structured Data</h1>
            <p className="text-indigo-100 mt-1 max-w-2xl">
              Generate Schema.org JSON-LD for Articles, Blog Postings, and News Articles.
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700">Content Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                  >
                    <option value="Article">Article</option>
                    <option value="BlogPosting">Blog Posting</option>
                    <option value="NewsArticle">News Article</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700">Article URL</label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="url"
                      placeholder="https://example.com/article"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700">Headline</label>
                <div className="relative">
                  <Type className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Enter article headline"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  />
                </div>
                <p className="text-[11px] text-slate-500 uppercase tracking-tighter">Recommended: 30-60 Characters</p>
              </div>

              {/* Image Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-slate-700">Featured Image</label>
                  <div className="flex bg-slate-100 rounded-lg p-1">
                    <button
                      onClick={() => setImageMode("url")}
                      className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-all ${imageMode === "url" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                    >
                      <Link2 className="h-3.5 w-3.5" />
                      URL
                    </button>
                    <button
                      onClick={() => setImageMode("upload")}
                      className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-all ${imageMode === "upload" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
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
                      className="w-full bg-white border border-slate-300 rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
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
                      <span className="text-sm font-medium text-slate-600 group-hover:text-indigo-700">Click to upload image</span>
                      <span className="text-xs text-slate-400 mt-1">PNG, JPG, WebP up to 5MB</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700">Date Published</label>
                  <input
                    type="date"
                    value={datePublished}
                    onChange={(e) => setDatePublished(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700">Date Modified</label>
                  <input
                    type="date"
                    value={dateModified}
                    onChange={(e) => setDateModified(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Author Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-slate-700">Author Type</label>
                    <div className="relative">
                      {authorType === "Person" ? <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" /> : <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />}
                      <select
                        value={authorType}
                        onChange={(e) => setAuthorType(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                      >
                        <option value="Person">Person</option>
                        <option value="Organization">Organization</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-slate-700">Author Name</label>
                    <input
                      type="text"
                      placeholder={authorType === "Person" ? "Jane Doe" : "Author Org Name"}
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Publisher Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-slate-700">Publisher Name</label>
                    <input
                      type="text"
                      placeholder="My Website Name"
                      value={publisherName}
                      onChange={(e) => setPublisherName(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-slate-700">Logo URL</label>
                    <input
                      type="url"
                      placeholder="https://example.com/logo.png"
                      value={logoUrl}
                      onChange={(e) => setLogoUrl(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* <AdBanner slot="article-structured-bottom-config" className="max-w-xl mx-auto" /> */}
        </div>

        {/* Preview and Code Panel */}
        <div className="flex flex-col gap-8">
          {/* <AdBanner slot="article-structured-top-preview" /> */}

          {/* Social Preview - NOW ON TOP */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden order-first">
            <div className="bg-amber-500 text-white px-6 py-4 flex items-center gap-2">
              <Eye className="h-5 w-5" />
              <h2 className="font-semibold text-lg uppercase text-white">Live Preview</h2>
            </div>
            <div className="p-6">
              <div className="border border-slate-100 rounded-xl overflow-hidden bg-white shadow-md">
                {imageMode === "url" ? (
                  imageUrl ? (
                    <img src={imageUrl} alt="Article" className="w-full h-56 object-cover" />
                  ) : (
                    <div className="w-full h-56 bg-slate-50 flex items-center justify-center border-b border-slate-100 italic text-slate-400">
                      <div className="flex flex-col items-center gap-2">
                        <ImageIcon className="h-12 w-12 text-slate-200" />
                        <span>Preview Image will appear here</span>
                      </div>
                    </div>
                  )
                ) : (
                  uploadedImage ? (
                    <img src={uploadedImage} alt="Article" className="w-full h-56 object-cover" />
                  ) : (
                    <div className="w-full h-56 bg-slate-50 flex items-center justify-center border-b border-slate-100 italic text-slate-400">
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="h-12 w-12 text-slate-200" />
                        <span>Uploaded image for preview</span>
                      </div>
                    </div>
                  )
                )}
                <div className="p-5 space-y-4">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold bg-indigo-100 text-indigo-700">
                    {type}
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900 leading-tight">
                    {headline || "Engaging Article Headline Preview"}
                  </h3>
                  <div className="flex items-center gap-3 pt-2">
                    <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
                      {logoUrl ? <img src={logoUrl} alt="Logo" className="w-full h-full object-contain" /> : <Building className="h-5 w-5 text-slate-400" />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{publisherName || "Site Publisher"}</p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest leading-none mt-1">{datePublished}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Code Panel - NOW ON BOTTOM */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-emerald-600 text-white px-6 py-4 flex justify-between items-center">
              <h2 className="font-semibold text-lg uppercase text-white">Generated JSON-LD</h2>
              <CopyToClipboard text={snippet} onCopy={handleCopy}>
                <button 
                  type="button"
                  className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition-all text-white shadow-sm"
                  title={copied ? "Copied!" : "Copy to clipboard"}
                >
                  {copied ? <CheckCircle2 className="h-5 w-5 text-emerald-300" /> : <Copy className="h-5 w-5" />}
                </button>
              </CopyToClipboard>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 text-blue-700 text-sm">
              <p className="font-medium italic">Place this code block inside your site's &lt;head&gt; tag.</p>
              {imageMode === "upload" && (
                <p className="mt-1 text-xs font-bold text-blue-600">
                  ⚠️ Note: Replace the placeholder image URL in the code with your actual public image link.
                </p>
              )}
            </div>

            <div className="bg-[#1e1e1e] p-6 relative group">
              <div className="font-mono text-[13px] leading-relaxed text-[#f8f8f2] whitespace-pre-wrap break-all overflow-x-auto selection:bg-indigo-500/30">
                <span className="text-slate-500">&lt;script type="application/ld+json"&gt;</span>
                <div className="pl-4 py-2 border-l border-emerald-500/30 mt-1 mb-1">
                  {jsonText}
                </div>
                <span className="text-slate-500">&lt;/script&gt;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
