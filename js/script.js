// Toggle mobile navigation
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Sticky navigation with scrolled class
window.addEventListener("scroll", function () {
  const nav = document.querySelector("nav");
  if (window.scrollY > 100) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

// Population chart animation with intersection observer
const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px",
};

const chartObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const maleChart = document.getElementById("maleChart");
      const femaleChart = document.getElementById("femaleChart");

      setTimeout(() => {
        maleChart.style.height = "60%";
        femaleChart.style.height = "40%";
      }, 300);

      chartObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

const populationSection = document.getElementById("population");
if (populationSection) {
  chartObserver.observe(populationSection);
}

// Web3Forms submission handling
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;

    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    try {
      const formData = new FormData(contactForm);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        alert(
          "✅ Thank you for your message! We will get back to you soon at " +
            formData.get("email"),
        );
        contactForm.reset();
      } else {
        throw new Error(data.message || "Something went wrong!");
      }
    } catch (error) {
      alert(
        "❌ There was an error sending your message. Please try again or contact us directly at villagesulemanpahore@gmail.com",
      );
      console.error("Form submission error:", error);
    } finally {
      // Re-enable button and restore original text
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }
  });
}

// =============================================
// Scroll-Reveal Animation (all pages)
// =============================================
const revealElements = document.querySelectorAll(
  ".gallery-item, .pride-card, .school-card, .clinic-card, .section-title, .about-content, .sports-content, .agriculture-container, .population-content, .contact-content, .location-container",
);

revealElements.forEach((el) => {
  el.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay for grid children
        const siblings = Array.from(entry.target.parentElement.children);
        const index = siblings.indexOf(entry.target);
        const delay = index * 80; // 80ms stagger between cards
        setTimeout(() => {
          entry.target.classList.add("revealed");
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -40px 0px",
  },
);

revealElements.forEach((el) => revealObserver.observe(el));
