// Theme Toggle
const toggle = document.getElementById("theme-toggle");
toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});

// Preserve Theme on Reload
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    toggle.textContent = "☀️";
  }
});

// Adjust Font Based on Device
window.addEventListener("load", () => {
  if (/Mobi|Android/i.test(navigator.userAgent)) {
    document.body.style.fontSize = "15px";
  } else {
    document.body.style.fontSize = "16px";
  }
});

// Smooth Form Submission (Formspree)
const form = document.getElementById("contact-form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(form);

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
  }
});
