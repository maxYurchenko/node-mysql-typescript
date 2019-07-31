module.exports = {
  '*.{ts}': ['prettier --write', 'yarn lint:fix', 'git add']
};
