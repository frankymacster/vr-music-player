AFRAME.registerComponent('scene-button', {
  play: function () {
    this.el.addEventListener("click", this.onClick.bind(this));
  },
  pause: function () {
    this.el.removeEventListener("click", this.onClick);
  },
  onClick: function () {
    if (state.menu.isVisible) {
      const sceneId = this.el.getAttribute("data-id");
      console.log(sceneId);
      this.el.sceneEl.emit("scene-button-click", { sceneId: sceneId });
    }
  }
});

AFRAME.registerComponent('close-button', {
  play: function () {
    this.el.addEventListener("click", this.onClick.bind(this));
  },
  pause: function () {
    this.el.removeEventListener("click", this.onClick);
  },
  onClick: function () {
    if (state.menu.isVisible) {
      const menuEl = this.el.sceneEl.querySelector("#menu");
      menuEl.emit("closemenu");
    }
  }
});