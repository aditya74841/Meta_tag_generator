"use client";
import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
const charsets = [
  { value: "big5", label: "Big5" },
  { value: "euc-kr", label: "EUC-KR" },
  { value: "iso-8859-1", label: "ISO-8859-1" },
  { value: "iso-8859-2", label: "ISO-8859-2" },
  { value: "iso-8859-3", label: "ISO-8859-3" },
  { value: "iso-8859-4", label: "ISO-8859-4" },
  { value: "iso-8859-5", label: "ISO-8859-5" },
  { value: "iso-8859-6", label: "ISO-8859-6" },
  { value: "iso-8859-7", label: "ISO-8859-7" },
  { value: "iso-8859-8", label: "ISO-8859-8" },
  { value: "koi8-r", label: "KOI8-R" },
  { value: "shift-jis", label: "Shift-JIS" },
  { value: "x-euc", label: "X-EUC" },
  { value: "utf-8", label: "UTF-8" },
  { value: "windows-1250", label: "Windows-1250" },
  { value: "windows-1251", label: "Windows-1251" },
  { value: "windows-1252", label: "Windows-1252" },
  { value: "windows-1253", label: "Windows-1253" },
  { value: "windows-1254", label: "Windows-1254" },
  { value: "windows-1255", label: "Windows-1255" },
  { value: "windows-1256", label: "Windows-1256" },
  { value: "windows-1257", label: "Windows-1257" },
  { value: "windows-1258", label: "Windows-1258" },
  { value: "windows-874", label: "Windows-874" },
];

const MetaTags = () => {
  const [charsetValue, setCharsetValue] = useState("utf-8");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [copyright, setCopyright] = useState("");
  const [robots, setRobots] = useState("index, follow");
  const [enableViewport, setEnableViewport] = useState(true);

  const metaCharset = `<meta charset="${charsetValue}">`;
  const metaViewport = `<meta name="viewport" content="width=device-width, initial-scale=1">`;
  const metaTitle = `<title>${title}</title>`;
  const metaDescription = `<meta name="description" content="${description}">`;
  const metaAuthor = `<meta name="author" content="${author}">`;
  const metaCopyright = `<meta name="copyright" content="${copyright}">`;
  const metaRobots = `<meta name="robots" content="${robots}">`;

  return (
    <div className="px-3 ">
      <h1 className=" text-white text-xl text-bold ">Meta Tags Generator</h1>
      <p className=" text-white text-sm mt-2">
        {" "}
        Generate your web page’s most helpful meta tags to improve SEO and
        search engine experience.
      </p>
      <div className="flex  mt-5">
        <div className=" w-full border">
          <h1 className="text-white uppercase font-semibold py-1 pl-5 bg-slate-600">
            OPTIONS
          </h1>
          <div className="py-4 px-5 bg-gray-800 ">
            <form class="">
              <div>
                <label
                  htmlFor="countries"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Charset
                </label>
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={charsetValue}
                  onChange={(e) => setCharsetValue(e.target.value)}
                >
                  {/* Map over the charsets array to create options */}
                  {charsets.map((charset) => (
                    <option key={charset.value} value={charset.value}>
                      {charset.label}
                    </option>
                  ))}
                </select>
              </div>

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
                  for="message"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="message"
                  rows="4"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="mt-5">
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Author
                </label>
                <input
                  type="text"
                  id="first_name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>

              <div className="mt-5">
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Copyright
                </label>
                <input
                  type="text"
                  id="first_name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Copyright"
                  value={copyright}
                  onChange={(e) => setCopyright(e.target.value)}
                />
              </div>
              <div className="mt-5">
                <label
                  for="countries"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Robots
                </label>
                <select
                  id="countries"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={robots}
                  onChange={(e) => setRobots(e.target.value)}
                >
                  <option value="index, follow">index, follow</option>
                  <option value="index, nofollow">index, nofollow</option>
                  <option value="noindex, follow">noindex, follow</option>
                  <option value="noindex, nofollow">noindex, nofollow</option>
                </select>
              </div>

              <div class="flex mt-5 ">
                <div class="flex items-center h-5 mt-1">
                  <input
                    id="helper-checkbox"
                    aria-describedby="helper-checkbox-text"
                    type="checkbox"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    value={enableViewport}
                    defaultChecked
                    onChange={(e) => setEnableViewport(!enableViewport)}
                  />
                </div>
                <div class="ml-4 ">
                  <label
                    for="helper-checkbox"
                    class="font-medium text-gray-900 dark:text-gray-300 text-lg"
                  >
                    Enable viewport
                  </label>
                  <p
                    id="helper-checkbox-text"
                    class="text-xs font-normal text-gray-500 dark:text-gray-300"
                  >
                    Enable if your site is responsive.
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className=" w-full border">
          <div>
            <h1 className="text-white uppercase font-semibold py-1 pl-5 bg-slate-600">
              CODE
            </h1>
            <div className="  ">
              <div className="text-white font-semibold py-2 pl-5 text-xs bg-slate-800 ">
                <p className="bg">
                  Copy this to the &lt;head&gt; section of your page.
                </p>
              </div>
              <div className="text-white font-semibold py-1 pl-5 text-xs">
                <CopyToClipboard
                  text={
                    `${metaCharset}\n` +
                    (enableViewport && metaViewport
                      ? `${metaViewport}\n`
                      : "") +
                    (title ? `${metaTitle}\n` : "") +
                    (description ? `${metaDescription}\n` : "") +
                    (author ? `${metaAuthor}\n` : "") +
                    (copyright ? `${metaCopyright}\n` : "") +
                    `${metaRobots}`
                  }
                >
                  <div className="ml-auto w-1/6">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
                      type="button"
                    >
                      Copy
                    </button>
                  </div>
                </CopyToClipboard>

                <div className="space-y-2  mt-5">
                  <p>{metaCharset}</p>

                  <p> {enableViewport && metaViewport}</p>

                  <p> {title.length > 0 && metaTitle}</p>

                  <p> {description.length > 0 && metaDescription}</p>

                  <p>{author.length > 0 && metaAuthor}</p>

                  <p>{copyright.length > 0 && metaCopyright}</p>

                  <p>{metaRobots}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetaTags;
