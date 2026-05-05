"use client";
import React, { useState } from "react";
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
  IconButton,
  Tooltip,
  Fade,
  Avatar,
  Chip,
  Alert,
} from "@mui/material";
import {
  ContentCopy as CopyIcon,
  Quiz as FaqIcon,
  CloudUpload as UploadIcon,
  CheckCircle as CheckIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Preview as PreviewIcon,
} from "@mui/icons-material";

const FAQ = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [faqItems, setFaqItems] = useState([
    { question: "", answer: "" }
  ]);
  const [copied, setCopied] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addFaqItem = () => {
    setFaqItems([...faqItems, { question: "", answer: "" }]);
  };

  const removeFaqItem = (index) => {
    const newItems = faqItems.filter((_, i) => i !== index);
    setFaqItems(newItems);
  };

  const updateFaqItem = (index, field, value) => {
    const newItems = [...faqItems];
    newItems[index][field] = value;
    setFaqItems(newItems);
  };

  const generateStructuredData = () => {
    const validFaqItems = faqItems.filter(item => item.question.trim() && item.answer.trim());
    
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": validFaqItems.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    }, null, 2);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          <FaqIcon sx={{ fontSize: 32 }} />
          <Box>
            <Typography variant="h4" fontWeight="bold">
              FAQ Structured Data Generator
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
              Create structured data for your FAQ pages to enhance search engine visibility.
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {/* Options Panel */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
            <Box sx={{ bgcolor: "primary.main", color: "white", p: 2 }}>
              <Typography variant="h6" fontWeight="bold">
                FAQ CONFIGURATION
              </Typography>
            </Box>
            <Box sx={{ p: 3 }}>
              <Grid container spacing={3}>
                {/* Basic Info */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Page Title"
                    placeholder="Enter FAQ page title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Page Description"
                    placeholder="Enter page description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Grid>

                {/* Image Upload */}
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Button
                      component="label"
                      variant="outlined"
                      startIcon={<UploadIcon />}
                      sx={{ minWidth: 140 }}
                    >
                      Upload Image
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </Button>
                    {selectedImage && (
                      <Chip 
                        label="Image uploaded" 
                        color="success" 
                        icon={<CheckIcon />} 
                      />
                    )}
                  </Box>
                </Grid>

                {/* FAQ Items */}
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography variant="h6" fontWeight="bold">
                      FAQ Items
                    </Typography>
                    <Button
                    className="bg-gray-600"
                      onClick={addFaqItem}
                      variant="contained"
                      startIcon={<AddIcon />}
                      size="small"
                    >
                      Add FAQ
                    </Button>
                  </Box>

                  {faqItems.map((item, index) => (
                    <Card key={index} sx={{ mb: 2, border: "1px solid #e0e0e0" }}>
                      <CardContent>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                          <Typography variant="subtitle1" fontWeight="bold">
                            FAQ #{index + 1}
                          </Typography>
                          {faqItems.length > 1 && (
                            <IconButton
                              onClick={() => removeFaqItem(index)}
                              color="error"
                              size="small"
                            >
                              <DeleteIcon />
                            </IconButton>
                          )}
                        </Box>
                        <TextField
                          fullWidth
                          label="Question"
                          placeholder="Enter your question"
                          value={item.question}
                          onChange={(e) => updateFaqItem(index, "question", e.target.value)}
                          sx={{ mb: 2 }}
                        />
                        <TextField
                          fullWidth
                          label="Answer"
                          placeholder="Enter the answer"
                          multiline
                          rows={3}
                          value={item.answer}
                          onChange={(e) => updateFaqItem(index, "answer", e.target.value)}
                        />
                      </CardContent>
                    </Card>
                  ))}
                </Grid>
              </Grid>
            </Box>
          </Paper>

          {/* Generated Code */}
          <Paper elevation={3} sx={{ mt: 3, borderRadius: 2, overflow: "hidden" }}>
            <Box sx={{ bgcolor: "success.main", color: "white", p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6" fontWeight="bold">
                STRUCTURED DATA JSON-LD
              </Typography>
              <CopyToClipboard text={generateStructuredData()} onCopy={handleCopy}>
                <Tooltip title={copied ? "Copied!" : "Copy to clipboard"}>
                  <IconButton sx={{ color: "white" }}>
                    {copied ? <CheckIcon /> : <CopyIcon />}
                  </IconButton>
                </Tooltip>
              </CopyToClipboard>
            </Box>
            
            <Alert severity="info" sx={{ m: 0, borderRadius: 0 }}>
              Add this JSON-LD script to your HTML head section.
            </Alert>

            <Box sx={{ p: 3, bgcolor: "#1e1e1e", color: "#f8f8f2", maxHeight: 400, overflow: "auto" }}>
              <pre style={{ 
                fontFamily: "'Fira Code', monospace", 
                fontSize: "0.875rem", 
                lineHeight: "1.5",
                margin: 0
              }}>
                {`<script type="application/ld+json">
${generateStructuredData()}
</script>`}
              </pre>
            </Box>
          </Paper>
        </Grid>

        {/* Preview Panel */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden", height: "fit-content" }}>
            <Box sx={{ bgcolor: "warning.main", color: "white", p: 2 }}>
              <Typography variant="h6" fontWeight="bold">
                <PreviewIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                PREVIEW
              </Typography>
            </Box>
            <Card sx={{ borderRadius: 0 }}>
              {selectedImage ? (
                <CardMedia
                  component="img"
                  height="200"
                  image={selectedImage}
                  alt="FAQ page image"
                />
              ) : (
                <Box 
                  sx={{ 
                    height: 200, 
                    bgcolor: "#f5f5f5", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center" 
                  }}
                >
                  <Typography color="text.secondary">
                    No image selected
                  </Typography>
                </Box>
              )}
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {title || "FAQ Page Title"}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {description || "Page description will appear here..."}
                </Typography>
                
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    FAQ Items ({faqItems.filter(item => item.question.trim()).length})
                  </Typography>
                  {faqItems.slice(0, 3).map((item, index) => (
                    item.question.trim() && (
                      <Box key={index} sx={{ mb: 1, p: 1, bgcolor: "#f9f9f9", borderRadius: 1 }}>
                        <Typography variant="caption" fontWeight="bold">
                          Q: {item.question.substring(0, 50)}{item.question.length > 50 ? "..." : ""}
                        </Typography>
                        <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                          A: {item.answer.substring(0, 100)}{item.answer.length > 100 ? "..." : ""}
                        </Typography>
                      </Box>
                    )
                  ))}
                  {faqItems.filter(item => item.question.trim()).length > 3 && (
                    <Typography variant="caption" color="text.secondary">
                      +{faqItems.filter(item => item.question.trim()).length - 3} more items...
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FAQ;


// "use client";
// import React, { useState } from "react";
// import { CopyToClipboard } from "react-copy-to-clipboard";

// const FAQ = () => {
//   const [selectedImage, setSelectedImage] = useState(""); // Define state for selected image
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   const handleImageChange = (e) => {
//     const file = e.target.files[0]; // Get the selected file
//     if (file) {
//       const reader = new FileReader(); // Create a FileReader object
//       reader.onloadend = () => {
//         // When file is read
//         setSelectedImage(reader.result); // Set selected image URL
//       };
//       reader.readAsDataURL(file); // Read the file as data URL
//     }
//   };

//   return (
//     <div className="px-3">
//       <h1 className="text-white text-xl font-bold">
//         FAQ Structured Data Generator
//       </h1>

//       <div className="flex mt-5">
//         <div className="w-full border">
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
//                   Description
//                 </label>
//                 <input
//                   type="text"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Description"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                 />
//               </div>
//               <div className="mt-5">
//                 <label
//                   htmlFor="imageInput"
//                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Image
//                 </label>
//                 <input
//                   type="file" // Change input type to file
//                   id="imageInput"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   onChange={handleImageChange} // Handle file selection
//                 />
//               </div>
//             </form>
//           </div>
//         </div>

//         <div className="w-full border">
//           <div>
//             <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
//               {selectedImage ? ( // Check if an image is selected
//                 <img
//                   className="rounded-t-lg"
//                   src={selectedImage} // Display selected image
//                   alt=""
//                 />
//               ) : (
//                 // Check if an image is selected
//                 <img
//                   className="rounded-t-lg"
//                   src={"/8600_2_10.jpg"} // Display selected image
//                   alt=""
//                 />
//               )}
//               <div className="p-5">
//                 {title ? (
//                   <p className="mb-3 w-full font-normal text-gray-700 dark:text-gray-400">
//                     {title}
//                   </p>
//                 ) : (
//                   <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
//                     Enter Title...
//                   </p>
//                 )}

//                 <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
//                   {description ? description : "Enter description..."}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FAQ;
