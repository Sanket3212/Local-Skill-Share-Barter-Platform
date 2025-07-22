<template>
  <div class="text-white bg-gray-950 min-h-screen flex flex-col antialiased">
    <main class="flex-grow">
      <section class="relative overflow-hidden py-24 px-6 md:px-12 lg:px-24 text-center rounded-b-3xl shadow-2xl-custom-inset bg-gradient-to-br from-gray-950 to-black/30 border-b border-white/5">
        <ThreeAbstractBackground class="absolute inset-0 z-0"></ThreeAbstractBackground>
         

        <div class="absolute inset-0 z-0 opacity-20">
            <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-screen filter blur-3xl animate-blob"></div>
            <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/15 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <div class="relative z-10">
          <h2 class="text-5xl md:text-6xl font-extrabold leading-tight mb-5 text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-teal-400 drop-shadow-lg"
              data-aos="fade-down" data-aos-duration="1200" data-aos-easing="ease-out-quad">
            SkillSwap: Your Community, Your Currency.
          </h2>
          <p class="text-xl md:text-2xl mb-10 text-gray-400 max-w-3xl mx-auto"
             data-aos="fade-up" data-aos-delay="400" data-aos-duration="1200" data-aos-easing="ease-out-quad">
            Trade skills, not rupees. Simple swaps, stronger communities across India.
          </p>
          <NuxtLink to="/register"
                    class="bg-green-600 text-white font-bold py-4 px-10 rounded-full text-xl inline-block
                           transition-all duration-300 ease-out hover:scale-105 hover:shadow-green-500/30 focus:ring-4 focus:ring-green-600/50"
                    data-aos="zoom-in" data-aos-delay="800" data-aos-duration="1000" data-aos-easing="ease-out-back">
            Start Swapping Today!
          </NuxtLink>
        </div>

        <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-50 animate-pulse-subtle"
             data-aos="fade-up" data-aos-delay="1600" data-aos-duration="800" data-aos-offset="0">
          <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
          <span class="text-xs text-gray-500 mt-1">Scroll</span>
        </div>
      </section>

      <section class="py-20 px-6 md:px-12 lg:px-24 bg-gray-950 rounded-lg mx-auto max-w-6xl -mt-16 relative z-20 border border-white/5 shadow-2xl-custom-glow">
        <h3 class="text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-teal-400 drop-shadow-lg"
            data-aos="fade-zoom-in" data-aos-duration="1000" data-aos-easing="ease-out-quad" data-aos-once="true" data-aos-offset="150">Why Choose SkillSwap?</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div class="interactive-card flex flex-col items-center text-center p-8 bg-black/30 rounded-xl border border-gray-700/50 shadow-lg transition-all duration-300 ease-out transform cursor-pointer
                      hover:scale-103 hover:border-teal-400/50 hover:shadow-xl hover:shadow-teal-400/10"
                data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000" data-aos-once="true" data-aos-easing="ease-out-quad" data-aos-offset="100">
            <div class="bg-gradient-to-tr from-green-500/20 to-teal-500/20 p-5 rounded-full mb-6 border border-teal-400/30">
              <svg class="w-12 h-12 text-teal-400 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h2a2 2 0 002-2V7a2 2 0 00-2-2h-2V3a1 1 0 00-1-1H8a1 1 0 00-1 1v2H5a2 2 0 00-2 2v11a2 2 0 002 2h2m0 0l-1.5 1.5m1.5-1.5v-2m0 2h2m-2 0l1.5 1.5m-1.5-1.5h-2"></path>
              </svg>
            </div>
            <h4 class="text-2xl font-semibold mb-3 text-white drop-shadow-sm">Cash-Free Exchange</h4>
            <p class="text-gray-400 leading-relaxed">Swap skills and items without needing a single rupee. Embrace a true bartering economy.</p>
          </div>
          <div class="interactive-card flex flex-col items-center text-center p-8 bg-black/30 rounded-xl border border-gray-700/50 shadow-lg transition-all duration-300 ease-out transform cursor-pointer
                      hover:scale-103 hover:border-teal-400/50 hover:shadow-xl hover:shadow-teal-400/10"
                data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000" data-aos-once="true" data-aos-easing="ease-out-quad" data-aos-offset="100">
            <div class="bg-gradient-to-tr from-green-500/20 to-teal-500/20 p-5 rounded-full mb-6 border border-teal-400/30">
              <svg class="w-12 h-12 text-teal-400 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M12 20.005v-2.004m0 0a4 4 0 110-8.003 4 4 0 010 8.003zM12 20.005H8.55M12 20.005h3.45M18.447 8.354l-1.932 2.227m-2.571-5.414l-2.227 1.932M10.354 18.447l-2.227-1.932M5.553 10.354l-1.932-2.227"></path>
              </svg>
            </div>
            <h4 class="text-2xl font-semibold mb-3 text-white drop-shadow-sm">Strengthen Local Bonds</h4>
            <p class="text-gray-400 leading-relaxed">Connect with neighbors and build a stronger, more interdependent local community.</p>
          </div>
          <div class="interactive-card flex flex-col items-center text-center p-8 bg-black/30 rounded-xl border border-gray-700/50 shadow-lg transition-all duration-300 ease-out transform cursor-pointer
                      hover:scale-103 hover:border-teal-400/50 hover:shadow-xl hover:shadow-teal-400/10"
                data-aos="fade-up" data-aos-delay="600" data-aos-duration="1000" data-aos-once="true" data-aos-easing="ease-out-quad" data-aos-offset="100">
            <div class="bg-gradient-to-tr from-green-500/20 to-teal-500/20 p-5 rounded-full mb-6 border border-teal-400/30">
              <svg class="w-12 h-12 text-teal-400 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h4 class="text-2xl font-semibold mb-3 text-white drop-shadow-sm">Simple & Intuitive</h4>
            <p class="text-gray-400 leading-relaxed">Our user-friendly platform makes listing, searching, and swapping incredibly easy.</p>
          </div>
        </div>
      </section>

      <section class="py-20 px-6 md:px-12 lg:px-24 bg-gray-950 rounded-lg mx-auto max-w-6xl mt-16 relative z-20 border border-white/5 shadow-2xl-custom-glow">
        <h3 class="text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-teal-400 drop-shadow-lg"
            data-aos="fade-zoom-in" data-aos-duration="1000" data-aos-easing="ease-out-quad" data-aos-once="true" data-aos-offset="150">How SkillSwap Works</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div class="flex flex-col items-center text-center p-8 bg-black/30 rounded-xl border border-gray-700/50 shadow-lg"
                data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000" data-aos-once="true" data-aos-easing="ease-out-quad" data-aos-offset="100">
            <div class="bg-gradient-to-tr from-green-500/20 to-teal-500/20 p-5 rounded-full mb-6 border border-teal-400/30">
              <span class="text-4xl font-bold text-teal-400">1</span>
            </div>
            <h4 class="text-2xl font-semibold mb-3 text-white drop-shadow-sm">List Your Skills/Items</h4>
            <p class="text-gray-400 leading-relaxed">Create a profile and easily list what skills you can offer or items you wish to swap.</p>
          </div>

          <div class="flex flex-col items-center text-center p-8 bg-black/30 rounded-xl border border-gray-700/50 shadow-lg"
                data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000" data-aos-once="true" data-aos-easing="ease-out-quad" data-aos-offset="100">
            <div class="bg-gradient-to-tr from-green-500/20 to-teal-500/20 p-5 rounded-full mb-6 border border-teal-400/30">
              <span class="text-4xl font-bold text-teal-400">2</span>
            </div>
            <h4 class="text-2xl font-semibold mb-3 text-white drop-shadow-sm">Browse & Discover</h4>
            <p class="text-gray-400 leading-relaxed">Explore a diverse range of skills offered by others in your community or items available for trade.</p>
          </div>

          <div class="flex flex-col items-center text-center p-8 bg-black/30 rounded-xl border border-gray-700/50 shadow-lg"
                data-aos="fade-up" data-aos-delay="600" data-aos-duration="1000" data-aos-once="true" data-aos-easing="ease-out-quad" data-aos-offset="100">
            <div class="bg-gradient-to-tr from-green-500/20 to-teal-500/20 p-5 rounded-full mb-6 border border-teal-400/30">
              <span class="text-4xl font-bold text-teal-400">3</span>
            </div>
            <h4 class="text-2xl font-semibold mb-3 text-white drop-shadow-sm">Connect & Swap</h4>
            <p class="text-gray-400 leading-relaxed">Initiate conversations, propose swaps, and arrange the exchange directly with other users.</p>
          </div>
        </div>
      </section>

      <section class="relative isolate bg-black/30 text-white py-20 px-6 md:px-12 lg:px-24 text-center mt-16 rounded-xl mx-auto max-w-4xl border border-white/5 shadow-2xl transition-all duration-300 hover:shadow-green-500/30">
        <ThreeSceneBackground></ThreeSceneBackground>
      </section>

      <section class="bg-black/30 text-white py-20 px-6 md:px-12 lg:px-24 text-center mt-16 rounded-xl mx-auto max-w-4xl border border-white/5 shadow-2xl-custom-glow-alt">
        <h3 class="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-teal-400 drop-shadow-lg"
            data-aos="fade-zoom-in" data-duration="1000" data-aos-easing="ease-out-quad" data-aos-once="true" data-aos-offset="150">Ready to SkillSwap?</h3>
        <p class="text-lg text-gray-400 mb-10 max-w-2xl mx-auto"
           data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000" data-aos-easing="ease-out-quad" data-aos-once="true" data-aos-offset="50">Join thousands of users across India sharing their talents and resources. It's free, fast, and simple.</p>
        <NuxtLink to="/register"
                  class="bg-green-600 text-white font-bold py-4 px-10 rounded-full text-xl inline-block
                         transition-all duration-300 ease-out hover:scale-105 hover:shadow-green-500/30 focus:ring-4 focus:ring-green-600/50"
                  data-aos="zoom-in" data-aos-delay="400" data-aos-duration="1000" data-aos-easing="ease-out-back" data-aos-once="true">
          Sign Up Now - It's Free!
        </NuxtLink>
      </section>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import ThreeAbstractBackground from '~/components/ThreeAbstractBackground.vue'; // Changed to ThreeAbstractBackground
