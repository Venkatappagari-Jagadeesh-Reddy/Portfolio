(function () {
  const docEl = document.documentElement;
  // Force light theme
  docEl.setAttribute('data-bs-theme', 'light');

  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId.startsWith('#') && targetId.length > 1) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          history.pushState(null, '', targetId);
        }
      }
    });
  });

  // Refresh ScrollSpy after load
  window.addEventListener('load', function () {
    const scrollSpyEl = document.querySelector('[data-bs-spy="scroll"]');
    if (scrollSpyEl) {
      bootstrap.ScrollSpy.getInstance(scrollSpyEl) || new bootstrap.ScrollSpy(scrollSpyEl, { target: '#navbar', offset: 80 });
    }
  });

  // Contact form handling with mailto link
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      
      if (!name || !email || !message) {
        alert('Please fill out all fields.');
        return;
      }
      
      // Create mailto link with form data
      const subject = encodeURIComponent('Portfolio Contact from ' + name);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      const mailtoLink = `mailto:vjagadeeshreddyreddy@gmail.com?subject=${subject}&body=${body}`;
      
      // Open default email client
      window.open(mailtoLink, '_blank');
      
      // Show success message and reset form
      alert('Thank you! Your default email client will open with the message pre-filled. Please send the email to complete the process.');
      form.reset();
    });
  }

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
