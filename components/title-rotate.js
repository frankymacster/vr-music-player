AFRAME.registerComponent('title-rotate', {
  schema: {type: 'selector'},
  
  play: function() {
    this.cameraEl = this.el.querySelector("a-camera");
    
    const titleRotationEl = this.el.querySelector("#title-rotation");
    setTimeout(() => {
      this.hide();
    }, 20000);
  },
  
  tick: function () {
    if (state.menu.isVisible) {
      this.hide();
    }
    
    if (!state.title.isShown) {
      return;
    }
    
    this.rotate();
    
    const titleRotationEl = this.el.querySelector("#title-rotation");
    titleRotationEl.object3D.rotation.set(
      state.title.rotation.x,
      state.title.rotation.y,
      state.title.rotation.z
    );
  },

  rotate: function () {
    state.title.rotation = {
      x: state.title.rotation.x,
      y: this.cameraEl.object3D.rotation.y,
      z: state.title.rotation.z
    };
  },
  
  hide: function () {
    state.title.isShown = false;
  
    const titleRotationEl = this.el.querySelector("#title-rotation");
    titleRotationEl.setAttribute("visible", false);
  },
});
