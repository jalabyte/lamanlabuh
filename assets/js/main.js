/**
 * LamanLabuh - Site Block Page Scripts
 * Handles interactivity and dynamic behaviors
 */

(function() {
  'use strict';

  // DOM Ready
  document.addEventListener('DOMContentLoaded', function() {
    initNavbarScroll();
    initButtonEffects();
    initAnimations();
    initAccessibility();
  });

  /**
   * Navbar scroll effect - adds background on scroll
   */
  function initNavbarScroll() {
    const navbar = document.querySelector('nav');
    if (!navbar) return;

    let ticking = false;

    function updateNavbar() {
      if (window.scrollY > 50) {
        navbar.classList.add('bg-opacity-95', 'shadow-md');
        navbar.classList.remove('bg-opacity-80');
      } else {
        navbar.classList.remove('bg-opacity-95', 'shadow-md');
        navbar.classList.add('bg-opacity-80');
      }
      ticking = false;
    }

    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    });
  }

  /**
   * Button click effects and handlers
   */
  function initButtonEffects() {
    // TrustPositif button
    const trustPositifBtn = document.querySelector('[data-action="trustpositif"]');
    if (trustPositifBtn) {
      trustPositifBtn.addEventListener('click', function() {
        window.open('https://trustpositif.kominfo.go.id/', '_blank', 'noopener,noreferrer');
      });
    }

    // Normalization appeal button
    const normalizationBtn = document.querySelector('[data-action="normalization"]');
    if (normalizationBtn) {
      normalizationBtn.addEventListener('click', function() {
        window.location.href = 'mailto:aduankonten@kominfo.go.id?subject=Permohonan%20Normalisasi%20Situs';
      });
    }

    // Appeal access button
    const appealBtn = document.querySelector('[data-action="appeal"]');
    if (appealBtn) {
      appealBtn.addEventListener('click', function() {
        window.location.href = 'mailto:aduankonten@kominfo.go.id?subject=Pengajuan%20Banding%20Akses%20Situs';
      });
    }

    // Ripple effect for all buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(function(button) {
      button.addEventListener('click', createRipple);
    });
  }

  /**
   * Creates ripple effect on button click
   */
  function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    `;

    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);

    setTimeout(function() {
      ripple.remove();
    }, 600);
  }

  /**
   * Initialize scroll-based animations
   */
  function initAnimations() {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe elements with data-animate attribute
    document.querySelectorAll('[data-animate]').forEach(function(el) {
      el.style.opacity = '0';
      observer.observe(el);
    });
  }

  /**
   * Accessibility enhancements
   */
  function initAccessibility() {
    // Skip to main content link
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
      skipLink.addEventListener('click', function(e) {
        e.preventDefault();
        const main = document.querySelector('main');
        if (main) {
          main.setAttribute('tabindex', '-1');
          main.focus();
        }
      });
    }

    // Keyboard navigation for cards
    document.querySelectorAll('.card-interactive').forEach(function(card) {
      card.setAttribute('tabindex', '0');
      card.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
      });
    });

    // Reduce motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.classList.add('reduce-motion');
    }
  }

  // Add ripple animation CSS dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    .reduce-motion * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  `;
  document.head.appendChild(style);

})();
