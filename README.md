**Site config** – `public/config.json`:

- `name`, `tagline`: header
- `socials`: `x`, `linkedin`, `gh` URLs
- `centerLinks`: array of `{ "label", "url", "disabled" }`. Use `"isResume": true` and set `resumeUrl` for the resume link
- `resumeUrl`: Google Drive view link for resume
- `footer.showTime`, `footer.showWeather`: toggles
- `footer.location`: `city`, `region`, `country`, `lat`, `lon` for weather (Raleigh default)

**Page content** – JSON files in `public/content/` (each page fetches its own file):

- `me.json`: `title`, `paragraphs` (array of strings)
- `more-me.json`: same as me
- `workexp.json`: `title`, `tagline`, `entries` (each: `role`, `company`, `logo` (optional URL), `date`, `summary`)
- `fav-projects.json`: `title`, `tagline`, `entries` (each: `name`, `date`, `description`, `github`, `demo` (optional))
- `research.json`: `title`, `tagline`, `entries` (each: `title`, `date`, `summary`, `url` (optional link to paper))


## Deploy to GitHub Pages

1. In `vite.config.js` set `base: '/<repo>/'` (e.g. `base: '/portfolio/'`) so assets load correctly.
2. Run `npm run build`. Deploy the `dist` folder (e.g. push to a `gh-pages` branch and set Pages to that branch, or use a GitHub Actions workflow that builds and deploys `dist`).
