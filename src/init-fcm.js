import * as firebase from "firebase/app";
import "firebase/messaging";

const initializedFirebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAvmhcu-Dv-uWJBgsbq1I6MTgMG9iS0s5U",
    authDomain: "fcmtest-4e427.firebaseapp.com",
    databaseURL: "https://fcmtest-4e427.firebaseio.com",
    projectId: "fcmtest-4e427",
    storageBucket: "fcmtest-4e427.appspot.com",
    messagingSenderId: "690677624901",
    appId: "1:690677624901:web:d30a3ba1ba72394a79732c",
    measurementId: "G-LZNPDYBYR4"
});

const messaging = initializedFirebaseApp.messaging();

messaging.usePublicVapidKey(
  "BM5cnFH5mHIXNfApe66-V-8yeFWKnGL6NUvsn3NDB6E4fmanZ2A83cVq5WPo0iZ_zw7OD_7ffq_hRe1f3QKFlH0"
);

export { messaging };