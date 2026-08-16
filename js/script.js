/* ==========================================================================
   MAIN CORE JAVASCRIPT - GOPESH S PORTFOLIO
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive modules
  initScrollProgressBar();
  initTypingEffect();
  initMouseGlowTracker();
  initStickyHeaderAndActiveNav();
  initMobileNavDrawer();
  initProjectFilters();
  initProjectModal();
  initCertModal();
  initResumeModal();
  initAnimatedCounters();
  initScrollReveal();
  initBackToTopButton();
  initSmoothAnchors();
});

/* --------------------------------------------------------------------------
   1. SCROLL PROGRESS BAR
   -------------------------------------------------------------------------- */
function initScrollProgressBar() {
  const progressBar = document.getElementById('scroll-progress-bar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   2. HERO TYPING ANIMATION
   -------------------------------------------------------------------------- */
function initTypingEffect() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;

  const roles = [
    "Software Engineer",
    "Java Developer",
    "Full Stack Developer",
    "AI / ML Enthusiast",
    "Problem Solver"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2000; // Pause at full phrase
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500; // Pause before typing next word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* --------------------------------------------------------------------------
   3. MOUSE GLOW CURSOR TRACKER
   -------------------------------------------------------------------------- */
function initMouseGlowTracker() {
  const mouseGlow = document.getElementById('mouse-glow');
  if (!mouseGlow) return;

  // Disable on touch devices to save performance
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    mouseGlow.style.display = 'none';
    return;
  }

  window.addEventListener('mousemove', (e) => {
    mouseGlow.style.left = `${e.clientX}px`;
    mouseGlow.style.top = `${e.clientY}px`;
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   4. STICKY NAVBAR & ACTIVE LINK HIGHLIGHT ON SCROLL
   -------------------------------------------------------------------------- */
function initStickyHeaderAndActiveNav() {
  const header = document.getElementById('main-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Sticky styling
    if (header) {
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Active link highlighting
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   5. MOBILE NAVIGATION DRAWER
   -------------------------------------------------------------------------- */
function initMobileNavDrawer() {
  const hamburgerBtn = document.getElementById('hamburger-menu-btn');
  const closeBtn = document.getElementById('close-mobile-nav-btn');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const mobileBackdrop = document.getElementById('mobile-nav-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function openDrawer() {
    mobileDrawer?.classList.add('open');
    mobileBackdrop?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer?.classList.remove('open');
    mobileBackdrop?.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburgerBtn?.addEventListener('click', openDrawer);
  closeBtn?.addEventListener('click', closeDrawer);
  mobileBackdrop?.addEventListener('click', closeDrawer);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* --------------------------------------------------------------------------
   6. PROJECT CATEGORY FILTERING
   -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px) scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   7. PROJECT QUICK VIEW MODAL
   -------------------------------------------------------------------------- */
function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('project-modal-body');
  const closeBtn = document.getElementById('close-project-modal');
  const quickViewBtns = document.querySelectorAll('.quick-view-btn');

  const projectDetailsMap = {
    'car-service': {
      title: "Car Service Management System",
      subtitle: "Full Stack Vehicle Service & Booking Web Application",
      category: "Full Stack Web Application",
      stack: ["HTML5", "CSS3", "JavaScript", "SQL", "REST APIs"],
      description: "A robust software engineering solution designed to digitalize car workshop operations. Features customer profile registration, appointment scheduling, mechanic dispatch tracking, and billing invoice generation.",
      features: [
        "Interactive customer appointment booking calendar",
        "Mechanic status assignment and workshop workflow queue",
        "Optimized MySQL relational schema with stored procedures",
        "Responsive, high-contrast dashboard UI for workshop managers"
      ],
      challenges: [
        "Handling concurrent appointment booking slots without double-booking",
        "Ensuring low-latency query performance across large service record tables"
      ],
      results: "Improved appointment scheduling throughput by 40% and eliminated manual paper logs."
    },
    'fraud-detection': {
      title: "Fraud Detection using Machine Learning",
      subtitle: "Predictive Analytics & Financial Risk Classification",
      category: "Machine Learning & Security",
      stack: ["Python", "SQL", "Pandas", "NumPy", "Scikit-learn"],
      description: "A machine learning pipeline developed to spot anomalous financial transactions in real time. Employs statistical pre-processing, outlier detection algorithms, and classification model evaluation.",
      features: [
        "Exploratory Data Analysis (EDA) on imbalanced financial datasets",
        "Automated feature scaling and missing value imputation",
        "Predictive risk classification with Random Forest & Logistic Regression",
        "ROC-AUC curve evaluation & precision-recall metric tuning"
      ],
      challenges: [
        "Extreme class imbalance (less than 0.2% fraudulent transactions)",
        "Minimizing false positives to prevent flagging legitimate customer transactions"
      ],
      results: "Achieved high classification accuracy with minimal false alert overhead."
    },
    'crime-detection': {
      title: "Crime Hotspot Detection & Spatial Analytics",
      subtitle: "GIS Spatial Analytics & Predictive Safety Mapping",
      category: "Spatial AI & Data Science",
      stack: ["Python", "Geopandas", "Scikit-Learn", "Power BI"],
      description: "A spatial analytics project designed to identify high-density crime geographical zones. Uses density-based clustering (DBSCAN) to forecast crime hotspots for police patrol optimization.",
      features: [
        "Heatmap spatial cluster visualizations",
        "Temporal trend identification (time-of-day vs crime severity)",
        "Power BI executive dashboard integration"
      ],
      challenges: [
        "Parsing raw multi-dimensional coordinate logs with noise",
        "Maintaining real-time clustering performance"
      ],
      results: "Generates actionable spatial risk heatmaps for proactive law enforcement deployment."
    },
    'food-spoilage': {
      title: "Smart Food Spoilage Detection System",
      subtitle: "IoT Telemetry & Freshness Decay Forecasting",
      category: "IoT & Predictive AI",
      stack: ["Python", "IoT Sensors", "Machine Learning", "REST API"],
      description: "An automated food freshness monitoring platform integrating gas and humidity sensor telemetry with machine learning to predict shelf-life and decay.",
      features: [
        "Continuous ambient gas & temperature telemetry ingestion",
        "Machine learning decay curve modeling",
        "Automated early warning threshold notifications"
      ],
      challenges: [
        "Calibrating sensor threshold metrics under varying humidity conditions",
        "Developing lightweight edge inference logic"
      ],
      results: "Reduces food inventory waste in commercial cold storage facilities."
    }
  };

  quickViewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const pKey = btn.getAttribute('data-project');
      const details = projectDetailsMap[pKey];

      if (details && modal && modalBody) {
        modalBody.innerHTML = `
          <div class="project-category-tag"><i class="fa-solid fa-code"></i> ${details.category}</div>
          <h3 id="modal-project-title" class="modal-heading">${details.title}</h3>
          <p class="modal-subtitle" style="color: var(--color-secondary); font-weight:600; margin-bottom:1rem;">${details.subtitle}</p>
          <p style="margin-bottom: 1.25rem;">${details.description}</p>

          <div style="margin-bottom: 1.25rem;">
            <h4 style="font-size:1rem; margin-bottom:0.5rem; color:var(--color-text-primary);"><i class="fa-solid fa-star text-orange"></i> Key Features:</h4>
            <ul class="bullet-list-check">
              ${details.features.map(f => `<li>${f}</li>`).join('')}
            </ul>
          </div>

          <div style="margin-bottom: 1.25rem;">
            <h4 style="font-size:1rem; margin-bottom:0.5rem; color:var(--color-text-primary);"><i class="fa-solid fa-triangle-exclamation text-yellow"></i> Challenges Addressed:</h4>
            <ul class="bullet-list-check">
              ${details.challenges.map(c => `<li>${c}</li>`).join('')}
            </ul>
          </div>

          <div style="margin-bottom: 1.5rem; padding: 0.85rem; background: var(--bg-tertiary); border-radius: var(--border-radius-sm);">
            <strong style="color:var(--color-success);"><i class="fa-solid fa-chart-line"></i> Results & Impact:</strong> ${details.results}
          </div>

          <div class="project-tech-stack" style="margin-bottom: 1.5rem;">
            ${details.stack.map(s => `<span class="stack-tag">${s}</span>`).join('')}
          </div>

          <div style="display:flex; gap:1rem;">
            <a href="https://github.com/Gopesh-S" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm"><i class="fa-brands fa-github"></i> GitHub Code</a>
            <button onclick="document.getElementById('project-modal').classList.remove('open')" class="btn btn-secondary btn-sm">Close</button>
          </div>
        `;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
      }
    });
  });

  closeBtn?.addEventListener('click', () => {
    modal?.classList.remove('open');
    modal?.setAttribute('aria-hidden', 'true');
  });

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    }
  });
}

/* --------------------------------------------------------------------------
   8. CERTIFICATE PREVIEW MODAL
   -------------------------------------------------------------------------- */
function initCertModal() {
  const modal = document.getElementById('cert-modal');
  const modalBody = document.getElementById('cert-modal-body');
  const closeBtn = document.getElementById('close-cert-modal');
  const certBtns = document.querySelectorAll('.cert-preview-btn');

  const certDataMap = {
    'java-cert': {
      title: "Java & Data Structures Certification",
      issuer: "Verified Technical Assessment",
      desc: "Demonstrates comprehensive understanding of Java 17+, Object-Oriented Software Design, Collections API, Threads, and algorithmic complexity optimization."
    },
    'web-cert': {
      title: "CYFOTOK Web Development Certificate",
      issuer: "CYFOTOK INFOSEC",
      desc: "Official completion certificate for 15-day intensive web development internship covering responsive HTML5, CSS3, JavaScript ES6+, UI debugging, and Git collaboration."
    },
    'ui-cert': {
      title: "EROSPARK UI/UX Design Professional",
      issuer: "EROSPARK",
      desc: "Certification for user experience wireframing, Figma design system prototyping, user journey mapping, and frontend team collaboration."
    },
    'ml-cert': {
      title: "Python for Data Science & Machine Learning",
      issuer: "Data Analytics Track",
      desc: "Verified skill credential in exploratory data analysis (EDA), NumPy numerical computations, Pandas data manipulation, and Scikit-learn classification models."
    }
  };

  certBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cKey = btn.getAttribute('data-cert');
      const cert = certDataMap[cKey];

      if (cert && modal && modalBody) {
        modalBody.innerHTML = `
          <div style="text-align:center; padding: 1.5rem;">
            <div style="font-size: 3.5rem; color: var(--color-primary); margin-bottom: 1rem;">
              <i class="fa-solid fa-award"></i>
            </div>
            <h3 id="modal-cert-title" class="modal-heading">${cert.title}</h3>
            <p style="color: var(--color-secondary); font-weight:700; margin-bottom: 1rem;">${cert.issuer}</p>
            <p style="margin-bottom: 1.5rem;">${cert.desc}</p>
            <div style="padding:1rem; background:var(--bg-tertiary); border-radius:var(--border-radius-sm); border:1px solid var(--card-border); display:inline-block;">
              <span style="color:var(--color-success); font-weight:600;"><i class="fa-solid fa-circle-check"></i> Credential Verified & Validated</span>
            </div>
          </div>
        `;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
      }
    });
  });

  closeBtn?.addEventListener('click', () => {
    modal?.classList.remove('open');
    modal?.setAttribute('aria-hidden', 'true');
  });

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    }
  });
}

