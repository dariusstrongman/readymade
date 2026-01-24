import { useCurrentFrame, useVideoConfig } from "remotion";
import { getBeatPulse, getSmoothBeatPulse } from "../utils/beatSync";

type BeatPulseProps = {
  children: React.ReactNode;
  intensity?: number;
  type?: "scale" | "glow" | "both";
};

export const BeatPulse: React.FC<BeatPulseProps> = ({
  children,
  intensity = 0.05,
  type = "scale",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pulse = getBeatPulse(frame, fps);
  const scale = 1 + pulse * intensity;
  const glowIntensity = pulse * 0.5;

  const style: React.CSSProperties = {};

  if (type === "scale" || type === "both") {
    style.transform = `scale(${scale})`;
  }

  if (type === "glow" || type === "both") {
    style.filter = `drop-shadow(0 0 ${20 + glowIntensity * 40}px rgba(255,60,60,${0.3 + glowIntensity}))`;
  }

  return <div style={style}>{children}</div>;
};
