// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initLoader();
    initCursor();
    initNavigation();
    initAnimations();
    initScrollEffects();
    initEnhancedScrollEffects();
    initSkillBars();
    initContactForm();
    initParallax();
    initChatbot();
});

// Loading Screen
function initLoader() {
    const loader = document.getElementById('loader');
    
    // Hide loader after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.style.overflow = 'visible';
        }, 1000);
    });
}

// Custom Cursor
function initCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursor || !cursorFollower) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;
    
    // Ultra smooth cursor movement with RAF and interpolation
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth interpolation animation
    function animateCursor() {
        // Lerp for ultra smooth movement
        cursorX += (mouseX - cursorX) * 0.8;
        cursorY += (mouseY - cursorY) * 0.8;
        
        followerX += (mouseX - followerX) * 0.12;
        followerY += (mouseY - followerY) * 0.12;
        
        // Apply transforms
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Enhanced cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .project-card, .service-card, .btn, .nav-link');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
            
            gsap.to(cursor, {
                scale: 3,
                duration: 0.3,
                ease: "back.out(2)"
            });
            
            gsap.to(cursorFollower, {
                scale: 1.5,
                duration: 0.4,
                ease: "back.out(1.7)"
            });
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
            
            gsap.to(cursor, {
                scale: 1,
                duration: 0.3,
                ease: "back.out(2)"
            });
            
            gsap.to(cursorFollower, {
                scale: 1,
                duration: 0.4,
                ease: "back.out(1.7)"
            });
        });
    });
    
    // Mouse tracking for project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            card.style.setProperty('--mouse-x', x + '%');
            card.style.setProperty('--mouse-y', y + '%');
        });
    });
}

// Navigation
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    let lastScrollY = 0;
    
    // Enhanced navbar scroll effect with hide/show
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            gsap.to(navbar, {
                y: -80,
                duration: 0.3,
                ease: "power2.out"
            });
        } else {
            gsap.to(navbar, {
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Mobile menu toggle with smooth animations
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        if (navMenu.classList.contains('active')) {
            gsap.from('.nav-menu .nav-link', {
                x: -50,
                opacity: 0,
                duration: 0.3,
                stagger: 0.1,
                ease: "power2.out"
            });
        }
    });
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Smooth scroll for navigation links with offset
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                gsap.to(window, {
                    scrollTo: {
                        y: targetSection,
                        offsetY: 80
                    },
                    duration: 1.2,
                    ease: "power3.inOut"
                });
            }
        });
    });
}

// Initialize AOS animations
function initAnimations() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });
}

