<template>
     <ThreeAbstractBackground class="absolute inset-0 z-0"></ThreeAbstractBackground>
  <div class="text-white bg-gray-950 min-h-screen flex flex-col antialiased">
    <main class="flex-grow py-12 px-4 md:px-8 lg:px-16">
      <section class="max-w-4xl mx-auto bg-black/30 rounded-xl border border-white/5 shadow-2xl-custom-glow py-16 px-6 md:px-12 lg:px-20 mt-8">
        <h1 class="text-5xl md:text-6xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-teal-400 drop-shadow-lg"
            data-aos="fade-down" data-aos-duration="1200" data-aos-easing="ease-out-quad">
          Frequently Asked Questions
        </h1>

        <p class="text-xl text-gray-400 text-center mb-16 max-w-2xl mx-auto"
           data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000" data-aos-easing="ease-out-quad">
          Have questions about SkillSwap? We've got answers! Browse our FAQs below.
        </p>

        <div class="space-y-6 max-w-3xl mx-auto">
          <div class="bg-black/30 rounded-xl border border-gray-700/50 shadow-lg overflow-hidden
                      transition-all duration-300 ease-out hover:border-teal-400/50 hover:shadow-xl hover:shadow-teal-400/10"
               data-aos="fade-up" data-aos-delay="100" data-aos-duration="800" data-aos-once="true" data-aos-offset="50">
            <button class="w-full text-left p-6 flex justify-between items-center focus:outline-none group"
                    @click="toggleFAQ(0)"
                    :aria-expanded="faqOpen[0] ? 'true' : 'false'"
                    aria-controls="faq-content-0">
              <span class="text-lg font-semibold text-white group-hover:text-teal-400 transition-colors duration-200">What is SkillSwap?</span>
              <svg :class="{ 'rotate-180': faqOpen[0] }" class="w-6 h-6 text-gray-400 transform transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div v-show="faqOpen[0]" id="faq-content-0" class="px-6 pb-6 text-gray-400 leading-relaxed text-base border-t border-gray-700/50">
              <p class="pt-4">SkillSwap is a community platform in India where you can exchange skills and items with others without needing money. It's all about bartering and building stronger local connections within your community.</p>
            </div>
          </div>

          <div class="bg-black/30 rounded-xl border border-gray-700/50 shadow-lg overflow-hidden
                      transition-all duration-300 ease-out hover:border-teal-400/50 hover:shadow-xl hover:shadow-teal-400/10"
               data-aos="fade-up" data-aos-delay="200" data-aos-duration="800" data-aos-once="true" data-aos-offset="50">
            <button class="w-full text-left p-6 flex justify-between items-center focus:outline-none group"
                    @click="toggleFAQ(1)"
                    :aria-expanded="faqOpen[1] ? 'true' : 'false'"
                    aria-controls="faq-content-1">
              <span class="text-lg font-semibold text-white group-hover:text-teal-400 transition-colors duration-200">How do I list a skill or item?</span>
              <svg :class="{ 'rotate-180': faqOpen[1] }" class="w-6 h-6 text-gray-400 transform transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div v-show="faqOpen[1]" id="faq-content-1" class="px-6 pb-6 text-gray-400 leading-relaxed text-base border-t border-gray-700/50">
              <p class="pt-4">Once you sign up and create your profile, you can easily list what skills you can offer (e.g., web design, cooking, tutoring) or items you wish to swap (e.g., books, tools, handmade crafts). Just navigate to your dashboard and look for the "List New Swap" button.</p>
            </div>
          </div>

          <div class="bg-black/30 rounded-xl border border-gray-700/50 shadow-lg overflow-hidden
                      transition-all duration-300 ease-out hover:border-teal-400/50 hover:shadow-xl hover:shadow-teal-400/10"
               data-aos="fade-up" data-aos-delay="300" data-aos-duration="800" data-aos-once="true" data-aos-offset="50">
            <button class="w-full text-left p-6 flex justify-between items-center focus:outline-none group"
                    @click="toggleFAQ(2)"
                    :aria-expanded="faqOpen[2] ? 'true' : 'false'"
                    aria-controls="faq-content-2">
              <span class="text-lg font-semibold text-white group-hover:text-teal-400 transition-colors duration-200">Is SkillSwap free to use? Are there any hidden fees?</span>
              <svg :class="{ 'rotate-180': faqOpen[2] }" class="w-6 h-6 text-gray-400 transform transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div v-show="faqOpen[2]" id="faq-content-2" class="px-6 pb-6 text-gray-400 leading-relaxed text-base border-t border-gray-700/50">
              <p class="pt-4">Yes, SkillSwap is completely **free** for all users. Our core mission is to foster community and skill exchange without any financial barriers or hidden fees. You only need to invest your time and talent!</p>
            </div>
          </div>

          <div class="bg-black/30 rounded-xl border border-gray-700/50 shadow-lg overflow-hidden
                      transition-all duration-300 ease-out hover:border-teal-400/50 hover:shadow-xl hover:shadow-teal-400/10"
               data-aos="fade-up" data-aos-delay="400" data-aos-duration="800" data-aos-once="true" data-aos-offset="50">
            <button class="w-full text-left p-6 flex justify-between items-center focus:outline-none group"
                    @click="toggleFAQ(3)"
                    :aria-expanded="faqOpen[3] ? 'true' : 'false'"
                    aria-controls="faq-content-3">
              <span class="text-lg font-semibold text-white group-hover:text-teal-400 transition-colors duration-200">How do I contact another user for a swap?</span>
              <svg :class="{ 'rotate-180': faqOpen[3] }" class="w-6 h-6 text-gray-400 transform transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div v-show="faqOpen[3]" id="faq-content-3" class="px-6 pb-6 text-gray-400 leading-relaxed text-base border-t border-gray-700/50">
              <p class="pt-4">Each listing will have a "Contact User" or "Propose Swap" button. Clicking this will open a **secure messaging system** within the SkillSwap platform. You can then discuss the details of a potential exchange directly and privately with the other user.</p>
            </div>
          </div>

          <div class="bg-black/30 rounded-xl border border-gray-700/50 shadow-lg overflow-hidden
                      transition-all duration-300 ease-out hover:border-teal-400/50 hover:shadow-xl hover:shadow-teal-400/10"
               data-aos="fade-up" data-aos-delay="500" data-aos-duration="800" data-aos-once="true" data-aos-offset="50">
            <button class="w-full text-left p-6 flex justify-between items-center focus:outline-none group"
                    @click="toggleFAQ(4)"
                    :aria-expanded="faqOpen[4] ? 'true' : 'false'"
                    aria-controls="faq-content-4">
              <span class="text-lg font-semibold text-white group-hover:text-teal-400 transition-colors duration-200">What if I can't find the skill/item I'm looking for?</span>
              <svg :class="{ 'rotate-180': faqOpen[4] }" class="w-6 h-6 text-gray-400 transform transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div v-show="faqOpen[4]" id="faq-content-4" class="px-6 pb-6 text-gray-400 leading-relaxed text-base border-t border-gray-700/50">
              <p class="pt-4">The SkillSwap community is constantly growing! If you can't find what you need immediately, consider posting your own listing detailing what you're seeking. Other users might see it and be able to offer a swap. You can also save your search to be notified if a matching listing appears later.</p>
            </div>
          </div>
        </div>

        <div class="text-center mt-16"
             data-aos="fade-up" data-aos-delay="600" data-aos-duration="1000" data-aos-easing="ease-out-quad">
          <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Still have questions? Our support team is here to help!
          </p>
          <NuxtLink to="/contact"
                    class="bg-green-600 text-white font-bold py-4 px-10 rounded-full text-xl inline-block
                           transition-all duration-300 ease-out hover:scale-105 hover:shadow-green-500/30 focus:ring-4 focus:ring-green-600/50">
            Contact Support
          </NuxtLink>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Array to manage the open/closed state of each FAQ item
