/**
 * GREETING CARD WEB - PLAYFUL & AESTHETIC INTERACTIVE ENGINE
 * Theme: Magenta-Purple Gradient (#8A2387, #E94057, #F27121)
 * Features: 3D Envelope, Polaroid Gallery, Retro Vinyl (The 1975), Vintage Letter, Confetti Gift Box
 */

// ==========================================================================
// 1. DATA ASSETS: 20 MEMORY PHOTOS FROM IMAGE/ FOLDER
// ==========================================================================
const GALLERY_PHOTOS = [
  { file: "Image/WhatsApp Image 2026-09-21 at 17.10.32 (1).jpeg", title: "Momen Indah", date: "Kenangan Manis #1", pin: "🌸" },
  { file: "Image/WhatsApp Image 2026-09-21 at 17.10.32 (2).jpeg", title: "Senyuman Manis", date: "Kenangan Manis #2", pin: "✨" },
  { file: "Image/WhatsApp Image 2026-09-21 at 17.10.32.jpeg", title: "Ceria Selalu", date: "Kenangan Manis #3", pin: "⭐" },
  { file: "Image/WhatsApp Image 2026-09-21 at 17.10.34 (1).jpeg", title: "Hari Yang Indah", date: "Kenangan Manis #4", pin: "🌼" },
  { file: "Image/WhatsApp Image 2026-09-21 at 17.10.34 (2).jpeg", title: "Tawa Riang", date: "Kenangan Manis #5", pin: "🌷" },
  { file: "Image/WhatsApp Image 2026-09-21 at 17.10.34.jpeg", title: "Bersinar Terang", date: "Kenangan Manis #6", pin: "🎀" },
  { file: "Image/WhatsApp Image 2026-09-21 at 17.11.10.jpeg", title: "Pesona Cantik", date: "Kenangan Manis #7", pin: "🌸" },
  { file: "Image/WhatsApp Image 2026-09-21 at 17.21.35.jpeg", title: "Sinar Kebahagiaan", date: "Kenangan Manis #8", pin: "✨" },
  { file: "Image/WhatsApp Image 2026-09-21 at 17.21.36 (1).jpeg", title: "Gaya Anggun", date: "Kenangan Manis #9", pin: "⭐" },
  { file: "Image/WhatsApp Image 2026-09-21 at 17.21.36 (2).jpeg", title: "Ekspresi Manis", date: "Kenangan Manis #10", pin: "🌼" },
  { file: "Image/WhatsApp Image 2026-09-21 at 17.21.36.jpeg", title: "Potret Istimewa", date: "Kenangan Manis #11", pin: "🌹" },
  { file: "Image/WhatsApp Image 2026-09-21 at 17.21.37 (1).jpeg", title: "Matahari Pagi", date: "Kenangan Manis #12", pin: "💖" },
  { file: "Image/WhatsApp Image 2026-09-21 at 17.21.37.jpeg", title: "Bunga Hati", date: "Kenangan Manis #13", pin: "🌷" },
  { file: "Image/WhatsApp Image 2026-09-21 at 17.21.38 (1).jpeg", title: "Pesona Menawan", date: "Kenangan Manis #14", pin: "🎀" },
  { file: "Image/WhatsApp Image 2026-09-21 at 17.21.38 (2).jpeg", title: "Keceriaan Abadi", date: "Kenangan Manis #15", pin: "✨" },
  { file: "Image/WhatsApp Image 2026-09-21 at 17.21.38.jpeg", title: "Senyuman Hangat", date: "Kenangan Manis #16", pin: "🌸" },
  { file: "Image/WhatsApp Image 2026-09-21 at 17.21.39 (1).jpeg", title: "Dunia Bersamamu", date: "Kenangan Manis #17", pin: "⭐" },
  { file: "Image/WhatsApp Image 2026-09-21 at 17.21.39 (2).jpeg", title: "Detik Abadi", date: "Kenangan Manis #18", pin: "💖" },
  { file: "Image/WhatsApp Image 2026-09-21 at 17.21.39.jpeg", title: "Terindah & Abadi", date: "Kenangan Manis #19", pin: "🌼" },
  { file: "Image/WhatsApp Image 2026-09-21 at 17.21.40.jpeg", title: "Happy 21st Birthday, Fatma! 🎂", date: "Kenangan Manis #20", pin: "💖" }
];

