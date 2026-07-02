const track = document.querySelector(".track");
const carousel = document.querySelector(".carousel");

let x = 0;
let dir = -1;
let maxScroll = 0;

let paused = false;
let lastTime = 0;
const speed = 60; // pixels per second (more stable than per-frame)

function updateBounds() {
  maxScroll = Math.max(0, track.scrollWidth - carousel.clientWidth);
}

updateBounds();
window.addEventListener("resize", updateBounds);

function animate(time) {
  if (!lastTime) lastTime = time;
  const dt = (time - lastTime) / 1000;
  lastTime = time;

  if (!paused) {
    x += speed * dir * dt;

    if (x <= 0) {
      x = 0;
      dir = 1;
    } else if (x >= maxScroll) {
      x = maxScroll;
      dir = -1;
    }

    track.style.transform = `translate3d(${-x}px, 0, 0)`;
  }

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

carousel.addEventListener("mouseenter", () => (paused = true));
carousel.addEventListener("mouseleave", () => (paused = false));