// GSAP Scroll Animations
function initScrollEffects() {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero text animation with stagger
    const heroTimeline = gsap.timeline();
    heroTimeline
        .from('.title-line', {
            y: 100,
            opacity: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: 'power4.out'
        })
        .from('.hero-description', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.6')
        .from('.hero-buttons .btn', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'back.out(1.7)'
        }, '-=0.4')
        .from('.scroll-indicator', {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out'
        }, '-=0.2');
    
    // Section titles with magnetic effect
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.fromTo(title, 
            {
                y: 80,
                opacity: 0,
                rotationX: 45
            },
            {
                scrollTrigger: {
                    trigger: title,
                    start: 'top 85%',
                    end: 'bottom 15%'
                },
                y: 0,
                opacity: 1,
                rotationX: 0,
                duration: 1.2,
                ease: 'power4.out'
            }
        );
    });
    
    // Project cards with 3D effect
    gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.fromTo(card,
            {
                y: 100,
                opacity: 0,
                rotationY: 15,
                scale: 0.8
            },
            {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                    end: 'bottom 10%'
                },
                y: 0,
                opacity: 1,
                rotationY: 0,
                scale: 1,
                duration: 1,
                delay: i * 0.15,
                ease: 'power3.out'
            }
        );
        
        // Parallax effect on scroll
        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            },
            y: -50,
            ease: 'none'
        });
    });
    
    // Service cards with rotation
    gsap.utils.toArray('.service-card').forEach((card, i) => {
        gsap.fromTo(card,
            {
                y: 80,
                opacity: 0,
                rotation: 10,
                scale: 0.9
            },
            {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%'
                },
                y: 0,
                opacity: 1,
                rotation: 0,
                scale: 1,
                duration: 1.2,
                delay: i * 0.2,
                ease: 'back.out(1.7)'
            }
        );
    });
    
    // Stats counter animation
    gsap.utils.toArray('.stat-number').forEach(stat => {
        const finalValue = stat.textContent;
        gsap.fromTo(stat,
            { 
                textContent: 0,
                opacity: 0,
                scale: 0.5
            },
            {
                scrollTrigger: {
                    trigger: stat,
                    start: 'top 90%'
                },
                textContent: finalValue,
                opacity: 1,
                scale: 1,
                duration: 2,
                ease: 'power2.out',
                snap: { textContent: 1 }
            }
        );
    });
    
    // Enhanced floating shapes animation
    gsap.utils.toArray('.shape').forEach((shape, i) => {
        // Base floating animation
        gsap.to(shape, {
            y: -30,
            rotation: 360,
            duration: 8 + i * 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.5
        });
        
        // Parallax on scroll
        gsap.to(shape, {
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            },
            y: i % 2 === 0 ? -100 : 100,
            rotation: i % 2 === 0 ? 180 : -180,
            ease: 'none'
        });
    });
    
    // Skill categories animation
    gsap.utils.toArray('.skill-category').forEach((category, i) => {
        gsap.fromTo(category,
            {
                x: i % 2 === 0 ? -100 : 100,
                opacity: 0,
                rotationY: i % 2 === 0 ? -15 : 15
            },
            {
                scrollTrigger: {
                    trigger: category,
                    start: 'top 85%'
                },
                x: 0,
                opacity: 1,
                rotationY: 0,
                duration: 1,
                delay: i * 0.1,
                ease: 'power3.out'
            }
        );
    });
    
    // About section text reveal
    gsap.fromTo('.about-description',
        {
            y: 50,
            opacity: 0
        },
        {
            scrollTrigger: {
                trigger: '.about-description',
                start: 'top 85%'
            },
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.3,
            ease: 'power2.out'
        }
    );
    
    // Contact items slide in
    gsap.utils.toArray('.contact-item').forEach((item, i) => {
        gsap.fromTo(item,
            {
                x: -80,
                opacity: 0
            },
            {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 90%'
                },
                x: 0,
                opacity: 1,
                duration: 0.8,
                delay: i * 0.1,
                ease: 'power2.out'
            }
        );
    });
}

// Skill bars animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible && !bar.classList.contains('animated')) {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
                bar.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('scroll', animateSkillBars);
    animateSkillBars(); // Initial check
}

