// ==================== Mobile Menu Toggle ====================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ==================== Navbar Scroll State ====================
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ==================== Section Reveal on Scroll ====================
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
});

document.querySelectorAll('.section-reveal').forEach(section => {
    revealObserver.observe(section);
});

// ==================== Intersection Observer for Animations ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        }
    });
}, observerOptions);

// Observe all project cards and skill items
document.querySelectorAll('.project-card, .skill-category, .cert-item').forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});

// ==================== Skill Bar Fill Animation ====================
const bars = document.querySelectorAll('.skill-bar-fill');
const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.dataset.width;
            barObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });
bars.forEach(b => barObserver.observe(b));

// ==================== Smooth Scroll Behavior ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ==================== Active Navigation Link on Scroll ====================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 160) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
});

// ==================== Interactive Certificate Gallery ====================
const certificatesData = [
    {
        img: 'assets/certificates/cert1.jpg',
        label: 'Postman Student Expert Program',
        title: 'Postman API Fundamentals Student Expert',
        desc: 'Earned by completing the official Postman learning path — covering REST APIs, request building, test scripting, and API documentation. This certification supports my Business Analysis career path by enabling technical fluency with development teams.',
        tags: ['REST APIs', 'API Testing', 'Postman Collections', 'Test Scripting']
    },
    {
        img: 'assets/certificates/cert2.jpg',
        label: 'Agile & SCRUM Fundamentals',
        title: 'Agile Methodologies Certification',
        desc: 'Completed training on Agile methodologies, SCRUM frameworks, and iterative software development lifecycle. Built foundational knowledge for business requirements analysis in an Agile environment.',
        tags: ['Agile', 'SCRUM', 'SDLC', 'Business']
    },
    {
        img: 'assets/certificates/cert3.jpg',
        label: 'Data Analysis Fundamentals',
        title: 'Data-Driven Decision Making',
        desc: 'Acquired skills in interpreting data structures, performing foundational data analysis, and translating analytical findings into business value. Essential for modern BA roles.',
        tags: ['Data Analysis', 'SQL', 'Dashboards']
    },
    {
        img: 'assets/certificates/cert4.jpg',
        label: 'Enterprise Architecture',
        title: 'IT Systems and Business Alignment',
        desc: 'Understanding how IT systems align with broader business objectives. Learned to document architectural components and business workflows efficiently.',
        tags: ['Architecture', 'Business Alignment', 'Workflows']
    },
    {
        img: 'assets/certificates/cert5.jpg',
        label: 'UI/UX Principles',
        title: 'User-Centered Design and Wireframing',
        desc: 'Explored principles of human-computer interaction, user journey mapping, and creating effective wireframes to communicate business requirements to design teams.',
        tags: ['UI/UX', 'Figma', 'Wireframing']
    },
    {
        img: 'assets/certificates/cert6.jpg',
        label: 'Requirements Engineering',
        title: 'Advanced Requirements Gathering',
        desc: 'Mastered techniques for eliciting, analyzing, and managing software requirements from stakeholders effectively.',
        tags: ['Requirements', 'Elicitation', 'Stakeholders']
    },
    {
        img: 'assets/certificates/cert7.jpg',
        label: 'Software Testing Basics',
        title: 'Quality Assurance Fundamentals',
        desc: 'Learned the basic concepts of software testing, test case design, and quality assurance processes essential for a robust product lifecycle.',
        tags: ['QA', 'Testing', 'Test Cases']
    },
    {
        img: 'assets/certificates/cert8.jpg',
        label: 'Cloud Fundamentals',
        title: 'Cloud Computing Essentials',
        desc: 'Gained introductory knowledge of cloud concepts, essential cloud services, security, architecture, pricing, and support.',
        tags: ['Cloud', 'SaaS', 'Infrastructure']
    }
];

