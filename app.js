// app.js (located in your root PORTFOLIO folder)

particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 80, // Number of particles
            "density": {
                "enable": true,
                "value_area": 800 // Density of particles
            }
        },
        "color": {
            "value": "#ffffff" // Particle color (white for dark mode)
        },
        "shape": {
            "type": "circle", // "circle", "edge", "triangle", "polygon", "star", "image"
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            },
            "image": {
                "src": "img/github.svg", // If you use image particles, adjust this path relative to index.html
                "width": 100,
                "height": 100
            }
        },
        "opacity": {
            "value": 0.5, // Particle opacity
            "random": false,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 3, // Particle size
            "random": true,
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true, // Connect particles with lines
            "distance": 150, // Max distance for lines
            "color": "#ffffff", // Line color
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 6, // Movement speed
            "direction": "none", // "none", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left"
            "random": false,
            "straight": false,
            "out_mode": "out", // "out", "bounce"
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "grab" // "grab", "bubble", "repulse"
            },
            "onclick": {
                "enable": true,
                "mode": "push" // "push", "remove", "bubble", "repulse"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 180, // Distance for grab mode
                "line_linked": {
                    "opacity": 1 // Line opacity when grabbed
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
});

// Optional: Adjust particle color based on theme
function updateParticlesColor(isLightMode) {
    const particlesJsEl = document.getElementById('particles-js');
    // This check ensures particles.js is fully loaded before trying to access its properties
    if (!particlesJsEl || !particlesJsEl.particles) {
        console.warn("Particles.js not fully initialized, cannot update color.");
        return;
    }

    let newParticleColor = isLightMode ? "#333333" : "#ffffff"; // Dark particles for light mode, white for dark mode
    let newLineColor = isLightMode ? "#888888" : "#ffffff";

    // Update particle color
    particlesJsEl.particles.color.value = newParticleColor;
    // Update line color
    particlesJsEl.particles.line_linked.color.value = newLineColor;

    // Redraw particles to apply changes
    particlesJsEl.particles.fn.particlesRefresh();
}