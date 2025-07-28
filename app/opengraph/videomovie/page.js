// "use client";

// import React, { useState } from "react";
// import { CopyToClipboard } from "react-copy-to-clipboard";

// const VideoMovie = () => {
//   const [title, setTitle] = useState("");
//   const [url, setUrl] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const [description, setDescription] = useState("");
//   const [duration, setDuration] = useState(0);
//   const [tags, setTags] = useState("");

//   const [audioUrl, setAudioUrl] = useState("");
//   const [dateReleased, setDateReleased] = useState("");
//   const [musicians, setMusicians] = useState([{ name: "" }]);
//   const [musicianName, setMusicianName] = useState("");

//   const [songs, setSongs] = useState([{ name: "" }]);
//   const [songName, setSongName] = useState("");

//   const [actors, setActors] = useState([{ name: "" }]);
//   const [directors, setDirectors] = useState([{ name: "" }]);
//   const [writers, setWriters] = useState([{ name: "" }]);

//   const generateMetaTags = () => {
//     let metaTags = `<meta property="og:type" content="video.movie">\n`;
//     metaTags += `<meta property="og:title" content="${title}" />\n`;
//     metaTags += `<meta property="og:url" content="${url}" />\n`;

//     metaTags += `<meta property="og:image" content="${imageUrl}" />\n`;
//     if (description)
//       metaTags += `<meta property="og:description" content="${description}" />\n`;
//     if (duration)
//       metaTags += `<meta property="og:duration" content="${duration}" />\n`;

//     if (dateReleased)
//       metaTags += `<meta property="video:release_date" content="${dateReleased}" />\n`;

//     if (tags)
//       metaTags += `<meta property="video:tags" content="${dateReleased}" />\n`;

//     actors.forEach((actor, index) => {
//       metaTags += `<meta property="video:actor" content="${actor.name}" />\n`;
//     });

//     directors.forEach((director, index) => {
//       metaTags += `<meta property="video:director" content="${director.name}" />\n`;
//     });

//     writers.forEach((writer, index) => {
//       metaTags += `<meta property="video:writer" content="${writer.name}" />\n`;
//     });

//     return metaTags;
//   };

//   const handleAddActors = () => {
//     setActors([...actors, { name: "" }]);
//   };

//   const handleDeleteActor = (index) => {
//     const updatedActors = [...actors];
//     updatedActors.splice(index, 1);
//     setActors(updatedActors);
//   };

//   const handleAddDirector = () => {
//     setDirectors([...directors, { name: "" }]);
//   };

//   const handleDeleteDirector = (index) => {
//     const updatedDirectors = [...directors];
//     updatedDirectors.splice(index, 1);
//     setActors(updatedDirectors);
//   };

//   const handleAddWriter = () => {
//     setWriters([...writers, { name: "" }]);
//   };

//   const handleDeleteWriter = (index) => {
//     const updatedWriters = [...writers];
//     updatedWriters.splice(index, 1);
//     setActors(updatedWriters);
//   };

//   return (
//     <div className="px-3">
//       <h1 className="text-white text-xl text-bold">
//         Video Movie Open Graph Generator
//       </h1>

//       <div className=" w-full flex mt-5">
//         <div className=" w-1/2 border">
//           <h1 className="text-white uppercase font-semibold py-1 pl-5 bg-slate-600">
//             OPTIONS
//           </h1>
//           <div className="py-4 px-5 bg-gray-800">
//             <form>
//               <div className="mt-5">
//                 <label
//                   for="first_name"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Title
//                 </label>
//                 <input
//                   type="text"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Title"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                 />
//               </div>
//               <div className="mt-5">
//                 <label
//                   for="first_name"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   URL
//                 </label>
//                 <input
//                   type="text"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Url"
//                   value={url}
//                   onChange={(e) => setUrl(e.target.value)}
//                 />
//                 <span className="text-white text-xs">
//                   Must include http(s)://.
//                 </span>
//               </div>
//               <div className="mt-5">
//                 <label
//                   for="first_name"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Image Url
//                 </label>
//                 <input
//                   type="text"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Paste Image Url"
//                   value={imageUrl}
//                   onChange={(e) => setImageUrl(e.target.value)}
//                 />
//                 <span className="text-white text-xs">
//                   Must include http(s)://. The recommended size is 1200x627
//                   pixels.
//                 </span>
//               </div>
//               <div className="mt-5">
//                 <label
//                   for="message"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Description
//                 </label>
//                 <textarea
//                   id="message"
//                   rows="2"
//                   class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Url"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                 ></textarea>
//               </div>

