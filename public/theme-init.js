// Applies the saved dark theme before first paint (no flash of the light theme).
try {
  if (localStorage.getItem('theme') === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
} catch (e) {}
