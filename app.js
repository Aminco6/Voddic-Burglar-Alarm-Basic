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
let deferredPrompt;
const installButton = document.getElementById("installButton");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  // Show the install button
  installButton.style.display = "block";

  installButton.addEventListener("click", () => {
    installButton.style.display = "none"; // Hide button after click
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt.");
      } else {
        console.log("User dismissed the install prompt.");
      }
      deferredPrompt = null;
    });
  });
});

// Detect if already installed (Hide install button)
window.addEventListener("appinstalled", () => {
  console.log("PWA was installed");
  installButton.style.display = "none";
});
