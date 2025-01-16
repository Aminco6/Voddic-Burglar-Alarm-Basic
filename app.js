let deferredPrompt; // Store the prompt event
const installButton = document.getElementById('installButton'); // The button to trigger installation

window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default prompt from showing up
  event.preventDefault();
  
  // Stash the event so it can be triggered later
  deferredPrompt = event;

  // Show the install button
  installButton.style.display = 'block';

  // Add event listener for install button
  installButton.addEventListener('click', () => {
    // Show the prompt when the button is clicked
    deferredPrompt.prompt();
    
    // Wait for the user's response to the prompt
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
