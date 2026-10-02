(() => {
  const root = document.documentElement;
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  const storageKey = 'sddfw-theme';
  let preference = null;

  try {
    const stored = localStorage.getItem(storageKey);
    if (stored === 'light' || stored === 'dark') preference = stored;
  } catch {
    // The theme still works when browser storage is unavailable.
  }

  function applyTheme() {
    const theme = preference ?? (systemTheme.matches ? 'dark' : 'light');
    root.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]').content =
      theme === 'dark' ? '#151515' : '#fafafa';

    const button = document.querySelector('#theme-toggle');
    if (!button) return;
    const next = theme === 'dark' ? 'light' : 'dark';
    button.setAttribute('aria-label', `Switch to ${next} mode`);
    button.querySelector('[data-theme-label]').textContent = next === 'dark' ? 'Dark' : 'Light';
    button.querySelector('use').setAttribute('href', theme === 'dark' ? '#i-sun' : '#i-moon');
  }

  // Apply before the stylesheet paints to avoid flashing the wrong theme.
  applyTheme();
  systemTheme.addEventListener('change', () => {
    if (preference === null) applyTheme();
  });

  document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('#theme-toggle');
    button.addEventListener('click', () => {
      preference = root.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme();
      try {
        localStorage.setItem(storageKey, preference);
      } catch {
        // Keep the current choice for this page even without persistent storage.
      }
      document.querySelector('#theme-announcement').textContent =
        `${preference === 'dark' ? 'Dark' : 'Light'} mode enabled.`;
    });
    applyTheme();
    root.dataset.themeReady = 'true';
  });
})();
