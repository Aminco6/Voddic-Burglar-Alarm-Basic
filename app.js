const form = document.getElementById("settingsForm");
const statusText = document.getElementById("status");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const activationDelay = document.getElementById("activationDelay").value;
  const alarmDuration = document.getElementById("alarmDuration").value;
  const recheckDelay = document.getElementById("recheckDelay").value;

  const data = {
    activationDelay: parseInt(activationDelay),
    alarmDuration: parseInt(alarmDuration),
    recheckDelay: parseInt(recheckDelay),
  };

  try {
    const response = await fetch("http://192.168.4.1/update-settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      statusText.textContent = "Settings updated successfully!";
    } else {
      statusText.textContent = "Failed to update settings.";
    }
  } catch (error) {
    statusText.textContent = "Error connecting to ESP8266.";
  }
});
