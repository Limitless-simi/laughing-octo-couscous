// ╔══════════════════════════════════════════════════════════════════╗
// ║   CONFIG — this is the ONLY part most team members need to edit.  ║
// ║   Find your group below and fill in your own details.            ║
// ╚══════════════════════════════════════════════════════════════════╝
const CONFIG = {

  // ── SHARED SITE HEADER (top of the page) ──────────────────────────
  siteLabel:    "A Collective Exhibition · Cultural Artefacts in AR",
  siteTitle:    "Objects of Memory",
  siteSubtitle: "Three groups. Three artefacts. One shared archive.",

  // ── GROUPS ────────────────────────────────────────────────────────
  // Each team edits ONLY their own block. To edit:
  //   • groupName    → your team's name
  //   • objectTitle  → the name of your cultural object
  //   • contributors → list every team member between the [ ] quotes
  //   • arEmbedSrc   → paste your Web-AR embed link (leave the placeholder to show a "goes here" box)
  //   • musicSrc     → add your audio file to the /music folder, then put its path here
  //   • story        → each "..." is one paragraph; add or remove as needed
  //   • pullQuote    → an optional highlighted line (leave "" to skip)
  groups: [

    // ════════════════════ GROUP ONE (worked example) ════════════════════
    {
      groupName:    "Group One",
      objectTitle:  "The Queen Idia Mask",
      contributors: ["Add your name", "Add your name", "Add your name"],

      arEmbedSrc:    "https://projects.web-ar.studio/configurator/870b17b547/?id=2694488929_488938&is_transparent_bg=true&activate_ar=true",
      arPermissions: "camera;autoplay;xr-spatial-tracking",

      musicSrc:    "music/voice-over.mp3",
      musicTrack:  "The Queen Idia Mask — Narration",
      musicArtist: "FESTAC ’77 · Benin Kingdom",

      story: [
        "The Queen Idia mask — also known as the Benin ivory pendant mask or Queen Mother pendant mask — is one of the most celebrated works of art from the Benin Kingdom, in present-day Nigeria. Carved in the 16th century, it is believed to represent Iyoba Idia, mother of Oba Esigie, who ruled Benin in the early 1500s. Worked in ivory with metal inlay, it was worn by the Oba during important court ceremonies, especially rituals connected to protection and spiritual power.",
        "Idia was remembered in Benin history as a powerful and influential mother of a king — in Edo tradition, “the only woman who went to war.” In her honour, Oba Esigie created the title of Iyoba, or Queen Mother, in gratitude for her support and her contributions to his military success. The mask’s details carry meaning of their own: the ivory speaks of purity, while the iron inlays set near the eyes symbolise strength and medicinal power.",
        "The mask drew renewed global attention in 1977, when Nigeria hosted FESTAC ’77 — the Second World Black and African Festival of Arts and Culture. The Queen Idia mask was chosen as the festival emblem because it embodied African heritage, royal dignity, and resistance to cultural loss. Since the original had been taken from Benin during the British punitive expedition of 1897, the Edo artist Erhabor Emokpae was commissioned to recreate it, turning the mask into a powerful symbol of cultural pride and historical memory.",
        "Today, the Queen Idia mask remains an enduring symbol of Benin artistry and Nigerian cultural identity. It is admired not only as a masterpiece of African court art, but as a reminder of the value of heritage, the resilience of memory, and the importance of preserving cultural treasures for the generations still to come.",
      ],

      pullQuote:       "The only woman who went to war.",
      pullQuoteSource: "— Edo tradition, of Iyoba Idia",
    },

    // ════════════════════ GROUP TWO (edit me) ════════════════════
    {
      groupName:    "Group Two",
      objectTitle:  "Your Object Title Here",
      contributors: ["Team member 1", "Team member 2", "Team member 3"],

      arEmbedSrc:    "PASTE-YOUR-WEB-AR-EMBED-LINK-HERE",
      arPermissions: "camera;autoplay;xr-spatial-tracking",

      // Add your audio file to the /music folder, then set the path below,
      // e.g. musicSrc: "music/group-two.mp3"  (leave "" to hide the player)
      musicSrc:    "",
      musicTrack:  "Track title",
      musicArtist: "Group Two",

      story: [
        "Write your first paragraph here. Introduce your cultural object — what it is, where it comes from, and roughly when it was made.",
        "Write your second paragraph here. Explain its meaning, materials, or the people connected to it.",
        "Write your third paragraph here. Why does it still matter today?",
      ],

      pullQuote:       "",
      pullQuoteSource: "",
    },

    // ════════════════════ GROUP THREE (edit me) ════════════════════
    {
      groupName:    "Group Three",
      objectTitle:  "Your Object Title Here",
      contributors: ["Team member 1", "Team member 2", "Team member 3"],

      arEmbedSrc:    "PASTE-YOUR-WEB-AR-EMBED-LINK-HERE",
      arPermissions: "camera;autoplay;xr-spatial-tracking",

      // Add your audio file to the /music folder, then set the path below,
      // e.g. musicSrc: "music/group-three.mp3"  (leave "" to hide the player)
      musicSrc:    "",
      musicTrack:  "Track title",
      musicArtist: "Group Three",

      story: [
        "Write your first paragraph here. Introduce your cultural object — what it is, where it comes from, and roughly when it was made.",
        "Write your second paragraph here. Explain its meaning, materials, or the people connected to it.",
        "Write your third paragraph here. Why does it still matter today?",
      ],

      pullQuote:       "",
      pullQuoteSource: "",
    },

  ],
};


