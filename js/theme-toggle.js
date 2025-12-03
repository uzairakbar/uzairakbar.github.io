// // Theme Toggle Functionality
// document.addEventListener('DOMContentLoaded', () => {
//     // Check for saved theme preference or respect OS preference
//     const savedTheme = localStorage.getItem('theme');
//     const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
//     // Apply theme preference
//     if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
//       document.documentElement.setAttribute('data-theme', 'dark');
//       localStorage.setItem('theme', 'dark');
//     } else {
//       document.documentElement.setAttribute('data-theme', 'light');
//       localStorage.setItem('theme', 'light');
//     }
    
//     // Create and append the theme toggle button to the body
//     const themeToggle = document.createElement('button');
//     themeToggle.className = 'theme-toggle';
//     themeToggle.innerHTML = '<span class="moon">☾</span><span class="sun">☀</span>';
//     document.body.appendChild(themeToggle);
    
//     // Add event listener to the theme toggle button
//     themeToggle.addEventListener('click', () => {
//       // Toggle theme
//       const currentTheme = document.documentElement.getAttribute('data-theme');
//       const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
//       // Apply new theme
//       document.documentElement.setAttribute('data-theme', newTheme);
//       localStorage.setItem('theme', newTheme);
//     });
//   });

document.addEventListener('DOMContentLoaded', () => {
    // We only need to create the button here. 
    // The theme application is now handled in head.html to prevent lag.

    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<span class="moon">☾</span><span class="sun">☀</span>';
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
});