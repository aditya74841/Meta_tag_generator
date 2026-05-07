"use client";
import React, { useState } from "react";
import {
  Box, Typography, Drawer, IconButton, LinearProgress,
  Chip, Stack, Divider, CircularProgress, Alert, Button,
  Collapse, Tooltip,
} from "@mui/material";
import {
  Close as CloseIcon,
  TrendingUp as ScoreIcon,
  Error as CriticalIcon,
  Warning as WarningIcon,
  Lightbulb as OpportunityIcon,
  Star as RecommendIcon,
  Key as KeywordIcon,
  Analytics as InsightIcon,
  AutoFixHigh as FixIcon,
  ContentCopy as CopyIcon,
  CheckCircle as CheckIcon,
  Code as CodeIcon,
  CompareArrows as BeforeAfterIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import { CopyToClipboard } from "react-copy-to-clipboard";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// ── Session-level caches (survive panel open/close, cleared on page reload) ──
// Key: page URL  →  Value: { overview, originalMeta } or { fixData }
const overviewCache = new Map();
const fixCache      = new Map();

// ── Score bar ────────────────────────────────────────────────────────────────
const ScoreBar = ({ label, score, status, detail }) => {
  const color = status === "good" ? "#22c55e" : status === "warning" ? "#f59e0b" : "#ef4444";
  const bg    = status === "good" ? "rgba(34,197,94,0.1)" : status === "warning" ? "rgba(245,158,11,0.1)" : "rgba(239,68,68,0.1)";
  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>{label}</Typography>
        <Chip label={`${score}/100`} size="small" sx={{ height: 20, bgcolor: bg, color, fontWeight: 700, fontSize: "0.7rem" }} />
      </Box>
      <LinearProgress variant="determinate" value={score}
        sx={{ borderRadius: 2, height: 6, bgcolor: "rgba(255,255,255,0.06)",
          "& .MuiLinearProgress-bar": { background: color, borderRadius: 2 } }} />
      {detail && (
        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)", mt: 0.5, display: "block" }}>{detail}</Typography>
      )}
    </Box>
  );
};

// ── Grade badge ──────────────────────────────────────────────────────────────
const GradeBadge = ({ grade, score }) => {
  const color = score >= 80 ? "#22c55e" : score >= 60 ? "#f59e0b" : "#ef4444";
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      width: 80, height: 80, borderRadius: "50%", border: `3px solid ${color}`,
      bgcolor: `${color}15`, flexShrink: 0 }}>
      <Typography sx={{ fontSize: "1.8rem", fontWeight: 900, color, lineHeight: 1 }}>{grade}</Typography>
      <Typography sx={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>{score}/100</Typography>
    </Box>
  );
};

// ── Copy button ──────────────────────────────────────────────────────────────
const CopyBtn = ({ text, label = "Copy" }) => {
  const [copied, setCopied] = useState(false);
  return (
    <CopyToClipboard text={text} onCopy={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }}>
      <Button size="small" startIcon={copied ? <CheckIcon sx={{ fontSize: 14 }} /> : <CopyIcon sx={{ fontSize: 14 }} />}
        sx={{ color: copied ? "#4ade80" : "rgba(255,255,255,0.5)", fontSize: "0.7rem", textTransform: "none",
          borderColor: copied ? "#4ade80" : "rgba(255,255,255,0.15)", border: "1px solid",
          borderRadius: 1.5, px: 1.5, py: 0.5,
          "&:hover": { color: "white", borderColor: "rgba(255,255,255,0.4)" } }}>
        {copied ? "Copied!" : label}
      </Button>
    </CopyToClipboard>
  );
};

// ── Before/After tag row ─────────────────────────────────────────────────────
const TagRow = ({ label, before, after }) => (
  <Box sx={{ mb: 1.5 }}>
    <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: 1, display: "block", mb: 0.5 }}>
      {label}
    </Typography>
    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
      <Box sx={{ p: 1.25, borderRadius: 1.5, bgcolor: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.15)" }}>
        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.25)", display: "block", mb: 0.25 }}>Before</Typography>
        <Typography variant="caption" sx={{ color: "#fca5a5", lineHeight: 1.4, wordBreak: "break-word" }}>
          {before || <em style={{ opacity: 0.4 }}>empty</em>}
        </Typography>
      </Box>
      <Box sx={{ p: 1.25, borderRadius: 1.5, bgcolor: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.2)" }}>
        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.25)", display: "block", mb: 0.25 }}>After</Typography>
        <Typography variant="caption" sx={{ color: "#86efac", lineHeight: 1.4, wordBreak: "break-word" }}>
          {after || <em style={{ opacity: 0.4 }}>—</em>}
        </Typography>
      </Box>
    </Box>
  </Box>
);

