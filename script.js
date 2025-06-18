// script.js

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

// 1. Smooth scroll for internal anchor links (on the same page)
document.querySelectorAll('.scroll-link').forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');

        // Check if the link is an internal hash link (e.g., #projects, #contact)
        // AND if it points to the current page (or no specific page)
        if (targetId && targetId.startsWith('#') && link.pathname === window.location.pathname) {
            e.preventDefault(); // Prevent default jump behavior
            scrollToTarget(targetId);
            // Optionally update URL hash without jumping, for better browser history
            history.pushState(null, null, targetId);
        }
        // If it's a link to another page with a hash (e.g., index.html#projects),
        // we let the default browser behavior navigate to that page.
        // The 'handleHashOnLoad' function (below) will then take over on the new page.
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

// Run this when the page first loads
document.addEventListener('DOMContentLoaded', handleHashOnLoad);

// Run this if the hash changes on the same page (e.g., if user manually edits URL hash)
window.addEventListener('hashchange', handleHashOnLoad);


// 3. Theme toggle (with switch)
const themeToggle = document.getElementById('toggle-mode');
if (themeToggle) { // Added a check to ensure element exists before adding listener
    themeToggle.addEventListener('change', () => {
        document.body.classList.toggle('light-mode');
        // Optional: Save theme preference to localStorage
        if (document.body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    });
    // Check for saved theme preference on load
    // Moved inside DOMContentLoaded to ensure elements are ready
    document.addEventListener('DOMContentLoaded', () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
            themeToggle.checked = true;
        }
    });
}

// 4. Contact form submission (assuming Firebase)
// Moved inside DOMContentLoaded to ensure elements and firebase-init.js are ready
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            formStatus.textContent = 'Sending...';
            formStatus.style.color = '#ffd700'; // Yellow/gold

            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const message = document.getElementById('contactMessage').value;

            try {
                // Assuming you have firebase-init.js setting up 'db' (Firestore)
                // If you are using a different backend, replace this part.
                // This assumes firebase-init.js exports a 'db' object and is type="module"
                const { db } = await import('./firebase-init.js');
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
});