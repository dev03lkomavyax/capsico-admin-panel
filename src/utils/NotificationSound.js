// NotificationSound.js
import notificationSound from "@/assets/sounds/notification.wav"; // <-- your sound file

const playSound = () => {
  const audio = new Audio(notificationSound);
  audio.play();
};

export default playSound;
