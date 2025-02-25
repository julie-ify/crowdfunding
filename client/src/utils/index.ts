export const daysLeft = (deadline: number): string => {
  const now = Math.floor(Date.now() / 1000); // Current time in seconds
  const difference = deadline - now; // Time remaining in seconds

  if (difference <= 0) return "0"; // Deadline passed

  const remainingDays = difference / (60 * 60 * 24); // Convert seconds to days

  return Math.ceil(remainingDays).toString(); // Round up to avoid showing "0" when there's still time
};

export const calculateBarPercentage = (
  goal: number,
  raisedAmount: number
): number => {
  const percentage = Math.round((raisedAmount * 100) / goal);

  return percentage;
};

export const checkIfImage = (
  url: string,
  callback: (exists: boolean) => void
): void => {
  const img = new Image();
  img.src = url;

  if (img.complete) {
    callback(true);
  }

  img.onload = () => callback(true);
  img.onerror = () => callback(false);
};
