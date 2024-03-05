"use client";

import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const VideoMovie = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [tags, setTags] = useState("");

  const [audioUrl, setAudioUrl] = useState("");
  const [dateReleased, setDateReleased] = useState("");
  const [musicians, setMusicians] = useState([{ name: "" }]);
  const [musicianName, setMusicianName] = useState("");

  const [songs, setSongs] = useState([{ name: "" }]);
  const [songName, setSongName] = useState("");

  const [actors, setActors] = useState([{ name: "" }]);
  const [directors, setDirectors] = useState([{ name: "" }]);
  const [writers, setWriters] = useState([{ name: "" }]);

  const generateMetaTags = () => {
    let metaTags = `<meta property="og:type" content="video.movie">\n`;
    metaTags += `<meta property="og:title" content="${title}" />\n`;
    metaTags += `<meta property="og:url" content="${url}" />\n`;

    metaTags += `<meta property="og:image" content="${imageUrl}" />\n`;
    if (description)
      metaTags += `<meta property="og:description" content="${description}" />\n`;
    if (duration)
      metaTags += `<meta property="og:duration" content="${duration}" />\n`;

    if (dateReleased)
      metaTags += `<meta property="video:release_date" content="${dateReleased}" />\n`;

    if (tags)
      metaTags += `<meta property="video:tags" content="${dateReleased}" />\n`;

    actors.forEach((actor, index) => {
      metaTags += `<meta property="video:actor" content="${actor.name}" />\n`;
    });

    directors.forEach((director, index) => {
      metaTags += `<meta property="video:director" content="${director.name}" />\n`;
    });

    writers.forEach((writer, index) => {
      metaTags += `<meta property="video:writer" content="${writer.name}" />\n`;
    });

    return metaTags;
  };

  const handleAddActors = () => {
    setActors([...actors, { name: "" }]);
  };

  const handleDeleteActor = (index) => {
    const updatedActors = [...actors];
    updatedActors.splice(index, 1);
    setActors(updatedActors);
  };

  const handleAddDirector = () => {
    setDirectors([...directors, { name: "" }]);
  };

  const handleDeleteDirector = (index) => {
    const updatedDirectors = [...directors];
    updatedDirectors.splice(index, 1);
    setActors(updatedDirectors);
  };

  const handleAddWriter = () => {
    setWriters([...writers, { name: "" }]);
  };

  const handleDeleteWriter = (index) => {
    const updatedWriters = [...writers];
    updatedWriters.splice(index, 1);
    setActors(updatedWriters);
  };

  return (
    <div className="px-3">
      <h1 className="text-white text-xl text-bold">
        Video Movie Open Graph Generator
      </h1>

      <div className=" w-full flex mt-5">
        <div className=" w-1/2 border">
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
                  Duration (in seconds)
                </label>
                <input
                  type="number"
                  id="first_name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Duration in seconds"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>
              <div className="mt-5">
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date released
                </label>
                <input
                  type="date"
                  id="first_name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={dateReleased}
                  onChange={(e) => setDateReleased(e.target.value)}
                />
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

              <h1 className="text-white font-semibold mt-5">Actors </h1>
              <span className="text-white text-xs mt-5">
                Provide a URL to a page with open graph data of type profile.
              </span>

              <div className="mt-5">
                {actors.map((actor, index) => (
                  <div
                    key={index}
                    className="flex items-center  justify-center space-x-3 space-y-2"
                  >
                    <input
                      type="text"
                      className="bg-gray-50 border   border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={`Actor #${index + 1}`}
                      value={actor.name}
                      onChange={(e) => {
                        const updatedActors = [...actors];
                        updatedActors[index].name = e.target.value;
                        setActors(updatedActors);
                      }}
                    />

                    {actors.length > 1 && (
                      <button
                        type="button"
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => handleDeleteActor(index)}
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
                  onClick={handleAddActors}
                >
                  Add Actor
                </button>
              </div>

              <h1 className="text-white font-semibold mt-5">Directors </h1>
              <span className="text-white text-xs mt-5">
                Provide a URL to a page with open graph data of type music.song.
              </span>

              <div className="mt-5">
                {directors.map((director, index) => (
                  <div
                    key={index}
                    className="flex items-center  justify-center space-x-3 space-y-2"
                  >
                    <input
                      type="text"
                      className="bg-gray-50 border   border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={`Director #${index + 1}`}
                      value={director.name}
                      onChange={(e) => {
                        const updatedDirectors = [...directors];
                        updatedDirectors[index].name = e.target.value;
                        setDirectors(updatedDirectors);
                      }}
                    />
                    {directors.length > 1 && (
                      <button
                        type="button"
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => handleDeleteDirector(index)}
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
                  onClick={handleAddDirector}
                >
                  Add Director
                </button>
              </div>

              <h1 className="text-white font-semibold mt-5">Writers </h1>
              <span className="text-white text-xs mt-5">
                Provide a URL to a page with open graph data of type profile.
              </span>

              <div className="mt-5">
                {writers.map((writer, index) => (
                  <div
                    key={index}
                    className="flex items-center  justify-center space-x-3 space-y-2"
                  >
                    <input
                      type="text"
                      className="bg-gray-50 border   border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={`Writer #${index + 1}`}
                      value={writer.name}
                      onChange={(e) => {
                        const updatedWriters = [...writers];
                        updatedWriters[index].name = e.target.value;
                        setWriters(updatedWriters);
                      }}
                    />
                    {writers.length > 1 && (
                      <button
                        type="button"
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => handleDeleteWriter(index)}
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
                  onClick={handleAddWriter}
                >
                  Add Writer
                </button>
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

            <div className="space-y-2 mt-5 ">
              <pre className="text-white ml-5">{generateMetaTags()}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoMovie;
