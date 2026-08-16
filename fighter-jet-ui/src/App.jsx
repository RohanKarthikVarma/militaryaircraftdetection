import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Box,
  LinearProgress,
  CircularProgress,
  Alert,
  Chip,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import Home from "./Home";
import { aircraftSpecs, CATEGORY_COLORS, findSpecByLabel } from "./aircraftData";

// ─── Detect page color palettes ──────────────────────────────────
const DDARK = {
  bg: "#111827",
  bgAlt: "#1F2937",
  surface: "rgba(255,255,255,0.05)",
  border: "rgba(255,255,255,0.09)",
  accent: "#818CF8",
  accentGlow: "rgba(129,140,248,0.22)",
  accentAlt: "#F59E0B",
  text: "#F1F5F9",
  muted: "#64748B",
  gradient: "linear-gradient(135deg,#6366F1,#A78BFA)",
  gradientSubtle: "linear-gradient(135deg,rgba(99,102,241,0.12),rgba(167,139,250,0.12))",
  navBg: "rgba(17,24,39,0.9)",
  cardShadow: "0 4px 24px rgba(0,0,0,0.4)",
};

const DLIGHT = {
  bg: "#F8FAFC",
  bgAlt: "#EFF6FF",
  surface: "rgba(255,255,255,0.85)",
  border: "rgba(15,23,42,0.1)",
  accent: "#4F46E5",
  accentGlow: "rgba(79,70,229,0.2)",
  accentAlt: "#F59E0B",
  text: "#0F172A",
  muted: "#64748B",
  gradient: "linear-gradient(135deg,#4F46E5,#7C3AED)",
  gradientSubtle: "linear-gradient(135deg,rgba(79,70,229,0.07),rgba(124,58,237,0.07))",
  navBg: "rgba(248,250,252,0.92)",
  cardShadow: "0 2px 16px rgba(15,23,42,0.08)",
};

// ─── Spec row helper ─────────────────────────────────────────────
function SpecRow({ label, value, C }) {
  return (
    <Box display="flex" justifyContent="space-between" py={0.7}
      sx={{ borderBottom: `1px solid ${C.border}` }}>
      <Typography fontSize="0.7rem" sx={{ color: C.muted, textTransform: "uppercase", letterSpacing: "0.07em" }}>
        {label}
      </Typography>
      <Typography fontSize="0.82rem" fontWeight={600} sx={{ color: C.text }}>{value}</Typography>
    </Box>
  );
}

