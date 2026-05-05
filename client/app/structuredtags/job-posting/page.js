"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  Briefcase,
  Building2,
  MapPin,
  Calendar,
  DollarSign,
  Globe,
  ShieldCheck,
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
  Clock,
  ExternalLink
} from "lucide-react";

export default function JobPostingGenerator() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [uploadedLogo, setUploadedLogo] = useState(null); // Base64 for preview
  const [logoMode, setLogoMode] = useState("url"); // "url" or "upload"
  const [locationType, setLocationType] = useState("Onsite"); // "Onsite", "Remote", "Hybrid"
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [employmentType, setEmploymentType] = useState("FULL_TIME");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [unit, setUnit] = useState("YEAR");
  const [datePosted, setDatePosted] = useState("");
  const [validThrough, setValidThrough] = useState("");
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateJSON = () => {
    return {
      "@context": "https://schema.org/",
      "@type": "JobPosting",
      title: title,
      description: description,
      datePosted: datePosted,
      validThrough: validThrough,
      employmentType: employmentType,
      hiringOrganization: {
        "@type": "Organization",
        name: company,
        sameAs: companyUrl,
        logo: logoMode === "upload" ? "https://example.com/images/logo.png" : (logoUrl || undefined)
      },
      jobLocation: locationType === "Remote" ? {
        "@type": "VirtualLocation"
      } : {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: city,
          addressRegion: region,
          addressCountry: country
        }
      },
      ...(salaryMin && {
        baseSalary: {
          "@type": "MonetaryAmount",
          currency: currency,
          value: {
            "@type": "QuantitativeValue",
            minValue: salaryMin,
            maxValue: salaryMax || salaryMin,
            unitText: unit
          }
        }
      })
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
            <Briefcase className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Job Posting Structured Data</h1>
            <p className="text-indigo-100 mt-1 max-w-2xl">
              Help top talent find your positions. This schema enables your jobs to appear in the Google Jobs search experience.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Configuration Panel */}
        <div className="space-y-6 text-slate-800">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden h-fit">
            <div className="bg-slate-800 text-white px-6 py-4 flex items-center gap-2">
              <Layout className="h-5 w-5" />
              <h2 className="font-semibold text-lg tracking-wide uppercase">Opportunity Details</h2>
            </div>

            <div className="p-6 space-y-6">
              {/* Job Basics */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700">Job Title *</label>
                  <input
                    type="text"
                    placeholder="e.g. Senior Frontend Engineer"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700">Job Description *</label>
                  <textarea
                    placeholder="Describe the role, requirements, and benefits..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
                  />
                </div>
              </div>

              {/* Company Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700">Company Name</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. MetaForge Pro"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700">Company Website</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="url"
                      placeholder="https://metaforge.pro"
                      value={companyUrl}
                      onChange={(e) => setCompanyUrl(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>

              {/* Logo Section */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-slate-700">Hiring Logo</label>
                  <div className="flex bg-slate-100 rounded-lg p-1 text-[10px] font-black uppercase">
                    <button
                      onClick={() => setLogoMode("url")}
                      className={`px-3 py-1 rounded-md transition-all ${logoMode === "url" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                    >
                      URL
                    </button>
                    <button
                      onClick={() => setLogoMode("upload")}
                      className={`px-3 py-1 rounded-md transition-all ${logoMode === "upload" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                    >
                      Upload
                    </button>
                  </div>
                </div>

                {logoMode === "url" ? (
                  <div className="relative">
                    <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="url"
                      placeholder="https://example.com/logo.png"
                      value={logoUrl}
                      onChange={(e) => setLogoUrl(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
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
                      <div className="bg-slate-50 p-3 rounded-full mb-2 group-hover:bg-indigo-100 transition-colors">
                        <Upload className="h-6 w-6 text-slate-300 group-hover:text-indigo-600" />
                      </div>
                      <span className="text-sm font-bold text-slate-500 group-hover:text-indigo-700">Choose Company Logo</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Employment & Salary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700">Employment Type</label>
                  <select
                    value={employmentType}
                    onChange={(e) => setEmploymentType(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                  >
                    <option value="FULL_TIME">Full-time</option>
                    <option value="PART_TIME">Part-time</option>
                    <option value="CONTRACTOR">Contract</option>
                    <option value="TEMPORARY">Temporary</option>
                    <option value="INTERN">Internship</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700">Salary Range (Min - Max)</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <DollarSign className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                      <input
                        type="number"
                        placeholder="Min"
                        value={salaryMin}
                        onChange={(e) => setSalaryMin(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-lg pl-8 pr-2 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="relative flex-1">
                      <input
                        type="number"
                        placeholder="Max"
                        value={salaryMax}
                        onChange={(e) => setSalaryMax(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Recruitment Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700">Date Posted</label>
                  <input
                    type="date"
                    value={datePosted}
                    onChange={(e) => setDatePosted(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700">Expiry Date</label>
                  <input
                    type="date"
                    value={validThrough}
                    onChange={(e) => setValidThrough(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <MapPin className="h-3 w-3" />
                    Job Location
                  </h3>
                  <div className="flex bg-slate-100 rounded-lg p-1 text-[10px] font-black uppercase">
                    <button
                      onClick={() => setLocationType("Onsite")}
                      className={`px-3 py-1 rounded-md transition-all ${locationType === "Onsite" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500"}`}
                    >
                      On-site
                    </button>
                    <button
                      onClick={() => setLocationType("Remote")}
                      className={`px-3 py-1 rounded-md transition-all ${locationType === "Remote" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500"}`}
                    >
                      Remote
                    </button>
                  </div>
                </div>

                {locationType === "Onsite" && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                      type="text"
                      placeholder="State"
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                      type="text"
                      placeholder="Country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                )}
                {locationType === "Remote" && (
                  <div className="bg-emerald-50 text-emerald-700 text-xs font-bold p-4 rounded-xl flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5" />
                    Work-from-home capability will be explicitly marked in the schema.
                  </div>
                )}
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
              <h2 className="font-semibold text-lg uppercase tracking-wide">Google Jobs Preview</h2>
            </div>

            <div className="p-8 pb-12">
              <div className="max-w-lg mx-auto bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden">
                <div className="p-6">
                  <div className="flex gap-4 mb-6">
                    <div className="h-16 w-16 bg-slate-50 border border-slate-100 rounded-xl p-2 flex items-center justify-center shrink-0">
                      {logoMode === "url" ? (
                        logoUrl ? (
                          <Image width={100} height={100} unoptimized src={logoUrl} alt="Logo" className="max-h-full max-w-full object-contain" />
                        ) : (
                          <Building2 className="h-8 w-8 text-slate-200" />
                        )
                      ) : (
                        uploadedLogo ? (
                          <Image width={100} height={100} unoptimized src={uploadedLogo} alt="Logo" className="max-h-full max-w-full object-contain" />
                        ) : (
                          <Upload className="h-8 w-8 text-slate-200" />
                        )
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[18px] font-bold text-slate-900 leading-tight mb-1">{title || "Job Opportunity Title"}</h3>
                      <div className="text-[14px] text-slate-500 font-medium">{company || "Hiring Company Name"}</div>
                    </div>
                    <div className="shrink-0">
                      <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                        <Briefcase className="h-5 w-5" />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-x-6 gap-y-3 mb-8">
                    <div className="flex items-center gap-2 text-slate-600">
                      <MapPin className="h-4 w-4 text-rose-500" />
                      <span className="text-[13px] font-bold">
                        {locationType === "Remote" ? "Work from home" : (city ? `${city}, ${country}` : "Location not specified")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Clock className="h-4 w-4 text-amber-500" />
                      <span className="text-[13px] font-bold uppercase tracking-tight">
                        {employmentType.replace('_', ' ')}
                      </span>
                    </div>
                    {salaryMin && (
                      <div className="flex items-center gap-2 text-slate-600">
                        <DollarSign className="h-4 w-4 text-emerald-500" />
                        <span className="text-[13px] font-bold italic">
                          {currency} {salaryMin} - {salaryMax || salaryMin} / {unit.toLowerCase()}
                        </span>
                      </div>
                    )}
                  </div>

                  <p className="text-[14px] text-slate-600 line-clamp-4 leading-relaxed mb-8 italic">
                    {description || "A comprehensive job description will appear here, helping search engines match this opportunity with qualified candidates..."}
                  </p>

                  <div className="flex gap-4">
                    <button className="flex-1 bg-[#1a73e8] text-white font-bold py-3 rounded-full text-sm hover:bg-[#1557b0] transition-colors shadow-lg shadow-blue-100">
                      Apply on Site
                    </button>
                    <button className="flex-1 bg-slate-50 text-slate-700 font-bold py-3 rounded-full text-sm border border-slate-100 hover:bg-slate-100 transition-colors">
                      Save Details
                    </button>
                  </div>
                </div>

                <div className="bg-slate-50 px-6 py-4 flex items-center justify-between border-t border-slate-100">
                  <span className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">
                    Posted {datePosted || "today"}
                  </span>
                  <div className="flex items-center gap-1.5 text-emerald-600 text-[11px] font-black uppercase tracking-tighter">
                    <AlertCircle className="h-3 w-3" />
                    Verified Schema
                  </div>
                </div>
              </div>

              <p className="text-center text-[11px] text-slate-400 mt-8 font-medium px-12">
                Your job postings will be eligible to appear in the Google Search results UI, specifically designed for recruitment.
              </p>
            </div>
          </div>

          {/* Generated Code Panel */}
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

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 text-blue-700 text-sm">
              <p className="font-medium italic text-blue-800">Place this code block inside your site&apos;s &lt;head&gt; tag.</p>
              {logoMode === "upload" && (
                <p className="mt-1 text-xs font-bold text-blue-600">
                  ⚠️ Note: Replace the placeholder logo URL in the code with your actual public image link.
                </p>
              )}
            </div>

            <div className="bg-[#1e1e1e] p-6 relative group overflow-hidden">
              <div className="absolute top-0 right-0 p-4 border-b border-l border-white/5 bg-white/5 uppercase text-[10px] font-bold tracking-widest text-[#f8f8f2]/20">
                jobs-schema.ld
              </div>
              <div className="font-mono text-[13px] leading-relaxed text-[#f8f8f2] whitespace-pre-wrap break-all overflow-x-auto selection:bg-indigo-500/40 pt-4">
                <span className="text-indigo-400 font-bold">&lt;script type=&quot;application/ld+json&quot;&gt;</span>
                <div className="pl-4 py-2 border-l border-emerald-500/30 mt-1 mb-1">
                  {jsonText}
                </div>
                <span className="text-indigo-400 font-bold">&lt;/script&gt;</span>
              </div>
            </div>

            <div className="p-4 bg-indigo-50 border-t border-indigo-100 flex items-start gap-3">
              <ExternalLink className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <p className="text-[11px] text-indigo-800 leading-normal">
                Remember to remove the posting once the position is filled by setting the <strong>validThrough</strong> date or deleting the schema.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