// Contact form
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (!form) return;
      // Initialize EmailJS - Configuration loaded from emailjs-config.js
    const config = window.EMAILJS_CONFIG || {};
    
    if (config.PUBLIC_KEY && config.PUBLIC_KEY !== "frB5N2TKQSuN5FLaV") {
        emailjs.init(config.PUBLIC_KEY);
    } else {
        console.warn('⚠️ EmailJS not configured. Please update emailjs-config.js with your credentials.');
    }
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form elements
        const submitBtn = form.querySelector('#send-btn');
        const formStatus = document.getElementById('form-status');
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        
        // Client-side validation
        if (!validateForm(nameInput, emailInput, subjectInput, messageInput)) {
            showFormStatus('error', '❌ Please fill in all fields correctly.');
            return;
        }
        
        // Rate limiting check
        if (!checkRateLimit()) {
            showFormStatus('error', '⚠️ Please wait before sending another message.');
            return;
        }
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Hide previous status
        formStatus.classList.remove('show', 'success', 'error');
          // Prepare email template parameters
        const templateParams = {
            from_name: nameInput.value,
            from_email: emailInput.value,
            subject: subjectInput.value,
            message: messageInput.value,
            reply_to: emailInput.value,
            to_name: "Moch Yunus"
        };
          try {
            // Send email via EmailJS - Configuration loaded from emailjs-config.js
            const config = window.EMAILJS_CONFIG || {};
            
            if (!config.SERVICE_ID || !config.TEMPLATE_ID || 
                config.SERVICE_ID === "service_calw00y" || 
                config.TEMPLATE_ID === "template_n5xxg4s") {
                throw new Error('EmailJS not properly configured');
            }
            
            const response = await emailjs.send(
                config.SERVICE_ID,
                config.TEMPLATE_ID,
                templateParams
            );
            
            console.log('Email sent successfully:', response);
              // Success
            showFormStatus('success', '✅ Message sent successfully! Thank you, I will reply soon.');
            form.reset();
            resetFormLabels(form);
              } catch (error) {
            console.error('EmailJS Error:', error);
            
            // Enhanced error handling
            let errorMessage = '❌ Failed to send message. ';
            
            if (error.status === 429) {
                errorMessage += 'Too many attempts. Please try again later.';
            } else if (error.status === 400) {
                errorMessage += 'Invalid data. Please check your form input.';
            } else if (error.status === 401) {
                errorMessage += 'Service not configured properly.';
            } else if (error.text && error.text.includes('Template')) {
                errorMessage += 'Email template issue. Please contact via social media.';
            } else {
                errorMessage += 'Please try again or contact me via social media.';
            }
            
            showFormStatus('error', errorMessage);
        } finally {
            // Reset button state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;        }
    });
    
    // Form input animations
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            const label = input.nextElementSibling;
            if (label) {
                label.style.top = '-0.5rem';
                label.style.fontSize = '0.875rem';
                label.style.color = 'var(--primary-color)';
            }
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                const label = input.nextElementSibling;
                if (label) {
                    label.style.top = '1rem';
                    label.style.fontSize = '1rem';
                    label.style.color = 'var(--text-secondary)';
                }
            }
        });
    });
}

// Helper function to reset form labels
function resetFormLabels(form) {
    const labels = form.querySelectorAll('label');
    labels.forEach(label => {
        label.style.top = '1rem';
        label.style.fontSize = '1rem';
        label.style.color = 'var(--text-secondary)';
    });
}

// Helper function to show status message (used by form validation)
function showFormStatus(type, message) {
    const formStatus = document.getElementById('form-status');
    if (!formStatus) return;
    
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    
    setTimeout(() => {
        formStatus.classList.add('show');
    }, 100);
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        formStatus.classList.remove('show');
    }, 5000);
}

// Form validation function
function validateForm(name, email, subject, message) {
    // Check if all fields are filled
    if (!name.value.trim() || !email.value.trim() || !subject.value.trim() || !message.value.trim()) {
        return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        showFormStatus('error', '❌ Please enter a valid email address.');
        return false;
    }
    
    // Name validation (no numbers or special chars)
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name.value)) {
        showFormStatus('error', '❌ Name should only contain letters and spaces.');
        return false;
    }
    
    // Message length validation
    if (message.value.length < 10) {
        showFormStatus('error', '❌ Message should be at least 10 characters long.');
        return false;
    }
    
    // Check for spam patterns
    const spamPatterns = ['http://', 'https://', 'www.', '.com', 'click here', 'buy now'];
    const messageText = message.value.toLowerCase();
    const hasSpamContent = spamPatterns.some(pattern => messageText.includes(pattern));
    
    if (hasSpamContent) {
        showFormStatus('error', '❌ Message contains suspicious content.');
        return false;
    }
    
    return true;
}

// Rate limiting function
function checkRateLimit() {
    const lastSubmission = localStorage.getItem('lastFormSubmission');
    const now = Date.now();
    const cooldownPeriod = 60000; // 1 minute
    
    if (lastSubmission && (now - parseInt(lastSubmission)) < cooldownPeriod) {
        return false;
    }
    
    localStorage.setItem('lastFormSubmission', now.toString());
    return true;
}

// Parallax effects
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-shapes .shape');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
}

