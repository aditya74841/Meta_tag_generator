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
  Album as AlbumIcon,
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
  MusicNote as SongIcon,
  Title as TitleIcon,
  Share as ShareIcon,
  AudioFile as AudioIcon,
  LibraryMusic as MusicIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  QueueMusic as PlaylistIcon,
} from "@mui/icons-material";

const MusicAlbum = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [dateReleased, setDateReleased] = useState("");
  const [musicians, setMusicians] = useState([{ name: "" }]);
  const [songs, setSongs] = useState([{ name: "" }]);
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

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) newErrors.title = "Album title is required";
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
  };

  useEffect(() => {
    validateForm();
  }, [title, url, imageUrl, audioUrl]);

  const generateMetaTags = () => {
    const metaTags = [];
    
    // Fix: Changed from "book" to "music.album"
    metaTags.push('<meta property="og:type" content="music.album" />');
    if (title) metaTags.push(`<meta property="og:title" content="${title}" />`);
    if (url) metaTags.push(`<meta property="og:url" content="${url}" />`);
    if (imageUrl) metaTags.push(`<meta property="og:image" content="${imageUrl}" />`);
    if (description) metaTags.push(`<meta property="og:description" content="${description}" />`);
    if (audioUrl) metaTags.push(`<meta property="og:audio" content="${audioUrl}" />`);
    if (dateReleased) metaTags.push(`<meta property="music:release_date" content="${dateReleased}" />`);
    
    // Add musicians (only non-empty ones)
    musicians.forEach((musician) => {
      if (musician.name.trim()) {
        metaTags.push(`<meta property="music:musician" content="${musician.name.trim()}" />`);
      }
    });
    
    // Add songs (only non-empty ones)
    songs.forEach((song) => {
      if (song.name.trim()) {
        metaTags.push(`<meta property="music:song" content="${song.name.trim()}" />`);
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

  // Songs handlers
  const handleAddSong = () => {
    setSongs([...songs, { name: "" }]);
  };

  const handleDeleteSong = (index) => {
    if (songs.length > 1) {
      const updatedSongs = [...songs];
      updatedSongs.splice(index, 1);
      setSongs(updatedSongs);
    }
  };

  const handleSongChange = (index, value) => {
    const updatedSongs = [...songs];
    updatedSongs[index].name = value;
    setSongs(updatedSongs);
  };

  const formatDateForDisplay = (dateString) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleDateString();
  };

  const getValidMusiciansCount = () => {
    return musicians.filter(musician => musician.name.trim()).length;
  };

  const getValidSongsCount = () => {
    return songs.filter(song => song.name.trim()).length;
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
          <AlbumIcon sx={{ fontSize: 32 }} />
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Music Album Open Graph Generator
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
              Create Open Graph meta tags for music albums to optimize social media sharing and music discovery.
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
                ALBUM CONFIGURATION
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
                {/* Album Details Section */}
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom color="primary" fontWeight="bold">
                    <AlbumIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    Album Details
                  </Typography>
                </Grid>

                {/* Title */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Album Title *"
                    placeholder="Abbey Road"
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
                    label="Album URL *"
                    placeholder="https://music.example.com/albums/abbey-road"
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
                    label="Album Cover URL"
                    placeholder="https://example.com/album-cover.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    error={!!errors.imageUrl}
                    helperText={errors.imageUrl || "Recommended size: 1200x1200 pixels (square format for album covers)"}
                    InputProps={{
                      startAdornment: <ImageIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                {/* Description */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Album Description"
                    placeholder="The iconic final studio album by The Beatles, featuring classic tracks like 'Come Together' and 'Here Comes the Sun'..."
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

                {/* Audio URL and Release Date */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Audio Preview URL"
                    placeholder="https://example.com/album-preview.mp3"
                    value={audioUrl}
                    onChange={(e) => setAudioUrl(e.target.value)}
                    error={!!errors.audioUrl}
                    helperText={errors.audioUrl || "Link to audio preview or full album"}
                    InputProps={{
                      startAdornment: <AudioIcon sx={{ mr: 1, color: "action.active" }} />,
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
                    helperText="Album release date"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      startAdornment: <DateIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                {/* Musicians Section */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }}>
                    <Chip label="Musicians & Artists" />
                  </Divider>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
                    <PersonIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    Musicians ({getValidMusiciansCount()} added)
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Add the musicians, artists, or band members who performed on this album
                  </Typography>
                  
                  <Stack spacing={2}>
                    {musicians.map((musician, index) => (
                      <Card key={index} variant="outlined" sx={{ p: 2 }}>
                        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                          <TextField
                            fullWidth
                            label={`Musician #${index + 1}`}
                            placeholder="John Lennon"
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

                {/* Songs Section */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }}>
                    <Chip label="Track Listing" />
                  </Divider>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
                    <SongIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    Songs ({getValidSongsCount()} tracks)
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Add the songs/tracks included in this album
                  </Typography>
                  
                  <Stack spacing={2}>
                    {songs.map((song, index) => (
                      <Card 
                        key={index} 
                        variant="outlined" 
                        sx={{ 
                          p: 2,
                          border: song.name.trim() ? "2px solid #4CAF50" : "1px solid #e0e0e0"
                        }}
                      >
                        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: "60px" }}>
                            <Typography variant="body2" color="text.secondary">
                              #{index + 1}
                            </Typography>
                            <SongIcon fontSize="small" color="action" />
                          </Box>
                          <TextField
                            fullWidth
                            label={`Track ${index + 1}`}
                            placeholder="Come Together"
                            value={song.name}
                            onChange={(e) => handleSongChange(index, e.target.value)}
                            size="small"
                          />
                          {songs.length > 1 && (
                            <IconButton
                              onClick={() => handleDeleteSong(index)}
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
                      onClick={handleAddSong}
                      variant="outlined"
                      startIcon={<AddIcon />}
                      fullWidth
                      sx={{ borderStyle: "dashed", py: 1.5 }}
                    >
                      Add Track
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
            {/* Album Preview */}
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
                    alt="Album cover"
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
                    <AlbumIcon sx={{ fontSize: 64, color: "text.secondary" }} />
                    <Typography color="text.secondary">
                      No album cover
                    </Typography>
                  </Box>
                )}
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {title || "Album Title"}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {description ? 
                      `${description.substring(0, 160)}${description.length > 160 ? "..." : ""}` : 
                      "Album description will appear here..."
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

                  {dateReleased && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
                      <DateIcon fontSize="small" />
                      <Typography variant="body2">
                        Released: {formatDateForDisplay(dateReleased)}
                      </Typography>
                    </Box>
                  )}

                  {getValidSongsCount() > 0 && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" fontWeight="bold" gutterBottom>
                        {getValidSongsCount()} Track{getValidSongsCount() !== 1 ? 's' : ''}
                      </Typography>
                      {songs.filter(s => s.name.trim()).slice(0, 3).map((song, index) => (
                        <Typography key={index} variant="caption" display="block" color="text.secondary">
                          {index + 1}. {song.name}
                        </Typography>
                      ))}
                      {getValidSongsCount() > 3 && (
                        <Typography variant="caption" color="text.secondary">
                          ... and {getValidSongsCount() - 3} more tracks
                        </Typography>
                      )}
                    </Box>
                  )}

                  {audioUrl && (
                    <Chip 
                      icon={<AudioIcon />}
                      label="Audio Preview" 
                      size="small" 
                      color="primary" 
                      sx={{ mt: 2 }}
                    />
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
                      Album Title: {title.trim() ? "✓ Added" : "✗ Required"}
                    </Typography>
                  </Alert>
                  
                  <Alert severity={url.trim() ? "success" : "error"} variant="outlined">
                    <Typography variant="caption">
                      URL: {url.trim() ? "✓ Added" : "✗ Required"}
                    </Typography>
                  </Alert>
                  
                  <Alert severity={imageUrl.trim() ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Album Cover: {imageUrl.trim() ? "✓ Added" : "ℹ Optional but recommended"}
                    </Typography>
                  </Alert>

                  <Alert severity={description.trim() ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Description: {description.trim() ? "✓ Added" : "ℹ Optional but recommended"}
                    </Typography>
                  </Alert>

                  <Alert severity={getValidMusiciansCount() > 0 ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Musicians: {getValidMusiciansCount() > 0 ? `✓ ${getValidMusiciansCount()} added` : "ℹ Optional"}
                    </Typography>
                  </Alert>

                  <Alert severity={getValidSongsCount() > 0 ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Songs: {getValidSongsCount() > 0 ? `✓ ${getValidSongsCount()} tracks` : "ℹ Optional"}
                    </Typography>
                  </Alert>

                  <Alert severity={dateReleased ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Release Date: {dateReleased ? "✓ Set" : "ℹ Optional"}
                    </Typography>
                  </Alert>

                  <Alert severity={audioUrl.trim() ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Audio Preview: {audioUrl.trim() ? "✓ Added" : "ℹ Optional"}
                    </Typography>
                  </Alert>
                </Stack>
              </Box>
            </Paper>

            {/* Music Album Meta Tags Info */}
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
              <Box sx={{ bgcolor: "info.main", color: "white", p: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  ABOUT MUSIC ALBUM OPEN GRAPH
                </Typography>
              </Box>
              <Box sx={{ p: 2 }}>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" fontWeight="bold" gutterBottom>
                      Benefits:
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Enhanced music sharing on social media
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Better music discovery and SEO
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Rich previews with album covers
                    </Typography>
                    <Typography variant="caption" display="block">
                      • Audio integration with social platforms
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="body2" fontWeight="bold" gutterBottom>
                      Music-Specific Tags:
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • music:musician - Artist information
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • music:song - Track listing
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • music:release_date - Release date
                    </Typography>
                    <Typography variant="caption" display="block">
                      • og:audio - Audio preview URL
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

export default MusicAlbum;




// "use client";

// import React, { useState } from "react";
// import { CopyToClipboard } from "react-copy-to-clipboard";

// const MusicAlbum = () => {
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

//     if (dateReleased)
//       metaTags += `<meta property="music:release_date" content="${dateReleased}" />\n`;

//     musicians.forEach((musician, index) => {
//       metaTags += `<meta property="music:musician" content="${musician.name}" />\n`;
//     });

//     songs.forEach((song, index) => {
//       metaTags += `<meta property="music:song" content="${song.name}" />\n`;
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

//               <h1 className="text-white font-semibold mt-5">Songs </h1>
//               <span className="text-white text-xs mt-5">
//                 Provide a URL to a page with open graph data of type music.song.
//               </span>

//               <div className="mt-5">
//                 {songs.map((song, index) => (
//                   <div
//                     key={index}
//                     className="flex items-center  justify-center space-x-3 space-y-2"
//                   >
//                     <input
//                       type="text"
//                       className="bg-gray-50 border   border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder={`Enter Song #${index + 1}`}
//                       value={song.name}
//                       onChange={(e) => {
//                         const updatedSongs = [...songs];
//                         updatedSongs[index].name = e.target.value;
//                         setSongs(updatedSongs);
//                       }}
//                     />
//                     {songs.length > 1 && (
//                       <button
//                         type="button"
//                         className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline"
//                         onClick={() => handleDeleteSong(index)}
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
//                   onClick={handleAddSong}
//                 >
//                   Add Song
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

// export default MusicAlbum;
