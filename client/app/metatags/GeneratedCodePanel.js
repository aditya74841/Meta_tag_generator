"use client";

import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Copy, CheckCircle2 } from "lucide-react";

export default function GeneratedCodePanel({ generatedCode, onCopy, copied }) {
  const lineCount = generatedCode.split('\n').filter(line => line.trim()).length;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6 h-fit">
      <div className="bg-emerald-600 text-white px-4 py-3 flex justify-between items-center">
        <h3 className="font-semibold text-lg">Generated Code</h3>
        <span className="bg-white/20 px-2.5 py-0.5 rounded-full text-sm font-medium">
          {lineCount} tags
        </span>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 text-blue-700 text-sm mb-0">
        Copy this code to the &lt;head&gt; section of your HTML page.
      </div>

      <div className="bg-[#1e1e1e] p-6 relative">
        <CopyToClipboard text={generatedCode} onCopy={onCopy}>
          <button 
            type="button"
            className="absolute top-4 right-4 p-2 rounded-md transition-colors bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white"
            title={copied ? "Copied!" : "Copy to clipboard"}
          >
            {copied ? <CheckCircle2 className="h-5 w-5 text-emerald-400" /> : <Copy className="h-5 w-5" />}
          </button>
        </CopyToClipboard>

        <div className="font-mono text-sm leading-relaxed text-[#f8f8f2] whitespace-pre-wrap break-all overflow-x-auto">
          {generatedCode.split('\n').map((line, index) => (
            <div 
              key={index} 
              className={`py-0.5 pl-3 border-l-4 ${line.trim() ? "border-emerald-500 opacity-100" : "border-transparent opacity-50"}`}
            >
              {line || " "}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
