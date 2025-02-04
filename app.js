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
