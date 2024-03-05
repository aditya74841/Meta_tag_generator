"use client";

import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { currencies, timezones } from "@/app/constant";
const Article = () => {
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
  const [author, setAuthor] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [datePublished, setDatePublished] = useState("");
  const [dateModified, setDateModified] = useState("");
  const [section, setSection] = useState("");
  const [tags, setTags] = useState("");

//   const generateMetaData = () => {
//     return (
//       <>
//         <meta property="og:type" content="article" />
//         <meta property="og:title" content={title} />
//         <meta property="og:url" content={url} />
//         <meta property="og:image" content={imageUrl} />
//         <meta property="og:description" content={description} />
//         <meta property="article:author" content={author} />
//         <meta property="article:published_time" content={datePublished} />
//         <meta property="article:modified_time" content={dateModified} />
//         <meta property="article:section" content={section} />
//         <meta property="article:tag" content={tags} />
//       </>
//     );
//   };

const metaOGType = `<meta property="og:type" content="article" />`;
const metaOGTitle = `<meta property="og:title" content="${title}" />`;
const metaOGUrl = `<meta property="og:url" content="${url}" />`;
const metaOGImage = `<meta property="og:image" content="${imageUrl}" />`;
const metaOGDescription = `<meta property="og:description" content="${description}" />`;
const metaArticleAuthor = `<meta property="article:author" content="${author}" />`;
const metaArticlePublishedTime = `<meta property="article:published_time" content="${datePublished}" />`;
const metaArticleModifiedTime = `<meta property="article:modified_time" content="${dateModified}" />`;
const metaArticleSection = `<meta property="article:section" content="${section}" />`;
const metaArticleTag = `<meta property="article:tag" content="${tags}" />`;





  //   const jsonText = JSON.stringify(generateMetaData(), null, 2);

  return (
    <div className="px-3">
      <h1 className="text-white text-xl text-bold">
        Article Open Graph Generator
      </h1>

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
                  placeholder="Enter Title"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>

              <div className="mt-5">
                <label
                  htmlFor="type"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Time Zone
                </label>
                <select
                  id="type"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={timeZone}
                  onChange={(e) => setTimeZone(e.target.value)}
                >
                  {timezones.map((timizone) => (
                    <option key={timizone.value} value={timizone.value}>
                      {timizone.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-5">
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date Published
                </label>
                <input
                  type="datetime-local"
                  id="first_name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={datePublished}
                  onChange={(e) => setDatePublished(e.target.value)}
                />
                <span className="text-white text-xs">
                  Time must be in 24-hour format.
                </span>
              </div>
              <div className="mt-5">
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date Modified
                </label>
                <input
                  type="datetime-local"
                  id="first_name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={dateModified}
                  onChange={(e) => setDateModified(e.target.value)}
                />
                <span className="text-white text-xs">
                  Time must be in 24-hour format.
                </span>
              </div>
              <div className="mt-5">
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Section
                </label>
                <input
                  type="text"
                  id="first_name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Url"
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                />
                <span className="text-white text-xs">
                  A high-level section name. For example, “Technology.”
                </span>
              </div>
              <div className="mt-5">
                <label
                  for="message"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tags
                </label>
                <textarea
                  id="message"
                  rows="2"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Url"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                ></textarea>
                <span className="text-white text-xs">
                  Comma separated list of tags words associated with this
                  article.
                </span>
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
            <CopyToClipboard
              text={`<meta property="og:type" content="article">
              <meta property="og:title" content=${title} />
              <meta property="og:url" content=${url} />
              <meta property="og:image" content=${imageUrl} />
              <meta property="og:description" content=${description} />
              <meta property="article:author" content=${author} />
              <meta property="article:published_time" content=${datePublished} />
              <meta property="article:modified_time" content=${dateModified} />
              <meta property="article:section" content=${section} />
              <meta property="article:tag" content=${tags} />`}
            >
              <div className="ml-auto w-1/6 mt-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Copy
                </button>
              </div>
            </CopyToClipboard>

            <div className="space-y-2 mt-5 ml-4">
              <pre className="text-white">
                <pre className="text-white">
                  {`<meta property="og:type" content="article">
<meta property="og:title" content=${title} />
<meta property="og:url" content=${url} />
<meta property="og:image" content=${imageUrl} />
<meta property="og:description" content=${description} />
<meta property="article:author" content=${author} />
<meta property="article:published_time" content=${datePublished} />
<meta property="article:modified_time" content=${dateModified} />
<meta property="article:section" content=${section} />
<meta property="article:tag" content=${tags} />`}
                </pre>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
