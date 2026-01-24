import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";

type FlashTransitionProps = {
  startFrame: number;
  color?: string;
};

export const FlashTransition: React.FC<FlashTransitionProps> = ({
  startFrame,
  color = "#ffffff",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const flashDuration = fps * 0.2; // Quick punchy flash

  const opacity = interpolate(
    frame,
    [startFrame, startFrame + flashDuration * 0.15, startFrame + flashDuration],
    [0, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  if (opacity <= 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: color,
        opacity,
        pointerEvents: "none",
        zIndex: 100,
      }}
    />
  );
};
