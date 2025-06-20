// script.js - Centralized JavaScript for your portfolio

// --- Helper Functions ---

// Function to handle smooth scrolling to a target ID
function scrollToTarget(targetId) {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
        });
    }
}

// Function to apply the theme to the body
// 'theme' can be 'dark' or 'light'
function applyTheme(theme) {
    const body = document.body;
    const toggleSwitch = document.getElementById('toggle-mode');

    if (theme === 'dark') {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
        if (toggleSwitch) {
            toggleSwitch.checked = true; // Set toggle to checked state (dark)
        }
    } else { // Defaults to light if not explicitly dark
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        if (toggleSwitch) {
            toggleSwitch.checked = false; // Set toggle to unchecked state (light)
        }
    }
    // Save the preference to localStorage
    localStorage.setItem('theme', theme);
}


// --- Main Initialization on DOMContentLoaded ---
document.addEventListener('DOMContentLoaded', () => {

    // 1. Smooth scroll for internal anchor links (on the same page)
    document.querySelectorAll('.scroll-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            const targetPath = link.pathname.replace(/^\//, ''); // Get path without leading slash
            const currentPath = window.location.pathname.replace(/^\//, ''); // Get current path

            // Check if the link is an internal hash link (starts with #)
            // AND if it points to the current page (or no specific page)
            // Example: "index.html#projects" on index.html, or "#about" on current page
            if (targetId && targetId.startsWith('#') && targetPath === currentPath) {
                e.preventDefault(); // Prevent default jump behavior
                scrollToTarget(targetId);
                // Optionally update URL hash without jumping, for better browser history
                history.pushState(null, null, targetId);
            }
            // If it's a link to another page with a hash (e.g., index.html#projects),
            // we let the default browser behavior navigate to that page.
            // The 'handleHashOnLoad' logic will then take over on the new page.
        });
    });

    // 2. Handle scrolling to a specific hash when the page loads (for cross-page navigation)
    const handleHashOnLoad = () => {
        if (window.location.hash) {
            const targetId = window.location.hash;
            // A small delay helps ensure the page content is fully rendered
            // and any AOS animations have completed before attempting to scroll.
            setTimeout(() => {
                scrollToTarget(targetId);
            }, 100); // 100ms delay
        }
    };
    handleHashOnLoad(); // Run once on load
    // Run this if the hash changes on the same page (e.g., if user manually edits URL hash)
    window.addEventListener('hashchange', handleHashOnLoad);


    // 3. Theme toggle (with switch)
    const themeToggle = document.getElementById('toggle-mode');
    if (themeToggle) { // Only run if the toggle element exists on the current page
        // Initialize theme on page load based on localStorage or default
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            applyTheme(savedTheme); // Apply saved theme
        } else {
            // Default theme if nothing is saved (e.g., 'light' or 'dark')
            // Let's set 'light' as the default initial state if no preference is found
            applyTheme('light');
        }

        // Add event listener for toggle changes
        themeToggle.addEventListener('change', () => {
            if (themeToggle.checked) { // If checkbox is checked, it means the user wants dark mode
                applyTheme('dark');
            } else { // If unchecked, it means the user wants light mode
                applyTheme('light');
            }
        });
    }

    // 4. Contact form submission (assuming Firebase is loaded globally by firebase-init.js)
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    // Only set up contact form listener if the form element exists on the current page
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            formStatus.textContent = 'Sending...';
            formStatus.style.color = '#ffd700'; // Yellow/gold

            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const message = document.getElementById('contactMessage').value;

            try {
                // Ensure 'firebase' object is available globally from firebase-init.js
                // If you're using modular Firebase SDK (import { db } from './firebase-init.js';)
                // then you'd need to adjust this. For most simple portfolio setups, it's global.
                const db = firebase.firestore(); // Access Firestore instance

                const docRef = await db.collection('contacts').add({
                    name,
                    email,
                    message,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });
                console.log("Document written with ID: ", docRef.id);
                formStatus.textContent = 'Message sent successfully!';
                formStatus.style.color = '#28a745'; // Green
                contactForm.reset();
            } catch (error) {
                console.error("Error adding document: ", error);
                formStatus.textContent = 'Failed to send message. Please try again.';
                formStatus.style.color = '#dc3545'; // Red
            }
        });
    }

    // 5. Initialize AOS (must be called after AOS library is loaded and DOM is ready)
    // This will run after the theme is set, ensuring correct animations based on initial styling.
    AOS.init({
        duration: 800,
        once: true
    });

}); // End of DOMContentLoaded listener