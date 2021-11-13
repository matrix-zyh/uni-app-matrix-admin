module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '{!(package)*.json,*.code-snippets,.!(browserslist)*rc}': ['prettier --write--parser json'],
  'package.json': ['prettier --write'],
  '*.vue': ['prettier --write', 'stylelint --fix --allow-empty-input'],
  '*.{scss,less,styl,css,html}': ['stylelint --fix --allow-empty-input', 'prettier --write']
}