//               <div className="mt-5">
//                 <label
//                   for="first_name"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Duration (in seconds)
//                 </label>
//                 <input
//                   type="number"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Duration in seconds"
//                   value={duration}
//                   onChange={(e) => setDuration(e.target.value)}
//                 />
//               </div>
//               <div className="mt-5">
//                 <label
//                   for="first_name"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Date released
//                 </label>
//                 <input
//                   type="date"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   value={dateReleased}
//                   onChange={(e) => setDateReleased(e.target.value)}
//                 />
//               </div>
//               <div className="mt-5">
//                 <label
//                   for="message"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Tags
//                 </label>
//                 <textarea
//                   id="message"
//                   rows="2"
//                   class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Url"
//                   value={tags}
//                   onChange={(e) => setTags(e.target.value)}
//                 ></textarea>
//                 <span className="text-white text-xs">
//                   Comma separated list of tags words associated with this
//                   article.
//                 </span>
//               </div>

//               <h1 className="text-white font-semibold mt-5">Actors </h1>
//               <span className="text-white text-xs mt-5">
//                 Provide a URL to a page with open graph data of type profile.
//               </span>

//               <div className="mt-5">
//                 {actors.map((actor, index) => (
//                   <div
//                     key={index}
//                     className="flex items-center  justify-center space-x-3 space-y-2"
//                   >
//                     <input
//                       type="text"
//                       className="bg-gray-50 border   border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder={`Actor #${index + 1}`}
//                       value={actor.name}
//                       onChange={(e) => {
//                         const updatedActors = [...actors];
//                         updatedActors[index].name = e.target.value;
//                         setActors(updatedActors);
//                       }}
//                     />

//                     {actors.length > 1 && (
//                       <button
//                         type="button"
//                         className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline"
//                         onClick={() => handleDeleteActor(index)}
//                       >
//                         Delete
//                       </button>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               {/* Add button to add musician */}
//               <div className="mt-5">
//                 <button
//                   type="button"
//                   className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                   onClick={handleAddActors}
//                 >
//                   Add Actor
//                 </button>
//               </div>

//               <h1 className="text-white font-semibold mt-5">Directors </h1>
//               <span className="text-white text-xs mt-5">
//                 Provide a URL to a page with open graph data of type music.song.
//               </span>

//               <div className="mt-5">
//                 {directors.map((director, index) => (
//                   <div
//                     key={index}
//                     className="flex items-center  justify-center space-x-3 space-y-2"
//                   >
//                     <input
//                       type="text"
//                       className="bg-gray-50 border   border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder={`Director #${index + 1}`}
//                       value={director.name}
//                       onChange={(e) => {
//                         const updatedDirectors = [...directors];
//                         updatedDirectors[index].name = e.target.value;
//                         setDirectors(updatedDirectors);
//                       }}
//                     />
//                     {directors.length > 1 && (
//                       <button
//                         type="button"
//                         className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline"
//                         onClick={() => handleDeleteDirector(index)}
//                       >
//                         Delete
//                       </button>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               {/* Add button to add musician */}
//               <div className="mt-5">
//                 <button
//                   type="button"
//                   className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                   onClick={handleAddDirector}
//                 >
//                   Add Director
//                 </button>
//               </div>

//               <h1 className="text-white font-semibold mt-5">Writers </h1>
//               <span className="text-white text-xs mt-5">
//                 Provide a URL to a page with open graph data of type profile.
//               </span>

