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
  Radio as RadioIcon,
  CheckCircle as CheckIcon,
  Preview as PreviewIcon,
  Code as CodeIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Image as ImageIcon,
  Link as LinkIcon,
  Description as DescriptionIcon,
  Person as PersonIcon,
  Title as TitleIcon,
  Share as ShareIcon,
  AudioFile as AudioIcon,
  LibraryMusic as MusicIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Radio as BroadcastIcon, // ✅ FIXED: Changed from Broadcast to Radio
  GraphicEq as FrequencyIcon,
  Mic as MicIcon,
} from "@mui/icons-material";

const MusicRadioStation = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [creators, setCreators] = useState([{ name: "" }]);
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

  // ✅ FIXED: Added useCallback to fix the useEffect dependency warning
  const validateForm = React.useCallback(() => {
    const newErrors = {};

    if (!title.trim()) newErrors.title = "Radio station name is required";
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [title, url, imageUrl, audioUrl]);

  useEffect(() => {
    validateForm();
  }, [validateForm]); // ✅ FIXED: Now properly includes validateForm as dependency

  const generateMetaTags = () => {
    const metaTags = [];
    
    // Fix: Changed from "book" to "music.radio_station"
    metaTags.push('<meta property="og:type" content="music.radio_station" />');
    if (title) metaTags.push(`<meta property="og:title" content="${title}" />`);
    if (url) metaTags.push(`<meta property="og:url" content="${url}" />`);
    if (imageUrl) metaTags.push(`<meta property="og:image" content="${imageUrl}" />`);
    if (description) metaTags.push(`<meta property="og:description" content="${description}" />`);
    if (audioUrl) metaTags.push(`<meta property="og:audio" content="${audioUrl}" />`);
    
    // Add creators (only non-empty ones)
    creators.forEach((creator) => {
      if (creator.name.trim()) {
        metaTags.push(`<meta property="music:creator" content="${creator.name.trim()}" />`);
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

  // Creators handlers
  const handleAddCreator = () => {
    setCreators([...creators, { name: "" }]);
  };

  const handleDeleteCreator = (index) => {
    if (creators.length > 1) {
      const updatedCreators = [...creators];
      updatedCreators.splice(index, 1);
      setCreators(updatedCreators);
    }
  };

  const handleCreatorChange = (index, value) => {
    const updatedCreators = [...creators];
    updatedCreators[index].name = value;
    setCreators(updatedCreators);
  };

  const getValidCreatorsCount = () => {
    return creators.filter(creator => creator.name.trim()).length;
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
          <RadioIcon sx={{ fontSize: 32 }} />
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Music Radio Station Open Graph Generator
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
              Create Open Graph meta tags for radio stations to optimize social media sharing and music discovery.
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
                RADIO STATION CONFIGURATION
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
                {/* Radio Station Details Section */}
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom color="primary" fontWeight="bold">
                    <BroadcastIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    Radio Station Details
                  </Typography>
                </Grid>

                {/* Title */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Radio Station Name *"
                    placeholder="Classic Rock FM 101.5"
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
                    label="Radio Station URL *"
                    placeholder="https://classicrockfm.com"
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
                    label="Station Logo/Image URL"
                    placeholder="https://example.com/radio-logo.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    error={!!errors.imageUrl}
                    helperText={errors.imageUrl || "Recommended size: 1200x627 pixels for optimal social sharing"}
                    InputProps={{
                      startAdornment: <ImageIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                {/* Description */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Station Description"
                    placeholder="The best classic rock hits from the 70s, 80s, and 90s. Playing your favorite artists 24/7..."
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

                {/* Audio Stream URL */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Live Stream URL"
                    placeholder="https://stream.classicrockfm.com/live"
                    value={audioUrl}
                    onChange={(e) => setAudioUrl(e.target.value)}
                    error={!!errors.audioUrl}
                    helperText={errors.audioUrl || "The URL to listen to this radio station live"}
                    InputProps={{
                      startAdornment: <AudioIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                {/* Station Team Section */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }}>
                    <Chip label="Station Team & DJs" />
                  </Divider>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
                    <MicIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    DJs & Team Members ({getValidCreatorsCount()} added)
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Add the DJs, hosts, or team members associated with this radio station
                  </Typography>
                  
                  <Stack spacing={2}>
                    {creators.map((creator, index) => (
                      <Card key={index} variant="outlined" sx={{ p: 2 }}>
                        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                          <TextField
                            fullWidth
                            label={`DJ/Host #${index + 1}`}
                            placeholder="DJ Rock Master"
                            value={creator.name}
                            onChange={(e) => handleCreatorChange(index, e.target.value)}
                            size="small"
                            InputProps={{
                              startAdornment: <PersonIcon sx={{ mr: 1, color: "action.active" }} />,
                            }}
                          />
                          {creators.length > 1 && (
                            <IconButton
                              onClick={() => handleDeleteCreator(index)}
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
                      onClick={handleAddCreator}
                      variant="outlined"
                      startIcon={<AddIcon />}
                      fullWidth
                      sx={{ borderStyle: "dashed" }}
                    >
                      Add DJ/Host
                    </Button>
                  </Stack>
                </Grid>

                {/* Radio Station Features */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }}>
                    <Chip label="Station Features" />
                  </Divider>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
                    Radio Station Benefits
                  </Typography>
                  <Stack spacing={1}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CheckIcon color="success" fontSize="small" />
                      <Typography variant="body2">
                        Live streaming capabilities with audio preview
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CheckIcon color="success" fontSize="small" />
                      <Typography variant="body2">
                        Enhanced social media sharing with rich previews
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CheckIcon color="success" fontSize="small" />
                      <Typography variant="body2">
                        Better discovery through music platforms
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CheckIcon color="success" fontSize="small" />
                      <Typography variant="body2">
                        Professional presentation across all social platforms
                      </Typography>
                    </Box>
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
            {/* Radio Station Preview */}
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
                    height="200"
                    image={imageUrl}
                    alt="Radio station logo"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <Box 
                    sx={{ 
                      height: 200, 
                      bgcolor: "#f5f5f5", 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center",
                      flexDirection: "column",
                      gap: 1
                    }}
                  >
                    <RadioIcon sx={{ fontSize: 48, color: "text.secondary" }} />
                    <Typography color="text.secondary">
                      No station logo
                    </Typography>
                  </Box>
                )}
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {title || "Radio Station Name"}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {description ? 
                      `${description.substring(0, 160)}${description.length > 160 ? "..." : ""}` : 
                      "Radio station description will appear here..."
                    }
                  </Typography>

                  <Typography variant="caption" color="primary" sx={{ textTransform: "uppercase" }}>
                    {getHostname(url)}
                  </Typography>

                  {getValidCreatorsCount() > 0 && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" fontWeight="bold" gutterBottom>
                        Featured DJs:
                      </Typography>
                      <Stack direction="row" spacing={0.5} flexWrap="wrap">
                        {creators.filter(c => c.name.trim()).slice(0, 3).map((creator, index) => (
                          <Chip 
                            key={index} 
                            label={creator.name} 
                            size="small" 
                            color="secondary" 
                            variant="outlined"
                            icon={<MicIcon fontSize="small" />}
                          />
                        ))}
                        {getValidCreatorsCount() > 3 && (
                          <Chip 
                            label={`+${getValidCreatorsCount() - 3} more`} 
                            size="small" 
                            variant="outlined"
                          />
                        )}
                      </Stack>
                    </Box>
                  )}

                  <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                    <Chip 
                      icon={<RadioIcon />}
                      label="Radio Station" 
                      size="small" 
                      color="primary" 
                    />
                    {audioUrl && (
                      <Chip 
                        icon={<AudioIcon />}
                        label="Live Stream" 
                        size="small" 
                        color="success" 
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
                      Station Name: {title.trim() ? "✓ Added" : "✗ Required"}
                    </Typography>
                  </Alert>
                  
                  <Alert severity={url.trim() ? "success" : "error"} variant="outlined">
                    <Typography variant="caption">
                      URL: {url.trim() ? "✓ Added" : "✗ Required"}
                    </Typography>
                  </Alert>
                  
                  <Alert severity={imageUrl.trim() ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Station Logo: {imageUrl.trim() ? "✓ Added" : "ℹ Optional but recommended"}
                    </Typography>
                  </Alert>

                  <Alert severity={description.trim() ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Description: {description.trim() ? "✓ Added" : "ℹ Optional but recommended"}
                    </Typography>
                  </Alert>

                  <Alert severity={audioUrl.trim() ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Live Stream: {audioUrl.trim() ? "✓ Added" : "ℹ Optional but recommended"}
                    </Typography>
                  </Alert>

                  <Alert severity={getValidCreatorsCount() > 0 ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      DJs/Hosts: {getValidCreatorsCount() > 0 ? `✓ ${getValidCreatorsCount()} added` : "ℹ Optional"}
                    </Typography>
                  </Alert>
                </Stack>
              </Box>
            </Paper>

            {/* Radio Station Meta Tags Info */}
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
              <Box sx={{ bgcolor: "info.main", color: "white", p: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  ABOUT RADIO STATION OPEN GRAPH
                </Typography>
              </Box>
              <Box sx={{ p: 2 }}>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" fontWeight="bold" gutterBottom>
                      Benefits:
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Enhanced radio station sharing on social media
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Better music discovery and SEO
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Rich previews with station logos
                    </Typography>
                    <Typography variant="caption" display="block">
                      • Live stream integration with social platforms
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="body2" fontWeight="bold" gutterBottom>
                      Radio-Specific Tags:
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • music:creator - DJ/Host information
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • og:audio - Live stream URL
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • og:type - music.radio_station classification
                    </Typography>
                    <Typography variant="caption" display="block">
                      • Station branding and identity
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

export default MusicRadioStation;


// "use client";

// import React, { useState } from "react";
// import { CopyToClipboard } from "react-copy-to-clipboard";

// const MusicRadioStation = () => {
//   const [title, setTitle] = useState("");
//   const [url, setUrl] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const [description, setDescription] = useState("");

//   const [audioUrl, setAudioUrl] = useState("");
//   const [dateReleased, setDateReleased] = useState("");
//   const [musicians, setMusicians] = useState([{ name: "" }]);
//   const [musicianName, setMusicianName] = useState("");

//   const [songs, setSongs] = useState([{ name: "" }]);
//   const [songName, setSongName] = useState("");

//   const generateMetaTags = () => {
//     let metaTags = `<meta property="og:type" content="book">\n`;
//     metaTags += `<meta property="og:title" content="${title}" />\n`;
//     metaTags += `<meta property="og:url" content="${url}" />\n`;

//     metaTags += `<meta property="og:image" content="${imageUrl}" />\n`;
//     if (description)
//       metaTags += `<meta property="og:description" content="${description}" />\n`;
//     if (audioUrl)
//       metaTags += `<meta property="og:audio" content="${audioUrl}" />\n`;

//     musicians.forEach((musician, index) => {
//       metaTags += `<meta property="music:creator" content="${musician.name}" />\n`;
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

//   const handleAddSong = () => {
//     setSongs([...songs, { name: "" }]);
//   };

//   const handleDeleteSong = (index) => {
//     const updatedSongs = [...songs];
//     updatedSongs.splice(index, 1);
//     setSongs(updatedSongs);
//   };
//   return (
//     <div className="px-3">
//       <h1 className="text-white text-xl text-bold">
//         Music Playlist Open Graph Generator
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
//                   Audio Url
//                 </label>
//                 <input
//                   type="text"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Title"
//                   value={audioUrl}
//                   onChange={(e) => setAudioUrl(e.target.value)}
//                 />
//                 <span className="text-white text-xs">
//                   Must include http(s)://. The URL to play this playlist.
//                 </span>
//               </div>

//               <h1 className="text-white font-semibold mt-5">Creators </h1>
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
//                       placeholder={`Creator #${index + 1}`}
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
//                   Add Creator
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

// export default MusicRadioStation;
