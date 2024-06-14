const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
    console.log('beforeinstallprompt event fired');
    window.deferredPrompt = event;
});

butInstall.addEventListener('click', async () => {
    console.log('Install button clicked');
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        return;
    }
    promptEvent.prompt();
    const { outcome } = await promptEvent.userChoice;
    console.log('User choice outcome:', outcome);
});

window.addEventListener('appinstalled', (event) => {
    console.log('App installed');
    window.alert('JATE has been installed');
});
