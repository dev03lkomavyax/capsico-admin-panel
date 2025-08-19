


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from 'firebase/messaging';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCM5dUavMQX9nTQkhTJ4xYEB1XYH2fncq0",
  authDomain: "capsico-project.firebaseapp.com",
  projectId: "capsico-project",
  storageBucket: "capsico-project.firebasestorage.app",
  messagingSenderId: "990122176528",
  appId: "1:990122176528:web:95af76fd341f382ac49a95",
  measurementId: "G-35FYPLJT22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);




const  messaging =  getMessaging(app);


export const requestFirebaseNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "BGR30YRKHDRKF8dDslYYc7A_Gy6R2qxLuP4lcKAuCOra5-VIehq-FdTqZKvSn1arCrTW6rAsZkkPckHdQo1i0A4", 
      });
      return token;
    }
    return null;
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });