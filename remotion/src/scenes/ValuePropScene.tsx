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
import { GeometricShapes } from "../components/GeometricShapes";
import { Particles } from "../components/Particles";
import { beatToFrame } from "../utils/beatSync";

const { fontFamily: spaceGrotesk } = loadFont();
const { fontFamily: inter } = loadInter();

export const ValuePropScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Main text animation - appears on beat 2
  const mainTextDelay = beatToFrame(2, fps);
  const mainTextProgress = spring({
    frame: frame - mainTextDelay,
    fps,
    config: { damping: 10, stiffness: 100 },
  });

  const mainTextOpacity = interpolate(frame, [mainTextDelay, mainTextDelay + fps * 0.3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const mainTextY = interpolate(mainTextProgress, [0, 1], [80, 0]);
  const mainTextScale = interpolate(mainTextProgress, [0, 1], [0.8, 1]);

  // Subtitle animation - appears on beat 6
  const subtitleDelay = beatToFrame(6, fps);
  const subtitleOpacity = interpolate(
    frame,
    [subtitleDelay, subtitleDelay + fps * 0.4],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const subtitleY = interpolate(
    frame,
    [subtitleDelay, subtitleDelay + fps * 0.5],
    [40, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Additional text - appears on beat 10
  const additionalDelay = beatToFrame(10, fps);
  const additionalOpacity = interpolate(
    frame,
    [additionalDelay, additionalDelay + fps * 0.4],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill>
      {/* Particles */}
      <Particles count={30} color="#ff3c3c" />
      <Particles count={20} color="#ff8c00" />
      <Particles count={15} color="#ffd700" />

      {/* Geometric shapes */}
      <GeometricShapes count={8} />

      {/* Background effects */}
      <GlowOrb
        color="#ff3c3c"
        size={1000}
        x={width * 0.5}
        y={height * 0.4}
        delay={0}
      />
      <GlowOrb
        color="#ff8c00"
        size={800}
        x={width * 0.2}
        y={height * 0.6}
        delay={fps * 0.2}
      />
      <GlowOrb
        color="#ffd700"
        size={600}
        x={width * 0.8}
        y={height * 0.5}
        delay={fps * 0.4}
      />
      <GlowOrb
        color="#ff6b5b"
        size={500}
        x={width * 0.5}
        y={height * 0.8}
        delay={fps * 0.6}
      />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 40,
        }}
      >
        {/* Main headline */}
        <div
          style={{
            opacity: mainTextOpacity,
            transform: `translateY(${mainTextY}px) scale(${mainTextScale})`,
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontFamily: spaceGrotesk,
              fontSize: 160,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: -7,
              lineHeight: 1,
              margin: 0,
            }}
          >
            Marketing That{" "}
            <span
              style={{
                color: "#ff6b5b",
                display: "inline-block",
                textShadow: "0 0 40px rgba(255,107,91,0.6)",
              }}
            >
              Moves
            </span>{" "}People
          </h1>
        </div>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: inter,
            fontSize: 36,
            color: "#888888",
            maxWidth: 900,
            textAlign: "center",
            lineHeight: 1.6,
            margin: 0,
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
          }}
        >
          No templates. No guesswork. Just intentional systems that grow your business.
        </p>

        {/* Additional value props */}
        <div
          style={{
            display: "flex",
            gap: 60,
            marginTop: 20,
            opacity: additionalOpacity,
          }}
        >
          {["Authentic", "Strategic", "Results-Driven"].map((word) => (
            <div
              key={word}
              style={{
                fontFamily: spaceGrotesk,
                fontSize: 28,
                fontWeight: 600,
                color: "#666666",
                letterSpacing: 3,
                textTransform: "uppercase",
                padding: "12px 24px",
                border: "1px solid rgba(255,107,91,0.3)",
                borderRadius: 50,
              }}
            >
              {word}
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
