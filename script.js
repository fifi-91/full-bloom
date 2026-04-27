// NAV
const toggle = document.querySelector(".nav-toggle");
const menu = document.querySelector(".nav-menu");

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", isOpen);
  });
}

// CONTACT FORM (in-page submission)
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm && formMessage) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const button = contactForm.querySelector("button");
    const originalText = button.textContent;

    button.textContent = "Sending...";
    button.disabled = true;
    formMessage.hidden = true;

    try {
      const res = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        contactForm.reset();
        formMessage.textContent =
          "Thank you — your message has been sent. Vivienne will be in touch soon.";
      } else {
        formMessage.textContent =
          "Something went wrong. Please try again.";
      }
    } catch {
      formMessage.textContent =
        "Something went wrong. Please try again.";
    }

    formMessage.hidden = false;
    button.textContent = originalText;
    button.disabled = false;
  });
}