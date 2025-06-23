// This script prevents theme flashing on page load
// It needs to be a separate file to be included in the head
const themeScript = `
  (function() {
    try {
      console.log('[Theme Script] Initializing theme script');
      
      // Get stored theme or default to dark
      const storedTheme = localStorage.getItem('theme');
      console.log('[Theme Script] Theme from localStorage:', storedTheme);
      
      // Apply theme by adding/removing appropriate classes
      if (storedTheme === 'light') {
        console.log('[Theme Script] Setting light theme');
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      } else {
        console.log('[Theme Script] Setting dark theme (default)');
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
      }
      
      // Listen for changes in localStorage (e.g., from another tab)
      window.addEventListener('storage', function(e) {
        if (e.key === 'theme') {
          console.log('[Theme Script] Theme changed in another tab:', e.newValue);
          
          if (e.newValue === 'light') {
            document.documentElement.classList.add('light');
            document.documentElement.classList.remove('dark');
          } else {
            document.documentElement.classList.remove('light');
            document.documentElement.classList.add('dark');
          }
        }
      });
      
      // Log the final state
      console.log('[Theme Script] Final DOM classes:', document.documentElement.className);
      console.log('[Theme Script] Has light class:', document.documentElement.classList.contains('light'));
      console.log('[Theme Script] Has dark class:', document.documentElement.classList.contains('dark'));
    } catch (e) {
      console.error('[Theme Script] Error:', e);
    }
  })();
`;

export default themeScript;