// ==========================================================================
// 2. STATE MANAGEMENT & DOM ELEMENTS
// ==========================================================================
const state = {
  currentScreen: 'screen-envelope',
  currentSubview: null,
  envelopeOpened: false,
  isPlayingAudio: false,
  audioDuration: 0,
  galleryMode: 'desk', // 'desk' or 'grid'
  selectedWishCategory: 'Sesuatu yang lucu',
  wishSubmitted: false,
  polaroidDraggables: []
};

// DOM references
const audioEl = document.getElementById('bg-audio');
const floatingAudioPill = document.getElementById('floating-audio-pill');
const audioToggleBtn = document.getElementById('audio-toggle-btn');
const audioSoundWave = document.getElementById('audio-sound-wave');

// Screens
const screens = {
  envelope: document.getElementById('screen-envelope'),
  welcome: document.getElementById('screen-welcome'),
  menu: document.getElementById('screen-menu'),
  detail: document.getElementById('screen-detail')
};

// Subviews
const subviews = {
  journey: document.getElementById('subview-journey'),
  moment: document.getElementById('subview-moment'),
  playlist: document.getElementById('subview-playlist'),
  gift: document.getElementById('subview-gift')
};

// Navigation buttons
const btnTapSurprise = document.getElementById('btn-tap-surprise');
const btnBackToMenu = document.getElementById('btn-back-to-menu');
const detailCategoryBadge = document.getElementById('detail-category-badge');

// ==========================================================================
// 3. INITIALIZATION & LUCIDE ICONS
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }

  initAmbientCanvas();
  initSparkleTrail();
  initEnvelopeInteraction();
  initWelcomeInteraction();
  initMenuInteraction();
  initPolaroidGallery();
  initMomentView();
  initVinylPlaylist();
  initInteractiveWish();
  initLightbox();

  // Preload audio duration metadata
  audioEl.addEventListener('loadedmetadata', () => {
    state.audioDuration = audioEl.duration;
    updateDurationDisplay(audioEl.duration);
  });
});

// Helper for Lucide icons refresh
function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// ==========================================================================
// 4. SCREEN NAVIGATION WITH SMOOTH GSAP TRANSITIONS
// ==========================================================================
function switchScreen(targetScreenId) {
  const currentScreenEl = document.getElementById(state.currentScreen);
  const targetScreenEl = document.getElementById(targetScreenId);

  if (!targetScreenEl || targetScreenId === state.currentScreen) return;

  if (window.gsap) {
    // Smooth GSAP fade-out and slide-in
    gsap.to(currentScreenEl, {
      opacity: 0,
      y: -15,
      scale: 0.98,
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => {
        currentScreenEl.classList.remove('active');
        targetScreenEl.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });

        gsap.fromTo(targetScreenEl, 
          { opacity: 0, y: 25, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "back.out(1.2)" }
        );
      }
    });
  } else {
    currentScreenEl.classList.remove('active');
    targetScreenEl.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  state.currentScreen = targetScreenId;
}

// Open specific sub-menu inside Screen 4
function openSubMenu(subKey) {
  // Hide all subviews
  Object.keys(subviews).forEach(k => {
    if (subviews[k]) subviews[k].classList.add('hidden');
  });

  const targetSubview = subviews[subKey];
  if (!targetSubview) return;

  targetSubview.classList.remove('hidden');
  state.currentSubview = subKey;

  // Update badge title
  const badgeTitles = {
    journey: '📸 Galeri Kenangan',
    moment: '⏳ Warkah Istimewa',
    playlist: '💿 Piringan Hitam (The 1975)',
    gift: '🎁 Kotak Impian (Make a Wish)'
  };
  detailCategoryBadge.textContent = badgeTitles[subKey] || 'Kejutan Istimewa';

  switchScreen('screen-detail');

  // Subview specific initializers
  if (subKey === 'journey') {
    setTimeout(layoutPolaroids, 100);
  }
}

