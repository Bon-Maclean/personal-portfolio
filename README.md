# Portfolio

A hand-coded (no framework) aerospace engineering portfolio: plain HTML, CSS, and vanilla JS.

## Files

- `index.html` — all page content
- `style.css` — all styling
- `script.js` — small interactive touches (live readout, scroll reveal, active nav highlight)
- `resume.pdf` — add your own résumé here (referenced by the nav + footer links)

## Customize it

1. Open `index.html` and replace:
   - "Alex Rivera" → your name (appears in `<title>`, nav, footer)
   - Hero copy, personal line, and the three project cards under `#work`
   - Timeline entries under `#journey`
   - Tools list under `#systems`
   - Email / LinkedIn / GitHub links in the footer
2. Drop your real `resume.pdf` next to `index.html`.
3. Swap the accent color if you want — it's one variable: `--accent` in `style.css`.

## Deploy on GitHub Pages (free)

1. Create a new **public** repository on GitHub (e.g. `portfolio`).
2. Add these files to it — either drag-and-drop through the GitHub web UI, or:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/portfolio.git
   git push -u origin main
   ```
3. In the repo, go to **Settings → Pages**.
4. Under "Build and deployment," set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`. Save.
5. Your site goes live at `https://YOUR-USERNAME.github.io/portfolio/` within a couple of minutes.

### Adding a custom domain

1. Buy a domain anywhere (Hostinger, Namecheap, etc.).
2. Still in **Settings → Pages**, enter your domain (e.g. `yourname.com`) under "Custom domain" and save — this creates a `CNAME` file in your repo.
3. At your domain registrar's DNS settings, add:
   - Four **A** records for the apex domain (`yourname.com`) pointing to GitHub's IPs:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - A **CNAME** record for `www` pointing to `YOUR-USERNAME.github.io`
4. Wait for DNS to propagate (usually under a few hours), then check "Enforce HTTPS" back in the Pages settings once it's available.
