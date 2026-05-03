const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");

function updateUI(isEnabled) {
  if (isEnabled) {
    startBtn.classList.add("active-start");
    stopBtn.classList.remove("active-stop");
  } else {
    stopBtn.classList.add("active-stop");
    startBtn.classList.remove("active-start");
  }
}

// Load saved state
chrome.storage.local.get("enabled", (data) => {
  updateUI(data.enabled ?? false);
});

startBtn.addEventListener("click", () => {
  chrome.storage.local.set({ enabled: true });
  updateUI(true);
});

stopBtn.addEventListener("click", () => {
  chrome.storage.local.set({ enabled: false });
  updateUI(false);
});