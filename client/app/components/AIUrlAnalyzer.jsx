"use client";

import React, { useState } from "react";
import { 
  Zap, 
  Copy, 
  Link as UrlIcon, 
  CheckCircle, 
  AlertCircle, 
  Code, 
  Tag, 
  Search, 
  Layers, 
  ChevronDown, 
  ChevronUp, 
  Eye,
  RotateCcw,
  Sparkles,
  ExternalLink,
  ArrowRight,
  Wand2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import SeoOverviewPanel from "./SeoOverviewPanel";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// ─── Result Block ────────────────────────────────────────────────────────────
const ResultBlock = ({ result, onBack }) => {
  const [viewType, setViewType] = useState("meta");
  const [copied, setCopied] = useState(false);

  const tags = result.generated.metaTags;
  const metaCode = `<!-- SEO Meta Tags for ${result.url} -->
<title>${tags.title}</title>
<meta name="description" content="${tags.description}">
<meta name="keywords" content="${tags.keywords}">
<meta property="og:title" content="${tags["og:title"]}">
<meta property="og:description" content="${tags["og:description"]}">
<meta name="twitter:card" content="${tags["twitter:card"]}">
<meta name="twitter:title" content="${tags["twitter:title"]}">
<meta name="twitter:description" content="${tags["twitter:description"]}">`.trim();

  const jsonCode = JSON.stringify(result.generated.structuredData, null, 2);

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
           <CheckCircle className="w-5 h-5 text-green-500" />
           <h4 className="text-lg font-bold text-white">AI Optimization Complete</h4>
        </div>
        <Button variant="ghost" size="sm" onClick={onBack} className="text-slate-400">
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      <Card className="bg-slate-900 border-white/10 overflow-hidden">
        <CardHeader className="pb-2">
           <CardTitle className="text-sm font-bold text-blue-400 truncate">{result.url}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex gap-1 bg-slate-950 p-1 rounded-lg">
              <Button 
                variant={viewType === "meta" ? "secondary" : "ghost"} 
                size="sm" 
                onClick={() => setViewType("meta")}
                className="h-8 text-xs gap-2"
              >
                <Tag className="w-3.5 h-3.5" />
                Meta Tags
              </Button>
              <Button 
                variant={viewType === "jsonld" ? "secondary" : "ghost"} 
                size="sm" 
                onClick={() => setViewType("jsonld")}
                className="h-8 text-xs gap-2"
              >
                <Code className="w-3.5 h-3.5" />
                JSON-LD
              </Button>
            </div>

            <Button 
              variant="outline" 
              size="sm" 
              className={cn("h-8 text-xs gap-2", copied && "text-green-400 border-green-500/50")}
              onClick={() => {
                navigator.clipboard.writeText(viewType === "meta" ? metaCode : jsonCode);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
            >
              {copied ? <CheckCircle className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied!" : "Copy Code"}
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { label: "SEO Title", value: tags.title, color: "text-white" },
              { label: "Description", value: tags.description, color: "text-slate-400" },
              { label: "Keywords", value: tags.keywords, color: "text-blue-400" },
              { label: "OG Title", value: tags["og:title"], color: "text-purple-400" },
            ].map((item) => (
              <div key={item.label} className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-600">{item.label}</span>
                <p className={cn("text-xs leading-relaxed line-clamp-2", item.color)}>{item.value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl bg-black/40 p-4 font-mono text-[11px] text-blue-300 overflow-auto max-h-[300px] border border-white/5">
            <pre>{viewType === "meta" ? metaCode : jsonCode}</pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// ─── Page Card ───────────────────────────────────────────────────────────────
const PageCard = ({ page, onFix, onViewOverview, fixing, result }) => (
  <Card className="bg-slate-900 border-white/5 hover:border-white/10 transition-all duration-300 group overflow-hidden">
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between mb-2">
         {page.path === "/" && <Badge className="bg-green-500/10 text-green-400 border-green-500/20">Home</Badge>}
         {page.error && <Badge variant="destructive">{page.error}</Badge>}
      </div>
      <CardTitle className="text-sm font-bold text-slate-100 truncate group-hover:text-blue-400 transition-colors">
        {page.title || "Untitled Page"}
      </CardTitle>
      <CardDescription className="text-xs text-slate-500 font-mono truncate">
        {page.path}
      </CardDescription>
    </CardHeader>
    
    <CardContent className="pb-4">
       {result ? (
         <div className="flex items-center gap-2 text-green-400 text-xs font-bold bg-green-500/10 p-2 rounded-lg">
            <CheckCircle className="w-4 h-4" />
            Optimized with AI
         </div>
       ) : (
         <div className="text-[11px] text-slate-400 leading-relaxed line-clamp-2 italic">
           Pending analysis. Click &quot;Fix Page&quot; to generate AI-powered meta tags.
         </div>
       )}
    </CardContent>

    <CardFooter className="pt-0 flex gap-2">
      <Button 
        variant="secondary" 
        size="sm" 
        className="flex-1 text-xs gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200"
        onClick={onViewOverview}
      >
        <Eye className="w-3.5 h-3.5" />
        Overview
      </Button>
      <Button 
        variant="default" 
        size="sm" 
        disabled={fixing}
        className={cn(
          "flex-1 text-xs gap-2 font-bold",
          result ? "bg-green-600 hover:bg-green-500" : "bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/20"
        )}
        onClick={onFix}
      >
        {fixing ? (
          <RotateCcw className="w-3.5 h-3.5 animate-spin" />
        ) : result ? (
          <CheckCircle className="w-3.5 h-3.5" />
        ) : (
          <Wand2 className="w-3.5 h-3.5" />
        )}
        {fixing ? "Fixing..." : result ? "View Fix" : "Fix Page"}
      </Button>
    </CardFooter>
  </Card>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const AIUrlAnalyzer = () => {
  const [url, setUrl] = useState("");
  const [crawling, setCrawling] = useState(false);
  const [crawlError, setCrawlError] = useState(null);
  const [pages, setPages] = useState(null);
  
  // Per-page results and fixing states
  const [pageResults, setPageResults] = useState({});
  const [fixingPages, setFixingPages] = useState({});
  
  // Focused result (full screen view of a fix)
  const [focusedResult, setFocusedResult] = useState(null);
  const [overviewPage, setOverviewPage] = useState(null);

  const handleCrawl = async () => {
    if (!url.trim()) { setCrawlError("Please enter a valid URL"); return; }
    setCrawling(true);
    setCrawlError(null);
    setPages(null);
    setPageResults({});
    setFixingPages({});
    setFocusedResult(null);

    try {
      const res = await fetch(`${API_BASE}/crawl`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setPages(data.data.pages);
      } else {
        setCrawlError(data.error || "Failed to crawl the website.");
      }
    } catch {
      setCrawlError("Could not reach the server.");
    } finally {
      setCrawling(false);
    }
  };

  const handleFixPage = async (page) => {
    // If we already have a result, just focus it
    if (pageResults[page.url]) {
      setFocusedResult({ url: page.url, ...pageResults[page.url] });
      return;
    }

    setFixingPages(prev => ({ ...prev, [page.url]: true }));
    
    try {
      const res = await fetch(`${API_BASE}/url`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: page.url }),
      });
      const data = await res.json();
      if (data.success) {
        setPageResults(prev => ({ ...prev, [page.url]: data.data }));
        setFocusedResult({ url: page.url, ...data.data });
      } else {
        alert(data.error || "Failed to optimize page.");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setFixingPages(prev => ({ ...prev, [page.url]: false }));
    }
  };

  const handleReset = () => {
    setUrl("");
    setPages(null);
    setPageResults({});
    setFixingPages({});
    setFocusedResult(null);
    setCrawlError(null);
  };

  return (
    <div className="w-full space-y-8">
      {/* Search Input */}
      {!focusedResult && (
        <div className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <UrlIcon className="w-5 h-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input 
            type="text"
            placeholder="Paste website URL (e.g. https://google.com)"
            className="w-full h-16 pl-12 pr-40 bg-slate-900 border border-white/10 rounded-2xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !pages && handleCrawl()}
          />
          <div className="absolute inset-y-2 right-2 flex gap-2">
            {pages && (
              <Button variant="ghost" className="h-full px-4 rounded-xl text-slate-500" onClick={handleReset}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            )}
            <Button 
              className="h-full px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold gap-2 shadow-lg shadow-blue-600/20"
              disabled={crawling || !url}
              onClick={handleCrawl}
            >
              {crawling ? (
                <RotateCcw className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
              {crawling ? "Scanning..." : "Scan Site"}
            </Button>
          </div>
        </div>
      )}

      {/* Errors */}
      {crawlError && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3 animate-in zoom-in duration-300">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          {crawlError}
        </div>
      )}

      {/* Discovery View (Step 1) */}
      {pages && !focusedResult && (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
              <Layers className="w-6 h-6 text-blue-500" />
              Site Pages ({pages.length})
            </h3>
            <p className="text-xs text-slate-500 italic">Review each page below or fix them with AI.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pages.map((page) => (
              <PageCard
                key={page.url}
                page={page}
                fixing={fixingPages[page.url]}
                result={pageResults[page.url]}
                onFix={() => handleFixPage(page)}
                onViewOverview={() => setOverviewPage(page)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Result View (Individual Page Fix) */}
      {focusedResult && (
        <ResultBlock 
          result={focusedResult} 
          onBack={() => setFocusedResult(null)} 
        />
      )}

      {/* SEO Overview Panel */}
      <SeoOverviewPanel
        page={overviewPage}
        open={!!overviewPage}
        onClose={() => setOverviewPage(null)}
      />
    </div>
  );
};

export default AIUrlAnalyzer;
