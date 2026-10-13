# d0d.ai

The landing page for dOd, served by GitHub Pages at https://d0d.ai.

One static file, `index.html`, no build step, plus `og.png`, the image link
previews show, the icons, and what search engines and AI search read:
`robots.txt`, `sitemap.xml` (update its `lastmod` when the page changes) and
`llms.txt`. `analytics.js` loads Google Analytics on every page, carries ad tags
(`utm_*`, `gclid`, ...) onto workspace links, and logs clicks to the workspace
and to email. Logo icons are self-hosted in `icons/`; `404.html` is GitHub Pages'
not-found page. The page's structured data (JSON-LD in its head) repeats the FAQ
and pricing: change them together. The hero's demo asks dOd's live demo workspace
(`https://workspace.d0d.ai/try`) when it answers, and otherwise replays the
answers recorded in `demo.json` (it says "Live" or "Replay"). Re-record it when
the engine's answers change, from a notebook running the sample with a model:

    dod-notebook -demo -public -addr localhost:8080 &
    grep -o 'data-q="[^"]*"' index.html | cut -d'"' -f2 | dod-cloud -record-demo http://localhost:8080 > demo.json

A recording carries each answer's proof (the row under the read-back) and, for
the ambiguous question, its meanings; the ambiguous chip shows only when the
demo can answer it. Keep the chip headlines in `index.html` in step with the
numbers.

The earlier product site (agents at engine speed) is on the `full-site`
branch; the stealth holding page is in history before this one.
