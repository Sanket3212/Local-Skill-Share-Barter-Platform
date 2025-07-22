// composables/useScrollAnimation.js
import { ref, onMounted, onUnmounted } from 'vue';

export function useScrollAnimation() {
  const animatedElements = new Map(); // Store elements and their state

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const { target, isIntersecting } = entry;
        const animationClass = target.dataset.animationClass; // Get animation class from data attribute

        if (isIntersecting) {
          // Add animation class when element enters viewport
          target.classList.add(animationClass);
          // Optionally, stop observing once animated if it's a one-time animation
          observer.unobserve(target);
          animatedElements.delete(target); // Remove from map
        }
        // If you want elements to animate *every time* they enter view,
        // you would not unobserve here and manage adding/removing classes on intersection change.
        // For simple "fade in on scroll", one-time is usually better.
      });
    },
    {
      root: null, // viewport as the root
      rootMargin: '0px',
      threshold: 0.1, // Trigger when 10% of the element is visible
    }
  );

  // Function to register elements for observation
  const registerElement = (el, animationClass) => {
    if (el && !animatedElements.has(el)) {
      el.dataset.animationClass = animationClass; // Store class on element
      observer.observe(el);
      animatedElements.set(el, true); // Mark as observed
    }
  };

  // Ensure observer is disconnected on component unmount
  onUnmounted(() => {
    observer.disconnect();
  });

  return { registerElement };
}