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
const preInstallContent = document.getElementById("preInstallContent");
const appContainer = document.getElementById("appContainer");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installButton.style.display = "block";  // Show the install button

  installButton.addEventListener("click", () => {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt.");
        installButton.style.display = "none"; // Hide the install button after installation
        checkInstallationStatus(); // Recheck installation status
      } else {
        console.log("User dismissed the install prompt.");
      }
      deferredPrompt = null;
    });
  });
});

function checkInstallationStatus() {
  const installButton = document.getElementById("installButton");
  const preInstallContent = document.getElementById("preInstallContent");
  const appContainer = document.getElementById("appContainer");

  if (window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true) {
    console.log("App is running in standalone mode");

    // Hide install section and show app settings
    installButton.style.display = "none";
    preInstallContent.style.display = "none";  // Hide video & text
    appContainer.style.display = "block";
  } else {
    console.log("App is NOT installed yet");

    // Show install button and pre-install content
    installButton.style.display = "block";
    preInstallContent.style.display = "block";
    appContainer.style.display = "none";
  }
}

checkInstallationStatus();
