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
  Chip,
  Alert,
  IconButton,
  Tooltip,
  Stack,
  Breadcrumbs,
  Link,
  Divider,
  Fade,
  Collapse,
} from "@mui/material";
import {
  ContentCopy as CopyIcon,
  Navigation as BreadcrumbIcon,
  CheckCircle as CheckIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Preview as PreviewIcon,
  Code as CodeIcon,
  Link as LinkIcon,
  Home as HomeIcon,
  ChevronRight as ChevronRightIcon,
  DragIndicator as DragIcon,
  Visibility as VisibilityIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";

const BreadCrumb = () => {
  const [items, setItems] = useState([
    { name: "Home", url: "https://example.com" },
    { name: "", url: "" }
  ]);
  const [jsonText, setJsonText] = useState("");
  const [copied, setCopied] = useState(false);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const list = [...items];
    list[index][name] = value;
    setItems(list);
  };

  const handleAddItem = () => {
    setItems([...items, { name: "", url: "" }]);
  };

  const handleRemoveItem = (index) => {
    if (items.length > 1) {
      const list = [...items];
      list.splice(index, 1);
      setItems(list);
    }
  };

  const generateJson = () => {
    const validItems = items.filter(item => item.name.trim() && item.url.trim());
    const jsonData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: validItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    };
    return JSON.stringify(jsonData, null, 2);
  };

  useEffect(() => {
    setJsonText(generateJson());
  }, [items]);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const validItemsCount = items.filter(item => item.name.trim() && item.url.trim()).length;

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
          <BreadcrumbIcon sx={{ fontSize: 32 }} />
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Breadcrumb Structured Data Generator
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
              Create breadcrumb navigation structured data to enhance your website&apos;s search appearance.
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {/* Configuration Panel */}
        <Grid item xs={12} lg={8}>
          <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
            <Box sx={{ bgcolor: "primary.main", color: "white", p: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CodeIcon />
                <Typography variant="h6" fontWeight="bold">
                  BREADCRUMB CONFIGURATION
                </Typography>
              </Box>
              <Chip 
                label={`${validItemsCount} valid items`} 
                sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white" }}
              />
            </Box>
            
            <Box sx={{ p: 3 }}>
              <Alert severity="info" sx={{ mb: 3 }}>
                <Typography variant="body2">
                  Add breadcrumb items in order from the homepage to the current page. The first item is typically &quot;Home&quot;.
                </Typography>
              </Alert>

              <Stack spacing={2}>
                {items.map((item, index) => (
                  <Fade in={true} key={index} timeout={300}>
                    <Card 
                      variant="outlined" 
                      sx={{ 
                        position: "relative",
                        border: item.name.trim() && item.url.trim() ? "2px solid #4CAF50" : "1px solid #e0e0e0",
                        transition: "all 0.3s ease"
                      }}
                    >
                      <CardContent sx={{ pb: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <DragIcon sx={{ color: "text.secondary" }} />
                            <Typography variant="subtitle1" fontWeight="bold">
                              {index === 0 ? "Home Page" : `Level ${index + 1}`}
                            </Typography>
                            <Chip 
                              label={`Position ${index + 1}`} 
                              size="small" 
                              color="primary" 
                              variant="outlined"
                            />
                          </Box>
                          
                          {items.length > 1 && (
                            <IconButton
                              onClick={() => handleRemoveItem(index)}
                              color="error"
                              size="small"
                              sx={{ 
                                opacity: items.length === 1 ? 0.3 : 1,
                                pointerEvents: items.length === 1 ? "none" : "auto"
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          )}
                        </Box>

                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Page Name"
                              placeholder={index === 0 ? "Home" : "Page Title"}
                              value={item.name}
                              onChange={(e) => handleInputChange(index, { target: { name: "name", value: e.target.value } })}
                              size="small"
                              InputProps={{
                                startAdornment: index === 0 ? <HomeIcon sx={{ mr: 1, color: "action.active" }} /> : null,
                              }}
                              error={!item.name.trim() && item.url.trim()}
                              helperText={!item.name.trim() && item.url.trim() ? "Name is required" : ""}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Page URL"
                              placeholder={index === 0 ? "https://example.com" : "https://example.com/page"}
                              value={item.url}
                              onChange={(e) => handleInputChange(index, { target: { name: "url", value: e.target.value } })}
                              size="small"
                              InputProps={{
                                startAdornment: <LinkIcon sx={{ mr: 1, color: "action.active" }} />,
                              }}
                              error={!item.url.trim() && item.name.trim()}
                              helperText={!item.url.trim() && item.name.trim() ? "URL is required" : ""}
                            />
                          </Grid>
                        </Grid>

                        {/* Item Status */}
                        <Box sx={{ mt: 1, display: "flex", justifyContent: "flex-end" }}>
                          {item.name.trim() && item.url.trim() ? (
                            <Chip 
                              icon={<CheckIcon />} 
                              label="Valid" 
                              color="success" 
                              size="small" 
                            />
                          ) : (
                            <Chip 
                              icon={<WarningIcon />} 
                              label="Incomplete" 
                              color="warning" 
                              size="small" 
                            />
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  </Fade>
                ))}

                {/* Add Item Button */}
                <Button
                  onClick={handleAddItem}
                  variant="outlined"
                  startIcon={<AddIcon />}
                  sx={{ 
                    mt: 2, 
                    py: 1.5,
                    borderStyle: "dashed",
                    "&:hover": {
                      borderStyle: "solid"
                    }
                  }}
                  fullWidth
                >
                  Add Breadcrumb Item
                </Button>
              </Stack>
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
            
            <Alert severity="info" sx={{ m: 0, borderRadius: 0 }}>
              Add this JSON-LD script to the &lt;head&gt; section of your HTML page.
            </Alert>

            <Box sx={{ p: 3, bgcolor: "#1e1e1e", color: "#f8f8f2", maxHeight: 400, overflow: "auto" }}>
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
            {/* Breadcrumb Preview */}
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
              <Box sx={{ bgcolor: "warning.main", color: "white", p: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  <PreviewIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                  BREADCRUMB PREVIEW
                </Typography>
              </Box>
              <Box sx={{ p: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  How it appears on your website:
                </Typography>
                
                <Paper variant="outlined" sx={{ p: 2, bgcolor: "#f9f9f9" }}>
                  <Breadcrumbs 
                    separator={<ChevronRightIcon fontSize="small" />}
                    aria-label="breadcrumb"
                  >
                    {items.filter(item => item.name.trim()).map((item, index) => (
                      <Link
                        key={index}
                        underline="hover"
                        color={index === items.filter(item => item.name.trim()).length - 1 ? "text.primary" : "inherit"}
                        href={item.url || "#"}
                        sx={{ 
                          display: "flex", 
                          alignItems: "center",
                          fontWeight: index === items.filter(item => item.name.trim()).length - 1 ? "bold" : "normal"
                        }}
                      >
                        {index === 0 && <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />}
                        {item.name || `Item ${index + 1}`}
                      </Link>
                    ))}
                  </Breadcrumbs>
                </Paper>

                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                  This is how your breadcrumb navigation will look to users.
                </Typography>
              </Box>
            </Paper>

            {/* Search Engine Preview */}
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
              <Box sx={{ bgcolor: "info.main", color: "white", p: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  <VisibilityIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                  SEARCH RESULT PREVIEW
                </Typography>
              </Box>
              <Box sx={{ p: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  How it might appear in search results:
                </Typography>
                
                <Box sx={{ border: "1px solid #e0e0e0", borderRadius: 1, p: 2, bgcolor: "#fafafa" }}>
                  <Typography variant="h6" sx={{ color: "#1a0dab", cursor: "pointer" }}>
                    {items[items.length - 1]?.name || "Current Page Title"}
                  </Typography>
                  <Typography variant="body2" color="success.main" gutterBottom>
                    {items.filter(item => item.name.trim()).map(item => item.name).join(" › ")}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Page description would appear here, potentially enhanced with breadcrumb data.
                  </Typography>
                </Box>

                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                  Breadcrumbs may appear in search results to show page hierarchy.
                </Typography>
              </Box>
            </Paper>

            {/* Validation Status */}
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
              <Box sx={{ bgcolor: validItemsCount >= 2 ? "success.main" : "error.main", color: "white", p: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  VALIDATION STATUS
                </Typography>
              </Box>
              <Box sx={{ p: 2 }}>
                <Stack spacing={1}>
                  <Alert severity={validItemsCount >= 2 ? "success" : "error"} variant="outlined">
                    <Typography variant="caption">
                      Valid Items: {validItemsCount >= 2 ? `✓ ${validItemsCount} items` : `✗ Need at least 2 items (have ${validItemsCount})`}
                    </Typography>
                  </Alert>
                  
                  <Alert severity={items[0]?.name.toLowerCase().includes("home") ? "success" : "warning"} variant="outlined">
                    <Typography variant="caption">
                      First Item: {items[0]?.name.toLowerCase().includes("home") ? "✓ Starts with Home" : "⚠ Consider starting with 'Home'"}
                    </Typography>
                  </Alert>
                  
                  <Alert severity={items.every(item => !item.name.trim() || item.url.trim()) ? "success" : "warning"} variant="outlined">
                    <Typography variant="caption">
                      URLs: {items.every(item => !item.name.trim() || item.url.trim()) ? "✓ All valid" : "⚠ Some missing URLs"}
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

export default BreadCrumb;




// "use client";
// import React, { useState } from "react";
// import { CopyToClipboard } from "react-copy-to-clipboard";

// const BreadCrumb = () => {
//   const formatDate = (date) => {
//     const d = new Date(date);
//     const year = d.getFullYear();
//     let month = d.getMonth() + 1;
//     if (month < 10) month = `0${month}`;
//     let day = d.getDate();
//     if (day < 10) day = `0${day}`;
//     return `${year}-${month}-${day}`;
//   };

//   const [items, setItems] = useState([{ name: "", url: "" }]);
//   const [jsonText, setJsonText] = useState("");

//   const handleInputChange = (index, event) => {
//     const { name, value } = event.target;
//     const list = [...items];
//     list[index][name] = value;
//     setItems(list);
//     generateJson(list); // Update JSON whenever input changes
//   };

//   const handleAddItem = () => {
//     setItems([...items, { name: "", url: "" }]);
//     generateJson([...items, { name: "", url: "" }]);
//   };

//   const handleRemoveItem = (index) => {
//     const list = [...items];
//     list.splice(index, 1);
//     setItems(list);
//     generateJson(list); // Update JSON whenever an item is removed
//   };

//   const generateJson = (updatedItems) => {
//     const jsonData = {
//       "@context": "http://schema.org/",
//       "@type": "BreadcrumbList",
//       itemListElement: updatedItems.map((item, index) => ({
//         "@type": "ListItem",
//         position: index + 1,
//         name: item.name,
//         item: item.url,
//       })),
//     };
//     setJsonText(JSON.stringify(jsonData, null, 2));
//   };

//   return (
//     <div className="px-3">
//       <h1 className="text-white text-xl text-bold">
//         Article Structured Data Generator
//       </h1>
//       <p className="text-white text-sm mt-2">Breadcrumb</p>
//       <div className="flex mt-5">
//         <div className="w-full border">
//           <h1 className="text-white uppercase font-semibold py-1 pl-5 bg-slate-600">
//             OPTIONS
//           </h1>
//           <div className="py-4 px-5 bg-gray-800">
//             <form>
//               {items.map((item, index) => (
//                 <div key={index} className="mt-5">
//                   <label
//                     htmlFor={`name${index}`}
//                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     Name
//                   </label>
//                   <input
//                     type="text"
//                     id={`name${index}`}
//                     name="name"
//                     value={item.name}
//                     onChange={(e) => handleInputChange(index, e)}
//                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="Enter Name"
//                   />
              
//                   <label
//                     htmlFor={`url${index}`}
//                     className="block mt-3 mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     URL
//                   </label>
//                   <input
//                     type="text"
//                     id={`url${index}`}
//                     name="url"
//                     value={item.url}
//                     onChange={(e) => handleInputChange(index, e)}
//                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="Enter URL"
//                   />
//                   {index !== 0 && (
//                     <button
//                       type="button"
//                       className="mt-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                       onClick={() => handleRemoveItem(index)}
//                     >
//                       Remove
//                     </button>
//                   )}
//                 </div>
//               ))}
//               <div className="mt-5">
//                 <button
//                   type="button"
//                   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                   onClick={handleAddItem}
//                 >
//                   Add Item
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//         <div className="w-full border">
//           <div>
//             <h1 className="text-white uppercase font-semibold py-1 pl-5 bg-slate-600">
//               CODE
//             </h1>
//             <div className="text-white font-semibold py-2 pl-5 text-xs bg-slate-800">
//               <p className="bg">
//                 Copy this to the &lt;head&gt; section of your page.
//               </p>
//               <CopyToClipboard
//                 text={`<script type="application/ld+json">\n${jsonText}\n</script>`}
//               >
//                 <div className="ml-auto w-1/6">
//                   <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//                     Copy
//                   </button>
//                 </div>
//               </CopyToClipboard>
//             </div>
//             <div className="space-y-2 mt-5 ml-4">
//               <pre className="text-white">
//                 {`<script type="application/ld+json">\n`}
//                 {jsonText}
//                 {`\n</script>`}
//               </pre>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BreadCrumb;
