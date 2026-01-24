import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { getSmoothBeatPulse } from "../utils/beatSync";

type GridOverlayProps = {
  color?: string;
  opacity?: number;
};

export const GridOverlay: React.FC<GridOverlayProps> = ({
  color = "#ff3c3c",
  opacity = 0.03,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const beatPulse = getSmoothBeatPulse(frame, fps);
  const dynamicOpacity = opacity + beatPulse * 0.02;

  // Animated grid offset
  const offset = (frame * 0.5) % 50;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity: dynamicOpacity,
      }}
    >
      {/* Horizontal lines */}
      <svg width={width} height={height} style={{ position: "absolute" }}>
        <defs>
          <pattern
            id="grid"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
            patternTransform={`translate(0, ${offset})`}
          >
            <line
              x1="0"
              y1="0"
              x2="50"
              y2="0"
              stroke={color}
              strokeWidth="1"
            />
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="50"
              stroke={color}
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
};
