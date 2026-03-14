// ===== LOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) { loader.classList.add('hidden'); setTimeout(() => loader.remove(), 600); }
  }, 2000);
});

// ===== CUSTOM CURSOR =====
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
if (window.matchMedia('(pointer: fine)').matches && cursorDot && cursorRing) {
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursorDot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
  });
  (function animateRing() {
    ringX += (mouseX - ringX) * 0.12; ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`;
    requestAnimationFrame(animateRing);
  })();
}

// ===== TYPED.JS =====
document.addEventListener('DOMContentLoaded', () => {
  if (typeof Typed !== 'undefined' && document.querySelector('.typing-text')) {
    new Typed('.typing-text', {
      strings: ['AI/ML Systems', 'Computer Vision', 'Full Stack Apps', 'Web Experiences', 'Deep Learning Models'],
      loop: true, typeSpeed: 65, backSpeed: 35, backDelay: 1800, startDelay: 600
    });
  }
});

// ===== NAVBAR =====
const menu = document.getElementById('menu');
const navbar = document.querySelector('.navbar');
const header = document.getElementById('header');
if (menu && navbar) {
  menu.addEventListener('click', () => {
    menu.classList.toggle('fa-times'); menu.classList.toggle('fa-bars');
    navbar.classList.toggle('nav-toggle');
  });
  document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.add('fa-bars'); menu.classList.remove('fa-times');
      navbar.classList.remove('nav-toggle');
    });
  });
}

// ===== SCROLL EVENTS =====
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');
const scrollTopBtn = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;
  if (header) header.classList.toggle('scrolled', scrollY > 50);
  if (scrollTopBtn) scrollTopBtn.classList.toggle('show', scrollY > 400);
  let current = '';
  sections.forEach(s => { if (scrollY >= s.offsetTop - 200) current = s.getAttribute('id'); });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
  if (menu && navbar) { menu.classList.add('fa-bars'); menu.classList.remove('fa-times'); navbar.classList.remove('nav-toggle'); }
}, { passive: true });
if (scrollTopBtn) scrollTopBtn.addEventListener('click', (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.counter');
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-target'));
      let count = 0;
      const step = Math.ceil(target / 30);
      const timer = setInterval(() => {
        count += step; if (count >= target) { count = target; clearInterval(timer); }
        el.textContent = count;
      }, 50);
      counterObs.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObs.observe(c));

// ===== VANILLA TILT =====
document.addEventListener('DOMContentLoaded', () => {
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('.tilt'), { max: 8, speed: 400, glare: true, 'max-glare': 0.1 });
  }
});

// ===== SCROLL REVEAL =====
document.addEventListener('DOMContentLoaded', () => {
  if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({ origin: 'bottom', distance: '50px', duration: 900, delay: 100, easing: 'cubic-bezier(0.4,0,0.2,1)', reset: false });
    sr.reveal('.section-tag', { delay: 100 }); sr.reveal('.section-heading', { delay: 200 }); sr.reveal('.section-sub', { delay: 300 });
    sr.reveal('.hero-badge', { delay: 200 }); sr.reveal('.hero-title', { delay: 350, origin: 'left' }); sr.reveal('.hero-subtitle', { delay: 450 });
    sr.reveal('.hero-desc', { delay: 500 }); sr.reveal('.hero-cta', { delay: 600 }); sr.reveal('.hero-socials', { delay: 700 });
    sr.reveal('.hero-img-wrapper', { delay: 300, origin: 'right' }); sr.reveal('.about-img-frame', { origin: 'left', delay: 200 });
    sr.reveal('.about-content', { origin: 'right', delay: 300 }); sr.reveal('.info-item', { interval: 100 }); sr.reveal('.stat-item', { interval: 150 });
    sr.reveal('.ai-card', { interval: 150 }); sr.reveal('.skill-group', { interval: 100 }); sr.reveal('.project-card', { interval: 150 });
    sr.reveal('.edu-card', { interval: 150 }); sr.reveal('.timeline-item', { interval: 120 }); sr.reveal('.c-info-card', { interval: 100 });
  }
});

// ================================================================
// ===== CONTACT FORM — EMAIL TO HARISH + AUTO-REPLY TO SENDER =====
// ================================================================
//
// YOUR EMAILJS KEYS:
//   Public Key  : C5Ifa9uGp_dL2SKg8
//   Service ID  : service_vhfvevx
//   Auto-Reply Template: template_b159mjq  (To: {{email}}, variables: {{name}}, {{from_name}})
//
// ⚠️  YOU NEED ONE MORE TEMPLATE for "Email to Harish":
//   Go to EmailJS → Create New Template → name it "contact_form"
//   To Email   : hareeshbhumireddi@gmail.com   (hardcode it)
//   Subject    : New Portfolio Message from {{name}}
//   Body:
//     Name: {{name}}
//     Email: {{email}}
//     Phone: {{phone}}
//     Message: {{message}}
//   Save → copy the Template ID → paste below as MAIN_TEMPLATE_ID
//
// ================================================================

const EMAILJS_PUBLIC_KEY  = 'C5Ifa9uGp_dL2SKg8';
const EMAILJS_SERVICE_ID  = 'service_vhfvevx';

// Template that sends message TO HARISH (create this — see instructions above)
const MAIN_TEMPLATE_ID    = 'template_aa3y2kk';   // ← paste your new template ID here

// Template that sends AUTO-REPLY to the visitor (already created: template_b159mjq)
const AUTOREPLY_TEMPLATE_ID = 'template_b159mjq';

const CONTACT_EMAIL   = 'hareeshbhumireddi@gmail.com';
const WHATSAPP_NUMBER = '919390954971';

// Init EmailJS
if (typeof emailjs !== 'undefined') {
  emailjs.init(EMAILJS_PUBLIC_KEY);
  console.log('✅ EmailJS initialized');
}

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const phone   = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in Name, Email, and Message!', 'error');
      return;
    }

    const submitBtn = document.getElementById('submit-btn');
    const origHTML  = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled  = true;

    let mainEmailSent  = false;
    let autoReplySent  = false;
    let whatsappOpened = false;

    // ===== STEP 1: Open WhatsApp (instant, always works) =====
    try {
      const waText =
        `📬 *New Portfolio Message!*\n\n` +
        `👤 *Name:* ${name}\n` +
        `📧 *Email:* ${email}\n` +
        `📞 *Phone:* ${phone || 'Not provided'}\n\n` +
        `💬 *Message:*\n${message}\n\n` +
        `_Sent from Harish's portfolio_`;
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`, '_blank');
      whatsappOpened = true;
      console.log('✅ WhatsApp opened');
    } catch(err) { console.error('WhatsApp error:', err); }

    // ===== STEP 2: Send main email TO HARISH =====
    // Variables sent: {{name}}, {{email}}, {{phone}}, {{message}}
    if (typeof emailjs !== 'undefined') {
      try {
        const res = await emailjs.send(EMAILJS_SERVICE_ID, MAIN_TEMPLATE_ID, {
          name:    name,          // use {{name}} in your template
          email:   email,         // use {{email}} in your template
          phone:   phone || 'Not provided',
          message: message,
          to_email: CONTACT_EMAIL
        });
        if (res.status === 200) {
          mainEmailSent = true;
          console.log('✅ Main email sent to Harish');
        }
      } catch(err) { console.error('Main email error:', err); }
    }

    // ===== STEP 3: Send AUTO-REPLY to the visitor =====
    // Your template_b159mjq uses: To={{email}}, {{name}}, {{from_name}}
    if (typeof emailjs !== 'undefined') {
      try {
        const res2 = await emailjs.send(EMAILJS_SERVICE_ID, AUTOREPLY_TEMPLATE_ID, {
          name:       name,    // {{name}} in template body ("Hi {{name}},")
          from_name:  name,    // {{from_name}} in template body
          email:      email,   // {{email}} = To Email field in your template
          from_email: email    // {{from_email}} = Reply To field in your template
        });
        if (res2.status === 200) {
          autoReplySent = true;
          console.log('✅ Auto-reply sent to visitor');
        }
      } catch(err) { console.warn('Auto-reply error (non-critical):', err); }
    }

    // ===== RESULT TOAST =====
    let toastMsg = '';
    if (whatsappOpened && mainEmailSent && autoReplySent) {
      toastMsg = '✅ Message sent to Harish!\n✅ Auto-reply sent to you!\n✅ WhatsApp opened!\n\nAll 3 delivered! 🎉';
    } else if (whatsappOpened && mainEmailSent) {
      toastMsg = '✅ Email sent to Harish!\n✅ WhatsApp opened! 🎉';
    } else if (whatsappOpened && autoReplySent) {
      toastMsg = '✅ Auto-reply sent to you!\n✅ WhatsApp opened!';
    } else if (whatsappOpened) {
      toastMsg = '✅ WhatsApp opened!\n⚠️ Email failed. Check template variables.';
    } else if (mainEmailSent) {
      toastMsg = '✅ Email sent to Harish! 📧';
    } else {
      toastMsg = '⚠️ Something went wrong. Please try again!';
    }

    showToast(toastMsg, (whatsappOpened || mainEmailSent) ? 'success' : 'error');
    contactForm.reset();
    setTimeout(() => { submitBtn.innerHTML = origHTML; submitBtn.disabled = false; }, 3000);
  });
}

function showToast(msg, type = 'success') {
  document.querySelectorAll('.toast-msg').forEach(t => t.remove());
  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  const bg = type === 'success'
    ? 'linear-gradient(135deg,#10b981,#059669)'
    : 'linear-gradient(135deg,#ef4444,#dc2626)';
  const bdr = type === 'success' ? 'rgba(52,211,153,0.4)' : 'rgba(252,165,165,0.4)';
  toast.style.cssText = `
    position:fixed;bottom:9rem;right:2.5rem;
    background:${bg};color:#fff;
    padding:1.6rem 2.5rem;border-radius:1.4rem;
    font-size:1.4rem;font-family:'Plus Jakarta Sans',sans-serif;font-weight:500;
    box-shadow:0 12px 40px rgba(0,0,0,0.4);z-index:99999;
    max-width:40rem;line-height:1.8;white-space:pre-line;
    opacity:0;transform:translateY(20px);
    transition:all 0.4s cubic-bezier(0.4,0,0.2,1);
    border:1px solid ${bdr};
  `;
  toast.textContent = msg;
  document.body.appendChild(toast);
  requestAnimationFrame(() => requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  }));
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    setTimeout(() => toast.remove(), 400);
  }, 6000);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menu && navbar) {
    menu.classList.add('fa-bars'); menu.classList.remove('fa-times');
    navbar.classList.remove('nav-toggle');
  }
});

console.log('%cHarish Bhumireddi — AI/ML & Full Stack Developer', 'color:#a855f7;font-size:14px;font-weight:bold');