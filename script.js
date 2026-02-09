const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".section").forEach((section) => {
  section.classList.add("fade-in");
  observer.observe(section);
});

const availabilityForm = document.querySelector("#availability-form");
const availabilityStatus = document.querySelector("#availability-form-status");

if (availabilityForm && availabilityStatus) {
  availabilityForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const endpoint = availabilityForm.getAttribute("action") || "";

    if (endpoint.includes("your-form-id")) {
      availabilityStatus.textContent = "Form setup is almost done. Please connect your Formspree form ID to start receiving inquiries by email.";
      availabilityStatus.className = "form-status form-status-warning";
      return;
    }

    availabilityStatus.textContent = "Submitting your inquiry...";
    availabilityStatus.className = "form-status";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: new FormData(availabilityForm),
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Unable to submit form");
      }

      availabilityForm.reset();
      availabilityStatus.textContent = "Thank you for your submission. We will get back to you shortly.";
      availabilityStatus.className = "form-status form-status-success";
    } catch (error) {
      availabilityStatus.textContent = "Sorry, there was an issue submitting your request. Please try again or email jasonljarrett@gmail.com.";
      availabilityStatus.className = "form-status form-status-error";
    }
  });
}
