import { AbsoluteFill, useVideoConfig, interpolate, useCurrentFrame, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { IntroScene } from "./scenes/IntroScene";
import { ServicesScene } from "./scenes/ServicesScene";
import { ValuePropScene } from "./scenes/ValuePropScene";
import { CTAScene } from "./scenes/CTAScene";
import { ScanLines } from "./components/ScanLines";
import { GridOverlay } from "./components/GridOverlay";
import { beatToFrame } from "./utils/beatSync";

export const LandingPageVideo: React.FC = () => {
  const { fps, durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();

  // 38 seconds at 110 BPM = ~70 beats total
  // Scene timing structure:
  // Scene 1: Intro (beats 0-16) = 16 beats
  // Scene 2: Services (beats 16-40) = 24 beats
  // Scene 3: Value Prop (beats 40-56) = 16 beats
  // Scene 4: CTA (beats 56-70) = 14 beats

  const introDuration = beatToFrame(16, fps);
  const servicesDuration = beatToFrame(24, fps);
  const valueDuration = beatToFrame(16, fps);
  const ctaDuration = beatToFrame(14, fps);

  // Transition duration - half a beat for punchy transitions
  const transitionDuration = beatToFrame(0.5, fps);

  // Volume envelope - fade in and out
  const volume = (f: number) => {
    const fadeInEnd = fps * 0.5;
    const fadeOutStart = durationInFrames - fps * 2;

    if (f < fadeInEnd) {
      return interpolate(f, [0, fadeInEnd], [0, 0.7]);
    }
    if (f > fadeOutStart) {
      return interpolate(f, [fadeOutStart, durationInFrames], [0.7, 0]);
    }
    return 0.7;
  };

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #050505 0%, #0d0d0d 50%, #050505 100%)",
      }}
    >
      {/* Background music - layered tracks from Roie Shpigler */}
      <Audio src={staticFile("bass.mp3")} volume={(f) => volume(f) * 1.0} />
      <Audio src={staticFile("drums.mp3")} volume={(f) => volume(f) * 0.85} />
      <Audio src={staticFile("music-main.mp3")} volume={(f) => volume(f) * 0.8} />

      {/* Global overlays for premium feel */}
      <GridOverlay opacity={0.02} />
      <ScanLines opacity={0.03} speed={1.5} />

      <TransitionSeries>
        {/* Scene 1: Brand Intro - 16 beats (~8.7 seconds) */}
        <TransitionSeries.Sequence durationInFrames={introDuration}>
          <IntroScene />
        </TransitionSeries.Sequence>

        {/* Beat 16: Wipe transition to services */}
        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* Scene 2: Services Showcase - 24 beats (~13 seconds) */}
        <TransitionSeries.Sequence durationInFrames={servicesDuration}>
          <ServicesScene />
        </TransitionSeries.Sequence>

        {/* Beat 40: Slide transition to value prop */}
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* Scene 3: Value Proposition - 16 beats (~8.7 seconds) */}
        <TransitionSeries.Sequence durationInFrames={valueDuration}>
          <ValuePropScene />
        </TransitionSeries.Sequence>

        {/* Beat 56: Fade transition to CTA */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* Scene 4: CTA - 14 beats (~7.6 seconds) */}
        <TransitionSeries.Sequence durationInFrames={ctaDuration}>
          <CTAScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {/* Vignette effect */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
