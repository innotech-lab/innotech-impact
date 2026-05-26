import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to detect when an element is in the viewport.
 * @param {Object} options - IntersectionObserver options
 * @returns {Array} [ref, inView]
 */
export const useInView = (options = { threshold: 0.1 }) => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        // Once it's in view, we can stop observing if we only want one-time animation
        if (ref.current) observer.unobserve(ref.current);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return { ref, inView };
};
