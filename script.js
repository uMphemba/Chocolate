// ============================================================
// DATA
// ============================================================
const sectionsData = [{
    id: 'white',
    type: 'white',
    bg: 'radial-gradient(circle at center, #FFF8EC 0%, #F4E8D0 45%, #B89D6A 100%)',
    theme: 'light',
    subtitle: 'Velvet Sweetness.\nPure Indulgence.',
    desc: 'Creamy white chocolate crafted with\nMadagascar vanilla and silky cocoa butter.\n\nSmooth, delicate, and irresistibly luxurious.',
    watermark: 'White',
    image: 'images/white.png',
    particles: ['#e8d5b0', '#c9a87c', '#f5e7d3', '#b48b5a']
}, {
    id: 'dark',
    type: 'dark',
    bg: 'radial-gradient(circle at center, #6B4423 0%, #2A1810 50%, #080403 100%)',
    theme: 'dark',
    subtitle: 'Bold. Intense.\nUnforgettable.',
    desc: 'Rich cocoa notes unfold into layers\nof depth and sophistication.\n\nCrafted for true chocolate connoisseurs.',
    watermark: 'Dark',
    image: 'images/dark.png',
    particles: ['#4a2c1a', '#6b3f28', '#2f1a0f', '#8b5d3c']
}, {
    id: 'silk',
    type: 'silk',
    bg: 'radial-gradient(circle at center, #3B82F6 0%, #172554 45%, #020617 100%)',
    theme: 'dark',
    subtitle: 'Wrapped In Elegance.\nCrafted For Desire.',
    desc: 'A luxurious milk chocolate experience\nwith velvety texture and unforgettable richness.\n\nThe definition of modern indulgence.',
    watermark: 'Silk',
    image: 'images/silk.png',
    particles: ['#6b8fc4', '#aac1e8', '#2a4066', '#c0d4f0']
}, {
    id: 'pista',
    type: 'pista',
    bg: 'radial-gradient(circle at center, #CDE8B5 0%, #567A36 45%, #13200B 100%)',
    theme: 'light',
    subtitle: 'A Taste Of Luxury Nature.',
    desc: 'Premium roasted pistachios meet\nsmooth artisan chocolate in perfect harmony.\n\nNutty, creamy, and remarkably refined.',
    watermark: 'Pista',
    image: 'images/pista.png',
    particles: ['#b8d99a', '#7ea85a', '#d4e8b5', '#4a6a2a']
}];

// ============================================================
// STATE
// ============================================================
let currentTheme = 'light';
const bgLayer = document.getElementById('bg-layer');
const navbar = document.getElementById('navbar');

// ============================================================
// HELPERS
// ============================================================
function updateTheme(themeType, bgGradient) {
    bgLayer.style.background = bgGradient;
    const isLight = themeType === 'light';
    navbar.style.color = isLight ? '#2A1810' : '#FFFFFF';
    currentTheme = themeType;
}

// ============================================================
// CREATE PARTICLES
// ============================================================
function createParticles(container, colors) {
    const count = 28;
    for (let i = 0; i < count; i++) {
        const el = document.createElement('div');
        el.className = 'particle';
        const size = 2 + Math.random() * 5;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const dur = 14 + Math.random() * 18;
        const delay = Math.random() * 10;
        const color = colors[Math.floor(Math.random() * colors.length)];

        el.style.width = size + 'px';
        el.style.height = size + 'px';
        el.style.left = x + '%';
        el.style.top = y + '%';
        el.style.background = color;
        el.style.opacity = 0.15 + Math.random() * 0.35;
        el.style.setProperty('--dir-x', (Math.random() > 0.5 ? 1 : -1) * (0.5 + Math.random()));
        el.style.setProperty('--dir-y', (Math.random() > 0.5 ? 1 : -1) * (0.5 + Math.random()));
        el.style.animation = `particleFloat ${dur}s ease-in-out ${delay}s infinite alternate`;

        container.appendChild(el);
    }
}

// ============================================================
// BUILD SECTIONS
// ============================================================
const app = document.getElementById('app');

sectionsData.forEach((sec, idx) => {
    const section = document.createElement('section');
    section.id = sec.id;
    section.dataset.theme = sec.theme;
    section.dataset.type = sec.type;

    // Particles
    const particlesDiv = document.createElement('div');
    particlesDiv.className = 'particles-container';
    createParticles(particlesDiv, sec.particles);

    // Watermark
    const watermark = document.createElement('div');
    watermark.className = 'watermark';
    watermark.textContent = sec.watermark;

    // Grid
    const grid = document.createElement('div');
    grid.className = 'section-grid';

    // Left: Image
    const leftCol = document.createElement('div');
    leftCol.className = 'section-left';

    const imageWrap = document.createElement('div');
    imageWrap.className = 'image-3d-wrap';

    const img = document.createElement('img');
    img.src = sec.image;
    img.alt = sec.type + ' chocolate';
    img.className = 'choco-image';
    img.loading = 'lazy';

    imageWrap.appendChild(img);
    leftCol.appendChild(imageWrap);

    // Right: Text
    const rightCol = document.createElement('div');
    rightCol.className = 'section-right content-block';

    const sub = document.createElement('h2');
    sub.className = 'subtitle';
    sub.textContent = sec.subtitle;

    const desc = document.createElement('p');
    desc.className = 'desc';
    desc.textContent = sec.desc;

    rightCol.appendChild(sub);
    rightCol.appendChild(desc);

    grid.appendChild(leftCol);
    grid.appendChild(rightCol);

    section.appendChild(particlesDiv);
    section.appendChild(watermark);
    section.appendChild(grid);

    app.appendChild(section);

    // Set initial theme
    if (idx === 0) {
        updateTheme(sec.theme, sec.bg);
    }
});

// ============================================================
// INTERSECTION OBSERVER
// ============================================================
const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const section = entry.target;
            const theme = section.dataset.theme;
            const sectionData = sectionsData.find(s => s.id === section.id);

            if (sectionData) {
                updateTheme(theme, sectionData.bg);
            }

            // Trigger animations
            const wm = section.querySelector('.watermark');
            const content = section.querySelector('.content-block');
            const img = section.querySelector('.choco-image');

            if (wm) wm.classList.add('visible');
            if (content) content.classList.add('visible');
            if (img) img.classList.add('visible');
        }
    });
}, {
    threshold: 0.5
});

sections.forEach(s => observer.observe(s));

// ============================================================
// 3D MOUSE PARALLAX
// ============================================================
let mouseX = 0,
    mouseY = 0;

document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    mouseX = x * 12;
    mouseY = y * -12;
});

function animateParallax() {
    const wraps = document.querySelectorAll('.image-3d-wrap');
    wraps.forEach(wrap => {
        const rotX = mouseY * 0.8;
        const rotY = mouseX * 0.8;
        wrap.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });
    requestAnimationFrame(animateParallax);
}
animateParallax();

// ============================================================
// SCROLL NAVBAR PADDING
// ============================================================
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================================
// INITIAL VISIBILITY (first section)
// ============================================================
setTimeout(() => {
    const first = document.querySelector('section');
    if (first) {
        const wm = first.querySelector('.watermark');
        const content = first.querySelector('.content-block');
        const img = first.querySelector('.choco-image');
        if (wm) wm.classList.add('visible');
        if (content) content.classList.add('visible');
        if (img) img.classList.add('visible');
    }
}, 300);

console.log('CHÂTEAU luxury scroll experience ready');