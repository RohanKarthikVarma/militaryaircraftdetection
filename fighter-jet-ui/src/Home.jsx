import { useRef, useState, createContext, useContext } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Chip,
  Divider,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
} from "@mui/material";
import { motion, useInView } from "framer-motion";
import { aircraftSpecs, CATEGORY_COLORS, findSpecByLabel } from "./aircraftData";

// ─── Theme Context ────────────────────────────────────────────────
const ThemeCtx = createContext({});
const useC = () => useContext(ThemeCtx);

// ─── Palettes ─────────────────────────────────────────────────────
const DARK = {
  mode: "dark",
  bg: "#111827",
  bgAlt: "#1F2937",
  surface: "rgba(255,255,255,0.05)",
  surfaceStrong: "rgba(255,255,255,0.09)",
  border: "rgba(255,255,255,0.09)",
  accent: "#818CF8",
  accentGlow: "rgba(129,140,248,0.22)",
  accentAlt: "#F59E0B",
  text: "#F1F5F9",
  textSub: "#CBD5E1",
  muted: "#64748B",
  gradient: "linear-gradient(135deg,#6366F1,#A78BFA)",
  gradientSubtle: "linear-gradient(135deg,rgba(99,102,241,0.12),rgba(167,139,250,0.12))",
  navBg: "rgba(17,24,39,0.88)",
  cardShadow: "0 4px 24px rgba(0,0,0,0.4)",
  heroPattern: "rgba(99,102,241,0.05)",
};

const LIGHT = {
  mode: "light",
  bg: "#F8FAFC",
  bgAlt: "#EFF6FF",
  surface: "rgba(255,255,255,0.85)",
  surfaceStrong: "rgba(255,255,255,1)",
  border: "rgba(15,23,42,0.1)",
  accent: "#4F46E5",
  accentGlow: "rgba(79,70,229,0.2)",
  accentAlt: "#F59E0B",
  text: "#0F172A",
  textSub: "#1E293B",
  muted: "#64748B",
  gradient: "linear-gradient(135deg,#4F46E5,#7C3AED)",
  gradientSubtle: "linear-gradient(135deg,rgba(79,70,229,0.07),rgba(124,58,237,0.07))",
  navBg: "rgba(248,250,252,0.92)",
  cardShadow: "0 2px 16px rgba(15,23,42,0.08)",
  heroPattern: "rgba(79,70,229,0.04)",
};

