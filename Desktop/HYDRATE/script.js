const pauseBtn = document.getElementById("start-pause");
const drinkBtn = document.getElementById("start-drink");
const pauseInput = document.getElementById("pause-time");
const drinkInput = document.getElementById("drink-time");
const pauseCountdown = document.getElementById("pause-countdown");
const drinkCountdown = document.getElementById("drink-countdown");
const alertSound = document.getElementById("alert-sound");
const themeBtn = document.getElementById("toggle-theme");

let pauseInterval, drinkInterval;

function startCountdown(duration, display, label) {
  let time = duration * 60;
  display.textContent = `Temps restant : ${formatTime(time)}`;
  
  const interval = setInterval(() => {
    time--;
    display.textContent = `Temps restant : ${formatTime(time)}`;
    
    if (time <= 0) {
      clearInterval(interval);
      alert(`${label} terminé ! 🎉`);
      alertSound.play();
    }
  }, 1000);

  return interval;
}

pauseBtn.addEventListener("click", () => {
  clearInterval(pauseInterval);
  const mins = parseInt(pauseInput.value);
  if (mins > 0) {
    pauseInterval = startCountdown(mins, pauseCountdown, "Pause");
  }
});

drinkBtn.addEventListener("click", () => {
  clearInterval(drinkInterval);
  const mins = parseInt(drinkInput.value);
  if (mins > 0) {
    drinkInterval = startCountdown(mins, drinkCountdown, "Hydratation");
  }
});

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  themeBtn.textContent = document.body.classList.contains("dark-mode")
    ? "☀️ Thème Jour"
    : "🌙 Thème Nuit";
});

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}
