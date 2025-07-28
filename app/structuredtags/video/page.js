// "use client";

// import React, { useState } from "react";
// import { CopyToClipboard } from "react-copy-to-clipboard";
// import {
//   businessCategories,
//   countries,
//   currencies,
//   organizations,
//   timezones,
// } from "@/app/constant";
// const Video = () => {
//   const formatDate = (date) => {
//     const d = new Date(date);
//     const year = d.getFullYear();
//     let month = d.getMonth() + 1;
//     if (month < 10) month = `0${month}`;
//     let day = d.getDate();
//     if (day < 10) day = `0${day}`;
//     return `${year}-${month}-${day}`;
//   };

//   const [videoName, setVideoName] = useState("");
//   const [videoDescription, setVideoDescription] = useState("");
//   const [dateUploaded, setDateUploaded] = useState("");
//   const [contentUrl, setContentUrl] = useState("");
//   const [embedUrl, setEmbedUrl] = useState("");
//   const [thumbnailimageUrl, setThumbnailImageUrl] = useState("");
//   const [hours, setHours] = useState("");
//   const [minutes, setMinutes] = useState("");
//   const [seconds, setSeconds] = useState("");
//   const formatDuration = (hours, minutes, seconds) => {
//     let durationString = `PT${hours}H`;
//     if (minutes !== "") {
//       durationString += `${minutes}M`;
//     }
//     if (seconds !== "") {
//       durationString += `${seconds}S`;
//     }
//     return durationString;
//   };
//   const jsonData = {
//     "@context": "http://schema.org/",
//     "@type": "VideoObject",
//     name: videoName,
//     description: videoDescription,
//     uploadDate: dateUploaded,
//     ...(embedUrl && { embedUrl }),
//     ...(hours || minutes || seconds
//       ? { duration: formatDuration(hours, minutes, seconds) }
//       : {}),
//     contentUrl: contentUrl,
//     thumbnailUrl: thumbnailimageUrl,
//   };
//   const jsonText = JSON.stringify(jsonData, null, 2);

//   return (
//     <div className="px-3 w-full">
//       <h1 className="text-white text-xl text-bold">
//         Video Structured Data Generator
//       </h1>

//       <div className="flex mt-5">
//         <div className="w-1/2 border">
//           <h1 className="text-white uppercase font-semibold py-1 pl-5 bg-slate-600">
//             OPTIONS
//           </h1>
//           <div className="py-4 px-5 bg-gray-800">
//             <form>
//               <h1 className="text-white font-semibold mt-5">Video Details </h1>

//               <div className="mt-5">
//                 <input
//                   type="text"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter  Name"
//                   value={videoName}
//                   onChange={(e) => setVideoName(e.target.value)}
//                 />
//               </div>

//               <div className="mt-5 ">
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
//                   value={videoDescription}
//                   onChange={(e) => setVideoDescription(e.target.value)}
//                 ></textarea>
//               </div>

//               <div className="mt-5">
//                 <input
//                   type="date"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Website Url"
//                   value={dateUploaded}
//                   onChange={(e) => setDateUploaded(e.target.value)}
//                 />
//               </div>

//               <div className="mt-5">
//                 <input
//                   type="text"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Content Url"
//                   value={contentUrl}
//                   onChange={(e) => setContentUrl(e.target.value)}
//                 />
//               </div>
//               <div className="mt-5">
//                 <input
//                   type="text"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Embeded Url"
//                   value={embedUrl}
//                   onChange={(e) => setEmbedUrl(e.target.value)}
//                 />
//               </div>

//               <div className="mt-5">
//                 <input
//                   type="text"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Thumbnail Url"
//                   value={thumbnailimageUrl}
//                   onChange={(e) => setThumbnailImageUrl(e.target.value)}
//                 />
//               </div>

//               <h1 className="text-white font-semibold mt-5">Duration </h1>

//               <div className="mt-5">
//                 <input
//                   type="number"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Hours"
//                   value={hours}
//                   onChange={(e) => setHours(e.target.value)}
//                 />
//               </div>
//               <div className="mt-5">
//                 <input
//                   type="number"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Minutes"
//                   value={minutes}
//                   onChange={(e) => setMinutes(e.target.value)}
//                 />
//               </div>
//               <div className="mt-5">
//                 <input
//                   type="number"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Seconds"
//                   value={seconds}
//                   onChange={(e) => setSeconds(e.target.value)}
//                 />
//               </div>