// AI Chatbot functionality
function initChatbot() {
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const messageInput = document.getElementById('chatbot-message-input');
    const sendBtn = document.getElementById('chatbot-send-btn');
    const notification = document.getElementById('chatbot-notification');
    
    let isOpen = false;
      // Gemini AI Configuration
    const GEMINI_API_KEY = 'AIzaSyAPSjd7fabUs9POND8jpEC9QcasuN4DiZA';
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;
    
    // Knowledge base tentang Moch Yunus
    const knowledgeBase = {
        personal: {
            name: 'Yunus',
            fullName: 'Moch Yunus',
            education: 'Kuliah di salah satu kampus negeri yang ada di Jawa Timur sejak tahun 2022',
            major: 'Teknik Informatika',
            skills: ['Python', 'JavaScript', 'PHP', 'Laravel', 'HTML5', 'CSS3'],
            experience: 'Full Stack Developer dengan pengalaman dalam berbagai proyek web',
            services: 'Menyediakan jasa coding professional dan pengembangan aplikasi web',
            instagram: 'https://instagram.com/mchynss',
            telegram: 'https://t.me/wleooowleoooooo',
            github: 'https://github.com/mchynss',
            email: 'moch.yunus.am@gmail.com'
        },
        projects: [
            'Platform Ojek Online dengan sistem tracking real-time',
            'Sistem Reservasi Restoran dengan manajemen meja',
            'Platform Booking Tiket Wisata dengan payment gateway'
        ]
    };

    // Get user location for weather
    let userLocation = 'Jakarta'; // Default location
    
    async function getUserLocation() {
        try {
            if (navigator.geolocation) {
                return new Promise((resolve) => {
                    navigator.geolocation.getCurrentPosition(
                        async (position) => {
                            const { latitude, longitude } = position.coords;
                            try {
                                // Get city name from coordinates
                                const response = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=bd5e378503939ddaee76f12ad7a97608`);
                                const data = await response.json();
                                if (data && data[0]) {
                                    userLocation = data[0].name;
                                    resolve(userLocation);
                                } else {
                                    resolve('Jakarta');
                                }
                            } catch (error) {
                                resolve('Jakarta');
                            }
                        },
                        () => {
                            resolve('Jakarta'); // Fallback if location denied
                        }
                    );
                });
            } else {
                return 'Jakarta';
            }
        } catch (error) {
            return 'Jakarta';
        }
    }
    
    // Weather API function with user location
    async function getWeather() {
        try {
            const location = await getUserLocation();
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=bd5e378503939ddaee76f12ad7a97608&units=metric`);
            const data = await response.json();
            
            if (response.ok) {
                return {
                    location: data.name,
                    temperature: Math.round(data.main.temp),
                    description: data.weather[0].description,
                    humidity: data.main.humidity,
                    country: data.sys.country
                };
            } else {
                throw new Error('Weather API failed');
            }
        } catch (error) {
            // Fallback data
            return {
                location: userLocation,
                temperature: 28,
                description: 'Cerah',
                humidity: 75,
                country: 'ID'
            };
        }
    }      // Create smart context for Gemini AI
    function createContextPrompt(userMessage) {
        return `Kamu adalah Aci, AI Assistant yang pintar dan ramah untuk Moch Yunus, seorang Full Stack Developer Indonesia. Berikan respons yang tepat dan sesuai konteks.

INFORMASI MOCH YUNUS:
- Nama: Moch Yunus Ahmad Maulana  
- Pendidikan: Mahasiswa Teknik Informatika di kampus negeri Jawa Timur (sejak 2022)
- Keahlian: Python (90%), JavaScript (85%), PHP (80%), HTML5 (95%), CSS3 (90%), Laravel (85%)
- Email kontak: moch.yunus.am@gmail.com
- Instagram: @mchynss 
- Telegram: @wleooowleoooooo
- GitHub: @mchynss

PROYEK PORTFOLIO:
1. Platform Ojek Online - tracking real-time (PHP, Laravel, MySQL)
2. Sistem Reservasi Restoran - manajemen meja (JavaScript, PHP, CSS3)  
3. Platform Booking Tiket Wisata - payment gateway (Laravel, JavaScript)

TENTANG ANDA (ACI):
- Nama: Aci (AI Assistant Cerdas & Informatif)
- Peran: AI Assistant untuk Moch Yunus
- Kemampuan: Memberikan informasi lengkap, cuaca real-time, menjawab pertanyaan
- Kepribadian: Ramah, informatif, cerdas, dan helpful

ATURAN RESPONS:
- Jika ditanya "halo/hai": Sapa balik dengan ramah dan perkenalkan kemampuan Anda
- Jika ditanya "kamu siapa": Perkenalkan diri sebagai Aci dengan detail kemampuan
- Jika ditanya kontak/hubungi: Berikan email utama moch.yunus.am@gmail.com
- Jika ditanya about/tentang: Fokus pada profil pribadi dan pendidikan Moch Yunus
- Jika ditanya cuaca: Katakan "Tunggu sebentar, saya ambil data cuaca real-time untuk lokasi Anda..."
- Jika ditanya skill/keahlian: Jelaskan teknologi yang dikuasai Moch Yunus
- Jika ditanya proyek: Jelaskan 3 proyek utama Moch Yunus
- Gunakan bahasa Indonesia yang natural dan ramah
- Gunakan emoji yang relevan
- Jawab singkat tapi informatif
- Selalu bersikap helpful dan friendly

Pertanyaan user: "${userMessage}"

Berikan respons yang tepat dan sesuai konteks sebagai Aci:`;
    }// Smart AI Response function using Gemini
    async function getAIResponse(message) {
        try {
            // Handle weather request specifically
            if (message.toLowerCase().includes('cuaca') || message.toLowerCase().includes('weather')) {
                const weather = await getWeather();
                return `🌤️ **Cuaca Real-time di ${weather.location}:**

📍 **Lokasi:** ${weather.location}, ${weather.country}
🌡️ **Suhu:** ${weather.temperature}°C
☁️ **Kondisi:** ${weather.description}
💧 **Kelembaban:** ${weather.humidity}%

*Data cuaca diambil secara real-time dari lokasi Anda*`;
            }

            // Use Gemini AI for intelligent responses
            const prompt = createContextPrompt(message);
            
            const response = await fetch(GEMINI_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 1024,
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
                return data.candidates[0].content.parts[0].text;
            } else {
                throw new Error('Invalid response structure from Gemini API');
            }        } catch (error) {
            console.error('Error calling Gemini API:', error);
            
            // Smart fallback responses with more context
            const lowerMessage = message.toLowerCase();
            
            // Handle greetings
            if (lowerMessage.includes('halo') || lowerMessage.includes('hai') || lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
                return `👋 **Halo! Senang bertemu dengan Anda!**

Saya Aci, AI Assistant yang siap membantu Anda mengetahui segala hal tentang Moch Yunus! 

🤖 **Saya bisa membantu dengan:**
• Informasi tentang Moch Yunus
• Cuaca real-time di lokasi Anda
• Kontak dan cara menghubungi
• Portfolio dan proyek-proyek
• Keahlian teknologi

Silakan tanyakan apa saja! 😊`;
            }
            
            // Handle self introduction
            if (lowerMessage.includes('kamu siapa') || lowerMessage.includes('siapa kamu') || lowerMessage.includes('perkenalkan') || lowerMessage.includes('who are you')) {
                return `🤖 **Perkenalkan, saya Aci!**

Saya adalah **AI Assistant** yang dibuat khusus untuk membantu Anda mengenal Moch Yunus lebih dekat.

✨ **Tentang Saya:**
• Nama: **Aci** (AI Assistant Cerdas & Informatif)
• Tugas: Memberikan informasi lengkap tentang Moch Yunus
• Kemampuan: Menjawab pertanyaan, memberikan info cuaca real-time
• Teknologi: Powered by Google Gemini AI

💡 **Saya bisa membantu Anda dengan:**
• Profil dan latar belakang Moch Yunus
• Portfolio proyek dan pengalaman
• Skill dan keahlian teknologi
• Informasi kontak dan cara menghubungi
• Cuaca terkini di lokasi Anda

Jangan ragu untuk bertanya apa saja! 🚀`;
            }
            
            if (lowerMessage.includes('kontak') || lowerMessage.includes('contact') || lowerMessage.includes('hubungi') || lowerMessage.includes('email')) {
                return `📧 **Kontak Moch Yunus:**

**Email:** moch.yunus.am@gmail.com
**Instagram:** @mchynss  
**Telegram:** @wleooowleoooooo
**GitHub:** @mchynss

Silakan kirim email untuk konsultasi coding atau kerjasama proyek! 🚀`;
            }
            
            if (lowerMessage.includes('about') || lowerMessage.includes('tentang') || lowerMessage.includes('profil') || lowerMessage.includes('siapa')) {
                return `👨‍💻 **Tentang Moch Yunus:**

Saya adalah mahasiswa **Teknik Informatika** di kampus negeri Jawa Timur sejak 2022. Passionate dalam web development dan menyediakan jasa coding professional.

🎓 **Pendidikan:** Teknik Informatika  
💻 **Fokus:** Full Stack Development
🚀 **Pengalaman:** Berbagai proyek web modern
📧 **Email:** moch.yunus.am@gmail.com`;
            }

            if (lowerMessage.includes('skill') || lowerMessage.includes('keahlian') || lowerMessage.includes('teknologi')) {
                return `🛠️ **Keahlian Teknologi Moch Yunus:**

**Programming Languages:**
• Python (90%) - Advanced
• JavaScript (85%) - Advanced  
• PHP (80%) - Advanced

**Frontend Technologies:**
• HTML5 (95%) - Expert
• CSS3 (90%) - Advanced
• Modern CSS Frameworks

**Backend & Frameworks:**
• Laravel (85%) - Advanced
• Database Management (75%)
• API Development

💼 **Layanan:** Jasa coding professional dan pengembangan aplikasi web`;
            }

            if (lowerMessage.includes('proyek') || lowerMessage.includes('project') || lowerMessage.includes('portfolio')) {
                return `🚀 **Proyek Portfolio Moch Yunus:**

**1. Platform Ojek Online**
• Real-time tracking system
• PHP, Laravel, MySQL
• Payment gateway integration

**2. Sistem Reservasi Restoran**  
• Table management system
• JavaScript, PHP, CSS3
• Customer feedback system

**3. Platform Booking Tiket Wisata**
• Tourism ticket booking
• Laravel, JavaScript, Bootstrap
• Payment processing system

✨ Semua proyek menunjukkan kemampuan full-stack development!`;
            }
              return `🤖 **Maaf, sedang ada gangguan koneksi AI.**

Tapi saya tetap bisa membantu! Saya Aci, AI Assistant Anda.

Silakan tanya tentang:
• **Halo** - Sapa saya untuk memulai percakapan
• **Kamu siapa** - Kenalan dengan saya lebih dekat
• **Kontak** - Cara menghubungi Moch Yunus
• **About** - Profil dan pendidikan pribadi  
• **Cuaca** - Informasi cuaca real-time
• **Skills** - Keahlian dan teknologi
• **Proyek** - Portfolio dan pengalaman

Coba tanya lagi dengan kata kunci di atas! 😊`;
        }
    }
    
    // Add message to chat
    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        
        messageDiv.innerHTML = `
            <div class="message-avatar">${isUser ? '👤' : '🤖'}</div>
            <div class="message-content">
                <p>${content.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>
            </div>
        `;
        
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Add typing indicator
    function addTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.id = 'typing-indicator';
        
        typingDiv.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <span>Sedang mengetik</span>
                <div class="typing-dots">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        
        chatbotMessages.appendChild(typingDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Remove typing indicator
    function removeTypingIndicator() {
        const typing = document.getElementById('typing-indicator');
        if (typing) {
            typing.remove();
        }
    }
    
    // Send message
    async function sendMessage(message) {
        if (!message.trim()) return;
        
        // Add user message
        addMessage(message, true);
        messageInput.value = '';
        
        // Add typing indicator
        addTypingIndicator();
        
        // Simulate thinking time
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
        
        // Remove typing indicator
        removeTypingIndicator();
        
        // Get and add AI response
        const response = await getAIResponse(message);
        addMessage(response);
    }
    
    // Event listeners
    chatbotToggle.addEventListener('click', () => {
        isOpen = !isOpen;
        if (isOpen) {
            chatbotWindow.classList.add('active');
            notification.style.display = 'none';
            messageInput.focus();
        } else {
            chatbotWindow.classList.remove('active');
        }
    });
    
    chatbotClose.addEventListener('click', () => {
        isOpen = false;
        chatbotWindow.classList.remove('active');
    });
    
    sendBtn.addEventListener('click', () => {
        const message = messageInput.value;
        sendMessage(message);
    });
    
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const message = messageInput.value;
            sendMessage(message);
        }
    });
    
    // Quick reply buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('quick-reply')) {
            const message = e.target.dataset.message;
            sendMessage(message);
        }
    });
    
    // Show notification after 3 seconds
    setTimeout(() => {
        if (!isOpen) {
            notification.style.display = 'flex';
        }
    }, 3000);
}

