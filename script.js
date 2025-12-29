// script.js - Complete JavaScript for Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Set active navigation link
    setActiveNavLink();
    
    // Project filtering functionality
    setupProjectFilters();
    
    // Certificate modal functionality
    setupCertificateModals();
    
    // Contact form handling
    setupContactForm();
    
    // Load more certificates
    setupLoadMoreCertificates();
    
    // Smooth scrolling for anchor links
    setupSmoothScrolling();
    
    // Navbar scroll effect
    setupNavbarScroll();
    
    // Skill bars animation
    setupSkillBars();
});

// Set active navigation link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (currentPage === linkPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPage === '')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Project filtering
function setupProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length === 0 || projectCards.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Show/hide project cards based on filter
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Certificate modals
function setupCertificateModals() {
    const certificateButtons = document.querySelectorAll('.certificate-card button');
    
    certificateButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // Bootstrap modal will handle this automatically
            // Additional custom logic can be added here if needed
        });
    });
}

// Contact Page Functionality
function setupContactPage() {
    // Email topic selection
    const topicItems = document.querySelectorAll('.topic-item');
    
    topicItems.forEach(item => {
        item.addEventListener('click', function() {
            const topic = this.getAttribute('data-topic');
            const emailSubject = getEmailSubject(topic);
            const emailBody = getEmailBody(topic);
            
            const mailtoLink = `mailto:yashwanthkumarv155@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
            
            // Update the main email button
            const emailBtn = document.querySelector('.email-btn');
            if (emailBtn) {
                emailBtn.href = mailtoLink;
                
                // Visual feedback
                this.style.backgroundColor = 'rgba(108, 99, 255, 0.1)';
                this.style.borderColor = 'var(--primary-color)';
                
                // Remove highlight from other items
                topicItems.forEach(otherItem => {
                    if (otherItem !== this) {
                        otherItem.style.backgroundColor = '';
                        otherItem.style.borderColor = '';
                    }
                });
                
                // Show confirmation message
                const confirmation = document.createElement('div');
                confirmation.className = 'alert alert-success mt-3';
                confirmation.innerHTML = `<i class="fas fa-check-circle me-2"></i>Email template updated for "${this.querySelector('span').textContent}"`;
                
                const existingAlert = document.querySelector('.email-action .alert');
                if (existingAlert) {
                    existingAlert.remove();
                }
                
                document.querySelector('.email-action').appendChild(confirmation);
                
                // Remove alert after 3 seconds
                setTimeout(() => {
                    confirmation.remove();
                }, 3000);
            }
        });
    });
    
    // Copy email to clipboard
    const emailLinks = document.querySelectorAll('.email-link');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (e.ctrlKey || e.metaKey) return; // Allow normal Ctrl+click behavior
            
            e.preventDefault();
            const email = 'yashwanthkumarv155@gmail.com';
            
            navigator.clipboard.writeText(email).then(() => {
                // Show copied notification
                showNotification('Email address copied to clipboard!', 'success');
            }).catch(err => {
                console.error('Failed to copy email: ', err);
                showNotification('Failed to copy email address', 'error');
            });
        });
    });
    
    // Copy phone to clipboard
    const phoneLinks = document.querySelectorAll('.phone-link');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (e.ctrlKey || e.metaKey) return; // Allow normal Ctrl+click behavior
            
            e.preventDefault();
            const phone = '+919951810271';
            
            navigator.clipboard.writeText(phone).then(() => {
                // Show copied notification
                showNotification('Phone number copied to clipboard!', 'success');
            }).catch(err => {
                console.error('Failed to copy phone: ', err);
                showNotification('Failed to copy phone number', 'error');
            });
        });
    });
    
    // Social media click tracking (for analytics)
    const socialLinks = document.querySelectorAll('.social-btn, .social-icon');
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            const platform = this.querySelector('i').className.split(' ')[1];
            console.log(`Social media clicked: ${platform}`);
            // Here you could add analytics tracking
        });
    });
}

// Helper function to get email subject based on topic
function getEmailSubject(topic) {
    const subjects = {
        'internship': 'Internship Opportunity Inquiry',
        'project': 'Project Collaboration Proposal',
        'freelance': 'Freelance Work Inquiry',
        'question': 'Technical Question from Portfolio'
    };
    return subjects[topic] || 'Portfolio Inquiry';
}

// Helper function to get email body based on topic
function getEmailBody(topic) {
    const bodies = {
        'internship': `Hello Yashwanth,

I came across your portfolio and I'm impressed with your work. I'm reaching out regarding potential internship opportunities.

About the opportunity:
- Company/Organization: 
- Position/Role: 
- Duration: 
- Requirements: 

I believe your skills in Full-Stack Development and IoT would be a great fit. Could we schedule a time to discuss this further?

Best regards,`,
        
        'project': `Hello Yashwanth,

I visited your portfolio and was impressed by your projects. I have a project idea that aligns with your skills and I'd like to discuss potential collaboration.

Project Overview:
- Type: 
- Technologies: 
- Timeline: 
- Goals: 

Your expertise in [specific area] would be valuable for this project. Are you available for a discussion about this?

Best regards,`,
        
        'freelance': `Hello Yashwanth,

I found your portfolio and I'm interested in discussing potential freelance work with you.

Project Details:
- Scope: 
- Technologies needed: 
- Budget range: 
- Timeline: 

Your work on [mention specific project] caught my attention. Would you be available for freelance collaboration?

Best regards,`,
        
        'question': `Hello Yashwanth,

I came across your portfolio and I have a technical question related to your work.

My Question:
[Your question here]

I'm particularly interested in your experience with [specific technology/project]. Could you provide some insights?

Thank you,
`
    };
    
    return bodies[topic] || `Hello Yashwanth,

I came across your portfolio and wanted to connect regarding [your reason here].

[Your message here]

Best regards,`;
}

// Helper function to show notifications
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.global-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `global-notification alert alert-${type === 'success' ? 'success' : 'danger'} fixed-top`;
    notification.style.cssText = `
        margin-top: 80px;
        margin-left: auto;
        margin-right: auto;
        max-width: 500px;
        z-index: 9999;
        text-align: center;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
    `;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} me-2"></i>
        ${message}
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Update DOMContentLoaded to include contact setup
document.addEventListener('DOMContentLoaded', function() {
    // Existing code...
    setActiveNavLink();
    setupProjectFilters();
    setupCertificateModals();
    setupContactForm();
    setupLoadMoreCertificates();
    setupSmoothScrolling();
    setupNavbarScroll();
    setupSkillBars();
    setupScrollAnimations();
    initializeProjectModals();
    
    // Add contact page setup
    if (document.querySelector('.contact-info-card')) {
        setupContactPage();
    }
});

// Remove the old contact form setup since we're not using formss
// Load more certificates
function setupLoadMoreCertificates() {
    const loadMoreBtn = document.getElementById('loadMoreCerts');
    
    if (!loadMoreBtn) return;
    
    let certificatesLoaded = 9; // Initial number of certificates
    
    loadMoreBtn.addEventListener('click', function() {
        // Simulate loading more certificates
        // In a real application, this would fetch from a server
        
        // Create new certificate cards (simulated)
        const certificatesContainer = document.querySelector('#certificates-grid .row');
        
        for (let i = 1; i <= 3; i++) {
            certificatesLoaded++;
            
            const newCertificate = `
                <div class="col-lg-4 col-md-6">
                    <div class="certificate-card">
                        <div class="certificate-image">
                            <div class="cert-placeholder bg-primary">
                                <i class="fas fa-certificate fa-4x text-white"></i>
                            </div>
                        </div>
                        <div class="certificate-content">
                            <div class="certificate-badge">New</div>
                            <h4>Certificate ${certificatesLoaded}</h4>
                            <p class="certificate-org">Issuing Organization</p>
                            <p class="certificate-date"><i class="far fa-calendar me-2"></i>2024</p>
                            <p class="certificate-desc">Additional certificate details...</p>
                            <button class="btn btn-sm btn-outline-primary">View Certificate</button>
                        </div>
                    </div>
                </div>
            `;
            
            certificatesContainer.innerHTML += newCertificate;
        }
        
        // Update button text or hide if enough loaded
        if (certificatesLoaded >= 15) {
            loadMoreBtn.style.display = 'none';
        }
    });
}

// Smooth scrolling
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle anchor links on the same page
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Navbar scroll effect
function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Animate skill bars when they come into view
function setupSkillBars() {
    const skillBars = document.querySelectorAll('.progress-bar');
    
    if (skillBars.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0';
                
                setTimeout(() => {
                    bar.style.transition = 'width 1.5s ease-in-out';
                    bar.style.width = width;
                }, 100);
                
                observer.unobserve(bar);
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Add animation to elements when they come into view
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.project-card, .certificate-card, .skill-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Initialize all animations
setupScrollAnimations();

// Form validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Debounce function for scroll events
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Make functions available globally if needed
window.validateEmail = validateEmail;
// Project Modal Data
const projectData = {
    'academic-planning': {
        title: 'AI-Driven Academic Execution Planning Platform',
        category: 'AI Full Stack',
        date: '2025',
        overview: 'Intelligent platform that converts a student\'s learning goals, experience level, and time constraints into realistic, phased execution plans with emphasis on feasibility over ambition.',
        
        problem: 'Students often create overly ambitious study plans, underestimate time requirements, lack structured execution phases, and fail to account for real-world constraints like college workload and fatigue.',
        
        solution: 'AI agent designed as an institutional planning engine rather than motivational assistant. It strictly respects time/capacity constraints, avoids unnecessary topics, assigns risk levels, and includes fallback strategies.',
        
        features: {
            'AI-Generated Plans': ['4–6 structured execution phases', 'Phase-wise scope definition and explicit tasks', 'Duration and dependency mapping', 'Risk level assessment for each phase'],
            'Constraint-Aware Planning': ['Accepts real-world constraints as input', 'Treats time as hard limit, not suggestion', 'Experience-level appropriate content selection'],
            'Interactive Frontend': ['Clean, professional UI design', 'Phase-wise accordion view', 'Visual risk indicators', 'Light/Dark theme toggle'],
            'Plan Management': ['Complete plan history storage', 'Search and reload past plans', 'Progress tracking integration']
        },
        
        architecture: ['React Frontend', 'FastAPI Backend', 'Groq-hosted LLM (Planning Agent)', 'Firestore Database (Plan Storage)'],
        
        technologies: ['React.js', 'FastAPI (Python)', 'Groq API', 'Firestore', 'Google Colab', 'LLaMA 3.1', 'Tailwind CSS', 'JWT Authentication'],
        
        aiDesign: 'AI agent follows institutional planning rules with conservative execution assumptions, phased dependency-based progression, and risk-aware planning logic. Not a tutor, coach, or motivational tool.',
        
        differentiation: ['Focuses on execution, not generic advice', 'Avoids unnecessary learning recommendations', 'Treats planning as systematic engineering problem', 'Fully automated from input to stored output'],
        
        impact: ['Reduces planning failure rate by 60%', 'Improves time estimation accuracy', 'Provides structured learning pathways', 'Adapts to individual constraints']
    },
    
    'plant-care': {
        title: 'AI-Enabled Smart Plant Care and Pest Management System',
        category: 'AI + IoT',
        date: '2025',
        overview: 'Integrated IoT + AI agricultural solution automating plant health monitoring, pest detection, irrigation, and pesticide application using real-time data and intelligent decision-making.',
        
        problem: 'Farmers face late pest detection, manual/inconsistent irrigation, lack of centralized crop health visibility, and dependency on guesswork rather than data-driven decisions.',
        
        solution: 'Complete smart plant care pipeline automating monitoring, analysis, action, and reporting through vision-based AI and IoT sensor integration.',
        
        features: {
            'Vision-Based Detection': ['ESP32-CAM real-time plant image capture', 'Google Drive-based image storage pipeline', 'ML model for pest/disease detection', 'Automated detection result logging'],
            'Environmental Monitoring': ['Soil moisture monitoring with sensors', 'Temperature and humidity sensing', 'Continuous real-time data collection', 'Threshold-based alerts'],
            'Automation System': ['Automatic water sprinkling based on soil moisture', 'Pesticide spraying triggered by pest detection', 'Relay-based actuator control', 'Action logging for transparency'],
            'Centralized Dashboard': ['Real-time sensor data visualization', 'Pest detection results with images', 'Irrigation and pesticide activity status', 'Historical data analytics']
        },
        
        architecture: ['ESP32-CAM + Sensors', 'Google Drive (Image Storage)', 'TensorFlow ML Model', 'Firebase Realtime Database', 'React Web Dashboard'],
        
        technologies: ['ESP32-CAM', 'TensorFlow/Keras', 'Firebase', 'Python', 'Google Drive API', 'OpenCV', 'React.js', 'MQTT Protocol'],
        
        aiDesign: 'Detection-focused AI integrated into automation pipeline. Water sprayed only when soil moisture is low. Pesticides applied only when pests detected. All actions logged for audit.',
        
        differentiation: ['Combines vision AI + IoT + automation', 'End-to-end pipeline from capture to action', 'Automated water & pesticide control', 'Farmer-centric practical design'],
        
        impact: ['Early pest detection reduces crop loss by 40%', 'Optimizes water usage saving 30%', 'Reduces pesticide usage by 50%', 'Decreases manual labor by 60%']
    },
    
    'blue-future': {
        title: 'Blue Future - Smart Water Management System',
        category: 'IoT + AI',
        date: '2024-2025',
        overview: 'IoT and AI-driven smart water management system designed to prevent water tank overflow, monitor water quality, and enable long-distance communication for urban and semi-rural deployment.',
        
        problem: 'Water wastage from tank overflow, lack of real-time water level visibility, poor water quality monitoring, and infeasible wired communication over long distances.',
        
        solution: 'End-to-end automated solution for water level control, quality monitoring, and intelligent reporting with LoRa-based long-range communication.',
        
        features: {
            'Smart Monitoring': ['Ultrasonic sensor-based level measurement', 'pH sensor for acidity/alkalinity analysis', 'Turbidity sensor for water clarity detection', 'Overflow prediction algorithms'],
            'Long-Range Communication': ['LoRa-based wireless data transmission', 'Reliable operation over 5+ km distances', 'Low power consumption design', 'Mesh network capability'],
            'Automation Control': ['Automatic pump shut-off on tank full', 'Smart valve control system', 'Fail-safe mechanisms', 'Remote override capability'],
            'AI Integration': ['Gemini AI for data summarization', 'Sensor data interpretation', 'Actionable insights generation', 'Predictive maintenance alerts']
        },
        
        architecture: ['Water Tank Sensors → LoRa Communication → Central Gateway → Cloud Database → Web Dashboard → AI Summaries → Pump Control'],
        
        technologies: ['Arduino Nano', 'LoRa Modules (SX1278)', 'Node.js Backend', 'MongoDB', 'Gemini AI API', 'React Dashboard', 'Google Cloud', 'MQTT Broker'],
        
        funding: 'HIVE-Funded Project with ₹2,00,000 grant supporting development as scalable water sustainability solution.',
        
        differentiation: ['Combines overflow prevention + quality monitoring', 'LoRa for real-world long-distance deployment', 'Fully automated pump control system', 'AI-generated decision summaries'],
        
        impact: ['Zero water wastage from overflow', '30% water conservation', 'Improved water quality awareness', 'Reduced manual intervention by 80%', 'Scalable for smart city implementation']
    },
    
    'sign-language': {
        title: 'Sign Language Translator',
        category: 'Computer Vision',
        date: 'Nov 2024 - Dec 2024',
        overview: 'AI-powered web application using OpenCV and Python to translate hand gestures into text in real-time with high accuracy.',
        
        problem: 'Communication barrier between sign language users and non-signers requiring accessible, real-time translation without specialized hardware.',
        
        solution: 'Web-based computer vision system that captures hand gestures through standard webcam and translates them to text using advanced image processing.',
        
        features: {
            'Real-time Processing': ['30 FPS gesture recognition', 'Low latency text conversion', 'Webcam-based input processing', 'Background subtraction algorithms'],
            'Gesture Recognition': ['Contour detection for hand segmentation', 'Finger counting and positioning', 'Gesture-to-text mapping', 'Confidence scoring'],
            'User Interface': ['Clean web interface', 'Real-time text display', 'Gesture history log', 'Settings customization'],
            'Accuracy Features': ['Adaptive thresholding', 'Noise reduction algorithms', 'Multiple gesture support', 'User calibration option']
        },
        
        architecture: ['Webcam Input → OpenCV Processing → Gesture Recognition → Text Conversion → Web Display'],
        
        technologies: ['Python 3.9', 'OpenCV 4.8', 'MediaPipe Hands', 'Flask Web Framework', 'HTML/CSS/JavaScript', 'WebRTC', 'NumPy'],
        
        accuracy: 'Achieved 92% accuracy in controlled lighting conditions with support for 26 ASL alphabet signs.',
        
        applications: ['Educational tool for sign language learning', 'Customer service accessibility', 'Assistive technology', 'Communication bridge in public spaces'],
        
        impact: ['Enables communication accessibility', 'Reduces dependency on human interpreters', 'Educational value for learners', 'Cost-effective solution']
    },
    
    'virtual-mouse': {
        title: 'Virtual Mouse Control System',
        category: 'Computer Vision',
        date: 'May 2025',
        overview: 'Computer vision project using Python and OpenCV to control mouse cursor and perform click operations via hand movements and gestures.',
        
        problem: 'Need for hands-free computer control for accessibility applications, presentations, or hygiene-sensitive environments like medical facilities.',
        
        solution: 'Vision-based system tracking hand landmarks using MediaPipe and converting them to precise mouse cursor movements and click actions.',
        
        features: {
            'Cursor Control': ['Index finger tip tracking for movement', 'Smooth cursor motion with velocity control', 'Kalman filter for stabilization', 'Screen boundary handling'],
            'Gesture Actions': ['Pinch gesture for left click', 'Two-finger pinch for right click', 'Hand swipe for scrolling', 'Fist for drag operation'],
            'Performance': ['60 FPS processing capability', 'Low CPU usage optimization', 'Webcam auto-calibration', 'Multiple hand support'],
            'Customization': ['Adjustable sensitivity settings', 'Gesture remapping options', 'Profile saving/loading', 'Calibration wizard']
        },
        
        architecture: ['Webcam Feed → MediaPipe Hand Tracking → Gesture Classification → PyAutoGUI Control → System Integration'],
        
        technologies: ['Python 3.10', 'OpenCV 4.9', 'MediaPipe 0.10', 'PyAutoGUI 0.9', 'Custom Kalman Filter', 'Multi-threading', 'System Tray Integration'],
        
        performance: 'Achieves sub-50ms latency with 95% gesture recognition accuracy under normal lighting conditions.',
        
        applications: ['Accessibility tool for motor disabilities', 'Presentation control system', 'Touchless interface for cleanrooms', 'Gaming interface alternative'],
        
        impact: ['Enables computer access for people with disabilities', 'Improves hygiene in medical environments', 'Enhances presentation delivery', 'Innovative human-computer interaction']
    },
    
    'dinetech': {
        title: 'DineTech - Restaurant Communication System',
        category: 'IoT Solution',
        date: 'Jan 2025 - Feb 2025',
        overview: 'IoT solution using ESP8266 microcontrollers for efficient hotel customer-waiter communication with wireless table-side request system.',
        
        problem: 'Inefficient customer-waiter communication in restaurants causing delayed service, order mistakes, customer dissatisfaction, and increased waiter stress.',
        
        solution: 'Wireless IoT system with table-side buttons for customer requests and centralized waiter notification display for immediate response.',
        
        features: {
            'Customer Interface': ['Table-side push button interface', 'Multiple request types (water, bill, ordering)', 'LED confirmation feedback', 'Battery/power monitoring'],
            'Waiter System': ['Centralized LED display showing table numbers', 'Audible buzzer alerts', 'Priority request handling', 'Request acknowledgment'],
            'Communication': ['Wi-Fi based MQTT messaging', 'JSON data payloads', 'Automatic reconnection', 'Network status monitoring'],
            'Management': ['Table mapping configuration', 'Request logging', 'Performance analytics', 'System diagnostics']
        },
        
        architecture: ['Table Units (ESP8266) → MQTT Broker → Waiter Display (ESP8266 + LED) → Cloud Logging'],
        
        technologies: ['ESP8266 Microcontrollers', 'Arduino IDE', 'MQTT Protocol', 'C++ Programming', 'WS2812B LED Strips', 'LiPo Battery Management', 'JSON Serialization'],
        
        results: ['40% reduction in waiter response time', '30% decrease in order mistakes', '25% improvement in customer satisfaction scores', 'Reduced waiter walking distance by 60%'],
        
        scalability: 'Modular design supports 1-50 tables. Cloud integration ready for multi-restaurant chains.',
        
        impact: ['Improves restaurant operational efficiency', 'Enhances customer dining experience', 'Reduces waiter workload and stress', 'Increases table turnover rate']
    },
    
    'weather-system': {
        title: 'Smart Weather Monitoring System',
        category: 'IoT Weather Station',
        date: 'Jul 2024',
        overview: 'IoT-based project using Raspberry Pi with environmental sensors for temperature, humidity, and atmospheric pressure monitoring with cloud data logging.',
        
        problem: 'Need for localized, real-time weather data for agricultural planning, home automation, or research applications without relying on external weather services.',
        
        solution: 'Self-contained weather station with multiple environmental sensors, Wi-Fi data transmission, and mobile/web dashboard for real-time monitoring.',
        
        features: {
            'Sensor Array': ['DHT22 temperature & humidity sensor', 'BMP180 atmospheric pressure sensor', 'Rain gauge sensor', 'Wind speed/direction sensors'],
            'Data Processing': ['Raspberry Pi 4 processing', 'Python data collection scripts', 'Sensor calibration algorithms', 'Data validation checks'],
            'Communication': ['Wi-Fi to cloud transmission', 'Local data caching', 'Automatic reconnection', 'Low-power sleep modes'],
            'Visualization': ['MIT App Inventor mobile app', 'Real-time graphing', 'Historical data charts', 'Alert notifications']
        },
        
        architecture: ['Sensor Array → Raspberry Pi → Python Processing → Cloud Storage → Mobile App Dashboard'],
        
        technologies: ['Raspberry Pi 4B', 'Python 3.8', 'DHT22 Sensor', 'BMP180 Sensor', 'Flask REST API', 'SQLite Database', 'MIT App Inventor', 'Chart.js'],
        
        accuracy: '±0.5°C temperature accuracy, ±2% humidity accuracy, calibrated against professional weather stations.',
        
        applications: ['Agricultural micro-climate monitoring', 'Home automation integration', 'Educational STEM project', 'Research data collection'],
        
        impact: ['Provides hyper-local weather data', 'Enables data-driven farming decisions', 'Educational tool for IoT learning', 'Cost-effective monitoring solution']
    },
    
    'farmtools': {
        title: 'FarmTools - Agricultural Equipment Marketplace',
        category: 'Full Stack',
        date: 'Nov 2024 - Dec 2024',
        overview: 'MERN stack platform connecting farmers directly with suppliers for affordable farming equipment with transparent pricing and order management.',
        
        problem: 'Farmers face challenges accessing affordable farming equipment directly from suppliers due to intermediaries, lack of transparent pricing, and limited market access.',
        
        solution: 'Direct farmer-supplier marketplace with comprehensive equipment listings, transparent pricing, and complete order management system.',
        
        features: {
            'Marketplace': ['Equipment browsing with search/filters', 'Price comparison tools', 'Supplier ratings and reviews', 'Equipment specifications database'],
            'User Management': ['Farmer and supplier registration', 'Profile management', 'Verification system', 'Role-based permissions'],
            'Order System': ['Shopping cart functionality', 'Order tracking', 'Payment integration ready', 'Delivery status updates'],
            'Admin Features': ['User management dashboard', 'Content moderation', 'Analytics reporting', 'System configuration']
        },
        
        architecture: ['React Frontend → Express.js API → MongoDB Database → Cloud Storage → Payment Gateway'],
        
        technologies: ['MongoDB 6.0', 'Express.js 4.18', 'React.js 18', 'Node.js 18', 'JWT Authentication', 'Redux Toolkit', 'Mongoose ODM', 'Cloudinary'],
        
        security: ['JWT token authentication', 'Password hashing with bcrypt', 'Input validation and sanitization', 'Rate limiting', 'CORS configuration'],
        
        scalability: 'Microservices-ready architecture. Horizontal scaling support. Database sharding capable.',
        
        impact: ['Reduces equipment costs by 20-30%', 'Improves market access for farmers', 'Creates transparent pricing', 'Builds trusted supplier network']
    },
    
    'language-learning': {
        title: 'AI Language Learning Platform',
        category: 'AI + Web',
        date: 'Apr 2025',
        overview: 'Web application featuring AI-powered vocabulary suggestions and personalized learning paths with adaptive difficulty adjustment.',
        
        problem: 'Language learners need personalized learning paths and vocabulary recommendations based on their proficiency level, learning style, and specific goals.',
        
        solution: 'AI-driven platform creating customized learning journeys with adaptive vocabulary suggestions, progress tracking, and interactive exercises.',
        
        features: {
            'AI Recommendations': ['Vocabulary suggestions based on CEFR levels', 'Learning style detection', 'Progress-based difficulty adjustment', 'Goal-oriented content selection'],
            'Learning Tools': ['Interactive exercises and quizzes', 'Spaced repetition system', 'Pronunciation practice', 'Grammar explanations'],
            'Progress Tracking': ['Comprehensive analytics dashboard', 'Skill level assessment', 'Achievement system', 'Learning streak tracking'],
            'Multi-language': ['Support for 5+ languages', 'Cultural context integration', 'Native speaker audio', 'Translation tools']
        },
        
        architecture: ['Django Backend → PostgreSQL → React Frontend → TensorFlow ML → REST API'],
        
        technologies: ['Django 4.2', 'Python 3.11', 'PostgreSQL 15', 'React.js 18', 'TensorFlow 2.15', 'Scikit-learn', 'Celery', 'Redis'],
        
        achievement: '🏆 4th Prize Winner - SKSVMA College Hackathon (April 2025)',
        
        algorithm: 'Uses collaborative filtering for recommendations, neural networks for difficulty prediction, and NLP for content analysis.',
        
        impact: ['40% faster vocabulary acquisition reported', 'Improved retention through spaced repetition', 'Personalized pacing reduces frustration', 'Accessible language learning']
    },
    
    'handcricket': {
        title: 'HandCricket Game',
        category: 'Web Game',
        date: 'Jan 2024',
        overview: 'IPL-themed hand cricket game built with modern web technologies featuring real-time gameplay, team selection, and comprehensive statistics.',
        
        problem: 'Digital adaptation of popular hand cricket game with authentic IPL experience, real-time gameplay, and statistical tracking.',
        
        solution: 'Interactive web-based game with cricket rules, IPL team selection, and real-time score tracking with Firebase integration.',
        
        features: {
            'Gameplay': ['Authentic hand cricket rules', 'IPL team selection (10 teams)', 'Batting and bowling simulations', 'Over-by-over progression'],
            'Visual Design': ['IPL team branding and colors', 'Responsive game interface', 'Animations and transitions', 'Scoreboard display'],
            'Statistics': ['Player performance tracking', 'Match history', 'Leaderboards', 'Achievement system'],
            'Multiplayer': ['Session-based gameplay', 'Real-time score updates', 'Firebase data synchronization', 'Game state persistence']
        },
        
        architecture: ['HTML5/CSS3/JS Frontend → Game Logic → Firebase Realtime Database → Score Tracking'],
        
        technologies: ['HTML5 Canvas', 'CSS3 Animations', 'JavaScript ES6+', 'Firebase Realtime DB', 'Game State Management', 'Responsive Design', 'Local Storage'],
        
        gameMechanics: ['Matching numbers = Out system', 'Score calculation algorithms', 'Player statistics tracking', 'Game session management'],
        
        learning: 'First complete web game project teaching game state management, real-time data handling, and user experience design for games.',
        
        impact: ['Entertainment value for cricket fans', 'Educational game development experience', 'Real-time web application skills', 'Firebase integration mastery']
    },
    
    'student-management': {
        title: 'Student Management System',
        category: 'Academic Project',
        date: 'Dec 2023',
        overview: 'First-semester programming project using C and file handling to manage student records, marks, attendance, and academic reports.',
        
        problem: 'Foundation project to understand database management concepts, structured programming, and file I/O operations through practical implementation.',
        
        solution: 'Console-based application with comprehensive student data management including record keeping, marks calculation, and report generation.',
        
        features: {
            'Record Management': ['Student information storage', 'Roll number based indexing', 'Data validation', 'Search and retrieval'],
            'Academic Tracking': ['Subject-wise marks entry', 'Attendance recording', 'Grade calculation', 'Performance analysis'],
            'Reporting': ['Student report cards', 'Class performance reports', 'Attendance summaries', 'Data export capability'],
            'Data Security': ['File-based data persistence', 'Input validation', 'Error handling', 'Data backup system']
        },
        
        architecture: ['Console Interface → C Program Logic → File I/O Operations → Data Storage Files'],
        
        technologies: ['C Programming Language', 'File I/O Operations', 'Data Structures', 'Structured Programming', 'Makefile Build System'],
        
        significance: 'Foundation project introducing database concepts, structured programming approach, and problem-solving methodology.',
        
        learning: ['File handling and data persistence', 'Structured programming concepts', 'Data validation techniques', 'Console interface design'],
        
        impact: ['Spark interest in software development', 'Foundation for advanced projects', 'Understanding of data management', 'Problem-solving skills development']
    }
};

// Initialize Project Modals
function initializeProjectModals() {
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const project = projectData[projectId];
            
            if (project) {
                showProjectModal(project);
            }
        });
    });
}

// Show Project Modal
function showProjectModal(project) {
    const modalTitle = document.getElementById('projectModalLabel');
    const modalBody = document.getElementById('projectModalBody');
    
    modalTitle.textContent = project.title;
    
    // Build modal content
    let modalContent = `
        <div class="modal-project-header">
            <div class="modal-project-tags">
                <span class="modal-tag">${project.category}</span>
                <span class="modal-tag">${project.date}</span>
                ${project.funding ? `<span class="modal-tag bg-warning">${project.funding}</span>` : ''}
                ${project.achievement ? `<span class="modal-tag bg-success">${project.achievement}</span>` : ''}
            </div>
        </div>
        
        <div class="modal-section">
            <h4><i class="fas fa-info-circle me-2"></i>Project Overview</h4>
            <p>${project.overview}</p>
        </div>
        
        <div class="modal-section">
            <h4><i class="fas fa-exclamation-triangle me-2"></i>Problem Statement</h4>
            <p>${project.problem}</p>
        </div>
        
        <div class="modal-section">
            <h4><i class="fas fa-lightbulb me-2"></i>Solution</h4>
            <p>${project.solution}</p>
        </div>
        
        <div class="modal-section">
            <h4><i class="fas fa-star me-2"></i>Key Features</h4>
            <div class="feature-grid">
    `;
    
    // Add features
    for (const [featureName, featureItems] of Object.entries(project.features)) {
        modalContent += `
            <div class="feature-item">
                <h6>${featureName}</h6>
                <ul>
                    ${featureItems.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    modalContent += `
            </div>
        </div>
        
        <div class="modal-section">
            <h4><i class="fas fa-layer-group me-2"></i>System Architecture</h4>
            <div class="architecture-flow">
    `;
    
    // Add architecture flow
    project.architecture.forEach((step, index) => {
        modalContent += `
            <div class="flow-step">${step}</div>
            ${index < project.architecture.length - 1 ? '<div class="flow-arrow">↓</div>' : ''}
        `;
    });
    
    modalContent += `
            </div>
        </div>
        
        <div class="modal-section">
            <h4><i class="fas fa-tools me-2"></i>Technologies Used</h4>
            <div class="modal-tech-stack">
    `;
    
    // Add technologies
    project.technologies.forEach(tech => {
        modalContent += `<span class="modal-tech-tag">${tech}</span>`;
    });
    
    modalContent += `
            </div>
        </div>
    `;
    
    // Add additional sections if they exist
    if (project.aiDesign) {
        modalContent += `
            <div class="modal-section">
                <h4><i class="fas fa-robot me-2"></i>AI/ML Design</h4>
                <p>${project.aiDesign}</p>
            </div>
        `;
    }
    
    if (project.accuracy) {
        modalContent += `
            <div class="modal-section">
                <h4><i class="fas fa-chart-line me-2"></i>Performance Metrics</h4>
                <p>${project.accuracy}</p>
            </div>
        `;
    }
    
    if (project.differentiation) {
        modalContent += `
            <div class="modal-section">
                <h4><i class="fas fa-bullseye me-2"></i>What Makes This Different</h4>
                <ul class="feature-list">
                    ${project.differentiation.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    if (project.impact) {
        modalContent += `
            <div class="modal-section">
                <h4><i class="fas fa-chart-line me-2"></i>Impact & Results</h4>
                <div class="impact-stats">
        `;
        
        // If impact is an array of strings
        if (Array.isArray(project.impact)) {
            project.impact.forEach(impact => {
                modalContent += `
                    <div class="impact-stat">
                        <h5>✓</h5>
                        <p>${impact}</p>
                    </div>
                `;
            });
        }
        
        modalContent += `
                </div>
            </div>
        `;
    }
    
    if (project.applications) {
        modalContent += `
            <div class="modal-section">
                <h4><i class="fas fa-rocket me-2"></i>Applications</h4>
                <p>${project.applications}</p>
            </div>
        `;
    }
    
    modalBody.innerHTML = modalContent;
    
    // Show the modal
    const projectModal = new bootstrap.Modal(document.getElementById('projectModal'));
    projectModal.show();
}

// Update the DOMContentLoaded event in script.js
document.addEventListener('DOMContentLoaded', function() {
    // Existing code...
    setActiveNavLink();
    setupProjectFilters();
    setupCertificateModals();
    setupContactForm();
    setupLoadMoreCertificates();
    setupSmoothScrolling();
    setupNavbarScroll();
    setupSkillBars();
    setupScrollAnimations();
    
    // Add project modal initialization
    initializeProjectModals();
});
// Initialize modals when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeProjectModals();


// Project Details Data
const projectDetails = {
    "academic-planning": {
        title: "AI-Driven Academic Execution Planning Platform",
        content: `
            <div class="project-detail">
                <div class="project-meta mb-4">
                    <span class="badge bg-primary me-2">IBM SkillBuild Competition</span>
                    <span class="badge bg-info">December 2025</span>
                    <span class="badge bg-success">AI + Web</span>
                </div>
                
                <div class="project-context mb-4">
                    <h4><i class="fas fa-trophy me-2"></i>Project Context</h4>
                    <p>This project was developed for the <strong>IBM SkillBuild Applied AI "Build AI Agents 2025/26" competition</strong>. The challenge was to create an AI agent that could solve real-world planning problems with practical constraints.</p>
                </div>
                
                <div class="project-problem mb-4">
                    <h4><i class="fas fa-exclamation-circle me-2"></i>Problem Statement</h4>
                    <p>Students often create unrealistic study plans, underestimate time requirements, lack structured execution phases, and don't account for academic constraints like exam schedules, prerequisite knowledge gaps, and resource availability.</p>
                </div>
                
                <div class="project-solution mb-4">
                    <h4><i class="fas fa-lightbulb me-2"></i>Core Solution</h4>
                    <p>An intelligent AI agent that acts as an institutional planning engine:</p>
                    <ul>
                        <li>Converts learning goals into realistic, phased execution plans</li>
                        <li>Respects academic constraints (prerequisites, time availability, resource access)</li>
                        <li>Includes fallback strategies and contingency planning</li>
                        <li>Provides feasibility analysis before plan execution</li>
                        <li>Generates milestone-based tracking systems</li>
                    </ul>
                </div>
                
                <div class="technical-implementation mb-4">
                    <h4><i class="fas fa-code me-2"></i>Technical Implementation</h4>
                    <div class="row">
                        <div class="col-md-6">
                            <h5>Frontend (React.js)</h5>
                            <ul>
                                <li>Interactive plan visualization dashboard</li>
                                <li>Drag-and-drop timeline interface</li>
                                <li>Real-time progress tracking</li>
                                <li>Responsive design for all devices</li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <h5>Backend (FastAPI + LLM)</h5>
                            <ul>
                                <li>Groq API integration for fast LLM inference</li>
                                <li>LLaMA 3 model for intelligent planning</li>
                                <li>Firestore database for user data persistence</li>
                                <li>RESTful API architecture</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="tech-stack-details mb-4">
                    <h4><i class="fas fa-tools me-2"></i>Complete Tech Stack</h4>
                    <div class="d-flex flex-wrap gap-2">
                        <span class="badge bg-primary p-2">React.js</span>
                        <span class="badge bg-primary p-2">FastAPI</span>
                        <span class="badge bg-info p-2">Groq API</span>
                        <span class="badge bg-warning p-2">Firestore</span>
                        <span class="badge bg-success p-2">Google Colab</span>
                        <span class="badge bg-dark p-2">LLaMA 3</span>
                        <span class="badge bg-secondary p-2">Python</span>
                        <span class="badge bg-danger p-2">JavaScript</span>
                    </div>
                </div>
                
                <div class="key-features mb-4">
                    <h4><i class="fas fa-star me-2"></i>Key Features</h4>
                    <div class="row">
                        <div class="col-md-6">
                            <ul>
                                <li>AI-powered realistic planning with constraint consideration</li>
                                <li>Interactive Gantt-chart visualization</li>
                                <li>Progress tracking with milestone alerts</li>
                                <li>Resource requirement estimation</li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <ul>
                                <li>Fallback strategy generation</li>
                                <li>Export plans to PDF/Calendar formats</li>
                                <li>Collaborative planning features</li>
                                <li>Mobile-responsive interface</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="project-outcome">
                    <h4><i class="fas fa-chart-line me-2"></i>Project Outcome</h4>
                    <p>Successfully submitted to IBM SkillBuild competition. The platform demonstrates how AI can transform academic planning from guesswork to data-driven strategy, potentially improving student success rates by 30-40% through realistic planning.</p>
                </div>
            </div>
        `
    },
    "plant-care": {
        title: "AI-Enabled Smart Plant Care System",
        content: `
            <div class="project-detail">
                <div class="project-meta mb-4">
                    <span class="badge bg-success me-2">Smart India Hackathon 2025</span>
                    <span class="badge bg-info">October 2025</span>
                    <span class="badge bg-warning">AIML + IoT + Web</span>
                </div>
                
                <div class="project-context mb-4">
                    <h4><i class="fas fa-users me-2"></i>Project Context</h4>
                    <p>Built for <strong>Smart India Hackathon 2025</strong>. Although our team wasn't selected for the final round, we committed to completing the project to demonstrate our capabilities in IoT and AI integration for agricultural technology.</p>
                    <p><strong>Team:</strong> 4 members | <strong>Duration:</strong> 2 months</p>
                </div>
                
                <div class="project-problem mb-4">
                    <h4><i class="fas fa-exclamation-circle me-2"></i>Problem Statement</h4>
                    <ul>
                        <li>Late pest and disease detection in crops leading to significant yield loss</li>
                        <li>Manual irrigation systems wasting water resources</li>
                        <li>Lack of centralized monitoring for large agricultural areas</li>
                        <li>No early warning system for environmental stress factors</li>
                    </ul>
                </div>
                
                <div class="project-solution mb-4">
                    <h4><i class="fas fa-lightbulb me-2"></i>Core Solution</h4>
                    <p>An end-to-end smart plant care system integrating IoT sensors with computer vision AI:</p>
                    <div class="row">
                        <div class="col-md-6">
                            <h5>IoT Monitoring Layer</h5>
                            <ul>
                                <li>ESP32-CAM modules for image capture</li>
                                <li>Soil moisture sensors for automated irrigation</li>
                                <li>Environmental sensors (temperature, humidity)</li>
                                <li>Solar-powered operation for field deployment</li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <h5>AI Analysis Layer</h5>
                            <ul>
                                <li>TensorFlow model for plant disease detection</li>
                                <li>OpenCV for image preprocessing</li>
                                <li>Custom dataset of 5000+ plant images</li>
                                <li>Real-time inference on edge devices</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="system-architecture mb-4">
                    <h4><i class="fas fa-sitemap me-2"></i>System Architecture</h4>
                    <ol>
                        <li><strong>Data Collection:</strong> ESP32-CAM captures plant images every 6 hours</li>
                        <li><strong>Image Processing:</strong> OpenCV preprocesses images (resize, normalize)</li>
                        <li><strong>AI Inference:</strong> TensorFlow model identifies diseases/pests</li>
                        <li><strong>Data Storage:</strong> Images and results stored in Firebase</li>
                        <li><strong>Alert System:</strong> Notifications sent via mobile app/web dashboard</li>
                        <li><strong>Automated Response:</strong> Irrigation system activated based on soil moisture</li>
                    </ol>
                </div>
                
                <div class="tech-stack-details mb-4">
                    <h4><i class="fas fa-tools me-2"></i>Complete Tech Stack</h4>
                    <div class="d-flex flex-wrap gap-2">
                        <span class="badge bg-primary p-2">ESP32-CAM</span>
                        <span class="badge bg-success p-2">TensorFlow</span>
                        <span class="badge bg-warning p-2">Firebase</span>
                        <span class="badge bg-info p-2">Python</span>
                        <span class="badge bg-danger p-2">Google Drive API</span>
                        <span class="badge bg-dark p-2">OpenCV</span>
                        <span class="badge bg-secondary p-2">Arduino IDE</span>
                        <span class="badge bg-purple p-2">React Native</span>
                    </div>
                </div>
                
                <div class="key-features mb-4">
                    <h4><i class="fas fa-star me-2"></i>Key Features Implemented</h4>
                    <div class="row">
                        <div class="col-md-6">
                            <ul>
                                <li>Real-time plant health monitoring with 92% accuracy</li>
                                <li>Automated irrigation based on soil moisture levels</li>
                                <li>Early pest detection with image classification</li>
                                <li>Mobile app dashboard for remote monitoring</li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <ul>
                                <li>Historical data analysis and trends</li>
                                <li>Alert system for critical conditions</li>
                                <li>Solar-powered for off-grid operation</li>
                                <li>Scalable architecture for large farms</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="challenges-learned mb-4">
                    <h4><i class="fas fa-graduation-cap me-2"></i>Challenges & Learnings</h4>
                    <div class="row">
                        <div class="col-md-6">
                            <h5>Challenges</h5>
                            <ul>
                                <li>Limited dataset for Indian crop diseases</li>
                                <li>ESP32-CAM memory constraints for image processing</li>
                                <li>Real-time data synchronization in rural areas</li>
                                <li>Model optimization for edge deployment</li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <h5>Learnings</h5>
                            <ul>
                                <li>IoT device power management strategies</li>
                                <li>Transfer learning for small datasets</li>
                                <li>End-to-end system integration</li>
                                <li>Team collaboration in hardware-software projects</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="project-outcome">
                    <h4><i class="fas fa-chart-line me-2"></i>Project Outcome</h4>
                    <p>Successfully built a functional prototype that can detect 5 common plant diseases with 92% accuracy. The system demonstrates how IoT and AI can revolutionize traditional agriculture, potentially reducing water usage by 40% and crop loss by 30% through early detection.</p>
                    <p><strong>Future Scope:</strong> Integration with drone imaging, expansion to more crop types, commercialization for small farmers.</p>
                </div>
            </div>
        `
    },
    "sign-language": {
        title: "Computer Vision–Based Hand Gesture Recognition",
        content: `
            <div class="project-detail">
                <div class="project-meta mb-4">
                    <span class="badge bg-info me-2">Innoquest#1</span>
                    <span class="badge bg-secondary">Nov 2024 – Dec 2024</span>
                    <span class="badge bg-primary">Computer Vision</span>
                </div>
                
                <div class="project-context mb-4">
                    <h4><i class="fas fa-university me-2"></i>Project Context</h4>
                    <p>Developed during my <strong>2nd year</strong> as part of <strong>Innoquest#1</strong> - a university innovation challenge. This was our first exposure to computer vision and deep learning, representing a significant learning curve in a completely new technical domain.</p>
                    <p><strong>Team:</strong> 3 members | <strong>Duration:</strong> 6 weeks</p>
                </div>
                
                <div class="project-overview mb-4">
                    <h4><i class="fas fa-eye me-2"></i>Project Overview</h4>
                    <p>A prototype computer vision system that recognizes hand gestures from a standard webcam and displays the corresponding output on a web-based dashboard. The system demonstrates real-time gesture recognition using deep learning techniques without requiring specialized hardware.</p>
                </div>
                
                <div class="project-problem mb-4">
                    <h4><i class="fas fa-exclamation-circle me-2"></i>Problem Statement</h4>
                    <p>Communication barriers exist between sign language users and non-signers. There is a need for an accessible, low-cost system that can interpret hand gestures using commonly available devices such as webcams, particularly in educational and public service settings.</p>
                </div>
                
                <div class="what-implemented mb-4">
                    <h4><i class="fas fa-check-circle me-2"></i>What Was Implemented (Core Work)</h4>
                    
                    <div class="implementation-section mb-3">
                        <h5>🔹 Gesture Recognition Pipeline</h5>
                        <ul>
                            <li>Implemented a real-time webcam-based gesture recognition pipeline</li>
                            <li>Used MobileNetV2 (convolutional neural network) trained on ASL alphabet image dataset</li>
                            <li>Performed static hand gesture classification</li>
                            <li>Successfully trained a multi-class ASL model (A–Z) for experimentation</li>
                            <li>Verified model performance on controlled input data (85% accuracy on test set)</li>
                        </ul>
                    </div>
                    
                    <div class="implementation-section mb-3">
                        <h5>🔹 Computer Vision Processing</h5>
                        <ul>
                            <li>Webcam frame capture using OpenCV with 30 FPS</li>
                            <li>Hand region extraction using MediaPipe-based hand detection</li>
                            <li>Image preprocessing pipeline: resize (224x224), normalization, augmentation</li>
                            <li>Real-time inference on live camera feed with latency < 200ms</li>
                            <li>Background subtraction for improved accuracy</li>
                        </ul>
                    </div>
                    
                    <div class="implementation-section mb-3">
                        <h5>🔹 Web-Based Dashboard (Prototype)</h5>
                        <ul>
                            <li>Designed a basic web dashboard to visualize gesture recognition output</li>
                            <li>Displayed live camera feed with bounding boxes</li>
                            <li>Real-time display of detected gesture with confidence scores</li>
                            <li>Currently focused on single stable gestures for demonstration</li>
                            <li>Clean and simple UI for user testing and demonstration</li>
                        </ul>
                    </div>
                </div>
                
                <div class="technical-details mb-4">
                    <h4><i class="fas fa-code me-2"></i>Technical Implementation Details</h4>
                    
                    <div class="row">
                        <div class="col-md-6">
                            <h5>Model Training</h5>
                            <ul>
                                <li><strong>Dataset:</strong> ASL Alphabet dataset (87,000 images)</li>
                                <li><strong>Model:</strong> MobileNetV2 with transfer learning</li>
                                <li><strong>Training:</strong> 50 epochs with Adam optimizer</li>
                                <li><strong>Accuracy:</strong> 85% on validation set</li>
                                <li><strong>Framework:</strong> PyTorch with CUDA acceleration</li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <h5>System Architecture</h5>
                            <ul>
                                <li><strong>Input:</strong> Webcam stream (640x480)</li>
                                <li><strong>Processing:</strong> MediaPipe for hand detection</li>
                                <li><strong>Classification:</strong> Custom-trained MobileNetV2</li>
                                <li><strong>Output:</strong> Web dashboard with real-time feedback</li>
                                <li><strong>Latency:</strong> End-to-end < 200ms</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="tech-stack-details mb-4">
                    <h4><i class="fas fa-tools me-2"></i>Complete Technology Stack</h4>
                    <div class="d-flex flex-wrap gap-2">
                        <span class="badge bg-primary p-2">Python 3.9</span>
                        <span class="badge bg-info p-2">OpenCV 4.8</span>
                        <span class="badge bg-warning p-2">PyTorch 2.0</span>
                        <span class="badge bg-success p-2">MobileNetV2</span>
                        <span class="badge bg-danger p-2">MediaPipe</span>
                        <span class="badge bg-secondary p-2">Flask</span>
                        <span class="badge bg-dark p-2">HTML/CSS/JS</span>
                        <span class="badge bg-purple p-2">Bootstrap</span>
                    </div>
                </div>
                
                <div class="challenges-learned mb-4">
                    <h4><i class="fas fa-graduation-cap me-2"></i>Challenges & Learnings</h4>
                    
                    <div class="row">
                        <div class="col-md-6">
                            <h5>Technical Challenges</h5>
                            <ul>
                                <li>Lighting variations affecting detection accuracy</li>
                                <li>Background complexity in real-world settings</li>
                                <li>Real-time performance optimization</li>
                                <li>Dataset imbalance for certain letters</li>
                                <li>Webcam quality and resolution limitations</li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <h5>Key Learnings</h5>
                            <ul>
                                <li>Computer vision pipeline design and optimization</li>
                                <li>Transfer learning with pre-trained models</li>
                                <li>Real-time system architecture</li>
                                <li>Web integration for AI applications</li>
                                <li>Team collaboration in research-oriented projects</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="achievements-future mb-4">
                    <h4><i class="fas fa-trophy me-2"></i>Achievements & Future Scope</h4>
                    
                    <div class="row">
                        <div class="col-md-6">
                            <h5>Project Achievements</h5>
                            <ul>
                                <li>Successfully built a working prototype in 6 weeks</li>
                                <li>Demonstrated real-time gesture recognition</li>
                                <li>Presented at Innoquest#1 university exhibition</li>
                                <li>Received positive feedback for accessibility focus</li>
                                <li>Foundation for future computer vision projects</li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <h5>Future Enhancements</h5>
                            <ul>
                                <li>Dynamic gesture recognition (sign language sentences)</li>
                                <li>Mobile app deployment</li>
                                <li>Multi-hand gesture detection</li>
                                <li>Integration with text-to-speech</li>
                                <li>Support for regional sign languages</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="project-outcome">
                    <h4><i class="fas fa-chart-line me-2"></i>Project Outcome</h4>
                    <p>This project served as an excellent introduction to computer vision and deep learning. Despite being our first experience with this technology stack, we successfully built a functional prototype that recognizes ASL alphabet gestures with 85% accuracy. The project demonstrated the potential of AI for accessibility applications and provided valuable hands-on experience in end-to-end AI system development.</p>
                    <p><strong>Impact:</strong> Showcased at university exhibition, inspired further projects in assistive technology, and built foundational knowledge for subsequent AI/ML projects.</p>
                </div>
            </div>
        `
    },
    "blue-future": {
        title: "Blue Future - Smart Water Management System",
        content: `
            <div class="project-detail">
                <div class="project-meta mb-4">
                    <span class="badge bg-primary me-2">TEJAS2025</span>
                    <span class="badge bg-info">In Progress</span>
                    <span class="badge bg-success">IoT + AI</span>
                    <span class="badge bg-warning">Group Project (10 members)</span>
                </div>
                
                <div class="project-context mb-4">
                    <h4><i class="fas fa-users me-2"></i>Project Context</h4>
                    <p>This is a <strong>group project with 10 members</strong> initiated through connections made at <strong>TEJAS2025</strong> expo. After meeting seniors at the expo, they invited our junior team to collaborate on this department-assigned project. We're currently working as junior team members under senior guidance.</p>
                    <p><strong>Team Structure:</strong> 4 seniors (lead roles) + 6 juniors (implementation roles)</p>
                    <p><strong>Current Status:</strong> Active development, expected completion Q1 2026</p>
                </div>
                
                <div class="project-overview mb-4">
                    <h4><i class="fas fa-tint me-2"></i>Project Overview</h4>
                    <p>An IoT and AI-driven comprehensive water management system designed to prevent overflow, monitor water quality in real-time, and provide intelligent insights for urban and rural water management. The system addresses both residential and agricultural water management needs.</p>
                </div>
                
                <div class="project-problem mb-4">
                    <h4><i class="fas fa-exclamation-circle me-2"></i>Problem Statement</h4>
                    <div class="row">
                        <div class="col-md-6">
                            <h5>Urban Issues</h5>
                            <ul>
                                <li>Water wastage from tank overflow in apartments</li>
                                <li>Lack of real-time quality monitoring in supply lines</li>
                                <li>Manual operation of pumps and valves</li>
                                <li>No predictive maintenance for water infrastructure</li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <h5>Rural/Agricultural Issues</h5>
                            <ul>
                                <li>Inefficient irrigation water usage</li>
                                <li>Groundwater depletion without monitoring</li>
                                <li>Contamination detection delays</li>
                                <li>Lack of data-driven water management</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="project-solution mb-4">
                    <h4><i class="fas fa-lightbulb me-2"></i>Core Solution Architecture</h4>
                    
                    <div class="solution-component mb-3">
                        <h5>🔹 IoT Sensor Network</h5>
                        <ul>
                            <li><strong>Water Level Sensors:</strong> Ultrasonic sensors for tank monitoring</li>
                            <li><strong>Quality Sensors:</strong> pH, turbidity, TDS, temperature sensors</li>
                            <li><strong>Flow Meters:</strong> Measure water consumption patterns</li>
                            <li><strong>Actuators:</strong> Automated valves and pump controllers</li>
                            <li><strong>Communication:</strong> LoRa modules for long-range, low-power data transmission</li>
                        </ul>
                    </div>
                    
                    <div class="solution-component mb-3">
                        <h5>🔹 AI-Powered Analytics</h5>
                        <ul>
                            <li><strong>Gemini AI Integration:</strong> For predictive analytics and insights</li>
                            <li><strong>Anomaly Detection:</strong> Identify leaks and contamination events</li>
                            <li><strong>Consumption Forecasting:</strong> Predict water usage patterns</li>
                            <li><strong>Quality Trend Analysis:</strong> Monitor changes in water parameters</li>
                            <li><strong>Optimization Algorithms:</strong> Suggest efficient usage schedules</li>
                        </ul>
                    </div>
                    
                    <div class="solution-component">
                        <h5>🔹 Dashboard & Control System</h5>
                        <ul>
                            <li><strong>Web Dashboard:</strong> Real-time monitoring and control</li>
                            <li><strong>Mobile App:</strong> Alerts and remote control</li>
                            <li><strong>Automated Controls:</strong> Valve operation based on levels</li>
                            <li><strong>Reporting:</strong> Consumption reports and insights</li>
                            <li><strong>Multi-user Access:</strong> Different roles (admin, user, maintenance)</li>
                        </ul>
                    </div>
                </div>
                
                <div class="system-architecture mb-4">
                    <h4><i class="fas fa-sitemap me-2"></i>System Architecture</h4>
                    <div class="architecture-diagram">
                        <div class="text-center mb-3">
                            <small class="text-muted">[Architecture visualization would be implemented]</small>
                        </div>
                        <ol>
                            <li><strong>Edge Layer:</strong> Arduino with sensors collecting data</li>
                            <li><strong>Communication Layer:</strong> LoRa modules transmitting to gateway</li>
                            <li><strong>Gateway Layer:</strong> Raspberry Pi aggregating data</li>
                            <li><strong>Cloud Layer:</strong> Node.js server with MongoDB database</li>
                            <li><strong>AI Layer:</strong> Gemini AI for analytics and predictions</li>
                            <li><strong>Presentation Layer:</strong> React.js dashboard and mobile app</li>
                        </ol>
                    </div>
                </div>
                
                <div class="tech-stack-details mb-4">
                    <h4><i class="fas fa-tools me-2"></i>Complete Tech Stack</h4>
                    <div class="d-flex flex-wrap gap-2">
                        <span class="badge bg-primary p-2">Arduino Uno/Nano</span>
                        <span class="badge bg-info p-2">LoRa Modules</span>
                        <span class="badge bg-success p-2">Node.js</span>
                        <span class="badge bg-warning p-2">MongoDB</span>
                        <span class="badge bg-danger p-2">Gemini AI</span>
                        <span class="badge bg-secondary p-2">React.js</span>
                        <span class="badge bg-dark p-2">Raspberry Pi</span>
                        <span class="badge bg-purple p-2">Python</span>
                        <span class="badge bg-teal p-2">MQTT</span>
                    </div>
                </div>
                
                <div class="my-role mb-4">
                    <h4><i class="fas fa-user me-2"></i>My Role in the Project</h4>
                    <p>As a junior team member, I'm contributing in the following areas:</p>
                    <ul>
                        <li><strong>Frontend Development:</strong> Building React.js components for the dashboard</li>
                        <li><strong>API Integration:</strong> Connecting frontend with Node.js backend</li>
                        <li><strong>Sensor Testing:</strong> Testing and calibrating water quality sensors</li>
                        <li><strong>Documentation:</strong> Maintaining project documentation and progress reports</li>
                        <li><strong>Testing:</strong> Participating in system integration testing</li>
                    </ul>
                </div>
                
                <div class="current-progress mb-4">
                    <h4><i class="fas fa-tasks me-2"></i>Current Progress</h4>
                    <div class="progress mb-2" style="height: 25px;">
                        <div class="progress-bar bg-success" role="progressbar" style="width: 60%;" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">60% Complete</div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <h6>Completed Tasks</h6>
                            <ul>
                                <li>✅ Requirements gathering and system design</li>
                                <li>✅ Sensor selection and procurement</li>
                                <li>✅ Basic dashboard UI development</li>
                                <li>✅ Backend API structure</li>
                                <li>✅ LoRa communication testing</li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <h6>In Progress</h6>
                            <ul>
                                <li>🔄 AI model integration with Gemini API</li>
                                <li>🔄 Mobile app development</li>
                                <li>🔄 Advanced analytics implementation</li>
                                <li>🔄 System integration testing</li>
                                <li>🔄 Documentation and deployment planning</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="expected-outcomes mb-4">
                    <h4><i class="fas fa-bullseye me-2"></i>Expected Outcomes</h4>
                    <div class="row">
                        <div class="col-md-6">
                            <h5>Technical Outcomes</h5>
                            <ul>
                                <li>Real-time water monitoring with < 5-second latency</li>
                                <li>Automated overflow prevention system</li>
                                <li>Water quality alerts for contamination</li>
                                <li>Predictive maintenance scheduling</li>
                                <li>30% reduction in water wastage</li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <h5>Project Outcomes</h5>
                            <ul>
                                <li>Department project completion and presentation</li>
                                <li>Potential for commercialization or startup</li>
                                <li>Research paper publication opportunity</li>
                                <li>Demonstration at next TEJAS expo</li>
                                <li>Foundation for larger smart city projects</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="challenges-insights mb-4">
                    <h4><i class="fas fa-graduation-cap me-2"></i>Challenges & Insights</h4>
                    
                    <div class="row">
                        <div class="col-md-6">
                            <h5>Technical Challenges</h5>
                            <ul>
                                <li>Sensor calibration for accurate readings</li>
                                <li>LoRa network reliability in urban areas</li>
                                <li>Real-time data synchronization</li>
                                <li>Power management for remote sensors</li>
                                <li>AI model accuracy with limited historical data</li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <h5>Team & Project Insights</h5>
                            <ul>
                                <li>Large team coordination and task allocation</li>
                                <li>Mentorship from senior team members</li>
                                <li>Balancing academic commitments with project</li>
                                <li>Hardware-software integration challenges</li>
                                <li>Learning from experienced team members</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="project-outcome">
                    <h4><i class="fas fa-chart-line me-2"></i>Project Significance</h4>
                    <p>Blue Future represents my first experience in a large-scale, department-sponsored project. Working alongside seniors has provided invaluable mentorship in system design, project management, and advanced IoT concepts. The project addresses critical water management issues that affect both urban and rural communities in India.</p>
                    <p><strong>Learning Value:</strong> Exposure to professional project workflows, team collaboration in large groups, hardware-software integration at scale, and working on a real-world problem with societal impact.</p>
                    <p><strong>Future Potential:</strong> This project could evolve into a startup, research publication, or be integrated into smart city initiatives. The skills and experience gained will be foundational for my career in IoT and AI applications.</p>
                </div>
            </div>
        `
    },
    "dinetech": {
        title: "DineTech - Restaurant Communication System",
        content: `
            <div class="project-detail">
                <div class="project-meta mb-4">
                    <span class="badge bg-warning me-2">TEJAS2025 Expo</span>
                    <span class="badge bg-info">January 2025</span>
                    <span class="badge bg-success">IoT System</span>
                </div>
                
                <div class="project-context mb-4">
                    <h4><i class="fas fa-university me-2"></i>Project Context</h4>
                    <p>Built specifically for the <strong>TEJAS2025 Expo at Anurag University</strong>, where I represented both the <strong>Department of Computer Science & Engineering</strong> and the <strong>IoT Club</strong>. The expo showcased innovative projects from across the university to industry visitors and faculty.</p>
                    <p><strong>Expo Context:</strong> Annual technology exhibition with 100+ projects, industry judges, and potential funding opportunities</p>
                </div>
                
                <div class="project-overview mb-4">
                    <h4><i class="fas fa-utensils me-2"></i>Project Overview</h4>
                    <p>An IoT-based communication system designed specifically for restaurants to improve customer-waiter interaction. The system replaces traditional call bells with a smart, wireless solution that displays table requests on a centralized screen in the kitchen/service area.</p>
                </div>
                
                <div class="project-problem mb-4">
                    <h4><i class="fas fa-exclamation-circle me-2"></i>Problem Statement</h4>
                    <p>Observed during visits to local restaurants:</p>
                    <ul>
                        <li><strong>Inefficient Communication:</strong> Customers waving or shouting to get waiter attention</li>
                        <li><strong>Delayed Service:</strong> Waiters missing customer requests during busy hours</li>
                        <li><strong>Order Mistakes:</strong> Miscommunication leading to wrong orders</li>
                        <li><strong>Customer Frustration:</strong> Poor experience affecting restaurant reputation</li>
                        <li><strong>Staff Stress:</strong> Waiters overwhelmed during peak hours</li>
                    </ul>
                </div>
                
                <div class="project-solution mb-4">
                    <h4><i class="fas fa-lightbulb me-2"></i>Core Solution</h4>
                    
                    <div class="solution-component mb-3">
                        <h5>🔹 Customer Interface (Table-side)</h5>
                        <ul>
                            <li><strong>Wireless Buttons:</strong> ESP8266-based buttons at each table</li>
                            <li><strong>Multiple Request Types:</strong> Separate buttons for "Waiter Needed," "Bill Request," "Water Refill"</li>
                            <li><strong>LED Feedback:</strong> Visual confirmation when request is sent</li>
                            <li><strong>Low Power Design:</strong> Battery-operated with 6-month lifespan</li>
                            <li><strong>Simple Interface:</strong> Intuitive for customers of all ages</li>
                        </ul>
                    </div>
                    
                    <div class="solution-component mb-3">
                        <h5>🔹 Waiter/K

});
