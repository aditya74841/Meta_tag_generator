// "use client";

// import React, { useState } from "react";
// import { CopyToClipboard } from "react-copy-to-clipboard";

// const MusicSong = () => {
//   const [title, setTitle] = useState("");
//   const [url, setUrl] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const [description, setDescription] = useState("");

//   const [audioUrl, setAudioUrl] = useState("");
//   const [albumUrl, setAlbumUrl] = useState("");
//   const [duration, setDuration] = useState("");
//   const [dateReleased, setDateReleased] = useState("");
//   const [musicians, setMusicians] = useState([{ name: "" }]);
//   const [musicianName, setMusicianName] = useState("");

//   const [songs, setSongs] = useState([{ name: "" }]);
//   const [songName, setSongName] = useState("");

//   const generateMetaTags = () => {
//     let metaTags = `<meta property="og:type" content="music.song">\n`;
//     metaTags += `<meta property="og:title" content="${title}" />\n`;
//     metaTags += `<meta property="og:url" content="${url}" />\n`;

//     metaTags += `<meta property="og:image" content="${imageUrl}" />\n`;
//     if (description)
//       metaTags += `<meta property="og:description" content="${description}" />\n`;
//     if (audioUrl)
//       metaTags += `<meta property="og:audio" content="${audioUrl}" />\n`;

//     if (duration)
//       metaTags += `<meta property="og:duration" content="${duration}" />\n`;

//     if (albumUrl)
//       metaTags += `<meta property="og:album" content="${albumUrl}" />\n`;

//     if (dateReleased)
//       metaTags += `<meta property="music:release_date" content="${dateReleased}" />\n`;

//     musicians.forEach((musician, index) => {
//       metaTags += `<meta property="music:musician" content="${musician.name}" />\n`;
//     });

//     return metaTags;
//   };

//   const handleAddMusician = () => {
//     setMusicians([...musicians, { name: "" }]);
//   };

//   const handleDeleteMusician = (index) => {
//     const updatedMusicians = [...musicians];
//     updatedMusicians.splice(index, 1);
//     setMusicians(updatedMusicians);
//   };

//   return (
//     <div className="px-3">
//       <h1 className="text-white text-xl text-bold">
//         Music Album Open Graph Generator
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
//                   placeholder="Enter Description"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                 ></textarea>
//               </div>
//               <div className="mt-5">
//                 <label
//                   for="first_name"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Audio Url
//                 </label>
//                 <input
//                   type="text"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Audio Url"
//                   value={audioUrl}
//                   onChange={(e) => setAudioUrl(e.target.value)}
//                 />
//                 <span className="text-white text-xs">
//                   Must include http(s)://. The URL to play this album.
//                 </span>
//               </div>

//               <div className="mt-5">
//                 <label
//                   for="first_name"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Album URL
//                 </label>
//                 <input
//                   type="text"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Album Url"
//                   value={albumUrl}
//                   onChange={(e) => setAlbumUrl(e.target.value)}
//                 />
//                 <span className="text-white text-xs">
//                   Provide a URL to a page with open graph data of type
//                   music.album.
//                 </span>
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

//               <h1 className="text-white font-semibold mt-5">Musicians </h1>
//               <span className="text-white text-xs mt-5">
//                 Provide a URL to a page with open graph data of type profile.
//               </span>

//               <div className="mt-5">
//                 {musicians.map((musician, index) => (
//                   <div
//                     key={index}
//                     className="flex items-center  justify-center space-x-3 space-y-2"
//                   >
//                     <input
//                       type="text"
//                       className="bg-gray-50 border   border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder={`Enter Musician #${index + 1}`}
//                       value={musician.name}
//                       onChange={(e) => {
//                         const updatedMusicians = [...musicians];
//                         updatedMusicians[index].name = e.target.value;
//                         setMusicians(updatedMusicians);
//                       }}
//                     />

