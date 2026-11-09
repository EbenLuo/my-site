# Learning HTML

The learning website for **Web Technologies 2026** at BiUH: four pages, one
stylesheet and a little JavaScript.

- Live: https://ebenluo.github.io/my-site/
- Repository: https://github.com/EbenLuo/my-site

## Pages

| Page | What it is |
|---|---|
| `index.html` | Hero image and an overview of the site |
| `quotes.html` | Sixteen quotes, with a random quote in the hero |
| `project.html` | Five project ideas with a reader, four pages and a smallest version |
| `machine.html` | A useless machine and a twenty-second game |

## How it is built

- Semantic HTML: landmarks, one `h1` per page, a skip link, labelled controls.
- One external stylesheet: `style.css`.
- Navigation written once in `nav.html` and injected by `nav.js`.
- `quotes.js` reads the quote list and picks a random one.
- `machine.js` runs the useless machine and the game.
- No framework, no build step, no server, no database.

## Run it locally

`nav.js` uses `fetch()`, so open the site through a server, not `file://`:

```bash
cd my-site
python -m http.server 8000
```

Then open <http://localhost:8000/>.

## Images and credits

- `images/hero.jpg`: “Laptop on a desk (Unsplash)” by Aleksi Tappura, CC0,
  via Wikimedia Commons. See `CREDITS.md`.
- `images/og-image.jpg`, `images/apple-touch-icon.png` and
  `images/favicon-32.png`: made for this project from `design/og-poster.html`
  and `design/icon.html`.

## Course

- Brief: https://webtech.landrock.io/slides/assignment.html
- Course: https://webtech.landrock.io
