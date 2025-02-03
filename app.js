// Register Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("Service Worker registered:", registration.scope);
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}

// PWA Installation Prompt
// Function to check if PWA is installed
function checkInstallationStatus() {
  const installButton = document.getElementById("installButton");
  const appContainer = document.getElementById("appContainer");

  if (window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true) {
    console.log("App is running in standalone mode");
    installButton.style.display = "none"; // Hide install button
    appContainer.style.display = "block"; // Show app content
  } else {
    console.log("App is NOT installed yet");
    installButton.style.display = "block"; // Show install button
    appContainer.style.display = "none"; // Hide app container until installed
  }
}

// Register Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("Service Worker registered:", registration.scope);
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}

// PWA Installation Prompt Handling
let deferredPrompt;
const installButton = document.getElementById("installButton");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  // Ensure correct UI state
  checkInstallationStatus();

  installButton.addEventListener("click", () => {
    installButton.style.display = "none";
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt.");
        setTimeout(() => {
          checkInstallationStatus(); // Re-check after install
        }, 2000);
      } else {
        console.log("User dismissed the install prompt.");
        installButton.style.display = "block";
      }
      deferredPrompt = null;
    });
  });
});

// Detect if the app is installed
window.addEventListener("appinstalled", () => {
  console.log("PWA was installed");
  checkInstallationStatus();
});

// Ensure correct UI on page load
window.addEventListener("load", () => {
  document.getElementById("appContainer").style.display = "block"; // Show content on first visit
  checkInstallationStatus();
});