//                     {musicians.length > 1 && (
//                       <button
//                         type="button"
//                         className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline"
//                         onClick={() => handleDeleteMusician(index)}
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
//                   onClick={handleAddMusician}
//                 >
//                   Add Musician
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

// export default MusicSong;
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
  MusicNote as SongIcon,
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
  AudioFile as AudioIcon,
  Album as AlbumIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Timer as TimerIcon,
  MusicVideo as MusicVideoIcon,
  LibraryMusic as LibraryMusicIcon,
  PlayCircleOutline as PlayIcon,
} from "@mui/icons-material";

const MusicSong = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [albumUrl, setAlbumUrl] = useState("");
  const [duration, setDuration] = useState("");
  const [dateReleased, setDateReleased] = useState("");
  const [musicians, setMusicians] = useState([{ name: "" }]);
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
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) newErrors.title = "Song title is required";
    if (!url.trim()) newErrors.url = "URL is required";

    // URL validation
    const urlPattern = /^https?:\/\/.+/;
    if (url && !urlPattern.test(url)) {
      newErrors.url = "Please enter a valid URL starting with http:// or https://";
    }
    if (imageUrl && !urlPattern.test(imageUrl)) {
      newErrors.imageUrl = "Please enter a valid image URL starting with http:// or https://";
    }
    if (audioUrl && !urlPattern.test(audioUrl)) {
      newErrors.audioUrl = "Please enter a valid audio URL starting with http:// or https://";
    }
    if (albumUrl && !urlPattern.test(albumUrl)) {
      newErrors.albumUrl = "Please enter a valid album URL starting with http:// or https://";
    }

    // Duration validation
    if (duration && (duration <= 0 || duration > 7200)) {
      newErrors.duration = "Duration must be between 1 and 7200 seconds (2 hours)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    validateForm();
  }, [title, url, imageUrl, audioUrl, albumUrl, duration]);

  const generateMetaTags = () => {
    const metaTags = [];
    
    metaTags.push('<meta property="og:type" content="music.song" />');
    if (title) metaTags.push(`<meta property="og:title" content="${title}" />`);
    if (url) metaTags.push(`<meta property="og:url" content="${url}" />`);
    if (imageUrl) metaTags.push(`<meta property="og:image" content="${imageUrl}" />`);
    if (description) metaTags.push(`<meta property="og:description" content="${description}" />`);
    if (audioUrl) metaTags.push(`<meta property="og:audio" content="${audioUrl}" />`);
    if (duration) metaTags.push(`<meta property="music:duration" content="${duration}" />`);
    if (albumUrl) metaTags.push(`<meta property="music:album" content="${albumUrl}" />`);
    if (dateReleased) metaTags.push(`<meta property="music:release_date" content="${dateReleased}" />`);
    
    // Add musicians (only non-empty ones)
    musicians.forEach((musician) => {
      if (musician.name.trim()) {
        metaTags.push(`<meta property="music:musician" content="${musician.name.trim()}" />`);
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

  // Musicians handlers
  const handleAddMusician = () => {
    setMusicians([...musicians, { name: "" }]);
  };

  const handleDeleteMusician = (index) => {
    if (musicians.length > 1) {
      const updatedMusicians = [...musicians];
      updatedMusicians.splice(index, 1);
      setMusicians(updatedMusicians);
    }
  };

  const handleMusicianChange = (index, value) => {
    const updatedMusicians = [...musicians];
    updatedMusicians[index].name = value;
    setMusicians(updatedMusicians);
  };

  const formatDateForDisplay = (dateString) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleDateString();
  };

  const getValidMusiciansCount = () => {
    return musicians.filter(musician => musician.name.trim()).length;
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
          <SongIcon sx={{ fontSize: 32 }} />
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Music Song Open Graph Generator
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
              Create Open Graph meta tags for individual songs to optimize social media sharing and music discovery.
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
                SONG CONFIGURATION
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
                {/* Song Details Section */}
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom color="primary" fontWeight="bold">
                    <MusicVideoIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    Song Details
                  </Typography>
                </Grid>

                {/* Title */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Song Title *"
                    placeholder="Bohemian Rhapsody"
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
                    label="Song URL *"
                    placeholder="https://music.example.com/songs/bohemian-rhapsody"
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
                    label="Song/Album Cover URL"
                    placeholder="https://example.com/song-cover.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    error={!!errors.imageUrl}
                    helperText={errors.imageUrl || "Recommended size: 1200x1200 pixels (square format for music covers)"}
                    InputProps={{
                      startAdornment: <ImageIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                {/* Description */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Song Description"
                    placeholder="An epic rock ballad that combines opera, hard rock, and pop in a unique masterpiece..."
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

                {/* Audio and Album URLs */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Audio URL"
                    placeholder="https://example.com/song.mp3"
                    value={audioUrl}
                    onChange={(e) => setAudioUrl(e.target.value)}
                    error={!!errors.audioUrl}
                    helperText={errors.audioUrl || "Direct link to the audio file"}
                    InputProps={{
                      startAdornment: <AudioIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Album URL"
                    placeholder="https://example.com/albums/a-night-at-the-opera"
                    value={albumUrl}
                    onChange={(e) => setAlbumUrl(e.target.value)}
                    error={!!errors.albumUrl}
                    helperText={errors.albumUrl || "Link to the album containing this song"}
                    InputProps={{
                      startAdornment: <AlbumIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                {/* Duration and Release Date */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Duration (seconds)"
                    type="number"
                    placeholder="355"
                    inputProps={{ min: 1, max: 7200 }}
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    error={!!errors.duration}
                    helperText={errors.duration || `${duration ? formatDuration(duration) : "0:00"} (1-7200 seconds)`}
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
                    helperText="Song release date"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      startAdornment: <DateIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                {/* Musicians Section */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }}>
                    <Chip label="Artists & Musicians" />
                  </Divider>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
                    <PersonIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    Musicians ({getValidMusiciansCount()} added)
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Add the artists, musicians, or performers who performed this song
                  </Typography>
                  
                  <Stack spacing={2}>
                    {musicians.map((musician, index) => (
                      <Card key={index} variant="outlined" sx={{ p: 2 }}>
                        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                          <TextField
                            fullWidth
                            label={`Musician #${index + 1}`}
                            placeholder="Freddie Mercury"
                            value={musician.name}
                            onChange={(e) => handleMusicianChange(index, e.target.value)}
                            size="small"
                            InputProps={{
                              startAdornment: <PersonIcon sx={{ mr: 1, color: "action.active" }} />,
                            }}
                          />
                          {musicians.length > 1 && (
                            <IconButton
                              onClick={() => handleDeleteMusician(index)}
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
                      onClick={handleAddMusician}
                      variant="outlined"
                      startIcon={<AddIcon />}
                      fullWidth
                      sx={{ borderStyle: "dashed" }}
                    >
                      Add Musician
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
            {/* Song Preview */}
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
              <Box sx={{ bgcolor: "warning.main", color: "white", p: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  <PreviewIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                  SOCIAL MEDIA PREVIEW
                </Typography>
              </Box>
              <Card sx={{ borderRadius: 0 }}>
                {imageUrl ? (
                  <CardMedia
                    component="img"
                    height="250"
                    image={imageUrl}
                    alt="Song cover"
                    sx={{ objectFit: "cover" }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <Box 
                    sx={{ 
                      height: 250, 
                      bgcolor: "#f5f5f5", 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center",
                      flexDirection: "column",
                      gap: 1
                    }}
                  >
                    <SongIcon sx={{ fontSize: 64, color: "text.secondary" }} />
                    <Typography color="text.secondary">
                      No song cover
                    </Typography>
                  </Box>
                )}
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {title || "Song Title"}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {description ? 
                      `${description.substring(0, 160)}${description.length > 160 ? "..." : ""}` : 
                      "Song description will appear here..."
                    }
                  </Typography>

                  <Typography variant="caption" color="primary" sx={{ textTransform: "uppercase" }}>
                    {getHostname(url)}
                  </Typography>

                  {getValidMusiciansCount() > 0 && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" fontWeight="bold" gutterBottom>
                        Artists:
                      </Typography>
                      <Stack direction="row" spacing={0.5} flexWrap="wrap">
                        {musicians.filter(m => m.name.trim()).slice(0, 3).map((musician, index) => (
                          <Chip 
                            key={index} 
                            label={musician.name} 
                            size="small" 
                            color="secondary" 
                            variant="outlined"
                          />
                        ))}
                        {getValidMusiciansCount() > 3 && (
                          <Chip 
                            label={`+${getValidMusiciansCount() - 3} more`} 
                            size="small" 
                            variant="outlined"
                          />
                        )}
                      </Stack>
                    </Box>
                  )}

                  {duration && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
                      <TimerIcon fontSize="small" />
                      <Typography variant="body2">
                        Duration: {formatDuration(duration)}
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

                  <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                    {audioUrl && (
                      <Chip 
                        icon={<PlayIcon />}
                        label="Playable" 
                        size="small" 
                        color="primary" 
                      />
                    )}
                    {albumUrl && (
                      <Chip 
                        icon={<AlbumIcon />}
                        label="From Album" 
                        size="small" 
                        color="secondary" 
                      />
                    )}
                  </Stack>
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
                      Song Title: {title.trim() ? "✓ Added" : "✗ Required"}
                    </Typography>
                  </Alert>
                  
                  <Alert severity={url.trim() ? "success" : "error"} variant="outlined">
                    <Typography variant="caption">
                      URL: {url.trim() ? "✓ Added" : "✗ Required"}
                    </Typography>
                  </Alert>
                  
                  <Alert severity={imageUrl.trim() ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Cover Image: {imageUrl.trim() ? "✓ Added" : "ℹ Optional but recommended"}
                    </Typography>
                  </Alert>

                  <Alert severity={description.trim() ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Description: {description.trim() ? "✓ Added" : "ℹ Optional but recommended"}
                    </Typography>
                  </Alert>

                  <Alert severity={audioUrl.trim() ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Audio URL: {audioUrl.trim() ? "✓ Added" : "ℹ Optional but recommended"}
                    </Typography>
                  </Alert>

                  <Alert severity={getValidMusiciansCount() > 0 ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Musicians: {getValidMusiciansCount() > 0 ? `✓ ${getValidMusiciansCount()} added` : "ℹ Optional"}
                    </Typography>
                  </Alert>

                  <Alert severity={duration ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Duration: {duration ? `✓ ${formatDuration(duration)}` : "ℹ Optional"}
                    </Typography>
                  </Alert>

                  <Alert severity={albumUrl.trim() ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Album URL: {albumUrl.trim() ? "✓ Added" : "ℹ Optional"}
                    </Typography>
                  </Alert>

                  <Alert severity={dateReleased ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Release Date: {dateReleased ? "✓ Set" : "ℹ Optional"}
                    </Typography>
                  </Alert>
                </Stack>
              </Box>
            </Paper>

            {/* Music Song Meta Tags Info */}
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
              <Box sx={{ bgcolor: "info.main", color: "white", p: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  ABOUT MUSIC SONG OPEN GRAPH
                </Typography>
              </Box>
              <Box sx={{ p: 2 }}>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" fontWeight="bold" gutterBottom>
                      Benefits:
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Enhanced song sharing on social media
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Better music discovery and SEO
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Rich previews with song covers
                    </Typography>
                    <Typography variant="caption" display="block">
                      • Audio integration with social platforms
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="body2" fontWeight="bold" gutterBottom>
                      Song-Specific Tags:
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • music:musician - Artist information
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • music:duration - Song length
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • music:album - Related album
                    </Typography>
                    <Typography variant="caption" display="block">
                      • music:release_date - Release date
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

export default MusicSong;
