"use client";
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Fade,
  Stack,
  IconButton,
  Tooltip,
  Alert,
  Card,
  CardContent,
  Divider,
  Grid,
  ButtonGroup,
} from "@mui/material";
import {
  AutoAwesome as AIIcon,
  ContentCopy as CopyIcon,
  Language as UrlIcon,
  CheckCircle as SuccessIcon,
  ErrorOutline as ErrorIcon,
  Code as CodeIcon,
  Label as TagIcon,
} from "@mui/icons-material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const AIUrlAnalyzer = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [viewType, setViewType] = useState("meta"); // 'meta' or 'jsonld'

  const handleAnalyze = async () => {
    if (!url) {
      setError("Please enter a valid URL");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("http://localhost:5000/api/url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.data);
      } else {
        setError(data.error || "Failed to analyze URL");
      }
    } catch (err) {
      setError("Server is unreachable. Please ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCopyText = () => {
    if (!result) return "";
    if (viewType === "meta") {
      const tags = result.generated.metaTags;
      return `
<!-- SEO Meta Tags -->
<title>${tags.title}</title>
<meta name="description" content="${tags.description}">
<meta name="keywords" content="${tags.keywords}">
<meta property="og:title" content="${tags["og:title"]}">
<meta property="og:description" content="${tags["og:description"]}">
<meta name="twitter:card" content="${tags["twitter:card"]}">
<meta name="twitter:title" content="${tags["twitter:title"]}">
<meta name="twitter:description" content="${tags["twitter:description"]}">
      `.trim();
    } else {
      return JSON.stringify(result.generated.structuredData, null, 2);
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", width: "100%", mt: 4 }}>
      {/* Search Input Section */}
      <Paper
        elevation={0}
        sx={{
          p: 1,
          borderRadius: 4,
          display: "flex",
          alignItems: "center",
          bgcolor: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          mb: 4,
        }}
      >
        <UrlIcon sx={{ ml: 2, mr: 1, color: "rgba(255,255,255,0.5)" }} />
        <TextField
          fullWidth
          placeholder="Paste website URL here (e.g. https://example.com)"
          variant="standard"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          sx={{
            input: { color: "white", py: 2 },
            "& .MuiInput-underline:before, & .MuiInput-underline:after": {
              display: "none",
            },
          }}
          onKeyPress={(e) => e.key === "Enter" && handleAnalyze()}
        />
        <Button
          variant="contained"
          disabled={loading}
          onClick={handleAnalyze}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AIIcon />}
          sx={{
            borderRadius: 3,
            px: 4,
            py: 1.5,
            background: "linear-gradient(45deg, #2563eb, #7c3aed)",
            fontWeight: "bold",
            textTransform: "none",
            fontSize: "1rem",
            boxShadow: "0 4px 15px rgba(37, 99, 235, 0.3)",
            "&:hover": {
              background: "linear-gradient(45deg, #1d4ed8, #6d28d9)",
            },
          }}
        >
          {loading ? "Analyzing..." : "Generate AI Tags"}
        </Button>
      </Paper>

      {/* Error Message */}
      {error && (
        <Fade in={!!error}>
          <Alert
            severity="error"
            icon={<ErrorIcon />}
            sx={{ borderRadius: 3, mb: 4, bgcolor: "rgba(239, 68, 68, 0.1)", color: "#fca5a5" }}
          >
            {error}
          </Alert>
        </Fade>
      )}

      {/* Results Section */}
      {result && (
        <Fade in={!!result}>
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Typography variant="h5" fontWeight="800" sx={{ color: "white", display: "flex", alignItems: "center", gap: 1 }}>
                <SuccessIcon color="success" /> AI Optimized Results
              </Typography>
              
              <Stack direction="row" spacing={2} alignItems="center">
                <ButtonGroup variant="contained" sx={{ borderRadius: 2, overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <Button 
                    onClick={() => setViewType("meta")}
                    startIcon={<TagIcon />}
                    sx={{ 
                      bgcolor: viewType === "meta" ? "#2563eb" : "rgba(255,255,255,0.05)",
                      color: "white",
                      "&:hover": { bgcolor: viewType === "meta" ? "#1d4ed8" : "rgba(255,255,255,0.1)" }
                    }}
                  >
                    Meta Tags
                  </Button>
                  <Button 
                    onClick={() => setViewType("jsonld")}
                    startIcon={<CodeIcon />}
                    sx={{ 
                      bgcolor: viewType === "jsonld" ? "#7c3aed" : "rgba(255,255,255,0.05)",
                      color: "white",
                      "&:hover": { bgcolor: viewType === "jsonld" ? "#6d28d9" : "rgba(255,255,255,0.1)" }
                    }}
                  >
                    Structured Data
                  </Button>
                </ButtonGroup>

                <CopyToClipboard text={getCopyText()} onCopy={handleCopy}>
                  <Button
                    variant="outlined"
                    startIcon={copied ? <SuccessIcon fontSize="small" /> : <CopyIcon fontSize="small" />}
                    sx={{ 
                      borderRadius: 2, 
                      color: copied ? "#4ade80" : "white", 
                      borderColor: copied ? "#4ade80" : "rgba(255,255,255,0.3)",
                      "&:hover": { borderColor: "white", bgcolor: "rgba(255,255,255,0.05)" }
                    }}
                  >
                    {copied ? "Copied!" : "Copy All"}
                  </Button>
                </CopyToClipboard>
              </Stack>
            </Box>

            <Card sx={{ borderRadius: 4, bgcolor: "#1e293b", border: "1px solid rgba(255,255,255,0.05)", overflow: "hidden" }}>
              <CardContent sx={{ p: 0 }}>
                {viewType === "meta" ? (
                  <Box sx={{ p: 3 }}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={3}>
                          <Box>
                            <Typography variant="caption" color="gray" sx={{ textTransform: "uppercase", letterSpacing: 1 }}>SEO Title</Typography>
                            <Typography variant="body1" sx={{ color: "white", fontWeight: 600, mt: 0.5 }}>
                              {result.generated.metaTags.title}
                            </Typography>
                          </Box>
                          <Divider sx={{ borderColor: "rgba(255,255,255,0.05)" }} />
                          <Box>
                            <Typography variant="caption" color="gray" sx={{ textTransform: "uppercase", letterSpacing: 1 }}>Description</Typography>
                            <Typography variant="body2" sx={{ color: "#94a3b8", mt: 0.5, lineHeight: 1.6 }}>
                              {result.generated.metaTags.description}
                            </Typography>
                          </Box>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={3}>
                          <Box>
                            <Typography variant="caption" color="gray" sx={{ textTransform: "uppercase", letterSpacing: 1 }}>Keywords</Typography>
                            <Typography variant="body2" sx={{ color: "#60a5fa", mt: 0.5 }}>
                              {result.generated.metaTags.keywords}
                            </Typography>
                          </Box>
                          <Divider sx={{ borderColor: "rgba(255,255,255,0.05)" }} />
                          <Box>
                            <Typography variant="caption" color="gray" sx={{ textTransform: "uppercase", letterSpacing: 1 }}>Social Preview (OG)</Typography>
                            <Typography variant="body2" sx={{ color: "#cbd5e1", mt: 0.5, fontWeight: 500 }}>
                              {result.generated.metaTags["og:title"]}
                            </Typography>
                            <Typography variant="caption" sx={{ color: "#64748b", display: "block", mt: 0.5 }}>
                              {result.generated.metaTags["og:description"]}
                            </Typography>
                          </Box>
                        </Stack>
                      </Grid>
                    </Grid>
                    
                    <Box sx={{ mt: 4, borderRadius: 2, overflow: "hidden" }}>
                      <Typography variant="caption" color="gray" sx={{ mb: 1, display: "block" }}>HTML Code Snippet</Typography>
                      <SyntaxHighlighter
                        language="html"
                        style={vscDarkPlus}
                        customStyle={{ margin: 0, padding: "20px", background: "rgba(15, 23, 42, 0.5)", fontSize: "0.85rem" }}
                      >
                        {getCopyText()}
                      </SyntaxHighlighter>
                    </Box>
                  </Box>
                ) : (
                  <Box>
                    <SyntaxHighlighter
                      language="json"
                      style={vscDarkPlus}
                      customStyle={{ margin: 0, padding: "30px", background: "rgba(15, 23, 42, 0.5)", fontSize: "0.9rem" }}
                    >
                      {JSON.stringify(result.generated.structuredData, null, 2)}
                    </SyntaxHighlighter>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Box>
        </Fade>
      )}
    </Box>
  );
};

export default AIUrlAnalyzer;
