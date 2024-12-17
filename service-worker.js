self.addEventListener('install', event => {
    console.log('Service Worker installiert.');
});

self.addEventListener('activate', event => {
    console.log('Service Worker aktiviert.');
});

self.addEventListener('notificationclick', event => {
    console.log('Benachrichtigung geklickt:', event);
    event.notification.close();
    // Optional: Handle actions or open a specific URL
    event.waitUntil(
        clients.openWindow('https://example.com') // Beispiel-URL
    );
});
