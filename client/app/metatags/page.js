// "use client";
// import React, { useState } from "react";
// import { CopyToClipboard } from "react-copy-to-clipboard";
// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   TextareaAutosize,
//   Checkbox,
//   FormControlLabel,
//   Button,
//   Grid,
//   Card,
//   CardContent,
//   Chip,
//   Divider,
//   Alert,
//   Fade,
//   IconButton,
//   Tooltip,
// } from "@mui/material";
// import {
//   ContentCopy as CopyIcon,
//   Code as CodeIcon,
//   Visibility as PreviewIcon,
//   CheckCircle as CheckIcon,
//   Info as InfoIcon,
// } from "@mui/icons-material";

// const charsets = [
//   { value: "big5", label: "Big5" },
//   { value: "euc-kr", label: "EUC-KR" },
//   { value: "iso-8859-1", label: "ISO-8859-1" },
//   { value: "iso-8859-2", label: "ISO-8859-2" },
//   { value: "iso-8859-3", label: "ISO-8859-3" },
//   { value: "iso-8859-4", label: "ISO-8859-4" },
//   { value: "iso-8859-5", label: "ISO-8859-5" },
//   { value: "iso-8859-6", label: "ISO-8859-6" },
//   { value: "iso-8859-7", label: "ISO-8859-7" },
//   { value: "iso-8859-8", label: "ISO-8859-8" },
//   { value: "koi8-r", label: "KOI8-R" },
//   { value: "shift-jis", label: "Shift-JIS" },
//   { value: "x-euc", label: "X-EUC" },
//   { value: "utf-8", label: "UTF-8" },
//   { value: "windows-1250", label: "Windows-1250" },
//   { value: "windows-1251", label: "Windows-1251" },
//   { value: "windows-1252", label: "Windows-1252" },
//   { value: "windows-1253", label: "Windows-1253" },
//   { value: "windows-1254", label: "Windows-1254" },
//   { value: "windows-1255", label: "Windows-1255" },
//   { value: "windows-1256", label: "Windows-1256" },
//   { value: "windows-1257", label: "Windows-1257" },
//   { value: "windows-1258", label: "Windows-1258" },
//   { value: "windows-874", label: "Windows-874" },
// ];

// const MetaTags = () => {
//   const [charsetValue, setCharsetValue] = useState("utf-8");
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [author, setAuthor] = useState("");
//   const [copyright, setCopyright] = useState("");
//   const [robots, setRobots] = useState("index, follow");
//   const [enableViewport, setEnableViewport] = useState(true);
//   const [copied, setCopied] = useState(false);

//   const metaCharset = `<meta charset="${charsetValue}">`;
//   const metaViewport = `<meta name="viewport" content="width=device-width, initial-scale=1">`;
//   const metaTitle = `<title>${title}</title>`;
//   const metaDescription = `<meta name="description" content="${description}">`;
//   const metaAuthor = `<meta name="author" content="${author}">`;
//   const metaCopyright = `<meta name="copyright" content="${copyright}">`;
//   const metaRobots = `<meta name="robots" content="${robots}">`;

//   const generatedCode = 
//     `${metaCharset}\n` +
//     (enableViewport && metaViewport ? `${metaViewport}\n` : "") +
//     (title ? `${metaTitle}\n` : "") +
//     (description ? `${metaDescription}\n` : "") +
//     (author ? `${metaAuthor}\n` : "") +
//     (copyright ? `${metaCopyright}\n` : "") +
//     `${metaRobots}`;