// Back to main menu
btnBackToMenu.addEventListener('click', () => {
  switchScreen('screen-menu');
});

// ==========================================================================
// 5. SCREEN 1: 3D ENVELOPE INTERACTION
// ==========================================================================
function initEnvelopeInteraction() {
  const envelopeBox = document.getElementById('envelope-box');
  const envelopeClickable = document.getElementById('envelope-clickable');
  const waxSealBtn = document.getElementById('wax-seal-btn');

  function openEnvelope() {
    if (state.envelopeOpened) return;
    state.envelopeOpened = true;

    // Confetti pop on wax seal
    triggerWaxSealSparkles();

    // Trigger visual opening
    envelopeBox.classList.add('is-opened');

    // Start background music automatically
    playAudio();

    // Show floating audio pill
    floatingAudioPill.classList.remove('hidden');

    // Smooth transition to Welcome Screen
    setTimeout(() => {
      switchScreen('screen-welcome');
    }, 1200);
  }

  if (envelopeClickable) {
    envelopeClickable.addEventListener('click', openEnvelope);
  }
  if (waxSealBtn) {
    waxSealBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openEnvelope();
    });
  }
}

function triggerWaxSealSparkles() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#FFD700', '#E94057', '#FF99C8', '#FFF']
    });
  }
}

// ==========================================================================
// 6. SCREEN 2: WELCOME CARD & SURPRISE TRIGGER
// ==========================================================================
function initWelcomeInteraction() {
  if (btnTapSurprise) {
    btnTapSurprise.addEventListener('click', () => {
      // Big celebratory confetti burst
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#8A2387', '#E94057', '#F27121', '#FFD166', '#FFF']
        });
      }

      // Button scale punch
      if (window.gsap) {
        gsap.to(btnTapSurprise, {
          scale: 0.92,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          onComplete: () => {
            switchScreen('screen-menu');
          }
        });
      } else {
        switchScreen('screen-menu');
      }
    });
  }
}

// ==========================================================================
// 7. SCREEN 3: MENU UTAMA INTERACTION
// ==========================================================================
function initMenuInteraction() {
  const surpriseCards = document.querySelectorAll('.surprise-card');
  surpriseCards.forEach(card => {
    const target = card.getAttribute('data-target');
    card.addEventListener('click', () => {
      // Micro bounce effect
      if (window.gsap) {
        gsap.to(card, {
          scale: 0.96,
          duration: 0.12,
          yoyo: true,
          repeat: 1,
          onComplete: () => {
            openSubMenu(target);
          }
        });
      } else {
        openSubMenu(target);
      }
    });

    // Keyboard accessibility (Enter or Space)
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openSubMenu(target);
      }
    });
  });
}

