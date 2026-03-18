// Product Data Array
// Utilizing the exact 51 images currently in the 'assetes' folder
const filenames = [
    "WhatsApp Image 2026-03-17 at 8.42.35 PM (2).jpeg",
    "WhatsApp Image 2026-03-17 at 8.42.35 PM (3).jpeg",
    "WhatsApp Image 2026-03-17 at 8.42.35 PM.jpeg",
    "WhatsApp Image 2026-03-17 at 8.42.36 PM (1).jpeg",
    "WhatsApp Image 2026-03-17 at 8.42.36 PM (3).jpeg",
    "WhatsApp Image 2026-03-17 at 8.42.36 PM.jpeg",
    "WhatsApp Image 2026-03-17 at 8.42.37 PM (1).jpeg",
    "WhatsApp Image 2026-03-17 at 8.42.37 PM (2).jpeg",
    "WhatsApp Image 2026-03-17 at 8.42.37 PM (3).jpeg",
    "WhatsApp Image 2026-03-17 at 8.42.37 PM.jpeg",
    "WhatsApp Image 2026-03-17 at 8.42.38 PM (1).jpeg",
    "WhatsApp Image 2026-03-17 at 8.42.38 PM (2).jpeg",
    "WhatsApp Image 2026-03-17 at 8.42.38 PM (3).jpeg",
    "WhatsApp Image 2026-03-17 at 8.42.38 PM (4).jpeg",
    "WhatsApp Image 2026-03-17 at 8.42.38 PM.jpeg",
    "WhatsApp Image 2026-03-17 at 8.42.39 PM (1).jpeg",
    "WhatsApp Image 2026-03-17 at 8.42.39 PM (2).jpeg",
    "WhatsApp Image 2026-03-17 at 8.42.39 PM (3).jpeg",
    "WhatsApp Image 2026-03-17 at 8.42.39 PM.jpeg",
    "WhatsApp Image 2026-03-17 at 8.42.40 PM (1).jpeg",
    "WhatsApp Image 2026-03-17 at 8.42.40 PM (2).jpeg",
    "WhatsApp Image 2026-03-17 at 8.42.40 PM (3).jpeg",
    "WhatsApp Image 2026-03-17 at 8.42.40 PM.jpeg",
    "WhatsApp Image 2026-03-17 at 8.42.41 PM (1).jpeg",
    "WhatsApp Image 2026-03-17 at 8.42.41 PM (2).jpeg",
    "WhatsApp Image 2026-03-17 at 8.42.41 PM (3).jpeg",
    "WhatsApp Image 2026-03-17 at 8.42.41 PM (4).jpeg",
    "WhatsApp Image 2026-03-17 at 8.42.41 PM.jpeg",
    "WhatsApp Image 2026-03-17 at 8.42.42 PM (1).jpeg",
    "WhatsApp Image 2026-03-17 at 8.42.42 PM (2).jpeg",
    "WhatsApp Image 2026-03-17 at 8.42.42 PM (3).jpeg",
    "WhatsApp Image 2026-03-17 at 8.42.42 PM.jpeg",
    "WhatsApp Image 2026-03-17 at 8.42.43 PM (1).jpeg",
    "WhatsApp Image 2026-03-17 at 8.42.43 PM (2).jpeg",
    "WhatsApp Image 2026-03-17 at 8.42.43 PM (3).jpeg",
    "WhatsApp Image 2026-03-17 at 8.42.43 PM.jpeg",
    "WhatsApp Image 2026-03-17 at 8.42.44 PM (1).jpeg",
    "WhatsApp Image 2026-03-17 at 8.42.44 PM (2).jpeg",
    "WhatsApp Image 2026-03-17 at 8.42.44 PM (3).jpeg",
    "WhatsApp Image 2026-03-17 at 8.42.44 PM.jpeg",
    "WhatsApp Image 2026-03-17 at 8.42.45 PM.jpeg",
    "capilar 8.jpeg",
    "capilar 9.jpeg",
    "capilares 1.jpeg",
    "capilares 2.jpeg",
    "capilares 4.jpeg",
    "capilares 5.jpeg",
    "capilares 6.jpeg",
    "capilares 7.jpeg",
    "capilares3.jpeg"
];

const allProducts = filenames.map((file, i) => {
    // Clasificar según nombre del archivo si tiene la palabra 'capilar'
    const isCapilar = file.toLowerCase().includes('capilar');
    return {
        id: i + 1,
        title: isCapilar ? "Producto Capilar " + (i + 1) : "Producto Maquillaje " + (i + 1),
        category: isCapilar ? "capilar" : "maquillaje",
        categoryLabel: isCapilar ? "Capilar" : "Maquillaje",
        price: "$" + (20 + (i % 30)) + ".00",
        image: encodeURI("assetes/" + file)
    };
});

// Remove specifically asked product ("Producto Maquillaje 5" and broken image "Producto Maquillaje 1")
const products = allProducts.filter(p => p.title !== "Producto Maquillaje 5" && p.title !== "Producto Maquillaje 1");

