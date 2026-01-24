import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { getBeatPulse } from "../utils/beatSync";

type LogoProps = {
  size?: number;
  showText?: boolean;
};

export const Logo: React.FC<LogoProps> = ({ size = 120, showText = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const beatPulse = getBeatPulse(frame, fps);

  // Corner brackets draw animation
  const bracketProgress = interpolate(frame, [0, fps * 0.4], [0, 1], {
    extrapolateRight: "clamp",
  });

  // R letter fade in
  const letterOpacity = interpolate(frame, [fps * 0.2, fps * 0.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Beat-reactive glow
  const glowIntensity = 0.4 + beatPulse * 0.4;
  const strokeColor = "#ff6b5b";

  const iconSize = showText ? size * 0.6 : size;
  const strokeWidth = Math.max(2.5, iconSize / 16);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: showText ? 20 : 0,
      }}
    >
      {/* Logo icon */}
      <div
        style={{
          width: iconSize,
          height: iconSize,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Glow effect */}
        <div
          style={{
            position: "absolute",
            width: iconSize * 1.5,
            height: iconSize * 1.5,
            borderRadius: "20%",
            background: `radial-gradient(circle, rgba(255,107,91,${glowIntensity}) 0%, transparent 70%)`,
            filter: "blur(30px)",
          }}
        />

        {/* SVG Logo */}
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 40 40"
          style={{
            filter: `drop-shadow(0 0 ${10 + beatPulse * 20}px rgba(255,107,91,0.6))`,
          }}
        >
          {/* Top-left bracket */}
          <path
            d="M3 10 L3 3 L10 3"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={20}
            strokeDashoffset={20 * (1 - bracketProgress)}
          />
          {/* Top-right bracket */}
          <path
            d="M30 3 L37 3 L37 10"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={20}
            strokeDashoffset={20 * (1 - bracketProgress)}
          />
          {/* Bottom-right bracket */}
          <path
            d="M37 30 L37 37 L30 37"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={20}
            strokeDashoffset={20 * (1 - bracketProgress)}
          />
          {/* Bottom-left bracket */}
          <path
            d="M10 37 L3 37 L3 30"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={20}
            strokeDashoffset={20 * (1 - bracketProgress)}
          />
          {/* R letter */}
          <text
            x="12"
            y="28"
            fontFamily="Syne, Space Grotesk, sans-serif"
            fontSize="22"
            fontWeight="700"
            fill="#ffffff"
            opacity={letterOpacity}
          >
            R
          </text>
        </svg>
      </div>

      {/* Text below logo (optional) */}
      {showText && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            opacity: letterOpacity,
          }}
        >
          <span
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: size * 0.14,
              fontWeight: 600,
              letterSpacing: "0.08em",
              color: strokeColor,
            }}
          >
            READYMADE
          </span>
          <span
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: size * 0.1,
              fontWeight: 500,
              letterSpacing: "0.15em",
              color: "#6b6b7b",
            }}
          >
            VIDEO
          </span>
        </div>
      )}
    </div>
  );
};