// Smooth scroll for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        if (!this.classList.contains('loading')) {
            this.classList.add('loading');
            setTimeout(() => {
                this.classList.remove('loading');
            }, 1000);
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.project-card, .service-card, .skill-category, .stat-item').forEach(el => {
    observer.observe(el);
});

// Add hover effects to cards
document.querySelectorAll('.project-card, .service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
        this.style.boxShadow = '0 25px 50px -12px rgba(99, 102, 241, 0.25)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = 'none';
    });
});

// Progressive text reveal animation
function revealText(element) {
    const text = element.textContent;
    element.textContent = '';
    
    for (let i = 0; i < text.length; i++) {
        setTimeout(() => {
            element.textContent += text[i];
        }, i * 50);
    }
}

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(1);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Typewriter effect for hero title
function typewriterEffect() {
    const titleLines = document.querySelectorAll('.title-line');
    
    titleLines.forEach((line, index) => {
        const text = line.textContent;
        line.textContent = '';
        line.style.opacity = '1';
        
        setTimeout(() => {
            let i = 0;
            const timer = setInterval(() => {
                if (i < text.length) {
                    line.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(timer);
                }
            }, 100);
        }, index * 1000);
    });
}

// Initialize typewriter effect after page load
window.addEventListener('load', () => {
    setTimeout(typewriterEffect, 1500);
});

