/********************** Basic Taskbar & Start Menu **********************/
const startButton = document.getElementById("start-button");
const startMenu = document.getElementById("start-menu");
startButton.addEventListener("click", function (e) {
  e.stopPropagation();
  //startMenu.style.display = startMenu.style.display === "block" ? "none" : "block";
  startMenu.classList.toggle("open");
});
//document.addEventListener("click", function (e) {
  //if (!startMenu.contains(e.target)) {
  //  startMenu.style.display = "none";
  //
  document.addEventListener("click", function (e) {
// Only remove the "open" class if the clicked target is
// not within the start menu AND is not the start button.
if (!startMenu.contains(e.target) && e.target !== startButton) {
  startMenu.classList.remove("open");
  }
});

/********************** Example Window Controls & Dragging **********************/
const windowElement = document.getElementById("window-example");
const closeButton = document.getElementById("close");
const minimizeButton = document.getElementById("minimize");
const maximizeButton = document.getElementById("maximize");
closeButton.addEventListener("click", function () {
  windowElement.style.display = "none";
});
minimizeButton.addEventListener("click", function () {
  const windowBody = windowElement.querySelector(".window-body");
  windowBody.style.display = windowBody.style.display === "none" ? "block" : "none";
});
maximizeButton.addEventListener("click", function () {
  if (windowElement.classList.contains("maximized")) {
    windowElement.style.left = windowElement.dataset.originalLeft || "100px";
    windowElement.style.top = windowElement.dataset.originalTop || "100px";
    windowElement.style.width = windowElement.dataset.originalWidth || "400px";
    windowElement.style.height = windowElement.dataset.originalHeight || "";
    windowElement.classList.remove("maximized");
  } else {
    windowElement.dataset.originalLeft = windowElement.style.left;
    windowElement.dataset.originalTop = windowElement.style.top;
    windowElement.dataset.originalWidth = windowElement.style.width;
    windowElement.dataset.originalHeight = windowElement.style.height;
    windowElement.style.left = "0";
    windowElement.style.top = "0";
    windowElement.style.width = "100%";
    windowElement.style.height = "100%";
    windowElement.classList.add("maximized");
  }
});
(function () {
  const header = windowElement.querySelector(".window-header");
  let isDragging = false, offsetX, offsetY;
  header.addEventListener("mousedown", function (e) {
    isDragging = true;
    offsetX = e.clientX - windowElement.offsetLeft;
    offsetY = e.clientY - windowElement.offsetTop;
    windowElement.style.transition = "none";
  });
  document.addEventListener("mousemove", function (e) {
    if (isDragging) {
      windowElement.style.left = e.clientX - offsetX + "px";
      windowElement.style.top = e.clientY - offsetY + "px";
    }
  });
  document.addEventListener("mouseup", function () {
    isDragging = false;
    windowElement.style.transition = "all 0.2s";
  });
})();

/********************** Settings App Controls & Dragging **********************/
const settingsMenuItem = document.getElementById("start-menu-settings");
const settingsWindow = document.getElementById("settings-window");
settingsMenuItem.addEventListener("click", function () {
  settingsWindow.style.display = "block";
  startMenu.style.display = "none";
});
const settingsClose = document.getElementById("settings-close");
const settingsMinimize = document.getElementById("settings-minimize");
const settingsMaximize = document.getElementById("settings-maximize");
settingsClose.addEventListener("click", function () {
  settingsWindow.style.display = "none";
});
settingsMinimize.addEventListener("click", function () {
  const bodyContent = settingsWindow.querySelector(".window-body");
  bodyContent.style.display = bodyContent.style.display === "none" ? "flex" : "none";
});
settingsMaximize.addEventListener("click", function () {
  if (settingsWindow.classList.contains("maximized")) {
    settingsWindow.style.left = settingsWindow.dataset.originalLeft || "100px";
    settingsWindow.style.top = settingsWindow.dataset.originalTop || "100px";
    settingsWindow.style.width = settingsWindow.dataset.originalWidth || "600px";
    settingsWindow.style.height = settingsWindow.dataset.originalHeight || "400px";
    settingsWindow.classList.remove("maximized");
  } else {
    settingsWindow.dataset.originalLeft = settingsWindow.style.left;
    settingsWindow.dataset.originalTop = settingsWindow.style.top;
    settingsWindow.dataset.originalWidth = settingsWindow.style.width;
    settingsWindow.dataset.originalHeight = settingsWindow.style.height;
    settingsWindow.style.left = "0";
    settingsWindow.style.top = "0";
    settingsWindow.style.width = "100%";
    settingsWindow.style.height = "100%";
    settingsWindow.classList.add("maximized");
  }
});
(function () {
  const header = settingsWindow.querySelector(".window-header");
  let isDragging = false, offsetX, offsetY;
  header.addEventListener("mousedown", function (e) {
    isDragging = true;
    offsetX = e.clientX - settingsWindow.offsetLeft;
    offsetY = e.clientY - settingsWindow.offsetTop;
    settingsWindow.style.transition = "none";
  });
  document.addEventListener("mousemove", function (e) {
    if (isDragging) {
      settingsWindow.style.left = e.clientX - offsetX + "px";
      settingsWindow.style.top = e.clientY - offsetY + "px";
    }
  });
  document.addEventListener("mouseup", function () {
    isDragging = false;
    settingsWindow.style.transition = "all 0.2s";
  });
})();
// Sidebar switching for Settings app.
const settingsOptions = document.querySelectorAll(".settings-option");
settingsOptions.forEach((option) => {
  option.addEventListener("click", function () {
    settingsOptions.forEach((opt) => opt.classList.remove("active"));
    option.classList.add("active");
    document.querySelectorAll(".settings-section").forEach((section) => {
      section.style.display = "none";
    });
    const sectionId = "settings-section-" + option.getAttribute("data-section");
    document.getElementById(sectionId).style.display = "block";
  });
});

