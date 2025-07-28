// "use client";
// import React, { useState } from "react";
// import { CopyToClipboard } from "react-copy-to-clipboard";

// const FAQ = () => {
//   const formatDate = (date) => {
//     const d = new Date(date);
//     const year = d.getFullYear();
//     let month = d.getMonth() + 1;
//     if (month < 10) month = `0${month}`;
//     let day = d.getDate();
//     if (day < 10) day = `0${day}`;
//     return `${year}-${month}-${day}`;
//   };

//   const [items, setItems] = useState([{ question: "", answer: "" }]);
//   const [jsonText, setJsonText] = useState("");

//   const handleInputChange = (index, event) => {
//     const { name, value } = event.target;
//     const list = [...items];
//     list[index][name] = value;
//     setItems(list);
//     generateJson(list); // Update JSON whenever input changes
//   };

//   const handleAddItem = () => {
//     setItems([...items, { question: "", answer: "" }]);
//     generateJson([...items, { question: "", answer: "" }]);
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
//       "@type": "FAQPage",
//       mainEntity: updatedItems.map((item, index) => ({
//         "@type": "Question",
//         name: item.name,
//         acceptedAnswer: {
//           "@type": "Answer",
//           text: item.url,
//         },
//       })),
//     };
//     setJsonText(JSON.stringify(jsonData, null, 2));
//   };
//   return (
//     <div className="px-3">
//       <h1 className="text-white text-xl text-bold">
//         FAQ Structured Data Generator
//       </h1>

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
//                     FAQ Question
//                   </label>
//                   <input
//                     type="text"
//                     id={`name${index}`}
//                     name="name"
//                     value={item.name}
//                     onChange={(e) => handleInputChange(index, e)}
//                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="Enter Faq Question"
//                   />

//                   <label
//                     htmlFor={`url${index}`}
//                     className="block mt-3 mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     FAQ Answer
//                   </label>
//                   <input
//                     type="text"
//                     id={`url${index}`}
//                     name="url"
//                     value={item.url}
//                     onChange={(e) => handleInputChange(index, e)}
//                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="Enter FAQ Answer"
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

// export default FAQ;


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
  Divider,
  Fade,
  Collapse,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  ContentCopy as CopyIcon,
  Quiz as FaqIcon,
  CheckCircle as CheckIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Preview as PreviewIcon,
  Code as CodeIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  ExpandMore as ExpandMoreIcon,
  QuestionAnswer as QuestionIcon,
  LiveHelp as HelpIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";