// ==========================================================================
// 8. SUBVIEW 1: JOURNEY (POLAROID PHOTO GALLERY & DRAGGABLE)
// ==========================================================================
function initPolaroidGallery() {
  const board = document.getElementById('polaroid-board');
  const btnShuffle = document.getElementById('btn-shuffle-polaroids');
  const btnToggleGrid = document.getElementById('btn-toggle-grid');

  if (!board) return;

  // Generate cards for all 20 photos
  board.innerHTML = '';
  GALLERY_PHOTOS.forEach((photo, idx) => {
    const card = document.createElement('div');
    card.className = 'polaroid-card';
    card.setAttribute('data-index', idx);

    card.innerHTML = `
      <div class="polaroid-washi"></div>
      <div class="polaroid-img-box">
        <img src="${encodeURI(photo.file)}" alt="${photo.title}" loading="lazy">
      </div>
      <div class="polaroid-meta">
        <div class="polaroid-title">${photo.title}</div>
        <div class="polaroid-date">${photo.date}</div>
      </div>
    `;

    // Click to open in Lightbox
    card.addEventListener('click', (e) => {
      // Prevent opening lightbox if it was a drag gesture
      if (card.classList.contains('was-dragged')) {
        card.classList.remove('was-dragged');
        return;
      }
      openLightbox(photo);
    });

    board.appendChild(card);
  });

  // Shuffle button
  if (btnShuffle) {
    btnShuffle.addEventListener('click', () => {
      if (state.galleryMode === 'grid') {
        toggleGalleryMode();
      }
      layoutPolaroids(true);
    });
  }

  // Toggle Grid / Desk mode
  if (btnToggleGrid) {
    btnToggleGrid.addEventListener('click', toggleGalleryMode);
  }

  function toggleGalleryMode() {
    if (state.galleryMode === 'desk') {
      state.galleryMode = 'grid';
      board.classList.add('grid-mode');
      btnToggleGrid.innerHTML = '<i data-lucide="shuffle"></i> Mode Meja Tersebar';
      // Disable draggables
      if (state.polaroidDraggables.length) {
        state.polaroidDraggables.forEach(d => d.disable());
      }
    } else {
      state.galleryMode = 'desk';
      board.classList.remove('grid-mode');
      btnToggleGrid.innerHTML = '<i data-lucide="layout-grid"></i> Mode Grid / Meja';
      layoutPolaroids(true);
      if (state.polaroidDraggables.length) {
        state.polaroidDraggables.forEach(d => d.enable());
      }
    }
    refreshIcons();
  }
}

// Distribute polaroids across the board randomly
function layoutPolaroids(animated = false) {
  const board = document.getElementById('polaroid-board');
  if (!board || state.galleryMode === 'grid') return;

  const cards = board.querySelectorAll('.polaroid-card');
  const boardWidth = board.clientWidth - 190;
  const boardHeight = Math.max(board.clientHeight - 240, 360);

  // Clean existing GSAP draggables
  if (state.polaroidDraggables.length) {
    state.polaroidDraggables.forEach(d => d.kill());
    state.polaroidDraggables = [];
  }

  cards.forEach((card, i) => {
    // Calculate balanced random distribution
    const cols = Math.min(Math.floor(cards.length / 3), 5);
    const row = Math.floor(i / cols);
    const col = i % cols;

    const slotX = (boardWidth / cols) * col + (Math.random() * 40 - 20) + 15;
    const slotY = 40 + (row * 120) + (Math.random() * 30 - 15);
    const rotation = (Math.random() * 16 - 8); // -8 deg to 8 deg

    if (animated && window.gsap) {
      gsap.to(card, {
        x: slotX,
        y: slotY,
        rotation: rotation,
        duration: 0.6,
        ease: "power2.out",
        delay: i * 0.03
      });
    } else {
      card.style.transform = `translate(${slotX}px, ${slotY}px) rotate(${rotation}deg)`;
    }

    // Initialize Draggable with GSAP
    if (window.Draggable) {
      let isMoved = false;
      const d = Draggable.create(card, {
        bounds: board,
        edgeResistance: 0.65,
        type: "x,y",
        onDragStart: function() {
          isMoved = true;
          card.classList.add('is-dragging', 'was-dragged');
          // Bring to front
          cards.forEach(c => c.style.zIndex = 1);
          card.style.zIndex = 100;
        },
        onDragEnd: function() {
          card.classList.remove('is-dragging');
          setTimeout(() => { isMoved = false; }, 100);
        }
      });
      state.polaroidDraggables.push(d[0]);
    }
  });
}

// ==========================================================================
// 9. SUBVIEW 2: MOMENT (VINTAGE LETTER & PETAL LOVE)
// ==========================================================================
function initMomentView() {
  const btnSendPetals = document.getElementById('btn-send-petals');
  if (btnSendPetals) {
    btnSendPetals.addEventListener('click', () => {
      spawnFloatingRosePetals(30);
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 40,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#ff758c', '#ff7eb3', '#E94057', '#ffd700']
        });
      }
    });
  }
}

