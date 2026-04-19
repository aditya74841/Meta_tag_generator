"use client";

import React, { useState } from "react";
import { Code } from "lucide-react";
import GeneratedCodePanel from "./GeneratedCodePanel";
import MetaTagsPreview from "./MetaTagsPreview";

const charsets = [
  { value: "utf-8", label: "UTF-8" },
  { value: "iso-8859-1", label: "ISO-8859-1" },
  { value: "windows-1252", label: "Windows-1252" },
  { value: "shift-jis", label: "Shift-JIS" },
  { value: "big5", label: "Big5" },
];

export default function MetaTagsForm() {
  const [charsetValue, setCharsetValue] = useState("utf-8");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [copyright, setCopyright] = useState("");
  const [robots, setRobots] = useState("index, follow");
  const [enableViewport, setEnableViewport] = useState(true);
  const [copied, setCopied] = useState(false);

  const metaCharset = `<meta charset="${charsetValue}">`;
  const metaViewport = `<meta name="viewport" content="width=device-width, initial-scale=1">`;
  const metaTitle = `<title>${title}</title>`;
  const metaDescription = `<meta name="description" content="${description}">`;
  const metaAuthor = `<meta name="author" content="${author}">`;
  const metaCopyright = `<meta name="copyright" content="${copyright}">`;
  const metaRobots = `<meta name="robots" content="${robots}">`;

  const generatedCode =
    `${metaCharset}\n` +
    (enableViewport && metaViewport ? `${metaViewport}\n` : "") +
    (title ? `${metaTitle}\n` : "") +
    (description ? `${metaDescription}\n` : "") +
    (author ? `${metaAuthor}\n` : "") +
    (copyright ? `${metaCopyright}\n` : "") +
    `${metaRobots}`;

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
            <Code className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Meta Tags Generator</h1>
            <p className="text-blue-100 mt-1 max-w-2xl">
              Generate your web page's most helpful meta tags to improve SEO and search engine experience.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Options Panel */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden h-fit">
          <div className="bg-slate-800 text-white px-6 py-4">
            <h2 className="font-semibold text-lg tracking-wide">OPTIONS</h2>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="space-y-4">
              {/* Charset */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700">Charset</label>
                <select
                  value={charsetValue}
                  onChange={(e) => setCharsetValue(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                >
                  {charsets.map((charset) => (
                    <option key={charset.value} value={charset.value}>
                      {charset.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Title */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700">Title</label>
                <input
                  type="text"
                  placeholder="Enter your page title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={120}
                  className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow placeholder:text-slate-400"
                />
                <p className="text-xs text-slate-500">{title.length}/60 characters (recommended)</p>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700">Description</label>
                <textarea
                  placeholder="Enter your page description"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={300}
                  className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow placeholder:text-slate-400 resize-none"
                />
                <p className="text-xs text-slate-500">{description.length}/160 characters (recommended)</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Author */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700">Author</label>
                  <input
                    type="text"
                    placeholder="Enter author name"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow placeholder:text-slate-400"
                  />
                </div>

                {/* Copyright */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700">Copyright</label>
                  <input
                    type="text"
                    placeholder="Enter copyright info"
                    value={copyright}
                    onChange={(e) => setCopyright(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Robots */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700">Robots</label>
                <select
                  value={robots}
                  onChange={(e) => setRobots(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                >
                  <option value="index, follow">index, follow</option>
                  <option value="index, nofollow">index, nofollow</option>
                  <option value="noindex, follow">noindex, follow</option>
                  <option value="noindex, nofollow">noindex, nofollow</option>
                </select>
              </div>

              {/* Viewport Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center pt-0.5">
                    <input
                      type="checkbox"
                      checked={enableViewport}
                      onChange={(e) => setEnableViewport(e.target.checked)}
                      className="peer h-4 w-4 shrink-0 rounded-sm border border-slate-300 text-blue-600 focus:ring-blue-500 transition-all"
                    />
                  </div>
                  <div className="select-none flex flex-col">
                    <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                      Enable viewport
                    </span>
                    <span className="text-xs text-slate-500">
                      Enable if your site is responsive
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Code & Preview Panel */}
        <div className="space-y-6">
          <GeneratedCodePanel
            generatedCode={generatedCode}
            onCopy={handleCopy}
            copied={copied}
          />
          <MetaTagsPreview title={title} description={description} />
        </div>
      </div>
    </div>
  );
}
