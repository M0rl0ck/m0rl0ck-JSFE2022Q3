import birdImgDefault from "../../assets/img/bird.jpg";
import imgPlay from "../../assets/icons/play.svg";
import imgPause from "../../assets/icons/pause.svg";
import imgVolume from "../../assets/icons/volume.svg";
import createHtmlElement from "../function/function";

export default class Player {
  constructor(sound) {
    this.player = new Audio(sound);
    this.playerContainer = createHtmlElement("div", "player");
    this.mouseDown = false;
    this.volumeMouseDown = false;

    this.player.addEventListener("loadedmetadata", this.init);
  }

  init = () => {
    this.createControlTime();
    this.createControlVolume();
  };

  createControlTime() {
    const control = createHtmlElement(
      "div",
      "control",
      "",
      this.playerContainer
    );
    this.playButton = createHtmlElement("div", "play-button", "", control);
    this.barContainer = createHtmlElement("div", "bar-container", "", control);
    this.bar = createHtmlElement("div", "bar", "", this.barContainer);
    this.barThumb = createHtmlElement(
      "div",
      "bar-thumb",
      "",
      this.barContainer
    );
    this.barThumb.style.left = "0%";
    const time = createHtmlElement(
      "div",
      "time-container",
      "",
      this.barContainer
    );
    this.currentTime = createHtmlElement("div", "", "00:00", time);
    this.fullTime = createHtmlElement(
      "div",
      "",
      `${this.getTime(this.player.duration)}`,
      time
    );

    this.playButton.addEventListener("click", this.play);
    this.player.addEventListener("timeupdate", this.updateTime);
    this.bar.addEventListener("mousedown", this.setCurrentTime);
    this.barThumb.addEventListener("mousedown", () => {
      this.mouseDown = true;
    });
    this.barContainer.addEventListener("mouseup", () => {
      this.mouseDown = false;
    });
    this.barContainer.addEventListener("mousemove", (e) => {
      if (this.mouseDown) {
        this.setCurrentTime(e);
      }
    });
    this.barContainer.addEventListener("mouseleave", () => {
      this.mouseDown = false;
    });
  }

  createControlVolume() {
    const volumeControl = createHtmlElement(
      "div",
      "volume-control",
      "",
      this.playerContainer
    );
    this.volumeButton = createHtmlElement(
      "div",
      "volume-button",
      "",
      volumeControl
    );
    this.volumeBarContainer = createHtmlElement(
      "div",
      "volume-bar-container",
      "",
      volumeControl
    );
    this.volumeBar = createHtmlElement(
      "div",
      "volume-bar",
      "",
      this.volumeBarContainer
    );
    this.volumeBarThumb = createHtmlElement(
      "div",
      "volume-bar-thumb",
      "",
      this.volumeBarContainer
    );
    this.volumeBarThumb.style.left = "0%";
    this.updateVolume();

    this.volumeButton.addEventListener("click", this.setMute);
    this.volumeBar.addEventListener("mousedown", this.setVolume);
    this.volumeBarThumb.addEventListener("mousedown", () => {
      this.volumeMouseDown = true;
    });
    this.volumeBarContainer.addEventListener("mouseup", () => {
      this.volumeMouseDown = false;
    });
    this.volumeBarContainer.addEventListener("mousemove", (e) => {
      if (this.volumeMouseDown) {
        this.setVolume(e);
      }
    });
    this.volumeBarContainer.addEventListener("mouseleave", () => {
      this.mouseDown = false;
    });
  }

  setCurrentTime = (e) => {
    if (e.target.classList.contains("bar-thumb")) {
      return;
    }
    this.mouseDown = true;
    const curentTime =
      (e.offsetX / this.barContainer.offsetWidth) * this.player.duration;
    this.player.currentTime = curentTime;
  };

  getTime = (time) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")}`;
  };

  updateTime = () => {
    this.currentTime.innerHTML = this.getTime(this.player.currentTime);
    const procent = (this.player.currentTime / this.player.duration) * 100;
    const offsetThumb =
      (this.barThumb.offsetWidth / 2 / this.bar.offsetWidth) * 100;
    this.barThumb.style.left = `${procent - offsetThumb}%`;
    this.bar.style.backgroundImage = `linear-gradient(to right, goldenrod 0%,
      goldenrod ${procent}%, gray ${procent}%, gray 100% )`;
  };

  updateVolume = () => {
    const procent = this.player.volume * 100;
    const offsetThumb =
      (this.volumeBarThumb.offsetWidth / 2 / this.volumeBar.offsetWidth) * 100;
    this.volumeBarThumb.style.left = `${procent - offsetThumb}%`;
    this.volumeBar.style.backgroundImage = `linear-gradient(to right, goldenrod 0%,
      goldenrod ${procent}%, gray ${procent}%, gray 100% )`;
  };

  setVolume = (e) => {
    if (e.target.classList.contains("volume-bar-thumb")) {
      return;
    }
    this.volumeMouseDown = true;
    const volume = e.offsetX / this.volumeBarContainer.offsetWidth;
    this.player.volume = volume;
    this.updateVolume();
  };

  setMute = () => {
    if (this.player.muted) {
      this.player.muted = false;
      this.volumeButton.classList.remove("volume-button_mute");
    } else {
      this.player.muted = true;
      this.volumeButton.classList.add("volume-button_mute");
    }
  };

  play = () => {
    if (this.player.paused) {
      this.player.play();
      this.playButton.classList.add("play-button_active");
    } else {
      this.player.pause();
      this.playButton.classList.remove("play-button_active");
    }
  };
}
