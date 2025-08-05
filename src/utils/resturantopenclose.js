// Place this in src/utils/resturantopenclose.js
export function isRestaurantOpen(open, close) {
  const now = new Date();
  const [openH, openM] = open.split(':').map(Number);
  const [closeH, closeM] = close.split(':').map(Number);
  const openTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), openH, openM, 0, 0);
  const closeTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), closeH, closeM, 0, 0);

  // Handle closing after midnight
  if (closeTime <= openTime) {
    if (now >= openTime) return true;
    const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    return now >= nextMidnight && now < closeTime;
  }
  return now >= openTime && now < closeTime;
}
