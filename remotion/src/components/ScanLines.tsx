import { useCurrentFrame, useVideoConfig } from "remotion";
import { getSmoothBeatPulse } from "../utils/beatSync";

type ScanLinesProps = {
  opacity?: number;
  speed?: number;
};

export const ScanLines: React.FC<ScanLinesProps> = ({
  opacity = 0.04,
  speed = 2,
}) => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();

  const beatPulse = getSmoothBeatPulse(frame, fps);
  const dynamicOpacity = opacity + beatPulse * 0.02;

  // Moving scan line
  const scanLineY = (frame * speed) % height;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* Static scan lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, ${dynamicOpacity}) 2px,
            rgba(0, 0, 0, ${dynamicOpacity}) 4px
          )`,
        }}
      />

      {/* Moving highlight scan line */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: scanLineY,
          height: 100,
          background: `linear-gradient(
            180deg,
            transparent 0%,
            rgba(255, 60, 60, 0.05) 50%,
            transparent 100%
          )`,
        }}
      />
    </div>
  );
};