// Add performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    const scrolled = window.pageYOffset;
    
    // Update scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.style.opacity = scrolled > 100 ? '0' : '1';
    }
    
    // Parallax effect for floating shapes
    const shapes = document.querySelectorAll('.floating-shapes .shape');
    shapes.forEach((shape, index) => {
        const speed = 0.3 + (index * 0.1);
        const yPos = -(scrolled * speed);
        shape.style.transform = `translateY(${yPos}px)`;
    });
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Add smooth page transitions
function initPageTransitions() {
    // Fade in animation when page loads
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });
}

initPageTransitions();

// Enhanced scroll effects with magnetic interactions
function initEnhancedScrollEffects() {
    // Magnetic effect for section titles
    document.querySelectorAll('.section-title').forEach(title => {
        title.addEventListener('mousemove', (e) => {
            const rect = title.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(title, {
                x: x * 0.15,
                y: y * 0.15,
                rotationY: x * 0.05,
                rotationX: -y * 0.05,
                duration: 0.6,
                ease: "power2.out"
            });
        });
        
        title.addEventListener('mouseleave', () => {
            gsap.to(title, {
                x: 0,
                y: 0,
                rotationY: 0,
                rotationX: 0,
                duration: 0.8,
                ease: "power2.out"
            });
        });
    });
    
    // Enhanced parallax for floating shapes
    gsap.registerPlugin(ScrollTrigger);
    
    document.querySelectorAll('.shape').forEach((shape, index) => {
        gsap.to(shape, {
            y: -100 * (index + 1),
            rotation: 180 * (index + 1),
            scrollTrigger: {
                trigger: shape,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5
            }
        });
    });
    
    // Smooth reveal animations for cards
    gsap.utils.toArray('.project-card, .service-card, .skill-category').forEach(card => {
        gsap.from(card, {
            y: 80,
            opacity: 0,
            scale: 0.9,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse"
            }
        });
    });
    
    // Staggered text animations
    gsap.utils.toArray('.hero-title .title-line').forEach((line, index) => {
        gsap.from(line, {
            y: 100,
            opacity: 0,
            duration: 1.5,
            delay: index * 0.2,
            ease: "power3.out"
        });
    });
}

initEnhancedScrollEffects();