//               <div className="mt-5">
//                 {writers.map((writer, index) => (
//                   <div
//                     key={index}
//                     className="flex items-center  justify-center space-x-3 space-y-2"
//                   >
//                     <input
//                       type="text"
//                       className="bg-gray-50 border   border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder={`Writer #${index + 1}`}
//                       value={writer.name}
//                       onChange={(e) => {
//                         const updatedWriters = [...writers];
//                         updatedWriters[index].name = e.target.value;
//                         setWriters(updatedWriters);
//                       }}
//                     />
//                     {writers.length > 1 && (
//                       <button
//                         type="button"
//                         className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline"
//                         onClick={() => handleDeleteWriter(index)}
//                       >
//                         Delete
//                       </button>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               {/* Add button to add musician */}
//               <div className="mt-5">
//                 <button
//                   type="button"
//                   className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                   onClick={handleAddWriter}
//                 >
//                   Add Writer
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//         <div className="w-1/2 border">
//           <div>
//             <h1 className="text-white uppercase font-semibold py-1 pl-5 bg-slate-600">
//               CODE
//             </h1>
//             <div className="text-white font-semibold py-2 pl-5 text-xs bg-slate-800">
//               <p className="bg">
//                 Copy this to the &lt;head&gt; section of your page.
//               </p>
//             </div>
//             <CopyToClipboard text={generateMetaTags()}>
//               <div className="ml-auto w-1/6 mt-2">
//                 <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//                   Copy
//                 </button>
//               </div>
//             </CopyToClipboard>

//             <div className="space-y-2 mt-5 ">
//               <pre className="text-white ml-5">{generateMetaTags()}</pre>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoMovie;


"use client";
import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Alert,
  IconButton,
  Tooltip,
  Stack,
  Divider,
  Avatar,
} from "@mui/material";
import {
  ContentCopy as CopyIcon,
  Movie as MovieIcon,
  CheckCircle as CheckIcon,
  Preview as PreviewIcon,
  Code as CodeIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Image as ImageIcon,
  Link as LinkIcon,
  Description as DescriptionIcon,
  Person as PersonIcon,
  DateRange as DateIcon,
  Title as TitleIcon,
  Share as ShareIcon,
  Timer as TimerIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  LocalOffer as TagIcon,
  Theaters as TheatersIcon,
  Person as ActorIcon,
  Camera as DirectorIcon,
  Edit as WriterIcon,
  PlayCircleOutline as PlayIcon,
  VideoLibrary as MovieBadgeIcon,
} from "@mui/icons-material";

