import { interpolate } from "remotion";

// BPM for the Roie Shpigler track - electronic/cinematic music
// Adjust this value based on the actual track tempo
export const BPM = 110;

/**
 * Get the current beat number at a given frame
 */
export const getBeat = (frame: number, fps: number): number => {
  const beatsPerSecond = BPM / 60;
  const seconds = frame / fps;
  return seconds * beatsPerSecond;
};

/**
 * Get progress within the current beat (0 to 1)
 */
export const getBeatProgress = (frame: number, fps: number): number => {
  const beat = getBeat(frame, fps);
  return beat % 1;
};

/**
 * Check if we're on a beat (within threshold)
 */
export const isOnBeat = (
  frame: number,
  fps: number,
  threshold: number = 0.1
): boolean => {
  const progress = getBeatProgress(frame, fps);
  return progress < threshold || progress > 1 - threshold;
};

/**
 * Get a pulse value that peaks on each beat
 * Returns 0-1 where 1 is exactly on the beat
 */
export const getBeatPulse = (frame: number, fps: number): number => {
  const progress = getBeatProgress(frame, fps);
  // Create a sharp pulse that decays quickly
  if (progress < 0.15) {
    return interpolate(progress, [0, 0.15], [1, 0]);
  }
  return 0;
};

/**
 * Get a smooth pulse for subtle animations
 */
export const getSmoothBeatPulse = (frame: number, fps: number): number => {
  const progress = getBeatProgress(frame, fps);
  // Sine wave that peaks at the beat
  return Math.pow(Math.cos(progress * Math.PI * 2) * 0.5 + 0.5, 2);
};

/**
 * Get frame number for a specific beat
 */
export const beatToFrame = (beat: number, fps: number): number => {
  const beatsPerSecond = BPM / 60;
  const seconds = beat / beatsPerSecond;
  return Math.floor(seconds * fps);
};

/**
 * Get every Nth beat for major accents
 */
export const isOnMajorBeat = (
  frame: number,
  fps: number,
  every: number = 4
): boolean => {
  const beat = getBeat(frame, fps);
  const beatNumber = Math.floor(beat);
  const progress = getBeatProgress(frame, fps);
  return beatNumber % every === 0 && progress < 0.1;
};
