AFRAME.registerComponent('cursor-item', {
  play: function () {
    this.el.addEventListener("click", this.onClick);
    this.el.addEventListener("fusing", this.onFuse);
    this.el.addEventListener("mouseleave", this.onMouseLeave);
    this.el.addEventListener("animationcomplete", this.onAnimationComplete);
  },
  pause: function () {
    this.el.removeEventListener("click", this.onClick);
    this.el.removeEventListener("fusing", this.onFuse);
    this.el.removeEventListener("mouseleave", this.onMouseLeave);
  },
  onClick: function (evt) {
    if (state.menu.isVisible) {
      evt.target.emit("menu-click");
    }
  },
  onFuse: function (evt) {
    if (state.menu.isVisible) {
      evt.target.emit("menu-fuse");
    }
  },
  onMouseLeave: function (evt) {
    if (state.menu.isVisible) {
      evt.target.emit("menu-mouseleave");
    }
  },
  onAnimationComplete: function (evt) {
    if (evt.detail.name === "animation__fusing") {
      evt.target.setAttribute("geometry", "thetaLength: 360;");
    }
  }
});