// DOM Elements
const productGrid = document.getElementById('productGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const cartBadge = document.querySelector('.cart-badge');
const toast = document.getElementById('toast');
let cartCount = 0;
let currentFilter = 'all'; // Keep track of current filter

// Function to render products (Standard Grid)
function renderProducts(category = 'all') {
    productGrid.innerHTML = ''; // Clear grid
    productGrid.className = 'product-grid'; // Ensure standard class

    const filteredProducts = category === 'all' ? products : products.filter(p => p.category === category);

    filteredProducts.forEach((product, index) => {
        // Create card element
        const card = document.createElement('div');
        card.classList.add('product-card', 'fade-in-element');
        card.style.animationDelay = `${index * 0.1}s`;

        card.innerHTML = `
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.title}" class="product-image" loading="lazy">
                <div class="product-overlay">
                    <button class="btn-add-cart" onclick="addToCart()">Añadir al Carrito</button>
                </div>
            </div>
            <div class="product-info">
                
            </div>
        `;
        productGrid.appendChild(card);
    });

    // Trigger fade in animation for new elements
    setTimeout(() => {
        const cards = document.querySelectorAll('.fade-in-element');
        cards.forEach(card => card.classList.add('visible'));
    }, 50);
}

// Filter Logic
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active class
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter products
        currentFilter = btn.getAttribute('data-filter');
        if (isPresentationActive) {
            renderMarquee(currentFilter);
        } else {
            renderProducts(currentFilter);
            setupScrollAnimations(); // Re-trigger scroll observer for new items
        }
    });
});

// Cartesian Math and Animations 
window.addToCart = function () {
    // Increase count
    cartCount++;
    cartBadge.textContent = cartCount;

    // Bump animation on cart icon
    cartBadge.classList.add('bump');
    setTimeout(() => {
        cartBadge.classList.remove('bump');
    }, 300);

    // Show Toast
    showToast();
};

function showToast() {
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Sticky Navbar Logic
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = 'var(--shadow-sm)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    setupScrollAnimations();
});

// Setup Scroll Animations (Landing Page Style)
function setupScrollAnimations() {
    // Determine which side they animate from
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        // Just alternating odd/even side classes
        if (index % 2 === 0) {
            card.classList.add('slide-hidden-left');
        } else {
            card.classList.add('slide-hidden-right');
        }
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Let it trigger a bit earlier
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove the default fade-in class so they don't fight
                entry.target.classList.remove('fade-in-element', 'visible');
                // Ensure browser repaints before applying the visible class
                requestAnimationFrame(() => {
                    entry.target.classList.add('slide-in-visible');
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    setTimeout(() => {
       cards.forEach(card => observer.observe(card));
    }, 200);
}

// =========================================
// Presentation Mode Logic (Infinite Marquee)
// =========================================
let isPresentationActive = false;

window.togglePresentation = function () {
    event.preventDefault(); // prevent anchor jumps

    isPresentationActive = !isPresentationActive;
    const btn = document.querySelector('.btn-desfile');
    
    if (isPresentationActive) {
        // Start Presentation
        btn.innerHTML = '<i class="fa-solid fa-stop"></i> Detener';
        btn.classList.add('active-presentation');
        renderMarquee(currentFilter);
        
        // Scroll slightly down to focus on catalog
        document.getElementById('catalogo').scrollIntoView({behavior: 'smooth', block: 'start'});
    } else {
        // Stop Presentation
        btn.innerHTML = '<i class="fa-solid fa-play"></i> Modo Desfile';
        btn.classList.remove('active-presentation');
        renderProducts(currentFilter);
        setupScrollAnimations(); // Re-apply grid animations
    }
};

function renderMarquee(category) {
    productGrid.innerHTML = ''; // Clear grid
    productGrid.className = 'marquee-container'; // Change root class

    const filteredProducts = category === 'all' ? products : products.filter(p => p.category === category);
    if(filteredProducts.length === 0) return;

    // Split items into 3 rows for the marquee effect
    const rows = 3;
    const itemsPerRow = Math.ceil(filteredProducts.length / rows);
    
    for(let r = 0; r < rows; r++) {
        const rowProducts = filteredProducts.slice(r * itemsPerRow, (r + 1) * itemsPerRow);
        if(rowProducts.length === 0) continue;

        const trackWrapper = document.createElement('div');
        trackWrapper.className = 'marquee-track-wrapper';
        
        const track = document.createElement('div');
        // Alternating directions (Even row goes left, Odd row goes right via CSS reverse)
        track.className = `marquee-track ${r % 2 === 0 ? 'marquee-left' : 'marquee-right'}`;
        
        // Duplicate content 3 times for a seamless infinite loop
        const loopContent = [...rowProducts, ...rowProducts, ...rowProducts];
        
        loopContent.forEach((product) => {
            const card = document.createElement('div');
            card.classList.add('product-card', 'marquee-card');
            card.innerHTML = `
                <div class="product-image-container">
                    <img src="${product.image}" alt="${product.title}" class="product-image" loading="lazy">
                    <div class="product-overlay">
                        <button class="btn-add-cart" onclick="addToCart()">Añadir al Carrito</button>
                    </div>
                </div>
                <div class="product-info">
                    <!-- Kept clean for marquee mode -->
                </div>
            `;
            track.appendChild(card);
        });

        trackWrapper.appendChild(track);
        productGrid.appendChild(trackWrapper);
    }
}
