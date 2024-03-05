"use client";

import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Summary = () => {
  const [site, setSite] = useState("");
  const [description, setDescription] = useState("");

  const [title, setTitle] = useState("");
  const [playerUrl, setPlayerUrl] = useState("");
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageAltText, setImageAltText] = useState("");

  const generateMetaTags = () => {
    let metaTags = "";
    metaTags += `<meta name="twitter:card" content="summary">\n`;
    metaTags += `<meta name="twitter:title" content="${title}">\n`;
    if (site) metaTags += `<meta name="twitter:site" content="${site}">\n`;
    if (description)
      metaTags += `<meta name="twitter:description" content="${description}">\n`;

    if (imageUrl)
      metaTags += `<meta name="twitter:image" content="${imageUrl}">\n`;
    if (imageAltText)
      metaTags += `<meta name="twitter:image:alt" content="${imageAltText}">\n`;
    return metaTags;
  };
  return (
    <div className="px-3">
      <h1 className="text-white text-xl text-bold">
        App Twitter Card Generator
      </h1>
      <p className="text-white text-sm mt-2">Audio and video media</p>
      <div className="flex mt-5">
        <div className="w-full border">
          <h1 className="text-white uppercase font-semibold py-1 pl-5 bg-slate-600">
            OPTIONS
          </h1>
          <div className="py-4 px-5 bg-gray-800">
            <form>
              <div className="mt-5">
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="first_name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="mt-5">
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Site
                </label>
                <input
                  type="text"
                  id="first_name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Site"
                  value={site}
                  onChange={(e) => setSite(e.target.value)}
                />
                <span className="text-white text-xs">
                  The Twitter “@username” the card should be attributed to.
                </span>
              </div>

              <div className="mt-5">
                <label
                  for="message"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="message"
                  rows="2"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <span className="text-white text-xs">Max 200 characters</span>
              </div>

              <div className="mt-5">
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Image URL
                </label>
                <input
                  type="text"
                  id="first_name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Image Url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
                <span className="text-white text-xs">
                  Supports an aspect ratio of 1:1 with minimum dimensions of
                  144x144 or maximum of 4096x4096 pixels. Image must be less
                  then 5MB in size. JPG, PNG, WEBP and GIF formats are
                  supported.
                </span>
              </div>

              <div className="mt-5">
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Image alt text
                </label>
                <input
                  type="text"
                  id="first_name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Image Alt Text"
                  value={imageAltText}
                  onChange={(e) => setImageAltText(e.target.value)}
                />
              </div>
              {/* Other form fields go here */}
            </form>
          </div>
        </div>
        <div className="w-full border">
          <div>
            <h1 className="text-white uppercase font-semibold py-1 pl-5 bg-slate-600">
              CODE
            </h1>
            <div className="text-white font-semibold py-2 pl-5 text-xs bg-slate-800">
              <p className="bg">
                Copy this to the &lt;head&gt; section of your page.
              </p>
            </div>
            <CopyToClipboard text={generateMetaTags()}>
              <div className="ml-auto w-1/6 mt-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Copy
                </button>
              </div>
            </CopyToClipboard>

            <div className="space-y-2 mt-5 ml-4">
              <pre className="text-white">{generateMetaTags()}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
