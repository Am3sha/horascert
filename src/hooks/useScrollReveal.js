import { useEffect } from 'react';

/**
 * useScrollReveal
 * Observes all elements with anim-* classes
 * and adds .is-visible when they enter viewport
 */
export function useScrollReveal(deps = []) {
  useEffect(() => {
    const animClasses = [
      '.anim-fade-up',
      '.anim-fade-down',
      '.anim-fade-left',
      '.anim-fade-right',
      '.anim-fade-in',
      '.anim-scale-up',
      '.anim-slide-left',
      '.anim-slide-right',
      '.section-title',
      '.home-stat-num',
    ];

    const selector = animClasses.join(', ');
    const elements = document.querySelectorAll(selector);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Unobserve after animating (performance)
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, deps);
}

/**
 * useScrollProgress
 * Updates a CSS variable for scroll progress bar
 */
export function useScrollProgress() {
  useEffect(() => {
    const bar = document.querySelector('.scroll-progress');
    if (!bar) return;

    const update = () => {
      const scrolled = window.scrollY;
      const total = document.body.scrollHeight - window.innerHeight;
      const progress = Math.min((scrolled / total) * 100, 100);
      bar.style.width = progress + '%';
    };

    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
}

/**
 * useNavbarScroll
 * Adds .navbar-scrolled class when page is scrolled
 */
export function useNavbarScroll() {
  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const update = () => {
      if (window.scrollY > 20) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    };

    window.addEventListener('scroll', update, { passive: true });
    update(); // run on mount
    return () => window.removeEventListener('scroll', update);
  }, []);
}
