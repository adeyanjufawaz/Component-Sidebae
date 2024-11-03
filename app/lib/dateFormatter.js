export const formmatedDate = () => {
const date = new Date();
  const data = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return data
}