function spawnFloatingRosePetals(count = 25) {
  const petals = ['🌸', '🌹', '🌺', '💖', '✨'];
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const petal = document.createElement('div');
      petal.className = 'floating-rose-petal';
      petal.textContent = petals[Math.floor(Math.random() * petals.length)];
      petal.style.cssText = `
        position: fixed;
        top: -30px;
        left: ${Math.random() * 100}vw;
        font-size: ${Math.random() * 1.5 + 1}rem;
        z-index: 1500;
        pointer-events: none;
        user-select: none;
        filter: drop-shadow(0 4px 6px rgba(0,0,0,0.2));
      `;
      document.body.appendChild(petal);

      if (window.gsap) {
        gsap.to(petal, {
          y: window.innerHeight + 60,
          x: `+=${Math.random() * 120 - 60}`,
          rotation: Math.random() * 360,
          duration: Math.random() * 3 + 3,
          ease: "sine.inOut",
          onComplete: () => petal.remove()
        });
      } else {
        setTimeout(() => petal.remove(), 4000);
      }
    }, i * 100);
  }
}

// ==========================================================================
// 10. SUBVIEW 3: PLAYLIST (RETRO VINYL & THE 1975)
// ==========================================================================
function initVinylPlaylist() {
  const vinylDisc = document.getElementById('vinyl-disc');
  const tonearm = document.getElementById('tonearm');
  const turntableLight = document.getElementById('turntable-light');
  const equalizerBars = document.getElementById('equalizer-bars');

  const btnPlayPause = document.getElementById('btn-audio-play-pause');
  const playPauseIcon = document.getElementById('play-pause-icon');
  const btnRewind = document.getElementById('btn-audio-rewind');
  const btnForward = document.getElementById('btn-audio-forward');

  const progressFill = document.getElementById('audio-progress-fill');
  const seekWrapper = document.getElementById('audio-seek-wrapper');
  const currentTimeDisplay = document.getElementById('audio-current-time');
  const durationDisplay = document.getElementById('audio-duration');

  // Play / Pause Master Button
  btnPlayPause.addEventListener('click', toggleAudioPlay);
  audioToggleBtn.addEventListener('click', toggleAudioPlay);

  // Turntable Vinyl Click
  if (vinylDisc) {
    vinylDisc.addEventListener('click', toggleAudioPlay);
  }

  // Rewind 10s
  if (btnRewind) {
    btnRewind.addEventListener('click', () => {
      audioEl.currentTime = Math.max(audioEl.currentTime - 10, 0);
    });
  }

  // Forward 10s
  if (btnForward) {
    btnForward.addEventListener('click', () => {
      audioEl.currentTime = Math.min(audioEl.currentTime + 10, audioEl.duration);
    });
  }

  // Seek bar click
  if (seekWrapper) {
    seekWrapper.addEventListener('click', (e) => {
      const rect = seekWrapper.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const ratio = Math.max(0, Math.min(1, clickX / rect.width));
      if (audioEl.duration) {
        audioEl.currentTime = ratio * audioEl.duration;
      }
    });
  }

  // Audio Time Update
  audioEl.addEventListener('timeupdate', () => {
    if (!audioEl.duration) return;
    const progress = (audioEl.currentTime / audioEl.duration) * 100;
    if (progressFill) progressFill.style.width = `${progress}%`;
    if (currentTimeDisplay) currentTimeDisplay.textContent = formatTime(audioEl.currentTime);
  });

  // Audio End
  audioEl.addEventListener('ended', () => {
    pauseAudio();
  });
}

function toggleAudioPlay() {
  if (state.isPlayingAudio) {
    pauseAudio();
  } else {
    playAudio();
  }
}

function playAudio() {
  audioEl.play().then(() => {
    state.isPlayingAudio = true;
    updateAudioUI(true);
  }).catch(err => {
    console.log("Audio play deferred awaiting user gesture:", err);
  });
}

function pauseAudio() {
  audioEl.pause();
  state.isPlayingAudio = false;
  updateAudioUI(false);
}

