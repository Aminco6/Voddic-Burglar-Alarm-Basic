let deferredPrompt;
const installButton = document.getElementById('installButton');

window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default mini-info bar or prompt from appearing
  event.preventDefault();
  
  // Stash the event so it can be triggered later
  deferredPrompt = event;

  // Show the install button or custom pop-up
  installButton.style.display = 'block';

  installButton.addEventListener('click', () => {
    // Show the prompt
    deferredPrompt.prompt();

    // Wait for the user's response
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
