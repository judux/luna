// Product Data Array
// Utilizing the exact 51 images currently in the 'assetes' folder
const filenames = [
    "WhatsApp Image 2026-03-17 at 8.42.35 PM (2).jpeg",
    "WhatsApp Image 2026-03-17 at 8.42.35 PM (3).jpeg",
    "WhatsApp Image 2026-03-17 at 8.42.35 PM.jpeg",
    "WhatsApp Image 2026-03-17 at 8.42.36 PM (1).jpeg",
    "WhatsApp Image 2026-03-17 at 8.42.36 PM (2).jpeg",
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

const products = filenames.map((file, i) => {
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

// DOM Elements
const productGrid = document.getElementById('productGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const cartBadge = document.querySelector('.cart-badge');
const toast = document.getElementById('toast');
let cartCount = 0;

// Function to render products
function renderProducts(category = 'all') {
    productGrid.innerHTML = ''; // Clear grid

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
                <span class="product-category">${product.categoryLabel}</span>
                <h3 class="product-title">${product.title}</h3>
                <span class="product-price">${product.price}</span>
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
        const filterValue = btn.getAttribute('data-filter');
        renderProducts(filterValue);
    });
});

// Cartesian Math and Animations 
window.addToCart = function() {
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
});

// =========================================
// Presentation Mode Logic
// =========================================
let presentationInterval;
let currentPresentationIndex = 0;
const presentationOverlay = document.getElementById('presentationOverlay');
const pImg = document.getElementById('presentationImg');
const pTitle = document.getElementById('presentationTitle');
const pCategory = document.getElementById('presentationCategory');
const pContent = document.getElementById('presentationContent');

window.togglePresentation = function() {
    event.preventDefault(); // prevent anchor jumps
    
    const isActive = presentationOverlay.classList.contains('active');
    
    if (isActive) {
        // Stop Presentation
        presentationOverlay.classList.remove('active');
        clearInterval(presentationInterval);
        document.body.style.overflow = 'auto'; // Restore normal scrolling
    } else {
        // Start Presentation
        presentationOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock scrolling
        
        // Start from beginning or random, let's start from 0
        currentPresentationIndex = 0;
        updatePresentationSlide();
        
        // Cycle every 6 seconds
        presentationInterval = setInterval(() => {
            // Trigger Fade Out
            pContent.classList.remove('fade-in');
            pContent.classList.add('fade-out');
            
            // Wait for fade out CSS transition to finish, then swap data and fade in
            setTimeout(() => {
                currentPresentationIndex = (currentPresentationIndex + 1) % products.length;
                updatePresentationSlide();
            }, 800); 
            
        }, 6000); 
    }
};

function updatePresentationSlide() {
    const prod = products[currentPresentationIndex];
    // We append a random query parameter to the QR code so it "looks" dynamic if we wanted, 
    // but the static link works perfectly for the demo.
    
    pImg.src = prod.image;
    pTitle.textContent = prod.title;
    pCategory.textContent = prod.categoryLabel;
    
    // Trigger Fade In
    pContent.classList.remove('fade-out');
    pContent.classList.add('fade-in');
}
