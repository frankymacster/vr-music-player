const MENU_WIDTH = 7.4;
const MENU_HEIGHT = 3;
const MENU_DISTANCE = 5;
// in radians
const MENU_HORIZONTAL_FOV = Math.asin(MENU_WIDTH*0.5 / Math.sqrt(MENU_WIDTH*0.5*MENU_WIDTH*0.5 + MENU_DISTANCE*MENU_DISTANCE));
// in radians
const MENU_HORIZONTAL_PADDING = 0.174533;
// in radians
const MENU_VERTICAL_FOV = 0.5;
const scenes = [{
    id: 1
  }, {
    id: 2
  },
];
