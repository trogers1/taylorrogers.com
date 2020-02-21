/**
 * Accepts a string and a number for the max number of characters desired.
 * If the string is longer than the max number of characters, it trims to the last full word within that limit.
 * If there are no spaces within the limit, it will do a hard truncate at the max length.
 * @param {array} string - the string to be truncated
 * @param {number} maxChars - a number to limit the number of characters in the returned string
 * @returns {string} the truncated version of the string
 */
const truncate = (string, maxChars) => {
  if (!string || string.length <= maxChars) {
    return string;
  }
  /*
  This regex greedily looks for a word somewhere near the
  maxChars length. However, entire thing will only match at the end
  of a word. If that pattern is not found, it will work backward from (max characters - 2) until it
  finds the end of a word.
  */
  const pattern = new RegExp(`(^.{0,${maxChars - 2}}[^\\s.?:;!,])[\\s.?:;!,]`);
  const match = string.match(pattern);
  if (match) {
    return match[1] + String.fromCharCode(8230);
  } else {
    return string.substring(0, maxChars) + String.fromCharCode(8230);
  }
};

export default truncate;
