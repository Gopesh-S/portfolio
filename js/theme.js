/* ==========================================================================
   THEME TOGGLE & LOCALSTORAGE MANAGER - GOPESH S PORTFOLIO
   ========================================================================== */

(function () {
  const THEME_STORAGE_KEY = 'gopesh_portfolio_theme';

  // Function to get initial preferred theme
  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    // Default to dark theme for modern developer look
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  // Function to apply theme to DOM
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    // Update meta theme-color tag
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#0F172A' : '#FFFFFF');
    }
  }

  // Initialize theme on script execution
  const currentTheme = getPreferredTheme();
  applyTheme(currentTheme);

  // Setup event listeners after DOM loads
  document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');

    themeToggleBtn?.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);

      if (typeof window.showToastNotification === 'function') {
        window.showToastNotification(`Switched to ${newTheme.toUpperCase()} theme`);
      }
    });
  });
})();
