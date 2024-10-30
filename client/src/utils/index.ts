export const daysLeft = (deadline: number): string => {
	// deadline is a timestamp in seconds
	// converting seconds to milliseconds because solidity timestamp is in seconds while JS is in millisecond
  const difference = deadline * 1000 - Date.now();
  const remainingDays = difference / (1000 * 3600 * 24); // difference divided by 1 day in milliseconds

  return remainingDays.toFixed(0);
};

export const calculateBarPercentage = (goal: number, raisedAmount: number): number => {
  const percentage = Math.round((raisedAmount * 100) / goal);

  return percentage;
};

export const checkIfImage = (url: string, callback: (exists: boolean) => void): void => {
  const img = new Image();
  img.src = url;

  if (img.complete) {
    callback(true);
  }

  img.onload = () => callback(true);
  img.onerror = () => callback(false);
};
