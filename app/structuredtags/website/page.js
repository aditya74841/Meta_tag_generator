"use client";

import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { 
  Globe, 
  Search, 
  Link as LinkIcon, 
  FileText, 
  Layout, 
  Eye, 
  Code, 
  CheckCircle2, 
  Copy,
  Info,
  ExternalLink
} from "lucide-react";

export default function WebsiteGenerator() {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [searchUrl, setSearchUrl] = useState("");
  const [websiteName, setWebsiteName] = useState("");
  const [websiteDescription, setWebsiteDescription] = useState("");
  const [copied, setCopied] = useState(false);

  const generateJSON = () => {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      ...(websiteName && { name: websiteName }),
      url: websiteUrl,
      ...(websiteDescription && { description: websiteDescription }),
      ...(searchUrl && {
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: searchUrl
          },
          "query-input": "required name=search_term_string",
        }
      }),
    };
  };

  const jsonText = JSON.stringify(generateJSON(), null, 2);
  const snippet = `<script type="application/ld+json">\n${jsonText}\n</script>`;

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isFormValid = websiteUrl.trim() !== "";

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="bg-indigo-600 text-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-lg">
            <Globe className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Website (Sitelinks) Structured Data</h1>
            <p className="text-indigo-100 mt-1 max-w-2xl">
              Enable sitelinks and a search box for your website in Google search results.
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
              {/* Website Details */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <FileText className="h-3 w-3" />
                  Website Details
                </h3>
                
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700">Website URL *</label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="url"
                      placeholder="https://example.com"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700">Website Name</label>
                  <input
                    type="text"
                    placeholder="My Awesome Project"
                    value={websiteName}
                    onChange={(e) => setWebsiteName(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700">Website Description</label>
                  <textarea
                    placeholder="Briefly describe your website..."
                    value={websiteDescription}
                    onChange={(e) => setWebsiteDescription(e.target.value)}
                    rows={3}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  />
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Search Configuration */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Search className="h-3 w-3" />
                  Sitelinks Search Box
                </h3>
                
                <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
                  <div className="flex gap-3">
                    <Info className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-indigo-800">
                      <p className="font-semibold mb-1">How it works:</p>
                      <p>Use your site's search URL with <span className="font-mono bg-indigo-100 px-1 rounded">{"{search_term_string}"}</span> as the placeholder.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700">Search URL Template</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="https://example.com/search?q={search_term_string}"
                      value={searchUrl}
                      onChange={(e) => setSearchUrl(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-mono"
                    />
                  </div>
                  <div className="mt-2 space-y-1 text-xs text-slate-500 pl-1">
                    <p>• WordPress: {"https://mysite.com/?s={search_term_string}"}</p>
                    <p>• Custom: {"https://mysite.com/search?query={search_term_string}"}</p>
                  </div>
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
              <h2 className="font-semibold text-lg uppercase text-white tracking-wide">Search Result Preview</h2>
            </div>
            
            <div className="p-8 space-y-8">
              {/* Google Result Preview */}
              <div className="max-w-lg">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
                    <Globe className="h-3 w-3 text-slate-400" />
                  </div>
                  <div className="text-[14px] text-[#202124] leading-none truncate">
                    {websiteUrl || "https://example.com"}
                  </div>
                </div>
                
                <h3 className="text-xl text-[#1a0dab] hover:underline cursor-pointer font-medium mb-1 truncate">
                  {websiteName || "Your Website Title"}
                </h3>
                
                <p className="text-[14px] text-[#4d5156] line-clamp-2 leading-relaxed mb-4">
                  {websiteDescription || "The descriptive meta snippet that appears below your title in Google search results. This is crucial for CTR."}
                </p>

                {/* Sitelinks Search Box Mock */}
                {searchUrl && (
                  <div className="mt-4 p-4 border border-slate-100 rounded-xl bg-slate-50/50 shadow-sm">
                    <div className="flex items-center gap-3">
                      <Search className="h-4 w-4 text-slate-400" />
                      <div className="flex-1 h-8 bg-white border border-slate-200 rounded px-2 text-[13px] text-slate-400 flex items-center">
                        Search within {websiteName || "this site"}...
                      </div>
                      <button className="h-8 px-4 bg-indigo-600 text-white rounded text-[12px] font-bold">
                        Search
                      </button>
                    </div>
                  </div>
                )}

                {/* Sitelinks Mock */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-4 mt-6 pt-6 border-t border-slate-100">
                  <div className="space-y-1">
                    <div className="text-[#1a0dab] text-sm hover:underline cursor-pointer">About Us</div>
                    <div className="text-xs text-[#4d5156]">Learn more about our mission</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[#1a0dab] text-sm hover:underline cursor-pointer">Contact</div>
                    <div className="text-xs text-[#4d5156]">Get in touch with our team</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[#1a0dab] text-sm hover:underline cursor-pointer">Services</div>
                    <div className="text-xs text-[#4d5156]">Discover what we offer</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[#1a0dab] text-sm hover:underline cursor-pointer">Blog</div>
                    <div className="text-xs text-[#4d5156]">Read our latest updates</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Code Panel */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-emerald-600 text-white px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5 text-white" />
                <h2 className="font-semibold text-lg uppercase text-white tracking-wide">Generated JSON-LD</h2>
              </div>
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
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 text-blue-700 text-xs font-bold flex items-center gap-2 italic uppercase tracking-wider">
               Instruction: Place inside your &lt;head&gt; tag on the homepage.
            </div>

            <div className="bg-[#1e1e1e] p-6 relative">
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
