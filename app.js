let deferredPrompt;
const installButton = document.getElementById('installButton');

// Show the install button when the PWA is installable
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the mini-info bar from appearing
  event.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = event;

  // Make the install button visible
  installButton.style.display = 'block';

  // Add click event for the install button
  installButton.addEventListener('click', () => {
    // Show the install prompt when the button is clicked
    deferredPrompt.prompt();
    
    // Wait for the user's choice
    deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
  });
});