function updateAudioUI(isPlaying) {
  const vinylDisc = document.getElementById('vinyl-disc');
  const tonearm = document.getElementById('tonearm');
  const turntableLight = document.getElementById('turntable-light');
  const equalizerBars = document.getElementById('equalizer-bars');
  const playPauseIcon = document.getElementById('play-pause-icon');

  if (isPlaying) {
    if (vinylDisc) vinylDisc.classList.add('spinning');
    if (tonearm) tonearm.classList.add('on-record');
    if (turntableLight) turntableLight.classList.add('active');
    if (equalizerBars) equalizerBars.classList.add('active');
    if (audioSoundWave) audioSoundWave.classList.add('playing');
    if (playPauseIcon) playPauseIcon.setAttribute('data-lucide', 'pause');
  } else {
    if (vinylDisc) vinylDisc.classList.remove('spinning');
    if (tonearm) tonearm.classList.remove('on-record');
    if (turntableLight) turntableLight.classList.remove('active');
    if (equalizerBars) equalizerBars.classList.remove('active');
    if (audioSoundWave) audioSoundWave.classList.remove('playing');
    if (playPauseIcon) playPauseIcon.setAttribute('data-lucide', 'play');
  }

  refreshIcons();
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function updateDurationDisplay(dur) {
  const durationDisplay = document.getElementById('audio-duration');
  if (durationDisplay) durationDisplay.textContent = formatTime(dur);
}

// ==========================================================================
// 11. SUBVIEW 4: GIFT (INTERACTIVE WISH & WHATSAPP INTEGRATION)
// ==========================================================================
function initInteractiveWish() {
  const wishChips = document.querySelectorAll('.wish-option-chip');
  const wishTextarea = document.getElementById('wish-custom-text');
  const charCountEl = document.getElementById('char-count');
  const btnSubmitWish = document.getElementById('btn-submit-wish');
  const wishCardForm = document.getElementById('wish-card-form');
  const wishFeedbackCard = document.getElementById('wish-feedback-card');
  const summaryCategoryDisplay = document.getElementById('summary-category-display');
  const summaryTextDisplay = document.getElementById('summary-text-display');
  const btnWhatsappSend = document.getElementById('btn-whatsapp-send');
  const btnEditWish = document.getElementById('btn-edit-wish');

  // WhatsApp Destination Number (+6285797466502 -> 6285797466502)
  const WHATSAPP_PHONE = '6285797466502';

  // Format tanggal lahir untuk pesan WA
  function getTodayDate() {
    const now = new Date();
    const days = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
    const months = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
    return `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
  }

  // 1. Wish Category Chips Selection
  wishChips.forEach(chip => {
    chip.addEventListener('click', () => {
      wishChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const val = chip.getAttribute('data-value');
      state.selectedWishCategory = val;

      // Micro bounce animation
      if (window.gsap) {
        gsap.to(chip, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });
      }

      // If user chooses "Tulis Keinginan Sendiri", focus textarea with gentle highlight
      if (val === 'Tulis Keinginan Sendiri' && wishTextarea) {
        wishTextarea.focus();
        if (window.gsap) {
          gsap.fromTo(wishTextarea.parentElement, 
            { borderColor: '#E94057', scale: 1.02 }, 
            { borderColor: '#F0D9D5', scale: 1, duration: 0.6 }
          );
        }
      }
    });
  });

  // 2. Character counter for custom text
  if (wishTextarea && charCountEl) {
    wishTextarea.addEventListener('input', () => {
      charCountEl.textContent = wishTextarea.value.length;
    });
  }

  // 3. Submit Wish Interaction
  if (btnSubmitWish) {
    btnSubmitWish.addEventListener('click', () => {
      const selectedCategory = state.selectedWishCategory || 'Sesuatu yang lucu';
      const customText = (wishTextarea ? wishTextarea.value : '').trim();
      const displayNote = customText || '(Tiada catatan tambahan)';

      // Save to LocalStorage
      const wishPayload = {
        category: selectedCategory,
        note: customText,
        submittedAt: new Date().toISOString()
      };
      try {
        localStorage.setItem('user_birthday_wish', JSON.stringify(wishPayload));
      } catch (err) {
        console.log('LocalStorage save error:', err);
      }

      // Button micro-interaction
      if (window.gsap) {
        gsap.to(btnSubmitWish, { scale: 0.9, duration: 0.12, yoyo: true, repeat: 1 });
      }

      // Celebratory Confetti Burst across entire screen
      triggerGrandConfetti();

      // Smooth GSAP transition (Fade out form, reveal feedback)
      if (window.gsap) {
        gsap.to(wishCardForm, {
          opacity: 0,
          y: -25,
          scale: 0.95,
          duration: 0.4,
          ease: "power2.in",
          onComplete: () => {
            wishCardForm.classList.add('hidden');
            displayFeedback(selectedCategory, displayNote);
          }
        });
      } else {
        wishCardForm.classList.add('hidden');
        displayFeedback(selectedCategory, displayNote);
      }
    });
  }

  function displayFeedback(category, note) {
    if (!wishFeedbackCard) return;

    // Populate summary texts
    if (summaryCategoryDisplay) summaryCategoryDisplay.textContent = category;
    if (summaryTextDisplay) summaryTextDisplay.textContent = `"${note}"`;

    // Construct WhatsApp message & link
    const todayDate = getTodayDate();
    const waMessage =
`✨🎂 *UCAPAN ULANG TAHUN KE-21* 🎂✨
━━━━━━━━━━━━━━━━━━━━━
💌 *Untuk:* Septi Nur Fatma
📅 *Tanggal:* ${todayDate}
━━━━━━━━━━━━━━━━━━━━━

Halo! Fatma baru saja membuka surprise website ulang tahun ke-21 yang aku buat khusus untukmu! 🎉

Dan ini adalah *Wishlist Impian* Fatma:

🎁 *Kategori Pilihan:*
   ➜ ${category}

📝 *Catatan / Keinginan:*
   "${note}"

━━━━━━━━━━━━━━━━━━━━━
💖 Semoga di hari ulang tahun yang ke-21 ini semua impian Fatma segera terkabul ya! Selamat ulang tahun, Septi Nur Fatma! 🌸✨🎈

_Dikirim melalui: Birthday Surprise Website_ 💌`;
    const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(waMessage)}`;

    if (btnWhatsappSend) {
      btnWhatsappSend.setAttribute('href', waUrl);
    }

    // Reveal Feedback Card
    wishFeedbackCard.classList.remove('hidden');
    refreshIcons();

    if (window.gsap) {
      gsap.fromTo(wishFeedbackCard, 
        { opacity: 0, y: 35, scale: 0.93 },
        { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "back.out(1.3)" }
      );
    }
  }

  // 4. Edit / Resubmit button
  if (btnEditWish) {
    btnEditWish.addEventListener('click', () => {
      if (window.gsap) {
        gsap.to(wishFeedbackCard, {
          opacity: 0,
          y: 20,
          scale: 0.95,
          duration: 0.3,
          onComplete: () => {
            wishFeedbackCard.classList.add('hidden');
            wishCardForm.classList.remove('hidden');
            gsap.fromTo(wishCardForm,
              { opacity: 0, y: -20, scale: 0.95 },
              { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power2.out" }
            );
          }
        });
      } else {
        wishFeedbackCard.classList.add('hidden');
        wishCardForm.classList.remove('hidden');
      }
    });
  }

  // 5. Check if wish was previously stored in LocalStorage
  try {
    const savedWish = localStorage.getItem('user_birthday_wish');
    if (savedWish) {
      const parsed = JSON.parse(savedWish);
      if (parsed.category) {
        wishChips.forEach(c => {
          if (c.getAttribute('data-value') === parsed.category) {
            c.classList.add('active');
            state.selectedWishCategory = parsed.category;
          } else {
            c.classList.remove('active');
          }
        });
      }
      if (parsed.note && wishTextarea) {
        wishTextarea.value = parsed.note;
        if (charCountEl) charCountEl.textContent = parsed.note.length;
      }
    }
  } catch (err) {
    console.log('Error reading previous wish from LocalStorage:', err);
  }
}

function triggerGrandConfetti() {
  if (typeof confetti !== 'function') return;

  const count = 200;
  const defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio, opts) {
    confetti(Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio)
    }));
  }

  fire(0.25, { spread: 26, startVelocity: 55 });
  fire(0.2, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });
}