// ╔══════════════════════════════════════════════════════════════════╗
// ║   LOGIC — no need to edit below this line.                       ║
// ╚══════════════════════════════════════════════════════════════════╝

// ── Site header ───────────────────────────────────────────────────────────────
document.getElementById('js-site-label').textContent    = CONFIG.siteLabel;
document.getElementById('js-site-title').textContent    = CONFIG.siteTitle;
document.getElementById('js-site-subtitle').textContent = CONFIG.siteSubtitle;

// ── Build one section per group ────────────────────────────────────────────────
const groupsContainer = document.getElementById('js-groups');

CONFIG.groups.forEach((group, index) => {
  // Decorative separator between groups (not before the first one)
  if (index > 0) groupsContainer.appendChild(buildSeparator());

  const section = document.createElement('section');
  section.className = 'group';

  section.appendChild(buildHeader(group, index));
  if (group.musicSrc) section.appendChild(buildPlayer(group));
  section.appendChild(buildAR(group));
  section.appendChild(buildStory(group));

  // Stagger the reveal of this group's blocks as they scroll into view
  section.querySelectorAll('.reveal').forEach((el, k) => {
    el.style.transitionDelay = (k * 90) + 'ms';
  });

  groupsContainer.appendChild(section);
});

// ── Reveal-on-scroll (fade + slide up) ──────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// ── Decorative separator between group sections ────────────────────────────────
function buildSeparator() {
  const sep = document.createElement('div');
  sep.className = 'group-sep';
  sep.innerHTML = '<i></i>';
  return sep;
}

// ── Group header (index number, name, object title, contributors) ──────────────
function buildHeader(group, index) {
  const header = document.createElement('div');
  header.className = 'group-header reveal';

  const number = String(index + 1).padStart(2, '0');

  const contributors = (group.contributors && group.contributors.length)
    ? `<p class="group-contributors"><span>Contributors</span> ${group.contributors.join(' · ')}</p>`
    : '';

  header.innerHTML = `
    <span class="group-index">${number}</span>
    <p class="group-label">${group.groupName}</p>
    <h2 class="group-title">${group.objectTitle}</h2>
    ${contributors}
  `;
  return header;
}

