# AI Lab visuals

Interactive visuals for explaining AI and governed AI delivery, in the EY.ai Lab style. Plain HTML, CSS and JavaScript: no build step.

- **`lab-prototypes/`**: the main set. A hub, a zoomable whiteboard and 28 interactive pages, from "what is AI" to "how the operating model changes". Start at `lab-prototypes/index.html`. See `lab-prototypes/README.md`.
- **`index.html`** and `01`–`04`: the first four governed-delivery visuals (governed loop, traceability web, human effort, drift detector).
- **`foundry-sort-hub.html`**: Sort routing simulator.

The live Foundry haiku loop lives in its own repository: https://github.com/trt-victor/haiku_builder

These are prototypes for discussion. Figures, company names and the EY engagement steps are illustrative placeholders.

```bash
python3 -m http.server 4180   # then open http://localhost:4180/lab-prototypes/
```