/********************** File Explorer Functionality **********************/
const fileSystem = {
  Documents: ["Resume.docx", "Report.pdf", "Notes.txt"],
  Pictures: ["Vacation.jpg", "Family.png", "Friend.jpeg"],
  Music: ["Song1.mp3", "Song2.mp3"],
  Videos: ["Movie.mp4", "Clip.avi"],
  "Recycle Bin": [] // Added Recycle Bin folder (initially empty)
};
function populateExplorerFolders() {
  const folderList = document.getElementById("explorer-folders");
  folderList.innerHTML = "";
  for (let folder in fileSystem) {
    const li = document.createElement("li");
    li.innerText = folder;
    li.dataset.folder = folder;
    li.addEventListener("click", function () {
      document.querySelectorAll("#explorer-folders li").forEach((item) => {
        item.classList.remove("active");
      });
      li.classList.add("active");
      populateExplorerFiles(folder);
    });
    folderList.appendChild(li);
  }
}
function populateExplorerFiles(folder) {
  const fileList = document.getElementById("explorer-files");
  fileList.innerHTML = "";
  if (fileSystem[folder]) {
    fileSystem[folder].forEach((file) => {
      const li = document.createElement("li");
      li.innerText = file;
      fileList.appendChild(li);
    });
  }
}
const explorerAppIcon = document.getElementById("explorer-app");
const explorerWindow = document.getElementById("explorer-window");
explorerAppIcon.addEventListener("click", function () {
  explorerWindow.style.display = "block";
  populateExplorerFolders();
  const firstFolder = document.querySelector("#explorer-folders li");
  if (firstFolder) {
    firstFolder.click();
  }
});
const explorerClose = document.getElementById("explorer-close");
const explorerMinimize = document.getElementById("explorer-minimize");
const explorerMaximize = document.getElementById("explorer-maximize");
explorerClose.addEventListener("click", function () {
  explorerWindow.style.display = "none";
});
explorerMinimize.addEventListener("click", function () {
  const bodyContent = explorerWindow.querySelector(".window-body");
  bodyContent.style.display = bodyContent.style.display === "none" ? "flex" : "none";
});
explorerMaximize.addEventListener("click", function () {
  if (explorerWindow.classList.contains("maximized")) {
    explorerWindow.style.left = explorerWindow.dataset.originalLeft || "100px";
    explorerWindow.style.top = explorerWindow.dataset.originalTop || "100px";
    explorerWindow.style.width = explorerWindow.dataset.originalWidth || "600px";
    explorerWindow.style.height = explorerWindow.dataset.originalHeight || "400px";
    explorerWindow.classList.remove("maximized");
  } else {
    explorerWindow.dataset.originalLeft = explorerWindow.style.left;
    explorerWindow.dataset.originalTop = explorerWindow.style.top;
    explorerWindow.dataset.originalWidth = explorerWindow.style.width;
    explorerWindow.dataset.originalHeight = explorerWindow.style.height;
    explorerWindow.style.left = "0";
    explorerWindow.style.top = "0";
    explorerWindow.style.width = "100%";
    explorerWindow.style.height = "100%";
    explorerWindow.classList.add("maximized");
  }
});
(function () {
  const header = document.querySelector("#explorer-window .window-header");
  let isDragging = false, offsetX, offsetY;
  header.addEventListener("mousedown", function (e) {
    isDragging = true;
    offsetX = e.clientX - explorerWindow.offsetLeft;
    offsetY = e.clientY - explorerWindow.offsetTop;
    explorerWindow.style.transition = "none";
  });
  document.addEventListener("mousemove", function (e) {
    if (isDragging) {
      explorerWindow.style.left = e.clientX - offsetX + "px";
      explorerWindow.style.top = e.clientY - offsetY + "px";
    }
  });
  document.addEventListener("mouseup", function () {
    isDragging = false;
    explorerWindow.style.transition = "all 0.2s";
  });
})();

