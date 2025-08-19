import {
  requestFirebaseNotificationPermission,
  onMessageListener,
} from "../fireBase/fireBase";

export const initFirebaseNotifications = () => {
  requestFirebaseNotificationPermission().then((token) => {
    if (token) {
      console.log("FCM Token:", token);
      // Optionally: send token to backend
    } else {
      console.warn("No registration token available.");
    }
  });

  onMessageListener().then((payload) => {
    console.log("Message received:", payload);
    alert(`${payload.notification.title}: ${payload.notification.body}`);
  });
};
// utils/sendBirthdayNotificationIfToday.js
// const sendBirthdayNotificationIfToday = async (user, admin) => {
//   if (!user?.dateOfBirth) return;

//   let day, month;
//   const dob = user.dateOfBirth;
//   if (typeof dob === "string" && dob.includes('/')) {
//     const [dd, mm] = dob.split('/');
//     day = parseInt(dd, 10);
//     month = parseInt(mm, 10);
//   } else {
//     const date = new Date(dob);
//     day = date.getDate();
//     month = date.getMonth() + 1;
//   }

//   const today = new Date();
//   if (day === today.getDate() && month === today.getMonth() + 1 && user.fcmToken) {
//     const message = {
//       notification: {
//         title: `🎉 Happy Birthday, ${user.name || "User"}!`,
//         body: "We have a special surprise just for you 🎁",
//       },
//       token: user.fcmToken,
//     };
//     try {
//       await admin.messaging().send(message);
//       console.log("✅ Birthday notification sent to:", user.name || user._id);
//     } catch (err) {
//       console.error("❌ Failed to send birthday notification:", err);
//     }
//   }
// };

// module.exports = sendBirthdayNotificationIfToday;
