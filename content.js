// Track the currently hovered anchor element
let hoveredAnchor = null;

// Function to show notification
function showNotification(message) {
  // Remove any existing notification
  const existingNotification = document.getElementById('copy-link-notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement('div');
  notification.id = 'copy-link-notification';
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #4CAF50;
    color: white;
    padding: 12px 20px;
    border-radius: 6px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 10000;
    opacity: 0;
    transform: translateX(100%);
    transition: all 0.3s ease-in-out;
    pointer-events: none;
  `;

  // Add to page
  document.body.appendChild(notification);

  // Trigger animation
  requestAnimationFrame(() => {
    notification.style.opacity = '1';
    notification.style.transform = 'translateX(0)';
  });

  // Auto-remove after 2 seconds
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }, 2000);
}

// Listen for mouseover events on anchor elements
document.addEventListener('mouseover', (event) => {
  const target = event.target.closest('a');
  if (target && target.href) {
    hoveredAnchor = target;
  }
});

// Listen for mouseout events to clear hovered anchor
document.addEventListener('mouseout', (event) => {
  const target = event.target.closest('a');
  if (target === hoveredAnchor) {
    hoveredAnchor = null;
  }
});

// Listen for keydown events
document.addEventListener('keydown', (event) => {
  // Check if Ctrl+C (Windows/Linux) or Cmd+C (Mac) is pressed
  const isCopyShortcut = (event.ctrlKey || event.metaKey) && event.key === 'c';
  
  if (isCopyShortcut && hoveredAnchor) {
    // Check if any text is selected
    const selection = window.getSelection();
    const hasSelection = selection.toString().trim().length > 0;
    
    if (!hasSelection) {
      // Prevent default copy behavior
      event.preventDefault();
      
      // Copy the href URL to clipboard
      navigator.clipboard.writeText(hoveredAnchor.href).then(() => {
        console.log('URL copied to clipboard:', hoveredAnchor.href);
        showNotification('Link copied');
      }).catch((error) => {
        console.error('Failed to copy URL:', error);
        showNotification('Copy failed');
      });
    }
  }
});
