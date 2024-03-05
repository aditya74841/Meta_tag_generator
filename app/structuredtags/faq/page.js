"use client";
import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const FAQ = () => {
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    let month = d.getMonth() + 1;
    if (month < 10) month = `0${month}`;
    let day = d.getDate();
    if (day < 10) day = `0${day}`;
    return `${year}-${month}-${day}`;
  };

  const [items, setItems] = useState([{ question: "", answer: "" }]);
  const [jsonText, setJsonText] = useState("");

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const list = [...items];
    list[index][name] = value;
    setItems(list);
    generateJson(list); // Update JSON whenever input changes
  };

  const handleAddItem = () => {
    setItems([...items, { question: "", answer: "" }]);
    generateJson([...items, { question: "", answer: "" }]);
  };

  const handleRemoveItem = (index) => {
    const list = [...items];
    list.splice(index, 1);
    setItems(list);
    generateJson(list); // Update JSON whenever an item is removed
  };

  const generateJson = (updatedItems) => {
    const jsonData = {
      "@context": "http://schema.org/",
      "@type": "FAQPage",
      mainEntity: updatedItems.map((item, index) => ({
        "@type": "Question",
        name: item.name,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.url,
        },
      })),
    };
    setJsonText(JSON.stringify(jsonData, null, 2));
  };
  return (
    <div className="px-3">
      <h1 className="text-white text-xl text-bold">
        FAQ Structured Data Generator
      </h1>

      <div className="flex mt-5">
        <div className="w-full border">
          <h1 className="text-white uppercase font-semibold py-1 pl-5 bg-slate-600">
            OPTIONS
          </h1>
          <div className="py-4 px-5 bg-gray-800">
            <form>
              {items.map((item, index) => (
                <div key={index} className="mt-5">
                  <label
                    htmlFor={`name${index}`}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    FAQ Question
                  </label>
                  <input
                    type="text"
                    id={`name${index}`}
                    name="name"
                    value={item.name}
                    onChange={(e) => handleInputChange(index, e)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Faq Question"
                  />

                  <label
                    htmlFor={`url${index}`}
                    className="block mt-3 mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    FAQ Answer
                  </label>
                  <input
                    type="text"
                    id={`url${index}`}
                    name="url"
                    value={item.url}
                    onChange={(e) => handleInputChange(index, e)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter FAQ Answer"
                  />
                  {index !== 0 && (
                    <button
                      type="button"
                      className="mt-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      onClick={() => handleRemoveItem(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <div className="mt-5">
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={handleAddItem}
                >
                  Add Item
                </button>
              </div>
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
              <CopyToClipboard
                text={`<script type="application/ld+json">\n${jsonText}\n</script>`}
              >
                <div className="ml-auto w-1/6">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Copy
                  </button>
                </div>
              </CopyToClipboard>
            </div>
            <div className="space-y-2 mt-5 ml-4">
              <pre className="text-white">
                {`<script type="application/ld+json">\n`}
                {jsonText}
                {`\n</script>`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