// ── Generate Fix Section ─────────────────────────────────────────────────────
const GenerateFixSection = ({ pageUrl, originalMeta }) => {
  const cached = fixCache.get(pageUrl);
  const [fixLoading, setFixLoading] = useState(false);
  const [fixData, setFixData]       = useState(cached || null);
  const [fixError, setFixError]     = useState(null);
  const [showCode, setShowCode]     = useState(false);

  const handleFix = async (force = false) => {
    // Return from cache unless forced
    if (!force && fixCache.has(pageUrl)) {
      setFixData(fixCache.get(pageUrl));
      return;
    }
    setFixLoading(true);
    setFixError(null);
    setFixData(null);
    try {
      const res = await fetch(`${API_BASE}/url`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: pageUrl }),
      });
      const json = await res.json();
      if (json.success) {
        fixCache.set(pageUrl, json.data.generated);
        setFixData(json.data.generated);
      } else setFixError(json.error || "Failed to generate fix.");
    } catch {
      setFixError("Could not reach the server.");
    } finally {
      setFixLoading(false);
    }
  };

  const htmlCode = fixData ? `<!-- AI-Fixed SEO Tags for ${pageUrl} -->
<title>${fixData.metaTags.title}</title>
<meta name="description" content="${fixData.metaTags.description}">
<meta name="keywords" content="${fixData.metaTags.keywords}">
<meta property="og:title" content="${fixData.metaTags["og:title"]}">
<meta property="og:description" content="${fixData.metaTags["og:description"]}">
<meta name="twitter:card" content="${fixData.metaTags["twitter:card"]}">
<meta name="twitter:title" content="${fixData.metaTags["twitter:title"]}">
<meta name="twitter:description" content="${fixData.metaTags["twitter:description"]}">`.trim() : "";

  return (
    <Box sx={{ p: 2.5, borderRadius: 3, border: "1px solid rgba(37,99,235,0.3)",
      background: "linear-gradient(135deg, rgba(37,99,235,0.08) 0%, rgba(124,58,237,0.08) 100%)" }}>

      {/* Section header */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <FixIcon sx={{ color: "#818cf8", fontSize: 20 }} />
          <Typography variant="body2" fontWeight={800} sx={{ color: "white" }}>Generate Fix</Typography>
          <Chip label="AI" size="small" sx={{ height: 18, bgcolor: "rgba(129,140,248,0.2)", color: "#a5b4fc", fontWeight: 800, fontSize: "0.6rem" }} />
        </Box>
        {!fixData && !fixLoading && (
          <Button variant="contained" size="small" onClick={() => handleFix(false)}
            startIcon={<FixIcon sx={{ fontSize: 14 }} />}
            sx={{ background: "linear-gradient(45deg,#2563eb,#7c3aed)", borderRadius: 2,
              textTransform: "none", fontWeight: 700, fontSize: "0.8rem", px: 2,
              boxShadow: "0 4px 12px rgba(37,99,235,0.3)",
              "&:hover": { background: "linear-gradient(45deg,#1d4ed8,#6d28d9)" } }}>
            Fix It
          </Button>
        )}
      </Box>

      <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)", display: "block", mb: 1.5 }}>
        AI will analyse this page and generate corrected, optimised meta tags — ready to paste into your site.
      </Typography>

      {/* Loading */}
      {fixLoading && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, py: 1 }}>
          <CircularProgress size={18} sx={{ color: "#818cf8" }} />
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)" }}>Generating optimised tags…</Typography>
        </Box>
      )}

      {/* Error */}
      {fixError && (
        <Alert severity="error" sx={{ borderRadius: 2, bgcolor: "rgba(239,68,68,0.1)", color: "#fca5a5", py: 0.5 }}>
          {fixError}
        </Alert>
      )}

      {/* Results */}
      {fixData && !fixLoading && (
        <Box>
          {/* Action bar */}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2, flexWrap: "wrap", gap: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CheckIcon sx={{ color: "#22c55e", fontSize: 16 }} />
              <Typography variant="caption" sx={{ color: "#4ade80", fontWeight: 700 }}>Fix Generated!</Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button size="small" onClick={() => setShowCode(v => !v)}
                startIcon={<CodeIcon sx={{ fontSize: 14 }} />}
                sx={{ color: showCode ? "#a5b4fc" : "rgba(255,255,255,0.5)", fontSize: "0.7rem", textTransform: "none",
                  border: "1px solid", borderColor: showCode ? "rgba(165,180,252,0.4)" : "rgba(255,255,255,0.15)",
                  borderRadius: 1.5, px: 1.5, py: 0.5 }}>
                {showCode ? "Hide HTML" : "Show HTML"}
              </Button>
              <CopyBtn text={htmlCode} label="Copy All HTML" />
              <Button size="small" onClick={() => handleFix(true)}
                sx={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem", textTransform: "none",
                  border: "1px solid rgba(255,255,255,0.1)", borderRadius: 1.5, px: 1.5, py: 0.5,
                  "&:hover": { color: "white" } }}>
                Regenerate
              </Button>
            </Box>
          </Box>

          {/* Before / After comparison */}
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
              <BeforeAfterIcon sx={{ color: "rgba(255,255,255,0.3)", fontSize: 16 }} />
              <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
                Before vs After
              </Typography>
            </Box>
            <TagRow label="Title" before={originalMeta?.title} after={fixData.metaTags.title} />
            <TagRow label="Description" before={originalMeta?.description} after={fixData.metaTags.description} />
            <TagRow label="Keywords" before={originalMeta?.keywords} after={fixData.metaTags.keywords} />
            <TagRow label="OG Title" before={originalMeta?.["og:title"]} after={fixData.metaTags["og:title"]} />
          </Box>

          {/* HTML code block */}
          <Collapse in={showCode}>
            <Box sx={{ position: "relative", borderRadius: 2, overflow: "hidden",
              bgcolor: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <Box sx={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}>
                <CopyBtn text={htmlCode} />
              </Box>
              <Box component="pre" sx={{ m: 0, p: 2, fontSize: "0.75rem", color: "#93c5fd",
                overflowX: "auto", fontFamily: "monospace", lineHeight: 1.6, pt: 4 }}>
                {htmlCode}
              </Box>
            </Box>
          </Collapse>
        </Box>
      )}
    </Box>
  );
};