//               {/* Other form fields go here */}
//             </form>
//           </div>
//         </div>
//         <div className="w-1/2	  border overflow-auto" >
//           <div>
//             <h1 className="text-white uppercase font-semibold py-1 pl-5 bg-slate-600">
//               CODE
//             </h1>
//             <div className="text-white font-semibold py-2 pl-5 text-xs bg-slate-800">
//               <p className="bg">
//                 Copy this to the &lt;head&gt; section of your page.
//               </p>
//             </div>
//             <CopyToClipboard
//               text={`<script type="application/ld+json">\n${jsonText}\n</script>`}
//             >
//               <div className="ml-auto w-1/6 mt-2">
//                 <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//                   Copy
//                 </button>
//               </div>
//             </CopyToClipboard>

//             <div className="space-y-2 mt-5 ml-4">
//               <pre className="text-white">
//                 <pre className="text-white">
//                   {`<script type="application/ld+json">\n`}
//                   {jsonText}
//                   {`\n</script>`}
//                 </pre>
//               </pre>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Video;


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
  VideoLibrary as VideoIcon,
  CheckCircle as CheckIcon,
  Preview as PreviewIcon,
  Code as CodeIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Image as ImageIcon,
  Timer as TimerIcon,
  Link as LinkIcon,
  DateRange as DateIcon,
  Description as DescriptionIcon,
  CloudUpload as UploadIcon,
  PlayCircle as PlayIcon,
} from "@mui/icons-material";

