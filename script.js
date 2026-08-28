/* ============================================
   Portfolio interactivity
   No frameworks, no dependencies — just DOM APIs.
   ============================================ */

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

/* --------------------------------------------
   1) Instrument readout — small live-looking
      numbers in the hero, purely cosmetic but
      demonstrates timers + DOM updates.
   -------------------------------------------- */
function initReadout() {
  const altEl = document.getElementById("rdAlt");
  const hdgEl = document.getElementById("rdHdg");
  const machEl = document.getElementById("rdMach");

  if (!altEl || !hdgEl || !machEl || prefersReducedMotion) return;

  let altitude = 37000;
  let heading = 274;
  let mach = 0.82;

  setInterval(() => {
    // small, bounded random walk so the numbers feel "live"
    // without ever looking broken or alarming
    altitude += Math.round((Math.random() - 0.5) * 40);
    heading = (heading + (Math.random() - 0.5) * 1.2 + 360) % 360;
    mach += (Math.random() - 0.5) * 0.004;
    mach = Math.min(0.86, Math.max(0.78, mach));

    altEl.textContent = `${Math.round(altitude).toLocaleString()} FT`;
    hdgEl.textContent = `${Math.round(heading)}°`;
    machEl.textContent = mach.toFixed(2);
  }, 1800);
}

/* --------------------------------------------
   2) Scroll reveal for project cards and
      timeline items, via IntersectionObserver.
   -------------------------------------------- */
function initScrollReveal() {
  const targets = document.querySelectorAll(
    ".project-row, .tech-card, .timeline-item, .novel-progress-card, .systems-col"
  );

  if (!targets.length) return;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  targets.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(14px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  targets.forEach((el) => observer.observe(el));
}

/* --------------------------------------------
   3) Active nav-link highlight on scroll.
   -------------------------------------------- */
function initActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll(".nav-links a[href^='#']");

  if (!sections.length || !links.length || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = document.querySelector(
          `.nav-links a[href="#${entry.target.id}"]`
        );
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach((l) => l.style.color = "");
          link.style.color = "var(--text)";
        }
      });
    },
    { rootMargin: "-45% 0px -45% 0px" }
  );

  sections.forEach((s) => observer.observe(s));
}

/* --------------------------------------------
   4) Project image sliders — arrow buttons +
      native drag/swipe via scroll-snap. No
      external library, just scrollBy().
   -------------------------------------------- */
function initProjectSliders() {
  const sliders = document.querySelectorAll("[data-slider]");

  sliders.forEach((slider) => {
    const track = slider.querySelector("[data-track]");
    const prevBtn = slider.querySelector("[data-prev]");
    const nextBtn = slider.querySelector("[data-next]");
    if (!track) return;

    const scrollByOneSlide = (direction) => {
      const slide = track.querySelector(".slide");
      const amount = slide ? slide.getBoundingClientRect().width + 12 : track.clientWidth;
      track.scrollBy({
        left: amount * direction,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    };

    if (prevBtn) prevBtn.addEventListener("click", () => scrollByOneSlide(-1));
    if (nextBtn) nextBtn.addEventListener("click", () => scrollByOneSlide(1));

    // keyboard support when the track itself is focused
    track.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); scrollByOneSlide(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); scrollByOneSlide(-1); }
    });
  });
}


/* --------------------------------------------
   Novel word-count display.
   Update only the data-current-words and
   data-target-words values in index.html.
   -------------------------------------------- */
function initNovelProgress() {
  const card = document.querySelector("[data-novel-progress]");
  if (!card) return;

  const current = Math.max(
    0,
    Number.parseInt(card.dataset.currentWords || "0", 10) || 0
  );

  const target = Math.max(
    0,
    Number.parseInt(card.dataset.targetWords || "0", 10) || 0
  );

  const currentEl = card.querySelector("[data-novel-current]");
  const targetEl = card.querySelector("[data-novel-target]");
  const percentEl = card.querySelector("[data-novel-percent]");
  const fillEl = card.querySelector("[data-novel-fill]");
  const trackEl = card.querySelector('[role="progressbar"]');

  if (currentEl) {
    currentEl.textContent = current.toLocaleString();
  }

  if (target > 0) {
    const percent = Math.min(
      100,
      Math.round((current / target) * 100)
    );

    if (targetEl) {
      targetEl.textContent = `/ ${target.toLocaleString()} words`;
    }

    if (percentEl) {
      percentEl.textContent = `${percent}%`;
    }

    if (fillEl) {
      fillEl.style.width = `${percent}%`;
    }

    if (trackEl) {
      trackEl.setAttribute(
        "aria-valuenow",
        String(Math.min(current, target))
      );

      trackEl.setAttribute(
        "aria-valuemax",
        String(target)
      );

      trackEl.setAttribute(
        "aria-valuetext",
        `${current.toLocaleString()} of ${target.toLocaleString()} words`
      );
    }
  } else {
    if (targetEl) {
      targetEl.textContent = "words written";
    }

    if (percentEl) {
      percentEl.textContent = "GOAL TBD";
    }

    if (fillEl) {
      fillEl.style.width = "0%";
    }

    if (trackEl) {
      trackEl.setAttribute(
        "aria-valuenow",
        String(current)
      );

      trackEl.removeAttribute("aria-valuemax");

      trackEl.setAttribute(
        "aria-valuetext",
        `${current.toLocaleString()} words written; target not set`
      );
    }
  }
}
document.addEventListener("DOMContentLoaded", () => {
  initReadout();
  initScrollReveal();
  initActiveNav();
  initProjectSliders();
  initNovelProgress();
});