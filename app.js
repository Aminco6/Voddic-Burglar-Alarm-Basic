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




const passwordForm = document.getElementById('passwordForm');
const settingsForm = document.getElementById('settingsForm');
const statusMessage = document.getElementById('status');

let storedPassword = ''; // Temporary placeholder for the password

// Save Password
passwordForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const password = document.getElementById('password').value;
  storedPassword = password; // In a real implementation, send this to the ESP8266 for storage
  passwordForm.style.display = 'none';
  settingsForm.style.display = 'block';
  statusMessage.textContent = 'Password set successfully!';
});

// Update Settings
settingsForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const activationDelay = document.getElementById('activationDelay').value;
  const alarmDuration = document.getElementById('alarmDuration').value;
  const recheckDelay = document.getElementById('recheckDelay').value;
  const verifyPassword = document.getElementById('verifyPassword').value;

  // Verify password
  if (verifyPassword !== storedPassword) {
    statusMessage.textContent = 'Incorrect password. Settings not updated.';
    statusMessage.style.color = 'red';
    return;
  }

  // Construct the payload
  const data = {
    activationDelay: activationDelay,
    alarmDuration: alarmDuration,
    recheckDelay: recheckDelay,
    password: verifyPassword, // Include the password for validation
  };

  try {
    // Send data to ESP8266 (replace with the actual ESP8266 IP)
    const response = await fetch('http://192.168.4.1/update-settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      statusMessage.textContent = 'Settings updated successfully!';
      statusMessage.style.color = 'green';
    } else {
      statusMessage.textContent = 'Failed to update settings.';
      statusMessage.style.color = 'red';
    }
  } catch (error) {
    console.error('Error:', error);
    statusMessage.textContent = 'Error communicating with device.';
    statusMessage.style.color = 'red';
  }
});

