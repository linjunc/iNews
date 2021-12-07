module.exports = {
    "src/**/\*{js,jsx,ts,tsx,md,html}": ["eslint", "prettier --write"],
    "src/**/*.scss": ["stylelint --fix", "git add"],
}