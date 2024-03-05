"use client";

import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  businessCategories,
  countries,
  currencies,
  organizations,
  timezones,
} from "@/app/constant";
const App = () => {
  const [site, setSite] = useState("");
  const [description, setDescription] = useState("");

  const [isIncludeAndroid, setIsIncludeAndroid] = useState("");
  const [isIncludeiPhone, setIsIncludeiPhone] = useState("");
  const [isIncludeiPad, setIsIncludeiPad] = useState("");

  const [androidName, setAndroidName] = useState("");
  const [androidURL, setAndroidURL] = useState("");
  const [androidId, setAndroidId] = useState("");

  const [iPhoneName, setIPhoneName] = useState("");
  const [iPhoneURL, setIPhoneURL] = useState("");
  const [iPhoneId, setIPhoneId] = useState("");

  const [ipadName, setIpadName] = useState("");
  const [ipadURL, setIpadURL] = useState("");
  const [ipadId, setIpadId] = useState("");

  const generateMetaTags = () => {
    let metaTags = "";
    metaTags += `<meta name="twitter:card" content="app">\n`;
    if (site) metaTags += `<meta name="twitter:site" content="${site}">\n`;
    if (description)
      metaTags += `<meta name="twitter:description" content="${description}">\n`;

    if (isIncludeAndroid) {
      metaTags += `<meta name="twitter:app:name:googleplay" content="${androidName}">\n`;
      metaTags += `<meta name="twitter:app:url:googleplay" content="${androidURL}">\n`;
      metaTags += `<meta name="twitter:app:id:googleplay" content="${androidId}">\n`;
    }

    if (isIncludeiPhone) {
      metaTags += `<meta name="twitter:app:name:iphone" content="${iPhoneName}">\n`;
      metaTags += `<meta name="twitter:app:url:iphone" content="${iPhoneURL}">\n`;
      metaTags += `<meta name="twitter:app:id:iphone" content="${iPhoneId}">\n`;
    }

    if (isIncludeiPad) {
      metaTags += `<meta name="twitter:app:name:ipad" content="${ipadName}">\n`;
      metaTags += `<meta name="twitter:app:url:ipad" content="${ipadURL}">\n`;
      metaTags += `<meta name="twitter:app:id:ipad" content="${ipadId}">\n`;
    }

    return metaTags;
  };

  return (
    <div className="px-3">
      <h1 className="text-white text-xl text-bold">
        App Twitter Card Generator
      </h1>
      <p className="text-white text-sm mt-2">Direct download to a mobile app</p>
      <div className="flex mt-5">
        <div className="w-full border">
          <h1 className="text-white uppercase font-semibold py-1 pl-5 bg-slate-600">
            OPTIONS
          </h1>
          <div className="py-4 px-5 bg-gray-800">
            <form>
              <h1 className="text-white font-semibold mt-5">Person Details </h1>

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
                  placeholder="Enter Title"
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
                  placeholder="Enter Url"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <span className="text-white text-xs">Max 200 characters</span>
              </div>

              <div class="flex items-center mb-4 mt-5">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onChange={() => setIsIncludeAndroid(!isIncludeAndroid)}
                />
                <label
                  for="default-checkbox"
                  class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Include Android
                </label>
              </div>
              <div class="flex items-center mb-4 mt-5">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onChange={() => setIsIncludeiPhone(!isIncludeiPhone)}
                />
                <label
                  for="default-checkbox"
                  class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Include iPhone
                </label>
              </div>
              <div class="flex items-center mb-4 mt-5">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onChange={() => setIsIncludeiPad(!isIncludeiPad)}
                />
                <label
                  for="default-checkbox"
                  class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Include iPad
                </label>
              </div>

              {isIncludeAndroid && (
                <>
                  <h1 className="text-white font-semibold mt-5">Android </h1>

                  <div className="mt-5">
                    <input
                      type="text"
                      id="first_name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Name"
                      value={androidName}
                      onChange={(e) => setAndroidName(e.target.value)}
                    />
                  </div>
                  <div className="mt-5">
                    <input
                      type="text"
                      id="first_name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Url"
                      value={androidURL}
                      onChange={(e) => setAndroidURL(e.target.value)}
                    />
                    <span className="text-white text-xs">
                      Your app’s custom URL scheme (you must include “://” after
                      your scheme name).
                    </span>
                  </div>
                  <div className="mt-5">
                    <input
                      type="text"
                      id="first_name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Url"
                      value={androidId}
                      onChange={(e) => setAndroidId(e.target.value)}
                    />
                    <span className="text-white text-xs">
                      The numeric representation of your app ID in Google Play
                      (i.e. “com.android.app”).
                    </span>
                  </div>
                </>
              )}
              {isIncludeiPhone && (
                <>
                  <h1 className="text-white font-semibold mt-5">iPhone </h1>

                  <div className="mt-5">
                    <input
                      type="text"
                      id="first_name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Name"
                      value={iPhoneName}
                      onChange={(e) => setIPhoneName(e.target.value)}
                    />
                  </div>
                  <div className="mt-5">
                    <input
                      type="text"
                      id="first_name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Url"
                      value={iPhoneURL}
                      onChange={(e) => setIPhoneURL(e.target.value)}
                    />
                    <span className="text-white text-xs">
                      Your app’s custom URL scheme (you must include “://” after
                      your scheme name).
                    </span>
                  </div>
                  <div className="mt-5">
                    <input
                      type="text"
                      id="first_name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Url"
                      value={iPhoneId}
                      onChange={(e) => setIPhoneId(e.target.value)}
                    />
                    <span className="text-white text-xs">
                      The numeric representation of your app ID in Google Play
                      (i.e. “com.android.app”).
                    </span>
                  </div>
                </>
              )}

              {isIncludeiPad && (
                <>
                  <h1 className="text-white font-semibold mt-5">iPad </h1>

                  <div className="mt-5">
                    <input
                      type="text"
                      id="first_name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Name"
                      value={ipadName}
                      onChange={(e) => setIpadName(e.target.value)}
                    />
                  </div>
                  <div className="mt-5">
                    <input
                      type="text"
                      id="first_name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Url"
                      value={ipadURL}
                      onChange={(e) => setIpadURL(e.target.value)}
                    />
                    <span className="text-white text-xs">
                      Your app’s custom URL scheme (you must include “://” after
                      your scheme name).
                    </span>
                  </div>
                  <div className="mt-5">
                    <input
                      type="text"
                      id="first_name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Url"
                      value={ipadId}
                      onChange={(e) => setIpadId(e.target.value)}
                    />
                    <span className="text-white text-xs">
                      The numeric representation of your app ID in Google Play
                      (i.e. “com.android.app”).
                    </span>
                  </div>
                </>
              )}
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

export default App;
