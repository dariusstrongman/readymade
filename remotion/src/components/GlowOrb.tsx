import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";

type GlowOrbProps = {
  color: string;
  size: number;
  x: number;
  y: number;
  delay?: number;
};

export const GlowOrb: React.FC<GlowOrbProps> = ({
  color,
  size,
  x,
  y,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade in
  const opacity = interpolate(
    frame,
    [delay, delay + fps * 0.8],
    [0, 0.15],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Gentle floating animation
  const floatOffset = Math.sin((frame + delay) * 0.02) * 20;
  const scaleBreath = 1 + Math.sin((frame + delay) * 0.015) * 0.1;

  return (
    <div
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2 + floatOffset,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity,
        transform: `scale(${scaleBreath})`,
        filter: "blur(60px)",
        pointerEvents: "none",
      }}
    />
  );
};
