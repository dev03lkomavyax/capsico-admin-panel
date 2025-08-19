importScripts("https://www.gstatic.com/firebasejs/10.4.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.4.0/firebase-messaging-compat.js");

firebase.initializeApp({
 apiKey: "AIzaSyCM5dUavMQX9nTQkhTJ4xYEB1XYH2fncq0",
  authDomain: "capsico-project.firebaseapp.com",
  projectId: "capsico-project",
  storageBucket: "capsico-project.firebasestorage.app",
  messagingSenderId: "990122176528",
  appId: "1:990122176528:web:95af76fd341f382ac49a95",
  measurementId: "G-35FYPLJT22"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("[firebase-messaging-sw.js] Received background message", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