/********************** New: Documents & Photos Button Functionality **********************/
// Add event listeners to the Documents and Photos buttons in the Start Menu.
const startMenuDocuments = document.getElementById("start-menu-documents");
const startMenuPhotos = document.getElementById("start-menu-photos");
startMenuDocuments.addEventListener("click", function () {
    explorerWindow.style.display = "block";
    populateExplorerFolders();
    // Wait briefly to allow folder listing before simulating a click on "Documents"
    setTimeout(() => {
        const docFolderElem = Array.from(document.querySelectorAll("#explorer-folders li"))
                                .find(li => li.innerText === "Documents");
        if (docFolderElem) {
            docFolderElem.click();
        }
    }, 10);
    startMenu.style.display = "none";
});
startMenuPhotos.addEventListener("click", function () {
    explorerWindow.style.display = "block";
    populateExplorerFolders();
    // "Photos" button will open the "Pictures" folder as defined in the file system.
    setTimeout(() => {
        const photoFolderElem = Array.from(document.querySelectorAll("#explorer-folders li"))
                                  .find(li => li.innerText === "Pictures");
        if (photoFolderElem) {
            photoFolderElem.click();
        }
    }, 10);
    startMenu.style.display = "none";
});

/********************** Microsoft Edge App Functionality **********************/
const edgeAppIcon = document.getElementById("edge-app");
const edgeWindow = document.getElementById("edge-window");
edgeAppIcon.addEventListener("click", function () {
  edgeWindow.style.display = "block";
});
const edgeClose = document.getElementById("edge-close");
const edgeMinimize = document.getElementById("edge-minimize");
const edgeMaximize = document.getElementById("edge-maximize");
edgeClose.addEventListener("click", function () {
  edgeWindow.style.display = "none";
});
edgeMinimize.addEventListener("click", function () {
  const bodyContent = edgeWindow.querySelector(".window-body");
  bodyContent.style.display = bodyContent.style.display === "none" ? "block" : "none";
});
edgeMaximize.addEventListener("click", function () {
  if (edgeWindow.classList.contains("maximized")) {
    edgeWindow.style.left = edgeWindow.dataset.originalLeft || "100px";
    edgeWindow.style.top = edgeWindow.dataset.originalTop || "100px";
    edgeWindow.style.width = edgeWindow.dataset.originalWidth || "600px";
    edgeWindow.style.height = edgeWindow.dataset.originalHeight || "400px";
    edgeWindow.classList.remove("maximized");
  } else {
    edgeWindow.dataset.originalLeft = edgeWindow.style.left;
    edgeWindow.dataset.originalTop = edgeWindow.style.top;
    edgeWindow.dataset.originalWidth = edgeWindow.style.width;
    edgeWindow.dataset.originalHeight = edgeWindow.style.height;
    edgeWindow.style.left = "0";
    edgeWindow.style.top = "0";
    edgeWindow.style.width = "100%";
    edgeWindow.style.height = "100%";
    edgeWindow.classList.add("maximized");
  }
});
(function () {
  const header = edgeWindow.querySelector(".window-header");
  let isDragging = false, offsetX, offsetY;
  header.addEventListener("mousedown", function (e) {
    isDragging = true;
    offsetX = e.clientX - edgeWindow.offsetLeft;
    offsetY = e.clientY - edgeWindow.offsetTop;
    edgeWindow.style.transition = "none";
  });
  document.addEventListener("mousemove", function (e) {
    if (isDragging) {
      edgeWindow.style.left = e.clientX - offsetX + "px";
      edgeWindow.style.top = e.clientY - offsetY + "px";
    }
  });
  document.addEventListener("mouseup", function () {
    isDragging = false;
    edgeWindow.style.transition = "all 0.2s";
  });
})();
// Edge Navigation Functionality with Basic History
let edgeHistory = [];
let edgeHistoryIndex = -1;
function loadEdgeURL(url, updateHistory = true) {
  const iframe = document.getElementById("edge-iframe");
  let newUrl = url.trim();
  if (!newUrl.startsWith("http://") && !newUrl.startsWith("https://")) {
    newUrl = "https://" + newUrl;
  }
  iframe.src = newUrl;
  document.getElementById("edge-address").value = newUrl;
  if (updateHistory) {
    if (edgeHistoryIndex < edgeHistory.length - 1) {
      edgeHistory = edgeHistory.slice(0, edgeHistoryIndex + 1);
    }
    edgeHistory.push(newUrl);
    edgeHistoryIndex = edgeHistory.length - 1;
  }
}
document.getElementById("edge-go").addEventListener("click", function () {
  const url = document.getElementById("edge-address").value;
  loadEdgeURL(url, true);
});
document.getElementById("edge-address").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const url = document.getElementById("edge-address").value;
    loadEdgeURL(url, true);
  }
});
document.getElementById("edge-reload").addEventListener("click", function () {
  const iframe = document.getElementById("edge-iframe");
  iframe.contentWindow.location.reload();
});
document.getElementById("edge-back").addEventListener("click", function () {
  if (edgeHistoryIndex > 0) {
    edgeHistoryIndex--;
    loadEdgeURL(edgeHistory[edgeHistoryIndex], false);
  }
});
document.getElementById("edge-forward").addEventListener("click", function () {
  if (edgeHistoryIndex < edgeHistory.length - 1) {
    edgeHistoryIndex++;
    loadEdgeURL(edgeHistory[edgeHistoryIndex], false);
  }
});

