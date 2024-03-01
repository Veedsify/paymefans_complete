const { createHash } = require("crypto");

module.exports = function hashPassword(password) {
  const hash = createHash("sha256");
  hash.update(password);
  return hash.digest("hex");
};
