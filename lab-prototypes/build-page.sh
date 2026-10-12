#!/bin/sh
# usage: sh build-page.sh <id> [wide] < body.js   — wraps a page script in the shared HTML shell.
id=$1; cls=${2:-}
{
printf '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n<title>EY.ai Lab prototypes</title>\n<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Roboto+Mono&display=swap" rel="stylesheet">\n<link rel="stylesheet" href="assets/lab.css">\n<script src="assets/lab.js"></script>\n</head>\n<body data-page="%s">\n<main class="page %s"><section id="stage" class="stage glass"></section><aside id="side" class="side"></aside></main>\n<script>\nconst { C, s, h, $, clamp, lerp, ease, wait, tween, hexA, svg, arrow, text, node, edge, port, link, token, panzoom, zoomButtons, seg, slider, toggle, card, readout, kpis, legend, store, PAGES } = Lab;\nconst stage = $("stage"), side = $("side");\n' "$id" "$cls"
cat
printf '\n</script>\n</body>\n</html>\n'
} > "$id.html"
# syntax check the inline script
awk '/^<script>$/{f=1;next}/^<\/script>$/{f=0}f' "$id.html" > "/tmp/labcheck-$id.js" && node --check "/tmp/labcheck-$id.js" && echo "ok $id"