/********************** Microsoft Store Functionality **********************/
let storeApps = [
  { id: 1, title: "Edge", description: "The latest Microsoft Edge browser.", image: "./images/browser.png", installed: false },
  { id: 2, title: "Office", description: "Productivity suite for your work.", image: "./images/office.png", installed: false },
  { id: 3, title: "Photos", description: "Manage and edit your photos.", image: "./images/logo.png", installed: false },
  { id: 4, title: "Groove Music", description: "Listen to your favorite tunes.", image: "./images/music.png", installed: false },
  { id: 5, title: "Xbox", description: "Gaming experience from Microsoft.", image: "./images/xbox.jpg", installed: false },
];
const storeAppIcon = document.getElementById("store-app");
const storeWindow = document.getElementById("store-window");
storeAppIcon.addEventListener("click", function () {
  storeWindow.style.display = "block";
  renderStoreApps("");
});
document.getElementById("start-menu-store")?.addEventListener("click", function () {
  storeWindow.style.display = "block";
  startMenu.style.display = "none";
  renderStoreApps("");
});
const storeClose = document.getElementById("store-close");
const storeMinimize = document.getElementById("store-minimize");
const storeMaximize = document.getElementById("store-maximize");
storeClose.addEventListener("click", function () {
  storeWindow.style.display = "none";
});
storeMinimize.addEventListener("click", function () {
  const bodyContent = storeWindow.querySelector(".window-body");
  bodyContent.style.display = bodyContent.style.display === "none" ? "block" : "none";
});
storeMaximize.addEventListener("click", function () {
  if (storeWindow.classList.contains("maximized")) {
    storeWindow.style.left = storeWindow.dataset.originalLeft || "100px";
    storeWindow.style.top = storeWindow.dataset.originalTop || "100px";
    storeWindow.style.width = storeWindow.dataset.originalWidth || "600px";
    storeWindow.style.height = storeWindow.dataset.originalHeight || "400px";
    storeWindow.classList.remove("maximized");
  } else {
    storeWindow.dataset.originalLeft = storeWindow.style.left;
    storeWindow.dataset.originalTop = storeWindow.style.top;
    storeWindow.dataset.originalWidth = storeWindow.style.width;
    storeWindow.dataset.originalHeight = storeWindow.style.height;
    storeWindow.style.left = "0";
    storeWindow.style.top = "0";
    storeWindow.style.width = "100%";
    storeWindow.style.height = "100%";
    storeWindow.classList.add("maximized");
  }
});
(function () {
  const header = document.querySelector("#store-window .window-header");
  let isDragging = false, offsetX, offsetY;
  header.addEventListener("mousedown", function (e) {
    isDragging = true;
    offsetX = e.clientX - storeWindow.offsetLeft;
    offsetY = e.clientY - storeWindow.offsetTop;
    storeWindow.style.transition = "none";
  });
  document.addEventListener("mousemove", function (e) {
    if (isDragging) {
      storeWindow.style.left = e.clientX - offsetX + "px";
      storeWindow.style.top = e.clientY - offsetY + "px";
    }
  });
  document.addEventListener("mouseup", function () {
    isDragging = false;
    storeWindow.style.transition = "all 0.2s";
  });
})();
function renderStoreApps(filterText) {
  const grid = document.querySelector(".store-grid");
  grid.innerHTML = "";
  let filteredApps = storeApps.filter((app) =>
    app.title.toLowerCase().includes(filterText.toLowerCase())
  );
  filteredApps.forEach((app) => {
    const div = document.createElement("div");
    div.classList.add("store-item");
    div.dataset.appId = app.id;
    div.innerHTML = `<img src="${app.image}" alt="${app.title}" /><div>${app.title}</div>`;
    div.addEventListener("click", function () {
      openStoreDetail(app.id);
    });
    grid.appendChild(div);
  });
}
const storeSearchInput = document.getElementById("store-search-input");
storeSearchInput.addEventListener("input", function () {
  renderStoreApps(this.value.trim());
});
function openStoreDetail(appId) {
  let app = storeApps.find((a) => a.id == appId);
  if (!app) return;
  document.getElementById("store-detail-img").src = app.image;
  document.getElementById("store-detail-title").innerText = app.title;
  document.getElementById("store-detail-description").innerText = app.description;
  let installButton = document.getElementById("store-detail-install");
  if (app.installed) {
    installButton.innerText = "Installed";
    installButton.disabled = true;
  } else {
    installButton.innerText = "Install";
    installButton.disabled = false;
    installButton.onclick = function () {
      app.installed = true;
      installButton.innerText = "Installed";
      installButton.disabled = true;
    };
  }
  document.getElementById("store-detail-modal").style.display = "flex";
}
document.getElementById("store-detail-close").addEventListener("click", function () {
  document.getElementById("store-detail-modal").style.display = "none";
});