const faqOpen = ref([]);

// Function to toggle the state of an FAQ item
const toggleFAQ = (index) => {
  // Close all other FAQs if you want only one open at a time
  faqOpen.value = faqOpen.value.map((item, i) => (i === index ? !item : false));
  // If you want multiple FAQs to be open simultaneously, use:
  // faqOpen.value[index] = !faqOpen.value[index];
};

// Initialize all FAQs to be closed on mount
onMounted(() => {
  // Initialize with the number of FAQ items you have
  faqOpen.value = Array(5).fill(false); // Changed to 5 for the added FAQ item

  // AOS initialization/refresh
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
/* You would typically include your global styles from your main layout/style.css here,
   or ensure they are imported. For this example, I'm including the relevant custom
   shadow definitions that are used on this page. */

body {
  font-family: 'Inter', sans-serif;
  background-color: #0f172a; /* Explicitly setting the page background */
}
.antialiased {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Custom Shadow Enhancements */
.shadow-2xl-custom-glow {
    box-shadow: 0 0 60px rgba(20, 184, 166, 0.15), /* Primary Teal */
                0 0 30px rgba(22, 163, 74, 0.1), /* Primary Green */
                0 25px 50px -12px rgba(0,0,0,0.4); /* Standard shadow for depth */
}

/* Headings: Added drop-shadow */
.drop-shadow-lg {
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.4); /* For better contrast on gradient text */
}

/* For cards: Enhanced hover effects and base styling */
/* Note: The hover:scale-103 is applied directly on the FAQ item div in the HTML */
</style>