import ThreeSceneBackground from '~/components/ThreeSceneBackground.vue'; // Kept if used in a separate section

onMounted(() => {
  if (process.client) {
    if (typeof window.AOS !== 'undefined') {
      window.AOS.refresh();
    } else {
      console.warn('AOS not found on window. Make sure your plugin initializes it correctly.');
    }
  }
});
</script>

<style>
/* Global styles */
body {
  font-family: 'Inter', sans-serif;
  background-color: #0f172a; /* Explicitly setting the page background */
}
/* Removed .container as max-w- can be applied directly */
.antialiased {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Custom Shadow Enhancements */
/* For sections/cards that appear "raised" with a subtle inner glow */
.shadow-2xl-custom-inset {
    box-shadow: inset 0 0px 40px rgba(0,0,0,0.5), 0 25px 50px -12px rgba(0,0,0,0.4);
}
/* For elements that should have a strong, contained neon glow */
.shadow-2xl-custom-glow {
    box-shadow: 0 0 60px rgba(20, 184, 166, 0.15), /* Primary Teal */
                0 0 30px rgba(22, 163, 74, 0.1), /* Primary Green */
                0 25px 50px -12px rgba(0,0,0,0.4); /* Standard shadow for depth */
}

/* A slightly different glow for the final CTA */
.shadow-2xl-custom-glow-alt {
    box-shadow: 0 0 50px rgba(20, 184, 166, 0.1),
                0 0 20px rgba(22, 163, 74, 0.08),
                0 20px 40px -10px rgba(0,0,0,0.3);
}

/* Subtle pulse animation for scroll hint */
@keyframes pulse-subtle {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 0.8; }
}
.animate-pulse-subtle {
  animation: pulse-subtle 2s ease-in-out infinite;
}

/* Blob/Orb Background Animation (Accent Blue/Purple) */
@keyframes blob {
    0% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0, 0) scale(1); }
}
.animate-blob {
    animation: blob 7s infinite cubic-bezier(0.42, 0, 0.58, 1);
}
.animation-delay-2000 {
    animation-delay: 2s;
}

/* Headings: Removed animated-gradient for better readability, added drop-shadow */
.drop-shadow-lg {
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.4); /* For better contrast on gradient text */
}

/* Cards: Enhanced hover effects and base styling */
.interactive-card:hover {
  transform: translateY(-5px) scale(1.03); /* Lift and grow */
}

/* New: Styles for the Information links */
.info-link {
  @apply text-lg text-gray-300 px-4 py-2 rounded-md transition-all duration-300 ease-out;
  @apply hover:text-teal-400 hover:bg-white/5 hover:scale-105;
  @apply focus:outline-none focus:ring-2 focus:ring-teal-400/50;
}
</style>