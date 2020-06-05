export const capitalize = (string) => {
  if (typeof string === 'string') {
    return string.replace(string.charAt(), string.charAt().toUpperCase());
  }
}