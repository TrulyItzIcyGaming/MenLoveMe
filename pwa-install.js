// pwa-install.js
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  const installButton = document.getElementById('installButton');

  if (!installButton) {
    console.error("Install button not found in HTML. Please add <button id='installButton'>Install App</button> to your HTML.");
    return;
  }

  installButton.style.display = 'block';

  installButton.addEventListener('click', () => {
    if (deferredPrompt) {
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
    } else {
      console.error("deferredPrompt is null. This should not happen if the beforeinstallprompt event fired.");
    }
  });
});

window.addEventListener('appinstalled', (event) => {
  console.log('👍', 'appinstalled', event);
});