const certItems = document.querySelectorAll('.cert-item');
const activeCertImg = document.getElementById('active-cert-img');
const activeCertLabel = document.getElementById('active-cert-label');
const activeCertTitle = document.getElementById('active-cert-title');
const activeCertDesc = document.getElementById('active-cert-desc');
const activeCertTags = document.getElementById('active-cert-tags');
const activeCertContent = document.getElementById('active-cert-content');

certItems.forEach((item, index) => {
    const data = certificatesData[index];
    if (data && index === 0) {
        item.classList.add('active');
    }

    item.style.cursor = 'pointer';
    item.addEventListener('click', () => {
        if (item.classList.contains('active')) return;

        certItems.forEach(c => c.classList.remove('active'));
        item.classList.add('active');

        if (data && activeCertImg && activeCertContent) {
            activeCertContent.classList.remove('cert-fade-anim');
            void activeCertContent.offsetWidth; // Trigger reflow
            activeCertContent.classList.add('cert-fade-anim');

            activeCertImg.classList.remove('cert-fade-anim');
            void activeCertImg.offsetWidth;
            activeCertImg.classList.add('cert-fade-anim');

            activeCertImg.src = data.img;
            activeCertLabel.textContent = data.label;
            activeCertTitle.textContent = data.title;
            activeCertDesc.textContent = data.desc;

            activeCertTags.innerHTML = '';
            data.tags.forEach(tag => {
                const span = document.createElement('span');
                span.textContent = tag;
                activeCertTags.appendChild(span);
            });
        }
    });
});

// ==================== Certificate Image Lightbox ====================
if (activeCertImg) {
    activeCertImg.addEventListener('click', () => {
        openLightbox(activeCertImg.src);
    });
}

function openLightbox(imgSrc) {
    const lightbox = document.createElement('div');
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(19, 26, 44, 0.72);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        animation: fadeIn 0.3s ease;
    `;

    const img = document.createElement('img');
    img.src = imgSrc;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 10px;
        box-shadow: 0 20px 60px rgba(19, 26, 44, 0.45);
    `;

    lightbox.appendChild(img);
    document.body.appendChild(lightbox);

    lightbox.addEventListener('click', () => {
        lightbox.remove();
    });

    const closeOnEscape = (e) => {
        if (e.key === 'Escape') {
            lightbox.remove();
            document.removeEventListener('keydown', closeOnEscape);
        }
    };
    document.addEventListener('keydown', closeOnEscape);
}

const lightboxStyle = document.createElement('style');
lightboxStyle.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(lightboxStyle);

// ==================== Scroll to Top Button ====================
window.addEventListener('scroll', () => {
    const scrollBtn = document.getElementById('scrollToTop');
    if (window.scrollY > 300) {
        if (!scrollBtn) {
            const btn = document.createElement('button');
            btn.id = 'scrollToTop';
            btn.innerHTML = '↑';
            btn.setAttribute('aria-label', 'Scroll to top');
            btn.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                background: linear-gradient(135deg, #3552d9, #0e9e96);
                color: #fff;
                border: none;
                border-radius: 50%;
                font-size: 22px;
                cursor: pointer;
                box-shadow: 0 10px 26px rgba(53, 82, 217, 0.28);
                z-index: 999;
                animation: slideUp 0.3s ease;
                transition: all 0.3s ease;
            `;
            document.body.appendChild(btn);

            btn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });

            btn.addEventListener('mouseover', () => {
                btn.style.transform = 'translateY(-5px)';
                btn.style.boxShadow = '0 14px 32px rgba(53, 82, 217, 0.35)';
            });

            btn.addEventListener('mouseout', () => {
                btn.style.transform = 'translateY(0)';
                btn.style.boxShadow = '0 10px 26px rgba(53, 82, 217, 0.28)';
            });
        }
    } else {
        const btn = document.getElementById('scrollToTop');
        if (btn) btn.remove();
    }
});

const slideUpStyle = document.createElement('style');
slideUpStyle.textContent = `
    @keyframes slideUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(slideUpStyle);

// ==================== Form Validation (if contact form is added) ====================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded successfully!');
});