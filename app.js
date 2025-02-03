// Function to check if PWA is installed
function checkInstallationStatus() {
  if (window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true) {
    document.getElementById("appContainer").style.display = "block"; // Show main app
    document.getElementById("installButton").style.display = "none"; // Hide install button
  } else {
    document.getElementById("installButton").style.display = "block"; // Show install button
    document.getElementById("appContainer").style.display = "none"; // Hide main app
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

  // Show install button only if the app is not installed
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

// Run check on page load
window.addEventListener("load", checkInstallationStatus);
