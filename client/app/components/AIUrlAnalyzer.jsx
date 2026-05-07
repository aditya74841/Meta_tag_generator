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
  Tooltip,
  Alert,
  Card,
  CardContent,
  Divider,
  Grid,
  ButtonGroup,
  Chip,
  Checkbox,
  FormControlLabel,
  LinearProgress,
  Collapse,
  IconButton,
} from "@mui/material";
import {
  AutoAwesome as AIIcon,
  ContentCopy as CopyIcon,
  Language as UrlIcon,
  CheckCircle as SuccessIcon,
  ErrorOutline as ErrorIcon,
  Code as CodeIcon,
  Label as TagIcon,
  Search as CrawlIcon,
  Pages as PagesIcon,
  ExpandMore as ExpandIcon,
  ExpandLess as CollapseIcon,
  CheckBox as SelectAllIcon,
  CheckBoxOutlineBlank as DeselectIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import SeoOverviewPanel from "./SeoOverviewPanel";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// ─── Step Indicator ─────────────────────────────────────────────────────────
const StepDot = ({ step, current, label }) => {
  const done = current > step;
  const active = current === step;
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5 }}>
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 800,
          fontSize: "0.9rem",
          transition: "all 0.3s",
          bgcolor: done ? "#22c55e" : active ? "#2563eb" : "rgba(255,255,255,0.1)",
          color: "white",
          boxShadow: active ? "0 0 0 4px rgba(37,99,235,0.3)" : "none",
        }}
      >
        {done ? <SuccessIcon fontSize="small" /> : step}
      </Box>
      <Typography variant="caption" sx={{ color: active ? "white" : "rgba(255,255,255,0.4)", fontWeight: 600 }}>
        {label}
      </Typography>
    </Box>
  );
};

