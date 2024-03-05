"use client";

import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { countries, currencies, timezones } from "@/app/constant";
const Business = () => {
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    let month = d.getMonth() + 1;
    if (month < 10) month = `0${month}`;
    let day = d.getDate();
    if (day < 10) day = `0${day}`;
    return `${year}-${month}-${day}`;
  };

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");

  // This is used to conditional show
  // const generateMetaTags = () => {
  //   let metaTags = `<meta property="og:type" content="business.business">\n`;
  //   metaTags += title ? `<meta property="og:title" content="${title}">\n` : '';
  //   metaTags += url ? `<meta property="og:url" content="${url}">\n` : '';
  //   metaTags += imageUrl ? `<meta property="og:image" content="${imageUrl}">\n` : '';
  //   metaTags += description ? `<meta property="og:description" content="${description}">\n` : '';
  //   metaTags += streetAddress ? `<meta property="business:contact_data:street_address" content="${streetAddress}">\n` : '';
  //   metaTags += city ? `<meta property="business:contact_data:locality" content="${city}">\n` : '';
  //   metaTags += state ? `<meta property="business:contact_data:region" content="${state}">\n` : '';
  //   metaTags += zip ? `<meta property="business:contact_data:postal_code" content="${zip}">\n` : '';
  //   metaTags += country ? `<meta property="business:contact_data:country_name" content="${country}">\n` : '';
  //   return metaTags;
  // }

  const generateMetaTags = () => {
    let metaTags = `<meta property="og:type" content="business.business">\n`;
    metaTags += `<meta property="og:title" content="${title}">\n`;
    metaTags += `<meta property="og:url" content="${url}">\n`;
    metaTags += `<meta property="og:image" content="${imageUrl}">\n`;

    metaTags += `<meta property="og:description" content="${description}">\n`;
    metaTags += `<meta property="business:contact_data:street_address" content="${streetAddress}">\n`;

    metaTags += `<meta property="business:contact_data:locality" content="${city}">\n`;

    metaTags += `<meta property="business:contact_data:region" content="${state}">\n`;

    metaTags += `<meta property="business:contact_data:postal_code" content="${zip}">\n`;

    metaTags += `<meta property="business:contact_data:country_name" content="${country}">\n`;

    return metaTags;
  };
  return (
    <div className="px-3">
      <h1 className="text-white text-xl text-bold">
        Book Open Graph Generator
      </h1>

      <div className="w-full flex mt-5">
        <div className="w-1/2 border">
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
                  URL
                </label>
                <input
                  type="text"
                  id="first_name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <span className="text-white text-xs">
                  Must include http(s)://.
                </span>
              </div>
              <div className="mt-5">
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Image Url
                </label>
                <input
                  type="text"
                  id="first_name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Paste Image Url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
                <span className="text-white text-xs">
                  Must include http(s)://. The recommended size is 1200x627
                  pixels.
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
                  placeholder="Enter Url"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <h1 className="text-white font-semibold mt-5">Address </h1>

              <div className="mt-5">
                <input
                  type="text"
                  id="first_name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter street address"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                />
              </div>
              <div className="mt-5">
                <input
                  type="text"
                  id="first_name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="mt-5">
                <input
                  type="text"
                  id="first_name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter state/province/region"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>

              <div className="mt-5">
                <input
                  type="text"
                  id="first_name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter zip/postal/code"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                />
              </div>

              <div className="mt-5">
                <select
                  id="type"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option>Select Country</option>
                  {countries.map((country) => (
                    <option key={country.value} value={country.value}>
                      {country.label}
                    </option>
                  ))}
                </select>
              </div>
            </form>
          </div>
        </div>
        <div className="w-1/2 border">
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

export default Business;
