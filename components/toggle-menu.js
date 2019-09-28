
const THREE = AFRAME.THREE;

AFRAME.registerComponent('toggle-menu', {
  schema: {type: 'selector'},
  
  play: function() {
    this.cameraEl = this.el.querySelector("a-camera");
    this.menuEl = this.el.querySelector("#menu");
    this.cursorEl = this.el.sceneEl.querySelector("#cursor");
    this.trackMenuEl = this.el.querySelector("#track-menu");
    this.menuRotationEl = this.el.querySelector("#menu-rotation");
    
    const menuEl = this.el.querySelector("#menu");
    menuEl.addEventListener("closemenu", this.close.bind(this));
  },
  
  tick: function () {
    this.setVisibility();

    if (!state.menu.isVisible) {
      this.rotate();
    }
    
    this.menuRotationEl.object3D.rotation.set(
      THREE.Math.degToRad(state.menu.rotation.x),
      THREE.Math.degToRad(state.menu.rotation.y),
      THREE.Math.degToRad(state.menu.rotation.z)
    );
    if (!state.menu.isVisible) {
      this.menuEl.setAttribute("visible", false);
      this.trackMenuEl.setAttribute("visible", false);
    }
  },

  setVisibility: function () {
    const cameraElRotation = this.cameraEl.object3D.rotation;
    
    if (!state.menu.isVisible) {
      if (cameraElRotation.x <= -MENU_VERTICAL_FOV) {
        this.cursorEl.setAttribute("visible", true);
        this.menuEl.emit("animate-menu-fadein");
        this.trackMenuEl.emit("animate-menu-fadein");
        state.menu.isVisible = true;
        state.menu.angleBeforeVisible = cameraElRotation.y;
      }
    } else {
      if (cameraElRotation.x >= MENU_VERTICAL_FOV
      || cameraElRotation.y <= state.menu.angleBeforeVisible - MENU_HORIZONTAL_FOV - MENU_HORIZONTAL_PADDING
      || cameraElRotation.y >= state.menu.angleBeforeVisible + MENU_HORIZONTAL_FOV + MENU_HORIZONTAL_PADDING) {
        this.close();
      }
    }
  },
  
  close: function () {
    this.cursorEl.setAttribute("visible", false);
    this.menuEl.emit("animate-menu-fadeout");
    this.trackMenuEl.emit("animate-menu-fadeout");
    state.menu.isVisible = false;
  },

  rotate: function () {
    state.menu.rotation = {
      x: state.menu.rotation.x,
      y: THREE.Math.radToDeg(this.cameraEl.object3D.rotation.y),
      z: state.menu.rotation.z
    };
  },
});