# Objects of Memory — A Collective Exhibition

A webpage showing our collective group project: three groups, three cultural
artefacts, each presented in AR with its own narration and story.

## How to edit your group's section

**You only need to edit one file: [`script.js`](script.js).**

Open it and scroll to the `CONFIG` block at the top. Find your group
(`Group One`, `Group Two`, or `Group Three`) and fill in your details:

| Field | What to put |
|-------|-------------|
| `groupName` | Your team's name |
| `objectTitle` | The name of your cultural object |
| `contributors` | Every team member's name, each in quotes inside the `[ ]` |
| `arEmbedSrc` | Your Web-AR embed link (leave the placeholder to show a "goes here" box) |
| `musicSrc` | Path to your audio file, e.g. `"music/group-two.mp3"` (leave `""` to hide the player) |
| `musicTrack` / `musicArtist` | Labels shown on the audio player |
| `story` | Your paragraphs — each `"..."` is one paragraph |
| `pullQuote` / `pullQuoteSource` | An optional highlighted line (leave `""` to skip) |

### Adding your audio
1. Put your audio file (`.mp3`) in the **`music/`** folder.
2. Set `musicSrc` to its path, e.g. `"music/group-two.mp3"`.
3. Use a filename **without spaces** (use `-` instead).

### Tips
- Don't touch anything below the `LOGIC` line in `script.js`.
- Keep the commas, quotes, and `{ }` braces exactly as they are.
- Styling lives in [`styles.css`](styles.css); page structure in [`index.html`](index.html).

## What happens automatically
- Each group gets its **own accent colour** (amber → coral → jade) and a big
  index number (01 / 02 / 03) — you don't set these.
- The side **1 · 2 · 3 navigation** and the **footer year** update themselves
  from your groups, so adding a 4th group just works.
- Scroll animations and the cursor effects are automatic (and turn off for
  visitors who prefer reduced motion).

## Previewing your changes
Open [`index.html`](index.html) in a browser (double-click it). After editing,
**hard-refresh** with `Ctrl + Shift + R` so the browser reloads `script.js` and
`styles.css` instead of using cached copies.