const Video = () => {
  const [videoName, setVideoName] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [dateUploaded, setDateUploaded] = useState("");
  const [contentUrl, setContentUrl] = useState("");
  const [embedUrl, setEmbedUrl] = useState("");
  const [thumbnailImageUrl, setThumbnailImageUrl] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState({});

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!videoName.trim()) newErrors.videoName = "Video name is required";
    if (!contentUrl.trim()) newErrors.contentUrl = "Content URL is required";

    // URL validation
    const urlPattern = /^https?:\/\/.+/;
    if (contentUrl && !urlPattern.test(contentUrl)) {
      newErrors.contentUrl = "Please enter a valid URL starting with http:// or https://";
    }
    if (embedUrl && !urlPattern.test(embedUrl)) {
      newErrors.embedUrl = "Please enter a valid URL starting with http:// or https://";
    }
    if (thumbnailImageUrl && !urlPattern.test(thumbnailImageUrl)) {
      newErrors.thumbnailImageUrl = "Please enter a valid URL starting with http:// or https://";
    }

    // Duration validation
    if (hours && (hours < 0 || hours > 23)) {
      newErrors.hours = "Hours must be between 0 and 23";
    }
    if (minutes && (minutes < 0 || minutes > 59)) {
      newErrors.minutes = "Minutes must be between 0 and 59";
    }
    if (seconds && (seconds < 0 || seconds > 59)) {
      newErrors.seconds = "Seconds must be between 0 and 59";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    validateForm();
  }, [videoName, contentUrl, embedUrl, thumbnailImageUrl, hours, minutes, seconds]);

  const formatDuration = (hours, minutes, seconds) => {
    if (!hours && !minutes && !seconds) return "";
    
    let durationString = "PT";
    if (hours && hours > 0) durationString += `${hours}H`;
    if (minutes && minutes > 0) durationString += `${minutes}M`;
    if (seconds && seconds > 0) durationString += `${seconds}S`;
    
    return durationString === "PT" ? "" : durationString;
  };

  const generateJSON = () => {
    return {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: videoName,
      ...(videoDescription && { description: videoDescription }),
      ...(dateUploaded && { uploadDate: dateUploaded }),
      contentUrl: contentUrl,
      ...(embedUrl && { embedUrl: embedUrl }),
      ...(thumbnailImageUrl && { thumbnailUrl: thumbnailImageUrl }),
      ...(formatDuration(hours, minutes, seconds) && { 
        duration: formatDuration(hours, minutes, seconds) 
      }),
    };
  };

  const jsonText = JSON.stringify(generateJSON(), null, 2);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isFormValid = Object.keys(errors).length === 0 && videoName.trim() && contentUrl.trim();

  const getDurationString = () => {
    const h = parseInt(hours) || 0;
    const m = parseInt(minutes) || 0;
    const s = parseInt(seconds) || 0;
    
    if (h === 0 && m === 0 && s === 0) return "No duration set";
    
    const parts = [];
    if (h > 0) parts.push(`${h}h`);
    if (m > 0) parts.push(`${m}m`);
    if (s > 0) parts.push(`${s}s`);
    
    return parts.join(" ");
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
          <VideoIcon sx={{ fontSize: 32 }} />
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Video Structured Data Generator
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
              Create structured data for videos to enhance search visibility and rich results.
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
                VIDEO CONFIGURATION
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
                {/* Video Details Section */}
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom color="primary" fontWeight="bold">
                    <VideoIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    Video Details
                  </Typography>
                </Grid>

                {/* Video Name */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Video Name *"
                    placeholder="How to Make Chocolate Chip Cookies"
                    value={videoName}
                    onChange={(e) => setVideoName(e.target.value)}
                    error={!!errors.videoName}
                    helperText={errors.videoName || `${videoName.length} characters`}
                    InputProps={{
                      startAdornment: <VideoIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                {/* Description */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Video Description"
                    placeholder="A detailed guide on how to make delicious chocolate chip cookies from scratch..."
                    multiline
                    rows={3}
                    value={videoDescription}
                    onChange={(e) => setVideoDescription(e.target.value)}
                    helperText={`${videoDescription.length} characters (recommended: 50+ for SEO)`}
                    InputProps={{
                      startAdornment: <DescriptionIcon sx={{ mr: 1, color: "action.active", alignSelf: "flex-start", mt: 1 }} />,
                    }}
                  />
                </Grid>

                {/* Upload Date */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Upload Date"
                    type="date"
                    value={dateUploaded}
                    onChange={(e) => setDateUploaded(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      startAdornment: <DateIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                {/* URLs Section */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }}>
                    <Chip label="Video URLs" />
                  </Divider>
                </Grid>

                {/* Content URL */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Content URL *"
                    placeholder="https://example.com/video.mp4"
                    value={contentUrl}
                    onChange={(e) => setContentUrl(e.target.value)}
                    error={!!errors.contentUrl}
                    helperText={errors.contentUrl || "Direct link to the video file"}
                    InputProps={{
                      startAdornment: <LinkIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                {/* Embed URL */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Embed URL"
                    placeholder="https://youtube.com/embed/abc123"
                    value={embedUrl}
                    onChange={(e) => setEmbedUrl(e.target.value)}
                    error={!!errors.embedUrl}
                    helperText={errors.embedUrl || "Embeddable video URL (e.g., YouTube embed link)"}
                    InputProps={{
                      startAdornment: <PlayIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                {/* Thumbnail URL */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Thumbnail Image URL"
                    placeholder="https://example.com/thumbnail.jpg"
                    value={thumbnailImageUrl}
                    onChange={(e) => setThumbnailImageUrl(e.target.value)}
                    error={!!errors.thumbnailImageUrl}
                    helperText={errors.thumbnailImageUrl || "Preview image for the video"}
                    InputProps={{
                      startAdornment: <ImageIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                {/* Duration Section */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }}>
                    <Chip label="Video Duration" />
                  </Divider>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
                    <TimerIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    Duration Information
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Specify the length of your video (all fields are optional)
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Hours"
                    type="number"
                    placeholder="0"
                    inputProps={{ min: 0, max: 23 }}
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    error={!!errors.hours}
                    helperText={errors.hours || "0-23 hours"}
                    InputProps={{
                      startAdornment: <TimerIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Minutes"
                    type="number"
                    placeholder="15"
                    inputProps={{ min: 0, max: 59 }}
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
                    error={!!errors.minutes}
                    helperText={errors.minutes || "0-59 minutes"}
                    InputProps={{
                      startAdornment: <TimerIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Seconds"
                    type="number"
                    placeholder="30"
                    inputProps={{ min: 0, max: 59 }}
                    value={seconds}
                    onChange={(e) => setSeconds(e.target.value)}
                    error={!!errors.seconds}
                    helperText={errors.seconds || "0-59 seconds"}
                    InputProps={{
                      startAdornment: <TimerIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                {/* Duration Preview */}
                {(hours || minutes || seconds) && (
                  <Grid item xs={12}>
                    <Box sx={{ p: 2, bgcolor: "#f9f9f9", borderRadius: 1 }}>
                      <Typography variant="body2" fontWeight="bold">
                        Duration Preview: {getDurationString()}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Schema.org format: {formatDuration(hours, minutes, seconds) || "Not set"}
                      </Typography>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Paper>

          {/* Generated Code */}
          <Paper elevation={3} sx={{ mt: 3, borderRadius: 2, overflow: "hidden" }}>
            <Box sx={{ bgcolor: "success.main", color: "white", p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6" fontWeight="bold">
                GENERATED JSON-LD CODE
              </Typography>
              <CopyToClipboard text={`<script type="application/ld+json">\n${jsonText}\n</script>`} onCopy={handleCopy}>
                <Tooltip title={copied ? "Copied!" : "Copy to clipboard"}>
                  <IconButton sx={{ color: "white" }}>
                    {copied ? <CheckIcon /> : <CopyIcon />}
                  </IconButton>
                </Tooltip>
              </CopyToClipboard>
            </Box>
            
            {!isFormValid && (
              <Alert severity="warning" sx={{ m: 0, borderRadius: 0 }}>
                Please fix the errors above to generate valid structured data.
              </Alert>
            )}
            
            <Alert severity="info" sx={{ m: 0, borderRadius: 0 }}>
              Add this JSON-LD script to the &lt;head&gt; section of your HTML page.
            </Alert>

            <Box sx={{ p: 3, bgcolor: "#1e1e1e", color: "#f8f8f2", maxHeight: 500, overflow: "auto" }}>
              <pre style={{ 
                fontFamily: "'Fira Code', monospace", 
                fontSize: "0.875rem", 
                lineHeight: "1.5",
                margin: 0,
                whiteSpace: "pre-wrap"
              }}>
                {`<script type="application/ld+json">
${jsonText}
</script>`}
              </pre>
            </Box>
          </Paper>
        </Grid>

        {/* Preview Panel */}
        <Grid item xs={12} lg={4}>
          <Stack spacing={2}>
            {/* Video Preview */}
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
              <Box sx={{ bgcolor: "warning.main", color: "white", p: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  <PreviewIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                  VIDEO PREVIEW
                </Typography>
              </Box>
              <Card sx={{ borderRadius: 0 }}>
                {thumbnailImageUrl ? (
                  <CardMedia
                    component="img"
                    height="200"
                    image={thumbnailImageUrl}
                    alt="Video thumbnail"
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
                    <VideoIcon sx={{ fontSize: 48, color: "text.secondary" }} />
                    <Typography color="text.secondary">
                      No thumbnail selected
                    </Typography>
                  </Box>
                )}
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {videoName || "Video Title"}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {videoDescription ? 
                      `${videoDescription.substring(0, 150)}${videoDescription.length > 150 ? "..." : ""}` : 
                      "Video description will appear here..."
                    }
                  </Typography>

                  {dateUploaded && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <UploadIcon fontSize="small" />
                      <Typography variant="body2">
                        Uploaded: {new Date(dateUploaded).toLocaleDateString()}
                      </Typography>
                    </Box>
                  )}

                  {(hours || minutes || seconds) && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <TimerIcon fontSize="small" />
                      <Typography variant="body2">
                        Duration: {getDurationString()}
                      </Typography>
                    </Box>
                  )}

                  {contentUrl && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <LinkIcon fontSize="small" />
                      <Typography variant="body2" noWrap>
                        {contentUrl.length > 40 ? `${contentUrl.substring(0, 40)}...` : contentUrl}
                      </Typography>
                    </Box>
                  )}

                  {embedUrl && (
                    <Chip 
                      icon={<PlayIcon />} 
                      label="Embeddable" 
                      size="small" 
                      color="primary" 
                      sx={{ mt: 1 }}
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
                  <Alert severity={videoName.trim() ? "success" : "error"} variant="outlined">
                    <Typography variant="caption">
                      Video Name: {videoName.trim() ? "✓ Added" : "✗ Required"}
                    </Typography>
                  </Alert>
                  
                  <Alert severity={contentUrl.trim() ? "success" : "error"} variant="outlined">
                    <Typography variant="caption">
                      Content URL: {contentUrl.trim() ? "✓ Added" : "✗ Required"}
                    </Typography>
                  </Alert>
                  
                  <Alert severity={videoDescription.trim() ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Description: {videoDescription.trim() ? "✓ Added" : "ℹ Optional but recommended"}
                    </Typography>
                  </Alert>

                  <Alert severity={thumbnailImageUrl.trim() ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Thumbnail: {thumbnailImageUrl.trim() ? "✓ Added" : "ℹ Optional but recommended"}
                    </Typography>
                  </Alert>

                  <Alert severity={embedUrl.trim() ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Embed URL: {embedUrl.trim() ? "✓ Added" : "ℹ Optional"}
                    </Typography>
                  </Alert>

                  <Alert severity={(hours || minutes || seconds) ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Duration: {(hours || minutes || seconds) ? `✓ ${getDurationString()}` : "ℹ Optional"}
                    </Typography>
                  </Alert>

                  <Alert severity={dateUploaded ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Upload Date: {dateUploaded ? "✓ Set" : "ℹ Optional"}
                    </Typography>
                  </Alert>
                </Stack>
              </Box>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Video;