// ─── Aircraft Info Panel ─────────────────────────────────────────
function AircraftInfoPanel({ label, confidence, C }) {
  const spec = findSpecByLabel(label);
  const cat = spec ? (CATEGORY_COLORS[spec.category] || CATEGORY_COLORS.Fighter) : null;

  if (!spec) {
    return (
      <Box
        sx={{
          mt: 2,
          p: 2,
          borderRadius: "14px",
          background: C.surface,
          border: `1px solid ${C.border}`,
        }}
      >
        <Typography fontSize="0.85rem" sx={{ color: C.muted }}>
          No spec data available for <strong style={{ color: C.text }}>{label}</strong>
        </Typography>
      </Box>
    );
  }

  const isRetired = spec.status === "Retired";

  return (
    <Box
      sx={{
        mt: 2,
        borderRadius: "18px",
        background: C.surface,
        border: `1px solid ${C.border}`,
        boxShadow: C.cardShadow,
        overflow: "hidden",
      }}
    >
      {/* Header bar */}
      <Box
        sx={{
          background: C.gradientSubtle,
          borderBottom: `1px solid ${C.border}`,
          px: 2.5,
          py: 1.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <Box>
          <Typography fontWeight={800} fontSize="1.05rem" sx={{ color: C.text }}>{spec.name}</Typography>
          <Typography fontSize="0.75rem" sx={{ color: C.muted }}>{spec.role}</Typography>
        </Box>
        <Box display="flex" gap={0.7} alignItems="center" flexWrap="wrap">
          <Chip
            label={spec.category}
            size="small"
            sx={{
              background: cat.bg,
              border: `1px solid ${cat.border}`,
              color: cat.text,
              fontWeight: 700,
              fontSize: "0.68rem",
              height: 22,
            }}
          />
          <Chip
            label={`${(confidence * 100).toFixed(1)}% confidence`}
            size="small"
            sx={{
              background: C.gradientSubtle,
              border: `1px solid ${C.accent}55`,
              color: C.accent,
              fontWeight: 700,
              fontSize: "0.68rem",
              height: 22,
            }}
          />
          {isRetired && (
            <Chip
              label="Retired"
              size="small"
              sx={{
                background: "rgba(100,116,139,0.1)",
                color: C.muted,
                fontWeight: 600,
                fontSize: "0.65rem",
                height: 20,
              }}
            />
          )}
        </Box>
      </Box>

      <Box sx={{ p: 2.5 }}>
        {/* Description */}
        <Typography fontSize="0.82rem" sx={{ color: C.muted, lineHeight: 1.65, mb: 2 }}>
          {spec.description}
        </Typography>

        {/* Mach highlight */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 2.5,
            p: 1.5,
            borderRadius: "12px",
            background: C.gradientSubtle,
            border: `1px solid ${C.border}`,
          }}
        >
          <Box>
            <Typography fontSize="0.62rem" sx={{ color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Top Speed
            </Typography>
            <Typography
              fontWeight={900}
              fontSize="1.6rem"
              sx={{
                background: C.gradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: 1.1,
              }}
            >
              Mach {spec.mach}
            </Typography>
            <Typography fontSize="0.72rem" sx={{ color: C.muted }}>{spec.speed}</Typography>
          </Box>
          <Box sx={{ ml: "auto", textAlign: "right" }}>
            <Typography fontSize="0.62rem" sx={{ color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>First Flight</Typography>
            <Typography fontWeight={700} fontSize="1.1rem" sx={{ color: C.text }}>{spec.firstFlight}</Typography>
            <Typography fontSize="0.7rem" sx={{ color: C.muted }}>{spec.status}</Typography>
          </Box>
        </Box>

        {/* Specs grid */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <SpecRow label="Range" value={spec.range} C={C} />
            <SpecRow label="Service Ceiling" value={spec.ceiling} C={C} />
            <SpecRow label="Crew" value={spec.crew} C={C} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SpecRow label="MTOW" value={spec.weight} C={C} />
            <SpecRow label="Length" value={spec.length} C={C} />
            <SpecRow label="Wingspan" value={spec.wingspan} C={C} />
          </Grid>
        </Grid>

        {/* Engine */}
        <Box mt={1.5}>
          <Typography fontSize="0.62rem" sx={{ color: C.muted, textTransform: "uppercase", letterSpacing: "0.07em", mb: 0.4 }}>
            Powerplant
          </Typography>
          <Typography fontSize="0.82rem" sx={{ color: C.text, lineHeight: 1.5 }}>{spec.engines}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

// ─── Detection Page ─────────────────────────────────────────────
function DetectionPage({ darkMode, onToggleTheme }) {
  const C = darkMode ? DDARK : DLIGHT;
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setPredictions([]);
    setMessage("");
  };

  const handlePredict = async () => {
    if (!file) { alert("Upload an image first"); return; }
    const formData = new FormData();
    formData.append("file", file);
    try {
      setLoading(true);
      setMessage("");
      setPredictions([]);
      const res = await fetch("http://localhost:5000/predict", { method: "POST", body: formData });
      const data = await res.json();
      if (data.message) setMessage(data.message);
      else if (data.top_predictions) {
        setPredictions(data.top_predictions);
        if (data.image_with_boxes) setPreview(data.image_with_boxes);
      } else if (data.error) alert("Error: " + data.error);
    } catch (err) {
      console.error(err);
      alert("Backend not connected");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", background: C.bg, transition: "background 0.3s" }}>
      {/* Navbar */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 1000,
          borderBottom: `1px solid ${C.border}`,
          background: C.navBg,
          backdropFilter: "blur(20px)",
          py: 1.5,
          transition: "background 0.3s",
        }}
      >
        <Container maxWidth="xl">
          <Box display="flex" alignItems="center" justifyContent="space-between">

            {/* Left: Home link */}
            <Typography
              component="a"
              href="/"
              sx={{
                color: C.accent,
                textDecoration: "none",
                fontSize: "0.83rem",
                fontWeight: 700,
                transition: "color 0.2s",
                "&:hover": { opacity: 0.8 },
              }}
            >
              ← Home
            </Typography>

            {/* Right: theme toggle */}
            <Tooltip title={darkMode ? "Switch to Light" : "Switch to Dark"}>
              <IconButton
                onClick={onToggleTheme}
                size="small"
                sx={{
                  color: C.muted,
                  border: `1px solid ${C.border}`,
                  borderRadius: "8px",
                  width: 34,
                  height: 34,
                  background: C.surface,
                  "&:hover": { color: C.accent, borderColor: C.accent },
                }}
              >
                <Typography fontSize="1rem">{darkMode ? "☀️" : "🌙"}</Typography>
              </IconButton>
            </Tooltip>
          </Box>
        </Container>
      </Box>

      {/* Content */}
      <Container maxWidth="md" sx={{ pt: 12, pb: 8 }}>
        {/* Hero */}
        <Box textAlign="center" mb={5}>
          <Typography
            variant="h3"
            fontWeight={900}
            sx={{
              background: C.gradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: { xs: "1.8rem", md: "2.4rem" },
              mb: 1,
            }}
          >
            Aircraft Detection
          </Typography>
          <Typography sx={{ color: C.muted, fontSize: "0.95rem" }}>
            Upload an image · YOLOv8 detects · CNN classifies · Specs displayed
          </Typography>
        </Box>

        {/* Upload card */}
        <Box
          sx={{
            background: C.surface,
            borderRadius: "20px",
            p: 3.5,
            backdropFilter: "blur(12px)",
            boxShadow: C.cardShadow,
            border: `1px solid ${C.border}`,
            mb: predictions.length > 0 ? 3 : 0,
          }}
        >
          <Box textAlign="center">
            <input type="file" id="upload-input" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
            <label htmlFor="upload-input">
              <Button
                variant="outlined"
                component="span"
                sx={{
                  borderRadius: "10px",
                  borderColor: C.accent,
                  color: C.accent,
                  textTransform: "none",
                  fontWeight: 600,
                  mb: 1.5,
                  "&:hover": { background: C.gradientSubtle },
                }}
              >
                📁 Upload Image
              </Button>
            </label>

            {preview && (
              <Box mt={2.5} mb={2}>
                <img
                  src={preview}
                  alt="preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: 460,
                    borderRadius: 12,
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    boxShadow: C.cardShadow,
                  }}
                />
              </Box>
            )}

            <Button
              variant="contained"
              onClick={handlePredict}
              disabled={loading || !file}
              sx={{
                mt: 1.5,
                px: 4,
                py: 1.2,
                fontSize: "0.95rem",
                borderRadius: "10px",
                background: C.gradient,
                textTransform: "none",
                fontWeight: 700,
                boxShadow: `0 0 20px ${C.accentGlow}`,
              }}
            >
              {loading ? "Analyzing…" : "🔍 Analyze Image"}
            </Button>

            {loading && <Box mt={2}><CircularProgress size={28} sx={{ color: C.accent }} /></Box>}
            {message && (
              <Box mt={2.5} display="flex" justifyContent="center">
                <Alert severity="warning" sx={{ borderRadius: "10px" }}>{message}</Alert>
              </Box>
            )}
          </Box>
        </Box>

        {/* Detection results + aircraft specs */}
        {predictions.length > 0 && (
          <Box>
            <Typography
              fontWeight={700}
              fontSize="1rem"
              sx={{ color: C.text, mb: 2, display: "flex", alignItems: "center", gap: 1 }}
            >
              <span>📊</span> Detection Results
              <Chip
                label={`${predictions.length} detected`}
                size="small"
                sx={{ background: C.gradientSubtle, color: C.accent, border: `1px solid ${C.border}`, fontWeight: 700, fontSize: "0.7rem", height: 22, ml: 1 }}
              />
            </Typography>

            {predictions.map((item, index) => (
              <Box
                key={index}
                sx={{
                  mb: 3,
                  borderRadius: "20px",
                  border: `1px solid ${C.border}`,
                  overflow: "hidden",
                  boxShadow: C.cardShadow,
                }}
              >
                {/* Detection header */}
                <Box
                  sx={{
                    background: C.surface,
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    borderBottom: `1px solid ${C.border}`,
                  }}
                >
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "8px",
                      background: C.gradient,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontWeight: 800,
                      fontSize: "0.8rem",
                      flexShrink: 0,
                    }}
                  >
                    #{index + 1}
                  </Box>
                  <Box flex={1}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
                      <Typography fontWeight={700} fontSize="0.9rem" sx={{ color: C.text }}>
                        {item.label}
                      </Typography>
                      <Typography fontWeight={700} fontSize="0.85rem" sx={{ color: C.accent }}>
                        {(item.confidence * 100).toFixed(1)}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={item.confidence * 100}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        background: C.gradientSubtle,
                        "& .MuiLinearProgress-bar": {
                          background: C.gradient,
                          borderRadius: 3,
                        },
                      }}
                    />
                  </Box>
                </Box>

                {/* Aircraft spec panel */}
                <Box sx={{ p: 2, background: C.bg }}>
                  <AircraftInfoPanel label={item.label} confidence={item.confidence} C={C} />
                </Box>
              </Box>
            ))}
          </Box>
        )}

        {/* Footer */}
        <Box textAlign="center" mt={5}>
          <Typography fontSize="0.78rem" sx={{ color: C.muted }}>
            YOLOv8 Object Detection · 20 Custom Aircraft Classes · Flask + React
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

// ─── App with Router + Theme state ──────────────────────────────
export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home darkMode={darkMode} onToggleTheme={toggleTheme} />} />
        <Route path="/detect" element={<DetectionPage darkMode={darkMode} onToggleTheme={toggleTheme} />} />
      </Routes>
    </BrowserRouter>
  );
}