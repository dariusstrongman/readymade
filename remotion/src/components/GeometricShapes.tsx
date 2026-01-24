import { useCurrentFrame, useVideoConfig, interpolate, random } from "remotion";
import { getBeatPulse, getSmoothBeatPulse } from "../utils/beatSync";

type GeometricShapesProps = {
  count?: number;
};

export const GeometricShapes: React.FC<GeometricShapesProps> = ({
  count = 8,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const beatPulse = getBeatPulse(frame, fps);

  const shapes = Array.from({ length: count }, (_, i) => {
    const seed = i * 999;
    const x = random(seed) * width;
    const y = random(seed + 1) * height;
    const size = 40 + random(seed + 2) * 80;
    const rotation = random(seed + 3) * 360;
    const rotationSpeed = (random(seed + 4) - 0.5) * 2;
    const type = Math.floor(random(seed + 5) * 3); // 0: circle, 1: square, 2: triangle
    const delay = random(seed + 6) * fps;

    return { id: i, x, y, size, rotation, rotationSpeed, type, delay };
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {shapes.map((shape) => {
        const opacity = interpolate(
          frame,
          [shape.delay, shape.delay + fps * 0.5],
          [0, 0.06],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        const currentRotation = shape.rotation + frame * shape.rotationSpeed;
        const scale = 1 + beatPulse * 0.1;

        const shapeStyle: React.CSSProperties = {
          position: "absolute",
          left: shape.x,
          top: shape.y,
          width: shape.size,
          height: shape.size,
          opacity,
          transform: `rotate(${currentRotation}deg) scale(${scale})`,
          border: "2px solid #ff3c3c",
          background: "transparent",
        };

        if (shape.type === 0) {
          // Circle
          return (
            <div
              key={shape.id}
              style={{
                ...shapeStyle,
                borderRadius: "50%",
              }}
            />
          );
        } else if (shape.type === 1) {
          // Square
          return (
            <div
              key={shape.id}
              style={{
                ...shapeStyle,
                borderRadius: 4,
              }}
            />
          );
        } else {
          // Triangle (using borders)
          return (
            <div
              key={shape.id}
              style={{
                position: "absolute",
                left: shape.x,
                top: shape.y,
                width: 0,
                height: 0,
                opacity,
                transform: `rotate(${currentRotation}deg) scale(${scale})`,
                borderLeft: `${shape.size / 2}px solid transparent`,
                borderRight: `${shape.size / 2}px solid transparent`,
                borderBottom: `${shape.size}px solid rgba(255, 60, 60, 0.15)`,
              }}
            />
          );
        }
      })}
    </div>
  );
};
