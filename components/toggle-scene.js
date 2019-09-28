AFRAME.registerComponent('toggle-scene', {
  schema: {type: 'selector'},
  init: function () {
    this.skyEl = this.el.querySelector("#sky");
    this.onSceneThumbnailClick = this.onSceneThumbnailClick.bind(this);
    
    //Select the first scene by default
    this.selectThumbnail(1);
  },

  play: function () {
    this.el.addEventListener("main-scene-click", evt => {
      this.onSceneThumbnailClick(evt, 1);
    });
    this.el.addEventListener("scene2-click", evt => {
      this.onSceneThumbnailClick(evt, 2);
    });
    this.el.addEventListener("scene-button-click", evt => {
      this.onSceneThumbnailClick(evt, evt.detail.sceneId);
    });
    this.skyEl.addEventListener("animationcomplete__fadein", evt => {
      this.onFadeinAnimationComplete(evt);
    });
  },

  pause: function () {
    this.el.removeEventListener("main-scene-click", this.onSceneThumbnailClick);
    this.el.removeEventListener("scene2-click", this.onSceneThumbnailClick);
  },

  onSceneThumbnailClick: function (evt, nextSceneId) {
    // next scene is the same as the current scene
    if (nextSceneId === state.playingSceneId) {
      // pause the current scene and now no scenes are playing
      this.pausePlayingScene();

      state.playingSceneId = -1;
    }
    // no scene is playing
    else if (state.playingSceneId === -1) {
      // nothing special to do, start playing the next scene
      state.playingSceneId = nextSceneId;
      
      //Add thumbnail outline to selected scene
      this.selectThumbnail(nextSceneId);
      this.skyEl.emit("animate-sky-fadein");
    }
    // next scene is the different from the current scene
    else {
      // stop the other scenes and start the next scene
      this.pausePlayingScene();

      state.playingSceneId = nextSceneId;

      this.selectThumbnail(nextSceneId);
      this.skyEl.emit("animate-sky-fadein");
    }
  },
  
  pausePlayingScene: function () {
    const audioPlayerEl = this.el.querySelector("#audio-player");
    const videoPlayerEl = this.el.querySelector("#video-player");
    const audioEl = document.querySelector('#audio' + state.playingSceneId);
    const videoEl = document.querySelector('#video' + state.playingSceneId);
    const playButtonEl = this.el.querySelector("#play" + state.playingSceneId + "-button");

    audioPlayerEl.currentTime = 0;
    audioEl.pause();
    videoPlayerEl.currentTime = 0;
    videoEl.pause();
    playButtonEl.setAttribute("src", "#play-icon");
  },
  
  playNextScene: function () {
    const audioPlayerEl = this.el.querySelector("#audio-player");
    const videoPlayerEl = this.el.querySelector("#video-player");
    const audioEl = document.querySelector('#audio' + state.playingSceneId);
    const videoEl = document.querySelector('#video' + state.playingSceneId);
    const playButtonEl = this.el.querySelector("#play" + state.playingSceneId + "-button");
        
    audioPlayerEl.setAttribute("src", '#audio' + state.playingSceneId);
    audioEl.play();
    videoPlayerEl.setAttribute("src", '#video' + state.playingSceneId);
    videoEl.play();
    playButtonEl.setAttribute("src", "#pause-icon");
  },
  
  onFadeinAnimationComplete: function (evt) {
    this.playNextScene();
  },
  
  selectThumbnail: function (index) {
    //Remove thumbnail outline from previous scene
    const prevThumbnailOutline = this.el.querySelector(".selected");
    if(prevThumbnailOutline) {
      prevThumbnailOutline.setAttribute("opacity", "0");
      prevThumbnailOutline.removeAttribute("class");
      const prevThumbImage = prevThumbnailOutline.querySelector("a-image.clickable");
      prevThumbImage.setAttribute("opacity", "0.5");
    }

    //Add thumbnail outline to selected scene
    const thumbnailOutline = this.el.querySelector("#thumbnail" + index + "-outline");
    thumbnailOutline.setAttribute("opacity","1");
    thumbnailOutline.setAttribute("class","selected");
    const thumbImage = thumbnailOutline.querySelector("a-image.clickable");
    thumbImage.setAttribute("opacity", "1");
  }
});