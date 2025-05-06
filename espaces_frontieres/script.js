
document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById('intro');
  const startBtn = document.getElementById('startBtn');
  const canvas = document.getElementById("fogCanvas");
  const ctx = canvas.getContext("2d");

  const overlays = {
    north: document.querySelector('.overlay-north'),
    south: document.querySelector('.overlay-south'),
    east: document.querySelector('.overlay-east'),
    west: document.querySelector('.overlay-west')
  };

  const icons = {
    north: document.querySelector('.icon-north'),
    south: document.querySelector('.icon-south'),
    east: document.querySelector('.icon-east'),
    west: document.querySelector('.icon-west')
  };

  const sounds = {
    north: document.getElementById('northAudio'),
    south: document.getElementById('southAudio'),
    east: document.getElementById('eastAudio'),
    west: document.getElementById('westAudio')
  };

  startBtn.addEventListener('click', () => {
    intro.style.display = 'none';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = "rgba(235,235,235,0.97)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    function drawFog(e) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 60, 0, Math.PI * 2);
      ctx.fill();
    }

    function updateDirection(x, y) {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const isCleared = pixel[3] < 250;

      for (let key in overlays) overlays[key].classList.remove("active");
      for (let key in icons) icons[key].style.opacity = 0;

      if (isCleared && y < h * 0.25) {
        overlays.north.classList.add("active");
        icons.north.style.opacity = 1;
      } else if (isCleared && y > h * 0.75) {
        overlays.south.classList.add("active");
        icons.south.style.opacity = 1;
      } else if (isCleared && x < w * 0.25) {
        overlays.west.classList.add("active");
        icons.west.style.opacity = 1;
      } else if (isCleared && x > w * 0.75) {
        overlays.east.classList.add("active");
        icons.east.style.opacity = 1;
      }
    }

    let isDrawing = false;
    canvas.addEventListener("mousedown", () => isDrawing = true);
    canvas.addEventListener("mouseup", () => isDrawing = false);
    canvas.addEventListener("mousemove", e => {
      if (isDrawing) drawFog(e);
      updateDirection(e.clientX, e.clientY);
    });

    Object.keys(icons).forEach(dir => {
      icons[dir].addEventListener('click', () => {
        Object.values(sounds).forEach(audio => {
          audio.pause();
          audio.currentTime = 0;
        });
        sounds[dir].play();
      });
    });
  });
});
