"use client";

import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { currencies, timezones } from "@/app/constant";
const HowTo = () => {
  const [isIncludeTools, setIsIncludeTools] = useState(false);
  const [isIncludeSupply, setIsIncludeSupply] = useState(false);
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [currencyType, setCurrencyType] = useState("USD");
  const [totalTime, setTotalTime] = useState(0);
  const [timeType, setTimeType] = useState("");

  const [supplies, setSupplies] = useState([{ name: "" }]);

  const handleAddSupply = () => {
    setSupplies([...supplies, { name: "" }]);
  };

  const handleDeleteSupply = (index) => {
    const updatedsupplies = [...supplies];
    updatedsupplies.splice(index, 1);
    setSupplies(updatedsupplies);
  };

  const [tools, setTools] = useState([{ name: "" }]);

  const handleAddTools = () => {
    setTools([...tools, { name: "" }]);
  };

  const handleDeleteTools = (index) => {
    const updatedtools = [...tools];
    updatedtools.splice(index, 1);
    setTools(updatedtools);
  };

  const [steps, setSteps] = useState([
    { name: "", instructions: "", imageUrl: "", url: "" },
  ]);

  const handleAddStep = () => {
    setSteps([...steps, { name: "", instructions: "", imageUrl: "", url: "" }]);
  };

  const handleDeleteStep = (index) => {
    const updatedSteps = [...steps];
    updatedSteps.splice(index, 1);
    setSteps(updatedSteps);
  };

  const generateJSON = () => {
    const supplyArray = isIncludeSupply
      ? supplies.map((supply) => ({
          "@type": "HowToSupply",
          name: supply.name,
        }))
      : [];
    const toolArray = isIncludeTools
      ? tools.map((tool) => ({ "@type": "HowToTool", name: tool.name }))
      : [];
    const stepArray = steps.map((step) => ({
      "@type": "HowToStep",
      name: step.name,
      text: step.instructions,
      image: step.imageUrl,
      url: step.url,
    }));

    const json = {
      "@context": "http://schema.org/",
      "@type": "HowTo",
      name: eventName,
      description: description,
      image: imageUrl,
      totalTime: `PT${totalTime}${timeType.charAt(0).toUpperCase()}`,
      estimatedCost: {
        "@type": "MonetaryAmount",
        currency: currencyType,
        value: price,
      },
      ...(isIncludeSupply && { supply: supplyArray }),
      ...(isIncludeTools && { tool: toolArray }),
      step: stepArray,
    };

    return JSON.stringify(json, null, 2);
  };
  const jsonText = generateJSON();

  return (
    <div className="px-3">
      <h1 className="text-white text-xl text-bold">
      How-to Structured Data Generator

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
                  Enter Event Name
                </label>
                <input
                  type="text"
                  id="first_name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Event Name"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
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
                  rows="2"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="mt-5 flex justify-between">
                <div className="w-4/6">
                  <label
                    for="first_name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Estimate Cost
                  </label>
                  <input
                    type="number"
                    id="first_name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Estimate Cost"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="w-1/4 ml-auto">
                  <label
                    htmlFor="type"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Currency Type
                  </label>
                  <select
                    id="type"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={currencyType}
                    onChange={(e) => setCurrencyType(e.target.value)}
                  >
                    {currencies.map((currency) => (
                      <option key={currency.value} value={currency.value}>
                        {currency.label}
                      </option>
                    ))}
                  </select>
                </div>
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
              </div>

              <div className="mt-5 flex justify-between">
                <div className="w-4/6">
                  <label
                    for="first_name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Total Time
                  </label>
                  <input
                    type="number"
                    id="first_name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Estimate Cost"
                    value={totalTime}
                    onChange={(e) => setTotalTime(e.target.value)}
                  />
                </div>
                <div className="w-1/4 ml-auto">
                  <label
                    htmlFor="type"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Time Type
                  </label>
                  <select
                    id="type"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={timeType}
                    onChange={(e) => setTimeType(e.target.value)}
                  >
                    <option value="Minutes">Minutes</option>
                    <option value="Hours">Hours</option>
                  </select>
                </div>
              </div>

              <div class="flex mt-5 ">
                <div class="flex items-center h-5 mt-1">
                  <input
                    id="helper-checkbox"
                    aria-describedby="helper-checkbox-text"
                    type="checkbox"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    value={isIncludeSupply}
                    // defaultChecked
                    onChange={(e) => setIsIncludeSupply(!isIncludeSupply)}
                  />
                </div>
                <div class="ml-4 ">
                  <label
                    for="helper-checkbox"
                    class="font-medium text-gray-900 dark:text-gray-300 text-lg"
                  >
                    Include Supplies
                  </label>
                  <p
                    id="helper-checkbox-text"
                    class="text-xs font-normal text-gray-500 dark:text-gray-300"
                  >
                    A supply consumed when performing the instructions.
                  </p>
                </div>
              </div>

              <div class="flex mt-5 ">
                <div class="flex items-center h-5 mt-1">
                  <input
                    id="helper-checkbox"
                    aria-describedby="helper-checkbox-text"
                    type="checkbox"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    value={isIncludeTools}
                    onChange={(e) => setIsIncludeTools(!isIncludeTools)}
                  />
                </div>
                <div class="ml-4 ">
                  <label
                    for="helper-checkbox"
                    class="font-medium text-gray-900 dark:text-gray-300 text-lg"
                  >
                    Include Tools
                  </label>
                  <p
                    id="helper-checkbox-text"
                    class="text-xs font-normal text-gray-500 dark:text-gray-300"
                  >
                    A tool used (but not consumed) when performing instructions.
                  </p>
                </div>
              </div>

              {isIncludeSupply && (
                <>
                  <h1 className="text-white font-semibold mt-5">Supplies </h1>

                  <div className="mt-5">
                    {supplies.map((supply, index) => (
                      <div
                        key={index}
                        className="flex items-center  justify-center space-x-3 space-y-2"
                      >
                        <input
                          type="text"
                          className="bg-gray-50 border   border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder={`Supply #${index + 1}`}
                          value={supply.name}
                          onChange={(e) => {
                            const updatedsupplies = [...supplies];
                            updatedsupplies[index].name = e.target.value;
                            setSupplies(updatedsupplies);
                          }}
                        />

                        {supplies.length > 1 && (
                          <button
                            type="button"
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline"
                            onClick={() => handleDeleteSupply(index)}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Add button to add musician */}
                  <div className="mt-5">
                    <button
                      type="button"
                      className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      onClick={handleAddSupply}
                    >
                      Add Supply
                    </button>
                  </div>
                </>
              )}

              {isIncludeTools && (
                <>
                  <h1 className="text-white font-semibold mt-5">Tools </h1>

                  <div className="mt-5">
                    {tools.map((tool, index) => (
                      <div
                        key={index}
                        className="flex items-center  justify-center space-x-3 space-y-2"
                      >
                        <input
                          type="text"
                          className="bg-gray-50 border   border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder={`Tool #${index + 1}`}
                          value={tool.name}
                          onChange={(e) => {
                            const updatedtools = [...tools];
                            updatedtools[index].name = e.target.value;
                            setTools(updatedtools);
                          }}
                        />

                        {tools.length > 1 && (
                          <button
                            type="button"
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline"
                            onClick={() => handleDeleteTools(index)}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Add button to add musician */}
                  <div className="mt-5">
                    <button
                      type="button"
                      className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      onClick={handleAddTools}
                    >
                      Add Tool
                    </button>
                  </div>
                </>
              )}

              {/* <div>
                <h1 className="text-white font-semibold mt-5">Step </h1>
                <p className="text-white text-sm font-semibold mt-2">Step #1</p>
                <div className="mt-5">
                  <input
                    type="text"
                    id="first_name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter  Name"
                    // value={eventName}
                    // onChange={(e) => setEventName(e.target.value)}
                  />
                </div>

                <div className="mt-5">
                  <textarea
                    id="message"
                    rows="2"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Instructions"
                    // value={description}
                    // onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="mt-5">
                  <input
                    type="text"
                    id="first_name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Image Url"
                    // value={eventName}
                    // onChange={(e) => setEventName(e.target.value)}
                  />
                </div>
                <div className="mt-5">
                  <input
                    type="text"
                    id="first_name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Url"
                    // value={eventName}
                    // onChange={(e) => setEventName(e.target.value)}
                  />
                  <span className="text-white text-xs">
                    A URL that directly links to the step (if one is available).
                    For example, an anchor link fragment.
                  </span>
                </div>
              </div>
              <div className="mt-5">
                <button
                  type="button"
                  className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                
                >
                  Add Step
                </button>
              </div> */}
              <div>
                <h1 className="text-white font-semibold mt-5">Steps </h1>
                {steps.map((step, index) => (
                  <div key={index} className="mt-5">
                    <h2 className="text-white text-sm font-semibold mt-2">
                      Step #{index + 1}
                    </h2>
                    <div className="mt-5">
                      <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter Name"
                        value={step.name}
                        onChange={(e) => {
                          const updatedSteps = [...steps];
                          updatedSteps[index].name = e.target.value;
                          setSteps(updatedSteps);
                        }}
                      />
                    </div>
                    <div className="mt-5">
                      <textarea
                        rows="2"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter Instructions"
                        value={step.instructions}
                        onChange={(e) => {
                          const updatedSteps = [...steps];
                          updatedSteps[index].instructions = e.target.value;
                          setSteps(updatedSteps);
                        }}
                      ></textarea>
                    </div>
                    <div className="mt-5">
                      <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Image Url"
                        value={step.imageUrl}
                        onChange={(e) => {
                          const updatedSteps = [...steps];
                          updatedSteps[index].imageUrl = e.target.value;
                          setSteps(updatedSteps);
                        }}
                      />
                    </div>
                    <div className="mt-5">
                      <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Url"
                        value={step.url}
                        onChange={(e) => {
                          const updatedSteps = [...steps];
                          updatedSteps[index].url = e.target.value;
                          setSteps(updatedSteps);
                        }}
                      />
                      <span className="text-white text-xs">
                        A URL that directly links to the step (if one is
                        available). For example, an anchor link fragment.
                      </span>
                    </div>
                    {steps.length > 1 && (
                      <div className="mt-2">
                        <button
                          type="button"
                          className=" text-sm p-4 bg-red-600 text-white rounded "
                          onClick={() => handleDeleteStep(index)}
                        >
                          Delete Step
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                <div className="mt-5">
                  <button
                    type="button"
                    className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleAddStep}
                  >
                    Add Step
                  </button>
                </div>
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
                <pre className="text-white">
                  {`<script type="application/ld+json">\n`}
                  {jsonText}
                  {`\n</script>`}
                </pre>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowTo;
