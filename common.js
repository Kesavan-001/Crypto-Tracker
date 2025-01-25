// Toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    const themeButton = document.getElementById("theme-toggle");
    themeButton.textContent = document.body.classList.contains("dark-mode")
      ? "Light Mode"
      : "Dark Mode";
  }
  
  // Check if dark mode is already enabled (useful for page reloads)
  if (localStorage.getItem('dark-mode') === 'enabled') {
    document.body.classList.add('dark-mode');
    document.getElementById("theme-toggle").textContent = "Light Mode";
  }
  
  // Save dark mode preference in localStorage
  document.getElementById("theme-toggle").addEventListener("click", function() {
    toggleDarkMode();
    localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
  });
  