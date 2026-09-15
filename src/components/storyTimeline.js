export const INTRO_PLAY_END = 1.5;
export const INTRO_EXTRA = .95;
export const STORY_END = 8.8 + INTRO_EXTRA;
export const chapterStops = [0, 1.55, 2.6, 3.65, 4.7, 5.65, 6.5, 7.75]
  .map((stop, index) => index ? stop + INTRO_EXTRA : stop);
export const sceneTime = progress => progress <= INTRO_PLAY_END
  ? progress * .55 / INTRO_PLAY_END : progress - INTRO_EXTRA;
export const videoProgress = progress => Math.max(0, Math.min(1, progress / INTRO_PLAY_END));
