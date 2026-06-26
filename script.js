// ╔══════════════════════════════════════════════════════════╗
// ║            CONFIG — edit freely                          ║
// ╚══════════════════════════════════════════════════════════╝
const CONFIG = {

  // ── PAGE IDENTITY ──────────────────────────────────────────
  pageLabel:    "Cultural Artefact · AR Experience",
  title:        "The Vessel of Memory",
  subtitle:     "An immersive encounter with a living object",

  // ── WEB-AR EMBED ───────────────────────────────────────────
  // Replace the entire src string below with your new embed URL
  arEmbedSrc: "https://projects.web-ar.studio/configurator/870b17b547/?id=2694488929_488938&is_transparent_bg=true&activate_ar=true",
  // Permissions the iframe needs (comma-separated)
  arPermissions: "camera;autoplay;xr-spatial-tracking",

  // ── STORY CONTENT ──────────────────────────────────────────
  // Each paragraph is a separate string in the array.
  // Add, remove, or reorder as needed.
  story: [
    "Long before the archive, there was the object. Carved from memory and fired in silence, this vessel travelled across generations as both record and ritual — a thing that held not water but time itself. To hold it is to hold a conversation that never ended.",
    "The craftspeople who shaped these forms understood something the digital age is only beginning to rediscover: that an artefact is not a copy of experience but an extension of it. The body knows this. The hands know this first.",
    "In bringing this object into augmented space, we are not modernising it. We are asking what it already knew about the future — the way sacred things always do.",
  ],

  // ── PULL QUOTE ─────────────────────────────────────────────
  pullQuote: "The object does not belong to the past. It belongs to whoever is willing to look.",
  pullQuoteSource: "— Oral tradition, transcribed",

  // ── MUSIC ──────────────────────────────────────────────────
  // Path to your audio file in the /music folder (e.g. "music/track.mp3"),
  // or leave empty ("") to hide the player
  musicSrc:    "music/voice-over.mp3",
  musicTrack:  "Echoes of the Compound",
  musicArtist: "Unknown · Field Recording, Lagos 1974",

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