//   const handleCopy = () => {
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <Box sx={{ p: 3, background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", minHeight: "100vh" }}>
//       {/* Header Section */}
//       <Paper 
//         elevation={3} 
//         sx={{ 
//           p: 3, 
//           mb: 3, 
//           background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//           color: "white",
//           borderRadius: 2
//         }}
//       >
//         <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//           <CodeIcon sx={{ fontSize: 32 }} />
//           <Box>
//             <Typography variant="h4" fontWeight="bold">
//               Meta Tags Generator
//             </Typography>
//             <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
//               {/* Generate your web page&apos;s most helpful meta tags to improve SEO and search engine experience. */}
//               { " Generate your web page's most helpful meta tags to improve SEO and search engine experience."}
//             </Typography>
//           </Box>
//         </Box>
//       </Paper>

//       <Grid container spacing={3}>
//         {/* Options Panel */}
//         <Grid item xs={12} md={6}>
//           <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
//             <Box sx={{ bgcolor: "primary.main", color: "white", p: 2 }}>
//               <Typography variant="h6" fontWeight="bold">
//                 OPTIONS
//               </Typography>
//             </Box>
//             <Box sx={{ p: 3, bgcolor: "background.paper" }}>
//               <Grid container spacing={2}>
//                 {/* Charset */}
//                 <Grid item xs={12}>
//                   <FormControl fullWidth>
//                     <InputLabel>Charset</InputLabel>
//                     <Select
//                       value={charsetValue}
//                       label="Charset"
//                       onChange={(e) => setCharsetValue(e.target.value)}
//                     >
//                       {charsets.map((charset) => (
//                         <MenuItem key={charset.value} value={charset.value}>
//                           {charset.label}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>
//                 </Grid>

//                 {/* Title */}
//                 <Grid item xs={12}>
//                   <TextField
//                     fullWidth
//                     label="Title"
//                     placeholder="Enter your page title"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     helperText={`${title.length}/60 characters (recommended)`}
//                     inputProps={{ maxLength: 120 }}
//                   />
//                 </Grid>

//                 {/* Description */}
//                 <Grid item xs={12}>
//                   <TextField
//                     fullWidth
//                     label="Description"
//                     placeholder="Enter your page description"
//                     multiline
//                     rows={3}
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     helperText={`${description.length}/160 characters (recommended)`}
//                     inputProps={{ maxLength: 300 }}
//                   />
//                 </Grid>

//                 {/* Author */}
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     fullWidth
//                     label="Author"
//                     placeholder="Enter author name"
//                     value={author}
//                     onChange={(e) => setAuthor(e.target.value)}
//                   />
//                 </Grid>

//                 {/* Copyright */}
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     fullWidth
//                     label="Copyright"
//                     placeholder="Enter copyright info"
//                     value={copyright}
//                     onChange={(e) => setCopyright(e.target.value)}
//                   />
//                 </Grid>

//                 {/* Robots */}
//                 <Grid item xs={12}>
//                   <FormControl fullWidth>
//                     <InputLabel>Robots</InputLabel>
//                     <Select
//                       value={robots}
//                       label="Robots"
//                       onChange={(e) => setRobots(e.target.value)}
//                     >
//                       <MenuItem value="index, follow">index, follow</MenuItem>
//                       <MenuItem value="index, nofollow">index, nofollow</MenuItem>
//                       <MenuItem value="noindex, follow">noindex, follow</MenuItem>
//                       <MenuItem value="noindex, nofollow">noindex, nofollow</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Grid>

//                 {/* Viewport Checkbox */}
//                 <Grid item xs={12}>
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         checked={enableViewport}
//                         onChange={(e) => setEnableViewport(e.target.checked)}
//                         color="primary"
//                       />
//                     }
//                     label={
//                       <Box>
//                         <Typography variant="body1">Enable viewport</Typography>
//                         <Typography variant="caption" color="text.secondary">
//                           Enable if your site is responsive
//                         </Typography>
//                       </Box>
//                     }
//                   />
//                 </Grid>
//               </Grid>
//             </Box>
//           </Paper>
//         </Grid>

//         {/* Code Panel */}
//         <Grid item xs={12} md={6}>
//           <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden", height: "fit-content" }}>
//             <Box sx={{ bgcolor: "success.main", color: "white", p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//               <Typography variant="h6" fontWeight="bold">
//                 GENERATED CODE
//               </Typography>
//               <Chip 
//                 label={`${generatedCode.split('\n').filter(line => line.trim()).length} tags`} 
//                 sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white" }}
//               />
//             </Box>
            
//             <Alert severity="info" sx={{ m: 0, borderRadius: 0 }}>
//               Copy this code to the &lt;head&gt; section of your HTML page.
//             </Alert>

//             <Box sx={{ p: 3, bgcolor: "#1e1e1e", color: "#f8f8f2", position: "relative" }}>
//               <CopyToClipboard text={generatedCode} onCopy={handleCopy}>
//                 <Tooltip title={copied ? "Copied!" : "Copy to clipboard"}>
//                   <IconButton
//                     sx={{
//                       position: "absolute",
//                       top: 8,
//                       right: 8,
//                       color: copied ? "success.main" : "primary.main",
//                       bgcolor: "rgba(255,255,255,0.1)",
//                       "&:hover": { bgcolor: "rgba(255,255,255,0.2)" }
//                     }}
//                   >
//                     {copied ? <CheckIcon /> : <CopyIcon />}
//                   </IconButton>
//                 </Tooltip>
//               </CopyToClipboard>

//               <pre style={{ 
//                 fontFamily: "'Fira Code', monospace", 
//                 fontSize: "0.875rem", 
//                 lineHeight: "1.5",
//                 whiteSpace: "pre-wrap",
//                 wordBreak: "break-all"
//               }}>
//                 {generatedCode.split('\n').map((line, index) => (
//                   <div key={index} style={{ 
//                     padding: "2px 0",
//                     borderLeft: line.trim() ? "3px solid #4CAF50" : "3px solid transparent",
//                     paddingLeft: "8px",
//                     opacity: line.trim() ? 1 : 0.5
//                   }}>
//                     {line || " "}
//                   </div>
//                 ))}
//               </pre>
//             </Box>
//           </Paper>

//           {/* Preview Section */}
//           <Paper elevation={3} sx={{ mt: 2, borderRadius: 2, overflow: "hidden" }}>
//             <Box sx={{ bgcolor: "warning.main", color: "white", p: 2 }}>
//               <Typography variant="h6" fontWeight="bold">
//                 <PreviewIcon sx={{ mr: 1, verticalAlign: "middle" }} />
//                 SEARCH ENGINE PREVIEW
//               </Typography>
//             </Box>
//             <Box sx={{ p: 3 }}>
//               <Typography 
//                 variant="h6" 
//                 sx={{ 
//                   color: "#1a0dab", 
//                   cursor: "pointer",
//                   "&:hover": { textDecoration: "underline" }
//                 }}
//               >
//                 {title || "Your Page Title Here"}
//               </Typography>
//               <Typography variant="caption" color="success.main">
//                 https://yourwebsite.com
//               </Typography>
//               <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//                 {description || "Your page description will appear here. Make it compelling to encourage clicks from search results."}
//               </Typography>
//             </Box>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default MetaTags;


import MetaTagsForm from "./MetaTagsForm";

export default function MetaTagsPage() {
  return (
    <main>
      <MetaTagsForm />
    </main>
  );
}