// ── Main Panel ───────────────────────────────────────────────────────────────
const SeoOverviewPanel = ({ page, open, onClose }) => {
  const [loading, setLoading]               = useState(false);
  const [data, setData]                     = useState(null);
  const [originalMeta, setOriginalMeta]     = useState(null);
  const [error, setError]                   = useState(null);
  const [fromCache, setFromCache]           = useState(false);

  const prevUrl = React.useRef(null);
  React.useEffect(() => {
    if (!open || !page) return;

    // ── Cache hit: no API call needed ─────────────────────────────────────
    if (overviewCache.has(page.url)) {
      const cached = overviewCache.get(page.url);
      setData(cached.overview);
      setOriginalMeta(cached.originalMeta || null);
      setError(null);
      setFromCache(true);
      prevUrl.current = page.url;
      return;
    }

    // ── Cache miss: fetch from API ────────────────────────────────────────
    if (prevUrl.current === page.url) return; // already in-flight
    prevUrl.current = page.url;
    setData(null);
    setOriginalMeta(null);
    setError(null);
    setFromCache(false);
    setLoading(true);
    fetch(`${API_BASE}/seo-overview`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: page.url }),
    })
      .then((r) => r.json())
      .then((res) => {
        if (res.success) {
          overviewCache.set(page.url, {
            overview:     res.data.overview,
            originalMeta: res.data.originalMeta || null,
          });
          setData(res.data.overview);
          setOriginalMeta(res.data.originalMeta || null);
        } else setError(res.error || "Failed to generate overview.");
      })
      .catch(() => setError("Could not reach the server."))
      .finally(() => setLoading(false));
  }, [open, page]);

  // Force-refresh: clear cache for this URL and re-fetch
  const handleRefresh = () => {
    if (!page) return;
    overviewCache.delete(page.url);
    fixCache.delete(page.url);
    prevUrl.current = null;
    setData(null);
    setOriginalMeta(null);
    setError(null);
    setFromCache(false);
    setLoading(true);
    fetch(`${API_BASE}/seo-overview`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: page.url }),
    })
      .then((r) => r.json())
      .then((res) => {
        if (res.success) {
          overviewCache.set(page.url, {
            overview:     res.data.overview,
            originalMeta: res.data.originalMeta || null,
          });
          setData(res.data.overview);
          setOriginalMeta(res.data.originalMeta || null);
          prevUrl.current = page.url;
        } else setError(res.error || "Failed to generate overview.");
      })
      .catch(() => setError("Could not reach the server."))
      .finally(() => setLoading(false));
  };

  const priorityColor = (p) =>
    p === "high" ? "#ef4444" : p === "medium" ? "#f59e0b" : "#60a5fa";

  return (
    <Drawer anchor="right" open={open} onClose={onClose}
      PaperProps={{ sx: { width: { xs: "100%", sm: 520 }, bgcolor: "#0f172a",
        borderLeft: "1px solid rgba(255,255,255,0.07)", overflowX: "hidden" } }}>

      {/* Header */}
      <Box sx={{ px: 3, py: 2.5, display: "flex", alignItems: "center", gap: 1.5,
        borderBottom: "1px solid rgba(255,255,255,0.07)", bgcolor: "rgba(255,255,255,0.02)" }}>
        <ScoreIcon sx={{ color: "#60a5fa" }} />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body1" fontWeight={800} sx={{ color: "white" }}>SEO Overview & Fix</Typography>
            {fromCache && (
              <Chip label="cached" size="small"
                sx={{ height: 16, bgcolor: "rgba(96,165,250,0.15)", color: "#60a5fa", fontWeight: 700, fontSize: "0.6rem" }} />
            )}
          </Box>
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)", fontFamily: "monospace",
            display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {page?.url}
          </Typography>
        </Box>
        <Tooltip title="Re-analyse (clears cache)">
          <IconButton onClick={handleRefresh} size="small"
            sx={{ color: "rgba(255,255,255,0.35)", "&:hover": { color: "#60a5fa" }, mr: 0.5 }}>
            <RefreshIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <IconButton onClick={onClose} size="small" sx={{ color: "rgba(255,255,255,0.5)", "&:hover": { color: "white" } }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Body */}
      <Box sx={{ p: 3, overflowY: "auto", flex: 1 }}>

        {loading && (
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", py: 8, gap: 2 }}>
            <CircularProgress sx={{ color: "#2563eb" }} />
            <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>
              Analysing page as SEO expert…
            </Typography>
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ borderRadius: 2, bgcolor: "rgba(239,68,68,0.1)", color: "#fca5a5" }}>
            {error}
          </Alert>
        )}

        {data && !loading && (
          <Stack spacing={3}>

            {/* Score summary */}
            <Box sx={{ display: "flex", gap: 2, alignItems: "center",
              p: 2.5, borderRadius: 3, bgcolor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <GradeBadge grade={data.grade} score={data.overallScore} />
              <Box>
                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 1 }}>
                  Expert Summary
                </Typography>
                <Typography variant="body2" sx={{ color: "#cbd5e1", lineHeight: 1.6, mt: 0.5 }}>
                  {data.summary}
                </Typography>
              </Box>
            </Box>

            {/* ── Generate Fix ── */}
            <GenerateFixSection
              pageUrl={page?.url}
              originalMeta={originalMeta}
            />

            <Divider sx={{ borderColor: "rgba(255,255,255,0.05)" }} />

            {/* Score breakdown */}
            <Box>
              <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 1, display: "block", mb: 1.5 }}>
                Score Breakdown
              </Typography>
              {Object.entries(data.scores || {}).map(([key, val]) => (
                <ScoreBar key={key}
                  label={key.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase())}
                  score={val.score} status={val.status} detail={val.detail} />
              ))}
            </Box>

            <Divider sx={{ borderColor: "rgba(255,255,255,0.05)" }} />

            {/* Critical Issues */}
            {data.criticalIssues?.length > 0 && (
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <CriticalIcon sx={{ color: "#ef4444", fontSize: 18 }} />
                  <Typography variant="caption" sx={{ color: "#ef4444", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
                    Critical Issues
                  </Typography>
                </Box>
                <Stack spacing={0.75}>
                  {data.criticalIssues.map((issue, i) => (
                    <Box key={i} sx={{ p: 1.5, borderRadius: 1.5, bgcolor: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
                      <Typography variant="body2" sx={{ color: "#fca5a5" }}>{issue}</Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            )}

            {/* Warnings */}
            {data.warnings?.length > 0 && (
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <WarningIcon sx={{ color: "#f59e0b", fontSize: 18 }} />
                  <Typography variant="caption" sx={{ color: "#f59e0b", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
                    Warnings
                  </Typography>
                </Box>
                <Stack spacing={0.75}>
                  {data.warnings.map((w, i) => (
                    <Box key={i} sx={{ p: 1.5, borderRadius: 1.5, bgcolor: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" }}>
                      <Typography variant="body2" sx={{ color: "#fde68a" }}>{w}</Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            )}

            {/* Opportunities */}
            {data.opportunities?.length > 0 && (
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <OpportunityIcon sx={{ color: "#a78bfa", fontSize: 18 }} />
                  <Typography variant="caption" sx={{ color: "#a78bfa", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
                    Opportunities
                  </Typography>
                </Box>
                <Stack spacing={0.75}>
                  {data.opportunities.map((o, i) => (
                    <Box key={i} sx={{ p: 1.5, borderRadius: 1.5, bgcolor: "rgba(167,139,250,0.08)", border: "1px solid rgba(167,139,250,0.2)" }}>
                      <Typography variant="body2" sx={{ color: "#c4b5fd" }}>{o}</Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            )}

            <Divider sx={{ borderColor: "rgba(255,255,255,0.05)" }} />

            {/* Top Recommendations */}
            {data.topRecommendations?.length > 0 && (
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                  <RecommendIcon sx={{ color: "#60a5fa", fontSize: 18 }} />
                  <Typography variant="caption" sx={{ color: "#60a5fa", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
                    Top Recommendations
                  </Typography>
                </Box>
                <Stack spacing={1}>
                  {data.topRecommendations.map((rec, i) => (
                    <Box key={i} sx={{ p: 2, borderRadius: 2, bgcolor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.75 }}>
                        <Chip label={rec.priority?.toUpperCase()} size="small"
                          sx={{ height: 18, bgcolor: `${priorityColor(rec.priority)}20`,
                            color: priorityColor(rec.priority), fontWeight: 800, fontSize: "0.6rem" }} />
                      </Box>
                      <Typography variant="body2" sx={{ color: "white", fontWeight: 600 }}>{rec.action}</Typography>
                      <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.45)", mt: 0.25, display: "block" }}>
                        Impact: {rec.impact}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            )}

            {/* Target Keywords */}
            {data.targetKeywords?.length > 0 && (
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <KeywordIcon sx={{ color: "#34d399", fontSize: 18 }} />
                  <Typography variant="caption" sx={{ color: "#34d399", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
                    Target Keywords
                  </Typography>
                </Box>
                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {data.targetKeywords.map((kw, i) => (
                    <Chip key={i} label={kw} size="small"
                      sx={{ bgcolor: "rgba(52,211,153,0.1)", color: "#6ee7b7", fontWeight: 600, border: "1px solid rgba(52,211,153,0.2)" }} />
                  ))}
                </Stack>
              </Box>
            )}

            {/* Competitive Insight */}
            {data.competitiveInsight && (
              <Box sx={{ p: 2, borderRadius: 2, bgcolor: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.2)" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.75 }}>
                  <InsightIcon sx={{ color: "#60a5fa", fontSize: 18 }} />
                  <Typography variant="caption" sx={{ color: "#60a5fa", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
                    Competitive Insight
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: "#93c5fd", lineHeight: 1.6 }}>
                  {data.competitiveInsight}
                </Typography>
              </Box>
            )}

          </Stack>
        )}
      </Box>
    </Drawer>
  );
};

export default SeoOverviewPanel;
