// ╔══════════════════════════════════════════════════════════╗
// ║            CONFIG — edit freely                          ║
// ╚══════════════════════════════════════════════════════════╝
const CONFIG = {

  // ── PAGE IDENTITY ──────────────────────────────────────────
  pageLabel:    "Benin Kingdom · Emblem of FESTAC ’77",
  title:        "The Queen Idia Mask",
  subtitle:     "Iyoba of Benin · An immersive encounter with a living object",

  // ── WEB-AR EMBED ───────────────────────────────────────────
  // Replace the entire src string below with your new embed URL
  arEmbedSrc: "https://projects.web-ar.studio/configurator/870b17b547/?id=2694488929_488938&is_transparent_bg=true&activate_ar=true",
  // Permissions the iframe needs (comma-separated)
  arPermissions: "camera;autoplay;xr-spatial-tracking",

  // ── STORY CONTENT ──────────────────────────────────────────
  // Each paragraph is a separate string in the array.
  // Add, remove, or reorder as needed.
  story: [
    "The Queen Idia mask — also known as the Benin ivory pendant mask or Queen Mother pendant mask — is one of the most celebrated works of art from the Benin Kingdom, in present-day Nigeria. Carved in the 16th century, it is believed to represent Iyoba Idia, mother of Oba Esigie, who ruled Benin in the early 1500s. Worked in ivory with metal inlay, it was worn by the Oba during important court ceremonies, especially rituals connected to protection and spiritual power.",
    "Idia was remembered in Benin history as a powerful and influential mother of a king — in Edo tradition, “the only woman who went to war.” In her honour, Oba Esigie created the title of Iyoba, or Queen Mother, in gratitude for her support and her contributions to his military success. The mask’s details carry meaning of their own: the ivory speaks of purity, while the iron inlays set near the eyes symbolise strength and medicinal power.",
    "The mask drew renewed global attention in 1977, when Nigeria hosted FESTAC ’77 — the Second World Black and African Festival of Arts and Culture. The Queen Idia mask was chosen as the festival emblem because it embodied African heritage, royal dignity, and resistance to cultural loss. Since the original had been taken from Benin during the British punitive expedition of 1897, the Edo artist Erhabor Emokpae was commissioned to recreate it, turning the mask into a powerful symbol of cultural pride and historical memory.",
    "Today, the Queen Idia mask remains an enduring symbol of Benin artistry and Nigerian cultural identity. It is admired not only as a masterpiece of African court art, but as a reminder of the value of heritage, the resilience of memory, and the importance of preserving cultural treasures for the generations still to come.",
  ],

  // ── PULL QUOTE ─────────────────────────────────────────────
  pullQuote: "The only woman who went to war.",
  pullQuoteSource: "— Edo tradition, of Iyoba Idia",

  // ── MUSIC ──────────────────────────────────────────────────
  // Path to your audio file in the /music folder (e.g. "music/track.mp3"),
  // or leave empty ("") to hide the player
  musicSrc:    "music/voice-over.mp3",
  musicTrack:  "The Queen Idia Mask — Narration",
  musicArtist: "FESTAC ’77 · Benin Kingdom",

};


// ╔══════════════════════════════════════════════════════════╗
// ║            LOGIC — no need to edit below                 ║
// ╚══════════════════════════════════════════════════════════╝

// ── Inject CONFIG into DOM ─────────────────────────────────────────────────────

// Page identity
document.getElementById('js-label').textContent    = CONFIG.pageLabel;
document.getElementById('js-title').textContent    = CONFIG.title;
document.getElementById('js-subtitle').textContent = CONFIG.subtitle;

// WebAR iframe
const frame = document.getElementById('js-ar-frame');
frame.src   = CONFIG.arEmbedSrc;
frame.allow = CONFIG.arPermissions;

// Story
const storyEl = document.getElementById('js-story');
CONFIG.story.forEach((para, i) => {
  const p = document.createElement('p');
  p.textContent = para;
  storyEl.appendChild(p);

  // Inject pull quote after second paragraph
  if (i === 1 && CONFIG.pullQuote) {
    const div  = document.createElement('div');
    div.className = 'story-quote';
    const qp   = document.createElement('p');
    qp.textContent = CONFIG.pullQuote;
    const cite = document.createElement('cite');
    cite.textContent = CONFIG.pullQuoteSource;
    div.appendChild(qp);
    div.appendChild(cite);
    storyEl.appendChild(div);
    const hr = document.createElement('div');
    hr.className = 'story-divider';
    storyEl.appendChild(hr);
  }
});

// ── Music Player ──────────────────────────────────────────────────────────────
const musicBar = document.getElementById('js-music-bar');

if (CONFIG.musicSrc) {
  musicBar.style.display = 'flex';

  document.getElementById('js-track-name').textContent = CONFIG.musicTrack;
  document.getElementById('js-artist').textContent     = CONFIG.musicArtist;

  const audio     = document.getElementById('js-audio');
  const playBtn   = document.getElementById('js-play-btn');
  const playIcon  = document.getElementById('js-play-icon');
  const progress  = document.getElementById('js-progress');
  const curEl     = document.getElementById('js-cur');
  const durEl     = document.getElementById('js-dur');
  const muteBtn   = document.getElementById('js-mute-btn');
  const volSlider = document.getElementById('js-vol');
  const volWave   = document.getElementById('js-vol-wave');

  audio.src    = CONFIG.musicSrc;
  audio.volume = parseFloat(volSlider.value);

  const fmt = s => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  const PLAY_ICON = `<polygon points="3,1 13,7 3,13"/>`;
  const PAUSE_ICON = `<rect x="2" y="1" width="4" height="12"/><rect x="8" y="1" width="4" height="12"/>`;

  let playing = false;

  playBtn.addEventListener('click', () => {
    if (playing) {
      audio.pause();
      playIcon.innerHTML = PLAY_ICON;
    } else {
      audio.play().catch(() => {});
      playIcon.innerHTML = PAUSE_ICON;
    }
    playing = !playing;
  });

  audio.addEventListener('loadedmetadata', () => {
    durEl.textContent = fmt(audio.duration);
  });

  audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    const pct = (audio.currentTime / audio.duration) * 100;
    progress.value = pct;
    curEl.textContent = fmt(audio.currentTime);
  });

  progress.addEventListener('input', () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
  });

  let muted = false;
  muteBtn.addEventListener('click', () => {
    muted = !muted;
    audio.muted = muted;
    volWave.style.opacity = muted ? '0.2' : '1';
  });

  volSlider.addEventListener('input', () => {
    audio.volume = parseFloat(volSlider.value);
    if (audio.volume > 0) { muted = false; audio.muted = false; }
  });
}
