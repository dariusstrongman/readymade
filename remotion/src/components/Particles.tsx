import { useCurrentFrame, useVideoConfig, random } from "remotion";

type ParticlesProps = {
  count?: number;
  color?: string;
};

export const Particles: React.FC<ParticlesProps> = ({
  count = 30,
  color = "#ff3c3c",
}) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  // Generate particles with deterministic random positions
  const particles = Array.from({ length: count }, (_, i) => {
    const seed = i * 1000;
    const startX = random(seed) * width;
    const startY = random(seed + 1) * height;
    const size = 2 + random(seed + 2) * 4;
    const speed = 0.3 + random(seed + 3) * 0.7;
    const delay = random(seed + 4) * fps * 2;
    const opacity = 0.1 + random(seed + 5) * 0.3;

    return {
      id: i,
      startX,
      startY,
      size,
      speed,
      delay,
      opacity,
    };
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {particles.map((particle) => {
        const adjustedFrame = Math.max(0, frame - particle.delay);
        const y = particle.startY - adjustedFrame * particle.speed;
        const drift = Math.sin(adjustedFrame * 0.02 + particle.id) * 30;
        const fadeIn = Math.min(1, adjustedFrame / (fps * 0.5));

        // Reset particle when it goes off screen
        const wrappedY = ((y % (height + 100)) + height + 100) % (height + 100) - 50;

        return (
          <div
            key={particle.id}
            style={{
              position: "absolute",
              left: particle.startX + drift,
              top: wrappedY,
              width: particle.size,
              height: particle.size,
              borderRadius: "50%",
              background: color,
              opacity: particle.opacity * fadeIn,
              filter: `blur(${particle.size / 3}px)`,
              boxShadow: `0 0 ${particle.size * 2}px ${color}`,
            }}
          />
        );
      })}
    </div>
  );
};
