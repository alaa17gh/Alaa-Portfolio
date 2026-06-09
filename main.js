/* ==== LOADING ==== */
const loader = document.querySelector(".loader-container");
setTimeout(() => {
  loader.classList.add("hidden");
  loader.addEventListener("transitionend", () => {
    loader.style.display = "none";
  }, { once: true });
}, 1500);

/* ==== FOOTER YEAR ==== */
document.getElementById("year").textContent = new Date().getFullYear();

/* ==== HAMBURGER ==== */
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");

hamburger.addEventListener("click", () => {
  const isOpen = mobileNav.classList.toggle("open");
  hamburger.setAttribute("aria-expanded", String(isOpen));
});

function closeMobileNav() {
  mobileNav.classList.remove("open");
  hamburger.setAttribute("aria-expanded", "false");
}

/* ==== SCROLL REVEAL ==== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add("visible"), i * 55);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.10, rootMargin: "0px 0px -36px 0px" });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

/* ==== LANGUAGE BAR ANIMATION ==== */
document.querySelectorAll(".lang-bar-fill").forEach(fill => {
  fill.dataset.targetWidth = fill.style.width;
  fill.style.width = "0";
  fill.style.transition = "none";
});

const langObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll(".lang-bar-fill").forEach(fill => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            fill.style.transition = "width 1.5s cubic-bezier(0.4, 0, 0.2, 1)";
            fill.style.width = fill.dataset.targetWidth;
          });
        });
      });
      langObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll(".lang-bar").forEach(bar => langObserver.observe(bar));

/* ==== BACKGROUND PARALLAX ORBS ==== */
const bgEl = document.querySelector(".background-blur");
let orb1, orb2, orb3;
if (bgEl) {
  orb1 = document.createElement("div");
  orb2 = document.createElement("div");
  orb3 = document.createElement("div");
  orb1.className = "bg-orb bg-orb-1";
  orb2.className = "bg-orb bg-orb-2";
  orb3.className = "bg-orb bg-orb-3";
  bgEl.append(orb1, orb2, orb3);
}

/* ==== CURSOR GLOW ==== */
const glow = document.createElement("div");
glow.className = "cursor-glow";
document.body.appendChild(glow);

/* ==== MOUSE TRACKING ==== */
let mouseNX = 0, mouseNY = 0;
let o1x = 0, o1y = 0;
let o2x = 0, o2y = 0;
let o3x = 0, o3y = 0;
let glowPX = window.innerWidth / 2;
let glowPY = window.innerHeight / 2;
let glowTX = glowPX, glowTY = glowPY;

document.addEventListener("mousemove", (e) => {
  mouseNX = (e.clientX / window.innerWidth - 0.5) * 2;
  mouseNY = (e.clientY / window.innerHeight - 0.5) * 2;
  glowTX = e.clientX;
  glowTY = e.clientY;
});

/* ==== ANIMATION LOOP ==== */
function animLoop() {
  const s = 0.034;
  o1x += (mouseNX * 52 - o1x) * s;
  o1y += (mouseNY * 38 - o1y) * s;
  o2x += (mouseNX * -36 - o2x) * s;
  o2y += (mouseNY * -28 - o2y) * s;
  o3x += (mouseNX * 68 - o3x) * s;
  o3y += (mouseNY * -48 - o3y) * s;

  if (orb1) orb1.style.transform = `translate(${o1x}px, ${o1y}px)`;
  if (orb2) orb2.style.transform = `translate(${o2x}px, ${o2y}px)`;
  if (orb3) orb3.style.transform = `translate(${o3x}px, ${o3y}px)`;

  glowPX += (glowTX - glowPX) * 0.09;
  glowPY += (glowTY - glowPY) * 0.09;
  glow.style.transform = `translate(${glowPX - 350}px, ${glowPY - 350}px)`;

  requestAnimationFrame(animLoop);
}
animLoop();

/* ==== SMOOTH SCROLL ==== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", (e) => {
    const id = anchor.getAttribute("href");
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