/********************** Action Center Functionality **********************/
const actionCenterToggle = document.getElementById("action-center-toggle");
const actionCenter = document.getElementById("action-center");
const actionCenterClose = document.getElementById("action-center-close");
actionCenterToggle.addEventListener("click", function () {
  actionCenter.classList.toggle("open");
});
actionCenterClose.addEventListener("click", function () {
  actionCenter.classList.remove("open");
});
document.querySelectorAll(".quick-toggle").forEach((toggle) =>
  toggle.addEventListener("click", function () {
    toggle.classList.toggle("active");
  })
);

/********************** Clock Functionality **********************/
const clockTime = document.getElementById("clock-time");
const clockDate = document.getElementById("clock-date");

function updateClock() {
const now = new Date();

// Create the time string (e.g., 09:08:15)
const hours = now.getHours().toString().padStart(2, "0");
const minutes = now.getMinutes().toString().padStart(2, "0");
const seconds = now.getSeconds().toString().padStart(2, "0");
clockTime.innerText = `${hours}:${minutes}:${seconds}`;

// Create a formatted date string (for example: Fri, Apr 25, 2025)
clockDate.innerText = now.toLocaleDateString("en-US", {
weekday: "short",
month: "short",
day: "numeric",
year: "numeric"
});
}

setInterval(updateClock, 1000);
updateClock();

/********************** Battery Flyout Functionality **********************/
const batteryButton = document.getElementById("battery-button");
const batteryFlyout = document.getElementById("battery-flyout");
batteryButton.addEventListener("click", function (e) {
  e.stopPropagation();
  if (batteryFlyout.style.display === "block") {
    batteryFlyout.style.display = "none";
  } else {
    if (navigator.getBattery) {
      navigator.getBattery().then(function (battery) {
        let percent = Math.round(battery.level * 100);
        batteryFlyout.innerText = "Battery: " + percent + "%";
      });
    } else {
      batteryFlyout.innerText = "Battery: 75%";
    }
    let rect = batteryButton.getBoundingClientRect();
    batteryFlyout.style.top = rect.top - batteryFlyout.offsetHeight - 10 + "px";
    batteryFlyout.style.left = rect.left + "px";
    batteryFlyout.style.display = "block";
  }
});
document.addEventListener("click", function (e) {
  if (
    batteryFlyout.style.display === "block" &&
    !batteryFlyout.contains(e.target) &&
    e.target !== batteryButton
  ) {
    batteryFlyout.style.display = "none";
  }
});