/* --------------------------------------------------------------------------
   9. RESUME MODAL & DOWNLOAD HANDLERS
   -------------------------------------------------------------------------- */
function initResumeModal() {
  const resumeModal = document.getElementById('resume-modal');
  const viewResumeBtn = document.getElementById('view-resume-modal-btn');
  const closeResumeBtn = document.getElementById('close-resume-modal');
  const downloadBtns = [
    document.getElementById('download-resume-hero-btn'),
    document.getElementById('download-resume-about-btn'),
    document.getElementById('download-resume-main-btn'),
    document.getElementById('download-modal-resume-btn')
  ];

  viewResumeBtn?.addEventListener('click', () => {
    resumeModal?.classList.add('open');
    resumeModal?.setAttribute('aria-hidden', 'false');
  });

  closeResumeBtn?.addEventListener('click', () => {
    resumeModal?.classList.remove('open');
    resumeModal?.setAttribute('aria-hidden', 'true');
  });

  resumeModal?.addEventListener('click', (e) => {
    if (e.target === resumeModal) {
      resumeModal.classList.remove('open');
      resumeModal.setAttribute('aria-hidden', 'true');
    }
  });

  downloadBtns.forEach(btn => {
    btn?.addEventListener('click', () => {
        downloadResumePDF();
    });
});
}
function downloadResumePDF() {
    const resumePath = 'assets/GOPESH RESUME.pdf';

    const link = document.createElement('a');

    link.href = resumePath;
    link.download = 'GOPESH RESUME.pdf';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (typeof window.showToastNotification === 'function') {
        window.showToastNotification('Resume PDF downloaded successfully!');
    }
}

