import test from 'node:test';
import assert from 'node:assert/strict';
import { sceneTime, videoProgress, STORY_END, chapterStops } from '../src/components/storyTimeline.js';

test('opening reaches its final frame before spatial contraction starts', () => {
  for (let p = 0; p < 1.5; p += .01) assert.ok(sceneTime(p) < .55);
  assert.equal(videoProgress(1.5), 1);
  assert.ok(Math.abs(sceneTime(1.5) - .55) < 1e-9);
  assert.ok(sceneTime(1.6) > .55);
});
test('timeline is continuous, monotonic and independent of traversal direction', () => {
  const positions = Array.from({ length: 976 }, (_, i) => i / 100);
  const forward = positions.map(sceneTime);
  const reverse = positions.toReversed().map(sceneTime).toReversed();
  assert.deepEqual(forward, reverse);
  forward.slice(1).forEach((value, i) => assert.ok(value >= forward[i] && value - forward[i] <= .010001));
});
test('final film has a full playback interval and a hold before leaving', () => {
  const endTime = sceneTime(STORY_END) - 1;
  assert.ok(endTime > 7.62);
  assert.ok(chapterStops.every(p => p < STORY_END));
});
