const fs = require('fs');
const path = require('path');

const generateTemplate = (name, type, extraStates, extraMetaLogic, extraInputs, iconName, metaPreviewExtra = "") => {
  return `"use client";

import React, { useState, useRef } from "react";
import OpenGraphLayout from "../../components/OpenGraphLayout";
import { 
  ${iconName}, 
  Type, 
  Link as LinkIcon, 
  Image as ImageIcon,
  AlignLeft,
  Upload,
  Link2,
  List,
  User,
  Hash,
  MapPin,
  Clock,
  CalendarDays,
  DollarSign,
  UserCircle2
} from "lucide-react";

export default function ${name.replace(/^[a-z]/, m => m.toUpperCase())}OpenGraph() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  ${extraStates}
  
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
    ${type !== "product" ? `metaTags.push('<meta property="og:type" content="${type}" />');` : `metaTags.push('<meta property="og:type" content="og:product" />');`}
    if (title) metaTags.push(\`<meta property="og:title" content="\${title}" />\`);
    if (url) metaTags.push(\`<meta property="og:url" content="\${url}" />\`);
    
    const finalImage = imageMode === "upload" ? "https://example.com/uploaded-image.jpg" : imageUrl;
    if (finalImage) metaTags.push(\`<meta property="og:image" content="\${finalImage}" />\`);
    
    if (description) metaTags.push(\`<meta property="og:description" content="\${description}" />\`);
    
    ${extraMetaLogic}
    
    return metaTags.join('\\n');
  };

  const previewData = {
    title,
    url,
    imageUrl,
    description,
    imageMode,
    uploadedImage,
    extraPreviewComponent: ${metaPreviewExtra || "null"}
  };

  return (
    <OpenGraphLayout
      title="${name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} Open Graph"
      description="Optimize your ${name} content for social sharing with perfectly formatted Open Graph meta tags."
      icon={${iconName}}
      type="${type}"
      metaTagsText={generateMetaTags()}
      previewData={previewData}
    >
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-slate-700">Title</label>
        <div className="relative">
          <Type className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="E.g. The Best ${name} Ever"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-slate-700">URL</label>
        <div className="relative">
          <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="url"
            placeholder="https://example.com/asset"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-slate-700">Image</label>
          <div className="flex bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => setImageMode("url")}
              className={\`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-all \${imageMode === "url" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}\`}
            >
              <Link2 className="h-3.5 w-3.5" />
              URL
            </button>
            <button
              onClick={() => setImageMode("upload")}
              className={\`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-all \${imageMode === "upload" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}\`}
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
            placeholder="A short description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full bg-white border border-slate-300 rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-y"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100">
        ${extraInputs}
      </div>
    </OpenGraphLayout>
  );
}
`;
};

