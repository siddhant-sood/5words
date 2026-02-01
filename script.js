const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const response = document.getElementById('response');


// Make the 'No' button even harder to click in a playful way
let noTrickCount = 0;
noBtn.addEventListener('mouseenter', () => {
  noTrickCount++;
  // Randomly choose a trick
  const trick = Math.floor(Math.random() * 3);
  if (trick === 0) {
    // Shrink and wiggle
    noBtn.style.transition = 'transform 0.2s';
    noBtn.style.transform = `scale(0.6) rotate(${Math.random() > 0.5 ? '-' : ''}20deg)`;
    setTimeout(() => {
      noBtn.style.transform = '';
    }, 400);
  } else if (trick === 1) {
    // Swap with Yes button
    const yesRect = yesBtn.getBoundingClientRect();
    const noRect = noBtn.getBoundingClientRect();
    yesBtn.style.transition = 'all 0.3s';
    noBtn.style.transition = 'all 0.3s';
    yesBtn.style.position = 'relative';
    noBtn.style.position = 'relative';
    const yesOffset = yesRect.left - noRect.left;
    yesBtn.style.left = `${-yesOffset}px`;
    noBtn.style.left = `${yesOffset}px`;
    setTimeout(() => {
      yesBtn.style.left = '';
      noBtn.style.left = '';
      yesBtn.style.position = '';
      noBtn.style.position = '';
    }, 500);
  } else {
    // Random jump in container
    const container = document.querySelector('.container');
    const btnRect = noBtn.getBoundingClientRect();
    const contRect = container.getBoundingClientRect();
    const maxX = contRect.width - btnRect.width;
    const maxY = contRect.height - btnRect.height - 40;
    const randX = Math.random() * maxX;
    const randY = Math.random() * maxY + 60;
    noBtn.style.position = 'absolute';
    noBtn.style.left = `${randX}px`;
    noBtn.style.top = `${randY}px`;
    setTimeout(() => {
      noBtn.style.position = '';
      noBtn.style.left = '';
      noBtn.style.top = '';
    }, 800);
  }
  // Playful message after several attempts
  if (noTrickCount > 4) {
    response.textContent = "Nope! You can't say no! 💘";
  }
});

noBtn.addEventListener('click', (e) => {
  e.preventDefault();
  response.textContent = "Nice try, but you can't say no! 💘";
});

yesBtn.addEventListener('click', () => {
  response.innerHTML = "Yay! You made my day! 🌹💖";
  yesBtn.style.display = 'none';
  noBtn.style.display = 'none';
  confetti();
});

// Fun confetti effect
function confetti() {
  for (let i = 0; i < 80; i++) {
    const conf = document.createElement('div');
    conf.className = 'confetti';
    conf.style.left = Math.random() * 100 + 'vw';
    conf.style.background = `hsl(${Math.random()*360}, 80%, 70%)`;
    conf.style.animationDuration = (Math.random() * 1 + 1.5) + 's';
    document.body.appendChild(conf);
    setTimeout(() => conf.remove(), 2000);
  }
}
