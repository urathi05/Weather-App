// ✅ preload.js

const { contextBridge, ipcRenderer } = require('electron');

console.log("✅ PRELOAD SCRIPT LOADED");

contextBridge.exposeInMainWorld('electronGetLocation', () => {
    return ipcRenderer.invoke('get-location');
});

window.addEventListener('DOMContentLoaded', () => {
    console.log("✅ DOM Ready in preload");

    const patchScript = `
    console.log("📍 INJECTED GEO PATCH");

    const original = navigator.geolocation.getCurrentPosition;

    navigator.geolocation.getCurrentPosition = function(success, error, options) {
      console.log("🚨 INJECTED OVERRIDE TRIGGERED");

      if (typeof window.electronGetLocation === 'function') {
        window.electronGetLocation()
          .then(coords => {
            success({
              coords: {
                latitude: coords.latitude,
                longitude: coords.longitude,
                accuracy: coords.accuracy || 0
              },
              timestamp: Date.now()
            });
          })
          .catch(err => {
            console.warn("[Injected Geolocation] fallback to original", err);
            original(success, error, options);
          });
      } else {
        console.warn("[Injected Geolocation] window.electronGetLocation not available");
        original(success, error, options);
      }
    };
  `;

    const script = document.createElement('script');
    script.textContent = patchScript;
    document.documentElement.appendChild(script);
});
