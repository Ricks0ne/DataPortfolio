// Theme Toggle & Persistence
const toggle = document.getElementById("theme-toggle");

const applyTheme = (isDark) => {
  if (isDark) {
    document.body.classList.add("dark");
    toggle.textContent = "☀️";
  } else {
    document.body.classList.remove("dark");
    toggle.textContent = "🌙";
  }
};

toggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");
  toggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  
  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    applyTheme(true);
  }
});

// Mobile Font Adjustment
window.addEventListener("load", () => {
  if (/Mobi|Android/i.test(navigator.userAgent)) {
    document.body.style.fontSize = "15px";
  } else {
    document.body.style.fontSize = "16px";
  }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('nav a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Scroll Reveal Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".section, .project-card, .exp-card").forEach((el) => {
  observer.observe(el);
});

// Formspree Form Submission
const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const submitBtn = form.querySelector("button[type='submit']");
    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        alert("✅ Your message has been sent successfully!");
        form.reset();
      } else {
        alert("❌ There was an issue sending your message. Try again.");
      }
    } catch (error) {
      alert("⚠️ Network error. Please try again later.");
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}