const generators = [
  {
    path: "app/opengraph/product/page.js",
    name: "product",
    type: "product",
    iconName: "List",
    extraStates: `const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("USD");`,
    extraMetaLogic: `if (price) metaTags.push(\`<meta property="product:price:amount" content="\${price}" />\`);
    if (currency) metaTags.push(\`<meta property="product:price:currency" content="\${currency}" />\`);`,
    extraInputs: `<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">Price Amount</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input type="text" placeholder="29.99" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full bg-white border border-slate-300 rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">Currency</label>
            <div className="relative">
              <Type className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input type="text" placeholder="USD" value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full bg-white border border-slate-300 rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium" />
            </div>
          </div>
        </div>`,
    metaPreviewExtra: `(price ? <span className="font-bold text-slate-900 mt-2 bg-[#e5e7eb] self-start px-2 py-0.5 rounded text-sm">{price} {currency}</span> : null)`
  },
  {
    path: "app/opengraph/profile/page.js",
    name: "profile",
    type: "profile",
    iconName: "User",
    extraStates: `const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");`,
    extraMetaLogic: `if (firstName) metaTags.push(\`<meta property="profile:first_name" content="\${firstName}" />\`);
    if (lastName) metaTags.push(\`<meta property="profile:last_name" content="\${lastName}" />\`);
    if (username) metaTags.push(\`<meta property="profile:username" content="\${username}" />\`);`,
    extraInputs: `<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">First Name</label>
            <div className="relative">
              <UserCircle2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input type="text" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full bg-white border border-slate-300 rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">Last Name</label>
            <div className="relative">
              <UserCircle2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input type="text" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full bg-white border border-slate-300 rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">Username</label>
            <div className="relative">
              <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input type="text" placeholder="johndoe" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-white border border-slate-300 rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium" />
            </div>
          </div>
        </div>`,
  },
  {
    path: "app/opengraph/book/page.js",
    name: "book",
    type: "book",
    iconName: "List",
    extraStates: `const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [tags, setTags] = useState("");`,
    extraMetaLogic: `if (author) metaTags.push(\`<meta property="book:author" content="\${author}" />\`);
    if (isbn) metaTags.push(\`<meta property="book:isbn" content="\${isbn}" />\`);
    if (releaseDate) metaTags.push(\`<meta property="book:release_date" content="\${releaseDate}" />\`);
    if (tags) {
      tags.split(',').forEach(tag => {
         metaTags.push(\`<meta property="book:tag" content="\${tag.trim()}" />\`);
      });
    }`,
    extraInputs: `<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">Author</label>
            <input type="text" placeholder="Author name" value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">ISBN</label>
            <input type="text" placeholder="ISBN number" value={isbn} onChange={(e) => setIsbn(e.target.value)} className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">Release Date</label>
            <input type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">Tags</label>
            <input type="text" placeholder="Sci-Fi, Space" value={tags} onChange={(e) => setTags(e.target.value)} className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium" />
          </div>
        </div>`,
  },
  {
    path: "app/opengraph/business/page.js",
    name: "business",
    type: "business.business",
    iconName: "MapPin",
    extraStates: `const [streetAddress, setStreetAddress] = useState("");
  const [locality, setLocality] = useState("");
  const [region, setRegion] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [countryName, setCountryName] = useState("");`,
    extraMetaLogic: `if (streetAddress) metaTags.push(\`<meta property="business:contact_data:street_address" content="\${streetAddress}" />\`);
    if (locality) metaTags.push(\`<meta property="business:contact_data:locality" content="\${locality}" />\`);
    if (region) metaTags.push(\`<meta property="business:contact_data:region" content="\${region}" />\`);
    if (postalCode) metaTags.push(\`<meta property="business:contact_data:postal_code" content="\${postalCode}" />\`);
    if (countryName) metaTags.push(\`<meta property="business:contact_data:country_name" content="\${countryName}" />\`);`,
    extraInputs: `<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">Street Address</label>
            <input type="text" placeholder="123 Main St" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">Locality (City)</label>
            <input type="text" placeholder="San Francisco" value={locality} onChange={(e) => setLocality(e.target.value)} className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">Region (State)</label>
            <input type="text" placeholder="CA" value={region} onChange={(e) => setRegion(e.target.value)} className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">Postal Code</label>
            <input type="text" placeholder="94105" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">Country</label>
            <input type="text" placeholder="USA" value={countryName} onChange={(e) => setCountryName(e.target.value)} className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium" />
          </div>
        </div>`,
  },
  {
    path: "app/opengraph/videomovie/page.js",
    name: "videoMovie",
    type: "video.movie",
    iconName: "List",
    extraStates: `const [duration, setDuration] = useState("");
  const [dateReleased, setDateReleased] = useState("");
  const [tags, setTags] = useState("");`,
    extraMetaLogic: `if (duration) metaTags.push(\`<meta property="video:duration" content="\${duration}" />\`);
    if (dateReleased) metaTags.push(\`<meta property="video:release_date" content="\${dateReleased}" />\`);
    if (tags) {
      tags.split(',').forEach(tag => {
         metaTags.push(\`<meta property="video:tag" content="\${tag.trim()}" />\`);
      });
    }`,
    extraInputs: `<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">Duration (sec)</label>
            <input type="number" placeholder="7200" value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">Release Date</label>
            <input type="date" value={dateReleased} onChange={(e) => setDateReleased(e.target.value)} className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">Tags</label>
            <input type="text" placeholder="Action, Sci-Fi" value={tags} onChange={(e) => setTags(e.target.value)} className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium" />
          </div>
        </div>`,
  },
  {
    path: "app/opengraph/videoepisode/page.js",
    name: "videoEpisode",
    type: "video.episode",
    iconName: "List",
    extraStates: `const [duration, setDuration] = useState("");
  const [dateReleased, setDateReleased] = useState("");
  const [tags, setTags] = useState("");`,
    extraMetaLogic: `if (duration) metaTags.push(\`<meta property="video:duration" content="\${duration}" />\`);
    if (dateReleased) metaTags.push(\`<meta property="video:release_date" content="\${dateReleased}" />\`);
    if (tags) {
      tags.split(',').forEach(tag => {
         metaTags.push(\`<meta property="video:tag" content="\${tag.trim()}" />\`);
      });
    }`,
    extraInputs: `<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">Duration (sec)</label>
            <input type="number" placeholder="2400" value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">Release Date</label>
            <input type="date" value={dateReleased} onChange={(e) => setDateReleased(e.target.value)} className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">Tags</label>
            <input type="text" placeholder="Comedy" value={tags} onChange={(e) => setTags(e.target.value)} className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium" />
          </div>
        </div>`,
  },
  {
    path: "app/opengraph/videotvshow/page.js",
    name: "videoTvShow",
    type: "video.tv_show",
    iconName: "List",
    extraStates: `const [duration, setDuration] = useState("");
  const [dateReleased, setDateReleased] = useState("");
  const [tags, setTags] = useState("");`,
    extraMetaLogic: `if (duration) metaTags.push(\`<meta property="video:duration" content="\${duration}" />\`);
    if (dateReleased) metaTags.push(\`<meta property="video:release_date" content="\${dateReleased}" />\`);
    if (tags) {
      tags.split(',').forEach(tag => {
         metaTags.push(\`<meta property="video:tag" content="\${tag.trim()}" />\`);
      });
    }`,
    extraInputs: `<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">Duration (sec)</label>
            <input type="number" placeholder="2400" value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">Release Date</label>
            <input type="date" value={dateReleased} onChange={(e) => setDateReleased(e.target.value)} className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">Tags</label>
            <input type="text" placeholder="Drama, Series" value={tags} onChange={(e) => setTags(e.target.value)} className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium" />
          </div>
        </div>`,
  },
  {
    path: "app/opengraph/musicalbum/page.js",
    name: "musicAlbum",
    type: "music.album",
    iconName: "List",
    extraStates: `const [musician, setMusician] = useState("");
  const [releaseDate, setReleaseDate] = useState("");`,
    extraMetaLogic: `if (musician) metaTags.push(\`<meta property="music:musician" content="\${musician}" />\`);
    if (releaseDate) metaTags.push(\`<meta property="music:release_date" content="\${releaseDate}" />\`);`,
    extraInputs: `<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">Musician</label>
            <input type="text" placeholder="Artist Name" value={musician} onChange={(e) => setMusician(e.target.value)} className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">Release Date</label>
            <input type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium" />
          </div>
        </div>`,
  },
  {
    path: "app/opengraph/musicplaylist/page.js",
    name: "musicPlaylist",
    type: "music.playlist",
    iconName: "List",
    extraStates: `const [creator, setCreator] = useState("");`,
    extraMetaLogic: `if (creator) metaTags.push(\`<meta property="music:creator" content="\${creator}" />\`);`,
    extraInputs: `<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">Creator</label>
            <input type="text" placeholder="Playlist creator" value={creator} onChange={(e) => setCreator(e.target.value)} className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium" />
          </div>
        </div>`,
  },
  {
    path: "app/opengraph/musicradiostation/page.js",
    name: "musicRadioStation",
    type: "music.radio_station",
    iconName: "List",
    extraStates: `const [creator, setCreator] = useState("");`,
    extraMetaLogic: `if (creator) metaTags.push(\`<meta property="music:creator" content="\${creator}" />\`);`,
    extraInputs: `<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">Creator</label>
            <input type="text" placeholder="Radio Host" value={creator} onChange={(e) => setCreator(e.target.value)} className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium" />
          </div>
        </div>`,
  },
  {
    path: "app/opengraph/musicsong/page.js",
    name: "musicSong",
    type: "music.song",
    iconName: "List",
    extraStates: `const [duration, setDuration] = useState("");
  const [album, setAlbum] = useState("");
  const [musician, setMusician] = useState("");`,
    extraMetaLogic: `if (duration) metaTags.push(\`<meta property="music:duration" content="\${duration}" />\`);
    if (album) metaTags.push(\`<meta property="music:album" content="\${album}" />\`);
    if (musician) metaTags.push(\`<meta property="music:musician" content="\${musician}" />\`);`,
    extraInputs: `<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">Duration (sec)</label>
            <input type="number" placeholder="210" value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">Album/URL</label>
            <input type="text" placeholder="Album URL" value={album} onChange={(e) => setAlbum(e.target.value)} className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">Musician Profile URL</label>
            <input type="text" placeholder="Musician URL" value={musician} onChange={(e) => setMusician(e.target.value)} className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium" />
          </div>
        </div>`,
  }
];

generators.forEach(gen => {
  if (fs.existsSync(gen.path)) {
    const code = generateTemplate(gen.name, gen.type, gen.extraStates, gen.extraMetaLogic, gen.extraInputs, gen.iconName, gen.metaPreviewExtra);
    fs.writeFileSync(gen.path, code);
    console.log("Updated", gen.path);
  }
});

