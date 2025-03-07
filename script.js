const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const play = document.querySelector(".fa-play");
const pause = document.querySelector(".fa-pause");

const frame = document.querySelector(".contents");
const items = frame.querySelectorAll(".content");
const songs = frame.querySelectorAll("audio");
const numbers = document.querySelectorAll(".number");

const progressCover = document.querySelector(".progress");

// slide

let i = 0;

items.forEach((item) => {
  let currentIndex = 0;
  const totalItems = items.length;

  item.style.transform = `translateX(${i * 420}px)`;
  i++;

  function updateSlide() {
    items.forEach((item, index) => {
      item.style.transform = `translateX(${(index - currentIndex) * 420}px)`;
    });

    numbers.forEach((number) => {
      number.innerText = `${currentIndex + 1} / ${totalItems}`;
    });
  }

  next.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % totalItems;
    updateSlide();

    songs.forEach((song, index) => {
      if (index === currentIndex) {
        song.play();
      } else {
        song.load();
      }
    });

    numbers.forEach((number) => {
      number.innerText = `${currentIndex + 1} / ${totalItems}`;
    });
  });

  prev.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateSlide();

    songs.forEach((song, index) => {
      if (index === currentIndex) {
        song.play();
      } else {
        song.load();
      }
    });

    numbers.forEach((number) => {
      number.innerText = `${currentIndex + 1} / ${totalItems}`;
    });
  });

  play.addEventListener("click", () => {
    songs[currentIndex].play();
  });

  pause.addEventListener("click", () => {
    songs[currentIndex].pause();
  });

  updateSlide();
});

// progress bar

const formatting = (time) => {
  let sec = Math.floor(time % 60);
  let min = Math.floor(time / 60);

  sec = sec < 10 ? `0${sec}` : sec;
  min = min < 10 ? `0${min}` : min;
  return `${min}:${sec}`;
};

songs.forEach((song) => {
  const current = document.querySelector(".current");
  const duration = document.querySelector(".duration");

  const updateTime = () => {
    current.innerText = formatting(song.currentTime);
    if (!isNaN(song.duration)) {
      duration.innerText = formatting(song.duration);
    }
  };

  song.addEventListener("timeupdate", updateTime);

  updateTime();

  const updateProgress = () => {
    const progressBar = document.querySelector(".bar");
    const duration = song.duration;
    const currentTime = song.currentTime;
    const percent = (currentTime / duration) * 100;
    progressBar.style.width = `${percent}%`;
    progressBar.style.background =
      "linear-gradient(to bottom, #4facfe 0%, #00f2fe 100%)";
  };

  song.addEventListener("timeupdate", updateProgress);
});
