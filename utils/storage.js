const store = new Map();

function setShortLink(code, data) {
  store.set(code, { ...data, createdAt: Date.now() });
}

function getShortLink(code) {
  return store.get(code);
}

function isShortCodeAvailable(code) {
  return !store.has(code);
}

module.exports = { setShortLink, getShortLink, isShortCodeAvailable };