// ─── Helpers ──────────────────────────────────────────────────────
function FadeSection({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function GlassCard({ children, sx = {}, glow = false }) {
  const C = useC();
  return (
    <Box
      component={motion.div}
      whileHover={{
        y: -4,
        boxShadow: glow ? `0 8px 32px ${C.accentGlow}` : C.cardShadow,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      sx={{
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: "18px",
        backdropFilter: "blur(12px)",
        p: 3,
        height: "100%",
        boxSizing: "border-box",
        boxShadow: C.cardShadow,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

function SectionTitle({ label, title, subtitle }) {
  const C = useC();
  return (
    <Box textAlign="center" mb={6}>
      <Chip
        label={label}
        size="small"
        sx={{
          background: C.gradientSubtle,
          border: `1px solid ${C.border}`,
          color: C.accent,
          fontWeight: 700,
          letterSpacing: "0.1em",
          mb: 2,
          fontSize: "0.7rem",
        }}
      />
      <Typography
        variant="h3"
        fontWeight={800}
        sx={{ color: C.text, lineHeight: 1.15, mb: 1.5, fontSize: { xs: "1.9rem", md: "2.6rem" } }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body1" sx={{ color: C.muted, maxWidth: 520, mx: "auto", lineHeight: 1.7 }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}

// ─── Aircraft DB sub-components ───────────────────────────────────
function SpecRow({ label, value }) {
  const C = useC();
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      py={0.65}
      sx={{ borderBottom: `1px solid ${C.border}` }}
    >
      <Typography
        fontSize="0.7rem"
        sx={{ color: C.muted, textTransform: "uppercase", letterSpacing: "0.07em" }}
      >
        {label}
      </Typography>
      <Typography fontSize="0.82rem" fontWeight={600} sx={{ color: C.text }}>
        {value}
      </Typography>
    </Box>
  );
}

function AircraftCard({ ac }) {
  const C = useC();
  const cat = CATEGORY_COLORS[ac.category] || CATEGORY_COLORS.Fighter;
  const isRetired = ac.status === "Retired";
  return (
    <Box
      component={motion.div}
      whileHover={{ y: -5, boxShadow: `0 16px 40px ${C.accentGlow}` }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      sx={{
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: "18px",
        backdropFilter: "blur(12px)",
        overflow: "hidden",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: C.cardShadow,
      }}
    >
      <Box sx={{ p: 2.5, pb: 1.5 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1.5}>
          <Box>
            <Typography fontWeight={800} fontSize="1rem" sx={{ color: C.text, lineHeight: 1.2 }}>
              {ac.name}
            </Typography>
            <Typography fontSize="0.75rem" sx={{ color: C.muted, mt: 0.3 }}>{ac.role}</Typography>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="flex-end" gap={0.5} sx={{ ml: 1, flexShrink: 0 }}>
            <Chip
              label={ac.category}
              size="small"
              sx={{
                background: cat.bg,
                border: `1px solid ${cat.border}`,
                color: cat.text,
                fontWeight: 700,
                fontSize: "0.65rem",
                height: 20,
              }}
            />
            {isRetired && (
              <Chip
                label="Retired"
                size="small"
                sx={{
                  background: "rgba(100,116,139,0.12)",
                  border: "1px solid rgba(100,116,139,0.3)",
                  color: C.muted,
                  fontWeight: 600,
                  fontSize: "0.6rem",
                  height: 18,
                }}
              />
            )}
          </Box>
        </Box>

        {/* Mach hero */}
        <Box
          sx={{
            background: C.gradientSubtle,
            border: `1px solid ${C.border}`,
            borderRadius: "12px",
            p: 1.5,
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            mb: 1.5,
          }}
        >
          <Box>
            <Typography fontSize="0.6rem" sx={{ color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Top Speed
            </Typography>
            <Typography
              fontWeight={900}
              fontSize="1.4rem"
              sx={{ background: C.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1 }}
            >
              Mach {ac.mach}
            </Typography>
            <Typography fontSize="0.7rem" sx={{ color: C.muted }}>{ac.speed}</Typography>
          </Box>
          <Box sx={{ ml: "auto", textAlign: "right" }}>
            <Typography fontSize="0.6rem" sx={{ color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>Crew</Typography>
            <Typography fontWeight={800} fontSize="1.1rem" sx={{ color: C.text }}>{ac.crew}</Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ px: 2.5, pb: 2.5, flex: 1 }}>
        <SpecRow label="Range" value={ac.range} />
        <SpecRow label="Service Ceiling" value={ac.ceiling} />
        <SpecRow label="MTOW" value={ac.weight} />
        <SpecRow label="Length" value={ac.length} />
        <SpecRow label="Wingspan" value={ac.wingspan} />
        <Box pt={1.2}>
          <Typography fontSize="0.6rem" sx={{ color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em", mb: 0.4 }}>
            Powerplant
          </Typography>
          <Typography fontSize="0.75rem" sx={{ color: C.text, lineHeight: 1.5 }}>{ac.engines}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

function AircraftDatabase() {
  const C = useC();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...Object.keys(CATEGORY_COLORS)];

  const filtered = aircraftSpecs.filter((ac) => {
    const matchCat = activeCategory === "All" || ac.category === activeCategory;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      ac.name.toLowerCase().includes(q) ||
      ac.code.toLowerCase().includes(q) ||
      ac.role.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  return (
    <Box id="aircraft-db" sx={{ py: { xs: 8, md: 12 }, background: C.bgAlt }}>
      <Container maxWidth="xl">
        <FadeSection>
          <SectionTitle
            label="AIRCRAFT DATABASE"
            title="20-Class Specification Library"
            subtitle="Full technical specifications for every aircraft our model can detect and classify."
          />
        </FadeSection>

        <FadeSection delay={0.1}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 2,
              mb: 4,
              alignItems: { md: "center" },
            }}
          >
            <TextField
              placeholder="Search aircraft…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              size="small"
              sx={{
                width: { xs: "100%", md: 260 },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  background: C.surfaceStrong,
                  color: C.text,
                  fontSize: "0.875rem",
                  "& fieldset": { borderColor: C.border },
                  "&:hover fieldset": { borderColor: C.accent },
                  "&.Mui-focused fieldset": { borderColor: C.accent },
                },
                "& input": { color: C.text },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography sx={{ color: C.muted, fontSize: "0.95rem", mr: 0.5 }}>🔍</Typography>
                  </InputAdornment>
                ),
              }}
            />
            <Box display="flex" flexWrap="wrap" gap={0.8}>
              {categories.map((cat) => {
                const active = activeCategory === cat;
                const col = CATEGORY_COLORS[cat];
                return (
                  <Chip
                    key={cat}
                    label={cat}
                    onClick={() => setActiveCategory(cat)}
                    size="small"
                    sx={{
                      cursor: "pointer",
                      fontWeight: 600,
                      fontSize: "0.73rem",
                      transition: "all 0.15s",
                      background: active ? (col ? col.bg : C.gradientSubtle) : C.surface,
                      border: `1px solid ${active ? (col ? col.border : C.accent) : C.border}`,
                      color: active ? (col ? col.text : C.accent) : C.muted,
                      "&:hover": {
                        background: col ? col.bg : C.gradientSubtle,
                        color: col ? col.text : C.accent,
                      },
                    }}
                  />
                );
              })}
            </Box>
            <Typography sx={{ color: C.muted, fontSize: "0.8rem", ml: "auto" }}>
              {filtered.length} / {aircraftSpecs.length} aircraft
            </Typography>
          </Box>
        </FadeSection>

        <Grid container spacing={2.5}>
          {filtered.map((ac, i) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={ac.id}>
              <FadeSection delay={Math.min(i * 0.03, 0.35)}>
                <AircraftCard ac={ac} />
              </FadeSection>
            </Grid>
          ))}
        </Grid>

        {filtered.length === 0 && (
          <Box textAlign="center" py={8}>
            <Typography fontSize="2.5rem" mb={1}>✈️</Typography>
            <Typography sx={{ color: C.muted }}>No aircraft matched your search.</Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}

// ─── Section data ─────────────────────────────────────────────────
const objectives = [
  { icon: "🎯", title: "Accurate Detection", desc: "Detect and localize airborne objects in complex sky backgrounds with high precision using YOLOv8 bounding boxes." },
  { icon: "✈️", title: "Aircraft Classification", desc: "Classify detected aircraft into 20 military and civilian categories using a fine-tuned CNN model." },
  { icon: "⚡", title: "Real-Time Performance", desc: "Achieve fast inference speeds suitable for real-time monitoring and surveillance scenarios." },
  { icon: "🔄", title: "Robust Pipeline", desc: "Build an end-to-end pipeline from image upload through detection, preprocessing to final CNN classification." },
  { icon: "🌐", title: "Accessible Interface", desc: "Deliver results via a clean browser-based React UI connected to a Flask REST API backend." },
];

const pipelineSteps = [
  { step: "01", icon: "📤", title: "Upload Image", desc: "User uploads an aircraft image via the React frontend." },
  { step: "02", icon: "🔍", title: "YOLOv8 Detection", desc: "YOLOv8 scans the image and draws bounding boxes around aircraft." },
  { step: "03", icon: "⚙️", title: "Preprocessing", desc: "Detected regions are cropped, resized, and normalized for CNN." },
  { step: "04", icon: "🧠", title: "CNN Classification", desc: "Fine-tuned CNN classifies the aircraft type with confidence scores." },
  { step: "05", icon: "📊", title: "Result Display", desc: "Labels, bounding boxes, specs, and confidence scores are rendered." },
];

const technologies = [
  { name: "Python", icon: "🐍", role: "Core Language" },
  { name: "YOLOv8", icon: "🎯", role: "Object Detection" },
  { name: "TensorFlow", icon: "🤖", role: "Deep Learning" },
  { name: "Keras", icon: "🧠", role: "CNN Model" },
  { name: "OpenCV", icon: "📷", role: "Image Processing" },
  { name: "Flask", icon: "🔌", role: "REST API" },
  { name: "React", icon: "⚛️", role: "Frontend UI" },
  { name: "Vite", icon: "⚡", role: "Build Tool" },
  { name: "NumPy", icon: "🔢", role: "Numerical Computing" },
];

const features = [
  { icon: "⚡", label: "Real-Time Detection", desc: "Sub-second inference pipeline for rapid aircraft identification" },
  { icon: "🎯", label: "High Accuracy", desc: "95%+ classification accuracy across 20 aircraft categories" },
  { icon: "🌫️", label: "Complex Backgrounds", desc: "Performs reliably against clouds, haze, and sky noise" },
  { icon: "📱", label: "Responsive UI", desc: "Clean browser interface accessible on any screen size" },
  { icon: "📦", label: "Multi-Detection", desc: "Simultaneously identifies and classifies multiple aircraft" },
  { icon: "📖", label: "Spec Database", desc: "Full technical data for every detected class — Mach, range, engines" },
];

const results = [
  { metric: "95.4%", label: "Classification Accuracy", sub: "On 20-class dataset" },
  { metric: "0.89", label: "mAP Score", sub: "YOLOv8 detection" },
  { metric: "20+", label: "Aircraft Classes", sub: "Military & civilian" },
  { metric: "<1s", label: "Inference Time", sub: "Per image on CPU" },
];

// ─── Main Home ────────────────────────────────────────────────────
export default function Home({ darkMode, onToggleTheme }) {
  const C = darkMode ? DARK : LIGHT;

  return (
    <ThemeCtx.Provider value={C}>
      <Box
        sx={{
          minHeight: "100vh",
          background: C.bg,
          color: C.text,
          fontFamily: "'Inter', sans-serif",
          overflowX: "hidden",
          transition: "background 0.3s, color 0.3s",
        }}
      >
        {/* ── NAV ─────────────────────────────────────────────── */}
        <Box
          component={motion.nav}
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.55 }}
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

              {/* Nav links */}
              <Box display="flex" gap={3} sx={{ display: { xs: "none", md: "flex" } }}>
                {/* Home link */}
                <Typography
                  component="a"
                  href="/"
                  sx={{
                    color: C.accent,
                    textDecoration: "none",
                    fontSize: "0.83rem",
                    fontWeight: 700,
                    transition: "color 0.2s",
                    "&:hover": { color: C.accent },
                  }}
                >
                  Home
                </Typography>
                {["About", "Objectives", "How It Works", "Technologies", "Results", "Aircraft DB"].map((item) => (
                  <Typography
                    key={item}
                    component="a"
                    href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                    sx={{
                      color: C.muted,
                      textDecoration: "none",
                      fontSize: "0.83rem",
                      fontWeight: 500,
                      transition: "color 0.2s",
                      "&:hover": { color: C.accent },
                    }}
                  >
                    {item}
                  </Typography>
                ))}
              </Box>

              {/* Right controls */}
              <Box display="flex" alignItems="center" gap={1}>
                {/* Theme toggle */}
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
                      transition: "all 0.2s",
                      "&:hover": { color: C.accent, borderColor: C.accent, background: C.gradientSubtle },
                    }}
                  >
                    <Typography fontSize="1rem">{darkMode ? "☀️" : "🌙"}</Typography>
                  </IconButton>
                </Tooltip>
                <Button
                  variant="contained"
                  href="/detect"
                  size="small"
                  sx={{
                    background: C.gradient,
                    borderRadius: "9px",
                    textTransform: "none",
                    fontWeight: 700,
                    px: 2.5,
                    fontSize: "0.82rem",
                    boxShadow: `0 0 16px ${C.accentGlow}`,
                  }}
                >
                  Try Detection
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>

        {/* ── HERO ─────────────────────────────────────────────── */}
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            position: "relative",
            pt: 10,
            overflow: "hidden",
          }}
        >
          {/* Subtle dot grid */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              backgroundImage: `radial-gradient(${C.heroPattern} 1.5px, transparent 1.5px)`,
              backgroundSize: "28px 28px",
              maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 100%)",
            }}
          />
          {/* Top gradient wash */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "65%",
              background:
                C.mode === "dark"
                  ? "linear-gradient(180deg, rgba(99,102,241,0.07) 0%, transparent 100%)"
                  : "linear-gradient(180deg, rgba(79,70,229,0.04) 0%, transparent 100%)",
              pointerEvents: "none",
            }}
          />

          <Container maxWidth="lg" sx={{ position: "relative", textAlign: "center" }}>


            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
              <Typography
                variant="h1"
                fontWeight={900}
                sx={{
                  fontSize: { xs: "2.4rem", md: "3.8rem", lg: "4.5rem" },
                  lineHeight: 1.1,
                  background: C.gradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 2,
                  letterSpacing: "-0.02em",
                }}
              >
                Airborne Object
                <br />
                Detection
              </Typography>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <Typography
                variant="h5"
                sx={{
                  color: C.muted,
                  mb: 1.5,
                  fontWeight: 400,
                  fontSize: { xs: "1rem", md: "1.2rem" },
                }}
              >
                Aircraft detection and classification using{" "}
                <span style={{ color: C.accent, fontWeight: 700 }}>YOLOv8</span> and{" "}
                <span style={{ color: C.accentAlt, fontWeight: 700 }}>CNN</span>
              </Typography>
              <Typography variant="body1" sx={{ color: C.muted, mb: 4, fontSize: "0.95rem" }}>
                Deep learning pipeline for real-time airborne object recognition · 20 aircraft classes
              </Typography>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.32 }}>
              <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
                <Button
                  variant="contained"
                  size="large"
                  href="/detect"
                  sx={{
                    background: C.gradient,
                    borderRadius: "12px",
                    px: 4,
                    py: 1.4,
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    textTransform: "none",
                    boxShadow: `0 0 24px ${C.accentGlow}`,
                    "&:hover": { transform: "scale(1.02)" },
                    transition: "all 0.18s",
                  }}
                >
                  🚀 Try Detection
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  href="#about"
                  sx={{
                    borderColor: C.border,
                    color: C.textSub,
                    borderRadius: "12px",
                    px: 4,
                    py: 1.4,
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    textTransform: "none",
                    "&:hover": { borderColor: C.accent, color: C.accent, background: C.gradientSubtle },
                    transition: "all 0.18s",
                  }}
                >
                  View Details
                </Button>
              </Box>
            </motion.div>

            {/* Stats row */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55, duration: 0.7 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: { xs: 4, md: 8 },
                  mt: { xs: 6, md: 9 },
                  flexWrap: "wrap",
                }}
              >
                {[["95.4%", "Accuracy"], ["20", "Classes"], ["YOLOv8", "Detector"], ["CNN", "Classifier"]].map(([val, lab]) => (
                  <Box key={lab} textAlign="center">
                    <Typography fontWeight={900} fontSize="1.5rem" sx={{ color: C.text }}>{val}</Typography>
                    <Typography fontSize="0.72rem" sx={{ color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", mt: 0.3 }}>{lab}</Typography>
                  </Box>
                ))}
              </Box>
            </motion.div>
          </Container>
        </Box>

        {/* ── ABOUT ─────────────────────────────────────────────── */}
        <Box id="about" sx={{ py: { xs: 8, md: 12 } }}>
          <Container maxWidth="lg">
            <FadeSection>
              <SectionTitle label="ABOUT THE PROJECT" title="How It Works" subtitle="An end-to-end deep learning pipeline that detects and classifies aircraft in real time." />
            </FadeSection>
            <Grid container spacing={3}>
              {[
                { icon: "🔍", title: "Detection via YOLOv8", desc: "YOLO v8 performs single-pass detection across the entire image, drawing precise bounding boxes around all detected aircraft with class probabilities in under a second." },
                { icon: "🧠", title: "Classification via CNN", desc: "A Convolutional Neural Network fine-tuned on 20 aircraft categories performs fine-grained classification of each YOLO crop — outputting label and confidence score." },
                { icon: "⚙️", title: "Full-Stack Architecture", desc: "React frontend sends the image to a Flask REST API which runs the detection → preprocessing → classification pipeline and returns annotated results with specs." },
              ].map((card, i) => (
                <Grid item xs={12} md={4} key={i}>
                  <FadeSection delay={i * 0.1}>
                    <GlassCard glow>
                      <Typography fontSize="2rem" mb={1.5}>{card.icon}</Typography>
                      <Typography fontWeight={700} fontSize="1.05rem" mb={1} sx={{ color: C.text }}>{card.title}</Typography>
                      <Typography fontSize="0.88rem" sx={{ color: C.muted, lineHeight: 1.7 }}>{card.desc}</Typography>
                    </GlassCard>
                  </FadeSection>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* ── OBJECTIVES ────────────────────────────────────────── */}
        <Box id="objectives" sx={{ py: { xs: 8, md: 12 }, background: C.bgAlt }}>
          <Container maxWidth="lg">
            <FadeSection>
              <SectionTitle label="OBJECTIVES" title="Project Goals" subtitle="Five clear engineering and research targets that drive this system." />
            </FadeSection>
            <Grid container spacing={2.5}>
              {objectives.map((obj, i) => (
                <Grid item xs={12} sm={6} md={4} key={i}>
                  <FadeSection delay={i * 0.07}>
                    <GlassCard>
                      <Box
                        sx={{
                          width: 42,
                          height: 42,
                          borderRadius: "11px",
                          background: C.gradientSubtle,
                          border: `1px solid ${C.border}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "1.3rem",
                          mb: 2,
                        }}
                      >
                        {obj.icon}
                      </Box>
                      <Typography fontWeight={700} mb={0.7} sx={{ color: C.text, fontSize: "0.95rem" }}>{obj.title}</Typography>
                      <Typography fontSize="0.85rem" sx={{ color: C.muted, lineHeight: 1.65 }}>{obj.desc}</Typography>
                    </GlassCard>
                  </FadeSection>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* ── HOW IT WORKS ──────────────────────────────────────── */}
        <Box id="how-it-works" sx={{ py: { xs: 8, md: 12 } }}>
          <Container maxWidth="lg">
            <FadeSection>
              <SectionTitle label="PIPELINE" title="How It Works" subtitle="Five stages transform a raw image into a classified, spec-enriched result." />
            </FadeSection>
            <Box sx={{ position: "relative" }}>
              <Box sx={{ display: { xs: "none", md: "block" }, position: "absolute", top: 36, left: "10%", width: "80%", height: 2, background: C.gradient, opacity: 0.2, zIndex: 0 }} />
              <Grid container spacing={2} sx={{ position: "relative", zIndex: 1 }}>
                {pipelineSteps.map((step, i) => (
                  <Grid item xs={12} sm={6} md={12 / 5} key={i}>
                    <FadeSection delay={i * 0.1}>
                      <Box textAlign="center">
                        <Box
                          component={motion.div}
                          whileHover={{ scale: 1.07 }}
                          sx={{
                            width: 68,
                            height: 68,
                            borderRadius: "18px",
                            background: C.gradientSubtle,
                            border: `1px solid ${C.border}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "1.7rem",
                            mx: "auto",
                            mb: 2,
                            position: "relative",
                            boxShadow: C.cardShadow,
                          }}
                        >
                          {step.icon}
                          <Box
                            sx={{
                              position: "absolute",
                              top: -8,
                              right: -8,
                              width: 20,
                              height: 20,
                              borderRadius: "50%",
                              background: C.gradient,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "0.58rem",
                              fontWeight: 900,
                              color: "#fff",
                            }}
                          >
                            {step.step}
                          </Box>
                        </Box>
                        <Typography fontWeight={700} fontSize="0.88rem" mb={0.5} sx={{ color: C.text }}>{step.title}</Typography>
                        <Typography fontSize="0.76rem" sx={{ color: C.muted, lineHeight: 1.55 }}>{step.desc}</Typography>
                      </Box>
                    </FadeSection>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Container>
        </Box>

        {/* ── TECHNOLOGIES ──────────────────────────────────────── */}
        <Box id="technologies" sx={{ py: { xs: 8, md: 12 }, background: C.bgAlt }}>
          <Container maxWidth="lg">
            <FadeSection>
              <SectionTitle label="TECH STACK" title="Technologies Used" subtitle="Cutting-edge tools powering every layer of the system." />
            </FadeSection>
            <Grid container spacing={2} justifyContent="center">
              {technologies.map((tech, i) => (
                <Grid item xs={6} sm={4} md={3} lg={4} key={i}>
                  <FadeSection delay={i * 0.06}>
                    <GlassCard sx={{ textAlign: "center", p: 2.5 }} glow>
                      <Typography fontSize="1.9rem" mb={1}>{tech.icon}</Typography>
                      <Typography fontWeight={700} fontSize="0.92rem" sx={{ color: C.text }}>{tech.name}</Typography>
                      <Typography fontSize="0.73rem" sx={{ color: C.muted }}>{tech.role}</Typography>
                    </GlassCard>
                  </FadeSection>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* ── FEATURES ──────────────────────────────────────────── */}
        <Box sx={{ py: { xs: 8, md: 12 } }}>
          <Container maxWidth="lg">
            <FadeSection>
              <SectionTitle label="KEY FEATURES" title="What Sets It Apart" subtitle="Engineered for precision, speed, and complete transparency." />
            </FadeSection>
            <Grid container spacing={2.5}>
              {features.map((feat, i) => (
                <Grid item xs={12} sm={6} md={4} key={i}>
                  <FadeSection delay={i * 0.07}>
                    <GlassCard glow>
                      <Box display="flex" alignItems="flex-start" gap={2}>
                        <Box
                          sx={{
                            width: 42,
                            height: 42,
                            borderRadius: "11px",
                            background: C.gradientSubtle,
                            border: `1px solid ${C.border}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "1.2rem",
                            flexShrink: 0,
                          }}
                        >
                          {feat.icon}
                        </Box>
                        <Box>
                          <Typography fontWeight={700} fontSize="0.92rem" mb={0.4} sx={{ color: C.text }}>{feat.label}</Typography>
                          <Typography fontSize="0.83rem" sx={{ color: C.muted, lineHeight: 1.6 }}>{feat.desc}</Typography>
                        </Box>
                      </Box>
                    </GlassCard>
                  </FadeSection>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* ── RESULTS ───────────────────────────────────────────── */}
        <Box id="results" sx={{ py: { xs: 8, md: 12 }, background: C.bgAlt }}>
          <Container maxWidth="lg">
            <FadeSection>
              <SectionTitle label="RESULTS" title="Performance Highlights" subtitle="Validated metrics from model evaluation on the test dataset." />
            </FadeSection>
            <Grid container spacing={3} justifyContent="center">
              {results.map((r, i) => (
                <Grid item xs={6} md={3} key={i}>
                  <FadeSection delay={i * 0.09}>
                    <Box
                      component={motion.div}
                      whileHover={{ y: -5 }}
                      sx={{
                        textAlign: "center",
                        p: { xs: 3, md: 4 },
                        borderRadius: "20px",
                        background: C.surface,
                        border: `1px solid ${C.border}`,
                        boxShadow: C.cardShadow,
                      }}
                    >
                      <Typography
                        fontWeight={900}
                        sx={{
                          fontSize: { xs: "1.9rem", md: "2.6rem" },
                          background: C.gradient,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          lineHeight: 1,
                          mb: 0.8,
                        }}
                      >
                        {r.metric}
                      </Typography>
                      <Typography fontWeight={600} fontSize="0.9rem" sx={{ color: C.text, mb: 0.4 }}>{r.label}</Typography>
                      <Typography fontSize="0.75rem" sx={{ color: C.muted }}>{r.sub}</Typography>
                    </Box>
                  </FadeSection>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* ── AIRCRAFT DATABASE ─────────────────────────────────── */}
        <AircraftDatabase />

        {/* ── CTA BANNER ────────────────────────────────────────── */}
        <Box sx={{ py: { xs: 8, md: 10 } }}>
          <Container maxWidth="md">
            <FadeSection>
              <Box
                sx={{
                  textAlign: "center",
                  p: { xs: 4, md: 7 },
                  borderRadius: "24px",
                  background: C.gradientSubtle,
                  border: `1px solid ${C.border}`,
                  boxShadow: C.cardShadow,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Typography fontWeight={800} fontSize={{ xs: "1.5rem", md: "2rem" }} sx={{ color: C.text, mb: 1.5 }}>
                  Ready to see it in action?
                </Typography>
                <Typography sx={{ color: C.muted, mb: 3, fontSize: "0.95rem" }}>
                  Upload an aircraft image — our AI will detect, classify, and display full technical specifications.
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  href="/detect"
                  sx={{
                    background: C.gradient,
                    borderRadius: "12px",
                    px: 5,
                    py: 1.4,
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    textTransform: "none",
                    boxShadow: `0 0 24px ${C.accentGlow}`,
                  }}
                >
                  🚀 Launch Detection
                </Button>
              </Box>
            </FadeSection>
          </Container>
        </Box>

        {/* ── FOOTER ────────────────────────────────────────────── */}
        <Box
          component="footer"
          sx={{ borderTop: `1px solid ${C.border}`, py: 4, textAlign: "center", background: C.bgAlt }}
        >
          <Container maxWidth="lg">

            <Divider sx={{ borderColor: C.border, mb: 2 }} />
            <Typography fontSize="0.82rem" sx={{ color: C.muted, mb: 0.4 }}>
              Department of Computer Engineering
            </Typography>
            <Typography fontSize="0.76rem" sx={{ color: C.muted }}>
              React · Material UI · YOLOv8 · TensorFlow/Keras · Flask · OpenCV
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeCtx.Provider>
  );
}
