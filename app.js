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

// DOM Elements
const installButton = document.getElementById("installButton");
const preInstallContent = document.getElementById("preInstallContent");
const appContainer = document.getElementById("appContainer");
const passwordForm = document.getElementById("passwordForm");
const settingsForm = document.getElementById("settingsForm");
const statusMessage = document.getElementById("status");

// PWA Installation Prompt Handling
let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installButton.style.display = "block"; // Show install button

  installButton.addEventListener("click", () => {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt.");
        installButton.style.display = "none"; // Hide install button
        checkInstallationStatus(); // Update UI after installation
      } else {
        console.log("User dismissed the install prompt.");
      }
      deferredPrompt = null;
    });
  });
});

// Check if PWA is Installed
function checkInstallationStatus() {
  if (window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true) {
    console.log("App is running in standalone mode");

    // Hide pre-install content and install button
    if (installButton) installButton.style.display = "none";
    if (preInstallContent) preInstallContent.style.display = "none";

    // Show app settings
    if (appContainer) appContainer.style.display = "block";
    if (passwordForm) passwordForm.style.display = "block";
  } else {
    console.log("App is NOT installed yet");

    // Show install button and pre-install content
    if (installButton) installButton.style.display = "block";
    if (preInstallContent) preInstallContent.style.display = "block";
    if (appContainer) appContainer.style.display = "none"; // Hide app content before install
  }
}

checkInstallationStatus();

// Password and Settings Logic
let storedPassword = ""; // Placeholder for the password

// Save Password
passwordForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const password = document.getElementById("password").value;
  storedPassword = password; // Store password temporarily (Consider storing securely)
  
  passwordForm.style.display = "none";
  settingsForm.style.display = "block";
  statusMessage.textContent = "Password set successfully!";
  statusMessage.style.color = "green";
});

// Update Settings
settingsForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const activationDelay = document.getElementById("activationDelay").value;
  const alarmDuration = document.getElementById("alarmDuration").value;
  const recheckDelay = document.getElementById("recheckDelay").value;
  const verifyPassword = document.getElementById("verifyPassword").value;

  // Verify password
  if (verifyPassword !== storedPassword) {
    statusMessage.textContent = "Incorrect password. Settings not updated.";
    statusMessage.style.color = "red";
    return;
  }

  // Construct the payload
  const data = {
    activationDelay: activationDelay,
    alarmDuration: alarmDuration,
    recheckDelay: recheckDelay,
    password: verifyPassword, // Include password for validation
  };

  try {
    // Send data to ESP8266 (Replace with actual ESP8266 IP)
    const response = await fetch("http://192.168.4.1/update-settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      statusMessage.textContent = "Settings updated successfully!";
      statusMessage.style.color = "green";
    } else {
      statusMessage.textContent = "Failed to update settings.";
      statusMessage.style.color = "red";
    }
  } catch (error) {
    console.error("Error:", error);
    statusMessage.textContent = "Error communicating with device.";
    statusMessage.style.color = "red";
  }
});
