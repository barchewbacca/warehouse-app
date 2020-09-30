const path = require('path');

module.exports = {
  '**/*.{ts,js,html,md}': files => {
    return [`nx format:check --files ${files.map(projectRelativePath).join(',')}`];
  },
  '**/*.scss': files => [`stylelint ${files.map(f => `"${f}"`).join(' ')}`],
};

function projectRelativePath(filePath) {
  return filePath.replace(__dirname + path.sep, '');
}