/********************** Sound Flyout Functionality **********************/
const soundButton = document.getElementById("sound-button");
const soundFlyout = document.getElementById("sound-flyout");
const volumeSlider = document.getElementById("volume-slider");
const muteButton = document.getElementById("mute-button");
let isMuted = false;
let currentVolume = 50;
soundButton.addEventListener("click", function (e) {
  e.stopPropagation();
  if (soundFlyout.style.display === "block") {
    soundFlyout.style.display = "none";
  } else {
    soundFlyout.style.display = "block";
    let rect = soundButton.getBoundingClientRect();
    soundFlyout.style.top = rect.top - soundFlyout.offsetHeight - 10 + "px";
    soundFlyout.style.left = rect.left + "px";
  }
});
volumeSlider.addEventListener("input", function (e) {
  currentVolume = e.target.value;
  if (currentVolume == 0) {
    isMuted = true;
    muteButton.textContent = "Unmute";
  } else {
    if (isMuted) {
      isMuted = false;
      muteButton.textContent = "Mute";
    }
  }
});
muteButton.addEventListener("click", function (e) {
  isMuted = !isMuted;
  if (isMuted) {
    muteButton.textContent = "Unmute";
    volumeSlider.value = 0;
    currentVolume = 0;
  } else {
    muteButton.textContent = "Mute";
    volumeSlider.value = 50;
    currentVolume = 50;
  }
});
document.addEventListener("click", function (e) {
  if (
    soundFlyout.style.display === "block" &&
    !soundFlyout.contains(e.target) &&
    e.target !== soundButton
  ) {
    soundFlyout.style.display = "none";
  }
});

/********************** Wi‑Fi Flyout Functionality **********************/
const wifiButton = document.getElementById("wifi-button");
const wifiFlyout = document.getElementById("wifi-flyout");
wifiButton.addEventListener("click", function (e) {
  e.stopPropagation();
  if (wifiFlyout.style.display === "block") {
    wifiFlyout.style.display = "none";
  } else {
    wifiFlyout.innerText = "Connected to Internet";
    let rect = wifiButton.getBoundingClientRect();
    wifiFlyout.style.top = (rect.top - wifiFlyout.offsetHeight - 10) + "px";
    wifiFlyout.style.left = rect.left + "px";
    wifiFlyout.style.display = "block";
  }
});
document.addEventListener("click", function (e) {
  if (
    wifiFlyout.style.display === "block" &&
    !wifiFlyout.contains(e.target) &&
    e.target !== wifiButton
  ) {
    wifiFlyout.style.display = "none";
  }
});

