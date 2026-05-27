document.addEventListener("DOMContentLoaded", () => {

   const targets = document.querySelectorAll('.target');

   const options = {
      threshold: 0.3
   };

   const callback = (entries) => {
      entries.forEach((entry) => {
         if (entry.isIntersecting) {
            entry.target.classList.add('active');
         } else {
            entry.target.classList.remove('active');
         }
      });
   };

   const observer = new IntersectionObserver(callback, options);

   targets.forEach((target) => {
      observer.observe(target);
   });

   // ── Hamburger menu (mobile only) ─────────────────────────────────
   const wrapper   = document.querySelector('.topbar .wrapper');
   const navCenter = document.querySelector('.topbar .center');
   if (wrapper && navCenter) {
      const hamburger = document.createElement('button');
      hamburger.className = 'hamburger-btn';
      hamburger.setAttribute('aria-label', 'Menüyü aç');
      hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';

      // Insert hamburger as the first item in wrapper
      wrapper.insertBefore(hamburger, wrapper.firstChild);

      hamburger.addEventListener('click', () => {
         const isOpen = wrapper.classList.toggle('menu-open');
         hamburger.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
      });

      // Close dropdown when any nav link is tapped
      navCenter.querySelectorAll('a').forEach(a => {
         a.addEventListener('click', () => {
            wrapper.classList.remove('menu-open');
            hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
         });
      });

      // Close dropdown when tapping outside the topbar
      document.addEventListener('click', (e) => {
         if (!wrapper.contains(e.target)) {
            wrapper.classList.remove('menu-open');
            hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
         }
      });
   }

});