const FAQ = () => {
  const [items, setItems] = useState([{ question: "", answer: "" }]);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (index, field, value) => {
    const list = [...items];
    list[index][field] = value;
    setItems(list);
  };

  const handleAddItem = () => {
    setItems([...items, { question: "", answer: "" }]);
  };

  const handleRemoveItem = (index) => {
    if (items.length > 1) {
      const list = [...items];
      list.splice(index, 1);
      setItems(list);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    items.forEach((item, index) => {
      if (!item.question.trim()) {
        newErrors[`question_${index}`] = "Question is required";
      }
      if (!item.answer.trim()) {
        newErrors[`answer_${index}`] = "Answer is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    validateForm();
  }, [items]);

  const generateJson = () => {
    const validItems = items.filter(item => item.question.trim() && item.answer.trim());
    const jsonData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: validItems.map((item, index) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    };
    return JSON.stringify(jsonData, null, 2);
  };

  const jsonText = generateJson();

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const validItemsCount = items.filter(item => item.question.trim() && item.answer.trim()).length;
  const isFormValid = validItemsCount > 0 && Object.keys(errors).length === 0;

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
              Create structured data for your FAQ pages to enhance search engine visibility and user experience.
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
                  FAQ CONFIGURATION
                </Typography>
              </Box>
              <Chip 
                label={`${validItemsCount} valid FAQ${validItemsCount !== 1 ? 's' : ''}`} 
                sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white" }}
              />
            </Box>
            
            <Box sx={{ p: 3 }}>
              <Alert severity="info" sx={{ mb: 3 }}>
                <Typography variant="body2">
                  Add frequently asked questions and their answers. Each FAQ item will help search engines better understand your content.
                </Typography>
              </Alert>

              <Stack spacing={2}>
                {items.map((item, index) => (
                  <Fade in={true} key={index} timeout={300}>
                    <Card 
                      variant="outlined" 
                      sx={{ 
                        position: "relative",
                        border: item.question.trim() && item.answer.trim() ? "2px solid #4CAF50" : "1px solid #e0e0e0",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
                        }
                      }}
                    >
                      <CardContent sx={{ pb: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <QuestionIcon sx={{ color: "primary.main" }} />
                            <Typography variant="subtitle1" fontWeight="bold" color="primary">
                              FAQ #{index + 1}
                            </Typography>
                            {item.question.trim() && item.answer.trim() ? (
                              <Chip 
                                icon={<CheckIcon />} 
                                label="Complete" 
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
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              label="Question *"
                              placeholder="What is your question?"
                              value={item.question}
                              onChange={(e) => handleInputChange(index, "question", e.target.value)}
                              error={!!errors[`question_${index}`]}
                              helperText={errors[`question_${index}`] || `${item.question.length} characters`}
                              multiline
                              rows={2}
                              InputProps={{
                                startAdornment: <HelpIcon sx={{ mr: 1, color: "action.active", alignSelf: "flex-start", mt: 1 }} />,
                              }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              label="Answer *"
                              placeholder="Provide a detailed answer..."
                              value={item.answer}
                              onChange={(e) => handleInputChange(index, "answer", e.target.value)}
                              error={!!errors[`answer_${index}`]}
                              helperText={errors[`answer_${index}`] || `${item.answer.length} characters (recommended: 40+ for SEO)`}
                              multiline
                              rows={3}
                              InputProps={{
                                startAdornment: <QuestionIcon sx={{ mr: 1, color: "action.active", alignSelf: "flex-start", mt: 1 }} />,
                              }}
                            />
                          </Grid>
                        </Grid>

                        {/* Quick Preview */}
                        {item.question.trim() && item.answer.trim() && (
                          <Box sx={{ mt: 2, p: 2, bgcolor: "#f9f9f9", borderRadius: 1, border: "1px solid #e0e0e0" }}>
                            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                              Preview:
                            </Typography>
                            <Typography variant="body2" fontWeight="bold" color="primary" gutterBottom>
                              Q: {item.question}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              A: {item.answer}
                            </Typography>
                          </Box>
                        )}
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
                  Add FAQ Item
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
            
            {!isFormValid && (
              <Alert severity="warning" sx={{ m: 0, borderRadius: 0 }}>
                Please add at least one complete FAQ item to generate valid structured data.
              </Alert>
            )}
            
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
            {/* FAQ Preview */}
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
              <Box sx={{ bgcolor: "warning.main", color: "white", p: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  <PreviewIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                  FAQ PREVIEW
                </Typography>
              </Box>
              <Box sx={{ p: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  How your FAQ will appear:
                </Typography>
                
                {items.filter(item => item.question.trim() && item.answer.trim()).length > 0 ? (
                  <Stack spacing={1}>
                    {items.filter(item => item.question.trim() && item.answer.trim()).slice(0, 3).map((item, index) => (
                      <Accordion key={index} variant="outlined">
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography variant="body2" fontWeight="bold">
                            {item.question}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography variant="body2" color="text.secondary">
                            {item.answer}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                    {items.filter(item => item.question.trim() && item.answer.trim()).length > 3 && (
                      <Typography variant="caption" color="text.secondary" sx={{ textAlign: "center", fontStyle: "italic" }}>
                        +{items.filter(item => item.question.trim() && item.answer.trim()).length - 3} more FAQ items...
                      </Typography>
                    )}
                  </Stack>
                ) : (
                  <Box sx={{ textAlign: "center", py: 4 }}>
                    <FaqIcon sx={{ fontSize: 48, color: "text.secondary", mb: 2 }} />
                    <Typography color="text.secondary">
                      Add FAQ items to see preview
                    </Typography>
                  </Box>
                )}
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
              <Box sx={{ p: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Enhanced search appearance:
                </Typography>
                
                <Box sx={{ border: "1px solid #e0e0e0", borderRadius: 1, p: 2, bgcolor: "#fafafa" }}>
                  <Typography variant="h6" sx={{ color: "#1a0dab", cursor: "pointer", fontSize: "1.1rem" }}>
                    Your FAQ Page Title
                  </Typography>
                  <Typography variant="caption" color="success.main" gutterBottom>
                    https://yourwebsite.com/faq
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Your page description with comprehensive FAQ content.
                  </Typography>
                  
                  {validItemsCount > 0 && (
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="caption" fontWeight="bold" color="text.primary">
                        FAQ Results:
                      </Typography>
                      {items.filter(item => item.question.trim()).slice(0, 2).map((item, index) => (
                        <Typography key={index} variant="caption" display="block" sx={{ ml: 1, color: "text.secondary" }}>
                          • {item.question.substring(0, 60)}{item.question.length > 60 ? "..." : ""}
                        </Typography>
                      ))}
                    </Box>
                  )}
                </Box>

                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                  FAQs may appear as rich results in search engines, improving click-through rates.
                </Typography>
              </Box>
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
                  <Alert severity={validItemsCount >= 1 ? "success" : "error"} variant="outlined">
                    <Typography variant="caption">
                      FAQ Items: {validItemsCount >= 1 ? `✓ ${validItemsCount} valid item${validItemsCount !== 1 ? 's' : ''}` : "✗ At least 1 FAQ required"}
                    </Typography>
                  </Alert>
                  
                  <Alert severity={items.every(item => !item.question.trim() || item.question.length >= 5) ? "success" : "warning"} variant="outlined">
                    <Typography variant="caption">
                      Questions: {items.every(item => !item.question.trim() || item.question.length >= 5) ? "✓ Good length" : "⚠ Keep questions clear and specific"}
                    </Typography>
                  </Alert>
                  
                  <Alert severity={items.every(item => !item.answer.trim() || item.answer.length >= 20) ? "success" : "warning"} variant="outlined">
                    <Typography variant="caption">
                      Answers: {items.every(item => !item.answer.trim() || item.answer.length >= 20) ? "✓ Detailed answers" : "⚠ Provide more detailed answers"}
                    </Typography>
                  </Alert>

                  <Alert severity={validItemsCount >= 3 ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      SEO Impact: {validItemsCount >= 3 ? "✓ Excellent for SEO" : "ℹ 3+ FAQs recommended for better SEO"}
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

export default FAQ;