/* --------------------------------------------------------------------------
   10. ANIMATED STAT COUNTERS
   -------------------------------------------------------------------------- */
function initAnimatedCounters() {
  const counterElements = document.querySelectorAll('.counter-number');
  let animated = false;

  function runCounters() {
    counterElements.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target') || '0', 10);
      let count = 0;
      const speed = Math.max(1, Math.floor(target / 40));

      const updateCount = () => {
        count += speed;
        if (count < target) {
          counter.textContent = count.toString();
          setTimeout(updateCount, 40);
        } else {
          counter.textContent = target.toString();
        }
      };

      updateCount();
    });
  }

  const countersSection = document.querySelector('.counters-grid');
  if (!countersSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        runCounters();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(countersSection);
}

/* --------------------------------------------------------------------------
   11. SCROLL REVEAL ANIMATIONS
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  // Add reveal classes to key sections automatically
  const revealTargets = document.querySelectorAll('section, .glass-card, .timeline-item');
  revealTargets.forEach(el => {
    if (!el.classList.contains('reveal')) {
      el.classList.add('reveal');
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Animate skill fill bars if present
        const skillBars = entry.target.querySelectorAll('.skill-bar-fill');
        skillBars.forEach(bar => {
          const progress = bar.getAttribute('data-progress');
          if (progress) {
            bar.style.width = progress;
          }
        });
      }
    });
  }, { threshold: 0.1 });

  revealTargets.forEach(target => observer.observe(target));
}

/* --------------------------------------------------------------------------
   12. BACK TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initBackToTopButton() {
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   13. SMOOTH ANCHOR LINK SCROLLING
   -------------------------------------------------------------------------- */