const VideoMovie = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [dateReleased, setDateReleased] = useState("");
  const [tags, setTags] = useState("");
  const [actors, setActors] = useState([{ name: "" }]);
  const [directors, setDirectors] = useState([{ name: "" }]);
  const [writers, setWriters] = useState([{ name: "" }]);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState({});

  // Helper function to safely extract hostname
  const getHostname = (url) => {
    if (!url) return "example.com";
    
    // Simple URL validation
    const urlPattern = /^https?:\/\/.+\..+/;
    if (!urlPattern.test(url)) {
      return "Enter valid URL";
    }
    
    try {
      return new URL(url).hostname;
    } catch (error) {
      return "Invalid URL format";
    }
  };

  // Helper function to format duration
  const formatDuration = (seconds) => {
    if (!seconds || seconds <= 0) return "0:00";
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) newErrors.title = "Movie title is required";
    if (!url.trim()) newErrors.url = "URL is required";

    // URL validation
    const urlPattern = /^https?:\/\/.+/;
    if (url && !urlPattern.test(url)) {
      newErrors.url = "Please enter a valid URL starting with http:// or https://";
    }
    if (imageUrl && !urlPattern.test(imageUrl)) {
      newErrors.imageUrl = "Please enter a valid image URL starting with http:// or https://";
    }

    // Duration validation
    if (duration && (duration <= 0 || duration > 86400)) {
      newErrors.duration = "Duration must be between 1 and 86400 seconds (24 hours)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    validateForm();
  }, [title, url, imageUrl, duration]);

  const generateMetaTags = () => {
    const metaTags = [];
    
    metaTags.push('<meta property="og:type" content="video.movie" />');
    if (title) metaTags.push(`<meta property="og:title" content="${title}" />`);
    if (url) metaTags.push(`<meta property="og:url" content="${url}" />`);
    if (imageUrl) metaTags.push(`<meta property="og:image" content="${imageUrl}" />`);
    if (description) metaTags.push(`<meta property="og:description" content="${description}" />`);
    if (duration) metaTags.push(`<meta property="video:duration" content="${duration}" />`);
    if (dateReleased) metaTags.push(`<meta property="video:release_date" content="${dateReleased}" />`);
    // Fix: Changed from dateReleased to tags
    if (tags) metaTags.push(`<meta property="video:tag" content="${tags}" />`);
    
    // Add actors (only non-empty ones)
    actors.forEach((actor) => {
      if (actor.name.trim()) {
        metaTags.push(`<meta property="video:actor" content="${actor.name.trim()}" />`);
      }
    });
    
    // Add directors (only non-empty ones)
    directors.forEach((director) => {
      if (director.name.trim()) {
        metaTags.push(`<meta property="video:director" content="${director.name.trim()}" />`);
      }
    });
    
    // Add writers (only non-empty ones)
    writers.forEach((writer) => {
      if (writer.name.trim()) {
        metaTags.push(`<meta property="video:writer" content="${writer.name.trim()}" />`);
      }
    });

    return metaTags.join('\n');
  };

  const metaTagsText = generateMetaTags();

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isFormValid = Object.keys(errors).length === 0 && title.trim() && url.trim();

  // Actors handlers
  const handleAddActor = () => {
    setActors([...actors, { name: "" }]);
  };

  const handleDeleteActor = (index) => {
    if (actors.length > 1) {
      const updatedActors = [...actors];
      updatedActors.splice(index, 1);
      setActors(updatedActors);
    }
  };

  const handleActorChange = (index, value) => {
    const updatedActors = [...actors];
    updatedActors[index].name = value;
    setActors(updatedActors);
  };

  // Directors handlers
  const handleAddDirector = () => {
    setDirectors([...directors, { name: "" }]);
  };

  const handleDeleteDirector = (index) => {
    if (directors.length > 1) {
      const updatedDirectors = [...directors];
      updatedDirectors.splice(index, 1);
      setDirectors(updatedDirectors);
    }
  };

  const handleDirectorChange = (index, value) => {
    const updatedDirectors = [...directors];
    updatedDirectors[index].name = value;
    setDirectors(updatedDirectors);
  };

  // Writers handlers
  const handleAddWriter = () => {
    setWriters([...writers, { name: "" }]);
  };

  const handleDeleteWriter = (index) => {
    if (writers.length > 1) {
      const updatedWriters = [...writers];
      updatedWriters.splice(index, 1);
      setWriters(updatedWriters);
    }
  };

  const handleWriterChange = (index, value) => {
    const updatedWriters = [...writers];
    updatedWriters[index].name = value;
    setWriters(updatedWriters);
  };

  const formatDateForDisplay = (dateString) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleDateString();
  };

  const getTagsArray = () => {
    return tags.split(',').map(tag => tag.trim()).filter(tag => tag);
  };

  const getValidActorsCount = () => {
    return actors.filter(actor => actor.name.trim()).length;
  };

  const getValidDirectorsCount = () => {
    return directors.filter(director => director.name.trim()).length;
  };

  const getValidWritersCount = () => {
    return writers.filter(writer => writer.name.trim()).length;
  };

  return (
    <Box sx={{ p: 3, background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", minHeight: "100vh" }}>
      {/* Header Section */}
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          mb: 3, 
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          borderRadius: 2
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <MovieIcon sx={{ fontSize: 32 }} />
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Video Movie Open Graph Generator
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
              Create Open Graph meta tags for movies to optimize social media sharing and cinema SEO.
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {/* Configuration Panel */}
        <Grid item xs={12} lg={8}>
          <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
            <Box sx={{ bgcolor: "primary.main", color: "white", p: 2, display: "flex", alignItems: "center", gap: 1 }}>
              <CodeIcon />
              <Typography variant="h6" fontWeight="bold">
                MOVIE CONFIGURATION
              </Typography>
              {isFormValid && (
                <Chip 
                  icon={<CheckIcon />} 
                  label="Valid" 
                  sx={{ bgcolor: "rgba(76, 175, 80, 0.8)", color: "white", ml: "auto" }}
                />
              )}
            </Box>
            
            <Box sx={{ p: 3 }}>
              <Grid container spacing={3}>
                {/* Movie Details Section */}
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom color="primary" fontWeight="bold">
                    <MovieBadgeIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    Movie Details
                  </Typography>
                </Grid>

                {/* Title */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Movie Title *"
                    placeholder="Avengers: Endgame"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    error={!!errors.title}
                    helperText={errors.title || `${title.length} characters (recommended: 40-60 for social sharing)`}
                    InputProps={{
                      startAdornment: <TitleIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                {/* URL */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Movie URL *"
                    placeholder="https://movies.example.com/avengers-endgame"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    error={!!errors.url}
                    helperText={errors.url || "Must include http:// or https://"}
                    InputProps={{
                      startAdornment: <LinkIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                {/* Image URL */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Movie Poster URL"
                    placeholder="https://example.com/movie-poster.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    error={!!errors.imageUrl}
                    helperText={errors.imageUrl || "Recommended size: 1200x1800 pixels (2:3 aspect ratio for movie posters)"}
                    InputProps={{
                      startAdornment: <ImageIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                {/* Description */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Movie Synopsis"
                    placeholder="After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more..."
                    multiline
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    helperText={`${description.length} characters (recommended: 150-160 for SEO)`}
                    InputProps={{
                      startAdornment: <DescriptionIcon sx={{ mr: 1, color: "action.active", alignSelf: "flex-start", mt: 1 }} />,
                    }}
                  />
                </Grid>

                {/* Duration and Release Date */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Runtime (seconds)"
                    type="number"
                    placeholder="10800"
                    inputProps={{ min: 1, max: 86400 }}
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    error={!!errors.duration}
                    helperText={errors.duration || `${duration ? formatDuration(duration) : "0:00"} (typical movie: 90-180 mins)`}
                    InputProps={{
                      startAdornment: <TimerIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Release Date"
                    type="date"
                    value={dateReleased}
                    onChange={(e) => setDateReleased(e.target.value)}
                    helperText="Movie theatrical release date"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      startAdornment: <DateIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                {/* Tags */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Genre & Tags"
                    placeholder="action, superhero, marvel, adventure, sci-fi, blockbuster"
                    multiline
                    rows={2}
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    helperText="Comma-separated list of genres and tags associated with this movie"
                    InputProps={{
                      startAdornment: <TagIcon sx={{ mr: 1, color: "action.active", alignSelf: "flex-start", mt: 1 }} />,
                    }}
                  />
                </Grid>

                {/* Tags Preview */}
                {tags && getTagsArray().length > 0 && (
                  <Grid item xs={12}>
                    <Box sx={{ p: 2, bgcolor: "#f9f9f9", borderRadius: 1 }}>
                      <Typography variant="body2" fontWeight="bold" gutterBottom>
                        Genre & Tags Preview:
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {getTagsArray().map((tag, index) => (
                          <Chip 
                            key={index} 
                            label={tag} 
                            size="small" 
                            color="primary" 
                            variant="outlined"
                          />
                        ))}
                      </Stack>
                    </Box>
                  </Grid>
                )}

                {/* Cast & Crew Section */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }}>
                    <Chip label="Cast & Crew" />
                  </Divider>
                </Grid>

                {/* Actors Section */}
                <Grid item xs={12}>
                  <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
                    <ActorIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    Main Cast ({getValidActorsCount()} added)
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Add the main actors who starred in this movie
                  </Typography>
                  
                  <Stack spacing={2}>
                    {actors.map((actor, index) => (
                      <Card key={index} variant="outlined" sx={{ p: 2 }}>
                        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                          <TextField
                            fullWidth
                            label={`Actor #${index + 1}`}
                            placeholder="Robert Downey Jr."
                            value={actor.name}
                            onChange={(e) => handleActorChange(index, e.target.value)}
                            size="small"
                            InputProps={{
                              startAdornment: <PersonIcon sx={{ mr: 1, color: "action.active" }} />,
                            }}
                          />
                          {actors.length > 1 && (
                            <IconButton
                              onClick={() => handleDeleteActor(index)}
                              color="error"
                              size="small"
                            >
                              <DeleteIcon />
                            </IconButton>
                          )}
                        </Box>
                      </Card>
                    ))}

                    <Button
                      onClick={handleAddActor}
                      variant="outlined"
                      startIcon={<AddIcon />}
                      fullWidth
                      sx={{ borderStyle: "dashed" }}
                    >
                      Add Actor
                    </Button>
                  </Stack>
                </Grid>

                {/* Directors Section */}
                <Grid item xs={12}>
                  <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
                    <DirectorIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    Directors ({getValidDirectorsCount()} added)
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Add the directors who directed this movie
                  </Typography>
                  
                  <Stack spacing={2}>
                    {directors.map((director, index) => (
                      <Card key={index} variant="outlined" sx={{ p: 2 }}>
                        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                          <TextField
                            fullWidth
                            label={`Director #${index + 1}`}
                            placeholder="Anthony Russo"
                            value={director.name}
                            onChange={(e) => handleDirectorChange(index, e.target.value)}
                            size="small"
                            InputProps={{
                              startAdornment: <DirectorIcon sx={{ mr: 1, color: "action.active" }} />,
                            }}
                          />
                          {directors.length > 1 && (
                            <IconButton
                              onClick={() => handleDeleteDirector(index)}
                              color="error"
                              size="small"
                            >
                              <DeleteIcon />
                            </IconButton>
                          )}
                        </Box>
                      </Card>
                    ))}

                    <Button
                      onClick={handleAddDirector}
                      variant="outlined"
                      startIcon={<AddIcon />}
                      fullWidth
                      sx={{ borderStyle: "dashed" }}
                    >
                      Add Director
                    </Button>
                  </Stack>
                </Grid>

                {/* Writers Section */}
                <Grid item xs={12}>
                  <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
                    <WriterIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    Writers ({getValidWritersCount()} added)
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Add the writers who wrote the screenplay for this movie
                  </Typography>
                  
                  <Stack spacing={2}>
                    {writers.map((writer, index) => (
                      <Card key={index} variant="outlined" sx={{ p: 2 }}>
                        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                          <TextField
                            fullWidth
                            label={`Writer #${index + 1}`}
                            placeholder="Christopher Markus"
                            value={writer.name}
                            onChange={(e) => handleWriterChange(index, e.target.value)}
                            size="small"
                            InputProps={{
                              startAdornment: <WriterIcon sx={{ mr: 1, color: "action.active" }} />,
                            }}
                          />
                          {writers.length > 1 && (
                            <IconButton
                              onClick={() => handleDeleteWriter(index)}
                              color="error"
                              size="small"
                            >
                              <DeleteIcon />
                            </IconButton>
                          )}
                        </Box>
                      </Card>
                    ))}

                    <Button
                      onClick={handleAddWriter}
                      variant="outlined"
                      startIcon={<AddIcon />}
                      fullWidth
                      sx={{ borderStyle: "dashed" }}
                    >
                      Add Writer
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Paper>

          {/* Generated Code */}
          <Paper elevation={3} sx={{ mt: 3, borderRadius: 2, overflow: "hidden" }}>
            <Box sx={{ bgcolor: "success.main", color: "white", p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6" fontWeight="bold">
                GENERATED OPEN GRAPH META TAGS
              </Typography>
              <CopyToClipboard text={metaTagsText} onCopy={handleCopy}>
                <Tooltip title={copied ? "Copied!" : "Copy to clipboard"}>
                  <IconButton sx={{ color: "white" }}>
                    {copied ? <CheckIcon /> : <CopyIcon />}
                  </IconButton>
                </Tooltip>
              </CopyToClipboard>
            </Box>
            
            {!isFormValid && (
              <Alert severity="warning" sx={{ m: 0, borderRadius: 0 }}>
                Please fix the errors above to generate valid meta tags.
              </Alert>
            )}
            
            <Alert severity="info" sx={{ m: 0, borderRadius: 0 }}>
              Add these meta tags to the &lt;head&gt; section of your HTML page.
            </Alert>

            <Box sx={{ p: 3, bgcolor: "#1e1e1e", color: "#f8f8f2", maxHeight: 500, overflow: "auto" }}>
              <pre style={{ 
                fontFamily: "'Fira Code', monospace", 
                fontSize: "0.875rem", 
                lineHeight: "1.5",
                margin: 0,
                whiteSpace: "pre-wrap"
              }}>
                {metaTagsText || "<!-- No meta tags generated yet -->"}
              </pre>
            </Box>
          </Paper>
        </Grid>

        {/* Preview Panel */}
        <Grid item xs={12} lg={4}>
          <Stack spacing={2}>
            {/* Movie Preview */}
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
              <Box sx={{ bgcolor: "warning.main", color: "white", p: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  <PreviewIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                  SOCIAL MEDIA PREVIEW
                </Typography>
              </Box>
              <Card sx={{ borderRadius: 0 }}>
                {imageUrl ? (
                  <Box sx={{ position: "relative" }}>
                    <CardMedia
                      component="img"
                      height="300"
                      image={imageUrl}
                      alt="Movie poster"
                      sx={{ objectFit: "cover" }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <Box sx={{ 
                      position: "absolute", 
                      top: "50%", 
                      left: "50%", 
                      transform: "translate(-50%, -50%)",
                      bgcolor: "rgba(0,0,0,0.6)",
                      borderRadius: "50%",
                      p: 1
                    }}>
                      <PlayIcon sx={{ color: "white", fontSize: 40 }} />
                    </Box>
                    <Chip 
                      label="Movie" 
                      size="small" 
                      sx={{ 
                        position: "absolute", 
                        top: 8, 
                        right: 8, 
                        bgcolor: "rgba(244, 67, 54, 0.9)", 
                        color: "white" 
                      }} 
                    />
                  </Box>
                ) : (
                  <Box 
                    sx={{ 
                      height: 300, 
                      bgcolor: "#f5f5f5", 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center",
                      flexDirection: "column",
                      gap: 1
                    }}
                  >
                    <MovieIcon sx={{ fontSize: 64, color: "text.secondary" }} />
                    <Typography color="text.secondary">
                      No movie poster
                    </Typography>
                  </Box>
                )}
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {title || "Movie Title"}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {description ? 
                      `${description.substring(0, 160)}${description.length > 160 ? "..." : ""}` : 
                      "Movie synopsis will appear here..."
                    }
                  </Typography>

                  <Typography variant="caption" color="primary" sx={{ textTransform: "uppercase" }}>
                    {getHostname(url)}
                  </Typography>

                  {duration && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
                      <TimerIcon fontSize="small" />
                      <Typography variant="body2">
                        Runtime: {formatDuration(duration)}
                      </Typography>
                    </Box>
                  )}

                  {dateReleased && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                      <DateIcon fontSize="small" />
                      <Typography variant="body2">
                        Released: {formatDateForDisplay(dateReleased)}
                      </Typography>
                    </Box>
                  )}

                  {getValidActorsCount() > 0 && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" fontWeight="bold" gutterBottom>
                        Starring:
                      </Typography>
                      <Stack direction="row" spacing={0.5} flexWrap="wrap">
                        {actors.filter(a => a.name.trim()).slice(0, 3).map((actor, index) => (
                          <Chip 
                            key={index} 
                            label={actor.name} 
                            size="small" 
                            color="secondary" 
                            variant="outlined"
                          />
                        ))}
                        {getValidActorsCount() > 3 && (
                          <Chip 
                            label={`+${getValidActorsCount() - 3} more`} 
                            size="small" 
                            variant="outlined"
                          />
                        )}
                      </Stack>
                    </Box>
                  )}

                  {getTagsArray().length > 0 && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" fontWeight="bold" gutterBottom>
                        Genre:
                      </Typography>
                      <Stack direction="row" spacing={0.5} flexWrap="wrap">
                        {getTagsArray().slice(0, 3).map((tag, index) => (
                          <Chip 
                            key={index} 
                            label={tag} 
                            size="small" 
                            color="primary" 
                            variant="outlined"
                          />
                        ))}
                        {getTagsArray().length > 3 && (
                          <Chip 
                            label={`+${getTagsArray().length - 3} more`} 
                            size="small" 
                            variant="outlined"
                          />
                        )}
                      </Stack>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Paper>

            {/* Validation Status */}
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
              <Box sx={{ bgcolor: isFormValid ? "success.main" : "error.main", color: "white", p: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  VALIDATION STATUS
                </Typography>
              </Box>
              <Box sx={{ p: 2 }}>
                <Stack spacing={1}>
                  <Alert severity={title.trim() ? "success" : "error"} variant="outlined">
                    <Typography variant="caption">
                      Movie Title: {title.trim() ? "✓ Added" : "✗ Required"}
                    </Typography>
                  </Alert>
                  
                  <Alert severity={url.trim() ? "success" : "error"} variant="outlined">
                    <Typography variant="caption">
                      URL: {url.trim() ? "✓ Added" : "✗ Required"}
                    </Typography>
                  </Alert>
                  
                  <Alert severity={imageUrl.trim() ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Movie Poster: {imageUrl.trim() ? "✓ Added" : "ℹ Optional but recommended"}
                    </Typography>
                  </Alert>

                  <Alert severity={description.trim() ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Synopsis: {description.trim() ? "✓ Added" : "ℹ Optional but recommended"}
                    </Typography>
                  </Alert>

                  <Alert severity={duration ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Runtime: {duration ? `✓ ${formatDuration(duration)}` : "ℹ Optional"}
                    </Typography>
                  </Alert>

                  <Alert severity={getValidActorsCount() > 0 ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Cast: {getValidActorsCount() > 0 ? `✓ ${getValidActorsCount()} added` : "ℹ Optional"}
                    </Typography>
                  </Alert>

                  <Alert severity={getValidDirectorsCount() > 0 ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Directors: {getValidDirectorsCount() > 0 ? `✓ ${getValidDirectorsCount()} added` : "ℹ Optional"}
                    </Typography>
                  </Alert>

                  <Alert severity={getValidWritersCount() > 0 ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Writers: {getValidWritersCount() > 0 ? `✓ ${getValidWritersCount()} added` : "ℹ Optional"}
                    </Typography>
                  </Alert>

                  <Alert severity={dateReleased ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Release Date: {dateReleased ? "✓ Set" : "ℹ Optional"}
                    </Typography>
                  </Alert>

                  <Alert severity={getTagsArray().length > 0 ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Genre/Tags: {getTagsArray().length > 0 ? `✓ ${getTagsArray().length} tags` : "ℹ Optional"}
                    </Typography>
                  </Alert>
                </Stack>
              </Box>
            </Paper>

            {/* Movie Meta Tags Info */}
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
              <Box sx={{ bgcolor: "info.main", color: "white", p: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  ABOUT VIDEO MOVIE OPEN GRAPH
                </Typography>
              </Box>
              <Box sx={{ p: 2 }}>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" fontWeight="bold" gutterBottom>
                      Benefits:
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Enhanced movie sharing on social media
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Better cinema and streaming SEO
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Rich previews with movie posters
                    </Typography>
                    <Typography variant="caption" display="block">
                      • Professional movie presentation
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="body2" fontWeight="bold" gutterBottom>
                      Movie-Specific Tags:
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • video:actor - Cast information
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • video:director - Director information
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • video:writer - Writer information
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • video:duration - Movie runtime
                    </Typography>
                    <Typography variant="caption" display="block">
                      • og:type - video.movie classification
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VideoMovie;
