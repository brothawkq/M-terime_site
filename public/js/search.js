document.addEventListener("DOMContentLoaded", () => {

   const searchIcon   = document.getElementById('searchIcon');
   const searchEngine = document.getElementById('searchEngine');
   const searchInput  = searchEngine ? searchEngine.querySelector('input') : null;

   if (!searchIcon || !searchEngine || !searchInput) return;

   // İkon tıklandığında: kapalıysa aç, açıksa ve yazı varsa ara
   searchIcon.addEventListener('click', () => {
      if (searchEngine.classList.contains('active') && searchInput.value.trim()) {
         doSearch(searchInput.value.trim());
      } else {
         searchEngine.classList.toggle('active');
         if (searchEngine.classList.contains('active')) searchInput.focus();
      }
   });

   // Enter tuşu
   searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && searchInput.value.trim()) doSearch(searchInput.value.trim());
   });

   function doSearch(query) {
      const isBlog = window.location.pathname.endsWith('blog.html');
      if (isBlog) {
         window.dispatchEvent(new CustomEvent('siteSearch', { detail: query }));
      } else {
         const base = window.location.pathname.includes('/pages/') ? './blog.html' : 'pages/blog.html';
         window.location.href = base + '?search=' + encodeURIComponent(query);
      }
   }

});
