"use client";

import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  HelpCircle,
  Plus,
  Trash2,
  ChevronDown,
  Code,
  Eye,
  CheckCircle2,
  Copy,
  Layout,
  MessageSquare,
  AlertCircle
} from "lucide-react";

export default function FAQGenerator() {
  const [items, setItems] = useState([{ question: "", answer: "" }]);
  const [copied, setCopied] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(0);

  const handleInputChange = (index, field, value) => {
    const list = [...items];
    list[index][field] = value;
    setItems(list);
  };

  const handleAddItem = () => {
    setItems([...items, { question: "", answer: "" }]);
    setActiveAccordion(items.length);
  };

  const handleRemoveItem = (index) => {
    if (items.length > 1) {
      const list = [...items];
      list.splice(index, 1);
      setItems(list);
      if (activeAccordion >= list.length) {
        setActiveAccordion(list.length - 1);
      }
    }
  };

  const generateJSON = () => {
    const validItems = items.filter(item => item.question.trim() && item.answer.trim());
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: validItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    };
  };

  const jsonText = JSON.stringify(generateJSON(), null, 2);
  const snippet = `<script type="application/ld+json">\n${jsonText}\n</script>`;

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const validItemsCount = items.filter(item => item.question.trim() && item.answer.trim()).length;

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="bg-indigo-600 text-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-lg">
            <HelpCircle className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">FAQ Structured Data</h1>
            <p className="text-indigo-100 mt-1 max-w-2xl">
              Maximize your SERP real estate by adding interactive FAQ rich snippets to your search results.
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
                <h2 className="font-semibold text-lg tracking-wide uppercase">Questions & Answers</h2>
              </div>
              <span className="bg-amber-500 text-[10px] font-black px-2.5 py-1 rounded-full uppercase">
                {validItemsCount} Active FAQ
              </span>
            </div>

            <div className="p-6">
              <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 mb-6 flex gap-3">
                <AlertCircle className="h-5 w-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-indigo-800 leading-relaxed">
                  Provide concise questions and comprehensive answers. Google recommends at least 3 FAQ items for the best chance of appearing in search results.
                </p>
              </div>

              <div className="space-y-4">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className={`rounded-xl border-2 transition-all ${item.question.trim() && item.answer.trim()
                      ? "border-emerald-100 bg-emerald-50/20"
                      : "border-slate-100 bg-white"
                      }`}
                  >
                    <div className="p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center text-[10px] font-bold">
                            {index + 1}
                          </div>
                          <h3 className="font-bold text-slate-700 text-sm italic uppercase tracking-tighter">FAQ Item</h3>
                        </div>
                        {items.length > 1 && (
                          <button
                            onClick={() => handleRemoveItem(index)}
                            className="p-1 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded transition-all"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Question</label>
                          <input
                            type="text"
                            placeholder="e.g. What is your return policy?"
                            value={item.question}
                            onChange={(e) => handleInputChange(index, "question", e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-semibold text-slate-800"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Answer</label>
                          <textarea
                            placeholder="Provide a detailed and helpful answer..."
                            value={item.answer}
                            onChange={(e) => handleInputChange(index, "answer", e.target.value)}
                            rows={3}
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all leading-relaxed"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={handleAddItem}
                  className="w-full py-4 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center gap-2 text-slate-400 font-bold hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                >
                  <Plus className="h-5 w-5" />
                  Add Another Question
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview and Code Panel */}
        <div className="space-y-8 text-white">
          {/* Live Preview */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-amber-500 text-white px-6 py-4 flex items-center gap-2">
              <Eye className="h-5 w-5" />
              <h2 className="font-semibold text-lg uppercase tracking-wide px-1">Live Accordion Preview</h2>
            </div>

            <div className="p-8">
              <div className="space-y-4 max-w-lg mx-auto">
                {items.filter(item => item.question.trim() || item.answer.trim()).map((item, idx) => (
                  <div key={idx} className="border border-slate-100 rounded-xl overflow-hidden shadow-sm bg-white">
                    <button
                      onClick={() => setActiveAccordion(activeAccordion === idx ? -1 : idx)}
                      className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                    >
                      <span className={`font-bold text-sm ${activeAccordion === idx ? "text-indigo-600" : "text-slate-800"}`}>
                        {item.question || `Question ${idx + 1}`}
                      </span>
                      <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${activeAccordion === idx ? "rotate-180" : ""}`} />
                    </button>
                    <div className={`px-5 transition-all duration-300 ${activeAccordion === idx ? "max-h-96 pb-4 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
                      <p className="text-sm text-slate-600 leading-relaxed py-2 border-t border-slate-50">
                        {item.answer || "Answer will appear here..."}
                      </p>
                    </div>
                  </div>
                ))}

                {items.filter(item => item.question.trim() || item.answer.trim()).length === 0 && (
                  <div className="py-12 border-2 border-dashed border-slate-100 rounded-3xl flex flex-col items-center justify-center gap-4 grayscale opacity-20">
                    <MessageSquare className="h-16 w-16 text-slate-200" />
                    <p className="font-black text-slate-400 uppercase tracking-widest text-xs px-1">Add items to see preview</p>
                  </div>
                )}
              </div>

              {/* Search Result Preview */}
              <div className="mt-12 pt-8 border-t border-slate-100">
                <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Layout className="h-3 w-3" />
                  Google Search Result Appearance
                </h3>
                <div className="max-w-lg mx-auto bg-white p-5 rounded-2xl border border-slate-100 shadow-md">
                  <h4 className="text-[18px] text-[#1a0dab] hover:underline cursor-pointer mb-1 leading-tight font-medium">FAQ Page: Frequently Asked Questions</h4>
                  <p className="text-[14px] text-[#4d5156] line-clamp-2 mb-4">Discover answers to common questions about our services, pricing, and support. Get all the help you need in one place...</p>

                  <div className="space-y-3 pt-3 border-t border-slate-50">
                    {items.filter(item => item.question.trim()).slice(0, 2).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[13px] text-[#202124]">
                        <ChevronDown className="h-3 w-3 text-slate-400" />
                        <span className="font-medium truncate">{item.question}</span>
                      </div>
                    ))}
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

            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 text-indigo-700 text-xs font-bold italic py-2">
              INFO: Add this to the individual FAQ page&apos;s &lt;head&gt; section.
            </div>

            <div className="bg-[#1e1e1e] p-6 relative group overflow-hidden">
              <div className="absolute top-0 right-0 p-4 border-b border-l border-white/5 bg-white/5 uppercase text-[10px] font-bold tracking-widest text-[#f8f8f2]/30">
                faq-schema.json
              </div>
              <div className="font-mono text-[13px] leading-relaxed text-[#f8f8f2] whitespace-pre-wrap break-all overflow-x-auto selection:bg-indigo-500/30 pt-4 px-1">
                <span className="text-indigo-400/60 font-bold">&lt;script type=&quot;application/ld+json&quot;&gt;</span>
                <div className="pl-4 py-2 border-l border-emerald-500/30 mt-1 mb-1">
                  {jsonText}
                </div>
                <span className="text-indigo-400/60 font-bold">&lt;/script&gt;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
