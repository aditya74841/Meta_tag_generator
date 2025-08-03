// app/meta-tags-generator/GeneratedCodePanel.js

import React from "react";
import { Box, Paper, Typography, Chip, Alert, IconButton, Tooltip } from "@mui/material";
import { ContentCopy as CopyIcon, CheckCircle as CheckIcon } from "@mui/icons-material";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function GeneratedCodePanel({ generatedCode, onCopy, copied }) {
  return (
    <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden", height: "fit-content", mb: 2 }}>
      <Box sx={{ bgcolor: "success.main", color: "white", p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6" fontWeight="bold">GENERATED CODE</Typography>
        <Chip 
          label={`${generatedCode.split('\n').filter(line => line.trim()).length} tags`} 
          sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white" }}
        />
      </Box>

      <Alert severity="info" sx={{ m: 0, borderRadius: 0 }}>
        Copy this code to the &lt;head&gt; section of your HTML page.
      </Alert>

      <Box sx={{ p: 3, bgcolor: "#1e1e1e", color: "#f8f8f2", position: "relative", fontFamily: "'Fira Code', monospace", fontSize: "0.875rem", lineHeight: "1.5", whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
        <CopyToClipboard text={generatedCode} onCopy={onCopy}>
          <Tooltip title={copied ? "Copied!" : "Copy to clipboard"}>
            <IconButton
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                color: copied ? "success.main" : "primary.main",
                bgcolor: "rgba(255,255,255,0.1)",
                "&:hover": { bgcolor: "rgba(255,255,255,0.2)" }
              }}
            >
              {copied ? <CheckIcon /> : <CopyIcon />}
            </IconButton>
          </Tooltip>
        </CopyToClipboard>

        {generatedCode.split('\n').map((line, index) => (
          <div key={index} style={{ 
            padding: "2px 0",
            borderLeft: line.trim() ? "3px solid #4CAF50" : "3px solid transparent",
            paddingLeft: "8px",
            opacity: line.trim() ? 1 : 0.5
          }}>
            {line || " "}
          </div>
        ))}
      </Box>
    </Paper>
  );
}
