let state = {
  // -1 means there is no scene playing
  playingSceneId: -1,
  menu: {
    isVisible: false,
    angleBeforeVisible: 0,
    // in degrees
    rotation: {
      x: 0,
      y: 0,
      z: 0
    },
    // in meters
    position: {
      x: 0,
      y: 1,
      z: -5
    },
  },
  title: {
    isShown: true,
    // in radians
    rotation: {
      x: 0,
      y: 0,
      z: 0
    },
  }
};