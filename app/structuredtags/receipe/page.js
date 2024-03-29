"use client";

import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { currencies, timezones } from "@/app/constant";
const Receipe = () => {
  const [receipeName, setReceipeName] = useState("");
  const [receipeCategory, setReceipeCategory] = useState("");
  const [receipeCuisine, setReceipeCuisine] = useState("");
  const [receipePrep, setReceipePrep] = useState("");
  const [receipePrepTime, setReceipePrepTime] = useState("Minutes");
  const [receipeCook, setReceipeCook] = useState("");
  const [receipeCookTime, setReceipeCookTime] = useState("Minutes");
  const [receipeTotal, setReceipeTotal] = useState("");
  const [receipeTotalTime, setReceipeTotalTime] = useState("Minutes");
  const [yieldData, setYieldData] = useState("");
  const [datePublished, setDatePublished] = useState("");
  const [description, setDescription] = useState("");
  const [keyWords, setKeyWords] = useState("");
  const [isIncludeAuthor, setIsIncludeAuthor] = useState(true);
  const [isIncludeNutrition, setIsIncludeNutrition] = useState(true);
  const [isIncludeRating, setIsIncludeRating] = useState(false);
  const [isIncludeVideo, setIsIncludeVideo] = useState(false);
  const [authorType, setAuthorType] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [nutritionServingSize, setNutritionServingSize] = useState("");
  const [nutritionCalories, setNutritionCalories] = useState("");
  const [nutionCarbohydrates, setNutritionCarbohydrates] = useState("");
  const [nutritionFat, setNutritionFat] = useState("");
  const [nutritionProtien, setNutritionProtien] = useState("");
  const [nutritionSodium, setNutritionSodium] = useState("");
  const [nutritionSugar, setNutritionSugar] = useState("");
  const [numberOfRatings, setNumberOfRatings] = useState("");
  const [numberofReviews, setNumberOfReviews] = useState("");
  const [ratingValue, setRatingValue] = useState("");
  const [wrostValue, setWrostValue] = useState("");
  const [bestValue, setBestValue] = useState("");
  const [videoName, setVideoName] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [videoDateUploaded, setVideoDateUploaded] = useState("");
  const [videoContentUrl, setVideoContentUrl] = useState("");
  const [videoEmbedUrl, setVideoEmbedUrl] = useState("");
  const [thumbnailImageUrl, setThumbnailImageUrl] = useState("");

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
  const json = {
    "@context": "http://schema.org/",
    "@type": "Recipe",

    ...(receipeName && { name: receipeName }),
    ...(tools.length > 0 && { image: tools.map((tool) => tool.name) }),
    ...(receipeCategory && { recipeCategory: receipeCategory }),
    ...(receipeCuisine && { recipeCuisine: receipeCuisine }),
    ...(receipePrep &&
      receipePrepTime && {
        prepTime: `PT${receipePrep}${receipePrepTime.charAt(0).toUpperCase()}`,
      }),
    ...(receipeCook &&
      receipeCookTime && {
        cookTime: `PT${receipeCook}${receipeCookTime.charAt(0).toUpperCase()}`,
      }),
    ...(receipeTotal &&
      receipeTotalTime && {
        totalTime: `PT${receipeTotal}${receipeTotalTime
          .charAt(0)
          .toUpperCase()}`,
      }),
    ...(yieldData && { recipeYield: yieldData }),
    ...(datePublished && { datePublished: datePublished }),
    ...(description && { description: description }),
    ...(keyWords && { keywords: keyWords }),
    author: isIncludeAuthor
      ? {
          "@type": authorType,
          name: authorName,
        }
      : undefined,
    nutrition: isIncludeNutrition
      ? {
          "@type": "NutritionInformation",
          ...(nutritionServingSize && { servingSize: nutritionServingSize }),
          ...(nutritionCalories && { calories: nutritionCalories }),
          ...(nutionCarbohydrates && {
            carbohydrateContent: nutionCarbohydrates,
          }),
          ...(nutritionFat && { fatContent: nutritionFat }),
          ...(nutritionProtien && { proteinContent: nutritionProtien }),
          ...(nutritionSodium && { sodiumContent: nutritionSodium }),
          ...(nutritionSugar && { sugarContent: nutritionSugar }),
        }
      : undefined,
    aggregateRating: isIncludeRating
      ? {
          "@type": "AggregateRating",
          ratingValue: ratingValue,
          ratingCount: numberOfRatings,
          reviewCount: numberofReviews,
          worstRating: wrostValue,
          bestRating: bestValue,
        }
      : undefined,
    video: isIncludeVideo
      ? {
          "@type": "VideoObject",
          name: videoName,
          description: videoDescription,
          uploadDate: videoDateUploaded,
          contentUrl: videoContentUrl,
          embedUrl: videoEmbedUrl,
          thumbnailUrl: thumbnailImageUrl,
        }
      : undefined,
    image: tools.length > 0 ? tools.map((tool) => tool.name) : [], // Include supply names in images if isIncludeSupply is true
    recipeIngredient:
      supplies.length > 0 ? supplies.map((supply) => supply.name) : [], // Include supply names in recipe ingredients if isIncludeSupply is true
    recipeInstructions: steps.map((step) => ({
      "@type": "HowToStep",
      name: step.name,
      text: step.instructions,
      image: step.imageUrl,
      url: step.url,
    })),
  };

  const jsonText = JSON.stringify(json, null, 2);

  return (
    <div className="px-3">
      <h1 className="text-white text-xl text-bold">
        Recipe Structured Data Generator
      </h1>

      <div className="flex mt-5">
        <div className="w-full border">
          <h1 className="text-white uppercase font-semibold py-1 pl-5 bg-slate-600">
            OPTIONS
          </h1>
          <div className="py-4 px-5 bg-gray-800">
            <form>
              <h1 className="text-white font-semibold mt-5">Receipe </h1>
              <div className="mt-5">
                <input
                  type="text"
                  id="first_name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Receipe Name"
                  value={receipeName}
                  onChange={(e) => setReceipeName(e.target.value)}
                />
              </div>

              <div className="mt-5">
                <input
                  type="text"
                  id="first_name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Category Name"
                  value={receipeCategory}
                  onChange={(e) => setReceipeCategory(e.target.value)}
                />
                <span className="text-white text-xs">
                  The type of meal or course your recipe is about. For example:
                  “dinner”, “main course”, or “dessert, snack”.
                </span>
              </div>

              <div className="mt-5">
                <input
                  type="text"
                  id="first_name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Cuisine Name"
                  value={receipeCuisine}
                  onChange={(e) => setReceipeCuisine(e.target.value)}
                />
              </div>

              <div className="mt-5 flex justify-between">
                <div className="w-4/6">
                  <input
                    type="number"
                    id="first_name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Prep Time"
                    value={receipePrep}
                    onChange={(e) => setReceipePrep(e.target.value)}
                  />
                </div>
                <div className="w-1/4 ml-auto">
                  <select
                    id="type"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={receipePrepTime}
                    onChange={(e) => setReceipePrepTime(e.target.value)}
                  >
                    <option>Select Time Type</option>
                    <option value="Minutes">Minutes</option>
                    <option value="Hours">Hours</option>
                  </select>
                </div>
              </div>

              <div className="mt-5 flex justify-between">
                <div className="w-4/6">
                  <input
                    type="number"
                    id="first_name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Cook time"
                    value={receipeCook}
                    onChange={(e) => setReceipeCook(e.target.value)}
                  />
                </div>
                <div className="w-1/4 ml-auto">
                  <select
                    id="type"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={receipeCookTime}
                    onChange={(e) => setReceipeCookTime(e.target.value)}
                  >
                    <option>Select Time Type</option>
                    <option value="Minutes">Minutes</option>
                    <option value="Hours">Hours</option>
                  </select>
                </div>
              </div>

              <div className="mt-5 flex justify-between">
                <div className="w-4/6">
                  <input
                    type="number"
                    id="first_name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Total time"
                    value={receipeTotal}
                    onChange={(e) => setReceipeTotal(e.target.value)}
                  />
                </div>
                <div className="w-1/4 ml-auto">
                  <select
                    id="type"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={receipeTotalTime}
                    onChange={(e) => setReceipeTotalTime(e.target.value)}
                  >
                    <option>Select Time Type</option>
                    <option value="Minutes">Minutes</option>
                    <option value="Hours">Hours</option>
                  </select>
                </div>
              </div>

              <div className="mt-5">
                <input
                  type="text"
                  id="first_name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Yield "
                  value={yieldData}
                  onChange={(e) => setYieldData(e.target.value)}
                />
              </div>

              <div className="mt-5">
                <input
                  type="date"
                  id="first_name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={datePublished}
                  onChange={(e) => setDatePublished(e.target.value)}
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

              <div className="mt-5">
                <label
                  for="message"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Keywords
                </label>
                <textarea
                  id="message"
                  rows="2"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Keywords"
                  value={keyWords}
                  onChange={(e) => setKeyWords(e.target.value)}
                ></textarea>
              </div>

              <div class="flex items-center mb-4 mt-5">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  defaultChecked
                  onChange={() => {
                    setIsIncludeAuthor(!isIncludeAuthor);
                  }}
                />
                <label
                  for="default-checkbox"
                  class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Include author
                </label>
              </div>

              <div class="flex items-center mb-4">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  defaultChecked
                  onChange={() => {
                    setIsIncludeNutrition(!isIncludeNutrition);
                  }}
                />
                <label
                  for="default-checkbox"
                  class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Include nutrition (calories, fat, etc.)
                </label>
              </div>
              <div class="flex items-center mb-4">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onChange={() => {
                    setIsIncludeRating(!isIncludeRating);
                  }}
                />
                <label
                  for="default-checkbox"
                  class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Include rating
                </label>
              </div>

              <div class="flex items-center mb-4">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onChange={() => {
                    setIsIncludeVideo(!isIncludeVideo);
                  }}
                />
                <label
                  for="default-checkbox"
                  class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Include video
                </label>
              </div>

              <h1 className="text-white font-semibold mt-5">Images </h1>

              <div className="mt-5">
                {tools.map((tool, index) => (
                  <div
                    key={index}
                    className="flex items-center  justify-center space-x-3 space-y-2"
                  >
                    <input
                      type="text"
                      className="bg-gray-50 border   border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={`Image #${index + 1}`}
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
                  Add Image
                </button>
              </div>

              <h1 className="text-white font-semibold mt-5">Ingredients </h1>

              <div className="mt-5">
                {supplies.map((supply, index) => (
                  <div
                    key={index}
                    className="flex items-center  justify-center space-x-3 space-y-2"
                  >
                    <input
                      type="text"
                      className="bg-gray-50 border   border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={`Ingredient #${index + 1}`}
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
                  Add Ingredient
                </button>
              </div>

           `   <div>
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
              </div>`

              {isIncludeAuthor && (
                <>
                  <h1 className="text-white font-semibold mt-5">Author </h1>

                  <div className="mt-5">
                    <select
                      id="type"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={authorType}
                      onChange={(e) => setAuthorType(e.target.value)}
                    >
                      <option>Select Author Type</option>
                      <option value="Organizations">Organizations</option>
                      <option value="Person">Person</option>
                    </select>
                  </div>
                  <div className="mt-5">
                    <input
                      type="text"
                      id="first_name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter Author Name"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                    />
                  </div>
                </>
              )}

              {isIncludeNutrition && (
                <>
                  <h1 className="text-white font-semibold mt-5">Nutrition </h1>

                  <div className="mt-5">
                    <input
                      type="text"
                      id="first_name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter Serving size"
                      value={nutritionServingSize}
                      onChange={(e) => setNutritionServingSize(e.target.value)}
                    />
                    <span className="text-white text-xs">
                      For example, “Per 1/2 cup”.
                    </span>
                  </div>
                  <div className="mt-5">
                    <input
                      type="text"
                      id="first_name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter Calories"
                      value={nutritionCalories}
                      onChange={(e) => setNutritionCalories(e.target.value)}
                    />
                  </div>
                  <div className="mt-5">
                    <input
                      type="text"
                      id="first_name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter Carbohydrates (g)"
                      value={nutionCarbohydrates}
                      onChange={(e) =>
                        setNutritionCarbohydrates(e.target.value)
                      }
                    />
                  </div>

                  <div className="mt-5">
                    <input
                      type="text"
                      id="first_name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter Fat (g)"
                      value={nutritionFat}
                      onChange={(e) => setNutritionFat(e.target.value)}
                    />
                  </div>

                  <div className="mt-5">
                    <input
                      type="text"
                      id="first_name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter Protien (g)"
                      value={nutritionProtien}
                      onChange={(e) => setNutritionProtien(e.target.value)}
                    />
                  </div>
                  <div className="mt-5">
                    <input
                      type="text"
                      id="first_name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter Sodium (g)"
                      value={nutritionSodium}
                      onChange={(e) => setNutritionSodium(e.target.value)}
                    />
                  </div>
                  <div className="mt-5">
                    <input
                      type="text"
                      id="first_name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter Sugar (g)"
                      value={nutritionSugar}
                      onChange={(e) => setNutritionSugar(e.target.value)}
                    />
                  </div>
                </>
              )}

              {isIncludeRating && (
                <>
                  <h1 className="text-white font-semibold mt-5">
                    Aggregate rating
                  </h1>

                  <div className="mt-5">
                    <input
                      type="text"
                      id="first_name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter Number of ratings"
                      value={numberOfRatings}
                      onChange={(e) => setNumberOfRatings(e.target.value)}
                    />
                    <span className="text-white text-xs">
                      The total number of ratings for the item on your site.
                    </span>
                  </div>
                  <div className="mt-5">
                    <input
                      type="text"
                      id="first_name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter Number of reviews"
                      value={numberofReviews}
                      onChange={(e) => setNumberOfReviews(e.target.value)}
                    />
                    <span className="text-white text-xs">
                      Specifies the number of people who provided a review with
                      or without an accompanying rating.
                    </span>
                  </div>
                  <div className="mt-5">
                    <input
                      type="text"
                      id="first_name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter Rating value"
                      value={ratingValue}
                      onChange={(e) => setRatingValue(e.target.value)}
                    />
                    <span className="text-white text-xs">
                      A numerical quality rating for the item. The default scale
                      for numbers is a 5-point scale, where 1 is the lowest
                      value and 5 is the highest value. If another scale is
                      intended, use worstRating and bestRating below.
                    </span>
                  </div>

                  <div className="mt-5">
                    <input
                      type="text"
                      id="first_name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter Wrost value"
                      value={wrostValue}
                      onChange={(e) => setWrostValue(e.target.value)}
                    />
                    <span className="text-white text-xs">
                      The lowest value allowed in this rating system. If
                      omitted, 1 is assumed.
                    </span>
                  </div>

                  <div className="mt-5">
                    <input
                      type="text"
                      id="first_name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter Best value"
                      value={bestValue}
                      onChange={(e) => setBestValue(e.target.value)}
                    />
                    <span className="text-white text-xs">
                      The highest value allowed in this rating system. If
                      omitted, 5 is assumed.
                    </span>
                  </div>
                </>
              )}
              {isIncludeVideo && (
                <>
                  <h1 className="text-white font-semibold mt-5">Video</h1>

                  <div className="mt-5">
                    <input
                      type="text"
                      id="first_name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter Video Name"
                      value={videoName}
                      onChange={(e) => setVideoName(e.target.value)}
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
                      placeholder="Enter Video Description"
                      value={videoDescription}
                      onChange={(e) => setVideoDescription(e.target.value)}
                    ></textarea>
                  </div>

                  <div className="mt-5">
                    <input
                      type="date"
                      id="first_name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter Video Name"
                      value={videoName}
                      onChange={(e) => setVideoName(e.target.value)}
                    />
                  </div>

                  <div className="mt-5">
                    <input
                      type="text"
                      id="first_name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter Content Url"
                      value={videoContentUrl}
                      onChange={(e) => setVideoContentUrl(e.target.value)}
                    />
                  </div>

                  <div className="mt-5">
                    <input
                      type="text"
                      id="first_name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter Embed Url"
                      value={videoEmbedUrl}
                      onChange={(e) => setVideoEmbedUrl(e.target.value)}
                    />
                  </div>

                  <div className="mt-5">
                    <input
                      type="text"
                      id="first_name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter Thumbnail image Url"
                      value={thumbnailImageUrl}
                      onChange={(e) => setThumbnailImageUrl(e.target.value)}
                    />
                  </div>
                </>
              )}
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

export default Receipe;
