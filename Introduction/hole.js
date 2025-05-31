window.addEventListener("DOMContentLoaded", () => {
  const circle = document.getElementById('startCircle');
  const scrollPrompt = document.getElementById('scrollPrompt');
  const introOverlay = document.getElementById('introOverlay');
  const whisper = document.getElementById('whisperSound');
  const giggle = document.getElementById('giggleSound');
  const moneyFall = document.getElementById('moneyFallSound');
  const curious = document.getElementById('curiositySound');
  const creepyVoice = document.getElementById('creepyVoiceSound');
  const background = document.getElementById('backgroundSound');
  const layers = document.getElementById('layers');
  const objects = document.querySelectorAll('.object-wrapper');

  let whisperPlayed = false;
  let whisperReplayPlayed = false;
  let gigglePlayed = false;
  let moneyFallPlayed = false;
  let curiousPlayed = false;
  let creepyVoicePlayed = false;
  let unlockedAudio = false;
  let isEvading = false;
  let timerStarted = false;
  let backgroundPlayed = false;

  function moveCircle() {
    if (!isEvading) return;
    const x = Math.random() * (window.innerWidth - 60);
    const y = Math.random() * (window.innerHeight - 60);
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
  }

  circle.addEventListener('mouseenter', moveCircle);

  circle.addEventListener('click', () => {
    if (!unlockedAudio) {
      whisper.volume = 0.0;
      whisper.play().then(() => {
        whisper.pause();
        whisper.currentTime = 0;
        whisper.volume = 0.4;
        unlockedAudio = true;
      }).catch((e) => {
        console.warn("🚫 Audio failed to unlock:", e);
      });
    }

    if (!timerStarted) {
      timerStarted = true;
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
          if (scrollPrompt) scrollPrompt.style.display = "block";
        }, 1500);
      }, 3000);
    }
  });

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
          blur(${blur}px)
          drop-shadow(0 0 30px rgba(0, 0, 0, 0.6))
        `;
      }
    });
  }

  // Use mouse position to update lighting
  window.addEventListener('mousemove', (e) => {
    window.requestAnimationFrame(() => {
      updateLightingWithMouse(e.clientY);
    });
  });

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    layers.style.transform = `translateZ(${scrollY}px)`;

    if (scrollY > 2000 && unlockedAudio && !whisperPlayed) {
      whisper.play();
      whisperPlayed = true;
    }

    if (scrollY > 3000 && unlockedAudio && !moneyFallPlayed) {
      moneyFall.play();
      moneyFallPlayed = true;
    }

    if (scrollY > 5000 && unlockedAudio && !backgroundPlayed) {
      background.play();
      backgroundPlayed = true;
    }

    if (scrollY > 6000 && unlockedAudio && !gigglePlayed) {
      giggle.play();
      gigglePlayed = true;
    }

    if (scrollY > 10000 && unlockedAudio && !curiousPlayed) {
      curious.play();
      curiousPlayed = true;
    }

    if (scrollY > 13000 && unlockedAudio && !whisperReplayPlayed) {
      whisper.play();
      whisperReplayPlayed = true;
    }

    if (scrollY > 15000 && unlockedAudio && !creepyVoicePlayed) {
      creepyVoice.play();
      creepyVoicePlayed = true;
    }
  });

  document.body.style.height = '20000px';
});