// ── AR embed (or a "goes here" placeholder if no link yet) ──────────────────────
function buildAR(group) {
  const stage = document.createElement('div');

  if (/^https?:/i.test(group.arEmbedSrc || '')) {
    stage.className = 'ar-stage reveal';
    stage.innerHTML = `
      <div class="aureole"></div>
      <div class="ar-frame-wrap">
        <iframe allowfullscreen allow="${group.arPermissions || ''}" style="border:none;"></iframe>
      </div>`;
    stage.querySelector('iframe').src = group.arEmbedSrc;
  } else {
    stage.className = 'ar-placeholder reveal';
    stage.innerHTML = `
      <span>AR experience goes here</span>
      <small>Paste your Web-AR link into <code>arEmbedSrc</code> for this group in <code>script.js</code></small>`;
  }
  return stage;
}

// ── Story paragraphs (+ optional pull quote after the 2nd paragraph) ────────────
function buildStory(group) {
  const wrap = document.createElement('div');
  wrap.className = 'story-body reveal';

  (group.story || []).forEach((para, i) => {
    const p = document.createElement('p');
    p.textContent = para;
    wrap.appendChild(p);

    if (i === 1 && group.pullQuote) {
      const quote = document.createElement('div');
      quote.className = 'story-quote';
      const qp = document.createElement('p');
      qp.textContent = group.pullQuote;
      const cite = document.createElement('cite');
      cite.textContent = group.pullQuoteSource;
      quote.appendChild(qp);
      quote.appendChild(cite);
      wrap.appendChild(quote);

      const hr = document.createElement('div');
      hr.className = 'story-divider';
      wrap.appendChild(hr);
    }
  });
  return wrap;
}

// ── Audio player (self-contained, one per group) ───────────────────────────────
function buildPlayer(group) {
  const bar = document.createElement('div');
  bar.className = 'music-bar reveal';
  bar.innerHTML = `
    <button class="music-play-btn" aria-label="Play / Pause">
      <svg class="play-icon" width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
        <polygon points="3,1 13,7 3,13"/>
      </svg>
    </button>
    <div class="music-info">
      <div class="music-track-name">${group.musicTrack || ''}</div>
      <div class="music-artist">${group.musicArtist || ''}</div>
    </div>
    <div class="music-progress-wrap">
      <input type="range" class="music-progress" min="0" max="100" value="0" step="0.1" />
      <div class="music-time"><span class="cur">0:00</span><span class="dur">0:00</span></div>
    </div>
    <button class="music-vol-btn" aria-label="Toggle mute">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M9 3L5 6H2v4h3l4 3V3z"/>
        <path class="vol-wave" d="M11.5 5.5a3.5 3.5 0 0 1 0 5M13.5 3.5a6.5 6.5 0 0 1 0 9"/>
      </svg>
    </button>
    <input type="range" class="music-vol-slider" min="0" max="1" step="0.05" value="0.8" />
    <audio preload="metadata" loop></audio>
  `;

  const audio     = bar.querySelector('audio');
  const playBtn   = bar.querySelector('.music-play-btn');
  const playIcon  = bar.querySelector('.play-icon');
  const progress  = bar.querySelector('.music-progress');
  const curEl     = bar.querySelector('.cur');
  const durEl     = bar.querySelector('.dur');
  const muteBtn   = bar.querySelector('.music-vol-btn');
  const volSlider = bar.querySelector('.music-vol-slider');
  const volWave   = bar.querySelector('.vol-wave');

  audio.src    = group.musicSrc;
  audio.volume = parseFloat(volSlider.value);

  const fmt = s => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  const PLAY_ICON  = `<polygon points="3,1 13,7 3,13"/>`;
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

  audio.addEventListener('loadedmetadata', () => { durEl.textContent = fmt(audio.duration); });
  audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    progress.value = (audio.currentTime / audio.duration) * 100;
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

  return bar;
}
