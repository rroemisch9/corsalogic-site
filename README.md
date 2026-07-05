# CorsaLogic Website

Static multi-page site for corsalogic.com. No build step, no dependencies. Plain HTML, CSS, and a small amount of JavaScript.

## Structure

```
index.html        Home
services.html     Race engineering, strategy, data & LogiCAL
reports.html      Pre- and post-race report breakdown
work.html         "The Cars" photo showcase (lightbox included)
about.html        About the practice
contact.html      Contact details + form
css/style.css     All styling (brand tokens at the top)
js/main.js        Nav toggle, scroll reveals, lightbox
assets/           Logos extracted from the brand PDF + photos
```

## Before you publish: one thing to change

**Contact form.** The form posts to `https://formspree.io/f/YOUR_FORM_ID`. Create a free form at [formspree.io](https://formspree.io), copy your form ID into that URL, and submissions will arrive at robin@corsalogic.com. (Or delete the form and keep the email and phone links.)

## Publishing with GitHub Pages

1. Create a new repository on GitHub (e.g. `corsalogic-site`).
2. Upload everything in this folder to the repository (drag and drop works on github.com, or use git: `git init`, `git add .`, `git commit -m "Initial site"`, then push).
3. In the repo: **Settings > Pages**, set Source to **Deploy from a branch**, branch `main`, folder `/ (root)`.
4. The site goes live at `https://<your-username>.github.io/corsalogic-site/` within a minute or two.

### Pointing corsalogic.com at it

1. In **Settings > Pages > Custom domain**, enter `corsalogic.com` and save. GitHub creates a `CNAME` file in the repo.
2. At your domain registrar, add these DNS records:
   - Four `A` records for `corsalogic.com` pointing to: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - A `CNAME` record for `www` pointing to `<your-username>.github.io`
3. Back in GitHub Pages settings, tick **Enforce HTTPS** once the certificate is issued (can take up to an hour).

## Alternative: upload to your existing host

The site is plain files. Upload the entire folder contents to your host's web root (via its file manager or FTP) and it works as-is.

## Brand notes

- Colors: PMS 485 red `#FF0000`, black `#111`, off-white paper `#FAFAF7`, per the 2015 brand guidelines.
- Type: Helvetica Neue. Thin weight (200) is used only for named elements and headlines, never running copy, per the guidelines. Falls back to Helvetica/Arial on systems without it.
- Logos in `assets/` were extracted directly from the brand PDF at high resolution: `logo-red.png` (signature), `logo-reverse.png` (reverse application), `logo-c.png` (C element), `favicon.png`.

## Adding more car photos

Drop a JPEG into `assets/photos/` (full size) and `assets/photos/med/` (about 900px wide), then copy one of the `<figure>` blocks in `work.html` and update the filename, alt text, and caption.
