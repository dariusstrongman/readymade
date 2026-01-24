import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

const { fontFamily: spaceGrotesk } = loadFont();
const { fontFamily: inter } = loadInter();

type ServiceCardProps = {
  icon: string;
  title: string;
  description: string;
  color: string;
  index: number;
};

export const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  color,
  index,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Card entrance animation
  const entrance = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const opacity = interpolate(frame, [0, fps * 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(entrance, [0, 1], [80, 0]);
  const scale = interpolate(entrance, [0, 1], [0.8, 1]);

  // Icon bounce
  const iconBounce = spring({
    frame: frame - fps * 0.2,
    fps,
    config: { damping: 8, stiffness: 150 },
  });

  const iconScale = interpolate(iconBounce, [0, 1], [0, 1]);

  // Subtle hover-like effect based on frame
  const glowPulse = 0.3 + Math.sin(frame * 0.05 + index) * 0.1;

  return (
    <div
      style={{
        flex: 1,
        background: "linear-gradient(135deg, rgba(26,26,26,0.9) 0%, rgba(22,22,22,0.9) 100%)",
        borderRadius: 30,
        padding: 50,
        border: "1px solid rgba(255,255,255,0.05)",
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top gradient line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, ${color}, ${color}88)`,
        }}
      />

      {/* Glow effect */}
      <div
        style={{
          position: "absolute",
          top: -100,
          left: "50%",
          transform: "translateX(-50%)",
          width: 300,
          height: 200,
          background: `radial-gradient(ellipse, ${color}${Math.floor(glowPulse * 255).toString(16).padStart(2, "0")} 0%, transparent 70%)`,
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      {/* Icon */}
      <div
        style={{
          fontSize: 72,
          marginBottom: 30,
          transform: `scale(${iconScale})`,
        }}
      >
        {icon}
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: spaceGrotesk,
          fontSize: 36,
          fontWeight: 700,
          color: "#ffffff",
          margin: 0,
          marginBottom: 16,
          letterSpacing: -1,
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: inter,
          fontSize: 22,
          color: "#888888",
          margin: 0,
          lineHeight: 1.5,
        }}
      >
        {description}
      </p>

      {/* Decorative circle */}
      <div
        style={{
          position: "absolute",
          bottom: -40,
          right: -40,
          width: 150,
          height: 150,
          borderRadius: "50%",
          border: `2px solid ${color}22`,
        }}
      />
    </div>
  );
};
