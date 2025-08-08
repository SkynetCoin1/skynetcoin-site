
# Skynet Coin Site — Revamp

**What changed**
- Split CSS/JS to `/assets`
- Added SEO (OG/Twitter/canonical), `site.webmanifest`, `robots.txt`, `sitemap.xml`
- RU/EN i18n switcher
- Social/contact placeholders
- Analytics toggle (GA4, disabled by default)
- Kept color scheme and logo (place your `assets/img/logo.png` and `assets/img/background.png`)

**Deploy to GitHub Pages**
1. Put your logo at `assets/img/logo.png` (PNG/SVG) and background at `assets/img/background.png`.
2. Commit and push to `main` (or `gh-pages`). In repo settings → Pages → select branch `/root`.
3. Replace `https://example.com/` in `index.html`, `robots.txt`, and `sitemap.xml` with your domain.
4. To enable GA4: set `window.SKY.ENABLE_GA4=true` and `GA4_ID` in `/assets/js/main.js`.
5. Update social links and email in `/assets/js/main.js` (window.SKY.SOCIALS).

**Security notes**
- Do not expose private keys or admin secrets in client files.
- Any on-chain actions should be handled via audited contracts or a secure backend.
