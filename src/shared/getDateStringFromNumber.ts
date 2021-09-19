export const getDateStringFromNumber = (timestamp?: number | null) => {
  if (!timestamp) {
    return 'Never';
  }
  return new Date(timestamp).toLocaleTimeString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour12: false,
  });
};
