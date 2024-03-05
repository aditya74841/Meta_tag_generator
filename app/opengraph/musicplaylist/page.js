"use client";

import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const MusicPlayList = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  const [audioUrl, setAudioUrl] = useState("");
  const [dateReleased, setDateReleased] = useState("");
  const [musicians, setMusicians] = useState([{ name: "" }]);
  const [musicianName, setMusicianName] = useState("");

  const [songs, setSongs] = useState([{ name: "" }]);
  const [songName, setSongName] = useState("");

  const generateMetaTags = () => {
    let metaTags = `<meta property="og:type" content="book">\n`;
    metaTags += `<meta property="og:title" content="${title}" />\n`;
    metaTags += `<meta property="og:url" content="${url}" />\n`;

    metaTags += `<meta property="og:image" content="${imageUrl}" />\n`;
    if (description)
      metaTags += `<meta property="og:description" content="${description}" />\n`;
    if (audioUrl)
      metaTags += `<meta property="og:audio" content="${audioUrl}" />\n`;

    musicians.forEach((musician, index) => {
      metaTags += `<meta property="music:creator" content="${musician.name}" />\n`;
    });

    songs.forEach((song, index) => {
      metaTags += `<meta property="music:song" content="${song.name}" />\n`;
    });
    return metaTags;
  };

  const handleAddMusician = () => {
    setMusicians([...musicians, { name: "" }]);
  };

  const handleDeleteMusician = (index) => {
    const updatedMusicians = [...musicians];
    updatedMusicians.splice(index, 1);
    setMusicians(updatedMusicians);
  };

  const handleAddSong = () => {
    setSongs([...songs, { name: "" }]);
  };

  const handleDeleteSong = (index) => {
    const updatedSongs = [...songs];
    updatedSongs.splice(index, 1);
    setSongs(updatedSongs);
  };
  return (
    <div className="px-3">
      <h1 className="text-white text-xl text-bold">
        Music Playlist Open Graph Generator
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
                  Audio Url
                </label>
                <input
                  type="text"
                  id="first_name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Title"
                  value={audioUrl}
                  onChange={(e) => setAudioUrl(e.target.value)}
                />
                <span className="text-white text-xs">
                  Must include http(s)://. The URL to play this playlist.
                </span>
              </div>

              <h1 className="text-white font-semibold mt-5">Creators </h1>
              <span className="text-white text-xs mt-5">
                Provide a URL to a page with open graph data of type profile.
              </span>

              <div className="mt-5">
                {musicians.map((musician, index) => (
                  <div
                    key={index}
                    className="flex items-center  justify-center space-x-3 space-y-2"
                  >
                    <input
                      type="text"
                      className="bg-gray-50 border   border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={`Creator #${index + 1}`}
                      value={musician.name}
                      onChange={(e) => {
                        const updatedMusicians = [...musicians];
                        updatedMusicians[index].name = e.target.value;
                        setMusicians(updatedMusicians);
                      }}
                    />
                    {musicians.length > 1 && (
                      <button
                        type="button"
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => handleDeleteMusician(index)}
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
                  onClick={handleAddMusician}
                >
                  Add Creator
                </button>
              </div>

              <h1 className="text-white font-semibold mt-5">Songs </h1>
              <span className="text-white text-xs mt-5">
                Provide a URL to a page with open graph data of type music.song.
              </span>

              <div className="mt-5">
                {songs.map((song, index) => (
                  <div
                    key={index}
                    className="flex items-center  justify-center space-x-3 space-y-2"
                  >
                    <input
                      type="text"
                      className="bg-gray-50 border   border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={`Enter Song #${index + 1}`}
                      value={song.name}
                      onChange={(e) => {
                        const updatedSongs = [...songs];
                        updatedSongs[index].name = e.target.value;
                        setSongs(updatedSongs);
                      }}
                    />
                    {songs.length > 1 && (
                      <button
                        type="button"
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => handleDeleteSong(index)}
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
                  onClick={handleAddSong}
                >
                  Add Song
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

export default MusicPlayList;
