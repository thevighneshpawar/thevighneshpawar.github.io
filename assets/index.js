document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle Logic
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');

  function applyTheme(isDark) {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      if (themeIcon) themeIcon.setAttribute('data-lucide', 'sun');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      if (themeIcon) themeIcon.setAttribute('data-lucide', 'moon');
    }
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  // Determine initial theme (default to light per user's request for an alternative to dark)
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    applyTheme(true);
  } else if (savedTheme === 'light') {
    applyTheme(false);
  } else {
    // Default to clean Studio Light aesthetic
    applyTheme(false);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isCurrentlyDark = document.documentElement.classList.contains('dark');
      applyTheme(!isCurrentlyDark);
    });
  }

  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Active section indicator in navigation
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    const scrollY = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('text-indigo-600', 'dark:text-indigo-400', 'font-semibold');
            link.classList.remove('text-slate-500', 'dark:text-zinc-400');
          } else {
            link.classList.remove('text-indigo-600', 'dark:text-indigo-400', 'font-semibold');
            link.classList.add('text-slate-500', 'dark:text-zinc-400');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  // Contact form submission with inline feedback
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const form = e.target;
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnHTML = submitBtn.innerHTML;

      // Loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Sending...
      `;

      if (formStatus) {
        formStatus.classList.add('hidden');
        formStatus.textContent = '';
      }

      try {
        const payload = {
          message: `New portfolio contact form submission:\n\nName: ${form.fullName.value.trim()}\nEmail: ${form.email.value.trim()}\nMessage: ${form.message.value.trim()}`
        };

        const response = await fetch('https://bestattendance.vercel.app/send-message', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error('Server returned an error status.');
        }

        // Success notification
        if (formStatus) {
          formStatus.className = 'p-4 rounded-xl text-sm font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800/60 block animate-fadeIn';
          formStatus.textContent = '✓ Thank you! Your message has been sent successfully. I will get back to you soon.';
        }
        form.reset();
      } catch (error) {
        console.error('Contact Form Error:', error);
        if (formStatus) {
          formStatus.className = 'p-4 rounded-xl text-sm font-medium text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800/60 block animate-fadeIn';
          formStatus.textContent = 'Oops! There was an issue sending your message. Please reach out directly to vighneshpawar004@gmail.com.';
        }
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
      }
    });
  }

  // Professional tab title
  const originalTitle = document.title;
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      document.title = 'Vighnesh Pawar | Associate Software Engineer';
    } else {
      document.title = originalTitle;
    }
  });
});
