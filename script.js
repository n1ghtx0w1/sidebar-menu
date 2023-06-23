const menuItems = document.querySelectorAll('.menu-item');
const contentContainer = document.querySelector('.content');
const sidebar = document.querySelector('.sidebar');
const signOutButton = document.querySelector('.sign-out-btn');
const pageTitle = document.querySelector('.page-title');

// Function to toggle the submenu
function toggleSubmenu(menuItem) {
  const submenu = menuItem.querySelector('.submenu');
  if (submenu) {
    submenu.classList.toggle('show');
    menuItem.classList.toggle('open');
  }
}

// Add event listeners to toggle the submenus on menu click
menuItems.forEach(menuItem => {
  menuItem.addEventListener('click', () => {
    toggleSubmenu(menuItem);
  });
});

// Function to close the sidebar when clicking outside of it
function closeSidebar(event) {
  const isOutsideSidebar = !sidebar.contains(event.target);
  if (isOutsideSidebar) {
    sidebar.classList.remove('sidebar-collapsed');
  }
}

// Event listener to close the sidebar when clicking outside of it
document.addEventListener('click', closeSidebar);

// Set welcome page
function loadWelcomeContent() {
  const welcomeURL = 'pages/overview.html';

  // Fetch the welcome page content
  fetch(welcomeURL)
    .then(response => response.text())
    .then(html => {
    // Load the welcome page content into the dynamic-content element
    const dynamicContent = document.querySelector('#dynamic-content');
    dynamicContent.innerHTML = html;

    // Rebind the event listeners for the submenu links in the loaded content
    bindSubmenuLinks();
    })
    .catch(error => {
      console.error('Error loading welcome content:', error);
      const dynamicContent = document.querySelector('#dynamic-content');
      dynamicContent.textContent = 'Error loading welcome content.';
    });
}

// Load content function
function loadContent(submenuLink, event) {
  event.preventDefault();
  const contentURL = 'pages/' + submenuLink.getAttribute('href');
  const submenuText = submenuLink.textContent;

  // Update page title with the clicked submenu text
  if (contentURL !== 'overview.html') {
    pageTitle.textContent = submenuText;
  } else {
    pageTitle.textContent = 'CS Team'; // Set your company name here
  }

  // Fetch page content
  fetch(contentURL)
    .then(response => response.text())
    .then(html => {
      // Load page content into the content container
      contentContainer.innerHTML = html;

      // After loading the content, rebind the event listeners for the submenu links in the loaded content
      bindSubmenuLinks();
    })
    .catch(error => {
      console.error('Error loading content:', error);
      contentContainer.textContent = 'Error loading content.';
    });
}

// Bind submenu links
function bindSubmenuLinks() {
// Get all the submenu links in the loaded content
const loadedSubmenuLinks = document.querySelectorAll('.submenu a');

// Attach click event listeners to the submenu links
loadedSubmenuLinks.forEach(loadedSubmenuLink => {
loadedSubmenuLink.addEventListener('click', event => loadContent(loadedSubmenuLink, event));
});
}

// Submenu Click Handler Function
function submenuLinkClickHandler(submenuLink, event) {
  loadContent(submenuLink, event);
}

// Get the submenu links and attach click event listeners
const submenuLinks = document.querySelectorAll('.submenu a');
submenuLinks.forEach(submenuLink => {
  submenuLink.addEventListener('click', event => {
    submenuLinkClickHandler(submenuLink, event);
  });
});

// Load the welcome content when the page loads
window.addEventListener('load', loadWelcomeContent);

// Click handler for sign-out button
signOutButton.addEventListener('click', () => {
    // Redirect to the sign-out page
    window.location.href = 'pages/signout.html';
  });

// Load the stats content when the stats submenu link is clicked
const statsSubmenuLink = document.querySelector('#stats-submenu');
statsSubmenuLink.addEventListener('click', event => {
  loadContent(statsSubmenuLink, event);
});
