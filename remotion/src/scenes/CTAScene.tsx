import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { GlowOrb } from "../components/GlowOrb";
import { Logo } from "../components/Logo";
import { Particles } from "../components/Particles";
import { GeometricShapes } from "../components/GeometricShapes";
import { beatToFrame } from "../utils/beatSync";

const { fontFamily: spaceGrotesk } = loadFont();
const { fontFamily: inter } = loadInter();

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Logo animation - appears on beat 0
  const logoDelay = beatToFrame(0, fps);
  const logoProgress = spring({
    frame: frame - logoDelay,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  const logoScale = interpolate(logoProgress, [0, 1], [0.5, 1]);
  const logoOpacity = interpolate(frame, [logoDelay, logoDelay + fps * 0.2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // CTA button animation - appears on beat 4
  const ctaDelay = beatToFrame(4, fps);
  const ctaProgress = spring({
    frame: frame - ctaDelay,
    fps,
    config: { damping: 10, stiffness: 100 },
  });

  const ctaScale = interpolate(ctaProgress, [0, 1], [0.7, 1]);
  const ctaOpacity = interpolate(
    frame,
    [ctaDelay, ctaDelay + fps * 0.3],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Location text - appears on beat 8
  const locationDelay = beatToFrame(8, fps);
  const locationOpacity = interpolate(
    frame,
    [locationDelay, locationDelay + fps * 0.3],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Website - appears on beat 10
  const websiteDelay = beatToFrame(10, fps);
  const websiteOpacity = interpolate(
    frame,
    [websiteDelay, websiteDelay + fps * 0.3],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill>
      {/* Floating particles */}
      <Particles count={40} color="#ff3c3c" />
      <Particles count={30} color="#ff8c00" />
      <Particles count={20} color="#ffd700" />

      {/* Geometric shapes */}
      <GeometricShapes count={6} />

      {/* Intense center glow */}
      <GlowOrb
        color="#ff3c3c"
        size={1200}
        x={width * 0.5}
        y={height * 0.5}
        delay={0}
      />
      <GlowOrb
        color="#ff8c00"
        size={1000}
        x={width * 0.5}
        y={height * 0.5}
        delay={fps * 0.1}
      />
      <GlowOrb
        color="#ffd700"
        size={800}
        x={width * 0.5}
        y={height * 0.5}
        delay={fps * 0.2}
      />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 50,
        }}
      >
        {/* Logo */}
        <div
          style={{
            transform: `scale(${logoScale})`,
            opacity: logoOpacity,
          }}
        >
          <Logo size={140} />
        </div>

        {/* CTA Button */}
        <div
          style={{
            transform: `scale(${ctaScale})`,
            opacity: ctaOpacity,
            position: "relative",
          }}
        >
          {/* Button glow */}
          <div
            style={{
              position: "absolute",
              inset: -30,
              background: "radial-gradient(ellipse, rgba(255,107,91,0.5) 0%, transparent 70%)",
              filter: "blur(40px)",
              borderRadius: 100,
            }}
          />

          {/* Button */}
          <div
            style={{
              fontFamily: spaceGrotesk,
              fontSize: 36,
              fontWeight: 700,
              background: "linear-gradient(135deg, #ff6b5b 0%, #ff8c00 50%, #ffd700 100%)",
              color: "#050505",
              padding: "32px 70px",
              borderRadius: 100,
              letterSpacing: 2,
              textTransform: "uppercase",
              boxShadow: "0 10px 50px rgba(255,107,91,0.5), 0 0 100px rgba(255,140,0,0.3)",
              position: "relative",
            }}
          >
            Start a Conversation →
          </div>
        </div>

        {/* Location */}
        <div
          style={{
            fontFamily: inter,
            fontSize: 24,
            color: "#777777",
            opacity: locationOpacity,
            letterSpacing: 3,
          }}
        >
          📍 Frisco, Texas — Serving DFW & Beyond
        </div>

        {/* Website */}
        <div
          style={{
            fontFamily: spaceGrotesk,
            fontSize: 32,
            color: "#999999",
            opacity: websiteOpacity,
            fontWeight: 600,
            letterSpacing: 2,
          }}
        >
          readymadevideo.com
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
