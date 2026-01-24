import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/SpaceGrotesk";
import { GlowOrb } from "../components/GlowOrb";
import { Logo } from "../components/Logo";
import { Particles } from "../components/Particles";
import { GeometricShapes } from "../components/GeometricShapes";
import { beatToFrame } from "../utils/beatSync";

const { fontFamily: spaceGrotesk } = loadFont();

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Logo animation - appears on beat 0 with dramatic impact
  const logoDelay = beatToFrame(0, fps);
  const logoScale = spring({
    frame: frame - logoDelay,
    fps,
    config: { damping: 8, stiffness: 120, mass: 0.8 },
  });

  const logoOpacity = interpolate(frame, [logoDelay, logoDelay + fps * 0.2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Brand name animation - appears on beat 4 with punch
  const taglineDelay = beatToFrame(4, fps);
  const taglineProgress = spring({
    frame: frame - taglineDelay,
    fps,
    config: { damping: 10, stiffness: 150, mass: 0.6 },
  });

  const taglineOpacity = interpolate(
    frame,
    [taglineDelay, taglineDelay + fps * 0.2],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const taglineY = interpolate(taglineProgress, [0, 1], [80, 0]);
  const taglineScale = interpolate(taglineProgress, [0, 1], [0.7, 1]);

  // Subtitle animation - appears on beat 8
  const subtitleDelay = beatToFrame(8, fps);
  const subtitleOpacity = interpolate(
    frame,
    [subtitleDelay, subtitleDelay + fps * 0.3],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const subtitleY = interpolate(
    frame,
    [subtitleDelay, subtitleDelay + fps * 0.4],
    [50, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Location text - appears on beat 12
  const locationDelay = beatToFrame(12, fps);
  const locationOpacity = interpolate(
    frame,
    [locationDelay, locationDelay + fps * 0.3],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill>
      {/* Floating particles */}
      <Particles count={30} color="#ff3c3c" />
      <Particles count={20} color="#ff8c00" />
      <Particles count={10} color="#ffd700" />

      {/* Geometric shapes */}
      <GeometricShapes count={8} />

      {/* Animated background glow orbs */}
      <GlowOrb
        color="#ff3c3c"
        size={700}
        x={width * 0.2}
        y={height * 0.3}
        delay={0}
      />
      <GlowOrb
        color="#ff8c00"
        size={600}
        x={width * 0.8}
        y={height * 0.7}
        delay={fps * 0.3}
      />
      <GlowOrb
        color="#ffd700"
        size={500}
        x={width * 0.5}
        y={height * 0.5}
        delay={fps * 0.6}
      />
      <GlowOrb
        color="#ff6b5b"
        size={400}
        x={width * 0.15}
        y={height * 0.7}
        delay={fps * 0.9}
      />

      {/* Main content */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 40,
        }}
      >
        {/* Logo */}
        <div
          style={{
            transform: `scale(${logoScale})`,
            opacity: logoOpacity,
          }}
        >
          <Logo size={200} />
        </div>

        {/* Brand name */}
        <div
          style={{
            fontFamily: spaceGrotesk,
            fontSize: 140,
            fontWeight: 700,
            letterSpacing: -5,
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px) scale(${taglineScale})`,
          }}
        >
          <span style={{ color: "#ffffff" }}>Ready</span>
          <span
            style={{
              color: "#ff6b5b",
              textShadow: "0 0 30px rgba(255,107,91,0.7)",
            }}
          >Made</span>
          <span style={{ color: "#ffffff" }}>Video</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontFamily: spaceGrotesk,
            fontSize: 48,
            fontWeight: 500,
            color: "#888888",
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
            letterSpacing: 3,
          }}
        >
          Video-First Marketing Agency
        </div>

        {/* Location */}
        <div
          style={{
            fontFamily: spaceGrotesk,
            fontSize: 24,
            color: "#555555",
            opacity: locationOpacity,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          Frisco, Texas
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
