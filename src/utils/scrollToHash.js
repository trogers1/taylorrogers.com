/**
 * Accepts a location object or a hash string. If `location` is an object, it extracts the hash
 * from that object, otherwise it uses the hash and causes the page to scroll to the position of
 * the first element it can find with that ID, if it can find one.
 *
 * @param {object or string} location - the location object, OR a hash string
 */
export default location => {
  let hash;
  if (typeof location === 'object') {
    ({ hash } = location);
  } else if (typeof location === 'string') {
    hash = location;
  } else {
    throw Error('Incorrect type received by scrollToHash(). Got: ', location);
  }
  if (hash) {
    const id = hash.replace(/#/g, '');
    if (document.getElementById(id)) {
      const scrollOffset = -60;
      const element = document.getElementById(id);
      const scrollTo = element.getBoundingClientRect().top + window.pageYOffset + scrollOffset;
      window.scrollTo({ top: scrollTo, behavior: 'smooth' });
    }
  }
};
