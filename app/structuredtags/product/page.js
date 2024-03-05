"use client";

import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { currencies, timezones } from "@/app/constant";
const Receipe = () => {
  const [productName, setProductName] = useState("");
  const [prodctBrand, setProdctBrand] = useState("");
  const [productImageUrl, setProductImageUrl] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [identificationProperties, setIdentificationProperties] = useState("");
  const [isIncludeOfferOrAggregateOffer, setIsIncludeOfferOrAggregateOffer] =
    useState(true);
  const [isIncludeRating, setIsIncludeRating] = useState(false);
  const [isIncludeReviews, setIsIncludeReviews] = useState(false);
  const [isAggregateOffer, setIsAggregateOffer] = useState(false);

  const [currency, setCurrency] = useState("");
  const [lowPrice, setLowPrice] = useState("");
  const [highPrice, setHighPrice] = useState("");
  const [numberOfOffers, setNumberOfOffers] = useState("");
  const [url, setUrl] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [priceValidUntil, setPriceValidUntil] = useState("");
  const [availability, setAvailability] = useState("");
  const [condition, setCondition] = useState("");

  const [description, setDescription] = useState("");

  const [numberOfRatings, setNumberOfRatings] = useState("");
  const [numberofReviews, setNumberOfReviews] = useState("");
  const [ratingValue, setRatingValue] = useState("");
  const [wrostValue, setWrostValue] = useState("");
  const [bestValue, setBestValue] = useState("");

  const [reviews, setReviews] = useState([
    {
      title: "",
      author: "",
      date: "",
      ratingvalue: "",
      text: "",
      worstRatingValue: "",
      bestRatingValue: "",
    },
  ]);

  const handleAddReview = () => {
    setReviews([
      ...reviews,
      {
        title: "",
        author: "",
        date: "",
        ratingvalue: "",
        text: "",
        worstRatingValue: "",
        bestRatingValue: "",
      },
    ]);
  };

  const handleDeleteReview = (index) => {
    const updatedReviews = [...reviews];
    updatedReviews.splice(index, 1);
    setReviews(updatedReviews);
  };

  const json = {
    "@context": "http://schema.org/",
    "@type": "Product",
    name: productName,
    image: productImageUrl,
    description: productDescription,
    brand: prodctBrand ? { "@type": "Brand", name: prodctBrand } : undefined,
    offers: isIncludeOfferOrAggregateOffer
      ? isAggregateOffer
        ? {
            "@type": "AggregateOffer",
            priceCurrency: currency,
            lowPrice: lowPrice,
            highPrice: highPrice,
            url: url,
            availability: availability,
            offerCount: numberOfOffers,
          }
        : {
            "@type": "Offer",
            priceCurrency: currency,
            price: offerPrice,
            priceValidUntil: priceValidUntil,
            availability: availability,
            condition: condition,
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
    review: isIncludeReviews
      ? reviews.map((review) => ({
          "@type": "Review",
          name: review.title,
          author: review.author ? { "@type": "Person", name: review.author } : undefined,
          datePublished: review.date,
          reviewBody: review.text,
          reviewRating: {
            "@type": "Rating",
            ratingValue: review.ratingvalue,
            worstRating: review.worstRatingValue,
            bestRating: review.bestRatingValue,
          },
        }))
      : undefined,
  };
  
  const jsonText = JSON.stringify(json, null, 2);

  return (
    <div className="px-3">
      <h1 className="text-white text-xl text-bold">
        Product Structured Data Generator
      </h1>
      <p className="text-white text-sm mt-2">
        AggregateOffer, AggregateRating, Offer and Reviews
      </p>
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
                  placeholder="Enter  Name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>

              <div className="mt-5">
                <input
                  type="text"
                  id="first_name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Brand"
                  value={prodctBrand}
                  onChange={(e) => setProdctBrand(e.target.value)}
                />
              </div>

              <div className="mt-5">
                <input
                  type="text"
                  id="first_name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Image Url"
                  value={productImageUrl}
                  onChange={(e) => setProductImageUrl(e.target.value)}
                />
              </div>

              <div className="mt-5">
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
                <select
                  id="type"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={identificationProperties}
                  onChange={(e) => setIdentificationProperties(e.target.value)}
                >
                  <option>Select Identification properties</option>
                  <option value="GTIN-8">GTIN-8</option>
                  <option value="GTIN-13">GTIN-13</option>
                  <option value="GTIN-14">GTIN-14</option>
                  <option value="ISBN">ISBN</option>
                  <option value="MPN">MPN</option>
                  <option value="SKU">SKU</option>
                </select>
                <span className="text-white text-xs">
                  Note: ISBN is only a valid property on books.
                </span>
              </div>
              <p className="text-white text-xs mt-5">
                You must include at least one of the following.
              </p>
              <div class="flex items-center mb-4 mt-2">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  defaultChecked
                  onChange={() => {
                    setIsIncludeOfferOrAggregateOffer(
                      !isIncludeOfferOrAggregateOffer
                    );
                  }}
                />
                <label
                  for="default-checkbox"
                  class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Include offer or aggregate offer
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
                    setIsIncludeReviews(!isIncludeReviews);
                  }}
                />
                <label
                  for="default-checkbox"
                  class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Include reviews
                </label>
              </div>

              {isIncludeOfferOrAggregateOffer && (
                <>
                  <h1 className="text-white font-semibold mt-5">Offer </h1>

                  <div class="flex items-center mb-4 mt-2">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      value=""
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      onChange={() => {
                        setIsAggregateOffer(!isAggregateOffer);
                      }}
                    />
                    <label
                      for="default-checkbox"
                      class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Aggregate Offer
                    </label>
                  </div>
                  <span className="text-white text-xs">
                    When a single product is associated with multiple offers
                    (for example, the same pair of shoes is offered by different
                    merchants), then AggregateOffer can be used.
                  </span>

                  <div className="mt-5">
                    <select
                      id="type"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                    >
                      <option>Select Currency</option>
                      {currencies.map((currency) => (
                        <option key={currency.value} value={currency.value}>
                          {currency.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {!isAggregateOffer ? (
                    <div>
                      <div className="mt-5">
                        <input
                          type="text"
                          id="first_name"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Enter Price"
                          value={offerPrice}
                          onChange={(e) => setOfferPrice(e.target.value)}
                        />
                      </div>
                      <div className="mt-5">
                        <input
                          type="date"
                          id="first_name"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Select Date"
                          value={priceValidUntil}
                          onChange={(e) => setPriceValidUntil(e.target.value)}
                        />
                      </div>

                      <div className="mt-5">
                        <select
                          id="type"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={availability}
                          onChange={(e) => setAvailability(e.target.value)}
                        >
                          <option>Select Availability</option>
                          <option value="Discontinued">Discontinued</option>
                          <option value="In stock">In stock</option>
                          <option value="In store only">In store only</option>
                          <option value="Limited availability">
                            Limited availability
                          </option>
                          <option value="Online only">Online only</option>
                          <option value="Out of stock">Out of stock</option>
                          <option value="Pre-order">Pre-order</option>
                          <option value="Pre-sale">Pre-sale</option>
                          <option value="Sold out">Sold out</option>
                        </select>
                      </div>

                      <div className="mt-5">
                        <select
                          id="type"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={condition}
                          onChange={(e) => setCondition(e.target.value)}
                        >
                          <option>Select Condition</option>
                          <option value="Damaged">Discontinued</option>
                          <option value="New">New</option>
                          <option value="Refurbished">Refurbished</option>
                          <option value="Used">Limited availability</option>
                        </select>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="mt-5">
                        <input
                          type="text"
                          id="first_name"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Enter Low price"
                          value={lowPrice}
                          onChange={(e) => setLowPrice(e.target.value)}
                        />
                      </div>

                      <div className="mt-5">
                        <input
                          type="text"
                          id="first_name"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Enter High price"
                          value={highPrice}
                          onChange={(e) => setHighPrice(e.target.value)}
                        />
                      </div>

                      <div className="mt-5">
                        <input
                          type="text"
                          id="first_name"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Enter Number of offers"
                          value={numberOfOffers}
                          onChange={(e) => setNumberOfOffers(e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  <div className="mt-5">
                    <input
                      type="text"
                      id="first_name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter Url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
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
                      type="number"
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
                      type="number"
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
                      type="number"
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
                      type="number"
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
                      type="number"
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

              {isIncludeReviews && (
                <>
                  <div>
                    <h1 className="text-white font-semibold mt-5">Reviews </h1>
                    {reviews.map((review, index) => (
                      <div key={index} className="mt-5">
                        <h2 className="text-white text-sm font-semibold mt-2">
                          Review #{index + 1}
                        </h2>
                        <div className="mt-5">
                          <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter Title"
                            value={review.title}
                            onChange={(e) => {
                              const updatedReviews = [...reviews];
                              updatedReviews[index].title = e.target.value;
                              setReviews(updatedReviews);
                            }}
                          />
                        </div>
                        <div className="mt-5">
                          <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter Author"
                            value={review.author}
                            onChange={(e) => {
                              const updatedReviews = [...reviews];
                              updatedReviews[index].author = e.target.value;
                              setReviews(updatedReviews);
                            }}
                          />
                        </div>

                        <div className="mt-5">
                          <input
                            type="date"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={review.date}
                            onChange={(e) => {
                              const updatedReviews = [...reviews];
                              updatedReviews[index].date = e.target.value;
                              setReviews(updatedReviews);
                            }}
                          />
                        </div>

                        <div className="mt-5">
                          <input
                            type="number"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={review.ratingvalue}
                            placeholder="Enter Rating Value"
                            onChange={(e) => {
                              const updatedReviews = [...reviews];
                              updatedReviews[index].ratingvalue =
                                e.target.value;
                              setReviews(updatedReviews);
                            }}
                          />
                        </div>

                        <div className="mt-5">
                          <textarea
                            rows="2"
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter Instructions"
                            value={review.text}
                            onChange={(e) => {
                              const updatedReviews = [...reviews];
                              updatedReviews[index].text = e.target.value;
                              setReviews(updatedReviews);
                            }}
                          ></textarea>
                        </div>

                        <div className="mt-5">
                          <input
                            type="number"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={review.worstRatingValue}
                            placeholder="Enter Wrost Rating Value"
                            onChange={(e) => {
                              const updatedReviews = [...reviews];
                              updatedReviews[index].worstRatingValue =
                                e.target.value;
                              setReviews(updatedReviews);
                            }}
                          />
                          <span className="text-white text-xs">
                            The lowest value allowed in this rating system. If
                            omitted, 1 is assumed.
                          </span>
                        </div>

                        <div className="mt-5">
                          <input
                            type="number"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={review.bestRatingValue}
                            placeholder="Enter Best Rating Value"
                            onChange={(e) => {
                              const updatedReviews = [...reviews];
                              updatedReviews[index].bestRatingValue =
                                e.target.value;
                              setReviews(updatedReviews);
                            }}
                          />
                          <span className="text-white text-xs">
                            The highest value allowed in this rating system. If
                            omitted, 5 is assumed.
                          </span>
                        </div>

                        {reviews.length > 1 && (
                          <div className="mt-2">
                            <button
                              type="button"
                              className=" text-sm p-4 bg-red-600 text-white rounded "
                              onClick={() => handleDeleteReview(index)}
                            >
                              Delete Review
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                    <div className="mt-5">
                      <button
                        type="button"
                        className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={handleAddReview}
                      >
                        Add Review
                      </button>
                    </div>
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
