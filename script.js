// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const isDarkMode = localStorage.getItem('darkMode') === 'true';

// Initialize theme
if (isDarkMode) {
  document.body.classList.add('dark-mode');
  themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDark);
  themeToggle.textContent = isDark ? '☀️' : '🌙';
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  // Animate hamburger
  hamburger.style.opacity = '0.7';
  setTimeout(() => {
    hamburger.style.opacity = '1';
  }, 200);
});

// Close mobile menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// Active navigation link
const currentLocation = window.location.pathname.split('/').pop() || 'index.html';
navLinks.forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentLocation) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    const formMessage = document.getElementById('formMessage');

    // Validate form
    if (!name || !email || !subject || !message) {
      showMessage('Please fill in all fields', 'error');
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showMessage('Please enter a valid email address', 'error');
      return;
    }

    // Since we can't send emails directly from frontend,
    // we'll show a success message and log the data
    console.log({
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString()
    });

    showMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
    contactForm.reset();
  });
}

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }

    console.log('Newsletter signup:', { email, timestamp: new Date().toISOString() });
    alert('Thank you for subscribing!');
    newsletterForm.reset();
  });
}

function showMessage(text, type) {
  const formMessage = document.getElementById('formMessage');
  formMessage.textContent = text;
  formMessage.className = `form-message ${type}`;
  
  // Auto-hide after 5 seconds
  setTimeout(() => {
    formMessage.className = 'form-message';
  }, 5000);
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Add scroll animation for elements
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all cards and posts
document.querySelectorAll('.post-card, .skill-item, .contact-info-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s, transform 0.5s';
  observer.observe(el);
});

// Prevent form submission (since we don't have a backend)
window.addEventListener('load', () => {
  console.log('Personal Blog loaded successfully!');
});