/********************** Power Button Functionality **********************/
const powerMenuItem = document.getElementById("start-menu-power");
powerMenuItem.addEventListener("click", function () {
  if (confirm("Are you sure you want to shut down?")) {
    // Create a full-screen shutdown overlay
    let shutdownOverlay = document.createElement("div");
    shutdownOverlay.id = "shutdown-overlay";
    shutdownOverlay.style.position = "fixed";
    shutdownOverlay.style.top = "0";
    shutdownOverlay.style.left = "0";
    shutdownOverlay.style.width = "100%";
    shutdownOverlay.style.height = "100%";
    shutdownOverlay.style.backgroundColor = "black";
    shutdownOverlay.style.zIndex = "3000";
    shutdownOverlay.style.display = "flex";
    shutdownOverlay.style.justifyContent = "center";
    shutdownOverlay.style.alignItems = "center";
    shutdownOverlay.style.color = "white";
    shutdownOverlay.style.fontSize = "36px";
    shutdownOverlay.style.opacity = "0";
    shutdownOverlay.style.transition = "opacity 1s ease";
    shutdownOverlay.innerText = "Shutting down...";
    document.body.appendChild(shutdownOverlay);
    // Fade in the overlay
    setTimeout(() => {
      shutdownOverlay.style.opacity = "1";
    }, 10);
    // After a short delay, simulate shutdown by replacing the page content
    setTimeout(function () {
      document.body.innerHTML = "";
      let offMessage = document.createElement("div");
      offMessage.style.position = "fixed";
      offMessage.style.top = "50%";
      offMessage.style.left = "50%";
      offMessage.style.transform = "translate(-50%, -50%)";
      offMessage.style.color = "black";
      offMessage.style.fontSize = "36px";
      offMessage.innerText = "It is now safe to turn off your computer.";
      document.body.appendChild(offMessage);
    }, 2000);
    setTimeout(function () {
      location.reload(true);
    }, 4000)
  }
});

  /********************** Recycle Bin Icon Functionality **********************/
  (function() {
      const recycleBin = document.getElementById("recycle-bin-icon");

  // Make the Recycle Bin draggable
  let isDragging = false, offsetX, offsetY;
  recycleBin.addEventListener("mousedown", function(e) {
    isDragging = true;
    offsetX = e.clientX - recycleBin.offsetLeft;
    offsetY = e.clientY - recycleBin.offsetTop;
    recycleBin.style.transition = "none";
   });
   document.addEventListener("mousemove", function(e) {
     if (isDragging) {
       recycleBin.style.left = (e.clientX - offsetX) + "px";
       recycleBin.style.top = (e.clientY - offsetY) + "px";
     }
   });
   document.addEventListener("mouseup", function() {
     isDragging = false;
     recycleBin.style.transition = "all 0.2s";
   });
   document.getElementById("notepad-save").addEventListener("click", function () {
// Retrieve the text from the textarea
const text = document.getElementById("notepad-textarea").value;

// Create a Blob with the text data
const blob = new Blob([text], { type: "text/plain" });

// Create a temporary link element
const link = document.createElement("a");

// Create an object URL for the Blob and set the download attribute
link.href = URL.createObjectURL(blob);
link.download = "Untitled.txt";

// Programmatically click the link to trigger the download
link.click();

// Optionally, revoke the object URL after a short delay to free resources
setTimeout(() => URL.revokeObjectURL(link.href), 100);
});
// Use the correct ID "notepad-app"
const notepadIcon = document.getElementById("notepad-app");
notepadIcon.addEventListener("click", function () {
// Show the notepad window when clicking the taskbar button.
document.getElementById("notepad-window").style.display = "block";
});
// Get Notepad window and its control buttons.
const notepadWindow = document.getElementById("notepad-window");
const notepadClose = document.getElementById("notepad-close");
const notepadMinimize = document.getElementById("notepad-minimize");
const notepadMaximize = document.getElementById("notepad-maximize");

// Close button: hide the notepad window.
notepadClose.addEventListener("click", function () {
notepadWindow.style.display = "none";
});

// Minimize button: toggle the visibility of the window's body.
notepadMinimize.addEventListener("click", function () {
const bodyContent = notepadWindow.querySelector(".window-body");
bodyContent.style.display = (bodyContent.style.display === "none") ? "block" : "none";
});

// Maximize button: toggle full-screen and restore.
notepadMaximize.addEventListener("click", function () {
if (notepadWindow.classList.contains("maximized")) {
// Restore previous size and position.
notepadWindow.style.left = notepadWindow.dataset.originalLeft || "100px";
notepadWindow.style.top = notepadWindow.dataset.originalTop || "100px";
notepadWindow.style.width = notepadWindow.dataset.originalWidth || "400px";
notepadWindow.style.height = notepadWindow.dataset.originalHeight || "";
notepadWindow.classList.remove("maximized");
} else {
// Save the current position and size.
notepadWindow.dataset.originalLeft = notepadWindow.style.left;
notepadWindow.dataset.originalTop = notepadWindow.style.top;
notepadWindow.dataset.originalWidth = notepadWindow.style.width;
notepadWindow.dataset.originalHeight = notepadWindow.style.height;
// Maximize to fill the desktop.
notepadWindow.style.left = "0";
notepadWindow.style.top = "0";
notepadWindow.style.width = "100%";
notepadWindow.style.height = "100%";
notepadWindow.classList.add("maximized");
}
});


notepadIcon.addEventListener("click", function () {
notepadWindow.style.display = "block";
});
(function () {
// Get the notepad window element
const notepadWindow = document.getElementById("notepad-window");

// (Optional) Set initial position if not already set.
if (!notepadWindow.style.left) notepadWindow.style.left = "100px";
if (!notepadWindow.style.top) notepadWindow.style.top = "100px";

// Get the header of the notepad window (the area used for dragging)
const header = notepadWindow.querySelector(".window-header");

// Set up variables to track dragging
let isDragging = false, offsetX, offsetY;

// When the user presses the mouse button on the header...
header.addEventListener("mousedown", function (e) {
isDragging = true;
// Calculate the offset between the mouse and the window's top-left corner
offsetX = e.clientX - notepadWindow.offsetLeft;
offsetY = e.clientY - notepadWindow.offsetTop;
// Disable any transition for smoother dragging
notepadWindow.style.transition = "none";
});

// When the mouse moves, update the window's position if dragging is active
document.addEventListener("mousemove", function (e) {
if (isDragging) {
notepadWindow.style.left = (e.clientX - offsetX) + "px";
notepadWindow.style.top = (e.clientY - offsetY) + "px";
}
});

// When the mouse button is released, stop the dragging and optionally add a transition
document.addEventListener("mouseup", function () {
isDragging = false;
notepadWindow.style.transition = "all 0.2s";
});
})();

   // Open the Recycle Bin folder when double-clicked
   recycleBin.addEventListener("dblclick", function() {
     const explorerWindow = document.getElementById("explorer-window");
     explorerWindow.style.display = "block";

     // Repopulate folders (ensuring your file system includes "Recycle Bin")
     populateExplorerFolders();

     // Simulate a click on the "Recycle Bin" folder item shortly after
    setTimeout(() => {
      const rbFolderElem = Array.from(document.querySelectorAll("#explorer-folders li"))
                                  .find(li => li.innerText === "Recycle Bin");
      if (rbFolderElem) {
        rbFolderElem.click();
      }
    }, 10);
  });
})();
/********************** Notepad Draggable Functionality **********************/
(function () {
// Get the notepad window element.
const notepadWindow = document.getElementById("notepad-window");

// Set an initial position if none exist.
if (!notepadWindow.style.left) {
notepadWindow.style.left = "100px";
}
if (!notepadWindow.style.top) {
notepadWindow.style.top = "100px";
}

// Get the header from the notepad window.
const header = notepadWindow.querySelector(".window-header");

// Make sure the header exists.
if (!header) {
console.error("Notepad header not found. Ensure it has the 'window-header' class.");
return;
}

let isDragging = false, offsetX = 0, offsetY = 0;

// When the mouse is pressed on the header...
header.addEventListener("mousedown", function (e) {
isDragging = true;
// Calculate the offset. Use parseInt to convert CSS string to a number.
offsetX = e.clientX - parseInt(notepadWindow.style.left, 10);
offsetY = e.clientY - parseInt(notepadWindow.style.top, 10);
notepadWindow.style.transition = "none";  // Remove transition for immediate drag movement
});

// When the mouse moves, reposition the window.
document.addEventListener("mousemove", function (e) {
if (isDragging) {
notepadWindow.style.left = (e.clientX - offsetX) + "px";
notepadWindow.style.top = (e.clientY - offsetY) + "px";
}
});

// When the mouse button is released, stop dragging and re-enable transition.
document.addEventListener("mouseup", function () {
isDragging = false;
notepadWindow.style.transition = "all 0.2s";
});
})();
window.addEventListener("load", function () {
// Wait for 2 seconds before fading out the splash screen.
setTimeout(function () {
const startupScreen = document.getElementById("startup-screen");
startupScreen.classList.add("hidden");
// Optionally, remove the element from the DOM after the transition:
setTimeout(function () {
startupScreen.parentNode.removeChild(startupScreen);
}, 500); // Matches the CSS transition duration
}, 2000);
});
const desktop = document.getElementById("desktop");
let selectionRect = null;
let startX = 0;
let startY = 0;