function initSmoothAnchors() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 70;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* =========================================
   CERTIFICATE IMAGE VIEWER
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const certificateButtons =
        document.querySelectorAll(".cert-preview-btn");

    const certificateModal =
        document.getElementById("certificateModal");

    const certificateImage =
        document.getElementById("certificateImage");

    const certificateClose =
        document.getElementById("certificateClose");

    const certificateDownload =
        document.getElementById("certificateDownload");


    /* =========================================
       OPEN CERTIFICATE
    ========================================= */

    certificateButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const certificatePath =
                button.getAttribute("data-cert");


            if (!certificatePath) {

                console.error(
                    "Certificate path is missing."
                );

                return;
            }


            /* Set image */

            certificateImage.src =
                certificatePath;


            /* Set download link */

            certificateDownload.href =
                certificatePath;


            /* Open modal */

            certificateModal.classList.add("active");


            /* Prevent background scrolling */

            document.body.style.overflow = "hidden";

        });

    });


    /* =========================================
       CLOSE CERTIFICATE
    ========================================= */

    function closeCertificate() {

        certificateModal.classList.remove("active");

        certificateImage.src = "";

        certificateDownload.href = "#";

        document.body.style.overflow = "";

    }


    /* Close button */

    certificateClose.addEventListener(
        "click",
        closeCertificate
    );


    /* =========================================
       CLOSE WHEN CLICKING OUTSIDE
    ========================================= */

    certificateModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target === certificateModal
            ) {

                closeCertificate();

            }

        }
    );


    /* =========================================
       CLOSE USING ESCAPE KEY
    ========================================= */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                certificateModal.classList.contains("active")
            ) {

                closeCertificate();

            }

        }
    );

});

