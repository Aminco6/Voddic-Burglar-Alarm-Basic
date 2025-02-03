// Service Worker Registration
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("service-worker.js")
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
  installButton.style.display = "block";

  installButton.addEventListener("click", () => {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt.");
        installButton.style.display = "none";
        checkInstallationStatus(); // Hide pre-install content after installation
      } else {
        console.log("User dismissed the install prompt.");
      }
      deferredPrompt = null;
    });
  });
});

// Check if PWA is Installed & Adjust UI Accordingly
function checkInstallationStatus() {
  const preInstallContent = document.getElementById("preInstallContent");
  const appContainer = document.getElementById("appContainer");
  const passwordForm = document.getElementById("passwordForm");

  if (window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true) {
    console.log("App is running in standalone mode");

    // Hide pre-install content and show app settings
    installButton.style.display = "none";
    preInstallContent.style.display = "none"; // Hide video & text
    appContainer.style.display = "block";
    passwordForm.style.display = "block"; // Show password form
  } else {
    console.log("App is NOT installed yet");

    // Show install button and pre-install content
    installButton.style.display = "block";
    preInstallContent.style.display = "block";
    appContainer.style.display = "none";
  }
}

// Run check on page load
window.addEventListener("load", checkInstallationStatus);