desktop.addEventListener("mousedown", function (e) {
// Allow selection if the click is on the desktop background OR on a desktop icon.
if ((e.target === desktop || e.target.classList.contains("desktop-icon")) && !e.shiftKey) {
// Remove any existing "selected" classes
desktop.querySelectorAll(".desktop-icon").forEach((icon) => {
icon.classList.remove("selected");
});

startX = e.clientX;
startY = e.clientY;

selectionRect = document.createElement("div");
selectionRect.className = "selection-rectangle";
selectionRect.style.left = `${startX}px`;
selectionRect.style.top = `${startY}px`;
selectionRect.style.width = "0px";
selectionRect.style.height = "0px";

desktop.appendChild(selectionRect);
}
});



desktop.addEventListener("mousemove", function (e) {
if (!selectionRect) return; // Only update if selection is active

const currentX = e.clientX;
const currentY = e.clientY;
const rectLeft = Math.min(startX, currentX);
const rectTop = Math.min(startY, currentY);
const rectWidth = Math.abs(startX - currentX);
const rectHeight = Math.abs(startY - currentY);

selectionRect.style.left = rectLeft + "px";
selectionRect.style.top = rectTop + "px";
selectionRect.style.width = rectWidth + "px";
selectionRect.style.height = rectHeight + "px";
});

desktop.addEventListener("mouseup", function (e) {
if (selectionRect) {
// Get the bounding rectangle of the selection area
const selRect = selectionRect.getBoundingClientRect();

// Query all desktop icons
const icons = desktop.querySelectorAll(".desktop-icon");

// Loop through each icon to check intersection
icons.forEach(function (icon) {
const iconRect = icon.getBoundingClientRect();
const isIntersecting = (
  iconRect.left < selRect.right &&
  iconRect.right > selRect.left &&
  iconRect.top < selRect.bottom &&
  iconRect.bottom > selRect.top
);

// Toggle the "selected" class based on intersection
if (isIntersecting) {
  icon.classList.add("selected");
} else {
  icon.classList.remove("selected");
}
});

// Remove the selection rectangle from the DOM
desktop.removeChild(selectionRect);
selectionRect = null;
}
});


// Also remove the rectangle if the mouse leaves the desktop.
desktop.addEventListener("mouseleave", function () {
if (selectionRect) {
desktop.removeChild(selectionRect);
selectionRect = null;
}
});