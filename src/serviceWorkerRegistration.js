// This file handles service worker registration and notification functionality

// Function to generate notifications
export const notificationGenerator = (title, options = {}) => {
  // Check if the browser supports notifications
  if (!("Notification" in window)) {
    console.log("This browser does not support desktop notifications");
    return;
  }

  // Check if permission is already granted
  if (Notification.permission === "granted") {
    new Notification(title, options);
  }
  // If permission is not determined, request it
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification(title, options);
      }
    });
  }
};

// Service worker registration
export const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/service-worker.js");
      console.log("Service Worker registered with scope:", registration.scope);
    } catch (error) {
      console.error("Service Worker registration failed:", error);
    }
  }
};

// Initialize service worker
if (process.env.NODE_ENV === "production") {
  registerServiceWorker();
} 