// pwa-install.js
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  const installButton = document.getElementById('installButton');
  if (installButton) {
    installButton.style.display = 'block';

    installButton.addEventListener('click', (e) => {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
        installButton.style.display = 'none';
      });
    });
  } else {
    console.log("Install button not found. Make sure it has the id 'installButton'.");
  }
});
