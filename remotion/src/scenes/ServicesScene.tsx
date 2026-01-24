import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { ServiceCard } from "../components/ServiceCard";
import { GlowOrb } from "../components/GlowOrb";
import { GeometricShapes } from "../components/GeometricShapes";
import { Particles } from "../components/Particles";
import { beatToFrame } from "../utils/beatSync";

const { fontFamily: spaceGrotesk } = loadFont();
const { fontFamily: inter } = loadInter();

const services = [
  {
    icon: "🎬",
    title: "Video Production",
    description: "Content that captures who you are",
    color: "#ff3c3c",
  },
  {
    icon: "📱",
    title: "Social Media",
    description: "Consistency that builds presence",
    color: "#ff8c00",
  },
  {
    icon: "📈",
    title: "Ads Management",
    description: "Strategy that drives results",
    color: "#ffd700",
  },
];

export const ServicesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Header animation - appears on beat 2
  const headerDelay = beatToFrame(2, fps);
  const headerProgress = spring({
    frame: frame - headerDelay,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const headerOpacity = interpolate(frame, [headerDelay, headerDelay + fps * 0.3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headerY = interpolate(headerProgress, [0, 1], [60, 0]);

  // Subtitle appears on beat 6
  const subtitleDelay = beatToFrame(6, fps);
  const subtitleOpacity = interpolate(
    frame,
    [subtitleDelay, subtitleDelay + fps * 0.3],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill>
      {/* Particles */}
      <Particles count={20} color="#ff3c3c" />
      <Particles count={15} color="#ff8c00" />

      {/* Geometric shapes */}
      <GeometricShapes count={6} />

      {/* Background glow */}
      <GlowOrb
        color="#ff3c3c"
        size={900}
        x={width * 0.1}
        y={height * 0.5}
        delay={0}
      />
      <GlowOrb
        color="#ff8c00"
        size={700}
        x={width * 0.9}
        y={height * 0.3}
        delay={fps * 0.2}
      />
      <GlowOrb
        color="#ffd700"
        size={500}
        x={width * 0.5}
        y={height * 0.8}
        delay={fps * 0.4}
      />

      <AbsoluteFill
        style={{
          padding: "80px 120px",
          flexDirection: "column",
        }}
      >
        {/* Section header */}
        <div
          style={{
            opacity: headerOpacity,
            transform: `translateY(${headerY}px)`,
            marginBottom: 50,
          }}
        >
          <div
            style={{
              fontFamily: inter,
              fontSize: 20,
              fontWeight: 600,
              color: "#ff6b5b",
              textTransform: "uppercase",
              letterSpacing: 4,
              marginBottom: 24,
              display: "inline-block",
              padding: "12px 28px",
              background: "rgba(255,107,91,0.1)",
              borderRadius: 100,
              border: "1px solid rgba(255,107,91,0.3)",
            }}
          >
            What We Do
          </div>
          <h2
            style={{
              fontFamily: spaceGrotesk,
              fontSize: 90,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: -4,
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            A Partner, Not a Vendor
          </h2>
          <p
            style={{
              fontFamily: inter,
              fontSize: 28,
              color: "#666666",
              marginTop: 20,
              opacity: subtitleOpacity,
              maxWidth: 800,
            }}
          >
            We embed into your business and operate like an extension of your team
          </p>
        </div>

        {/* Services grid - each card appears on a beat */}
        <div
          style={{
            display: "flex",
            gap: 50,
            flex: 1,
            alignItems: "center",
          }}
        >
          {services.map((service, index) => (
            <Sequence
              key={service.title}
              from={beatToFrame(8 + index * 4, fps)} // Cards appear on beats 8, 12, 16
              layout="none"
            >
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
                color={service.color}
                index={index}
              />
            </Sequence>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
