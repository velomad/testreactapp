importScripts("https://www.gstatic.com/firebasejs/7.15.5/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.15.5/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyAvmhcu-Dv-uWJBgsbq1I6MTgMG9iS0s5U",
  authDomain: "fcmtest-4e427.firebaseapp.com",
  databaseURL: "https://fcmtest-4e427.firebaseio.com",
  projectId: "fcmtest-4e427",
  storageBucket: "fcmtest-4e427.appspot.com",
  messagingSenderId: "690677624901",
  appId: "1:690677624901:web:d30a3ba1ba72394a79732c",
  measurementId: "G-LZNPDYBYR4"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true
    })
    .then(windowClients => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        windowClient.postMessage(payload);
      }
    })
    .then(() => {
      return registration.showNotification("This is hapenning for real tho..");
    });
  return promiseChain;
});

self.addEventListener('notificationclick', function(event) {
  // do what you want
  // ...
});