// ==========================================================================
// 12. LIGHTBOX MODAL FOR POLAROIDS
// ==========================================================================
function initLightbox() {
  const modal = document.getElementById('polaroid-lightbox');
  const backdrop = document.getElementById('lightbox-backdrop');
  const closeBtn = document.getElementById('lightbox-close');

  function closeLightbox() {
    modal.classList.add('hidden');
  }

  if (backdrop) backdrop.addEventListener('click', closeLightbox);
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeLightbox();
    }
  });
}

function openLightbox(photo) {
  const modal = document.getElementById('polaroid-lightbox');
  const img = document.getElementById('lightbox-img');
  const title = document.getElementById('lightbox-title');
  const date = document.getElementById('lightbox-date');

  img.src = encodeURI(photo.file);
  img.alt = photo.title;
  title.textContent = photo.title;
  date.textContent = `${photo.date} • Sentiasa di Hati ❤️`;

  modal.classList.remove('hidden');
}

// ==========================================================================
// 13. AMBIENT BACKGROUND CANVAS (SPARKLES & HEARTS)
// ==========================================================================
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = 45;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 1,
      speedY: Math.random() * 0.7 + 0.3,
      speedX: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.7 + 0.2,
      pulse: Math.random() * 0.05 + 0.01,
      type: Math.random() > 0.8 ? 'heart' : 'sparkle'
    });
  }

  function drawHeart(x, y, size, opacity) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(size / 10, size / 10);
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.6})`;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-5, -5, -10, 2, 0, 10);
    ctx.bezierCurveTo(10, 2, 5, -5, 0, 0);
    ctx.fill();
    ctx.restore();
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.y -= p.speedY;
      p.x += p.speedX;
      p.opacity += Math.sin(Date.now() * 0.002) * p.pulse;

      // Wrap around
      if (p.y < -20) {
        p.y = height + 20;
        p.x = Math.random() * width;
      }
      if (p.x < -20) p.x = width + 20;
      if (p.x > width + 20) p.x = -20;

      const alpha = Math.max(0.1, Math.min(0.8, p.opacity));

      if (p.type === 'heart') {
        drawHeart(p.x, p.y, p.size * 2, alpha);
      } else {
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    requestAnimationFrame(render);
  }

  render();
}

// ==========================================================================
// 14. SPARKLE CURSOR TRAIL EFFECT
// ==========================================================================
function initSparkleTrail() {
  const canvas = document.getElementById('sparkle-trail');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  const sparkles = [];
  const colors = ['#FFD700', '#FF99C8', '#FFF', '#E94057', '#06D6A0'];

  function addSparkle(x, y) {
    sparkles.push({
      x,
      y,
      size: Math.random() * 5 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      speedX: (Math.random() - 0.5) * 2,
      speedY: (Math.random() - 0.5) * 2 - 0.5,
      decay: Math.random() * 0.03 + 0.02
    });
  }

  window.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.4) {
      addSparkle(e.clientX, e.clientY);
    }
  });

  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0 && Math.random() > 0.4) {
      addSparkle(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  function renderTrail() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = sparkles.length - 1; i >= 0; i--) {
      const s = sparkles[i];
      s.x += s.speedX;
      s.y += s.speedY;
      s.alpha -= s.decay;

      if (s.alpha <= 0) {
        sparkles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = s.alpha;
      ctx.fillStyle = s.color;
      ctx.beginPath();
      // Draw 4-pointed star
      const r = s.size;
      ctx.moveTo(s.x, s.y - r);
      ctx.quadraticCurveTo(s.x, s.y, s.x + r, s.y);
      ctx.quadraticCurveTo(s.x, s.y, s.x, s.y + r);
      ctx.quadraticCurveTo(s.x, s.y, s.x - r, s.y);
      ctx.quadraticCurveTo(s.x, s.y, s.x, s.y - r);
      ctx.fill();
      ctx.restore();
    }

    requestAnimationFrame(renderTrail);
  }

  renderTrail();
}
