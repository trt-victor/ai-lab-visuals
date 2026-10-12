# EY.ai Lab visual prototypes

Twenty-nine interactive pages in the Lab style (dark, flowing ribbons, glass cards, yellow accent, Roboto), plus a hub.
They are prototypes to choose from and fine-tune, not finished assets.

## Open it
No build step and no server needed for normal use: open `index.html`.
For the self-test (it loads pages in frames) serve the folder:

```bash
cd lab-prototypes && python3 -m http.server 4180
```

Then open http://localhost:4180/ and, after editing, http://localhost:4180/selftest.html?poke=1

## What is here
| Group | Pages |
|---|---|
| Whiteboard · the 13 concepts | `whiteboard`, `01`–`13` |
| Prompts, agents & harnesses | `14` prompt engineering, `15` agentic loop / harness, `24` multi-agent patterns |
| Operating model | `16` builder, `17` before/after morph, `18` roles, `19` EY engagement arc |
| AI in the organisation | `20` leadership views, `21` prototype spoke, `25` maturity |
| Engineering safely | `22` testing, `23` SDLC build vs integrate |
| Strategy & risk | `26` economics, `27` build/buy/integrate, `28` security threats |

## How it is put together
- `assets/lab.css`: the design system (tokens, glass, layout, components).
- `assets/lab.js`: the page registry (`PAGES`: title, lede, and the question for the team), the shell (header, prev/next, decision bar), and small helpers for SVG (`svg`, `node`, `edge`, `link`, `token`, `panzoom`) and controls (`seg`, `slider`, `toggle`, `kpis`, `readout`).
- Each page is one self-contained HTML file. Its content and numbers sit in plain arrays at the top of its `<script>`, so wording can be changed without touching the drawing code.
- `build-page.sh` wraps a script in the shared HTML shell. It was used to generate the pages; you do not need it to edit them.

## Choosing and fine-tuning
Every page has a bar at the bottom: **Keep / Tweak / Drop** and a notes box. Marks are saved in the browser (`localStorage`) and summarised on the hub, where they can be exported as Markdown. They are per browser: to combine a team's views, each person exports and the files are merged.

## Things that are placeholders
- `19-engagement-arc`: the five step names, durations and EY teams are drafted, not taken from the deck.
- `21-prototype-spoke`: the "who in EY" names come from the Lab screen and need confirming.
- `26-economics`: all prices and capacities are illustrative inputs.
- `02-landscape`, `01-taxonomy`: company and model names are examples, not a ranking; licences vary per model version.
- `18-roles`, `17-before-after`, `25-maturity`, `20-ai-in-companies`: percentages and levels are illustrative.

## Layout
Pages are desktop-first (16:9) and collapse to one column under 1100 px, so they also work on the 1080-wide portrait kiosk. Fonts load from Google Fonts; an offline kiosk needs Roboto self-hosted.
