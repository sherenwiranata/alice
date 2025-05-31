window.addEventListener("DOMContentLoaded", () => {
  const circle = document.getElementById('startCircle');
  const introOverlay = document.getElementById('introOverlay');
  const whisper = document.getElementById('whisperSound');
  const giggle = document.getElementById('giggleSound');
  const moneyFall = document.getElementById('moneyFallSound');
  const curious = document.getElementById('curiositySound');
  const creepyVoice = document.getElementById('creepyVoiceSound');
  const background = document.getElementById('backgroundSound');
  const layers = document.getElementById('layers');
  const objects = document.querySelectorAll('.object-wrapper');
  const magicalDoor = document.querySelector('.magical-door');
  const doorHoverSound = document.getElementById('doorClickSound');
  magicalDoor.addEventListener('click', () => {
    if (!started) return;
    doorHoverSound.currentTime = 0;
    doorHoverSound.play();
  });
  
  // State variables
  let audioUnlocked = false;
  let started = false;
  let isEvading = false;
  let scrollTriggers = {
    10: { sound: whisper, played: false },
    50: { sound: moneyFall, played: false },
    1000: { sound: background, played: false },
    1500: { sound: giggle, played: false },
    2000: { sound: curious, played: false },
    4000: { sound: whisper, played: false },
    8000: { sound: creepyVoice, played: false }
  };

  
  // === Evading circle ===
  function moveCircle() {
    if (!isEvading) return;
    const x = Math.random() * (window.innerWidth - 60);
    const y = Math.random() * (window.innerHeight - 60);
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
  }

  // ************** sound ************ //
  const soundMap = {
    scrollWhisper: document.getElementById('scrollWhisper'),
    dontBeScared: document.getElementById('dontBeScared')
  };
  
  let whisperCooldown = false;
  
  document.querySelectorAll('.whisper-hover').forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (!started || whisperCooldown) return;  // 👈 block until started is true

    const soundId = el.dataset.sound;
    const audio = soundMap[soundId];
    if (audio) {
      audio.currentTime = 0;
      audio.play();
      whisperCooldown = true;
      setTimeout(() => whisperCooldown = false, 2000);
    }
  });
});

  
  // ****** cursor ****** //
  window.addEventListener('mousemove', (e) => {
    updateLightingWithMouse(e.clientY);
  });

  circle.addEventListener('mouseenter', moveCircle);

  circle.addEventListener('click', () => {
    if (!audioUnlocked) {
      whisper.volume = 0.0;
      whisper.play().then(() => {
        whisper.pause();
        whisper.currentTime = 0;
        whisper.volume = 0.4;
        audioUnlocked = true;
      }).catch(console.warn);
    }

    if (!started) {
      started = true;
      isEvading = true;
      const evasionInterval = setInterval(moveCircle, 300);

      setTimeout(() => {
        clearInterval(evasionInterval);
        isEvading = false;

        introOverlay.style.transition = "opacity 1.5s ease";
        circle.style.transition = "opacity 1.5s ease";
        introOverlay.style.opacity = "0";
        circle.style.opacity = "0";

        setTimeout(() => {
          introOverlay.style.display = "none";
          circle.style.display = "none";
          document.body.classList.add('cursor-active'); // 👈 this line is new
        }, 1500);
      }, 1000);
    }
  });

  // === Lighting effect based on vertical cursor position ===
  function updateLightingWithMouse(mouseY) {
    objects.forEach(wrapper => {
      const rect = wrapper.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const distance = Math.abs(centerY - mouseY);
      const brightness = Math.max(0.2, 1 - distance / 500);
      const blur = Math.min(5, distance / 300);

      const image = wrapper.querySelector('.centered-image');
      if (image) {
        image.style.filter = `
          brightness(${brightness})
          drop-shadow(0 0 30px rgba(0, 0, 0, 0.6))
        `;
      }
    });
  }

  // === Scroll interactions ===
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    layers.style.transform = `translateZ(${scrollY}px)`;

    if (audioUnlocked) {
      for (const trigger in scrollTriggers) {
        const { sound, played } = scrollTriggers[trigger];
        if (scrollY > trigger && !played) {
          sound.play();
          scrollTriggers[trigger].played = true;
        }
      }
    }
  });

  // Extend scrollable height
  document.body.style.height = '13000px';
});

