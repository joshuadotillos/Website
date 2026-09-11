(function () {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function (direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
      filters.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Custom Cursor
   */
  const cursor = document.querySelector('.custom-cursor');
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');

  if (cursor && cursorDot && cursorRing) {

    let mouseX = 0;
    let mouseY = 0;

    let ringX = 0;
    let ringY = 0;

    // Mouse movement
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Dot follows immediately
      cursorDot.style.transform =
        `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;

      // Show cursor once mouse enters the page
      cursor.classList.add('cursor-visible');
    });

    // Smooth ring movement
    function animateCursor() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      cursorRing.style.transform =
        `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;

      requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, input, textarea, select, .btn, .navmenu a, .circle-wide'
    );

    interactiveElements.forEach((element) => {

      element.addEventListener('mouseenter', () => {
        cursorRing.classList.add('hover');
      });

      element.addEventListener('mouseleave', () => {
        cursorRing.classList.remove('hover');
        cursorRing.classList.remove('button-hover');
      });

    });

    // Stronger effect for buttons
    const buttons = document.querySelectorAll(
      'button, .btn, .btn-primary, .btn-import'
    );

    buttons.forEach((button) => {

      button.addEventListener('mouseenter', () => {
        cursorRing.classList.remove('hover');
        cursorRing.classList.add('button-hover');
      });

      button.addEventListener('mouseleave', () => {
        cursorRing.classList.remove('button-hover');
      });

    });

  }

  /**
   * Stargazing Portfolio Intro
   */
  const intro = document.getElementById('portfolio-intro');
  const exploreButton = document.getElementById("explore-portfolio");
  const cursorTrail = document.getElementById('cursor-star-trail');
  const starBurst = document.getElementById('star-burst');

  if (intro && exploreButton) {
    const introStorageKey = 'portfolioIntroLastShown';
    const introDuration = 15 * 60 * 1000; // 30 minutes

    const currentPage = window.location.pathname.split('/').pop().toLowerCase();

    const detailPages = [
      'portfolio-details-iras.html',
      'portfolio-details-wedding.html',
      'portfolio-details-zag.html'
    ];

    const lastIntroTime = localStorage.getItem(introStorageKey);

    const introStillValid =
      lastIntroTime &&
      (Date.now() - parseInt(lastIntroTime, 10)) < introDuration;

    // Skip intro on detail pages or if shown within 30 minutes
    if (detailPages.includes(currentPage) || introStillValid) {

      intro.style.display = 'none';

    } else {

      document.documentElement.classList.add('intro-active');
      document.body.classList.add('intro-active');

      const preventScroll = (event) => {
        if (document.body.classList.contains('intro-active')) {
          event.preventDefault();
        }
      };

      window.addEventListener(
        'wheel',
        preventScroll,
        { passive: false }
      );

      const preventKeyboardScroll = (event) => {

        if (!document.body.classList.contains('intro-active')) {
          return;
        }

        const scrollKeys = [
          ' ',
          'ArrowUp',
          'ArrowDown',
          'PageUp',
          'PageDown',
          'Home',
          'End'
        ];

        if (scrollKeys.includes(event.key)) {
          event.preventDefault();
        }
      };

      window.addEventListener('keydown', preventKeyboardScroll);

      const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

      let lastTrailTime = 0;

      if (!isTouchDevice && cursorTrail) {
        document.addEventListener('mousemove', (event) => {

          if (!document.body.classList.contains('intro-active')) {
            return;
          }

          const now = Date.now();

          if (now - lastTrailTime < 45) {
            return;
          }

          lastTrailTime = now;

          const star = document.createElement('span');

          star.classList.add('cursor-star');

          if (Math.random() > 0.72) {
            star.classList.add('white');
          }

          star.style.left = `${event.clientX}px`;
          star.style.top = `${event.clientY}px`;

          const driftX = (Math.random() - 0.5) * 35;
          const driftY = (Math.random() - 0.5) * 35;

          star.style.setProperty('--drift-x', `${driftX}px`);
          star.style.setProperty('--drift-y', `${driftY}px`);

          const size = Math.random() * 3 + 2;

          star.style.width = `${size}px`;
          star.style.height = `${size}px`;

          cursorTrail.appendChild(star);

          setTimeout(() => {
            star.remove();
          }, 850);
        });
      }

      function createStarBurst(x, y) {
        if (!starBurst) {
          return;
        }

        const starCount = isTouchDevice ? 8 : 18;

        for (let i = 0; i < starCount; i++) {
          const star = document.createElement('span');

          star.classList.add('burst-star');
          star.textContent = Math.random() > 0.65 ? '✦' : '·';
          star.style.setProperty('--x', `${x}px`);
          star.style.setProperty('--y', `${y}px`);

          const angle = Math.random() * Math.PI * 2;
          const distance = 60 + Math.random() * 160;
          const moveX = Math.cos(angle) * distance;
          const moveY = Math.sin(angle) * distance;

          star.style.setProperty('--move-x', `${moveX}px`);
          star.style.setProperty('--move-y', `${moveY}px`);
          star.style.setProperty('--size', `${8 + Math.random() * 12}px`);

          star.style.animationDelay = `${Math.random() * 120}ms`;
          starBurst.appendChild(star);

          setTimeout(() => {
            star.remove();
          }, 1100);
        }
      }

      let hasEntered = false;

      function enterPortfolio() {
        if (hasEntered) {
          return;
        }

        hasEntered = true;

        // Remember intro was completed
        localStorage.setItem(
          introStorageKey,
          Date.now().toString()
        );

        // Play background music
        const backgroundMusic =
          document.getElementById('backgroundMusic');

        if (backgroundMusic) {
          backgroundMusic.volume = 0.2;

          backgroundMusic.play().catch(error => {
            console.log('Music playback failed:', error);
          });
        }

        const rect = exploreButton.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        createStarBurst(centerX, centerY);

        exploreButton.classList.add('explore-clicked');

        setTimeout(() => {
          intro.classList.add('intro-exit');
        }, 200);

        setTimeout(() => {
          document.documentElement.classList.remove('intro-active');
          document.body.classList.remove('intro-active');
          intro.style.display = 'none';
        }, 1400);
      }

      exploreButton.addEventListener('click', enterPortfolio);

      exploreButton.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          enterPortfolio();
        }
      });
    }
  }

})();