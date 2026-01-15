/* ===== LOADER ===== */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  loader.style.opacity = "0";
  setTimeout(() => loader.remove(), 600);
});

/* ===== FADE ANIMATION ===== */
const faders = document.querySelectorAll('.fade');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

faders.forEach(fade => observer.observe(fade));

/* ===== SKILLS BAR ANIMATION ===== */
const skillFills = document.querySelectorAll('.skill-fill');

skillFills.forEach(fill => {
  const parent = fill.parentElement;
  const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        fill.style.width = fill.dataset.percent;
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  skillObserver.observe(parent);
});

/* ===== NAVBAR ACTIVE + SMOOTH SCROLL ===== */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

navLinks.forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if(target){
      const offset = 80; // tinggi navbar
      const targetPos = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  });
});

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(sec => {
    if (scrollY >= sec.offsetTop - 150) current = sec.id;
  });

  navLinks.forEach(a => {
    a.classList.remove("active");
    if (a.getAttribute("href") === `#${current}`) {
      a.classList.add("active");
    }
  });
});

/* ===== YOUTUBE PLAY / PAUSE ===== */
let isPlaying = true;

const toggleBtn = document.getElementById("videoToggle");
const player = document.getElementById("ytPlayer");

if (toggleBtn && player) {
  toggleBtn.addEventListener("click", () => {
    const command = isPlaying ? "pauseVideo" : "playVideo";

    player.contentWindow.postMessage(
      JSON.stringify({
        event: "command",
        func: command,
        args: []
      }),
      "*"
    );

    toggleBtn.textContent = isPlaying ? "▶" : "⏸";
    isPlaying = !isPlaying;
  });
}
