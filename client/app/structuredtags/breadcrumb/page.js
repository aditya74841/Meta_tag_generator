"use client";

import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  Navigation,
  Home,
  ChevronRight,
  Plus,
  Trash2,
  Copy,
  CheckCircle2,
  Eye,
  Code,
  Link as LinkIcon,
  Layout,
  AlertCircle
} from "lucide-react";

export default function BreadcrumbGenerator() {
  const [items, setItems] = useState([
    { name: "Home", url: "https://example.com" },
    { name: "", url: "" }
  ]);
  const [copied, setCopied] = useState(false);

  const handleInputChange = (index, field, value) => {
    const list = [...items];
    list[index][field] = value;
    setItems(list);
  };

  const handleAddItem = () => {
    setItems([...items, { name: "", url: "" }]);
  };

  const handleRemoveItem = (index) => {
    if (items.length > 1) {
      const list = [...items];
      list.splice(index, 1);
      setItems(list);
    }
  };

  const generateJson = () => {
    const validItems = items.filter(item => item.name.trim() && item.url.trim());
    const jsonData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: validItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    };
    return JSON.stringify(jsonData, null, 2);
  };

  const jsonText = generateJson();
  const snippet = `<script type="application/ld+json">\n${jsonText}\n</script>`;

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const validItemsCount = items.filter(item => item.name.trim() && item.url.trim()).length;

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="bg-indigo-600 text-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-lg">
            <Navigation className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Breadcrumb Structured Data</h1>
            <p className="text-indigo-100 mt-1 max-w-2xl">
              Enhance your website&apos;s search appearance with breadcrumb navigation schema.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Configuration Panel */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden h-fit">
            <div className="bg-slate-800 text-white px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Layout className="h-5 w-5" />
                <h2 className="font-semibold text-lg tracking-wide uppercase">Configuration</h2>
              </div>
              <span className="bg-indigo-500 text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                {validItemsCount} Valid Items
              </span>
            </div>

            <div className="p-6">
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                  <p className="text-sm text-amber-800">
                    Add breadcrumb items in order from the homepage to the current page. The first item is typically &quot;Home&quot;.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border-2 transition-all ${item.name.trim() && item.url.trim()
                        ? "border-emerald-100 bg-emerald-50/30"
                        : "border-slate-100 bg-white"
                      }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-200 text-slate-600 text-[10px] font-bold">
                          {index + 1}
                        </span>
                        <h3 className="font-bold text-slate-800 text-sm">
                          {index === 0 ? "Homepage" : `Level ${index + 1}`}
                        </h3>
                      </div>

                      {items.length > 1 && (
                        <button
                          onClick={() => handleRemoveItem(index)}
                          className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Page Name</label>
                        <div className="relative">
                          {index === 0 ? (
                            <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          ) : (
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 flex items-center justify-center">
                              <span className="text-[10px] font-bold text-slate-300">T</span>
                            </div>
                          )}
                          <input
                            type="text"
                            placeholder={index === 0 ? "Home" : "Page Title"}
                            value={item.name}
                            onChange={(e) => handleInputChange(index, "name", e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Page URL</label>
                        <div className="relative">
                          <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <input
                            type="url"
                            placeholder={index === 0 ? "https://example.com" : "https://example.com/page"}
                            value={item.url}
                            onChange={(e) => handleInputChange(index, "url", e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={handleAddItem}
                  className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 font-semibold hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all"
                >
                  <Plus className="h-5 w-5" />
                  Add Breadcrumb Level
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview and Code Panel */}
        <div className="flex flex-col gap-8 text-white">
          {/* Live Preview */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-amber-500 text-white px-6 py-4 flex items-center gap-2">
              <Eye className="h-5 w-5" />
              <h2 className="font-semibold text-lg uppercase">Live Preview</h2>
            </div>
            <div className="p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Website Appearance</h3>
                  <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
                    <nav className="flex" aria-label="Breadcrumb">
                      <ol className="flex items-center space-x-2 flex-wrap">
                        {items.filter(item => item.name.trim()).map((item, index, filteredArr) => (
                          <li key={index} className="flex items-center">
                            {index !== 0 && <ChevronRight className="h-4 w-4 text-slate-300 mx-1 flex-shrink-0" />}
                            <a
                              href={item.url || "#"}
                              className={`flex items-center text-sm font-medium transition-colors ${index === filteredArr.length - 1
                                  ? "text-indigo-600 font-bold"
                                  : "text-slate-500 hover:text-indigo-500"
                                }`}
                            >
                              {index === 0 && <Home className="h-4 w-4 mr-1.5" />}
                              {item.name || `Item ${index + 1}`}
                            </a>
                          </li>
                        ))}
                      </ol>
                    </nav>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Search Result Preview</h3>
                  <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-md max-w-lg">
                    <h4 className="text-xl font-bold text-indigo-700 leading-tight mb-1">
                      {items[items.length - 1]?.name || "Current Page Title"}
                    </h4>
                    <div className="flex items-center text-[13px] text-emerald-700 mb-2 truncate">
                      {items.filter(item => item.name.trim()).map(item => item.name).join(" › ")}
                    </div>
                    <p className="text-sm text-slate-600 line-clamp-2">
                      Experience seamless navigation with our newly implemented breadcrumb architecture. Improve SEO and user hierarchy today...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Code Panel */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-emerald-600 text-white px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                <h2 className="font-semibold text-lg uppercase">Generated JSON-LD</h2>
              </div>
              <CopyToClipboard text={snippet} onCopy={handleCopy}>
                <button
                  className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition-all text-white shadow-sm"
                  title={copied ? "Copied!" : "Copy to clipboard"}
                >
                  {copied ? <CheckCircle2 className="h-5 w-5 text-emerald-300" /> : <Copy className="h-5 w-5" />}
                </button>
              </CopyToClipboard>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 text-blue-700 text-sm italic font-medium">
              Copy and paste this into the &lt;head&gt; section of your HTML.
            </div>

            <div className="bg-[#1e1e1e] p-6 relative">
              <div className="font-mono text-[13px] leading-relaxed text-[#f8f8f2] whitespace-pre-wrap break-all overflow-x-auto">
                <span className="text-slate-500">&lt;script type=&quot;application/ld+json&quot;&gt;</span>
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