// ─── Page Card ───────────────────────────────────────────────────────────────
const PageCard = ({ page, selected, onToggle, onViewOverview }) => (
  <Box
    sx={{
      p: 2,
      borderRadius: 2,
      border: "1px solid",
      borderColor: selected ? "rgba(37,99,235,0.6)" : "rgba(255,255,255,0.08)",
      bgcolor: selected ? "rgba(37,99,235,0.12)" : "rgba(255,255,255,0.03)",
      transition: "all 0.2s",
      display: "flex",
      alignItems: "center",
      gap: 1.5,
      "&:hover": {
        borderColor: "rgba(37,99,235,0.4)",
        bgcolor: "rgba(37,99,235,0.07)",
      },
      "&:hover .overview-btn": { opacity: 1 },
    }}
  >
    <Checkbox
      checked={selected}
      onChange={onToggle}
      onClick={(e) => e.stopPropagation()}
      size="small"
      sx={{ color: "rgba(255,255,255,0.3)", "&.Mui-checked": { color: "#3b82f6" }, p: 0 }}
    />
    <Box sx={{ flex: 1, minWidth: 0, cursor: "pointer" }} onClick={onViewOverview}>
      <Typography variant="body2"
        sx={{ color: "white", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {page.title || page.label}
      </Typography>
      <Typography variant="caption"
        sx={{ color: "rgba(255,255,255,0.4)", fontFamily: "monospace", display: "block",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {page.path}
      </Typography>
    </Box>
    {page.path === "/" && (
      <Chip label="Home" size="small" sx={{ bgcolor: "rgba(34,197,94,0.15)", color: "#4ade80", fontWeight: 700, fontSize: "0.65rem" }} />
    )}
    {page.error && (
      <Chip label={page.error} size="small" sx={{ bgcolor: "rgba(239,68,68,0.15)", color: "#fca5a5", fontWeight: 700, fontSize: "0.65rem" }} />
    )}
    <Tooltip title="SEO Overview">
      <IconButton size="small" className="overview-btn" onClick={onViewOverview}
        sx={{ opacity: 0, transition: "opacity 0.2s", color: "#60a5fa",
          bgcolor: "rgba(96,165,250,0.1)", "&:hover": { bgcolor: "rgba(96,165,250,0.2)" } }}>
        <ViewIcon sx={{ fontSize: 16 }} />
      </IconButton>
    </Tooltip>
  </Box>
);

// ─── Result Block ────────────────────────────────────────────────────────────
const ResultBlock = ({ pageResult }) => {
  const [viewType, setViewType] = useState("meta");
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(true);

  if (!pageResult.success) {
    return (
      <Alert severity="error" sx={{ borderRadius: 2, bgcolor: "rgba(239,68,68,0.1)", color: "#fca5a5" }}>
        <strong>{pageResult.url}</strong> — {pageResult.error}
      </Alert>
    );
  }

  const tags = pageResult.data.generated.metaTags;

  const metaCode = `<!-- SEO Meta Tags for ${pageResult.url} -->
<title>${tags.title}</title>
<meta name="description" content="${tags.description}">
<meta name="keywords" content="${tags.keywords}">
<meta property="og:title" content="${tags["og:title"]}">
<meta property="og:description" content="${tags["og:description"]}">
<meta name="twitter:card" content="${tags["twitter:card"]}">
<meta name="twitter:title" content="${tags["twitter:title"]}">
<meta name="twitter:description" content="${tags["twitter:description"]}">`.trim();

  const jsonCode = JSON.stringify(pageResult.data.generated.structuredData, null, 2);

  return (
    <Card
      sx={{
        borderRadius: 3,
        bgcolor: "#1e293b",
        border: "1px solid rgba(255,255,255,0.06)",
        overflow: "hidden",
        mb: 2,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 3,
          py: 2,
          display: "flex",
          alignItems: "center",
          gap: 2,
          borderBottom: expanded ? "1px solid rgba(255,255,255,0.06)" : "none",
          cursor: "pointer",
          bgcolor: "rgba(255,255,255,0.02)",
          "&:hover": { bgcolor: "rgba(255,255,255,0.04)" },
        }}
        onClick={() => setExpanded((v) => !v)}
      >
        <SuccessIcon sx={{ color: "#22c55e", flexShrink: 0 }} />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="body2" sx={{ color: "white", fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {tags.title}
          </Typography>
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>
            {pageResult.url}
          </Typography>
        </Box>
        <IconButton size="small" sx={{ color: "rgba(255,255,255,0.4)" }}>
          {expanded ? <CollapseIcon /> : <ExpandIcon />}
        </IconButton>
      </Box>

      {/* Content */}
      <Collapse in={expanded}>
        <CardContent sx={{ p: 0 }}>
          {/* Controls */}
          <Box sx={{ px: 3, py: 2, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 1 }}>
            <ButtonGroup size="small" sx={{ borderRadius: 2, overflow: "hidden" }}>
              <Button
                onClick={() => setViewType("meta")}
                startIcon={<TagIcon />}
                sx={{
                  bgcolor: viewType === "meta" ? "#2563eb" : "rgba(255,255,255,0.05)",
                  color: "white",
                  fontSize: "0.75rem",
                  "&:hover": { bgcolor: viewType === "meta" ? "#1d4ed8" : "rgba(255,255,255,0.1)" },
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
                  fontSize: "0.75rem",
                  "&:hover": { bgcolor: viewType === "jsonld" ? "#6d28d9" : "rgba(255,255,255,0.1)" },
                }}
              >
                JSON-LD
              </Button>
            </ButtonGroup>

            <CopyToClipboard text={viewType === "meta" ? metaCode : jsonCode} onCopy={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }}>
              <Button
                size="small"
                variant="outlined"
                startIcon={copied ? <SuccessIcon fontSize="small" /> : <CopyIcon fontSize="small" />}
                sx={{
                  borderRadius: 2,
                  color: copied ? "#4ade80" : "white",
                  borderColor: copied ? "#4ade80" : "rgba(255,255,255,0.3)",
                  fontSize: "0.75rem",
                  "&:hover": { borderColor: "white", bgcolor: "rgba(255,255,255,0.05)" },
                }}
              >
                {copied ? "Copied!" : "Copy"}
              </Button>
            </CopyToClipboard>
          </Box>

          {/* Code view */}
          {viewType === "meta" ? (
            <Box sx={{ px: 3, pb: 3 }}>
              <Grid container spacing={2} sx={{ mb: 2 }}>
                {[
                  { label: "SEO Title", value: tags.title, color: "white" },
                  { label: "Description", value: tags.description, color: "#94a3b8" },
                  { label: "Keywords", value: tags.keywords, color: "#60a5fa" },
                  { label: "OG Title", value: tags["og:title"], color: "#c4b5fd" },
                ].map((item) => (
                  <Grid item xs={12} sm={6} key={item.label}>
                    <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 1 }}>
                      {item.label}
                    </Typography>
                    <Typography variant="body2" sx={{ color: item.color, mt: 0.5, lineHeight: 1.5, fontWeight: item.label === "SEO Title" ? 700 : 400 }}>
                      {item.value}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
              <Box sx={{ borderRadius: 2, overflow: "hidden" }}>
                <SyntaxHighlighter language="html" style={vscDarkPlus} customStyle={{ margin: 0, padding: "16px", background: "rgba(15,23,42,0.6)", fontSize: "0.8rem" }}>
                  {metaCode}
                </SyntaxHighlighter>
              </Box>
            </Box>
          ) : (
            <SyntaxHighlighter language="json" style={vscDarkPlus} customStyle={{ margin: 0, padding: "24px", background: "rgba(15,23,42,0.6)", fontSize: "0.82rem" }}>
              {jsonCode}
            </SyntaxHighlighter>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const AIUrlAnalyzer = () => {
  const [url, setUrl] = useState("");

  // Step 1 — Crawl
  const [crawling, setCrawling] = useState(false);
  const [crawlError, setCrawlError] = useState(null);
  const [pages, setPages] = useState(null);

  // Step 2 — Select
  const [selectedPages, setSelectedPages] = useState(new Set());

  // Step 3 — Generate
  const [generating, setGenerating] = useState(false);
  const [generateProgress, setGenerateProgress] = useState(0);
  const [results, setResults] = useState(null);
  const [generateError, setGenerateError] = useState(null);

  // SEO Overview panel
  const [overviewPage, setOverviewPage] = useState(null);

  // Derived step
  const step = results ? 3 : pages ? 2 : 1;

  // ── Step 1: Crawl ──────────────────────────────────────────────────────────
  const handleCrawl = async () => {
    if (!url.trim()) { setCrawlError("Please enter a valid URL"); return; }
    setCrawling(true);
    setCrawlError(null);
    setPages(null);
    setSelectedPages(new Set());
    setResults(null);

    try {
      const res = await fetch(`${API_BASE}/crawl`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setPages(data.data.pages);
        // Auto-select home page
        const homePages = new Set(data.data.pages.filter((p) => p.path === "/" || p.path === "").map((p) => p.url));
        setSelectedPages(homePages.size > 0 ? homePages : new Set([data.data.pages[0]?.url].filter(Boolean)));
      } else {
        setCrawlError(data.error || "Failed to crawl the website.");
      }
    } catch {
      setCrawlError("Could not reach the server. Please ensure the backend is running.");
    } finally {
      setCrawling(false);
    }
  };

  // ── Step 2: Selection helpers ──────────────────────────────────────────────
  const togglePage = (pageUrl) => {
    setSelectedPages((prev) => {
      const next = new Set(prev);
      next.has(pageUrl) ? next.delete(pageUrl) : next.add(pageUrl);
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedPages.size === pages.length) {
      setSelectedPages(new Set());
    } else {
      setSelectedPages(new Set(pages.map((p) => p.url)));
    }
  };

  // ── Step 3: Generate AI tags ───────────────────────────────────────────────
  const handleGenerate = async () => {
    if (selectedPages.size === 0) { setGenerateError("Please select at least one page."); return; }
    setGenerating(true);
    setGenerateError(null);
    setResults(null);
    setGenerateProgress(0);

    const selected = pages.filter((p) => selectedPages.has(p.url));
    const resultList = [];

    for (let i = 0; i < selected.length; i++) {
      const page = selected[i];
      try {
        const res = await fetch(`${API_BASE}/url`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: page.url }),
        });
        const data = await res.json();
        resultList.push({ url: page.url, title: page.title, success: data.success, data: data.data, error: data.error });
      } catch {
        resultList.push({ url: page.url, title: page.title, success: false, error: "Network error" });
      }
      setGenerateProgress(Math.round(((i + 1) / selected.length) * 100));
    }

    setResults(resultList);
    setGenerating(false);
  };

  // ── Reset ──────────────────────────────────────────────────────────────────
  const handleReset = () => {
    setUrl("");
    setPages(null);
    setSelectedPages(new Set());
    setResults(null);
    setCrawlError(null);
    setGenerateError(null);
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", width: "100%", mt: 4 }}>

      {/* ── URL Input ─────────────────────────────────────────────────── */}
      <Paper
        elevation={0}
        sx={{
          p: 1,
          borderRadius: 4,
          display: "flex",
          alignItems: "center",
          bgcolor: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          mb: 3,
        }}
      >
        <UrlIcon sx={{ ml: 2, mr: 1, color: "rgba(255,255,255,0.5)" }} />
        <TextField
          fullWidth
          placeholder="Paste website URL (e.g. https://example.com)"
          variant="standard"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          sx={{
            input: { color: "white", py: 2 },
            "& .MuiInput-underline:before, & .MuiInput-underline:after": { display: "none" },
          }}
          onKeyDown={(e) => e.key === "Enter" && !pages && handleCrawl()}
        />
        {pages ? (
          <Button
            variant="outlined"
            onClick={handleReset}
            sx={{ borderRadius: 3, px: 3, py: 1.5, color: "rgba(255,255,255,0.6)", borderColor: "rgba(255,255,255,0.2)", fontWeight: "bold", textTransform: "none", mr: 1, "&:hover": { borderColor: "white", bgcolor: "rgba(255,255,255,0.05)" } }}
          >
            Reset
          </Button>
        ) : null}
        <Button
          variant="contained"
          disabled={crawling}
          onClick={pages ? handleGenerate : handleCrawl}
          startIcon={crawling ? <CircularProgress size={20} color="inherit" /> : pages ? <AIIcon /> : <CrawlIcon />}
          sx={{
            borderRadius: 3,
            px: 4,
            py: 1.5,
            background: "linear-gradient(45deg, #2563eb, #7c3aed)",
            fontWeight: "bold",
            textTransform: "none",
            fontSize: "1rem",
            boxShadow: "0 4px 15px rgba(37,99,235,0.3)",
            "&:hover": { background: "linear-gradient(45deg, #1d4ed8, #6d28d9)" },
          }}
        >
          {crawling ? "Discovering..." : pages && !results ? "Generate AI Tags" : results ? "Regenerate" : "Discover Pages"}
        </Button>
      </Paper>

      {/* ── Step Tracker ─────────────────────────────────────────────── */}
      {(pages || crawling) && (
        <Fade in>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, mb: 4 }}>
            <StepDot step={1} current={step} label="Crawl" />
            <Box sx={{ flex: 1, maxWidth: 80, height: 2, bgcolor: step > 1 ? "#22c55e" : "rgba(255,255,255,0.15)", borderRadius: 1, transition: "all 0.4s" }} />
            <StepDot step={2} current={step} label="Select" />
            <Box sx={{ flex: 1, maxWidth: 80, height: 2, bgcolor: step > 2 ? "#22c55e" : "rgba(255,255,255,0.15)", borderRadius: 1, transition: "all 0.4s" }} />
            <StepDot step={3} current={step} label="Generate" />
          </Box>
        </Fade>
      )}

      {/* ── Errors ───────────────────────────────────────────────────── */}
      {crawlError && (
        <Fade in>
          <Alert severity="error" icon={<ErrorIcon />} sx={{ borderRadius: 3, mb: 3, bgcolor: "rgba(239,68,68,0.1)", color: "#fca5a5" }}>
            {crawlError}
          </Alert>
        </Fade>
      )}

      {/* ── Page List (Step 2) ────────────────────────────────────────── */}
      {pages && !results && (
        <Fade in>
          <Box>
            {/* Header */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <PagesIcon sx={{ color: "#60a5fa" }} />
                <Typography variant="h6" fontWeight="800" sx={{ color: "white" }}>
                  {pages.length} Page{pages.length !== 1 ? "s" : ""} Discovered
                </Typography>
                <Chip
                  label={`${selectedPages.size} selected`}
                  size="small"
                  sx={{ bgcolor: selectedPages.size > 0 ? "rgba(37,99,235,0.25)" : "rgba(255,255,255,0.08)", color: selectedPages.size > 0 ? "#93c5fd" : "rgba(255,255,255,0.4)", fontWeight: 700 }}
                />
              </Box>
              <Button
                size="small"
                startIcon={selectedPages.size === pages.length ? <DeselectIcon /> : <SelectAllIcon />}
                onClick={toggleAll}
                sx={{ color: "rgba(255,255,255,0.6)", textTransform: "none", fontWeight: 600, "&:hover": { color: "white" } }}
              >
                {selectedPages.size === pages.length ? "Deselect All" : "Select All"}
              </Button>
            </Box>

            {/* Page Grid */}
            <Paper elevation={0} sx={{ p: 2, borderRadius: 3, bgcolor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", mb: 3 }}>
              <Stack spacing={1}>
                {pages.map((page) => (
                  <PageCard
                    key={page.url}
                    page={page}
                    selected={selectedPages.has(page.url)}
                    onToggle={() => togglePage(page.url)}
                    onViewOverview={() => setOverviewPage(page)}
                  />
                ))}
              </Stack>
            </Paper>

            {/* Generate button (bottom shortcut) */}
            {generating ? (
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>
                    Generating AI tags… ({generateProgress}%)
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#60a5fa", fontWeight: 700 }}>
                    {Math.round((generateProgress / 100) * selectedPages.size)}/{selectedPages.size} pages
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={generateProgress}
                  sx={{
                    borderRadius: 2,
                    height: 6,
                    bgcolor: "rgba(255,255,255,0.08)",
                    "& .MuiLinearProgress-bar": { background: "linear-gradient(45deg, #2563eb, #7c3aed)", borderRadius: 2 },
                  }}
                />
              </Box>
            ) : generateError ? (
              <Alert severity="warning" sx={{ borderRadius: 2, mb: 2, bgcolor: "rgba(234,179,8,0.1)", color: "#fde68a" }}>
                {generateError}
              </Alert>
            ) : null}
          </Box>
        </Fade>
      )}

      {/* ── Results (Step 3) ──────────────────────────────────────────── */}
      {results && (
        <Fade in>
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
              <Typography variant="h5" fontWeight="800" sx={{ color: "white", display: "flex", alignItems: "center", gap: 1 }}>
                <SuccessIcon color="success" />
                AI Results — {results.filter((r) => r.success).length}/{results.length} pages
              </Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={() => { setResults(null); }}
                sx={{ borderRadius: 2, color: "rgba(255,255,255,0.6)", borderColor: "rgba(255,255,255,0.2)", textTransform: "none", "&:hover": { borderColor: "white" } }}
              >
                ← Back to selection
              </Button>
            </Box>

            <Stack spacing={0}>
              {results.map((r) => (
                <ResultBlock key={r.url} pageResult={r} />
              ))}
            </Stack>
          </Box>
        </Fade>
      )}

      {/* ── SEO Overview Drawer ───────────────────────────────────────── */}
      <SeoOverviewPanel
        page={overviewPage}
        open={!!overviewPage}
        onClose={() => setOverviewPage(null)}
      />
    </Box>
  );
};

export default AIUrlAnalyzer;
