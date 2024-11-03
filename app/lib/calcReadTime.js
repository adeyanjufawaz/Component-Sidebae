export const calculateReadTime = (text) => {
  // Average reading speed in words per minute
  const wordsPerMinute = 200;
  // Split the text into words and get the count
  const words = text.trim().split(/\s+/).length;
  // Calculate read time in minutes
  const minutes = Math.ceil(words / wordsPerMinute);

  return `${minutes} mins`;
};

// Example usage
const text =
  "This is a sample text with enough words to estimate a reading time.";
const readTime = calculateReadTime(text);
console.log(`Estimated read time: ${readTime} min`);
