const phases = {
  work: { seconds: 45, color: '#741511' },
  rest: { seconds: 15, color: '#588157' },
  reset: { seconds: 60, color: '#2b2d42' },
  stretch: { seconds: 30, color: '#2b2d42' }
};
let selectedPhase = 'work', remaining = 45, running = false, deadline = 0, ticker, frame;
const play = document.querySelector('#play');
const clock = document.querySelector('.clock');
const demo = document.querySelector('#demo');
const status = document.querySelector('#timer-status');
const stretch = document.querySelector('#stretch');
const finish = document.querySelector('.rainbow-finish');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
function paint() {
  document.querySelector('#minutes').textContent = String(Math.floor(remaining / 60)).padStart(2, '0');
  document.querySelector('#seconds').textContent = String(remaining % 60).padStart(2, '0');
  clock.setAttribute('aria-label', `${remaining} seconds`);
}
function stop() {
  running = false;
  clearInterval(ticker);
  play.innerHTML = 'Try a little movement <span aria-hidden="true">▶</span>';
  play.setAttribute('aria-label', 'Start timer preview');
  stretch.disabled = false;
}
function clearFinish() {
  cancelAnimationFrame(frame);
  finish.classList.remove('visible', 'still');
}
// Mirrors the app's 7.5-second, layered angular-gradient finish and stepped sweep.
function celebrate() {
  clearFinish();
  finish.classList.add('visible');
  const started = performance.now();
  const stops = [0, .12, .26, .43, .61, .78, 1];
  function draw(now) {
    const progress = Math.min((now - started) / 7500, 1);
    if (reducedMotion.matches) {
      finish.classList.add('still');
    } else {
      finish.classList.remove('still');
      const upper = stops.findIndex(stop => progress <= stop);
      const lower = stops[Math.max(0, upper - 1)];
      const span = Math.max(stops[upper] - lower, .0001);
      const local = (progress - lower) / span;
      const eased = local < .65 ? local * .45 : .2925 + (local - .65) / .35 * .7075;
      const stepped = lower + span * eased;
      finish.style.setProperty('--sweep', `${stepped * 420}deg`);
      finish.style.setProperty('--reverse', `${-140 + stepped * 340}deg`);
      finish.style.setProperty('--accent', `${110 - stepped * 290}deg`);
      finish.style.setProperty('--fade', 1 - progress);
      finish.style.setProperty('--glow', Math.sin(progress * Math.PI) * .5);
    }
    if (progress < 1) frame = requestAnimationFrame(draw);
    else clearFinish();
  }
  frame = requestAnimationFrame(draw);
}
function tick() {
  remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
  paint();
  if (remaining === 0) {
    stop();
    demo.style.background = '#0d0d0d';
    status.textContent = selectedPhase === 'stretch' ? 'A little better. Take that feeling with you.' : 'Nicely done. Ready to go again?';
    celebrate();
  }
}
function start() {
  clearFinish();
  if (!remaining) remaining = phases[selectedPhase].seconds;
  demo.style.background = phases[selectedPhase].color;
  running = true;
  deadline = Date.now() + remaining * 1000;
  play.innerHTML = 'Take a breather <span aria-hidden="true">Ⅱ</span>';
  play.setAttribute('aria-label', 'Pause timer preview');
  stretch.disabled = selectedPhase === 'stretch';
  status.textContent = selectedPhase === 'stretch' ? 'Your half-minute. Move gently, at your own pace.' : 'A taste of the timer. Your workout lives in the app.';
  ticker = setInterval(tick, 150);
  paint();
}
function selectPhase(name) {
  stop();
  clearFinish();
  selectedPhase = name;
  remaining = phases[name].seconds;
  demo.style.background = phases[name].color;
  document.querySelectorAll('.phase').forEach(button => {
    const selected = button.dataset.phase === name;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  status.textContent = 'A taste of the timer. Your workout lives in the app.';
  paint();
}
play.addEventListener('click', () => {
  if (running) {
    remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
    stop(); paint(); status.textContent = 'Paused. Continue when you’re ready.';
  } else start();
});
document.querySelectorAll('.phase').forEach(button => button.addEventListener('click', () => selectPhase(button.dataset.phase)));
stretch.addEventListener('click', () => {
  selectPhase('stretch'); start();
  clock.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'center' });
});
document.addEventListener('visibilitychange', () => { if (!document.hidden && running) tick(); });
const cat = document.querySelector('.studio-cat');
let catTimeout;
cat.addEventListener('click', () => {
  if (cat.classList.contains('wink')) return;
  cat.classList.add('wink');
  document.querySelector('#cat-status').textContent = 'You can hear me, can’t you?';
  clearTimeout(catTimeout);
  catTimeout = setTimeout(() => {
    cat.classList.remove('wink');
    document.querySelector('#cat-status').textContent = '';
  }, 2500);
});
document.querySelector('#year').textContent = new Date().getFullYear();
